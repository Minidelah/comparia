import type { AffiliateOffer } from "./types";
import { googleLogo } from "./types";

export const frontierOffers: AffiliateOffer[] = [
  {
    id: "frontier-wise-chf-eur",
    name: "Change CHF/EUR optimisé",
    category: "frontier",
    provider: "Wise",
    monthlyPrice: null,
    estimatedSaving: 310,
    cashback: 0,
    affiliateLink: "/comparateurs/change-chf-eur#devis",
    logo: googleLogo("wise.com"),
    rating: 4.7,
    tags: ["CHF/EUR", "Frontaliers", "Frais réduits"],
    priority: 88,
    comparatorSlug: "change-chf-eur",
    description: "Un repère crédible pour réduire les marges sur conversions régulières.",
  },
  {
    id: "frontier-health-lamal",
    name: "Santé frontalier clarifiée",
    category: "frontier",
    provider: "Comparia",
    monthlyPrice: null,
    estimatedSaving: 220,
    cashback: 0,
    affiliateLink: "/comparateurs/assurance-sante-frontaliers#devis",
    logo: googleLogo("admin.ch"),
    rating: 4.4,
    tags: ["LAMal", "CMU", "France‑Suisse"],
    priority: 80,
    comparatorSlug: "assurance-sante-frontaliers",
    description: "Une entrée structurée pour clarifier les arbitrages santé des frontaliers.",
  },
];
