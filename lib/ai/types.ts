export type AiRecommendation = {
  title: string;
  categorySlug: string;
  annualSavings: number;
  priority: "Très élevée" | "Élevée" | "Moyenne";
  reason: string;
  actionLabel: string;
};

export type AiExpenseInsight = {
  summary: string;
  estimatedSavings: number;
  recommendations: AiRecommendation[];
  actionPriorities: string[];
  explanation: string;
  offerSlugs: string[];
  generatedBy: "mistral" | "rules";
};
