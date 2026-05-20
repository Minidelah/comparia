export type OfferCategory = "mobile" | "internet" | "energy" | "bank" | "insurance" | "leasing" | "frontier";

export type AffiliateOffer = {
  id: string;
  name: string;
  category: OfferCategory;
  provider: string;
  monthlyPrice: number | null;
  estimatedSaving: number;
  cashback: number;
  affiliateLink: string;
  logo: string;
  rating: number;
  tags: string[];
  priority: number;
  comparatorSlug: string;
  description: string;
};

export function googleLogo(domain: string) {
  return `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`;
}
