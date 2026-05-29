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

const localLogos: Record<string, string> = {
  "acheel.com": "/brand-logos/acheel.svg",
  "admin.ch": "/brand-logos/admin-ch.svg",
  "boursobank.com": "/brand-logos/boursobank.svg",
  "bouyguestelecom.fr": "/brand-logos/bouygues.svg",
  "comparetesfactures.fr": "/comparia-logo.svg",
  "edf.fr": "/brand-logos/edf.svg",
  "engie.fr": "/brand-logos/engie.svg",
  "fortuneo.fr": "/brand-logos/fortuneo.svg",
  "free.fr": "/brand-logos/free.svg",
  "homeserve.fr": "/brand-logos/homeserve.svg",
  "justrussel.fr": "/brand-logos/justrussel.svg",
  "ohm-energie.com": "/brand-logos/ohm-energie.svg",
  "red-by-sfr.fr": "/brand-logos/red.svg",
  "revolut.com": "/brand-logos/revolut.svg",
  "sosh.fr": "/brand-logos/sosh.svg",
  "wise.com": "/brand-logos/wise.svg",
};

export function googleLogo(domain: string) {
  return localLogos[domain] ?? `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`;
}
