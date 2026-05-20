import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const email = getString(body, "email").trim();
  const phone = getString(body, "phone").trim();
  const firstName = getString(body, "firstName").trim();
  const categorySlug = getString(body, "categorySlug");
  const rawAnswers = "answers" in body ? (body as Record<string, unknown>).answers : null;
  const answers = Array.isArray(rawAnswers) ? rawAnswers.filter((item: unknown): item is string => typeof item === "string") : [];
  const consentContact = "consentContact" in body && body.consentContact === true;
  const intentScore = "intentScore" in body && typeof body.intentScore === "number" ? Math.max(0, Math.min(100, Math.round(body.intentScore))) : null;
  const metadata = isRecord(body) && isRecord(body.metadata) ? body.metadata : {};

  if (!isValidEmail(email) || !isValidPhone(phone) || !categorySlug || !consentContact) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ ok: true, persisted: false, reason: "supabase_not_configured" });
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
      userAgent: request.headers.get("user-agent"),
      referrer: request.headers.get("referer"),
    },
    source: "comparator_wizard",
  };

  const richInsert = await supabase.from("leads").insert(richPayload).select("id").single();

  if (!richInsert.error) {
    return Response.json({ ok: true, persisted: true, leadId: richInsert.data?.id });
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
      return Response.json({ ok: true, persisted: true, leadId: fallbackInsert.data?.id, downgraded: true });
    }

    console.error("Failed to persist lead fallback", fallbackInsert.error);
    return Response.json({ ok: true, persisted: false, reason: "persistence_failed", details: sanitizeError(fallbackInsert.error) }, { status: 202 });
  }

  console.error("Failed to persist lead", richInsert.error);
  return Response.json({ ok: true, persisted: false, reason: "persistence_failed", details: sanitizeError(richInsert.error) }, { status: 202 });
}

function sanitizeError(error: { code?: string; message?: string; details?: string; hint?: string }) {
  return {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  };
}

function getString(body: object, key: string) {
  return key in body && typeof (body as Record<string, unknown>)[key] === "string" ? ((body as Record<string, string>)[key] ?? "") : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMissingColumnError(error: { code?: string; message?: string }) {
  const message = error.message?.toLowerCase() ?? "";
  return error.code === "42703" || message.includes("column") || message.includes("schema cache");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}
