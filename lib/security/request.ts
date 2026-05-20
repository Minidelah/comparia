import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "__comparia_admin";
const ADMIN_SESSION_CONTEXT = "comparia-admin-session:v1";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export const jsonSecurityHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
} as const;

export function isAdminAuthorized(request: Request) {
  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const isProduction = process.env.NODE_ENV === "production";
  const url = new URL(request.url);
  const tokenFromQuery = url.searchParams.get("token");
  const tokenFromHeader = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const tokenFromCookie = getCookieValue(request, ADMIN_SESSION_COOKIE);
  const providedToken = tokenFromHeader || tokenFromQuery || "";

  if (!expectedToken) return !isProduction;
  return isSecretEqual(providedToken, expectedToken) || isAdminSessionToken(tokenFromCookie, expectedToken);
}

export function rejectLargeRequest(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return null;

  const bytes = Number(contentLength);
  if (!Number.isFinite(bytes) || bytes <= maxBytes) return null;

  return Response.json({ error: "payload_too_large" }, { status: 413, headers: jsonSecurityHeaders });
}

export function enforceSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = safeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  const vercelOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  const isLocalDev = process.env.NODE_ENV !== "production" && /^http:\/\/localhost:\d+$/.test(origin);

  if ([requestOrigin, configuredOrigin, vercelOrigin].filter(Boolean).includes(origin) || isLocalDev) {
    return null;
  }

  return Response.json({ error: "forbidden_origin" }, { status: 403, headers: jsonSecurityHeaders });
}

export function rateLimit(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  cleanupRateLimitStore(now);

  const id = `${options.key}:${getClientIp(request)}`;
  const current = rateLimitStore.get(id);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(id, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  current.count += 1;

  if (current.count <= options.limit) return null;

  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  return Response.json(
    { error: "rate_limited", retryAfter },
    {
      status: 429,
      headers: {
        ...jsonSecurityHeaders,
        "Retry-After": String(retryAfter),
      },
    },
  );
}

export function sanitizeText(value: string, maxLength: number) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

export function isSafeSlug(value: string, maxLength = 80) {
  return value.length > 0 && value.length <= maxLength && /^[a-z0-9-]+$/.test(value);
}

export function sanitizeMetadata(input: Record<string, unknown>, maxBytes = 5000) {
  const sanitized = sanitizeRecord(input, 0);
  const serialized = JSON.stringify(sanitized);
  if (serialized.length <= maxBytes) return sanitized;
  return { truncated: true, bytes: serialized.length };
}

export function secureJson(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      ...jsonSecurityHeaders,
      ...(init.headers ?? {}),
    },
  });
}

function sanitizeRecord(input: Record<string, unknown>, depth: number): Record<string, unknown> {
  if (depth > 2) return { truncated: true };

  return Object.fromEntries(
    Object.entries(input)
      .slice(0, 40)
      .map(([key, value]) => [sanitizeText(key, 80), sanitizeValue(value, depth)]),
  );
}

function sanitizeValue(value: unknown, depth: number): unknown {
  if (typeof value === "string") return sanitizeText(value, 500);
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean" || value === null) return value;
  if (Array.isArray(value)) return value.slice(0, 40).map((item) => sanitizeValue(item, depth + 1));
  if (typeof value === "object" && value !== null) return sanitizeRecord(value as Record<string, unknown>, depth + 1);
  return null;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || forwardedFor || "unknown";
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < 1000) return;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }
}

export function isSecretEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function createAdminSessionToken(secret: string) {
  return crypto.createHmac("sha256", secret).update(ADMIN_SESSION_CONTEXT).digest("base64url");
}

export function isAdminSessionToken(sessionToken: string, secret: string) {
  if (!sessionToken || !secret) return false;
  return isSecretEqual(sessionToken, createAdminSessionToken(secret));
}

function getCookieValue(request: Request, name: string) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return "";

  const prefix = `${name}=`;
  const match = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!match) return "";

  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return "";
  }
}

function safeOrigin(value?: string) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}
