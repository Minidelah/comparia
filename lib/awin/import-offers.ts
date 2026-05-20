import crypto from "node:crypto";
import { categories } from "@/lib/categories";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

const AWIN_BASE_URL = "https://api.awin.com";

type AwinProgramme = {
  id?: number;
  name?: string;
  displayUrl?: string;
  clickThroughUrl?: string;
  description?: string;
  primarySector?: string | { name?: string };
  primaryRegion?: { name?: string; countryCode?: string };
  validDomains?: string[];
  status?: string;
  relationshipStatus?: string;
  commissionRange?: string;
  logoUrl?: string;
};

type CategoryRule = {
  slug: string;
  keywords: string[];
  negativeKeywords?: string[];
  minimumScore?: number;
};

type ClassifiedProgramme = {
  programme: Required<Pick<AwinProgramme, "id" | "name">> & AwinProgramme;
  categorySlug: string;
  score: number;
  matchedTerms: string[];
};

export type AwinImportSummary = {
  ok: true;
  dryRun: boolean;
  publisherId: string;
  programmesFetched: number;
  matchedProgrammes: number;
  offersPrepared: number;
  offersImported: number;
  skippedProgrammes: number;
  categories: Record<string, number>;
  sample: {
    categorySlug: string;
    provider: string;
    title: string;
    hasAffiliateUrl: boolean;
  }[];
  warnings: string[];
};

const CATEGORY_RULES: CategoryRule[] = [
  {
    slug: "assurance-auto",
    keywords: ["assurance auto", "assurance voiture", "voiture", "automobile", "auto insurance", "car insurance", "conducteur"],
    negativeKeywords: ["location voiture", "rental", "pièces auto", "accessoires auto", "leasing"],
  },
  {
    slug: "assurance-moto",
    keywords: ["assurance moto", "moto", "scooter", "deux roues", "2 roues", "motard"],
    negativeKeywords: ["location", "accessoires", "casque", "équipement"],
  },
  {
    slug: "assurance-velo",
    keywords: ["assurance vélo", "velo", "vélo", "bike insurance", "vélo électrique", "vae"],
    negativeKeywords: ["vêtement", "accessoires", "pièces"],
  },
  {
    slug: "assurance-trottinette",
    keywords: ["assurance trottinette", "trottinette", "mobilité urbaine", "edpm"],
  },
  {
    slug: "assurance-habitation",
    keywords: ["assurance habitation", "habitation", "logement", "maison", "mrh", "home insurance"],
    negativeKeywords: ["meuble", "décoration", "bricolage", "jardin"],
  },
  {
    slug: "mutuelle-sante",
    keywords: ["mutuelle", "complémentaire santé", "assurance santé", "santé", "health insurance", "optique", "dentaire"],
    negativeKeywords: ["parapharmacie", "cosmétique", "pharmacie en ligne"],
  },
  {
    slug: "assurance-sante-frontaliers",
    keywords: ["frontalier", "lamal", "cmu", "puma", "suisse", "assurance santé suisse"],
    minimumScore: 2,
  },
  {
    slug: "assurance-animaux",
    keywords: ["assurance animaux", "chien", "chat", "animal", "animaux", "pet insurance", "vétérinaire"],
    negativeKeywords: ["croquette", "animalerie", "jouet"],
  },
  {
    slug: "assurance-emprunteur",
    keywords: ["assurance emprunteur", "crédit immobilier", "pret immobilier", "prêt immobilier", "borrower insurance", "mortgage"],
  },
  {
    slug: "electricite",
    keywords: ["électricité", "electricite", "electricity", "edf", "fournisseur électricité", "énergie verte"],
    negativeKeywords: ["ampoule", "matériel électrique"],
  },
  {
    slug: "gaz",
    keywords: ["gaz", "gas", "fournisseur gaz", "chauffage gaz"],
    negativeKeywords: ["barbecue", "bouteille de gaz"],
  },
  {
    slug: "box-internet",
    keywords: ["box internet", "fibre", "adsl", "internet provider", "broadband", "wifi", "opérateur internet"],
  },
  {
    slug: "forfait-mobile",
    keywords: ["forfait mobile", "mobile", "sim", "opérateur mobile", "téléphonie mobile", "5g", "4g"],
    negativeKeywords: ["coque", "accessoire", "smartphone reconditionné"],
  },
  {
    slug: "abonnements",
    keywords: ["abonnement", "streaming", "subscription", "netflix", "prime video", "logiciel", "software", "sport"],
  },
  {
    slug: "banque",
    keywords: ["banque", "compte bancaire", "carte bancaire", "néobanque", "credit card", "bank"],
  },
  {
    slug: "change-chf-eur",
    keywords: ["change", "devise", "currency", "forex", "transfert argent", "money transfer", "chf", "eur"],
  },
];

