import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const bankOffers: AffiliateOffer[] = [
  {
    id: "bank-boursobank-card",
    name: "Compte bancaire moderne",
    category: "bank",
    provider: "Boursobank",
    monthlyPrice: 0,
    estimatedSaving: 120,
    cashback: 0,
    affiliateLink: "/comparateurs/banque#devis",
    logo: googleLogo("boursobank.com"),
    rating: 4.6,
    tags: ["Carte", "Frais réduits", "App mobile"],
    priority: 76,
    comparatorSlug: "banque",
    description: "Une piste cohérente pour réduire les frais bancaires récurrents.",
  },
  {
    id: "bank-fortuneo-premium",
    name: "Banque en ligne premium",
    category: "bank",
    provider: "Fortuneo",
    monthlyPrice: 0,
    estimatedSaving: 110,
    cashback: 0,
    affiliateLink: "/comparateurs/banque#devis",
    logo: googleLogo("fortuneo.fr"),
    rating: 4.5,
    tags: ["Épargne", "Carte", "Voyage"],
    priority: 71,
    comparatorSlug: "banque",
    description: "Pertinent pour les profils qui veulent de bons services sans frais inutiles.",
  },
];
