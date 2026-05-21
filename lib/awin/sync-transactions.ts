import crypto from "node:crypto";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

const AWIN_BASE_URL = "https://api.awin.com";
const DEFAULT_LOOKBACK_DAYS = 31;
const MAX_LOOKBACK_DAYS = 31;

type AwinMoney = {
  amount?: number | string;
  currency?: string;
};

type AwinTransaction = Record<string, unknown> & {
  id?: number | string;
  transactionId?: number | string;
  advertiserId?: number | string;
  advertiserName?: string;
  status?: string;
  transactionDate?: string;
  validationDate?: string;
  clickRefs?: Record<string, unknown>;
  commissionAmount?: AwinMoney;
  saleAmount?: AwinMoney;
};

type OfferLookupRow = {
  id: string;
  category: string;
  provider: string;
  metadata: Record<string, unknown> | null;
};

export type AwinTransactionSyncSummary = {
  ok: true;
  publisherId: string;
  startDate: string;
  endDate: string;
  transactionsFetched: number;
  conversionsPrepared: number;
  conversionsImported: number;
  matchedOffers: number;
  unmatchedTransactions: number;
  totalCommission: number;
  totalSaleValue: number;
  statuses: Record<string, number>;
  warnings: string[];
  sample: {
    transactionId: string;
    advertiser: string;
    status: string;
    commission: number;
    offerMatched: boolean;
  }[];
};

export async function syncAwinTransactions({ days = DEFAULT_LOOKBACK_DAYS } = {}): Promise<AwinTransactionSyncSummary> {
  const token = process.env.AWIN_API_TOKEN?.trim();
  const publisherId = process.env.AWIN_PUBLISHER_ID?.trim();

  if (!token || !publisherId) {
    throw new Error("AWIN_NOT_CONFIGURED");
  }

  if (!isSupabaseConfigured()) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const safeDays = Math.max(1, Math.min(MAX_LOOKBACK_DAYS, Math.round(days)));
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - safeDays);

  const startDate = formatAwinDate(start);
  const endDate = formatAwinDate(end);
  const warnings: string[] = [];
  const transactions = await fetchAwinTransactions({ token, publisherId, startDate, endDate });
  const supabase = createSupabaseAdminClient();
  const { data: offers, error: offersError } = await supabase
    .from("offers")
    .select("id,category,provider,metadata")
    .limit(500);

  if (offersError) {
    throw new Error(`SUPABASE_OFFERS_LOOKUP_FAILED:${offersError.code ?? "unknown"}:${offersError.message}`);
  }

  const lookup = buildOfferLookup((offers ?? []) as OfferLookupRow[]);
  const conversions = transactions.map((transaction) => buildConversionRow({ transaction, publisherId, lookup, warnings }));
  const prepared = conversions.map((item) => item.row);
  let imported = 0;

  if (prepared.length > 0) {
    const { data, error } = await supabase
      .from("conversions")
      .upsert(prepared, { onConflict: "id" })
      .select("id");

    if (error) {
      throw new Error(`SUPABASE_CONVERSIONS_IMPORT_FAILED:${error.code ?? "unknown"}:${error.message}`);
    }

    imported = data?.length ?? prepared.length;
  }

  const statuses = countStatuses(transactions);
  const matchedOffers = conversions.filter((item) => item.matched).length;
  const totalCommission = roundMoney(prepared.reduce((total, conversion) => total + numeric(conversion.commission_value), 0));
  const totalSaleValue = roundMoney(prepared.reduce((total, conversion) => total + numeric(conversion.conversion_value), 0));

  return {
    ok: true,
    publisherId,
    startDate,
    endDate,
    transactionsFetched: transactions.length,
    conversionsPrepared: prepared.length,
    conversionsImported: imported,
    matchedOffers,
    unmatchedTransactions: Math.max(0, prepared.length - matchedOffers),
    totalCommission,
    totalSaleValue,
    statuses,
    warnings: Array.from(new Set(warnings)).slice(0, 8),
    sample: conversions.slice(0, 8).map(({ transaction, matched }) => ({
      transactionId: String(getTransactionId(transaction) ?? "unknown"),
      advertiser: getAdvertiserName(transaction),
      status: getTransactionStatus(transaction),
      commission: extractMoneyAmount(transaction.commissionAmount),
      offerMatched: matched,
    })),
  };
}

