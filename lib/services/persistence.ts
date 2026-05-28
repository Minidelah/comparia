import type { DiagnosticAnswers } from "@/lib/diagnostic";
import type { AiExpenseInsight } from "@/lib/ai/types";
import type { DiagnosticResult } from "@/lib/services/diagnostics";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

type SupabaseAdminClient = ReturnType<typeof createSupabaseAdminClient>;

export type PersistDiagnosticInput = {
  anonymousId: string;
  answers: DiagnosticAnswers;
  analysis: DiagnosticResult;
  ai?: AiExpenseInsight;
};

export async function persistDiagnostic(input: PersistDiagnosticInput) {
  if (!isSupabaseConfigured()) {
    return { persisted: false as const, reason: "supabase_not_configured" as const };
  }

  const supabase = createSupabaseAdminClient();

  try {
    return await persistDiagnosticStrict(supabase, input);
  } catch (error) {
    console.error("Primary diagnostic persistence failed, using funnel fallback", getSafePersistenceError(error));
    return persistDiagnosticEventFallback(supabase, input, error);
  }
}

async function persistDiagnosticStrict(supabase: SupabaseAdminClient, input: PersistDiagnosticInput) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .upsert(
      {
        id: input.anonymousId,
        display_name: "Visiteur CompareTesFactures",
        country: "FR",
      },
      { onConflict: "id" },
    )
    .select("id")
    .single();

  if (userError) {
    throw userError;
  }

  await upsertFinancialProfile(supabase, user.id, input.answers);

  const { data: diagnostic, error: diagnosticError } = await supabase
    .from("diagnostics")
    .insert({
      user_id: user.id,
      total_estimated_savings: input.analysis.summary.totalSavings,
      monthly_leak: input.analysis.summary.monthlyLeak,
      optimization_score: input.analysis.summary.optimizationScore,
      input_snapshot: input.answers,
    })
    .select("id")
    .single();

  if (diagnosticError) {
    throw diagnosticError;
  }

  await persistExpenseAnalysis(supabase, user.id, diagnostic.id, input);

  const recommendationRows = input.analysis.recommendations.map((recommendation) => ({
    diagnostic_id: diagnostic.id,
    user_id: user.id,
    category: recommendation.category,
    estimated_annual_savings: recommendation.annualSavings,
    priority: recommendation.priority,
    reason: recommendation.reason,
    confidence_score: 0.72,
  }));

  if (recommendationRows.length > 0) {
    const { error: recommendationsError } = await supabase.from("recommendations").insert(recommendationRows);

    if (recommendationsError) {
      throw recommendationsError;
    }
  }

  if (input.ai) {
    const { error: aiError } = await supabase.from("ai_recommendations").insert({
      user_id: user.id,
      diagnostic_id: diagnostic.id,
      provider: input.ai.generatedBy,
      summary: input.ai.summary,
      estimated_savings: input.ai.estimatedSavings,
      action_priorities: input.ai.actionPriorities,
      explanation: input.ai.explanation,
      offer_slugs: input.ai.offerSlugs,
      recommendations: input.ai.recommendations,
      created_at: new Date().toISOString(),
    });

    if (aiError && process.env.NODE_ENV !== "production") {
      console.warn("AI recommendation persistence skipped", aiError.message);
    }
  }

  return { persisted: true as const, diagnosticId: diagnostic.id };
}

async function persistDiagnosticEventFallback(
  supabase: SupabaseAdminClient,
  input: PersistDiagnosticInput,
  originalError: unknown,
) {
  const { error } = await supabase.from("funnel_events").insert({
      event_name: "diagnostic_completed",
      category_slug: input.analysis.recommendations[0]?.slug ?? null,
      meta: {
        anonymousId: input.anonymousId,
        answers: input.answers,
        summary: input.analysis.summary,
        recommendations: input.analysis.recommendations.map((recommendation) => ({
          category: recommendation.category,
          annualSavings: recommendation.annualSavings,
          priority: recommendation.priority,
          slug: recommendation.slug,
        })),
        ai: input.ai
          ? {
              generatedBy: input.ai.generatedBy,
              summary: input.ai.summary,
              estimatedSavings: input.ai.estimatedSavings,
              actionPriorities: input.ai.actionPriorities,
              offerSlugs: input.ai.offerSlugs,
            }
          : null,
        fallbackReason: getSafePersistenceError(originalError),
      },
    });

  if (error) {
    throw error;
  }

  return {
    persisted: true as const,
    diagnosticId: null,
    fallback: "funnel_events" as const,
  };
}

