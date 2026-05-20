import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const offerId = "offerId" in body && typeof body.offerId === "string" ? body.offerId : null;
  const categorySlug = "categorySlug" in body && typeof body.categorySlug === "string" ? body.categorySlug : null;
  const leadId = "leadId" in body && typeof body.leadId === "string" ? body.leadId : null;
  const sourceScreen = "sourceScreen" in body && typeof body.sourceScreen === "string" ? body.sourceScreen : null;
  const userId = "userId" in body && typeof body.userId === "string" ? body.userId : null;

  if (!offerId || !sourceScreen) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ ok: true, tracked: false, reason: "supabase_not_configured" });
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("affiliate_clicks").insert({
    user_id: userId,
    source_screen: sourceScreen,
    meta: {
      offer_slot_id: offerId,
      category_slug: categorySlug,
      lead_id: leadId,
    },
  });

  if (error) {
    console.error("Failed to track affiliate click", error);
    return Response.json({ ok: true, tracked: false, reason: "tracking_failed" }, { status: 202 });
  }

  return Response.json({ ok: true, tracked: true });
}
