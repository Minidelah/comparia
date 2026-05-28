"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/analytics/attribution";

const VISITOR_KEY = "ctf_visitor_id";
const SESSION_KEY = "ctf_session_id";
const LAST_PAGE_VIEW_KEY = "ctf_last_page_view";
const PRESENCE_INTERVAL_MS = 30_000;

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || shouldIgnorePath(pathname)) return;

    const visitorId = getOrCreateBrowserId("local", VISITOR_KEY);
    const sessionId = getOrCreateBrowserId("session", SESSION_KEY);
    if (!visitorId || !sessionId) return;

    const now = Date.now();
    const categorySlug = inferCategorySlug(pathname);
    const attribution = captureAttribution(pathname);
    const baseMeta = {
      visitorId,
      sessionId,
      path: pathname,
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || null,
      attribution,
      source: "site_tracker",
    };

    if (!isDuplicatePageView(pathname, now)) {
      trackEvent("page_view", categorySlug, baseMeta);
    }

    trackEvent("presence_ping", categorySlug, { ...baseMeta, visible: !document.hidden });
    const intervalId = window.setInterval(() => {
      trackEvent("presence_ping", categorySlug, {
        ...baseMeta,
        visible: !document.hidden,
        url: window.location.href,
        title: document.title,
      });
    }, PRESENCE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [pathname]);

  return null;
}

function trackEvent(eventName: "page_view" | "presence_ping", categorySlug: string | null, meta: Record<string, unknown>) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, categorySlug, meta }),
    keepalive: true,
  }).catch(() => null);
}

function shouldIgnorePath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api");
}

function inferCategorySlug(pathname: string) {
  const match = pathname.match(/^\/comparateurs\/([^/?#]+)/);
  return match?.[1] ?? null;
}

function getOrCreateBrowserId(storageType: "local" | "session", key: string) {
  try {
    const storage = storageType === "local" ? window.localStorage : window.sessionStorage;
    const existing = storage.getItem(key);
    if (existing) return existing;

    const next = createId();
    storage.setItem(key, next);
    return next;
  } catch {
    return null;
  }
}

function isDuplicatePageView(pathname: string, now: number) {
  try {
    const raw = window.sessionStorage.getItem(LAST_PAGE_VIEW_KEY);
    const previous = raw ? (JSON.parse(raw) as { path?: string; at?: number }) : null;
    window.sessionStorage.setItem(LAST_PAGE_VIEW_KEY, JSON.stringify({ path: pathname, at: now }));
    return previous?.path === pathname && typeof previous.at === "number" && now - previous.at < 2000;
  } catch {
    return false;
  }
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