async function fetchAwinTransactions({ token, publisherId, startDate, endDate }: { token: string; publisherId: string; startDate: string; endDate: string }) {
  const url = buildAwinUrl(`/publishers/${publisherId}/transactions/`, token, {
    startDate,
    endDate,
    timezone: "UTC",
    dateType: "transaction",
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
    throw new Error(`AWIN_TRANSACTIONS_FAILED:${response.status}:${redactToken(text, token)}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("AWIN_TRANSACTIONS_UNEXPECTED_RESPONSE");
  }

  return payload.filter(isRecord) as AwinTransaction[];
}

function buildConversionRow({
  transaction,
  publisherId,
  lookup,
  warnings,
}: {
  transaction: AwinTransaction;
  publisherId: string;
  lookup: ReturnType<typeof buildOfferLookup>;
  warnings: string[];
}) {
  const transactionId = String(getTransactionId(transaction) ?? crypto.randomUUID());
  const advertiserId = getAdvertiserId(transaction);
  const category = getCategoryFromClickRefs(transaction);
  const offer = findOffer({ lookup, advertiserId, category, advertiserName: getAdvertiserName(transaction) });

  if (!offer && advertiserId) {
    warnings.push(`Transaction Awin ${transactionId} non rapprochée d'une offre locale pour advertiser ${advertiserId}.`);
  }

  const status = normalizeStatus(getTransactionStatus(transaction));
  const convertedAt = normalizeDate(transaction.transactionDate ?? transaction.validationDate) ?? new Date().toISOString();

  return {
    matched: Boolean(offer),
    transaction,
    row: {
      id: deterministicUuid(`awin-transaction:${publisherId}:${transactionId}`),
      offer_id: offer?.id ?? null,
      conversion_value: extractMoneyAmount(transaction.saleAmount),
      commission_value: extractMoneyAmount(transaction.commissionAmount),
      cashback_value: 0,
      status,
      converted_at: convertedAt,
      created_at: convertedAt,
    },
  };
}

function buildOfferLookup(offers: OfferLookupRow[]) {
  const byAdvertiserAndCategory = new Map<string, OfferLookupRow>();
  const byAdvertiser = new Map<string, OfferLookupRow[]>();
  const byProvider = new Map<string, OfferLookupRow[]>();

  for (const offer of offers) {
    const advertiserId = getMetadataAdvertiserId(offer.metadata);
    if (advertiserId) {
      byAdvertiserAndCategory.set(`${advertiserId}:${offer.category}`, offer);
      byAdvertiser.set(advertiserId, [...(byAdvertiser.get(advertiserId) ?? []), offer]);
    }

    const providerKey = normalizeLookupText(offer.provider);
    if (providerKey) byProvider.set(providerKey, [...(byProvider.get(providerKey) ?? []), offer]);
  }

  return { byAdvertiserAndCategory, byAdvertiser, byProvider };
}

function findOffer({
  lookup,
  advertiserId,
  category,
  advertiserName,
}: {
  lookup: ReturnType<typeof buildOfferLookup>;
  advertiserId: string | null;
  category: string | null;
  advertiserName: string;
}) {
  if (advertiserId && category) {
    const exact = lookup.byAdvertiserAndCategory.get(`${advertiserId}:${category}`);
    if (exact) return exact;
  }

  if (advertiserId) {
    const candidates = lookup.byAdvertiser.get(advertiserId) ?? [];
    if (candidates.length > 0) return category ? candidates.find((offer) => offer.category === category) ?? candidates[0] : candidates[0];
  }

  const providerKey = normalizeLookupText(advertiserName);
  const providerCandidates = lookup.byProvider.get(providerKey) ?? [];
  if (providerCandidates.length > 0) return category ? providerCandidates.find((offer) => offer.category === category) ?? providerCandidates[0] : providerCandidates[0];

  return null;
}

function getMetadataAdvertiserId(metadata: Record<string, unknown> | null) {
  const value = metadata?.awinAdvertiserId;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && value.length > 0) return value;
  return null;
}

function getTransactionId(transaction: AwinTransaction) {
  return transaction.id ?? transaction.transactionId ?? transaction.transaction_id;
}

function getAdvertiserId(transaction: AwinTransaction) {
  const direct = transaction.advertiserId ?? transaction.advertiser_id;
  if (typeof direct === "number" && Number.isFinite(direct)) return String(direct);
  if (typeof direct === "string" && direct.length > 0) return direct;

  const advertiser = transaction.advertiser;
  if (isRecord(advertiser)) {
    const id = advertiser.id;
    if (typeof id === "number" && Number.isFinite(id)) return String(id);
    if (typeof id === "string" && id.length > 0) return id;
  }

  return null;
}

function getAdvertiserName(transaction: AwinTransaction) {
  if (typeof transaction.advertiserName === "string" && transaction.advertiserName.length > 0) return transaction.advertiserName;
  const advertiser = transaction.advertiser;
  if (isRecord(advertiser) && typeof advertiser.name === "string") return advertiser.name;
  return "Annonceur Awin";
}

function getTransactionStatus(transaction: AwinTransaction) {
  return typeof transaction.status === "string" && transaction.status.length > 0 ? transaction.status : "pending";
}

function normalizeStatus(status: string) {
  const value = status.toLowerCase();
  if (["approved", "confirmed", "validated", "paid"].includes(value)) return "approved";
  if (["declined", "rejected", "cancelled", "canceled", "refused"].includes(value)) return "rejected";
  return "pending";
}

function getCategoryFromClickRefs(transaction: AwinTransaction) {
  const clickRefs = isRecord(transaction.clickRefs) ? transaction.clickRefs : {};
  const candidates = [
    clickRefs.clickRef,
    clickRefs.clickref,
    clickRefs.clickRef1,
    clickRefs.clickref1,
    clickRefs.clickRef2,
    clickRefs.clickref2,
    transaction.clickRef,
    transaction.clickref,
    transaction.clickRef2,
    transaction.clickref2,
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const match = candidate.match(/comparia[_-]([a-z0-9-]+)/i);
    if (match?.[1]) return match[1].toLowerCase();
    if (/^[a-z0-9-]{3,80}$/i.test(candidate)) return candidate.toLowerCase();
  }

  return null;
}

function extractMoneyAmount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return roundMoney(value);
  if (typeof value === "string") return roundMoney(Number(value.replace(",", "."))) || 0;
  if (!isRecord(value)) return 0;

  const amount = value.amount ?? value.value;
  if (typeof amount === "number" && Number.isFinite(amount)) return roundMoney(amount);
  if (typeof amount === "string") return roundMoney(Number(amount.replace(",", "."))) || 0;
  return 0;
}

function countStatuses(transactions: AwinTransaction[]) {
  return transactions.reduce<Record<string, number>>((acc, transaction) => {
    const status = normalizeStatus(getTransactionStatus(transaction));
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});
}

function buildAwinUrl(pathname: string, token: string, params: Record<string, string> = {}) {
  const url = new URL(pathname, AWIN_BASE_URL);
  url.searchParams.set("accessToken", token);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
}

function formatAwinDate(value: Date) {
  return value.toISOString().slice(0, 19);
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string" || value.length === 0) return null;
  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
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

function normalizeLookupText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function numeric(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function roundMoney(value: number) {
  return Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function redactToken(value: string, token: string) {
  return value.replaceAll(token, "[AWIN_TOKEN]");
}
