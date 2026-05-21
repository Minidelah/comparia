import { getAttributionMeta } from "@/lib/analytics/attribution";

export type AffiliateClickPayload = {
  offerId: string;
  category?: string;
  affiliateLink?: string;
  source: string;
  timestamp: string;
  userId?: string;
  leadId?: string;
  attribution?: ReturnType<typeof getAttributionMeta>;
};

type TrackAffiliateClickInput = {
  offerId: string;
  category?: string;
  affiliateLink?: string;
  source?: string;
  userId?: string;
  leadId?: string;
};

export async function trackAffiliateClick(input: TrackAffiliateClickInput) {
  const attribution = getAttributionMeta();
  const payload: AffiliateClickPayload = {
    offerId: input.offerId,
    category: input.category,
    affiliateLink: input.affiliateLink,
    source: input.source ?? "unknown",
    timestamp: new Date().toISOString(),
    userId: input.userId,
    leadId: input.leadId,
    attribution,
  };

  await Promise.allSettled([
    fetch("/api/affiliate/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }),
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "affiliate_cta_clicked",
        categorySlug: input.category,
        leadId: input.leadId,
        meta: {
          offerId: input.offerId,
          source: payload.source,
          affiliateDomain: safeDomain(input.affiliateLink),
          attribution,
        },
      }),
      keepalive: true,
    }),
  ]);

  return payload;
}

function safeDomain(value?: string) {
  if (!value || value.startsWith("/")) return null;
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}
