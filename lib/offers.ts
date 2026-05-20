import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getStructuredOffersForCategory, type AffiliateOffer } from "@/data/offers";

export type OfferBadge = "Meilleur choix" | "Meilleur prix" | "Meilleur cashback" | "Sponsorisé";

export type OfferSlot = {
  id: string;
  categorySlug: string;
  badge: OfferBadge;
  title: string;
  description: string;
  annualSavings: string;
  estimatedSaving?: number;
  monthlyPrice?: number | null;
  cashback?: string;
  cashbackAmount?: number;
  sponsored?: boolean;
  affiliateUrl?: string;
  provider?: string;
  logo?: string;
  rating?: number;
  tags?: string[];
  priority?: number;
};

type OfferRow = {
  id: string;
  category: string;
  provider: string;
  title: string;
  monthly_cost: number | null;
  annual_savings_estimate: number | null;
  affiliate_url: string | null;
  cashback_amount: number | null;
  sponsored: boolean | null;
  active: boolean | null;
  metadata: Record<string, unknown> | null;
};

export const offerSlots: OfferSlot[] = [
  {
    id: "energy-best-fit",
    categorySlug: "electricite",
    badge: "Meilleur choix",
    title: "Offre énergie adaptée à ton foyer",
    description: "Le meilleur équilibre entre économie annuelle, simplicité et adéquation à ton profil.",
    annualSavings: "jusqu’à 180€/an",
  },
  {
    id: "energy-cashback",
    categorySlug: "gaz",
    badge: "Meilleur cashback",
    title: "Offre énergie avec bonus d’activation",
    description: "Intéressante si tu veux maximiser le gain la première année.",
    annualSavings: "jusqu’à 160€/an",
    cashback: "+20€ potentiel",
  },
  {
    id: "auto-best-fit",
    categorySlug: "assurance-auto",
    badge: "Meilleur choix",
    title: "Assurance auto équilibrée",
    description: "Le compromis le plus solide entre prix, garanties et facilité de souscription.",
    annualSavings: "jusqu’à 396€/an",
  },
  {
    id: "auto-price",
    categorySlug: "assurance-auto",
    badge: "Meilleur prix",
    title: "Assurance auto la plus agressive",
    description: "À privilégier si ton objectif principal est la baisse de mensualité.",
    annualSavings: "jusqu’à 420€/an",
  },
  {
    id: "mobile-best-fit",
    categorySlug: "forfait-mobile",
    badge: "Meilleur choix",
    title: "Forfait mobile ajusté",
    description: "Une offre pensée pour éviter de payer de la data inutile.",
    annualSavings: "jusqu’à 130€/an",
  },
  {
    id: "pet-best-fit",
    categorySlug: "assurance-animaux",
    badge: "Meilleur choix",
    title: "Assurance animaux adaptée",
    description: "Une formule calibrée selon l’âge de l’animal et le niveau de protection réellement utile.",
    annualSavings: "jusqu’à 180€/an",
  },
  {
    id: "fx-best-fit",
    categorySlug: "change-chf-eur",
    badge: "Meilleur choix",
    title: "Solution de change optimisée",
    description: "Conçue pour réduire les marges sur des conversions régulières CHF/EUR.",
    annualSavings: "jusqu’à 310€/an",
  },
];

export async function getOfferSlotsForCategory(categorySlug: string): Promise<OfferSlot[]> {
  const fallback = getFallbackOfferSlotsForCategory(categorySlug);

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("offers")
      .select("id,category,provider,title,monthly_cost,annual_savings_estimate,affiliate_url,cashback_amount,sponsored,active,metadata")
      .eq("category", categorySlug)
      .eq("active", true)
      .order("sponsored", { ascending: true })
      .order("annual_savings_estimate", { ascending: false, nullsFirst: false })
      .limit(6);

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to load Supabase offers", error);
      }
      return fallback;
    }

    const mapped = ((data ?? []) as OfferRow[]).filter(isPlausibleOfferRow).map(mapOfferRow).filter(Boolean) as OfferSlot[];
    return mapped.length > 0 ? mapped : fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Unexpected offer loading failure", error);
    }
    return fallback;
  }
}

