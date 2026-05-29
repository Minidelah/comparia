import { siteConfig } from "@/lib/site";

export type OrganicPost = {
  id: string;
  title: string;
  description: string;
  linkPath: string;
  imagePath: string;
  altText: string;
};

export const organicPinterestQueue: OrganicPost[] = [
  {
    id: "checklist-factures",
    title: "Checklist factures à vérifier",
    description: "Les 10 lignes à regarder pour repérer les contrats qui coûtent trop cher chaque mois.",
    linkPath: "/guides/checklist-factures-a-verifier",
    imagePath: "/organic/pinterest-checklist-factures.png",
    altText: "Visuel Comparia checklist factures à vérifier",
  },
  {
    id: "box-mobile",
    title: "Ta box est trop chère ?",
    description: "Compare box internet, mobile et TV en 2 minutes avec Comparia.",
    linkPath: "/guides/facture-box-trop-chere",
    imagePath: "/organic/pinterest-box-mobile.png",
    altText: "Visuel Comparia pour comparer box internet et forfait mobile",
  },
  {
    id: "assurance-augmente",
    title: "Assurance qui augmente ?",
    description: "Compare garanties, franchises et prix annuel avant de renouveler automatiquement.",
    linkPath: "/guides/assurance-habitation-augmentation",
    imagePath: "/organic/pinterest-assurance.png",
    altText: "Visuel Comparia assurance habitation et auto à comparer",
  },
  {
    id: "economiser-300",
    title: "Économiser 300 euros par an",
    description: "Les factures à vérifier en priorité pour viser des économies concrètes sur l’année.",
    linkPath: "/guides/economiser-300-euros-par-an",
    imagePath: "/organic/pinterest-checklist-factures.png",
    altText: "Visuel Comparia pour économiser sur ses factures",
  },
  {
    id: "mobile-trop-cher",
    title: "Facture mobile trop chère",
    description: "Réduis ton forfait sans perdre le bon réseau : data, Europe, Suisse et prix durable.",
    linkPath: "/guides/facture-mobile-trop-chere",
    imagePath: "/organic/pinterest-box-mobile.png",
    altText: "Visuel Comparia facture mobile trop chère",
  },
  {
    id: "frontaliers",
    title: "Frontaliers Suisse : factures à comparer",
    description: "Change CHF/EUR, santé, mobile, banque : les priorités pour réduire les frais invisibles.",
    linkPath: "/guides/frontaliers-suisse-economiser-factures",
    imagePath: "/organic/pinterest-checklist-factures.png",
    altText: "Visuel Comparia frontaliers Suisse France",
  },
  {
    id: "banque-gratuite",
    title: "Banque en ligne gratuite",
    description: "Carte, retraits, voyage, application : les conditions à vérifier avant de changer.",
    linkPath: "/guides/banque-en-ligne-gratuite",
    imagePath: "/organic/pinterest-checklist-factures.png",
    altText: "Visuel Comparia banque en ligne gratuite",
  },
];

const queueStartDate = Date.UTC(2026, 4, 29);
const dayMs = 24 * 60 * 60 * 1000;

export function getOrganicPostForDate(date = new Date()) {
  const utcDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const index = Math.max(0, Math.floor((utcDay - queueStartDate) / dayMs)) % organicPinterestQueue.length;
  return organicPinterestQueue[index];
}

export function absoluteSiteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