const CATEGORY_SAVINGS: Record<string, number> = {
  "assurance-auto": 396,
  "assurance-moto": 223,
  "assurance-velo": 120,
  "assurance-trottinette": 90,
  "assurance-habitation": 480,
  "mutuelle-sante": 416,
  "assurance-sante-frontaliers": 220,
  "assurance-animaux": 180,
  "assurance-emprunteur": 900,
  electricite: 120,
  gaz: 90,
  "box-internet": 180,
  "forfait-mobile": 130,
  abonnements: 160,
  banque: 120,
  "change-chf-eur": 310,
};

export async function importAwinOffers({ dryRun = false } = {}): Promise<AwinImportSummary> {
  const token = process.env.AWIN_API_TOKEN?.trim();
  const publisherId = process.env.AWIN_PUBLISHER_ID?.trim();

  if (!token || !publisherId) {
    throw new Error("AWIN_NOT_CONFIGURED");
  }

  if (!isSupabaseConfigured() && !dryRun) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const warnings: string[] = [];
  const programmes = await fetchAwinProgrammes({ token, publisherId });
  if (programmes.length === 0) {
    warnings.push("Aucun programme Awin accepté pour ce publisher. Il faut candidater et être accepté par des annonceurs avant d’avoir des liens affiliés importables.");
  }
  const classified = classifyProgrammes(programmes);
  if (programmes.length > 0 && classified.length === 0) {
    warnings.push("Programmes Awin trouvés, mais aucun ne correspond encore clairement aux comparateurs Comparia.");
  }
  const preparedOffers = await buildOfferRows({ token, publisherId, classified, warnings });
  const categoryCounts = countByCategory(preparedOffers);

  let imported = 0;

  if (!dryRun && preparedOffers.length > 0) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("offers")
      .upsert(preparedOffers, { onConflict: "id" })
      .select("id");

    if (error) {
      throw new Error(`SUPABASE_OFFERS_IMPORT_FAILED:${error.code ?? "unknown"}:${error.message}`);
    }

    imported = data?.length ?? preparedOffers.length;
  }

  return {
    ok: true,
    dryRun,
    publisherId,
    programmesFetched: programmes.length,
    matchedProgrammes: classified.length,
    offersPrepared: preparedOffers.length,
    offersImported: imported,
    skippedProgrammes: Math.max(0, programmes.length - new Set(classified.map((item) => item.programme.id)).size),
    categories: categoryCounts,
    sample: preparedOffers.slice(0, 10).map((offer) => ({
      categorySlug: offer.category,
      provider: offer.provider,
      title: offer.title,
      hasAffiliateUrl: Boolean(offer.affiliate_url),
    })),
    warnings,
  };
}