async function upsertFinancialProfile(supabase: SupabaseAdminClient, userId: string, answers: DiagnosticAnswers) {
  const updatedAt = new Date().toISOString();

  const modernPayload = {
    ...buildBaseProfilePayload(userId, answers, updatedAt),
    monthly_electricity_cost: answers.monthlyElectricityCost,
    monthly_gas_cost: answers.monthlyGasCost,
    monthly_bike_insurance_cost: answers.monthlyBikeInsuranceCost,
    monthly_scooter_insurance_cost: answers.monthlyScooterInsuranceCost,
    monthly_pet_insurance_cost: answers.monthlyPetInsuranceCost,
  };

  const { error } = await supabase.from("financial_profiles").upsert(modernPayload, { onConflict: "user_id" });

  if (!error) return;

  if (!isMissingColumnError(error)) {
    throw error;
  }

  const legacyPayload = {
    ...buildBaseProfilePayload(userId, answers, updatedAt),
    monthly_energy_cost: answers.monthlyElectricityCost + answers.monthlyGasCost,
  };

  const { error: legacyError } = await supabase.from("financial_profiles").upsert(legacyPayload, {
    onConflict: "user_id",
  });

  if (legacyError) {
    throw legacyError;
  }
}

function buildBaseProfilePayload(userId: string, answers: DiagnosticAnswers, updatedAt: string) {
  return {
    user_id: userId,
    is_cross_border_worker: answers.isCrossBorderWorker,
    works_in_country: answers.isCrossBorderWorker ? "CH" : "FR",
    monthly_income: answers.monthlyIncome,
    income_currency: answers.incomeCurrency,
    monthly_fx_volume_chf: answers.monthlyFxVolumeChf,
    health_insurance_system: answers.healthInsurance,
    monthly_mobile_cost: answers.mobilePlanCost,
    monthly_auto_insurance_cost: answers.monthlyAutoInsuranceCost,
    monthly_moto_insurance_cost: answers.monthlyMotoInsuranceCost,
    monthly_home_insurance_cost: answers.monthlyHomeInsuranceCost,
    monthly_mutuelle_cost: answers.monthlyMutuelleCost,
    monthly_subscriptions_cost: answers.monthlySubscriptionsCost,
    primary_goal: answers.goal,
    updated_at: updatedAt,
  };
}

async function persistExpenseAnalysis(
  supabase: SupabaseAdminClient,
  userId: string,
  diagnosticId: string,
  input: PersistDiagnosticInput,
) {
  const { error } = await supabase.from("expense_analyses").insert({
    user_id: userId,
    diagnostic_id: diagnosticId,
    annual_analyzed_spend: input.analysis.summary.annualAnalyzedSpend,
    monthly_leak: input.analysis.summary.monthlyLeak,
    total_estimated_savings: input.analysis.summary.totalSavings,
    source: input.ai?.generatedBy ?? "rules",
    input_snapshot: input.answers,
    created_at: new Date().toISOString(),
  });

  if (error && process.env.NODE_ENV !== "production") {
    console.warn("Expense analysis persistence skipped", error.message);
  }
}

function isMissingColumnError(error: unknown) {
  const record = error && typeof error === "object" ? (error as { code?: string; message?: string }) : null;
  const message = record?.message?.toLowerCase() ?? "";

  return record?.code === "42703" || record?.code === "PGRST204" || message.includes("could not find") || message.includes("column");
}

function getSafePersistenceError(error: unknown) {
  if (!error || typeof error !== "object") {
    return { message: String(error).slice(0, 180) };
  }

  const record = error as { code?: unknown; message?: unknown; name?: unknown };

  return {
    code: typeof record.code === "string" ? record.code.slice(0, 40) : undefined,
    name: typeof record.name === "string" ? record.name.slice(0, 80) : undefined,
    message: typeof record.message === "string" ? record.message.slice(0, 220) : "unknown_error",
  };
}
