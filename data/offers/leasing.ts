import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const leasingOffers: AffiliateOffer[] = [
  {
    id: "leasing-auto-watch",
    name: "Leasing auto à surveiller",
    category: "leasing",
    provider: "CompareTesFactures",
    monthlyPrice: null,
    estimatedSaving: 240,
    cashback: 0,
    affiliateLink: "/comparateurs/assurance-auto#devis",
    logo: googleLogo("comparetesfactures.fr"),
    rating: 4.1,
    tags: ["Auto", "Budget", "Bientôt"],
    priority: 45,
    comparatorSlug: "assurance-auto",
    description: "Brique préparée pour comparer demain le coût global auto : assurance, financement et entretien.",
  },
];
