export type DiagnosticAnswers = {
  isCrossBorderWorker: boolean;
  monthlyIncome: number;
  incomeCurrency: "EUR" | "CHF" | "BOTH";
  monthlyFxVolumeChf: number;
  healthInsurance: "LAMAL" | "CMU" | "UNKNOWN" | "NONE";
  monthlyElectricityCost: number;
  monthlyGasCost: number;
  mobilePlanCost: number;
  monthlyAutoInsuranceCost: number;
  monthlyMotoInsuranceCost: number;
  monthlyBikeInsuranceCost: number;
  monthlyScooterInsuranceCost: number;
  monthlyPetInsuranceCost: number;
  monthlyHomeInsuranceCost: number;
  monthlyMutuelleCost: number;
  monthlySubscriptionsCost: number;
  goal: string;
};

export type Recommendation = {
  category:
    | "Change CHF/EUR"
    | "Assurance santé"
    | "Électricité"
    | "Gaz"
    | "Forfait mobile"
    | "Assurance auto"
    | "Assurance moto"
    | "Assurance vélo"
    | "Assurance trottinette"
    | "Assurance animaux"
    | "Assurance habitation"
    | "Mutuelle santé"
    | "Abonnements";
  annualSavings: number;
  priority: "Très élevée" | "Élevée" | "Moyenne";
  reason: string;
  cta: string;
  slug: string;
};

export type DiagnosticSummary = {
  totalSavings: number;
  monthlyLeak: number;
  optimizationScore: number;
  annualAnalyzedSpend: number;
};

export function buildRecommendations(answers: DiagnosticAnswers): Recommendation[] {
  return recommendationRules
    .map((rule) => {
      const annualSavings = rule.calculateSavings(answers);

      return {
        category: rule.category,
        annualSavings,
        priority: rule.priority(annualSavings),
        reason: rule.reason(annualSavings),
        cta: rule.cta,
        slug: rule.slug,
      };
    })
    .filter((item) => item.annualSavings > 0)
    .sort((a, b) => b.annualSavings - a.annualSavings);
}

export function summarizeDiagnostic(
  answers: DiagnosticAnswers,
  recommendations: Recommendation[],
): DiagnosticSummary {
  const totalSavings = recommendations.reduce((sum, item) => sum + item.annualSavings, 0);
  const annualAnalyzedSpend =
    (answers.monthlyElectricityCost +
      answers.monthlyGasCost +
      answers.mobilePlanCost +
      answers.monthlyAutoInsuranceCost +
      answers.monthlyMotoInsuranceCost +
      answers.monthlyBikeInsuranceCost +
      answers.monthlyScooterInsuranceCost +
      answers.monthlyPetInsuranceCost +
      answers.monthlyHomeInsuranceCost +
      answers.monthlyMutuelleCost +
      answers.monthlySubscriptionsCost) *
      12 +
    answers.monthlyFxVolumeChf * 12;

  const savingsRatio = annualAnalyzedSpend > 0 ? totalSavings / annualAnalyzedSpend : 0;
  const optimizationScore = Math.max(35, Math.min(96, Math.round(96 - savingsRatio * 180)));

  return {
    totalSavings,
    monthlyLeak: Math.round(totalSavings / 12),
    optimizationScore,
    annualAnalyzedSpend,
  };
}
import { recommendationRules } from "@/lib/recommendation-rules";
