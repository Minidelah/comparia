import { importAwinOffers } from "@/lib/awin/import-offers";
import { isAdminAuthorized, isSecretEqual, rateLimit, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const limited = rateLimit(request, { key: "cron-awin-refresh", limit: 8, windowMs: 60 * 60 * 1000 });
  if (limited) return limited;

  if (!isCronAuthorized(request) && !isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized_cron" }, { status: 401 });
  }

  try {
    const summary = await importAwinOffers({ dryRun: false });
    return secureJson({
      ok: true,
      job: "awin_offers_and_coupons_refresh",
      ranAt: new Date().toISOString(),
      summary,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    return secureJson({ error: sanitizeErrorMessage(message) }, { status: 500 });
  }
}

function isCronAuthorized(request: Request) {
  const expectedSecret = process.env.CRON_SECRET?.trim();
  const isProduction = process.env.NODE_ENV === "production";
  const header = request.headers.get("authorization") ?? "";
  const providedSecret = header.replace(/^Bearer\s+/i, "").trim();

  if (!expectedSecret) return !isProduction;
  return isSecretEqual(providedSecret, expectedSecret);
}

function sanitizeErrorMessage(message: string) {
  const secrets = [
    process.env.AWIN_API_TOKEN,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.ADMIN_DASHBOARD_TOKEN,
    process.env.CRON_SECRET,
  ].filter((secret): secret is string => Boolean(secret));

  return secrets.reduce((safe, secret) => safe.replaceAll(secret, "[secret]"), message).slice(0, 500);
}
