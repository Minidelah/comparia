import type { DiagnosticAnswers } from "@/lib/diagnostic";
import type { DiagnosticResult } from "@/lib/services/diagnostics";
import type { AiExpenseInsight, AiRecommendation } from "@/lib/ai/types";

const MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";
const DEFAULT_MODEL = "mistral-small-latest";

type MistralMessageContent = string | Array<{ type?: string; text?: string }>;

type MistralResponse = {
  choices?: Array<{
    message?: {
      content?: MistralMessageContent;
    };
  }>;
};

export async function analyzeUserExpenses(
  answers: DiagnosticAnswers,
  ruleAnalysis: DiagnosticResult,
): Promise<AiExpenseInsight> {
  const apiKey = process.env.MISTRAL_API_KEY;

  if (!apiKey) {
    return buildFallbackInsight(ruleAnalysis);
  }

  try {
    const response = await fetch(MISTRAL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.MISTRAL_MODEL || DEFAULT_MODEL,
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Tu es l’assistant financier IA de Comparia. Tu aides des utilisateurs français à comprendre leurs économies possibles sans conseil financier réglementé. Réponds uniquement en JSON strict, en français, avec des explications simples, prudentes et actionnables.",
          },
          {
            role: "user",
            content: JSON.stringify({
              expected_schema: {
                summary: "string courte",
                estimatedSavings: "number en euros par an",
                recommendations: [
                  {
                    title: "string",
                    categorySlug: "string",
                    annualSavings: "number",
                    priority: "Très élevée | Élevée | Moyenne",
                    reason: "string",
                    actionLabel: "string",
                  },
                ],
                actionPriorities: ["string", "string", "string"],
                explanation: "string",
                offerSlugs: ["string"],
              },
              answers,
              ruleAnalysis,
              allowedCategorySlugs: ruleAnalysis.recommendations.map((recommendation) => recommendation.slug),
              constraints: [
                "Ne promets jamais une économie garantie.",
                "Ne recommande que des catégories présentes dans allowedCategorySlugs.",
                "Si les données sont faibles, explique que l’estimation reste indicative.",
                "Garde les recommandations triées par impact utilisateur.",
              ],
            }),
          },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`mistral_http_${response.status}`);
    }

    const payload = (await response.json()) as MistralResponse;
    const rawContent = extractContent(payload);
    const parsed = parseJsonObject(rawContent);

    return normalizeAiInsight(parsed, ruleAnalysis);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Mistral analysis fallback", error);
    }

    return buildFallbackInsight(ruleAnalysis);
  }
}

function buildFallbackInsight(ruleAnalysis: DiagnosticResult): AiExpenseInsight {
  const top = ruleAnalysis.recommendations.slice(0, 4);

  return {
    summary:
      top.length > 0
        ? `Comparia détecte ${top.length} levier${top.length > 1 ? "s" : ""} prioritaire${top.length > 1 ? "s" : ""}, avec une économie indicative de ${ruleAnalysis.summary.totalSavings}€/an.`
        : "Comparia n’a pas détecté de fuite majeure avec les réponses actuelles.",
    estimatedSavings: ruleAnalysis.summary.totalSavings,
    recommendations: top.map((recommendation) => ({
      title: recommendation.category,
      categorySlug: recommendation.slug,
      annualSavings: recommendation.annualSavings,
      priority: recommendation.priority,
      reason: recommendation.reason,
      actionLabel: recommendation.cta,
    })),
    actionPriorities: top.slice(0, 3).map((recommendation) => `${recommendation.category} — ${recommendation.annualSavings}€/an estimés`),
    explanation:
      "Cette analyse utilise le moteur Comparia actuel. Une fois la clé Mistral configurée, l’assistant affinera le résumé avec un langage plus personnalisé.",
    offerSlugs: top.map((recommendation) => recommendation.slug),
    generatedBy: "rules",
  };
}

function extractContent(payload: MistralResponse) {
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => item.text)
      .filter((item): item is string => Boolean(item))
      .join("");
  }

  return "{}";
}

function parseJsonObject(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  } catch {
    const match = value.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      const parsed = JSON.parse(match[0]);
      return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
}

function normalizeAiInsight(raw: Record<string, unknown>, ruleAnalysis: DiagnosticResult): AiExpenseInsight {
  const fallback = buildFallbackInsight(ruleAnalysis);
  const allowedSlugs = new Set(ruleAnalysis.recommendations.map((recommendation) => recommendation.slug));
  const recommendations = Array.isArray(raw.recommendations)
    ? raw.recommendations
        .map((item) => normalizeAiRecommendation(item, allowedSlugs))
        .filter((item): item is AiRecommendation => Boolean(item))
        .slice(0, 5)
    : [];

  return {
    summary: normalizeString(raw.summary, fallback.summary, 360),
    estimatedSavings: normalizeNumber(raw.estimatedSavings, fallback.estimatedSavings, 0, Math.max(fallback.estimatedSavings * 1.25, fallback.estimatedSavings + 120)),
    recommendations: recommendations.length > 0 ? recommendations : fallback.recommendations,
    actionPriorities: normalizeStringArray(raw.actionPriorities, fallback.actionPriorities, 4, 160),
    explanation: normalizeString(raw.explanation, fallback.explanation, 520),
    offerSlugs: normalizeSlugArray(raw.offerSlugs, fallback.offerSlugs, allowedSlugs),
    generatedBy: "mistral",
  };
}

function normalizeAiRecommendation(value: unknown, allowedSlugs: Set<string>): AiRecommendation | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const categorySlug = normalizeString(item.categorySlug, "", 80);
  if (!allowedSlugs.has(categorySlug)) return null;

  const priority = normalizePriority(item.priority);

  return {
    title: normalizeString(item.title, "Recommandation Comparia", 120),
    categorySlug,
    annualSavings: normalizeNumber(item.annualSavings, 0, 0, 10_000),
    priority,
    reason: normalizeString(item.reason, "Cette action peut améliorer ton budget selon ton profil.", 320),
    actionLabel: normalizeString(item.actionLabel, "Comparer cette option", 120),
  };
}

function normalizeString(value: unknown, fallback: string, maxLength: number) {
  if (typeof value !== "string") return fallback;
  const clean = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return clean ? clean.slice(0, maxLength) : fallback;
}

function normalizeNumber(value: unknown, fallback: number, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.round(Math.max(min, Math.min(max, value)));
}

function normalizePriority(value: unknown): AiRecommendation["priority"] {
  if (value === "Très élevée" || value === "Élevée" || value === "Moyenne") return value;
  return "Moyenne";
}

function normalizeStringArray(value: unknown, fallback: string[], maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return fallback;
  const items = value
    .map((item) => normalizeString(item, "", maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
  return items.length > 0 ? items : fallback;
}

function normalizeSlugArray(value: unknown, fallback: string[], allowedSlugs: Set<string>) {
  if (!Array.isArray(value)) return fallback;
  const slugs = value.filter((item): item is string => typeof item === "string" && allowedSlugs.has(item)).slice(0, 5);
  return slugs.length > 0 ? slugs : fallback;
}
