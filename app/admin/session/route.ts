import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, isSecretEqual, jsonSecurityHeaders, rateLimit } from "@/lib/security/request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

export function GET(request: Request) {
  const limited = rateLimit(request, { key: "admin-session", limit: 12, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const destination = new URL("/admin", request.url);

  if (!expectedToken || !isSecretEqual(token, expectedToken)) {
    destination.searchParams.set("login", "failed");
    return NextResponse.redirect(destination, {
      status: 303,
      headers: jsonSecurityHeaders,
    });
  }

  const response = NextResponse.redirect(destination, {
    status: 303,
    headers: jsonSecurityHeaders,
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(expectedToken),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
