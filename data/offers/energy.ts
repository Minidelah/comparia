import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const energyOffers: AffiliateOffer[] = [
  {
    id: "energy-electricity-balanced",
    name: "Électricité foyer optimisée",
    category: "energy",
    provider: "EDF",
    monthlyPrice: null,
    estimatedSaving: 120,
    cashback: 0,
    affiliateLink: "/comparateurs/electricite#devis",
    logo: googleLogo("edf.fr"),
    rating: 4.4,
    tags: ["Électricité", "Foyer", "Contrat clair"],
    priority: 82,
    comparatorSlug: "electricite",
    description: "Une base fiable pour comparer ta facture électrique à profil équivalent.",
  },
  {
    id: "energy-green-gas",
    name: "Gaz et énergie verte",
    category: "energy",
    provider: "Engie",
    monthlyPrice: null,
    estimatedSaving: 90,
    cashback: 0,
    affiliateLink: "/comparateurs/gaz#devis",
    logo: googleLogo("engie.fr"),
    rating: 4.3,
    tags: ["Gaz", "Énergie", "Stabilité"],
    priority: 72,
    comparatorSlug: "gaz",
    description: "Utile pour traiter le gaz séparément et éviter les comparaisons trop floues.",
  },
];
