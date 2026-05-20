import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { enforceSameOrigin, isSafeSlug, rateLimit, rejectLargeRequest, sanitizeMetadata, sanitizeText, secureJson } from "@/lib/security/request";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 20_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "leads", limit: 25, windowMs: 60 * 1000 });
  if (limited) return limited;

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const email = getString(body, "email", 254).toLowerCase();
  const phone = getString(body, "phone", 40);
  const firstName = getString(body, "firstName", 80);
  const categorySlug = getString(body, "categorySlug", 80);
  const rawAnswers = "answers" in body ? (body as Record<string, unknown>).answers : null;
  const answers = Array.isArray(rawAnswers) ? rawAnswers.filter((item: unknown): item is string => typeof item === "string").slice(0, 30).map((item) => sanitizeText(item, 120)) : [];
  const consentContact = "consentContact" in body && body.consentContact === true;
  const intentScore = "intentScore" in body && typeof body.intentScore === "number" ? Math.max(0, Math.min(100, Math.round(body.intentScore))) : null;
  const metadata = isRecord(body) && isRecord(body.metadata) ? sanitizeMetadata(body.metadata) : {};

  if (!isValidEmail(email) || !isValidPhone(phone) || !isSafeSlug(categorySlug) || !consentContact) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return secureJson({ ok: true, persisted: false, reason: "supabase_not_configured" });
  }

  const supabase = createSupabaseAdminClient();
  const richPayload = {
    email,
    phone,
    first_name: firstName || null,
    consent_contact: consentContact,
    category_slug: categorySlug,
    answer_snapshot: answers,
    intent_score: intentScore,
    metadata: {
      ...metadata,
      userAgent: sanitizeText(request.headers.get("user-agent") ?? "", 300),
      referrer: sanitizeText(request.headers.get("referer") ?? "", 500),
    },
    source: "comparator_wizard",
  };

  const richInsert = await supabase.from("leads").insert(richPayload).select("id").single();

  if (!richInsert.error) {
    return secureJson({ ok: true, persisted: true, leadId: richInsert.data?.id });
  }

  if (isMissingColumnError(richInsert.error)) {
    const fallbackInsert = await supabase
      .from("leads")
      .insert({
        email,
        phone,
        category_slug: categorySlug,
        answer_snapshot: answers,
        source: "comparator_wizard",
      })
      .select("id")
      .single();

    if (!fallbackInsert.error) {
      return secureJson({ ok: true, persisted: true, leadId: fallbackInsert.data?.id, downgraded: true });
    }

    console.error("Failed to persist lead fallback", fallbackInsert.error);
    return secureJson({ ok: true, persisted: false, reason: "persistence_failed" }, { status: 202 });
  }

  console.error("Failed to persist lead", richInsert.error);
  return secureJson({ ok: true, persisted: false, reason: "persistence_failed" }, { status: 202 });
}

function getString(body: object, key: string, maxLength: number) {
  return key in body && typeof (body as Record<string, unknown>)[key] === "string" ? sanitizeText(String((body as Record<string, unknown>)[key]), maxLength) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMissingColumnError(error: { code?: string; message?: string }) {
  const message = error.message?.toLowerCase() ?? "";
  return error.code === "42703" || message.includes("column") || message.includes("schema cache");
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
