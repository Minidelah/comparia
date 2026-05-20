import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type OfferBadge = "Meilleur choix" | "Meilleur prix" | "Meilleur cashback" | "Sponsorisé";

export type OfferSlot = {
  id: string;
  categorySlug: string;
  badge: OfferBadge;
  title: string;
  description: string;
  annualSavings: string;
  cashback?: string;
  sponsored?: boolean;
  affiliateUrl?: string;
  provider?: string;
};

type OfferRow = {
  id: string;
  category: string;
  provider: string;
  title: string;
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
      .select("id,category,provider,title,annual_savings_estimate,affiliate_url,cashback_amount,sponsored,active,metadata")
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

    const mapped = ((data ?? []) as OfferRow[]).map(mapOfferRow).filter(Boolean) as OfferSlot[];
    return mapped.length > 0 ? mapped : fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Unexpected offer loading failure", error);
    }
    return fallback;
  }
}

function getFallbackOfferSlotsForCategory(categorySlug: string) {
  return offerSlots.filter((offer) => offer.categorySlug === categorySlug);
}

function mapOfferRow(row: OfferRow): OfferSlot | null {
  if (!row.id || !row.category || !row.title) return null;

  const metadata = row.metadata ?? {};
  const metadataBadge = typeof metadata.badge === "string" ? metadata.badge : undefined;
  const metadataDescription = typeof metadata.description === "string" ? metadata.description : undefined;
  const metadataAnnualSavings = typeof metadata.annualSavings === "string" ? metadata.annualSavings : undefined;
  const metadataCashback = typeof metadata.cashback === "string" ? metadata.cashback : undefined;
  const badge = row.sponsored ? "Sponsorisé" : normalizeBadge(metadataBadge);
  const annualSavings = row.annual_savings_estimate
    ? `jusqu’à ${Math.round(row.annual_savings_estimate)}€/an`
    : metadataAnnualSavings || "selon ton profil";

  return {
    id: row.id,
    categorySlug: row.category,
    provider: row.provider,
    badge,
    title: row.provider ? `${row.provider} · ${row.title}` : row.title,
    description: metadataDescription || "Offre partenaire prête à être testée dans ton tunnel Comparia.",
    annualSavings,
    cashback: row.cashback_amount ? `+${Math.round(row.cashback_amount)}€ cashback potentiel` : metadataCashback,
    sponsored: Boolean(row.sponsored),
    affiliateUrl: normalizeUrl(row.affiliate_url),
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
