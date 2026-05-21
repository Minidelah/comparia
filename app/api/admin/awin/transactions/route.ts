import { syncAwinTransactions } from "@/lib/awin/sync-transactions";
import { enforceSameOrigin, isAdminAuthorized, rateLimit, rejectLargeRequest, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 8_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "admin-awin-transactions", limit: 12, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  if (!isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const days = isRecord(body) && typeof body.days === "number" ? body.days : undefined;

  try {
    const summary = await syncAwinTransactions({ days });
    return secureJson(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    return secureJson({ error: sanitizeErrorMessage(message) }, { status: 500 });
  }
}

function sanitizeErrorMessage(message: string) {
  const secrets = [process.env.AWIN_API_TOKEN, process.env.SUPABASE_SERVICE_ROLE_KEY, process.env.ADMIN_DASHBOARD_TOKEN].filter(
    (secret): secret is string => Boolean(secret),
  );

  return secrets.reduce((safe, secret) => safe.replaceAll(secret, "[secret]"), message).slice(0, 500);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
