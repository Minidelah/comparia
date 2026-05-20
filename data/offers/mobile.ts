import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const mobileOffers: AffiliateOffer[] = [
  {
    id: "mobile-free-5g",
    name: "Forfait 5G ajusté",
    category: "mobile",
    provider: "Free",
    monthlyPrice: 19.99,
    estimatedSaving: 130,
    cashback: 0,
    affiliateLink: "/comparateurs/forfait-mobile#devis",
    logo: googleLogo("free.fr"),
    rating: 4.5,
    tags: ["5G", "Sans engagement", "Data élevée"],
    priority: 85,
    comparatorSlug: "forfait-mobile",
    description: "Un bon repère pour les profils qui veulent beaucoup de data sans exploser le budget.",
  },
  {
    id: "mobile-sosh-flex",
    name: "Forfait réseau premium",
    category: "mobile",
    provider: "Sosh",
    monthlyPrice: 15.99,
    estimatedSaving: 110,
    cashback: 0,
    affiliateLink: "/comparateurs/forfait-mobile#devis",
    logo: googleLogo("sosh.fr"),
    rating: 4.4,
    tags: ["Réseau", "Sans engagement", "Simple"],
    priority: 78,
    comparatorSlug: "forfait-mobile",
    description: "Pertinent si le réseau et la stabilité comptent autant que le prix.",
  },
];
