import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { enforceSameOrigin, isSafeSlug, rateLimit, rejectLargeRequest, sanitizeText, secureJson } from "@/lib/security/request";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 8_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "affiliate-click", limit: 80, windowMs: 60 * 1000 });
  if (limited) return limited;

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const offerId = getString(body, "offerId", 120);
  const categorySlug = getString(body, "categorySlug", 80) || getString(body, "category", 80);
  const leadId = getString(body, "leadId", 80);
  const sourceScreen = getString(body, "sourceScreen", 80) || getString(body, "source", 80);
  const affiliateLink = getString(body, "affiliateLink", 1000);
  const timestamp = getString(body, "timestamp", 80);
  const userId = getString(body, "userId", 80);

  if (!offerId || !sourceScreen || (categorySlug && !isSafeSlug(categorySlug))) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return secureJson({ ok: true, tracked: false, reason: "supabase_not_configured" });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("affiliate_clicks").insert({
    source_screen: sourceScreen,
    meta: {
      offer_slot_id: offerId,
      category_slug: categorySlug || null,
      lead_id: isUuidLike(leadId) ? leadId : null,
      user_id_hint: isUuidLike(userId) ? userId : null,
      affiliate_link: isSafeAffiliateLink(affiliateLink) ? affiliateLink : null,
      affiliate_domain: getDomain(affiliateLink),
      client_timestamp: isSafeTimestamp(timestamp) ? timestamp : null,
    },
  });

  if (error) {
    console.error("Failed to track affiliate click", error);
    return secureJson({ ok: true, tracked: false, reason: "tracking_failed" }, { status: 202 });
  }

  return secureJson({ ok: true, tracked: true });
}

function getString(body: object, key: string, maxLength: number) {
  return key in body && typeof (body as Record<string, unknown>)[key] === "string" ? sanitizeText(String((body as Record<string, unknown>)[key]), maxLength) : "";
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function isSafeAffiliateLink(value: string) {
  return value.startsWith("https://") || value.startsWith("/");
}

function isSafeTimestamp(value: string) {
  if (!value) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime());
}

function getDomain(value: string) {
  if (!value || value.startsWith("/")) return null;
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
