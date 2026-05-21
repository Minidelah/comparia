import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { enforceSameOrigin, isAdminAuthorized, rateLimit, rejectLargeRequest, sanitizeMetadata, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 12_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "admin-offers-update", limit: 80, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  if (!isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return secureJson({ error: "supabase_not_configured" }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const offerId = typeof body.offerId === "string" ? body.offerId : "";
  if (!isUuidLike(offerId)) {
    return secureJson({ error: "invalid_offer_id" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: existing, error: existingError } = await supabase.from("offers").select("metadata").eq("id", offerId).single();

  if (existingError) {
    return secureJson({ error: "offer_not_found" }, { status: 404 });
  }

  const currentMetadata = isRecord(existing?.metadata) ? existing.metadata : {};
  const update: Record<string, unknown> = {};
  const metadata: Record<string, unknown> = { ...currentMetadata };

  if (typeof body.active === "boolean") update.active = body.active;
  if (typeof body.sponsored === "boolean") update.sponsored = body.sponsored;

  const annualSavings = parseBoundedNumber(body.annualSavings, 0, 10_000);
  const cashbackAmount = parseBoundedNumber(body.cashbackAmount, 0, 2_000);
  const priority = parseBoundedNumber(body.priority, 0, 1_000);

  if (annualSavings !== null) update.annual_savings_estimate = annualSavings;
  if (cashbackAmount !== null) update.cashback_amount = cashbackAmount;
  if (priority !== null) {
    metadata.priority = Math.round(priority);
    metadata.businessOverride = true;
    metadata.businessOverrideUpdatedAt = new Date().toISOString();
  }

  update.metadata = sanitizeMetadata(metadata, 8_000);

  const { data, error } = await supabase
    .from("offers")
    .update(update)
    .eq("id", offerId)
    .select("id,category,provider,title,monthly_cost,annual_savings_estimate,affiliate_url,cashback_amount,sponsored,active,metadata,created_at")
    .single();

  if (error) {
    return secureJson({ error: "offer_update_failed" }, { status: 500 });
  }

  return secureJson({ ok: true, offer: { ...data, click_count: 0 } });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function parseBoundedNumber(value: unknown, min: number, max: number) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.max(min, Math.min(max, Math.round(value)));
}
