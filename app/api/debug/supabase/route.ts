import dns from "node:dns/promises";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isAdminAuthorized, rateLimit, secureJson } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const limited = rateLimit(request, { key: "debug-supabase", limit: 20, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  if (!isAdminAuthorized(request)) {
    return secureJson({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const host = safeHost(url);
  const result: Record<string, unknown> = {
    urlConfigured: Boolean(url),
    serviceKeyConfigured: Boolean(serviceRoleKey),
    host,
  };

  if (!url || !host || !serviceRoleKey) {
    return secureJson({ ok: false, ...result, error: "missing_env" });
  }

  try {
    const dnsResult = await dns.lookup(host);
    result.dns = { ok: true, family: dnsResult.family };
  } catch (error) {
    result.dns = { ok: false, error: getErrorMessage(error) };
  }

  if (!isSupabaseConfigured()) {
    return secureJson({ ok: false, ...result, error: "supabase_not_configured" });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error, count } = await supabase.from("leads").select("id", { count: "exact", head: true });

    if (error) {
      return secureJson({
        ok: false,
        ...result,
        supabase: {
          ok: false,
          code: error.code,
          message: error.message,
        },
      });
    }

    return secureJson({ ok: true, ...result, supabase: { ok: true, leadsCount: count } });
  } catch (error) {
    return secureJson({ ok: false, ...result, supabase: { ok: false, error: getErrorMessage(error) } });
  }
}

function safeHost(value: string) {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message.slice(0, 250) : String(error).slice(0, 250);
}
