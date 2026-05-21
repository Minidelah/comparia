import type { DiagnosticAnswers } from "@/lib/diagnostic";
import type { AiExpenseInsight } from "@/lib/ai/types";
import type { DiagnosticResult } from "@/lib/services/diagnostics";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

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

  const { data: user, error: userError } = await supabase
    .from("users")
    .upsert(
      {
        id: input.anonymousId,
        display_name: "Visiteur Comparia",
        country: "FR",
      },
      { onConflict: "id" },
    )
    .select("id")
    .single();

  if (userError) {
    throw userError;
  }

  const { error: profileError } = await supabase.from("financial_profiles").upsert(
    {
      user_id: user.id,
      is_cross_border_worker: input.answers.isCrossBorderWorker,
      works_in_country: input.answers.isCrossBorderWorker ? "CH" : "FR",
      monthly_income: input.answers.monthlyIncome,
      income_currency: input.answers.incomeCurrency,
      monthly_fx_volume_chf: input.answers.monthlyFxVolumeChf,
      health_insurance_system: input.answers.healthInsurance,
      monthly_electricity_cost: input.answers.monthlyElectricityCost,
      monthly_gas_cost: input.answers.monthlyGasCost,
      monthly_mobile_cost: input.answers.mobilePlanCost,
      monthly_auto_insurance_cost: input.answers.monthlyAutoInsuranceCost,
      monthly_moto_insurance_cost: input.answers.monthlyMotoInsuranceCost,
      monthly_bike_insurance_cost: input.answers.monthlyBikeInsuranceCost,
      monthly_scooter_insurance_cost: input.answers.monthlyScooterInsuranceCost,
      monthly_pet_insurance_cost: input.answers.monthlyPetInsuranceCost,
      monthly_home_insurance_cost: input.answers.monthlyHomeInsuranceCost,
      monthly_mutuelle_cost: input.answers.monthlyMutuelleCost,
      monthly_subscriptions_cost: input.answers.monthlySubscriptionsCost,
      primary_goal: input.answers.goal,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (profileError) {
    throw profileError;
  }

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
