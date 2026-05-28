import type { Category } from "@/lib/categories";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export type SeoGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  categorySlug: string;
  intent: "économiser" | "comparer" | "changer" | "optimiser";
  heroMetric: string;
  intro: string;
  painPoints: string[];
  steps: { title: string; body: string }[];
  signals: string[];
  faq: { question: string; answer: string }[];
};

export const seoGuides: SeoGuide[] = [
  {
    slug: "reduire-assurance-habitation",
    title: "Réduire son assurance habitation sans perdre les garanties utiles",
    description:
      "Guide clair pour comparer ton assurance habitation, repérer les garanties importantes et estimer l’économie possible avant de changer.",
    eyebrow: "Assurance habitation",
    categorySlug: "assurance-habitation",
    intent: "économiser",
    heroMetric: "jusqu’à 480€/an",
    intro:
      "L’assurance habitation fait partie des contrats qu’on garde souvent trop longtemps. Le vrai sujet n’est pas de prendre le moins cher, mais de retrouver un prix cohérent avec ton logement, ton statut et les garanties réellement utiles.",
    painPoints: [
      "Le contrat a augmenté plusieurs années de suite sans vraie explication.",
      "Tu ne sais plus exactement quelles garanties sont incluses.",
      "Ton logement ou ta situation a changé depuis la souscription.",
    ],
    steps: [
      {
        title: "Clarifie ton profil logement",
        body: "Locataire, propriétaire occupant ou bailleur : le prix et les garanties attendues ne sont pas les mêmes.",
      },
      {
        title: "Compare à garanties comparables",
        body: "Franchise, vol, dégâts des eaux, responsabilité civile et assistance doivent rester lisibles avant le clic.",
      },
      {
        title: "Active seulement si l’écart vaut le changement",
        body: "Une bonne économie est une économie durable, compréhensible et sans perte de protection essentielle.",
      },
    ],
    signals: ["Hausse annuelle", "Logement modifié", "Contrat ancien", "Garanties floues"],
    faq: [
      {
        question: "Quand faut-il comparer son assurance habitation ?",
        answer:
          "Il est utile de comparer à chaque hausse de tarif, déménagement, changement de surface ou évolution de situation. Un contrat ancien peut rester correct, mais il mérite d’être challengé régulièrement.",
      },
      {
        question: "Faut-il choisir l’offre habitation la moins chère ?",
        answer:
          "Pas forcément. Le bon choix dépend aussi des franchises, exclusions, plafonds d’indemnisation et garanties réellement utiles pour ton logement.",
      },
    ],
  },
  {
    slug: "changer-assurance-auto",
    title: "Changer d’assurance auto : quoi comparer avant de signer",
    description:
      "Méthode simple pour comparer assurance auto, usage, niveau de couverture et économie annuelle sans sacrifier les garanties utiles.",
    eyebrow: "Assurance auto",
    categorySlug: "assurance-auto",
    intent: "changer",
    heroMetric: "jusqu’à 396€/an",
    intro:
      "L’assurance auto varie fortement selon le véhicule, l’usage, le niveau de couverture et le profil conducteur. Comparer proprement évite deux erreurs : payer trop cher ou descendre trop bas en garanties.",
    painPoints: ["Prime trop élevée", "Usage occasionnel mal tarifé", "Garanties mal comprises"],
    steps: [
      { title: "Pose ton usage réel", body: "Quotidien, occasionnel ou professionnel : l’usage change la pertinence des offres." },
      { title: "Garde le bon niveau de couverture", body: "Au tiers, intermédiaire ou tous risques : le bon choix dépend surtout de la valeur du véhicule." },
      { title: "Compare l’économie annuelle", body: "Une mensualité plus basse doit se vérifier sur l’année et avec les franchises." },
    ],
    signals: ["Bonus amélioré", "Véhicule moins coté", "Kilométrage réduit", "Prime qui augmente"],
    faq: [
      {
        question: "Peut-on changer d’assurance auto facilement ?",
        answer:
          "En France, un contrat auto de plus d’un an peut généralement être résilié plus simplement. Le nouveau contrat doit toutefois être actif avant toute rupture de couverture.",
      },
      {
        question: "Quelle garantie auto comparer en priorité ?",
        answer:
          "Commence par le niveau de couverture, les franchises, l’assistance, le bris de glace et les exclusions. Le prix seul ne suffit pas.",
      },
    ],
  },
  {
    slug: "comparer-electricite-gaz",
    title: "Comparer électricité et gaz séparément pour mieux comprendre sa facture",
    description:
      "Guide énergie pour comparer électricité et gaz sans les mélanger, selon ton logement, ton chauffage et ton objectif d’économie.",
    eyebrow: "Énergie",
    categorySlug: "electricite",
    intent: "comparer",
    heroMetric: "électricité + gaz",
    intro:
      "Une facture énergie claire commence par une séparation nette : l’électricité et le gaz ne répondent pas toujours au même usage. Comparia aide à poser le bon diagnostic avant de regarder les offres.",
    painPoints: ["Mensualité incomprise", "Offre groupée floue", "Chauffage coûteux", "Prix qui bouge"],
    steps: [
      { title: "Sépare les usages", body: "Électricité courante, chauffage, eau chaude et cuisson n’ont pas le même impact." },
      { title: "Choisis ton objectif", body: "Prix bas, stabilité ou offre verte : le meilleur contrat change selon la priorité." },
      { title: "Compare la facture annuelle", body: "La mensualité est utile, mais l’estimation annuelle reste plus fiable pour décider." },
    ],
    signals: ["Logement chauffé au gaz", "Maison énergivore", "Offre indexée", "Mensualité élevée"],
    faq: [
      {
        question: "Pourquoi séparer électricité et gaz ?",
        answer:
          "Parce que les usages, les prix et les économies potentielles ne sont pas identiques. Une comparaison séparée évite de choisir une offre groupée peu claire.",
      },
      {
        question: "Une offre verte est-elle toujours plus chère ?",
        answer:
          "Pas toujours. Le prix dépend du fournisseur, de la structure tarifaire et de la consommation. Il faut comparer sur une base annuelle.",
      },
    ],
  },
  {
    slug: "forfait-mobile-moins-cher",
    title: "Trouver un forfait mobile moins cher sans perdre le bon réseau",
    description:
      "Compare les forfaits mobiles selon la data, la zone d’usage, le réseau et les besoins Europe ou Suisse.",
    eyebrow: "Forfait mobile",
    categorySlug: "forfait-mobile",
    intent: "économiser",
    heroMetric: "jusqu’à 130€/an",
    intro:
      "Le mobile est devenu très concurrentiel. Beaucoup d’utilisateurs paient encore pour trop de data, des options inutiles ou un forfait historique qui n’a plus de raison d’être.",
    painPoints: ["Trop de data inutilisée", "Options oubliées", "Offre ancienne", "Besoin Suisse mal couvert"],
    steps: [
      { title: "Mesure ta vraie data", body: "Moins de 20 Go, 20 à 100 Go ou usage intensif : c’est le premier filtre." },
      { title: "Vérifie la zone", body: "France, Europe ou Suisse incluse : les frontaliers doivent regarder ce point de près." },
      { title: "Choisis le bon équilibre", body: "Le meilleur forfait combine prix, réseau et simplicité, pas seulement un tarif d’appel." },
    ],
    signals: ["Forfait ancien", "Data non utilisée", "Suisse nécessaire", "Promotion expirée"],
    faq: [
      {
        question: "Quel volume de data choisir ?",
        answer:
          "Regarde ta consommation réelle sur les trois derniers mois. Beaucoup d’utilisateurs surestiment leurs besoins et paient un forfait trop large.",
      },
      {
        question: "Le moins cher est-il toujours le meilleur forfait ?",
        answer:
          "Non. Le réseau, les zones incluses et les conditions après promotion comptent autant que le prix affiché.",
      },
    ],
  },
  {
    slug: "assurance-animaux-chien-chat",
    title: "Assurance animaux : comparer pour chien ou chat sans formule inutile",
    description:
      "Guide pour comparer assurance animaux, âge, niveau de protection, accidents, maladies et budget annuel.",
    eyebrow: "Assurance animaux",
    categorySlug: "assurance-animaux",
    intent: "comparer",
    heroMetric: "jusqu’à 180€/an",
    intro:
      "Chien, chat ou plusieurs animaux : le bon contrat dépend de l’âge, du niveau de protection et du budget que tu veux sécuriser. L’objectif est d’éviter une formule trop légère ou inutilement lourde.",
    painPoints: ["Frais vétérinaires imprévus", "Animal vieillissant", "Plafonds peu clairs"],
    steps: [
      { title: "Définis l’animal et son âge", body: "L’âge influence fortement l’intérêt des garanties maladie et accidents." },
      { title: "Compare les plafonds", body: "Un remboursement intéressant dépend aussi du plafond annuel et des exclusions." },
      { title: "Évite la surprotection", body: "Le contrat doit protéger sans absorber un budget disproportionné chaque mois." },
    ],
    signals: ["Jeune animal", "Race fragile", "Frais récents", "Budget vétérinaire élevé"],
    faq: [
      {
        question: "Une assurance animaux rembourse-t-elle tout ?",
        answer:
          "Non. Chaque contrat possède des plafonds, franchises, délais de carence et exclusions. Il faut les lire avant de souscrire.",
      },
      {
        question: "Est-ce utile pour un jeune animal ?",
        answer:
          "Cela peut l’être pour sécuriser les accidents ou maladies imprévues, mais le bon niveau dépend du budget et du risque accepté.",
      },
    ],
  },
  {
    slug: "frontalier-change-chf-eur",
    title: "Frontalier Suisse-France : réduire les pertes sur le change CHF/EUR",
    description:
      "Guide frontalier pour comparer les solutions de change CHF/EUR et repérer les frais invisibles sur les conversions régulières.",
    eyebrow: "Frontaliers",
    categorySlug: "change-chf-eur",
    intent: "optimiser",
    heroMetric: "CHF → EUR",
    intro:
      "Quand ton salaire arrive en CHF et que tes dépenses sont en euros, quelques dixièmes de frais peuvent devenir une vraie somme sur l’année. Le change mérite donc un comparateur à part entière.",
    painPoints: ["Taux peu lisible", "Frais bancaires", "Conversions régulières", "Virements transfrontaliers"],
    steps: [
      { title: "Estime le volume mensuel", body: "Plus le montant converti est important, plus l’écart de taux devient sensible." },
      { title: "Compare taux et frais", body: "Il faut regarder le taux appliqué, les frais fixes et le délai de transfert." },
      { title: "Mesure l’économie annuelle", body: "Une petite différence mensuelle peut devenir significative sur douze mois." },
    ],
    signals: ["Salaire CHF", "Dépenses France", "Banque traditionnelle", "Frais invisibles"],
    faq: [
      {
        question: "Pourquoi le change CHF/EUR coûte-t-il parfois cher ?",
        answer:
          "Le coût peut venir du taux appliqué, de frais fixes, d’une marge de change ou de frais bancaires intermédiaires.",
      },
      {
        question: "Un frontalier doit-il comparer souvent ?",
        answer:
          "Oui, surtout si le volume converti est régulier. Le bon outil peut changer selon les frais, les délais et les conditions du moment.",
      },
    ],
  },
  {
    slug: "reduire-abonnements-mensuels",
    title: "Réduire ses abonnements mensuels sans perdre les services utiles",
    description:
      "Méthode pour repérer les abonnements inutilisés, réduire les prélèvements récurrents et garder les services vraiment utiles.",
    eyebrow: "Abonnements",
    categorySlug: "abonnements",
    intent: "économiser",
    heroMetric: "mensuel",
    intro:
      "Les abonnements sont les petites fuites parfaites : streaming, apps, logiciels, sport ou loisirs. Individuellement, ils semblent modestes ; ensemble, ils peuvent créer une vraie fuite annuelle.",
    painPoints: ["Services oubliés", "Prélèvements multiples", "Offres doublons", "Usage en baisse"],
    steps: [
      { title: "Liste les prélèvements", body: "Commence par identifier ce qui revient chaque mois, même les petits montants." },
      { title: "Classe par usage réel", body: "Un service non utilisé depuis deux mois mérite d’être réduit, suspendu ou remplacé." },
      { title: "Garde une routine", body: "La meilleure optimisation est celle qu’on revoit régulièrement, pas une fois tous les trois ans." },
    ],
    signals: ["Doublons streaming", "Apps oubliées", "Sport inutilisé", "Essais gratuits terminés"],
    faq: [
      {
        question: "Quels abonnements regarder en premier ?",
        answer:
          "Les services peu utilisés, les doublons streaming, les apps premium et les abonnements liés à un ancien besoin sont souvent les premiers candidats.",
      },
      {
        question: "Faut-il tout résilier ?",
        answer:
          "Non. L’objectif est de garder ce qui sert vraiment et de retirer ce qui prélève sans valeur réelle.",
      },
    ],
  },
  {
    slug: "mutuelle-sante-economiser",
    title: "Mutuelle santé : économiser en gardant les bons postes couverts",
    description:
      "Compare mutuelle santé selon optique, dentaire, hospitalisation, foyer couvert et économie annuelle estimée.",
    eyebrow: "Mutuelle santé",
    categorySlug: "mutuelle-sante",
    intent: "optimiser",
    heroMetric: "jusqu’à 416€/an",
    intro:
      "Une mutuelle utile n’est pas forcément la plus chère. Elle doit couvrir les postes qui comptent pour toi : optique, dentaire, hospitalisation, soins courants ou famille.",
    painPoints: ["Cotisation élevée", "Postes inutiles", "Famille mal couverte", "Besoins qui changent"],
    steps: [
      { title: "Priorise les soins importants", body: "Dentaire, optique ou hospitalisation : choisis d’abord le poste décisif." },
      { title: "Compare le foyer réel", body: "Une formule solo, couple ou famille ne se lit pas de la même manière." },
      { title: "Regarde le reste à charge", body: "Le prix mensuel compte, mais le reste à charge potentiel compte aussi." },
    ],
    signals: ["Cotisation élevée", "Peu de remboursements", "Nouveau besoin santé", "Famille qui évolue"],
    faq: [
      {
        question: "Comment choisir une mutuelle santé ?",
        answer:
          "Commence par tes soins probables, ton foyer et ton budget. Une bonne mutuelle est adaptée à ton usage, pas seulement riche en garanties.",
      },
      {
        question: "Peut-on payer moins sans être moins couvert ?",
        answer:
          "Oui dans certains cas, si le contrat actuel couvre trop de postes inutiles ou n’est plus aligné avec ta situation.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function getGuideCategory(guide: SeoGuide): Category {
  const category = categories.find((item) => item.slug === guide.categorySlug);

  if (!category) {
    throw new Error(`Missing category for SEO guide: ${guide.slug}`);
  }

  return category;
}

export function getGuideUrl(slug: string) {
  return `${siteConfig.url}/guides/${slug}`;
}

export function buildGuideJsonLd(guide: SeoGuide) {
  const category = getGuideCategory(guide);
  const url = getGuideUrl(guide.slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides économies", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url,
      inLanguage: "fr-FR",
      about: category.title,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
