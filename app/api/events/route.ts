import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isRecord(body)) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const eventName = typeof body.eventName === "string" ? body.eventName.trim() : "";
  const categorySlug = typeof body.categorySlug === "string" ? body.categorySlug : null;
  const leadId = typeof body.leadId === "string" && body.leadId.length > 0 ? body.leadId : null;
  const meta = isRecord(body.meta) ? body.meta : {};

  if (!eventName || eventName.length > 80) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ ok: true, tracked: false, reason: "supabase_not_configured" });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("funnel_events").insert({
    event_name: eventName,
    category_slug: categorySlug,
    lead_id: leadId,
    meta: {
      ...meta,
      userAgent: request.headers.get("user-agent"),
      referrer: request.headers.get("referer"),
    },
  });

  if (error) {
    console.error("Failed to track funnel event", error);
    return Response.json({ ok: true, tracked: false, reason: "tracking_failed" }, { status: 202 });
  }

  return Response.json({ ok: true, tracked: true });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