function getFallbackOfferSlotsForCategory(categorySlug: string) {
  const structured = getStructuredOffersForCategory(categorySlug).map(mapStructuredOffer);
  const legacy = offerSlots.filter((offer) => offer.categorySlug === categorySlug);
  return [...structured, ...legacy].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

function mapOfferRow(row: OfferRow): OfferSlot | null {
  if (!row.id || !row.category || !row.title) return null;

  const metadata = row.metadata ?? {};
  const metadataBadge = typeof metadata.badge === "string" ? metadata.badge : undefined;
  const metadataDescription = typeof metadata.description === "string" ? metadata.description : undefined;
  const metadataAnnualSavings = typeof metadata.annualSavings === "string" ? metadata.annualSavings : undefined;
  const metadataCashback = typeof metadata.cashback === "string" ? metadata.cashback : undefined;
  const metadataPriority = typeof metadata.priority === "number" ? metadata.priority : undefined;
  const metadataRating = typeof metadata.rating === "number" ? metadata.rating : undefined;
  const metadataTags = Array.isArray(metadata.tags) ? metadata.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 4) : undefined;
  const badge = row.sponsored ? "Sponsorisé" : normalizeBadge(metadataBadge);
  const annualSavings = row.annual_savings_estimate
    ? `jusqu’à ${Math.round(row.annual_savings_estimate)}€/an`
    : metadataAnnualSavings || "selon ton profil";
  const cashbackAmount = row.cashback_amount ? Math.round(row.cashback_amount) : 0;

  return {
    id: row.id,
    categorySlug: row.category,
    provider: row.provider,
    badge,
    title: row.provider ? `${row.provider} · ${row.title}` : row.title,
    description: metadataDescription || "Offre partenaire prête à être testée dans ton tunnel Comparia.",
    annualSavings,
    estimatedSaving: row.annual_savings_estimate ? Math.round(row.annual_savings_estimate) : undefined,
    monthlyPrice: row.monthly_cost,
    cashback: cashbackAmount > 0 ? `+${cashbackAmount}€ cashback potentiel` : metadataCashback,
    cashbackAmount,
    sponsored: Boolean(row.sponsored),
    affiliateUrl: normalizeUrl(row.affiliate_url),
    logo: buildLogoUrl(row),
    rating: metadataRating ?? 4.4,
    tags: metadataTags ?? buildDefaultTags(row.category),
    priority: metadataPriority ?? Math.round(row.annual_savings_estimate ?? 50),
  };
}

function mapStructuredOffer(offer: AffiliateOffer): OfferSlot {
  return {
    id: offer.id,
    categorySlug: offer.comparatorSlug,
    badge: offer.cashback > 0 ? "Meilleur cashback" : "Meilleur choix",
    title: `${offer.provider} · ${offer.name}`,
    description: offer.description,
    annualSavings: offer.estimatedSaving > 0 ? `jusqu’à ${offer.estimatedSaving}€/an` : "selon ton profil",
    estimatedSaving: offer.estimatedSaving,
    monthlyPrice: offer.monthlyPrice,
    cashback: offer.cashback > 0 ? `+${offer.cashback}€ cashback potentiel` : undefined,
    cashbackAmount: offer.cashback,
    affiliateUrl: normalizeUrl(offer.affiliateLink),
    provider: offer.provider,
    logo: normalizeUrl(offer.logo),
    rating: offer.rating,
    tags: offer.tags,
    priority: offer.priority,
  };
}

function normalizeBadge(value?: string): OfferBadge {
  if (value === "Meilleur prix") return "Meilleur prix";
  if (value === "Meilleur cashback") return "Meilleur cashback";
  if (value === "Sponsorisé") return "Sponsorisé";
  return "Meilleur choix";
}

function normalizeUrl(value: string | null) {
  if (!value) return undefined;
  if (value.startsWith("https://") || value.startsWith("/")) return value;
  return undefined;
}

function isPlausibleOfferRow(row: OfferRow) {
  const metadata = row.metadata ?? {};
  const text = normalizeText([
    row.provider,
    metadata.awinDisplayUrl,
    metadata.awinPrimarySector,
    metadata.awinCommissionRange,
    Array.isArray(metadata.matchedTerms) ? metadata.matchedTerms.join(" ") : "",
  ].join(" "));

  if (row.category === "change-chf-eur") {
    if (/(russel|animal|chien|chat|veterinaire|pet|homeserve|depannage)/.test(text)) return false;
    return /(wise|revolut|currency|devise|chf|forex|transfer|transfert|money|monito|remitly|change)/.test(text);
  }

  if (row.category === "assurance-animaux") {
    return !/(change|forex|devise|electricite|gaz|plomberie|serrurerie)/.test(text);
  }

  return true;
}

function buildLogoUrl(row: OfferRow) {
  const metadata = row.metadata ?? {};
  const displayUrl = typeof metadata.awinDisplayUrl === "string" ? metadata.awinDisplayUrl : undefined;
  const domain = getDomain(displayUrl) ?? providerDomains[row.provider.toLowerCase()] ?? null;
  if (!domain) return undefined;
  return `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`;
}

function getDomain(value?: string) {
  if (!value) return null;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function buildDefaultTags(category: string) {
  if (category.includes("assurance")) return ["Devis rapide", "Garanties", "Profil compatible"];
  if (category === "electricite" || category === "gaz") return ["Énergie", "Facture", "Activation"];
  if (category === "forfait-mobile") return ["Mobile", "Sans engagement", "Réseau"];
  if (category === "abonnements") return ["Abonnements", "Budget", "Suivi"];
  if (category === "change-chf-eur") return ["CHF/EUR", "Frontaliers", "Frais"];
  return ["Comparia", "Économie", "Offre"];
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

const providerDomains: Record<string, string> = {
  "homeserve fr": "homeserve.fr",
  "homeserve dépannage mesbonspros": "homeserve.fr",
  "just russel fr": "justrussel.fr",
};
