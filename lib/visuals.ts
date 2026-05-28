import type { Category } from "@/lib/categories";

export type VisualTone = "cyan" | "blue" | "emerald" | "violet" | "amber" | "rose";

export type VisualAsset = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: VisualTone;
  fit?: "cover" | "contain";
  metric?: string;
};

export const heroVisual: VisualAsset = {
  src: "/visuals/ai-dashboard.svg",
  alt: "Dashboard fintech CompareTesFactures avec score d’optimisation, cashback et économies estimées",
  eyebrow: "IA économies",
  title: "Un cockpit clair avant chaque clic",
  body: "Score, économie estimée et avantage potentiel restent lisibles avant la redirection partenaire.",
  tone: "cyan",
  fit: "contain",
  metric: "Score 91/100",
};

export const cashbackVisual: VisualAsset = {
  src: "/visuals/cashback-rewards.svg",
  alt: "Illustration cashback premium avec carte de récompense et bouton d’activation",
  eyebrow: "Cashback",
  title: "Récompenses lisibles",
  body: "Quand une offre rémunère, CompareTesFactures sépare clairement cashback, recommandation et sponsorisation.",
  tone: "emerald",
  fit: "contain",
  metric: "+35€",
};

export const showcaseVisuals: VisualAsset[] = [
  {
    src: "/visuals/energy-dashboard.svg",
    alt: "Maison moderne avec dashboard énergie et éclair électrique",
    eyebrow: "Énergie",
    title: "Électricité et gaz séparés",
    body: "Les contrats énergie sont visualisés comme deux leviers différents pour éviter les comparaisons floues.",
    tone: "emerald",
    fit: "contain",
    metric: "jusqu’à 120€/an",
  },
  {
    src: "/visuals/mobile-5g.svg",
    alt: "Smartphone premium avec réseau 5G et usage data mobile",
    eyebrow: "Mobile",
    title: "Usage data + réseau",
    body: "Le mobile devient une décision simple : data, zone, réseau et prix sont posés au même endroit.",
    tone: "cyan",
    fit: "contain",
    metric: "2 min",
  },
  {
    src: "/visuals/bank-cards.svg",
    alt: "Cartes bancaires premium et interface de paiement fintech",
    eyebrow: "Banque",
    title: "Frais et cartes utiles",
    body: "Une identité visuelle plus fintech pour préparer la comparaison banque, carte et services.",
    tone: "violet",
    fit: "contain",
    metric: "bientôt",
  },
  {
    src: "/visuals/frontier-chf.svg",
    alt: "Flux CHF EUR entre Suisse et France avec croix suisse centrale",
    eyebrow: "Frontaliers",
    title: "CHF/EUR sans friction",
    body: "Les profils Suisse-France ont un univers dédié : change, santé et arbitrages transfrontaliers.",
    tone: "rose",
    fit: "contain",
    metric: "CHF → EUR",
  },
];

