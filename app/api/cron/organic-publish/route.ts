import { absoluteSiteUrl, getOrganicPostForDate } from "@/lib/marketing/organic-queue";
import { isAdminAuthorized, isSecretEqual, rateLimit, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PinterestCreatePinResponse = {
  id?: string;
  link?: string;
};

export async function GET(request: Request) {
  const limited = rateLimit(request, { key: "cron-organic-publish", limit: 8, windowMs: 60 * 60 * 1000 });
  if (limited) return limited;

  if (!isCronAuthorized(request) && !isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized_cron" }, { status: 401 });
  }

  const post = getOrganicPostForDate();
  const dryRun = process.env.ORGANIC_PUBLISH_DRY_RUN !== "false";
  const pinterestToken = process.env.PINTEREST_ACCESS_TOKEN?.trim();
  const pinterestBoardId = process.env.PINTEREST_BOARD_ID?.trim();
  const imageUrl = absoluteSiteUrl(post.imagePath);
  const linkUrl = absoluteSiteUrl(post.linkPath);

  if (dryRun) {
    return secureJson({
      ok: true,
      dryRun: true,
      job: "organic_publish",
      ranAt: new Date().toISOString(),
      post: { ...post, imageUrl, linkUrl },
      nextStep: "Set ORGANIC_PUBLISH_DRY_RUN=false, PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID in Vercel to publish automatically.",
    });
  }

  if (!pinterestToken || !pinterestBoardId) {
    return secureJson(
      {
        error: "missing_pinterest_configuration",
        requiredEnv: ["PINTEREST_ACCESS_TOKEN", "PINTEREST_BOARD_ID"],
      },
      { status: 500 },
    );
  }

  const response = await fetch("https://api.pinterest.com/v5/pins", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${pinterestToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board_id: pinterestBoardId,
      title: post.title,
      description: post.description,
      link: linkUrl,
      alt_text: post.altText,
      media_source: {
        source_type: "image_url",
        url: imageUrl,
      },
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as PinterestCreatePinResponse | Record<string, unknown>;

  if (!response.ok) {
    return secureJson(
      {
        error: "pinterest_publish_failed",
        status: response.status,
        details: sanitizePinterestPayload(payload),
      },
      { status: 502 },
    );
  }

  return secureJson({
    ok: true,
    dryRun: false,
    job: "organic_publish",
    ranAt: new Date().toISOString(),
    post: { ...post, imageUrl, linkUrl },
    pinterest: payload,
  });
}

function isCronAuthorized(request: Request) {
  const expectedSecret = process.env.CRON_SECRET?.trim();
  const isProduction = process.env.NODE_ENV === "production";
  const header = request.headers.get("authorization") ?? "";
  const providedSecret = header.replace(/^Bearer\s+/i, "").trim();

  if (!expectedSecret) return !isProduction;
  return isSecretEqual(providedSecret, expectedSecret);
}

function sanitizePinterestPayload(payload: Record<string, unknown>) {
  return JSON.parse(JSON.stringify(payload).slice(0, 1200)) as Record<string, unknown>;
}
