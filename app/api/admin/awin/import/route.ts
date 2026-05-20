import { importAwinOffers } from "@/lib/awin/import-offers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const dryRun = isRecord(body) && body.dryRun === true;

  try {
    const summary = await importAwinOffers({ dryRun });
    return Response.json(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    return Response.json({ error: sanitizeErrorMessage(message) }, { status: 500 });
  }
}

function isAuthorized(request: Request) {
  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const isProduction = process.env.NODE_ENV === "production";
  const url = new URL(request.url);
  const tokenFromQuery = url.searchParams.get("token");
  const tokenFromHeader = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const providedToken = tokenFromHeader || tokenFromQuery;

  if (!expectedToken) return !isProduction;
  return providedToken === expectedToken;
}

function sanitizeErrorMessage(message: string) {
  const token = process.env.AWIN_API_TOKEN;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secrets = [token, serviceRoleKey].filter((secret): secret is string => Boolean(secret));

  return secrets.reduce((safe, secret) => safe.replaceAll(secret, "[secret]"), message);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
