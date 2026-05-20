import dns from "node:dns/promises";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const host = safeHost(url);
  const result: Record<string, unknown> = {
    urlConfigured: Boolean(url),
    serviceKeyConfigured: Boolean(serviceRoleKey),
    host,
    serviceKeyPrefix: serviceRoleKey ? `${serviceRoleKey.slice(0, 9)}…` : null,
  };

  if (!url || !host || !serviceRoleKey) {
    return Response.json({ ok: false, ...result, error: "missing_env" }, { status: 200 });
  }

  try {
    const dnsResult = await dns.lookup(host);
    result.dns = { ok: true, address: dnsResult.address, family: dnsResult.family };
  } catch (error) {
    result.dns = { ok: false, error: getErrorMessage(error) };
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ ok: false, ...result, error: "supabase_not_configured" }, { status: 200 });
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error, count } = await supabase.from("leads").select("id", { count: "exact", head: true });

    if (error) {
      return Response.json({
        ok: false,
        ...result,
        supabase: {
          ok: false,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        },
      });
    }

    return Response.json({ ok: true, ...result, supabase: { ok: true, leadsCount: count } });
  } catch (error) {
    return Response.json({ ok: false, ...result, supabase: { ok: false, error: getErrorMessage(error) } });
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
  return error instanceof Error ? error.message : String(error);
}
