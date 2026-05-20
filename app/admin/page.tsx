import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminAwinImportButton from "@/components/AdminAwinImportButton";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { createSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { ADMIN_SESSION_COOKIE, isAdminSessionToken, isSecretEqual } from "@/lib/security/request";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Comparia",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

type AdminSearchParams = Promise<Record<string, string | string[] | undefined>>;

type LeadRow = {
  id: string;
  email: string;
  phone: string;
  first_name: string | null;
  consent_contact: boolean;
  category_slug: string;
  answer_snapshot: string[] | null;
  intent_score: number | null;
  source: string | null;
  created_at: string;
};

type FunnelEventRow = {
  id: string;
  event_name: string;
  category_slug: string | null;
  lead_id: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
};

type AffiliateClickRow = {
  id: string;
  source_screen: string | null;
  clicked_at: string;
  meta: Record<string, unknown> | null;
};

type TrafficDay = {
  key: string;
  label: string;
  visitors: number;
  pageViews: number;
};

type TrafficPage = {
  path: string;
  visitors: number;
  pageViews: number;
};

type TrafficAnalytics = {
  todayVisitors: number;
  sevenDayVisitors: number;
  thirtyDayVisitors: number;
  monthVisitors: number;
  thirtyDayPageViews: number;
  daily: TrafficDay[];
  topPages: TrafficPage[];
};

export default async function AdminPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const params = await searchParams;
  const token = getParam(params.token);
  const expectedToken = process.env.ADMIN_DASHBOARD_TOKEN;
  const isProduction = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value ?? "";
  const queryTokenIsValid = expectedToken ? isSecretEqual(token ?? "", expectedToken) : false;

  if (queryTokenIsValid) {
    redirect(`/admin/session?token=${encodeURIComponent(token ?? "")}`);
  }

  const allowed = expectedToken ? isAdminSessionToken(sessionToken, expectedToken) : !isProduction;

  if (!allowed) {
    return <LockedAdmin expectedTokenConfigured={Boolean(expectedToken)} />;
  }

  if (!isSupabaseConfigured()) {
    return <AdminShell warning="Supabase n’est pas configuré dans .env.local." />;
  }

  const supabase = createSupabaseAdminClient();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const ninetyDaysStart = new Date(todayStart);
  ninetyDaysStart.setDate(todayStart.getDate() - 90);

  const [
    leadsResult,
    eventsResult,
    clicksResult,
    leadsCountResult,
    leadsTodayResult,
    viewsCountResult,
    submitsCountResult,
    capturedCountResult,
    unlockedCountResult,
    clicksCountResult,
    pageViewsResult,
  ] = await Promise.all([
    supabase.from("leads").select("id,email,phone,first_name,consent_contact,category_slug,answer_snapshot,intent_score,source,created_at").order("created_at", { ascending: false }).limit(80),
    supabase.from("funnel_events").select("id,event_name,category_slug,lead_id,meta,created_at").order("created_at", { ascending: false }).limit(120),
    supabase.from("affiliate_clicks").select("id,source_screen,clicked_at,meta").order("clicked_at", { ascending: false }).limit(40),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", todayStart.toISOString()),
    supabase.from("funnel_events").select("id", { count: "exact", head: true }).eq("event_name", "wizard_viewed"),
    supabase.from("funnel_events").select("id", { count: "exact", head: true }).eq("event_name", "lead_submit_clicked"),
    supabase.from("funnel_events").select("id", { count: "exact", head: true }).eq("event_name", "lead_captured"),
    supabase.from("funnel_events").select("id", { count: "exact", head: true }).eq("event_name", "offers_unlocked"),
    supabase.from("affiliate_clicks").select("id", { count: "exact", head: true }),
    supabase
      .from("funnel_events")
      .select("id,event_name,category_slug,lead_id,meta,created_at")
      .eq("event_name", "page_view")
      .gte("created_at", ninetyDaysStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  const leads = (leadsResult.data ?? []) as LeadRow[];
  const events = (eventsResult.data ?? []) as FunnelEventRow[];
  const clicks = (clicksResult.data ?? []) as AffiliateClickRow[];
  const pageViews = (pageViewsResult.data ?? []) as FunnelEventRow[];
  const errors = [leadsResult.error, eventsResult.error, clicksResult.error, pageViewsResult.error]
    .filter(Boolean)
    .map((error) => error?.message)
    .filter(Boolean) as string[];

  const totalLeads = leadsCountResult.count ?? leads.length;
  const leadsToday = leadsTodayResult.count ?? countToday(leads);
  const views = viewsCountResult.count ?? countEvent(events, "wizard_viewed");
  const submits = submitsCountResult.count ?? countEvent(events, "lead_submit_clicked");
  const captured = capturedCountResult.count ?? countEvent(events, "lead_captured");
  const unlocked = unlockedCountResult.count ?? countEvent(events, "offers_unlocked");
  const affiliateClicks = clicksCountResult.count ?? clicks.length;
  const categories = buildCategoryStats(leads);
  const averageIntent = calculateAverageIntent(leads);
  const traffic = buildTrafficAnalytics(pageViews);

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteNav />

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Admin Comparia</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Pilotage business.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                Leads, tunnel de conversion, clics affiliés et catégories les plus actives — sans passer par Supabase à chaque fois.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
              {expectedToken ? "Accès protégé par ADMIN_DASHBOARD_TOKEN." : "Mode local : ajoute ADMIN_DASHBOARD_TOKEN avant production."}
            </div>
          </div>
        </section>

        <section className="mt-5">
          <AdminAwinImportButton />
        </section>

        {errors.length > 0 && (
          <section className="mt-5 rounded-[1.5rem] border border-rose-300/20 bg-rose-300/10 p-5 text-sm leading-6 text-rose-100">
            <p className="font-semibold">Erreurs Supabase détectées</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AdminMetric label="Visiteurs aujourd’hui" value={String(traffic.todayVisitors)} tone="cyan" />
          <AdminMetric label="Visiteurs 7 jours" value={String(traffic.sevenDayVisitors)} tone="emerald" />
          <AdminMetric label="Visiteurs 30 jours" value={String(traffic.thirtyDayVisitors)} tone="blue" />
          <AdminMetric label="Visiteurs ce mois" value={String(traffic.monthVisitors)} tone="purple" />
          <AdminMetric label="Pages vues 30j" value={String(traffic.thirtyDayPageViews)} tone="amber" />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <TrafficTimeline days={traffic.daily} />
          <TopPages pages={traffic.topPages} />
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AdminMetric label="Leads total" value={String(totalLeads)} tone="cyan" />
          <AdminMetric label="Leads aujourd’hui" value={String(leadsToday)} tone="emerald" />
          <AdminMetric label="Score moyen" value={averageIntent ? `${averageIntent}/100` : "—"} tone="blue" />
          <AdminMetric label="Offres débloquées" value={String(unlocked)} tone="purple" />
          <AdminMetric label="Clics affiliés" value={String(affiliateClicks)} tone="amber" />
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Tunnel</p>
            <h2 className="mt-3 text-2xl font-semibold">Où les utilisateurs avancent.</h2>
            <div className="mt-6 space-y-4">
              <FunnelBar label="Comparateurs vus" value={views} max={Math.max(views, 1)} />
              <FunnelBar label="Formulaires soumis" value={submits} max={Math.max(views, submits, 1)} />
              <FunnelBar label="Leads capturés" value={captured} max={Math.max(views, captured, 1)} />
              <FunnelBar label="Offres débloquées" value={unlocked} max={Math.max(captured, unlocked, 1)} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <RateCard label="Comparateur → lead" value={rate(captured, views)} />
              <RateCard label="Lead → offres" value={rate(unlocked, captured)} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Catégories</p>
            <h2 className="mt-3 text-2xl font-semibold">Ce qui génère des contacts.</h2>
            <div className="mt-6 space-y-3">
              {categories.length > 0 ? (
                categories.map((item) => <CategoryRow key={item.slug} slug={item.slug} count={item.count} total={leads.length} />)
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">Aucun lead pour le moment.</p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Leads récents</p>
                <h2 className="mt-3 text-2xl font-semibold">Contacts à traiter.</h2>
              </div>
              <Link href="/comparateurs" className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                Tester un comparateur
              </Link>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">Contact</th>
                    <th className="py-3 pr-4">Téléphone</th>
                    <th className="py-3 pr-4">Catégorie</th>
                    <th className="py-3 pr-4">Score</th>
                    <th className="py-3 pr-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {leads.slice(0, 18).map((lead) => (
                    <tr key={lead.id}>
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-white">{lead.first_name || "Sans prénom"}</p>
                        <a className="text-slate-400 transition hover:text-cyan-300" href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>
                      <td className="py-3 pr-4"><a className="text-slate-300 transition hover:text-cyan-300" href={`tel:${lead.phone}`}>{lead.phone}</a></td>
                      <td className="py-3 pr-4"><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">{formatSlug(lead.category_slug)}</span></td>
                      <td className="py-3 pr-4 text-slate-300">{lead.intent_score ? `${lead.intent_score}/100` : "—"}</td>
                      <td className="py-3 pr-4 text-slate-400">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length === 0 && <p className="py-8 text-center text-sm text-slate-400">Aucun lead enregistré.</p>}
            </div>
          </div>

          <div className="space-y-5">
            <RecentEvents events={events} />
            <RecentClicks clicks={clicks} />
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

function LockedAdmin({ expectedTokenConfigured }: { expectedTokenConfigured: boolean }) {
  return (
    <AdminShell>
      <section className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 text-amber-50 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Accès admin protégé</p>
        <h1 className="mt-3 text-3xl font-semibold">Dashboard verrouillé.</h1>
        <p className="mt-4 text-sm leading-6 text-amber-100/80">
          {expectedTokenConfigured
            ? "Ajoute ?token=TON_TOKEN_ADMIN une seule fois : Comparia créera ensuite une session admin sécurisée."
            : "En production, configure ADMIN_DASHBOARD_TOKEN dans tes variables d’environnement avant d’ouvrir cette page."}
        </p>
      </section>
    </AdminShell>
  );
}

function AdminShell({ children, warning }: { children?: React.ReactNode; warning?: string }) {
  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteNav />
        {warning && (
          <section className="mt-8 rounded-[2rem] border border-rose-300/20 bg-rose-300/10 p-6 text-rose-100">
            {warning}
          </section>
        )}
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}

function AdminMetric({ label, value, tone }: { label: string; value: string; tone: "cyan" | "emerald" | "blue" | "purple" | "amber" }) {
  const tones = {
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
    emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    blue: "border-blue-300/20 bg-blue-400/10 text-blue-200",
    purple: "border-purple-300/20 bg-purple-400/10 text-purple-200",
    amber: "border-amber-300/20 bg-amber-400/10 text-amber-200",
  };

  return (
    <article className={`rounded-[1.5rem] border p-5 ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-[0.22em] opacity-70">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
    </article>
  );
}

function FunnelBar({ label, value, max }: { label: string; value: number; max: number }) {
  const width = Math.max(4, Math.round((value / max) * 100));
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-200">{label}</span>
        <span className="text-slate-400">{value}</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function RateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function CategoryRow({ slug, count, total }: { slug: string; count: number; total: number }) {
  const width = Math.max(6, Math.round((count / Math.max(total, 1)) * 100));
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-slate-100">{formatSlug(slug)}</span>
        <span className="text-sm text-slate-400">{count} lead{count > 1 ? "s" : ""}</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function TrafficTimeline({ days }: { days: TrafficDay[] }) {
  const max = Math.max(...days.map((day) => day.pageViews), 1);

  return (
    <section className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Audience</p>
          <h2 className="mt-3 text-2xl font-semibold">Visiteurs par jour.</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-400">Le tracking ignore l’admin et compte les visiteurs via un identifiant local pseudonyme.</p>
      </div>

      <div className="mt-6 flex min-h-56 items-end gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const height = Math.max(10, Math.round((day.pageViews / max) * 100));
          return (
            <div key={day.key} className="flex min-w-14 flex-1 flex-col items-center gap-2">
              <div className="flex h-36 w-full items-end rounded-2xl bg-white/[0.04] px-2 py-2">
                <div
                  className="w-full rounded-xl bg-gradient-to-t from-cyan-500 to-emerald-300 shadow-lg shadow-cyan-500/10"
                  style={{ height: `${height}%` }}
                  title={`${day.pageViews} pages vues · ${day.visitors} visiteurs`}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-white">{day.visitors}</p>
                <p className="text-[0.65rem] uppercase tracking-[0.12em] text-slate-500">{day.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TopPages({ pages }: { pages: TrafficPage[] }) {
  const max = Math.max(...pages.map((page) => page.pageViews), 1);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Pages fortes</p>
      <h2 className="mt-3 text-2xl font-semibold">Ce qui attire le trafic.</h2>
      <div className="mt-6 space-y-3">
        {pages.length > 0 ? (
          pages.map((page) => <TopPageRow key={page.path} page={page} max={max} />)
        ) : (
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">Les visites publiques vont apparaître ici après le prochain passage sur le site.</p>
        )}
      </div>
    </section>
  );
}

function TopPageRow({ page, max }: { page: TrafficPage; max: number }) {
  const width = Math.max(6, Math.round((page.pageViews / max) * 100));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="break-all text-sm font-semibold text-slate-100">{formatPagePath(page.path)}</p>
          <p className="mt-1 text-xs text-slate-500">{page.visitors} visiteur{page.visitors > 1 ? "s" : ""}</p>
        </div>
        <span className="text-sm font-semibold text-emerald-300">{page.pageViews} vue{page.pageViews > 1 ? "s" : ""}</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function RecentEvents({ events }: { events: FunnelEventRow[] }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Événements récents</p>
      <div className="mt-5 space-y-3">
        {events.slice(0, 8).map((event) => (
          <div key={event.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{event.event_name}</span>
              <span className="text-xs text-slate-500">{formatDate(event.created_at)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{event.category_slug ? formatSlug(event.category_slug) : "Sans catégorie"}</p>
          </div>
        ))}
        {events.length === 0 && <p className="text-sm text-slate-400">Aucun événement.</p>}
      </div>
    </section>
  );
}

function RecentClicks({ clicks }: { clicks: AffiliateClickRow[] }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Clics affiliés</p>
      <div className="mt-5 space-y-3">
        {clicks.slice(0, 6).map((click) => (
          <div key={click.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{getOfferId(click.meta)}</span>
              <span className="text-xs text-slate-500">{formatDate(click.clicked_at)}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{click.source_screen ?? "source inconnue"}</p>
          </div>
        ))}
        {clicks.length === 0 && <p className="text-sm text-slate-400">Aucun clic affilié encore.</p>}
      </div>
    </section>
  );
}

function buildTrafficAnalytics(pageViews: FunnelEventRow[]): TrafficAnalytics {
  const now = new Date();
  const todayKey = dateKey(now);
  const currentMonth = todayKey.slice(0, 7);
  const dayKeys = lastDayKeys(14, now);
  const dailyMap = new Map<string, { visitors: Set<string>; pageViews: number }>();
  const topPageMap = new Map<string, { visitors: Set<string>; pageViews: number }>();
  const todayVisitors = new Set<string>();
  const sevenDayVisitors = new Set<string>();
  const thirtyDayVisitors = new Set<string>();
  const monthVisitors = new Set<string>();
  let thirtyDayPageViews = 0;

  for (const key of dayKeys) {
    dailyMap.set(key, { visitors: new Set(), pageViews: 0 });
  }

  for (const event of pageViews) {
    const createdAt = new Date(event.created_at);
    if (Number.isNaN(createdAt.getTime())) continue;

    const meta = event.meta ?? {};
    const path = normalizeTrackedPath(getMetaString(meta, "path") || getMetaString(meta, "url") || "/");
    if (path.startsWith("/admin") || path.startsWith("/api")) continue;

    const visitorId = getMetaString(meta, "visitorId") || getMetaString(meta, "sessionId") || event.id;
    const key = dateKey(createdAt);
    const ageMs = now.getTime() - createdAt.getTime();

    if (key === todayKey) todayVisitors.add(visitorId);
    if (ageMs <= 7 * 24 * 60 * 60 * 1000) sevenDayVisitors.add(visitorId);
    if (ageMs <= 30 * 24 * 60 * 60 * 1000) {
      thirtyDayVisitors.add(visitorId);
      thirtyDayPageViews += 1;
    }
    if (key.startsWith(currentMonth)) monthVisitors.add(visitorId);

    const daily = dailyMap.get(key);
    if (daily) {
      daily.visitors.add(visitorId);
      daily.pageViews += 1;
    }

    const page = topPageMap.get(path) ?? { visitors: new Set<string>(), pageViews: 0 };
    page.visitors.add(visitorId);
    page.pageViews += 1;
    topPageMap.set(path, page);
  }

  return {
    todayVisitors: todayVisitors.size,
    sevenDayVisitors: sevenDayVisitors.size,
    thirtyDayVisitors: thirtyDayVisitors.size,
    monthVisitors: monthVisitors.size,
    thirtyDayPageViews,
    daily: dayKeys.map((key) => {
      const item = dailyMap.get(key);
      return {
        key,
        label: formatDayKey(key),
        visitors: item?.visitors.size ?? 0,
        pageViews: item?.pageViews ?? 0,
      };
    }),
    topPages: Array.from(topPageMap.entries())
      .map(([path, item]) => ({ path, visitors: item.visitors.size, pageViews: item.pageViews }))
      .sort((a, b) => b.pageViews - a.pageViews || b.visitors - a.visitors)
      .slice(0, 8),
  };
}

function buildCategoryStats(leads: LeadRow[]) {
  const stats = new Map<string, number>();
  for (const lead of leads) {
    stats.set(lead.category_slug, (stats.get(lead.category_slug) ?? 0) + 1);
  }
  return Array.from(stats.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

function calculateAverageIntent(leads: LeadRow[]) {
  const scores = leads.map((lead) => lead.intent_score).filter((score): score is number => typeof score === "number");
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
}

function countToday(leads: LeadRow[]) {
  const today = new Date().toDateString();
  return leads.filter((lead) => new Date(lead.created_at).toDateString() === today).length;
}

function countEvent(events: FunnelEventRow[], name: string) {
  return events.filter((event) => event.event_name === name).length;
}

function rate(part: number, total: number) {
  if (!total) return "—";
  return `${Math.round((part / total) * 100)}%`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPagePath(path: string) {
  if (path === "/") return "Accueil";
  if (path === "/comparateurs") return "Tous les comparateurs";
  if (path.startsWith("/comparateurs/")) return formatSlug(path.replace("/comparateurs/", ""));
  return path;
}

function normalizeTrackedPath(value: string) {
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return new URL(value).pathname || "/";
    }
  } catch {
    return "/";
  }

  const path = value.split("?")[0]?.split("#")[0] || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function getMetaString(meta: Record<string, unknown>, key: string) {
  const value = meta[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function lastDayKeys(count: number, anchor: Date) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(anchor);
    date.setDate(anchor.getDate() - (count - 1 - index));
    return dateKey(date);
  });
}

function dateKey(value: Date) {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function formatDayKey(key: string) {
  const [, month, day] = key.split("-");
  return `${day}/${month}`;
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getOfferId(meta: Record<string, unknown> | null) {
  const value = meta?.offer_slot_id;
  return typeof value === "string" ? value : "Clic offre";
}
