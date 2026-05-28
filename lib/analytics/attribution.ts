export type AttributionTouch = {
  source: string;
  medium: string;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
  clickId?: string | null;
  landingPage: string;
  referrer?: string | null;
  capturedAt: string;
};

export type AttributionPayload = {
  source: string;
  medium: string;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
  clickId?: string | null;
  landingPage: string;
  currentUrl: string;
  referrer?: string | null;
  firstTouch: AttributionTouch;
  lastTouch: AttributionTouch;
};

const ATTRIBUTION_KEY = "ctf_attribution_v1";

export function captureAttribution(pathname: string): AttributionPayload | null {
  if (typeof window === "undefined") return null;

  const currentUrl = window.location.href;
  const landingPage = `${pathname}${window.location.search || ""}`;
  const referrer = document.referrer || null;
  const touch = buildTouch({ currentUrl, landingPage, referrer });
  const existing = readStoredAttribution();
  const firstTouch = existing?.firstTouch ?? touch;
  const next: AttributionPayload = {
    source: touch.source,
    medium: touch.medium,
    campaign: touch.campaign,
    term: touch.term,
    content: touch.content,
    clickId: touch.clickId,
    landingPage: firstTouch.landingPage,
    currentUrl,
    referrer,
    firstTouch,
    lastTouch: touch,
  };

  try {
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    return next;
  }

  return next;
}

export function getAttributionMeta(): AttributionPayload | null {
  if (typeof window === "undefined") return null;
  return readStoredAttribution() ?? captureAttribution(window.location.pathname);
}

function readStoredAttribution(): AttributionPayload | null {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionPayload;
    if (!parsed || typeof parsed !== "object" || typeof parsed.source !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

function buildTouch({ currentUrl, landingPage, referrer }: { currentUrl: string; landingPage: string; referrer: string | null }): AttributionTouch {
  const url = new URL(currentUrl);
  const params = url.searchParams;
  const utmSource = clean(params.get("utm_source"));
  const utmMedium = clean(params.get("utm_medium"));
  const gclid = clean(params.get("gclid"));
  const gbraid = clean(params.get("gbraid"));
  const wbraid = clean(params.get("wbraid"));
  const fbclid = clean(params.get("fbclid"));
  const msclkid = clean(params.get("msclkid"));
  const clickId = gclid || gbraid || wbraid || fbclid || msclkid || null;
  const inferred = inferSource({ utmSource, utmMedium, referrer, clickId, params });

  return {
    source: inferred.source,
    medium: inferred.medium,
    campaign: clean(params.get("utm_campaign")),
    term: clean(params.get("utm_term")),
    content: clean(params.get("utm_content")),
    clickId,
    landingPage,
    referrer,
    capturedAt: new Date().toISOString(),
  };
}

function inferSource({
  utmSource,
  utmMedium,
  referrer,
  clickId,
  params,
}: {
  utmSource: string | null;
  utmMedium: string | null;
  referrer: string | null;
  clickId: string | null;
  params: URLSearchParams;
}) {
  if (utmSource) {
    return { source: utmSource.toLowerCase(), medium: (utmMedium || (clickId ? "paid" : "campaign")).toLowerCase() };
  }

  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return { source: "google", medium: "paid" };
  if (params.get("fbclid")) return { source: "meta", medium: "paid_social" };
  if (params.get("msclkid")) return { source: "bing", medium: "paid" };

  const domain = referrer ? safeHostname(referrer) : null;
  if (!domain) return { source: "direct", medium: "none" };
  if (domain.includes("google.")) return { source: "google", medium: "organic" };
  if (domain.includes("bing.")) return { source: "bing", medium: "organic" };
  if (domain.includes("yahoo.")) return { source: "yahoo", medium: "organic" };
  if (domain.includes("duckduckgo.")) return { source: "duckduckgo", medium: "organic" };
  if (domain.includes("instagram.") || domain.includes("facebook.") || domain.includes("tiktok.") || domain.includes("linkedin.")) {
    return { source: domain.replace(/^www\./, ""), medium: "social" };
  }

  return { source: domain.replace(/^www\./, ""), medium: "referral" };
}

function clean(value: string | null) {
  const next = value?.trim();
  return next ? next.slice(0, 160) : null;
}

function safeHostname(value: string) {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}
