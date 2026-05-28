import crypto from "node:crypto";
import { categories } from "@/lib/categories";
import { getComplianceMetadataForPartner } from "@/lib/affiliate/compliance";
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

type AwinPromotion = Record<string, unknown> & {
  id?: number | string;
  promotionId?: number | string;
  advertiserId?: number | string;
  advertiser?: { id?: number | string; advertiserId?: number | string; name?: string; joined?: boolean };
  advertiserName?: string;
  title?: string;
  description?: string;
  terms?: string;
  type?: string;
  status?: string;
  code?: string;
  voucherCode?: string;
  voucher?: { code?: string | null; exclusive?: boolean; attributable?: boolean };
  startsAt?: string;
  startDate?: string;
  endsAt?: string;
  endDate?: string;
  url?: string;
  trackingUrl?: string;
  urlTracking?: string;
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

type OfferUpsertRow = {
  id: string;
  category: string;
  provider: string;
  title: string;
  country_scope: string;
  monthly_cost: number | null;
  annual_savings_estimate: number | null;
  affiliate_url: string | null;
  cashback_amount: number;
  sponsored: boolean;
  active: boolean;
  metadata: Record<string, unknown>;
};

export type AwinImportSummary = {
  ok: true;
  dryRun: boolean;
  publisherId: string;
  programmesFetched: number;
  matchedProgrammes: number;
  offersPrepared: number;
  offersImported: number;
  couponsFetched: number;
  couponsPrepared: number;
  couponsImported: number;
  couponsExpired: number;
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
    keywords: ["change chf", "chf eur", "frontalier", "devise", "currency exchange", "forex", "transfert argent", "money transfer", "chf", "wise", "revolut"],
    negativeKeywords: ["chien", "chat", "animal", "animaux", "pet", "vétérinaire", "veterinaire", "dépannage", "depannage", "plomberie"],
    minimumScore: 2,
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
  const couponImport = await buildCouponRows({ token, publisherId, classified, warnings });
  const categoryCounts = countByCategory([...preparedOffers, ...couponImport.rows]);

  let imported = 0;
  let importedCoupons = 0;
  let expiredCoupons = 0;

  if (!dryRun && (preparedOffers.length > 0 || couponImport.rows.length > 0)) {
    const supabase = createSupabaseAdminClient();
    if (preparedOffers.length > 0) {
      const { data, error } = await supabase
        .from("offers")
        .upsert(preparedOffers, { onConflict: "id" })
        .select("id");

      if (error) {
        throw new Error(`SUPABASE_OFFERS_IMPORT_FAILED:${error.code ?? "unknown"}:${error.message}`);
      }

      imported = data?.length ?? preparedOffers.length;
    }

    if (couponImport.ok) {
      const couponResult = await syncCouponRows({ supabase, rows: couponImport.rows, activeIds: couponImport.activeIds, warnings });
      importedCoupons = couponResult.imported;
      expiredCoupons = couponResult.expired;
    }
  }

  return {
    ok: true,
    dryRun,
    publisherId,
    programmesFetched: programmes.length,
    matchedProgrammes: classified.length,
    offersPrepared: preparedOffers.length,
    offersImported: imported,
    couponsFetched: couponImport.fetched,
    couponsPrepared: couponImport.rows.length,
    couponsImported: importedCoupons,
    couponsExpired: expiredCoupons,
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
}): Promise<OfferUpsertRow[]> {
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
        compliance: getComplianceMetadataForPartner(programme.name, categoryTitle),
        matchScore: score,
        matchedTerms,
        importedAt: now,
      },
    };
  });
}

