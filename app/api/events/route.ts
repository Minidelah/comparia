import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { enforceSameOrigin, isSafeSlug, rateLimit, rejectLargeRequest, sanitizeMetadata, sanitizeText, secureJson } from "@/lib/security/request";

const ALLOWED_EVENTS = new Set([
  "page_view",
  "presence_ping",
  "wizard_viewed",
  "wizard_step_answered",
  "lead_submit_clicked",
  "lead_captured",
  "lead_capture_failed",
  "offers_unlocked",
  "affiliate_cta_clicked",
]);

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 12_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "events", limit: 240, windowMs: 60 * 1000 });
  if (limited) return limited;

  const body = await request.json().catch(() => null);

  if (!isRecord(body)) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const eventName = typeof body.eventName === "string" ? sanitizeText(body.eventName, 80) : "";
  const categorySlug = typeof body.categorySlug === "string" && isSafeSlug(body.categorySlug) ? body.categorySlug : null;
  const leadId = typeof body.leadId === "string" && isUuidLike(body.leadId) ? body.leadId : null;
  const meta = isRecord(body.meta) ? sanitizeMetadata(body.meta) : {};

  if (!ALLOWED_EVENTS.has(eventName)) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return secureJson({ ok: true, tracked: false, reason: "supabase_not_configured" });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("funnel_events").insert({
    event_name: eventName,
    category_slug: categorySlug,
    lead_id: leadId,
    meta: {
      ...meta,
      userAgent: sanitizeText(request.headers.get("user-agent") ?? "", 300),
      referrer: sanitizeText(request.headers.get("referer") ?? "", 500),
    },
  });

  if (error) {
    console.error("Failed to track funnel event", error);
    return secureJson({ ok: true, tracked: false, reason: "tracking_failed" }, { status: 202 });
  }

  return secureJson({ ok: true, tracked: true });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUuidLike(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