const categoryVisuals: Record<string, VisualAsset> = {
  "change-chf-eur": {
    ...showcaseVisuals[3],
    src: "/comparators/change-chf-eur.jpg",
    alt: "Illustration premium du change CHF EUR pour frontalier Suisse-France",
    title: "Optimise tes conversions régulières",
    metric: "CHF → EUR",
  },
  "assurance-sante-frontaliers": {
    src: "/comparators/assurance-sante-frontaliers.jpg",
    alt: "Illustration assurance santé frontaliers France Suisse",
    eyebrow: "Frontaliers",
    title: "Santé transfrontalière clarifiée",
    body: "Un parcours lisible pour comparer les options selon ton statut et ton foyer.",
    tone: "blue",
    fit: "contain",
    metric: "LAMal / CMU",
  },
  "assurance-auto": {
    src: "/comparators/assurance-auto.jpg",
    alt: "Voiture moderne protégée par une assurance auto",
    eyebrow: "Auto",
    title: "Comparer à garanties utiles",
    body: "Le prix n’a de valeur que si le niveau de couverture reste cohérent avec ton usage.",
    tone: "cyan",
    fit: "contain",
    metric: "jusqu’à 396€/an",
  },
  "assurance-moto": {
    src: "/comparators/assurance-moto.jpg",
    alt: "Moto premium pour comparaison assurance deux roues",
    eyebrow: "Moto",
    title: "Deux-roues, usage réel",
    body: "On adapte la comparaison à la cylindrée, la fréquence et le niveau de protection.",
    tone: "amber",
    fit: "contain",
    metric: "jusqu’à 223€/an",
  },
  "assurance-velo": {
    src: "/comparators/assurance-velo.jpg",
    alt: "Vélo urbain premium pour assurance vélo",
    eyebrow: "Vélo",
    title: "Protection adaptée à la valeur",
    body: "Vol, casse et assistance selon ton vélo et ton quotidien.",
    tone: "emerald",
    fit: "contain",
    metric: "selon usage",
  },
  "assurance-trottinette": {
    src: "/comparators/assurance-trottinette.jpg",
    alt: "Trottinette électrique urbaine pour assurance mobilité légère",
    eyebrow: "Trottinette",
    title: "Mobilité légère protégée",
    body: "Un tunnel simple pour les trajets urbains et les garanties indispensables.",
    tone: "cyan",
    fit: "contain",
    metric: "urbain",
  },
  "assurance-habitation": {
    src: "/comparators/assurance-habitation.jpg",
    alt: "Maison moderne pour comparaison assurance habitation",
    eyebrow: "Habitation",
    title: "Ton logement au bon prix",
    body: "Locataire, propriétaire ou bailleur : le contexte change tout.",
    tone: "blue",
    fit: "contain",
    metric: "jusqu’à 480€/an",
  },
  "mutuelle-sante": {
    src: "/comparators/mutuelle-sante.jpg",
    alt: "Visuel premium mutuelle santé et couverture soins",
    eyebrow: "Santé",
    title: "Couverture alignée aux besoins",
    body: "Dentaire, optique, hospitalisation : on priorise les postes qui comptent.",
    tone: "rose",
    fit: "contain",
    metric: "jusqu’à 416€/an",
  },
  "assurance-animaux": {
    src: "/comparators/assurance-animaux.jpg",
    alt: "Chien ou chat protégé par une assurance animaux",
    eyebrow: "Animaux",
    title: "Soins animaux sans surprise",
    body: "Chien, chat ou plusieurs animaux : CompareTesFactures prépare les offres compatibles.",
    tone: "amber",
    fit: "contain",
    metric: "jusqu’à 180€/an",
  },
  "assurance-emprunteur": {
    src: "/comparators/assurance-emprunteur.jpg",
    alt: "Crédit immobilier et assurance emprunteur dans une interface financière",
    eyebrow: "Crédit",
    title: "Le coût caché du crédit",
    body: "Une page prête pour mesurer l’économie sur l’assurance emprunteur.",
    tone: "violet",
    fit: "contain",
    metric: "bientôt",
  },
  electricite: showcaseVisuals[0],
  gaz: {
    src: "/comparators/gaz.jpg",
    alt: "Maison moderne avec chauffage gaz et suivi de consommation",
    eyebrow: "Gaz",
    title: "Un contrat gaz traité à part",
    body: "Cuisine, eau chaude ou chauffage : on compare des usages comparables.",
    tone: "amber",
    fit: "contain",
    metric: "jusqu’à 90€/an",
  },
  "box-internet": {
    src: "/comparators/box-internet.jpg",
    alt: "Box internet fibre et Wi‑Fi dans un logement moderne",
    eyebrow: "Internet",
    title: "Fibre, TV et services utiles",
    body: "Le bon panier dépend du foyer, pas seulement du prix d’appel.",
    tone: "blue",
    fit: "contain",
    metric: "bientôt",
  },
  "forfait-mobile": showcaseVisuals[1],
  abonnements: {
    src: "/comparators/abonnements.jpg",
    alt: "Applications et abonnements récurrents à optimiser",
    eyebrow: "Abonnements",
    title: "Les petites fuites visibles",
    body: "Streaming, apps et loisirs : les prélèvements reviennent, CompareTesFactures les remet en question.",
    tone: "violet",
    fit: "contain",
    metric: "mensuel",
  },
  banque: showcaseVisuals[2],
};

export const groupVisuals: Record<Category["group"], VisualAsset> = {
  Maison: {
    src: "/category-maison.jpg",
    alt: "Maison moderne avec contrats énergie, mobile et internet",
    eyebrow: "Maison",
    title: "Contrats du quotidien",
    body: "Les dépenses qui reviennent chaque mois et qu’on peut optimiser rapidement.",
    tone: "cyan",
    fit: "contain",
    metric: "mensuel",
  },
  Assurances: {
    src: "/category-assurances.jpg",
    alt: "Protection assurance premium pour auto, habitation, santé et animaux",
    eyebrow: "Assurances",
    title: "Protections à comparer",
    body: "Les garanties où le bon niveau de couverture peut faire varier fortement le prix annuel.",
    tone: "blue",
    fit: "contain",
    metric: "annuel",
  },
  Frontaliers: {
    src: "/category-frontaliers.jpg",
    alt: "Lifestyle frontalier Suisse-France avec change CHF EUR",
    eyebrow: "Frontaliers",
    title: "Vie France-Suisse",
    body: "Les arbitrages spécifiques aux revenus suisses et dépenses françaises.",
    tone: "rose",
    fit: "contain",
    metric: "CHF/EUR",
  },
  Finances: showcaseVisuals[2],
};

export function getCategoryVisual(slug: string): VisualAsset {
  return (
    categoryVisuals[slug] ?? {
      src: "/comparetesfactures-hero.jpg",
      alt: "Interface CompareTesFactures premium avec comparateur intelligent",
      eyebrow: "CompareTesFactures",
      title: "Comparateur intelligent",
      body: "Une expérience visuelle cohérente pour comprendre vite où économiser.",
      tone: "cyan",
      fit: "contain",
      metric: "IA",
    }
  );
}
