import {
  buildRecommendations,
  summarizeDiagnostic,
  type DiagnosticAnswers,
  type Recommendation,
  type DiagnosticSummary,
} from "@/lib/diagnostic";

export type DiagnosticResult = {
  recommendations: Recommendation[];
  summary: DiagnosticSummary;
};

export function analyzeDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  const recommendations = buildRecommendations(answers);
  const summary = summarizeDiagnostic(answers, recommendations);

  return { recommendations, summary };
}
