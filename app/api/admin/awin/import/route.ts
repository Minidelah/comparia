import { importAwinOffers } from "@/lib/awin/import-offers";
import { enforceSameOrigin, isAdminAuthorized, rateLimit, rejectLargeRequest, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 8_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "admin-awin-import", limit: 10, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  if (!isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const dryRun = isRecord(body) && body.dryRun === true;

  try {
    const summary = await importAwinOffers({ dryRun });
    return secureJson(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    return secureJson({ error: sanitizeErrorMessage(message) }, { status: 500 });
  }
}

function sanitizeErrorMessage(message: string) {
  const token = process.env.AWIN_API_TOKEN;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const secrets = [token, serviceRoleKey, adminToken].filter((secret): secret is string => Boolean(secret));

  return secrets.reduce((safe, secret) => safe.replaceAll(secret, "[secret]"), message).slice(0, 500);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
