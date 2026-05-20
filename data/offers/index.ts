import type { AffiliateOffer } from "./types";
import { mobileOffers } from "./mobile";
import { internetOffers } from "./internet";
import { energyOffers } from "./energy";
import { bankOffers } from "./bank";
import { insuranceOffers } from "./insurance";
import { leasingOffers } from "./leasing";
import { frontierOffers } from "./frontier";

export type { AffiliateOffer, OfferCategory } from "./types";

export const structuredOffers: AffiliateOffer[] = [
  ...insuranceOffers,
  ...energyOffers,
  ...mobileOffers,
  ...internetOffers,
  ...bankOffers,
  ...frontierOffers,
  ...leasingOffers,
].sort((a, b) => b.priority - a.priority || b.estimatedSaving - a.estimatedSaving);

export function getStructuredOffersForCategory(comparatorSlug: string) {
  return structuredOffers.filter((offer) => offer.comparatorSlug === comparatorSlug);
}
