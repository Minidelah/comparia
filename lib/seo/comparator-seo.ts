import type { Category } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export type ComparatorSeoContent = {
  title: string;
  description: string;
  intro: string;
  benefits: string[];
  analysisPoints: string[];
  faqs: { question: string; answer: string }[];
};

const groupIntros: Record<Category["group"], string> = {
  Assurances:
    "Les contrats d’assurance peuvent sembler similaires, mais les écarts de prix viennent souvent des garanties, exclusions, franchises et habitudes conservées trop longtemps. Comparia aide à remettre le contrat en concurrence sans perdre de vue le niveau de protection utile.",
  Maison:
    "Les factures du quotidien reviennent chaque mois et finissent par peser lourd. Comparia clarifie les usages réels, sépare les besoins importants des options secondaires, puis prépare une comparaison plus lisible avant toute redirection partenaire.",
  Finances:
    "Les services financiers doivent être comparés avec méthode : frais, usage réel, qualité d’application, conditions et économies potentielles. Comparia transforme ces éléments en lecture simple pour éviter les choix par défaut.",
  Frontaliers:
    "Les profils Suisse-France ont des arbitrages particuliers : revenus en CHF, dépenses en euros, santé, banque, change et services utilisés des deux côtés de la frontière. Comparia organise ces décisions pour rendre les pertes invisibles plus faciles à repérer.",
};

const groupBenefits: Record<Category["group"], string[]> = {
  Assurances: [
    "Comparer à garanties cohérentes au lieu de regarder seulement le prix d’appel.",
    "Identifier les contrats devenus trop chers après plusieurs années d’inertie.",
    "Prioriser les offres lisibles, activables et compatibles avec ton profil.",
  ],
  Maison: [
    "Repérer les économies récurrentes sur les dépenses qui tombent chaque mois.",
    "Comparer selon ton usage réel plutôt qu’une moyenne marketing.",
    "Réduire la friction entre diagnostic, recommandation et activation de l’offre.",
  ],
  Finances: [
    "Mettre les frais, avantages et services dans une même grille de lecture.",
    "Distinguer les économies directes des avantages comme le cashback.",
    "Préparer des recommandations plus utiles pour les usages bancaires modernes.",
  ],
  Frontaliers: [
    "Traiter séparément les sujets CHF/EUR, santé et services transfrontaliers.",
    "Repérer les pertes discrètes liées au change, aux frais et aux contrats mal adaptés.",
    "Adapter les recommandations aux besoins France-Suisse plutôt qu’au marché français moyen.",
  ],
};

const groupAnalysis: Record<Category["group"], string[]> = {
  Assurances: ["profil", "usage", "niveau de couverture", "économie annuelle", "facilité d’activation"],
  Maison: ["consommation", "usage du foyer", "prix mensuel", "engagement", "économie annuelle"],
  Finances: ["frais", "usage quotidien", "services inclus", "cashback", "qualité d’expérience"],
  Frontaliers: ["volume CHF/EUR", "pays d’usage", "frais", "statut familial", "économie estimée"],
};

const categoryOverrides: Record<string, Partial<ComparatorSeoContent>> = {
  "assurance-auto": {
    description:
      "Compare ton assurance auto à garanties utiles : usage, couverture, profil conducteur et économies estimées avant activation.",
  },
  "assurance-habitation": {
    description:
      "Compare ton assurance habitation selon ton logement, ton statut et les garanties utiles. Estime l’économie annuelle avant de choisir.",
  },
  "forfait-mobile": {
    description:
      "Compare les forfaits mobiles selon ta data, ton réseau et tes besoins France, Europe ou Suisse. Évite de payer trop cher.",
  },
  electricite: {
    description:
      "Compare les offres d’électricité selon ton logement, ton objectif et ta consommation. Sépare prix, stabilité et offre verte.",
  },
  gaz: {
    description:
      "Compare les offres de gaz selon ton usage : cuisine, eau chaude ou chauffage. Estime ton économie sans mélange avec l’électricité.",
  },
  "change-chf-eur": {
    description:
      "Compare les solutions de change CHF/EUR pour frontaliers Suisse-France et repère les frais invisibles sur tes conversions régulières.",
  },
  abonnements: {
    description:
      "Repère les abonnements qui prélèvent encore chaque mois et priorise les services à réduire, regrouper ou remplacer.",
  },
};

function lowercaseFirst(value: string) {
  return value.charAt(0).toLocaleLowerCase("fr-FR") + value.slice(1);
}

function savingPhrase(category: Category) {
  if (category.saving === "bientôt") return "un potentiel d’économie à estimer dès l’ouverture";
  if (category.saving.startsWith("selon")) return "une économie variable selon ton usage";
  return category.saving;
}

export function getComparatorSeo(category: Category): ComparatorSeoContent {
  const label = lowercaseFirst(category.title);
  const base: ComparatorSeoContent = {
    title: `Comparateur ${category.title} : estime tes économies`,
    description: `Compare ${label} avec ${siteConfig.name} : questionnaire gratuit, recommandations lisibles, offres triées et ${savingPhrase(category)}.`,
    intro: groupIntros[category.group],
    benefits: groupBenefits[category.group],
    analysisPoints: groupAnalysis[category.group],
    faqs: [
      {
        question: `Comment ${siteConfig.name} estime l’économie sur ${label} ?`,
        answer: `${siteConfig.name} utilise tes réponses, le type de contrat, ton usage déclaré et les offres disponibles pour produire une estimation simple. Le chiffre reste indicatif : il sert à prioriser les meilleures pistes avant vérification finale auprès du partenaire.`,
      },
      {
        question: `Le comparateur ${category.title} est-il gratuit ?`,
        answer:
          "Oui. Le diagnostic est gratuit et sans engagement. Certaines offres peuvent rémunérer Comparia si tu souscris via un lien partenaire, mais la recommandation garde une séparation claire entre économie, cashback et sponsorisation.",
      },
      {
        question: "Que se passe-t-il quand je clique sur une offre ?",
        answer:
          `Tu es redirigé vers le site du partenaire ou de l’annonceur pour consulter les conditions exactes et finaliser si tu le souhaites. ${siteConfig.name} prépare la comparaison, mais la souscription reste toujours sous ton contrôle.`,
      },
    ],
  };

  const override = categoryOverrides[category.slug] ?? {};
  return {
    ...base,
    ...override,
    faqs: override.faqs ?? base.faqs,
    benefits: override.benefits ?? base.benefits,
    analysisPoints: override.analysisPoints ?? base.analysisPoints,
  };
}

export function getComparatorUrl(slug: string) {
  return `${siteConfig.url}/comparateurs/${slug}`;
}

export function buildComparatorJsonLd(category: Category, seo: ComparatorSeoContent) {
  const url = getComparatorUrl(category.slug);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Comparateurs",
          item: `${siteConfig.url}/comparateurs`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.title,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url,
      inLanguage: "fr-FR",
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
}