async function buildCouponRows({
  token,
  publisherId,
  classified,
  warnings,
}: {
  token: string;
  publisherId: string;
  classified: ClassifiedProgramme[];
  warnings: string[];
}): Promise<{ fetched: number; ok: boolean; rows: OfferUpsertRow[]; activeIds: Set<string> }> {
  if (classified.length === 0) {
    return { fetched: 0, ok: true, rows: [], activeIds: new Set() };
  }

  const promotionResult = await fetchAwinPromotions({ token, publisherId, classified, warnings });
  const programmeCategories = buildProgrammeCategoryMap(classified);
  const categoryTitles = new Map(categories.map((category) => [category.slug, category.title]));
  const rows: OfferUpsertRow[] = [];
  const now = new Date().toISOString();

  for (const promotion of promotionResult.items) {
    const promotionId = getPromotionId(promotion);
    if (!promotionId) continue;

    const advertiserId = getPromotionAdvertiserId(promotion);
    const programme = advertiserId ? getProgrammeForId(classified, advertiserId) : null;
    const provider = getPromotionAdvertiserName(promotion) ?? programme?.name ?? null;
    if (!provider) continue;

    const affiliateUrl = appendAwinClickref(getPromotionUrl(promotion), "coupon");
    if (!affiliateUrl) continue;

    const title = getPromotionTitle(promotion);
    const description = getPromotionDescription(promotion);
    const code = getPromotionCode(promotion);
    const endDate = getPromotionEndDate(promotion);
    const categoriesForPromotion = classifyPromotionCategories(promotion, programmeCategories.get(String(advertiserId)) ?? []);
    const active = isPromotionActive(promotion);

    for (const categorySlug of categoriesForPromotion.slice(0, 3)) {
      const categoryTitle = categoryTitles.get(categorySlug) ?? "Offre";
      const normalizedTitle = title || (code ? `Code promo ${provider}` : `Offre spéciale ${provider}`);
      const rowId = deterministicUuid(`awin-promotion:${publisherId}:${promotionId}:${categorySlug}`);

      rows.push({
        id: rowId,
        category: categorySlug,
        provider,
        title: code ? `${normalizedTitle} · code ${code}` : normalizedTitle,
        country_scope: "FR",
        monthly_cost: null,
        annual_savings_estimate: CATEGORY_SAVINGS[categorySlug] ?? null,
        affiliate_url: affiliateUrl,
        cashback_amount: 0,
        sponsored: false,
        active,
        metadata: {
          source: "awin_promotion",
          badge: code ? "Code promo" : "Offre spéciale",
          description: buildCouponDescription({
            categoryTitle,
            provider,
            title: normalizedTitle,
            description,
            code,
            endDate,
          }),
          tags: buildCouponTags({ code, endDate }),
          couponCode: code,
          couponTitle: normalizedTitle,
          couponDescription: description,
          couponEndsAt: endDate,
          couponStartsAt: getPromotionStartDate(promotion),
          couponTerms: getPromotionTerms(promotion),
          awinPromotionId: promotionId,
          awinAdvertiserId: advertiserId,
          awinAdvertiserName: provider,
          awinDisplayUrl: programme?.displayUrl ?? null,
          awinLogoUrl: programme?.logoUrl ?? null,
          awinPublisherId: publisherId,
          awinPromotionStatus: promotion.status ?? null,
          awinPromotionType: promotion.type ?? null,
          compliance: getComplianceMetadataForPartner(provider, normalizedTitle),
          importedAt: now,
        },
      });
    }
  }

  return {
    fetched: promotionResult.items.length,
    ok: promotionResult.ok,
    rows,
    activeIds: new Set(rows.filter((row) => row.active).map((row) => row.id)),
  };
}

async function fetchAwinPromotions({
  token,
  publisherId,
  classified,
  warnings,
}: {
  token: string;
  publisherId: string;
  classified: ClassifiedProgramme[];
  warnings: string[];
}): Promise<{ ok: boolean; items: AwinPromotion[] }> {
  const advertiserIds = Array.from(new Set(classified.map(({ programme }) => programme.id))).slice(0, 100);
  const items: AwinPromotion[] = [];

  for (let page = 1; page <= 8; page += 1) {
    const filters = {
      ...(advertiserIds.length > 0 ? { advertiserIds } : {}),
      membership: "joined",
      status: "active",
    };
    const response = await fetch(buildAwinUrl(`/publisher/${publisherId}/promotions`, token), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters,
        pagination: {
          page,
          pageSize: 100,
        },
      }),
      cache: "no-store",
    }).catch((error: unknown) => {
      warnings.push(`Awin coupons indisponible : ${error instanceof Error ? error.message : "erreur inconnue"}`);
      return null;
    });

    if (!response) return { ok: false, items };

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      if (advertiserIds.length > 0 && page === 1) {
        warnings.push(`Awin promotions a refusé le filtre annonceurs (${response.status}). Nouvel essai sans filtre annonceur.`);
        return fetchAwinPromotions({ token, publisherId, classified: [], warnings });
      }
      warnings.push(`Awin promotions a répondu ${response.status}. Coupons ignorés pour cet import. ${redactToken(text, token).slice(0, 180)}`);
      return { ok: false, items };
    }

    const payload = await response.json().catch(() => null);
    const pageItems = extractPromotionList(payload);
    items.push(...pageItems);

    if (pageItems.length < 100 || isLastPromotionPage(payload, page)) break;
  }

  return { ok: true, items: dedupePromotions(items) };
}

