import type { DiagnosticAnswers, Recommendation } from "@/lib/diagnostic";

type Rule = {
  category: Recommendation["category"];
  slug: string;
  cta: string;
  calculateSavings: (answers: DiagnosticAnswers) => number;
  priority: (annualSavings: number) => Recommendation["priority"];
  reason: (annualSavings: number) => string;
};

export const recommendationRules: Rule[] = [
  {
    category: "Change CHF/EUR",
    slug: "change-chf-eur",
    cta: "Comparer les solutions de change",
    calculateSavings: (answers) =>
      answers.isCrossBorderWorker && answers.monthlyFxVolumeChf > 0
        ? Math.round(answers.monthlyFxVolumeChf * 0.008 * 12)
        : 0,
    priority: (savings) => (savings >= 250 ? "Très élevée" : "Élevée"),
    reason: (savings) =>
      savings > 0
        ? "Tu convertis régulièrement des CHF : une marge plus faible peut préserver davantage de ton salaire."
        : "Aucune perte de change détectée pour ton profil actuel.",
  },
  {
    category: "Assurance santé",
    slug: "assurance-sante-frontaliers",
    cta: "Comparer mes options santé",
    calculateSavings: (answers) =>
      answers.isCrossBorderWorker && answers.healthInsurance !== "NONE"
        ? answers.healthInsurance === "UNKNOWN"
          ? 220
          : 140
        : 0,
    priority: (savings) => (savings >= 200 ? "Très élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton statut frontalier mérite une comparaison claire entre les options santé adaptées."
        : "Cette optimisation n’est pas prioritaire pour ton profil.",
  },
  {
    category: "Électricité",
    slug: "electricite",
    cta: "Comparer les offres électricité",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyElectricityCost * 0.12 * 12)),
    priority: (savings) => (savings >= 120 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ta facture d’électricité laisse probablement une marge d’optimisation face aux offres plus compétitives."
        : "Ta dépense électricité semble déjà bien contenue.",
  },
  {
    category: "Gaz",
    slug: "gaz",
    cta: "Comparer les offres gaz",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyGasCost * 0.12 * 12)),
    priority: (savings) => (savings >= 90 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ta facture de gaz mérite d’être comparée séparément pour trouver un contrat plus adapté."
        : "Ta dépense gaz semble déjà bien contenue.",
  },
  {
    category: "Forfait mobile",
    slug: "forfait-mobile",
    cta: "Optimiser mon forfait",
    calculateSavings: (answers) => Math.max(0, Math.round((answers.mobilePlanCost - 12) * 12)),
    priority: (savings) => (savings >= 120 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton forfait paraît supérieur au niveau de prix souvent suffisant pour un usage courant."
        : "Ton forfait semble déjà proche d’un bon niveau de marché.",
  },
  {
    category: "Assurance auto",
    slug: "assurance-auto",
    cta: "Comparer mon assurance auto",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyAutoInsuranceCost * 0.18 * 12)),
    priority: (savings) => (savings >= 180 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "L’assurance auto est souvent renégociable à couverture comparable, surtout après plusieurs années sans changement."
        : "Aucune optimisation auto détectée pour le moment.",
  },
  {
    category: "Assurance moto",
    slug: "assurance-moto",
    cta: "Comparer mon assurance moto",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyMotoInsuranceCost * 0.16 * 12)),
    priority: (savings) => (savings >= 120 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton assurance deux-roues peut probablement être remise en concurrence sans réduire tes garanties utiles."
        : "Aucune optimisation moto détectée pour le moment.",
  },
  {
    category: "Assurance vélo",
    slug: "assurance-velo",
    cta: "Comparer mon assurance vélo",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyBikeInsuranceCost * 0.14 * 12)),
    priority: (savings) => (savings >= 60 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton assurance vélo peut probablement être ajustée à ton usage réel et à la valeur du vélo."
        : "Aucune optimisation vélo détectée pour le moment.",
  },
  {
    category: "Assurance trottinette",
    slug: "assurance-trottinette",
    cta: "Comparer mon assurance trottinette",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyScooterInsuranceCost * 0.14 * 12)),
    priority: (savings) => (savings >= 48 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton assurance trottinette mérite d’être comparée si ton contrat n’a jamais été revu."
        : "Aucune optimisation trottinette détectée pour le moment.",
  },
  {
    category: "Assurance animaux",
    slug: "assurance-animaux",
    cta: "Comparer mon assurance animaux",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyPetInsuranceCost * 0.16 * 12)),
    priority: (savings) => (savings >= 72 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Une assurance animaux peut vite dériver si la formule ne correspond plus à l’âge ou aux besoins réels."
        : "Aucune optimisation animaux détectée pour le moment.",
  },
  {
    category: "Assurance habitation",
    slug: "assurance-habitation",
    cta: "Comparer mon assurance habitation",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyHomeInsuranceCost * 0.15 * 12)),
    priority: (savings) => (savings >= 90 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Ton assurance habitation mérite d’être comparée si ton contrat n’a pas été revu récemment."
        : "Aucune optimisation habitation détectée pour le moment.",
  },
  {
    category: "Mutuelle santé",
    slug: "mutuelle-sante",
    cta: "Comparer ma mutuelle",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlyMutuelleCost * 0.14 * 12)),
    priority: (savings) => (savings >= 120 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Une mutuelle mal alignée avec tes besoins crée souvent une dépense silencieuse mais durable."
        : "Aucune optimisation mutuelle détectée pour le moment.",
  },
  {
    category: "Abonnements",
    slug: "abonnements",
    cta: "Analyser mes abonnements",
    calculateSavings: (answers) => Math.max(0, Math.round(answers.monthlySubscriptionsCost * 0.22 * 12)),
    priority: (savings) => (savings >= 120 ? "Élevée" : "Moyenne"),
    reason: (savings) =>
      savings > 0
        ? "Les abonnements sont la fuite la plus discrète : un nettoyage régulier crée vite de l’air sans effort."
        : "Aucune fuite d’abonnement significative détectée.",
  },
];
