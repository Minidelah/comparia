import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const internetOffers: AffiliateOffer[] = [
  {
    id: "internet-red-fibre",
    name: "Box fibre essentielle",
    category: "internet",
    provider: "RED",
    monthlyPrice: 24.99,
    estimatedSaving: 180,
    cashback: 0,
    affiliateLink: "/comparateurs/box-internet#devis",
    logo: googleLogo("red-by-sfr.fr"),
    rating: 4.2,
    tags: ["Fibre", "Prix bas", "Sans engagement"],
    priority: 74,
    comparatorSlug: "box-internet",
    description: "Une piste intéressante pour réduire une facture box devenue trop haute.",
  },
  {
    id: "internet-bouygues-balanced",
    name: "Box foyer connecté",
    category: "internet",
    provider: "B&You",
    monthlyPrice: 29.99,
    estimatedSaving: 140,
    cashback: 0,
    affiliateLink: "/comparateurs/box-internet#devis",
    logo: googleLogo("bouyguestelecom.fr"),
    rating: 4.3,
    tags: ["Fibre", "Wi‑Fi", "Famille"],
    priority: 69,
    comparatorSlug: "box-internet",
    description: "Un compromis plus confortable pour les foyers qui veulent garder une bonne qualité de service.",
  },
];