async function fetchAwinProgrammes({ token, publisherId }: { token: string; publisherId: string }) {
  const url = buildAwinUrl(`/publishers/${publisherId}/programmes`, token, {
    relationship: "joined",
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`AWIN_PROGRAMMES_FAILED:${response.status}:${redactToken(text, token)}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("AWIN_PROGRAMMES_UNEXPECTED_RESPONSE");
  }

  return payload.filter(isAwinProgramme);
}

async function buildOfferRows({
  token,
  publisherId,
  classified,
  warnings,
}: {
  token: string;
  publisherId: string;
  classified: ClassifiedProgramme[];
  warnings: string[];
}) {
  const linkMap = await generateAwinLinks({ token, publisherId, classified, warnings });
  const categoryTitles = new Map(categories.map((category) => [category.slug, category.title]));
  const now = new Date().toISOString();

  return classified.map(({ programme, categorySlug, score, matchedTerms }) => {
    const categoryTitle = categoryTitles.get(categorySlug) ?? "Offre";
    const fallbackUrl = appendAwinClickref(programme.clickThroughUrl, categorySlug);
    const affiliateUrl = linkMap.get(getLinkKey(programme.id, categorySlug)) || fallbackUrl || null;
    const country = programme.primaryRegion?.countryCode || "FR";
    const sector = typeof programme.primarySector === "string" ? programme.primarySector : programme.primarySector?.name;

    return {
      id: deterministicUuid(`awin:${publisherId}:${programme.id}:${categorySlug}`),
      category: categorySlug,
      provider: programme.name,
      title: `Comparer ${categoryTitle}`,
      country_scope: country,
      monthly_cost: null,
      annual_savings_estimate: CATEGORY_SAVINGS[categorySlug] ?? null,
      affiliate_url: affiliateUrl,
      cashback_amount: 0,
      sponsored: false,
      active: Boolean(affiliateUrl),
      metadata: {
        source: "awin",
        badge: "Meilleur choix",
        description: buildOfferDescription(categoryTitle, programme.name),
        awinAdvertiserId: programme.id,
        awinPublisherId: publisherId,
        awinStatus: programme.status ?? programme.relationshipStatus ?? null,
        awinDisplayUrl: programme.displayUrl ?? null,
        awinLogoUrl: programme.logoUrl ?? null,
        awinPrimarySector: sector ?? null,
        awinPrimaryRegion: programme.primaryRegion ?? null,
        awinCommissionRange: programme.commissionRange ?? null,
        matchScore: score,
        matchedTerms,
        importedAt: now,
      },
    };
  });
}

async function generateAwinLinks({
  token,
  publisherId,
  classified,
  warnings,
}: {
  token: string;
  publisherId: string;
  classified: ClassifiedProgramme[];
  warnings: string[];
}) {
  const linkMap = new Map<string, string>();
  const requests = classified.map(({ programme, categorySlug }) => ({
    advertiserId: programme.id,
    destinationUrl: normalizeDestinationUrl(programme.displayUrl),
    parameters: {
      clickref: `comparia_${categorySlug}`,
      clickref2: String(programme.id),
      campaign: "comparia",
    },
    meta: {
      key: getLinkKey(programme.id, categorySlug),
    },
  }));

  for (const chunk of chunkArray(requests, 80)) {
    const response = await fetch(buildAwinUrl(`/publishers/${publisherId}/linkbuilder/generate-batch`, token), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requests: chunk.map(({ advertiserId, destinationUrl, parameters }) => ({
          advertiserId,
          parameters,
          ...(destinationUrl ? { destinationUrl } : {}),
        })),
      }),
      cache: "no-store",
    }).catch((error: unknown) => {
      warnings.push(`Awin linkbuilder indisponible : ${error instanceof Error ? error.message : "erreur inconnue"}`);
      return null;
    });

    if (!response) continue;

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      warnings.push(`Awin linkbuilder a répondu ${response.status}. Fallback vers les liens programme. ${redactToken(text, token).slice(0, 180)}`);
      continue;
    }

    const payload = await response.json().catch(() => null);
    const results = extractGeneratedLinks(payload);

    results.forEach((url, index) => {
      const key = chunk[index]?.meta.key;
      if (key && isSafeUrl(url)) linkMap.set(key, url);
    });
  }

  return linkMap;
}

function classifyProgrammes(programmes: AwinProgramme[]) {
  const matches: ClassifiedProgramme[] = [];

  for (const programme of programmes) {
    if (!programme.id || !programme.name) continue;
    const text = normalizeSearchText([
      programme.name,
      programme.description,
      programme.displayUrl,
      programme.validDomains?.join(" "),
      typeof programme.primarySector === "string" ? programme.primarySector : programme.primarySector?.name,
      programme.primaryRegion?.name,
      programme.primaryRegion?.countryCode,
    ]);

    for (const rule of CATEGORY_RULES) {
      const negativeHit = rule.negativeKeywords?.some((keyword) => text.includes(normalizeSearchText(keyword))) ?? false;
      if (negativeHit) continue;

      const matchedTerms = rule.keywords.filter((keyword) => text.includes(normalizeSearchText(keyword)));
      const score = matchedTerms.reduce((total, term) => total + keywordWeight(term), 0);
      const minimumScore = rule.minimumScore ?? 1;

      if (score >= minimumScore) {
        matches.push({
          programme: programme as Required<Pick<AwinProgramme, "id" | "name">> & AwinProgramme,
          categorySlug: rule.slug,
          score,
          matchedTerms,
        });
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score || a.programme.name.localeCompare(b.programme.name));
}

function extractGeneratedLinks(payload: unknown): string[] {
  if (Array.isArray(payload)) {
    return payload.map(extractUrlFromUnknown).filter(Boolean) as string[];
  }

  if (isRecord(payload)) {
    const possibleArrays = [payload.links, payload.results, payload.responses, payload.data].filter(Array.isArray);
    if (possibleArrays.length > 0) {
      return possibleArrays[0].map(extractUrlFromUnknown).filter(Boolean) as string[];
    }

    const url = extractUrlFromUnknown(payload);
    return url ? [url] : [];
  }

  return [];
}

function extractUrlFromUnknown(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return null;

  const direct = [value.url, value.trackingUrl, value.shortUrl, value.clickThroughUrl, value.link];
  for (const candidate of direct) {
    if (typeof candidate === "string") return candidate;
  }

  if (isRecord(value.result)) return extractUrlFromUnknown(value.result);
  if (isRecord(value.data)) return extractUrlFromUnknown(value.data);

  return null;
}

function buildAwinUrl(pathname: string, token: string, params: Record<string, string> = {}) {
  const url = new URL(pathname, AWIN_BASE_URL);
  url.searchParams.set("accessToken", token);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

function buildOfferDescription(categoryTitle: string, provider: string) {
  return `Offre ${categoryTitle.toLowerCase()} récupérée depuis Awin pour tester une conversion réelle avec ${provider}.`;
}

function countByCategory(offers: { category: string }[]) {
  return offers.reduce<Record<string, number>>((acc, offer) => {
    acc[offer.category] = (acc[offer.category] ?? 0) + 1;
    return acc;
  }, {});
}

function deterministicUuid(input: string) {
  const hash = crypto.createHash("sha1").update(input).digest("hex");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    `${((parseInt(hash.slice(16, 17), 16) & 0x3) | 0x8).toString(16)}${hash.slice(17, 20)}`,
    hash.slice(20, 32),
  ].join("-");
}

function keywordWeight(term: string) {
  if (term.includes("assurance") || term.includes("forfait") || term.includes("box") || term.includes("mutuelle")) return 3;
  if (term.length > 10) return 2;
  return 1;
}

function normalizeSearchText(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function normalizeDestinationUrl(value?: string) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `https://${value.replace(/^\/+/, "")}`;
}

function appendAwinClickref(value: string | undefined, categorySlug: string) {
  if (!value || !isSafeUrl(value)) return null;
  try {
    const url = new URL(value);
    url.searchParams.set("clickref", `comparia_${categorySlug}`);
    url.searchParams.set("clickref2", categorySlug);
    return url.toString();
  } catch {
    return value;
  }
}

function getLinkKey(advertiserId: number, categorySlug: string) {
  return `${advertiserId}:${categorySlug}`;
}

function isAwinProgramme(value: unknown): value is AwinProgramme {
  return isRecord(value) && typeof value.id === "number" && typeof value.name === "string";
}

function isSafeUrl(value: string) {
  return value.startsWith("https://") || value.startsWith("http://");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function chunkArray<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function redactToken(value: string, token: string) {
  return value.replaceAll(token, "[AWIN_TOKEN]");
}