async function syncCouponRows({
  supabase,
  rows,
  activeIds,
  warnings,
}: {
  supabase: ReturnType<typeof createSupabaseAdminClient>;
  rows: OfferUpsertRow[];
  activeIds: Set<string>;
  warnings: string[];
}) {
  let imported = 0;
  let expired = 0;

  if (rows.length > 0) {
    const { data, error } = await supabase.from("offers").upsert(rows, { onConflict: "id" }).select("id");

    if (error) {
      throw new Error(`SUPABASE_COUPONS_IMPORT_FAILED:${error.code ?? "unknown"}:${error.message}`);
    }

    imported = data?.length ?? rows.length;
  }

  const { data: existing, error: lookupError } = await supabase
    .from("offers")
    .select("id,active,metadata")
    .eq("metadata->>source", "awin_promotion")
    .limit(1000);

  if (lookupError) {
    warnings.push(`Impossible de nettoyer les anciens coupons Awin : ${lookupError.message}`);
    return { imported, expired };
  }

  const idsToDeactivate = ((existing ?? []) as { id: string; active: boolean | null; metadata: Record<string, unknown> | null }[])
    .filter((row) => row.active !== false)
    .filter((row) => row.metadata?.source === "awin_promotion")
    .map((row) => row.id)
    .filter((id) => !activeIds.has(id));

  if (idsToDeactivate.length > 0) {
    const { error: updateError } = await supabase
      .from("offers")
      .update({ active: false })
      .in("id", idsToDeactivate);

    if (updateError) {
      warnings.push(`Coupons expirés non désactivés : ${updateError.message}`);
    } else {
      expired = idsToDeactivate.length;
    }
  }

  return { imported, expired };
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
      clickref: `ctf_${categorySlug}`,
      clickref2: String(programme.id),
      campaign: "comparetesfactures",
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

function buildProgrammeCategoryMap(classified: ClassifiedProgramme[]) {
  const map = new Map<string, string[]>();

  for (const item of classified) {
    const id = String(item.programme.id);
    const current = map.get(id) ?? [];
    if (!current.includes(item.categorySlug)) current.push(item.categorySlug);
    map.set(id, current);
  }

  return map;
}

function getProgrammeForId(classified: ClassifiedProgramme[], advertiserId: string) {
  return classified.find(({ programme }) => String(programme.id) === advertiserId)?.programme ?? null;
}

function classifyPromotionCategories(promotion: AwinPromotion, advertiserCategories: string[]) {
  const text = normalizeSearchText([
    getPromotionAdvertiserName(promotion),
    getPromotionTitle(promotion),
    getPromotionDescription(promotion),
    getPromotionTerms(promotion),
    getPromotionCode(promotion),
    promotion.type,
  ].join(" "));
  const matches: { slug: string; score: number }[] = [];

  for (const rule of CATEGORY_RULES) {
    const negativeHit = rule.negativeKeywords?.some((keyword) => text.includes(normalizeSearchText(keyword))) ?? false;
    if (negativeHit) continue;

    const score = rule.keywords
      .filter((keyword) => text.includes(normalizeSearchText(keyword)))
      .reduce((total, term) => total + keywordWeight(term), 0);

    if (score >= (rule.minimumScore ?? 1)) matches.push({ slug: rule.slug, score });
  }

  const sortedMatches = matches.sort((a, b) => b.score - a.score).map((match) => match.slug);
  return Array.from(new Set([...sortedMatches, ...advertiserCategories])).slice(0, 4);
}

function extractPromotionList(payload: unknown): AwinPromotion[] {
  if (Array.isArray(payload)) return payload.filter(isAwinPromotionLike);
  if (!isRecord(payload)) return [];

  const candidates = [payload.promotions, payload.data, payload.results, payload.items, payload.content].filter(Array.isArray);
  if (candidates.length === 0) return [];

  return candidates[0].filter(isAwinPromotionLike);
}

function isLastPromotionPage(payload: unknown, currentPage: number) {
  if (!isRecord(payload)) return false;

  const pagination = isRecord(payload.pagination) ? payload.pagination : payload;
  const totalPages = getNumber(pagination, "totalPages") ?? getNumber(pagination, "pages") ?? getNumber(pagination, "pageCount");
  const nextPage = pagination.nextPage ?? pagination.next;

  if (typeof totalPages === "number") return currentPage >= totalPages;
  return nextPage === null || nextPage === false;
}

function dedupePromotions(promotions: AwinPromotion[]) {
  const seen = new Set<string>();
  const result: AwinPromotion[] = [];

  for (const promotion of promotions) {
    const id = getPromotionId(promotion) ?? JSON.stringify([getPromotionAdvertiserId(promotion), getPromotionTitle(promotion), getPromotionCode(promotion)]);
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(promotion);
  }

  return result;
}

function getPromotionId(promotion: AwinPromotion) {
  return toIdString(promotion.promotionId ?? promotion.id ?? promotion.promoId ?? promotion.offerId);
}

function getPromotionAdvertiserId(promotion: AwinPromotion) {
  const advertiser = isRecord(promotion.advertiser) ? promotion.advertiser : null;
  return toIdString(promotion.advertiserId ?? advertiser?.id ?? advertiser?.advertiserId ?? promotion.programmeId ?? promotion.programId);
}

function getPromotionAdvertiserName(promotion: AwinPromotion) {
  const advertiser = isRecord(promotion.advertiser) ? promotion.advertiser : null;
  return firstString(promotion.advertiserName, advertiser?.name, promotion.programmeName, promotion.programName, promotion.brandName, promotion.merchantName);
}

function getPromotionTitle(promotion: AwinPromotion) {
  return firstString(promotion.title, promotion.name, promotion.label, promotion.heading, promotion.shortDescription) ?? "Offre partenaire";
}

function getPromotionDescription(promotion: AwinPromotion) {
  return firstString(promotion.description, promotion.longDescription, promotion.summary, promotion.details);
}

function getPromotionTerms(promotion: AwinPromotion) {
  return firstString(promotion.terms, promotion.termsAndConditions, promotion.conditions, promotion.restrictions);
}

function getPromotionCode(promotion: AwinPromotion) {
  const voucher = isRecord(promotion.voucher) ? promotion.voucher : null;
  return firstString(promotion.code, promotion.voucherCode, promotion.promoCode, promotion.couponCode, promotion.discountCode, voucher?.code)?.trim();
}

function getPromotionUrl(promotion: AwinPromotion) {
  return firstString(promotion.urlTracking, promotion.trackingUrl, promotion.url, promotion.clickThroughUrl, promotion.deeplink, promotion.landingPageUrl);
}

function getPromotionStartDate(promotion: AwinPromotion) {
  return normalizeIsoDate(firstString(promotion.startsAt, promotion.startDate, promotion.validFrom, promotion.dateStart, promotion.start));
}

function getPromotionEndDate(promotion: AwinPromotion) {
  return normalizeIsoDate(firstString(promotion.endsAt, promotion.endDate, promotion.validTo, promotion.dateEnd, promotion.expiresAt, promotion.expiryDate, promotion.end));
}

function isPromotionActive(promotion: AwinPromotion) {
  const status = normalizeSearchText(promotion.status);
  if (/(expired|inactive|deleted|cancelled|rejected|paused|closed)/.test(status)) return false;

  const startDate = getPromotionStartDate(promotion);
  const endDate = getPromotionEndDate(promotion);
  const now = Date.now();

  if (startDate && Date.parse(startDate) > now) return false;
  if (endDate && Date.parse(endDate) < now) return false;

  return Boolean(getPromotionUrl(promotion));
}

function buildCouponDescription({
  categoryTitle,
  provider,
  title,
  description,
  code,
  endDate,
}: {
  categoryTitle: string;
  provider: string;
  title: string;
  description?: string | null;
  code?: string;
  endDate?: string | null;
}) {
  const deadline = endDate ? ` Offre valable jusqu’au ${formatDateFr(endDate)}.` : "";
  const codeText = code ? ` Code promo ${code} disponible.` : "";
  return `${title} chez ${provider} pour ton comparateur ${categoryTitle.toLowerCase()}.${codeText}${deadline} ${description ?? "Vérifie les conditions avant activation."}`.trim();
}

function buildCouponTags({ code, endDate }: { code?: string; endDate?: string | null }) {
  return [code ? "Code promo" : "Offre spéciale", endDate ? "Durée limitée" : "Awin", "Partenaire vérifié", "Activation rapide"];
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
  return `Compare une offre ${categoryTitle.toLowerCase()} proposée par ${provider}. Vérifie les garanties, le prix final et les conditions avant de souscrire.`;
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
  if (value.startsWith("https://")) return value;
  if (value.startsWith("http://")) return value.replace(/^http:\/\//, "https://");
  return `https://${value.replace(/^\/+/, "")}`;
}

function appendAwinClickref(value: string | null | undefined, categorySlug: string) {
  if (!value || !isSafeUrl(value)) return null;
  try {
    const url = new URL(value);
    url.searchParams.set("clickref", `ctf_${categorySlug}`);
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

function isAwinPromotionLike(value: unknown): value is AwinPromotion {
  return isRecord(value);
}

function isSafeUrl(value: string) {
  return value.startsWith("https://");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }

  return null;
}

function toIdString(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function getNumber(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeIsoDate(value: string | null) {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

function formatDateFr(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return value;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(timestamp));
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
