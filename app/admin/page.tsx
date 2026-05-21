import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminAwinImportButton from "@/components/AdminAwinImportButton";
import AdminOffersManager, { type AdminOfferRow } from "@/components/AdminOffersManager";
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
  offer_id: string | null;
  source_screen: string | null;
  clicked_at: string;
  meta: Record<string, unknown> | null;
};

type ConversionRow = {
  id: string;
  offer_id: string | null;
  commission_value: number | null;
  conversion_value: number | null;
  cashback_value: number | null;
  status: string | null;
  created_at: string;
  converted_at: string | null;
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

type DiagnosticInsights = {
  count: number;
  mistralCount: number;
  totalSavings: number;
  averageSavings: number;
  topCategory: string | null;
};

type CategoryPerformance = {
  slug: string;
  views: number;
  leads: number;
  diagnostics: number;
  clicks: number;
  savings: number;
  leadRate: string;
  clickRate: string;
};

type RevenueOfferProjection = {
  offerId: string;
  title: string;
  provider: string;
  category: string;
  active: boolean;
  sponsored: boolean;
  clicks30d: number;
  clicks90d: number;
  projectedMonthlyClicks: number;
  estimatedCommission: number;
  estimatedConversionRate: number;
  estimatedRevenue30d: number;
  projectedMonthlyRevenue: number;
  actualCommission30d: number;
};

type RevenueCategoryProjection = {
  slug: string;
  offerCount: number;
  clicks30d: number;
  projectedMonthlyClicks: number;
  estimatedRevenue30d: number;
  projectedMonthlyRevenue: number;
  actualCommission30d: number;
};

type RevenueProjection = {
  estimatedRevenue30d: number;
  projectedMonthlyRevenue: number;
  actualCommission30d: number;
  monetizableClicks30d: number;
  projectedMonthlyClicks: number;
  averageEstimatedCommission: number;
  blendedConversionRate: number;
  offerRows: RevenueOfferProjection[];
  categoryRows: RevenueCategoryProjection[];
};

type AdminActionItem = {
  id: string;
  title: string;
  body: string;
  impact: string;
  tone: "cyan" | "emerald" | "amber" | "rose" | "purple";
  href?: string;
  actionLabel?: string;
};

const DEFAULT_CATEGORY_COMMISSION: Record<string, number> = {
  "assurance-emprunteur": 55,
  "assurance-auto": 38,
  "assurance-habitation": 28,
  "mutuelle-sante": 34,
  "assurance-sante-frontaliers": 42,
  "assurance-animaux": 18,
  "assurance-moto": 24,
  "assurance-velo": 10,
  "assurance-trottinette": 8,
  electricite: 22,
  gaz: 20,
  "box-internet": 18,
  "forfait-mobile": 9,
  banque: 32,
  "change-chf-eur": 24,
  abonnements: 10,
  default: 16,
};

const DEFAULT_CATEGORY_CONVERSION_RATE: Record<string, number> = {
  "assurance-emprunteur": 0.045,
  "assurance-auto": 0.055,
  "assurance-habitation": 0.065,
  "mutuelle-sante": 0.05,
  "assurance-sante-frontaliers": 0.045,
  "assurance-animaux": 0.07,
  "assurance-moto": 0.055,
  "assurance-velo": 0.06,
  "assurance-trottinette": 0.06,
  electricite: 0.08,
  gaz: 0.08,
  "box-internet": 0.075,
  "forfait-mobile": 0.085,
  banque: 0.045,
  "change-chf-eur": 0.05,
  abonnements: 0.075,
  default: 0.06,
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
    wizardEventsResult,
    diagnosticEventsResult,
    affiliateEventsResult,
    clicksRangeResult,
    conversionsRangeResult,
    offersResult,
  ] = await Promise.all([
    supabase.from("leads").select("id,email,phone,first_name,consent_contact,category_slug,answer_snapshot,intent_score,source,created_at").order("created_at", { ascending: false }).limit(80),
    supabase.from("funnel_events").select("id,event_name,category_slug,lead_id,meta,created_at").order("created_at", { ascending: false }).limit(120),
    supabase.from("affiliate_clicks").select("id,offer_id,source_screen,clicked_at,meta").order("clicked_at", { ascending: false }).limit(40),
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
    supabase
      .from("funnel_events")
      .select("id,event_name,category_slug,lead_id,meta,created_at")
      .eq("event_name", "wizard_viewed")
      .gte("created_at", ninetyDaysStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(3000),
    supabase
      .from("funnel_events")
      .select("id,event_name,category_slug,lead_id,meta,created_at")
      .eq("event_name", "diagnostic_completed")
      .gte("created_at", ninetyDaysStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(3000),
    supabase
      .from("funnel_events")
      .select("id,event_name,category_slug,lead_id,meta,created_at")
      .eq("event_name", "affiliate_cta_clicked")
      .gte("created_at", ninetyDaysStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(3000),
    supabase
      .from("affiliate_clicks")
      .select("id,offer_id,source_screen,clicked_at,meta")
      .gte("clicked_at", ninetyDaysStart.toISOString())
      .order("clicked_at", { ascending: false })
      .limit(3000),
    supabase
      .from("conversions")
      .select("id,offer_id,commission_value,conversion_value,cashback_value,status,created_at,converted_at")
      .gte("created_at", ninetyDaysStart.toISOString())
      .order("created_at", { ascending: false })
      .limit(3000),
    supabase
      .from("offers")
      .select("id,category,provider,title,monthly_cost,annual_savings_estimate,affiliate_url,cashback_amount,sponsored,active,metadata,created_at")
      .order("category", { ascending: true })
      .order("active", { ascending: false })
      .order("annual_savings_estimate", { ascending: false, nullsFirst: false })
      .limit(200),
  ]);

  const leads = (leadsResult.data ?? []) as LeadRow[];
  const events = (eventsResult.data ?? []) as FunnelEventRow[];
  const clicks = (clicksResult.data ?? []) as AffiliateClickRow[];
  const pageViews = (pageViewsResult.data ?? []) as FunnelEventRow[];
  const wizardEvents = (wizardEventsResult.data ?? []) as FunnelEventRow[];
  const diagnosticEvents = (diagnosticEventsResult.data ?? []) as FunnelEventRow[];
  const affiliateEvents = (affiliateEventsResult.data ?? []) as FunnelEventRow[];
  const clicksRange = (clicksRangeResult.data ?? []) as AffiliateClickRow[];
  const conversionsRange = (conversionsRangeResult.data ?? []) as ConversionRow[];
  const offerClickMap = buildOfferClickMap(clicksRange, affiliateEvents);
  const adminOffers = ((offersResult.data ?? []) as Omit<AdminOfferRow, "click_count">[]).map((offer) => ({
    ...offer,
    click_count: offerClickMap.get(offer.id) ?? 0,
  }));
  const errors = [
    leadsResult.error,
    eventsResult.error,
    clicksResult.error,
    pageViewsResult.error,
    wizardEventsResult.error,
    diagnosticEventsResult.error,
    affiliateEventsResult.error,
    clicksRangeResult.error,
    conversionsRangeResult.error,
    offersResult.error,
  ]
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
  const diagnosticInsights = buildDiagnosticInsights(diagnosticEvents);
  const categoryPerformance = buildCategoryPerformance({
    leads,
    wizardEvents,
    diagnosticEvents,
    affiliateEvents,
    clicks: clicksRange,
  });
  const revenueProjection = buildRevenueProjection({
    offers: adminOffers,
    clicks: clicksRange,
    affiliateEvents,
    conversions: conversionsRange,
  });
  const actionItems = buildAdminActionItems({
    leads,
    categoryPerformance,
    revenueProjection,
    offers: adminOffers,
    conversions: conversionsRange,
    traffic,
  });

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

        <RevenueProjectionPanel projection={revenueProjection} />

        <AdminActionCenter items={actionItems} />

        <AdminOffersManager offers={adminOffers} />

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

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <AdminMetric label="Diagnostics IA" value={String(diagnosticInsights.count)} tone="cyan" />
          <AdminMetric label="IA Mistral" value={String(diagnosticInsights.mistralCount)} tone="emerald" />
          <AdminMetric label="Économies détectées" value={formatEuro(diagnosticInsights.totalSavings)} tone="blue" />
          <AdminMetric label="Moyenne / diagnostic" value={diagnosticInsights.averageSavings ? formatEuro(diagnosticInsights.averageSavings) : "—"} tone="purple" />
          <AdminMetric label="CTR offres" value={rate(affiliateClicks, unlocked)} tone="amber" />
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

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <CategoryPerformanceTable items={categoryPerformance} />
          <AiOpportunityPanel insights={diagnosticInsights} />
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

function RevenueProjectionPanel({ projection }: { projection: RevenueProjection }) {
  const bestOffer = projection.offerRows[0];

  return (
    <section className="mt-5 overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-blue-500/10 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Projection revenu</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Combien les clics peuvent rapporter.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Estimation basée sur les clics 30/90 jours, les commissions probables par catégorie et les conversions Awin futures. Les montants confirmés restent séparés.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
          Offre à pousser : <span className="font-bold text-white">{bestOffer ? bestOffer.provider : "—"}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminMetric label="Revenu estimé 30j" value={formatRevenueEuro(projection.estimatedRevenue30d)} tone="emerald" />
        <AdminMetric label="Projection / mois" value={formatRevenueEuro(projection.projectedMonthlyRevenue)} tone="cyan" />
        <AdminMetric label="Commission confirmée" value={formatRevenueEuro(projection.actualCommission30d)} tone="amber" />
        <AdminMetric label="Clics monétisables" value={String(projection.monetizableClicks30d)} tone="blue" />
        <AdminMetric label="Commission moyenne" value={formatRevenueEuro(projection.averageEstimatedCommission)} tone="purple" />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Top offres</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Priorité business automatique.</h3>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              Conv. estimée {formatPercentNumber(projection.blendedConversionRate)}
            </span>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="py-3 pr-4">Offre</th>
                  <th className="py-3 pr-4">Clics 30j</th>
                  <th className="py-3 pr-4">Commission</th>
                  <th className="py-3 pr-4">Conv.</th>
                  <th className="py-3 pr-4">€/mois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {projection.offerRows.slice(0, 8).map((offer) => (
                  <tr key={offer.offerId}>
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-white">{offer.provider}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatSlug(offer.category)} · {offer.active ? "actif" : "inactif"}{offer.sponsored ? " · sponsorisé" : ""}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{offer.clicks30d}</td>
                    <td className="py-3 pr-4 text-slate-300">{formatRevenueEuro(offer.estimatedCommission)}</td>
                    <td className="py-3 pr-4 text-cyan-300">{formatPercentNumber(offer.estimatedConversionRate)}</td>
                    <td className="py-3 pr-4 font-bold text-emerald-300">{formatRevenueEuro(offer.projectedMonthlyRevenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {projection.offerRows.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
                Importe des offres Awin pour activer la projection de revenu.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Catégories rentables</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Où concentrer le trafic.</h3>
          <div className="mt-5 space-y-3">
            {projection.categoryRows.slice(0, 6).map((category) => (
              <RevenueCategoryRow key={category.slug} category={category} max={projection.categoryRows[0]?.projectedMonthlyRevenue ?? 1} />
            ))}
            {projection.categoryRows.length === 0 && (
              <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
                Les catégories apparaîtront dès que les offres auront des clics ou une estimation.
              </p>
            )}
          </div>
          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-5 text-amber-100/90">
            Lecture saine : ce bloc estime le potentiel. Le vrai revenu viendra des validations Awin / annonceurs et doit ensuite être rapproché des conversions confirmées.
          </div>
        </div>
      </div>
    </section>
  );
}

function RevenueCategoryRow({ category, max }: { category: RevenueCategoryProjection; max: number }) {
  const width = Math.max(6, Math.round((category.projectedMonthlyRevenue / Math.max(max, 1)) * 100));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{formatSlug(category.slug)}</p>
          <p className="mt-1 text-xs text-slate-500">{category.offerCount} offre{category.offerCount > 1 ? "s" : ""} · {category.clicks30d} clics 30j</p>
        </div>
        <span className="font-bold text-emerald-300">{formatRevenueEuro(category.projectedMonthlyRevenue)}</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

function AdminActionCenter({ items }: { items: AdminActionItem[] }) {
  return (
    <section className="mt-5 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Action center</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Ce qu’il faut faire maintenant.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Comparia transforme les signaux en priorités : trafic, leads, clics affiliés, offres Awin et commissions.
          </p>
        </div>
        <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200">
          {items.length} action{items.length > 1 ? "s" : ""} priorisée{items.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {items.slice(0, 6).map((item) => (
          <AdminActionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function AdminActionCard({ item }: { item: AdminActionItem }) {
  const tones = {
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
    emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-300/20 bg-amber-400/10 text-amber-100",
    rose: "border-rose-300/20 bg-rose-400/10 text-rose-100",
    purple: "border-purple-300/20 bg-purple-400/10 text-purple-100",
  };
  const content = (
    <article className={`h-full rounded-[1.5rem] border p-5 transition hover:-translate-y-0.5 ${tones[item.tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.22em] opacity-80">{item.impact}</p>
        <span className="h-2.5 w-2.5 rounded-full bg-current opacity-70" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p>
      {item.actionLabel && <p className="mt-4 text-sm font-bold text-white">{item.actionLabel} →</p>}
    </article>
  );

  return item.href ? <Link href={item.href}>{content}</Link> : content;
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

function CategoryPerformanceTable({ items }: { items: CategoryPerformance[] }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Rentabilité tunnel</p>
          <h2 className="mt-3 text-2xl font-semibold">Comparateurs à pousser.</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-400">
          Classement 90 jours : vues, leads, diagnostics IA, clics affiliés et économies détectées.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="py-3 pr-4">Comparateur</th>
              <th className="py-3 pr-4">Vues</th>
              <th className="py-3 pr-4">Leads</th>
              <th className="py-3 pr-4">Diagnostics</th>
              <th className="py-3 pr-4">Clics</th>
              <th className="py-3 pr-4">Lead rate</th>
              <th className="py-3 pr-4">Clic rate</th>
              <th className="py-3 pr-4">Économies</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.slice(0, 10).map((item) => (
              <tr key={item.slug}>
                <td className="py-3 pr-4">
                  <Link href={`/comparateurs/${item.slug}`} className="font-semibold text-white transition hover:text-cyan-300">
                    {formatSlug(item.slug)}
                  </Link>
                </td>
                <td className="py-3 pr-4 text-slate-300">{item.views}</td>
                <td className="py-3 pr-4 text-slate-300">{item.leads}</td>
                <td className="py-3 pr-4 text-slate-300">{item.diagnostics}</td>
                <td className="py-3 pr-4 text-slate-300">{item.clicks}</td>
                <td className="py-3 pr-4 text-emerald-300">{item.leadRate}</td>
                <td className="py-3 pr-4 text-cyan-300">{item.clickRate}</td>
                <td className="py-3 pr-4 text-slate-300">{formatEuro(item.savings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
            Les performances par comparateur apparaîtront après les prochaines vues, leads et clics.
          </p>
        )}
      </div>
    </section>
  );
}

function AiOpportunityPanel({ insights }: { insights: DiagnosticInsights }) {
  return (
    <section className="rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Moteur IA</p>
      <h2 className="mt-3 text-2xl font-semibold">Ce que Comparia détecte.</h2>
      <div className="mt-6 space-y-3">
        <InsightLine label="Diagnostics sauvegardés" value={String(insights.count)} />
        <InsightLine label="Générés par Mistral" value={String(insights.mistralCount)} />
        <InsightLine label="Économies détectées" value={formatEuro(insights.totalSavings)} />
        <InsightLine label="Catégorie prioritaire" value={insights.topCategory ? formatSlug(insights.topCategory) : "—"} />
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
        Prochaine optimisation : relier ces diagnostics aux offres qui cliquent le mieux pour remonter automatiquement les partenaires les plus rentables.
      </div>
    </section>
  );
}

function InsightLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
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
              <span className="text-sm font-semibold text-white">{getClickOfferId(click) ?? getOfferId(click.meta)}</span>
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

function buildDiagnosticInsights(events: FunnelEventRow[]): DiagnosticInsights {
  const categoryStats = new Map<string, number>();
  let totalSavings = 0;
  let mistralCount = 0;

  for (const event of events) {
    totalSavings += getDiagnosticSavings(event.meta);
    const category = event.category_slug;
    if (category) categoryStats.set(category, (categoryStats.get(category) ?? 0) + 1);
    if (getAiProvider(event.meta) === "mistral") mistralCount += 1;
  }

  const topCategory =
    Array.from(categoryStats.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    events.find((event) => event.category_slug)?.category_slug ??
    null;

  return {
    count: events.length,
    mistralCount,
    totalSavings: Math.round(totalSavings),
    averageSavings: events.length > 0 ? Math.round(totalSavings / events.length) : 0,
    topCategory,
  };
}

function buildOfferClickMap(clicks: AffiliateClickRow[], affiliateEvents: FunnelEventRow[]) {
  const map = new Map<string, number>();

  for (const click of clicks) {
    const offerId = getClickOfferId(click);
    if (offerId) map.set(offerId, (map.get(offerId) ?? 0) + 1);
  }

  for (const event of affiliateEvents) {
    const offerId = getEventOfferId(event);
    if (offerId) map.set(offerId, (map.get(offerId) ?? 0) + 1);
  }

  return map;
}

function buildAdminActionItems({
  leads,
  categoryPerformance,
  revenueProjection,
  offers,
  conversions,
  traffic,
}: {
  leads: LeadRow[];
  categoryPerformance: CategoryPerformance[];
  revenueProjection: RevenueProjection;
  offers: AdminOfferRow[];
  conversions: ConversionRow[];
  traffic: TrafficAnalytics;
}): AdminActionItem[] {
  const actions: AdminActionItem[] = [];
  const hotLead = leads.find((lead) => (lead.intent_score ?? 0) >= 70);
  const leadWithoutClick = categoryPerformance.find((item) => item.leads > 0 && item.clicks === 0);
  const clickWithoutRevenue = revenueProjection.offerRows.find((offer) => offer.clicks30d >= 2 && offer.actualCommission30d === 0);
  const bestRevenueCategory = revenueProjection.categoryRows[0];
  const highTrafficNoLead = categoryPerformance.find((item) => item.views >= 8 && item.leads === 0);
  const inactiveOffers = offers.filter((offer) => offer.active === false);
  const unmatchedConversions = conversions.filter((conversion) => !conversion.offer_id).length;

  if (hotLead) {
    actions.push({
      id: "hot-lead",
      title: "Traiter le lead le plus chaud",
      body: `${hotLead.first_name || "Un contact"} a un score de ${hotLead.intent_score}/100 sur ${formatSlug(hotLead.category_slug)}. Réponds vite : les leads refroidissent très vite.`,
      impact: "Impact immédiat",
      tone: "emerald",
      href: `mailto:${hotLead.email}`,
      actionLabel: "Contacter maintenant",
    });
  }

  if (leadWithoutClick) {
    actions.push({
      id: "lead-no-click",
      title: "Des leads ne cliquent pas encore",
      body: `${formatSlug(leadWithoutClick.slug)} génère ${leadWithoutClick.leads} lead${leadWithoutClick.leads > 1 ? "s" : ""}, mais aucun clic affilié. Renforce les CTA et mets l’offre la plus claire en premier.`,
      impact: "Conversion",
      tone: "amber",
      href: `/comparateurs/${leadWithoutClick.slug}`,
      actionLabel: "Tester le tunnel",
    });
  }

  if (clickWithoutRevenue) {
    actions.push({
      id: "click-no-revenue",
      title: "Clics sans commission confirmée",
      body: `${clickWithoutRevenue.provider} reçoit ${clickWithoutRevenue.clicks30d} clics sur 30 jours sans commission confirmée. Vérifie le programme Awin, la page d’arrivée et le délai de validation.`,
      impact: "Revenu",
      tone: "rose",
      href: `/comparateurs/${clickWithoutRevenue.category}`,
      actionLabel: "Contrôler l’offre",
    });
  }

  if (bestRevenueCategory) {
    actions.push({
      id: "best-category",
      title: "Pousser la catégorie la plus rentable",
      body: `${formatSlug(bestRevenueCategory.slug)} projette ${formatRevenueEuro(bestRevenueCategory.projectedMonthlyRevenue)}/mois avec les signaux actuels. C’est une candidate prioritaire pour SEO, posts courts et partenariats.`,
      impact: "Croissance",
      tone: "cyan",
      href: `/comparateurs/${bestRevenueCategory.slug}`,
      actionLabel: "Voir la page",
    });
  }

  if (highTrafficNoLead) {
    actions.push({
      id: "traffic-no-lead",
      title: "Trafic sans capture",
      body: `${formatSlug(highTrafficNoLead.slug)} attire ${highTrafficNoLead.views} vues mais ne capture pas encore. Raccourcis le formulaire, ajoute une preuve sociale et remonte le gain estimé.`,
      impact: "UX",
      tone: "purple",
      href: `/comparateurs/${highTrafficNoLead.slug}`,
      actionLabel: "Optimiser la page",
    });
  }

  if (inactiveOffers.length > 0) {
    actions.push({
      id: "inactive-offers",
      title: "Offres inactives à arbitrer",
      body: `${inactiveOffers.length} offre${inactiveOffers.length > 1 ? "s" : ""} sont inactives. Supprime le bruit ou réactive celles qui ont un meilleur potentiel de commission.`,
      impact: "Qualité offre",
      tone: "amber",
      actionLabel: "Voir pilotage offres",
    });
  }

  if (unmatchedConversions > 0) {
    actions.push({
      id: "unmatched-conversions",
      title: "Conversions non rapprochées",
      body: `${unmatchedConversions} transaction${unmatchedConversions > 1 ? "s" : ""} Awin ne sont pas liées à une offre locale. Il faut enrichir les IDs annonceurs pour fiabiliser le reporting.`,
      impact: "Tracking",
      tone: "rose",
    });
  }

  if (revenueProjection.monetizableClicks30d === 0) {
    actions.push({
      id: "first-affiliate-clicks",
      title: "Créer les premiers clics affiliés",
      body: "Les offres sont en place, mais le compteur de clics monétisables est encore à zéro. Fais un test complet depuis une page comparateur, puis pousse la catégorie la plus simple à comprendre.",
      impact: "Démarrage",
      tone: "cyan",
      href: "/comparateurs",
      actionLabel: "Tester les comparateurs",
    });
  }

  if (traffic.thirtyDayVisitors === 0) {
    actions.push({
      id: "traffic-foundation",
      title: "Installer le socle acquisition",
      body: "Le trafic 30 jours est encore vide côté analytics interne. La priorité devient : indexation Google, contenus SEO par catégorie et posts courts avec promesse d’économie.",
      impact: "Acquisition",
      tone: "purple",
      href: "/sitemap.xml",
      actionLabel: "Vérifier sitemap",
    });
  }

  if (actions.length === 0) {
    actions.push({
      id: "healthy",
      title: "Système propre, prochaine marche : acquisition",
      body: "Le tunnel est sain. La suite la plus rentable est de produire du trafic qualifié sur 2 catégories fortes au lieu de disperser les efforts.",
      impact: "Focus",
      tone: "emerald",
      href: "/comparateurs",
      actionLabel: "Voir les catégories",
    });
  }

  return actions.slice(0, 6);
}

function buildRevenueProjection({
  offers,
  clicks,
  affiliateEvents,
  conversions,
}: {
  offers: AdminOfferRow[];
  clicks: AffiliateClickRow[];
  affiliateEvents: FunnelEventRow[];
  conversions: ConversionRow[];
}): RevenueProjection {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const conversionCommissionMap = new Map<string, number>();

  for (const conversion of conversions) {
    const date = new Date(conversion.converted_at ?? conversion.created_at).getTime();
    if (!conversion.offer_id || Number.isNaN(date) || date < thirtyDaysAgo || isRejectedConversion(conversion.status)) continue;

    const commission = getPositiveNumber(conversion.commission_value) || getPositiveNumber(conversion.conversion_value) || 0;
    conversionCommissionMap.set(conversion.offer_id, (conversionCommissionMap.get(conversion.offer_id) ?? 0) + commission);
  }

  const clickStats = buildRevenueClickStats({ clicks, affiliateEvents, now, thirtyDaysAgo });
  const categoryMap = new Map<string, RevenueCategoryProjection>();
  const activeOfferCountByCategory = offers.reduce<Map<string, number>>((map, offer) => {
    if (offer.active !== false) map.set(offer.category, (map.get(offer.category) ?? 0) + 1);
    return map;
  }, new Map());

  const offerRows = offers
    .map((offer) => {
      const stats = clickStats.byOffer.get(offer.id) ?? { clicks30d: 0, clicks90d: 0 };
      const categoryFallback = clickStats.byCategory.get(offer.category) ?? { clicks30d: 0, clicks90d: 0 };
      const activeOfferCount = Math.max(1, activeOfferCountByCategory.get(offer.category) ?? 1);
      const clicks30d = stats.clicks30d || (offer.active !== false ? Math.floor(categoryFallback.clicks30d / activeOfferCount) : 0);
      const clicks90d = stats.clicks90d || (offer.active !== false ? Math.floor(categoryFallback.clicks90d / activeOfferCount) : 0);
      const projectedMonthlyClicks = Math.max(clicks30d, Math.round((clicks90d / 90) * 30));
      const estimatedCommission = getEstimatedCommission(offer);
      const estimatedConversionRate = getEstimatedConversionRate(offer.category);
      const estimatedRevenue30d = clicks30d * estimatedCommission * estimatedConversionRate;
      const projectedMonthlyRevenue = projectedMonthlyClicks * estimatedCommission * estimatedConversionRate;
      const actualCommission30d = conversionCommissionMap.get(offer.id) ?? 0;

      return {
        offerId: offer.id,
        title: offer.title,
        provider: offer.provider,
        category: offer.category,
        active: offer.active !== false,
        sponsored: Boolean(offer.sponsored),
        clicks30d,
        clicks90d,
        projectedMonthlyClicks,
        estimatedCommission,
        estimatedConversionRate,
        estimatedRevenue30d,
        projectedMonthlyRevenue,
        actualCommission30d,
      } satisfies RevenueOfferProjection;
    })
    .sort((a, b) => {
      const activeDelta = Number(b.active) - Number(a.active);
      if (activeDelta !== 0) return activeDelta;
      return b.projectedMonthlyRevenue - a.projectedMonthlyRevenue || b.clicks30d - a.clicks30d || b.estimatedCommission - a.estimatedCommission;
    });

  for (const offer of offerRows) {
    const current = categoryMap.get(offer.category) ?? {
      slug: offer.category,
      offerCount: 0,
      clicks30d: 0,
      projectedMonthlyClicks: 0,
      estimatedRevenue30d: 0,
      projectedMonthlyRevenue: 0,
      actualCommission30d: 0,
    };

    current.offerCount += 1;
    current.clicks30d += offer.clicks30d;
    current.projectedMonthlyClicks += offer.projectedMonthlyClicks;
    current.estimatedRevenue30d += offer.estimatedRevenue30d;
    current.projectedMonthlyRevenue += offer.projectedMonthlyRevenue;
    current.actualCommission30d += offer.actualCommission30d;
    categoryMap.set(offer.category, current);
  }

  const categoryRows = Array.from(categoryMap.values()).sort(
    (a, b) => b.projectedMonthlyRevenue - a.projectedMonthlyRevenue || b.clicks30d - a.clicks30d,
  );
  const projectedMonthlyClicks = offerRows.reduce((total, offer) => total + offer.projectedMonthlyClicks, 0);
  const weightedConversion = offerRows.reduce((total, offer) => total + offer.estimatedConversionRate * Math.max(offer.projectedMonthlyClicks, 1), 0);
  const weightedBase = offerRows.reduce((total, offer) => total + Math.max(offer.projectedMonthlyClicks, 1), 0);

  return {
    estimatedRevenue30d: roundMoney(offerRows.reduce((total, offer) => total + offer.estimatedRevenue30d, 0)),
    projectedMonthlyRevenue: roundMoney(offerRows.reduce((total, offer) => total + offer.projectedMonthlyRevenue, 0)),
    actualCommission30d: roundMoney(offerRows.reduce((total, offer) => total + offer.actualCommission30d, 0)),
    monetizableClicks30d: offerRows.reduce((total, offer) => total + offer.clicks30d, 0),
    projectedMonthlyClicks,
    averageEstimatedCommission: roundMoney(offerRows.length > 0 ? offerRows.reduce((total, offer) => total + offer.estimatedCommission, 0) / offerRows.length : 0),
    blendedConversionRate: weightedBase > 0 ? weightedConversion / weightedBase : 0,
    offerRows,
    categoryRows: categoryRows.map((category) => ({
      ...category,
      estimatedRevenue30d: roundMoney(category.estimatedRevenue30d),
      projectedMonthlyRevenue: roundMoney(category.projectedMonthlyRevenue),
      actualCommission30d: roundMoney(category.actualCommission30d),
    })),
  };
}

function buildRevenueClickStats({
  clicks,
  affiliateEvents,
  now,
  thirtyDaysAgo,
}: {
  clicks: AffiliateClickRow[];
  affiliateEvents: FunnelEventRow[];
  now: number;
  thirtyDaysAgo: number;
}) {
  const byOffer = new Map<string, { clicks30d: number; clicks90d: number }>();
  const byCategory = new Map<string, { clicks30d: number; clicks90d: number }>();

  if (clicks.length > 0) {
    for (const click of clicks) {
      const createdAt = new Date(click.clicked_at).getTime();
      if (Number.isNaN(createdAt) || createdAt > now) continue;
      registerRevenueClick({
        byOffer,
        byCategory,
        offerId: getClickOfferId(click),
        category: getClickCategory(click),
        createdAt,
        thirtyDaysAgo,
      });
    }
  } else {
    for (const event of affiliateEvents) {
      const createdAt = new Date(event.created_at).getTime();
      if (Number.isNaN(createdAt) || createdAt > now) continue;
      registerRevenueClick({
        byOffer,
        byCategory,
        offerId: getEventOfferId(event),
        category: event.category_slug ?? getMetaString(event.meta ?? {}, "category_slug") ?? getMetaString(event.meta ?? {}, "category"),
        createdAt,
        thirtyDaysAgo,
      });
    }
  }

  return { byOffer, byCategory };
}

function registerRevenueClick({
  byOffer,
  byCategory,
  offerId,
  category,
  createdAt,
  thirtyDaysAgo,
}: {
  byOffer: Map<string, { clicks30d: number; clicks90d: number }>;
  byCategory: Map<string, { clicks30d: number; clicks90d: number }>;
  offerId: string | null;
  category: string | null;
  createdAt: number;
  thirtyDaysAgo: number;
}) {
  const isThirtyDays = createdAt >= thirtyDaysAgo;

  if (offerId) {
    const stats = byOffer.get(offerId) ?? { clicks30d: 0, clicks90d: 0 };
    stats.clicks90d += 1;
    if (isThirtyDays) stats.clicks30d += 1;
    byOffer.set(offerId, stats);
  }

  if (category) {
    const stats = byCategory.get(category) ?? { clicks30d: 0, clicks90d: 0 };
    stats.clicks90d += 1;
    if (isThirtyDays) stats.clicks30d += 1;
    byCategory.set(category, stats);
  }
}

function getEstimatedCommission(offer: AdminOfferRow) {
  const metadata = offer.metadata ?? {};
  const explicit =
    getRecordNumber(metadata, "estimatedCommission") ||
    getRecordNumber(metadata, "estimated_commission") ||
    getRecordNumber(metadata, "commissionAmount") ||
    getRecordNumber(metadata, "awinCommissionValue");

  if (explicit > 0) return explicit;

  const parsed = parseCommissionRange(getRecordString(metadata, "awinCommissionRange"));
  if (parsed > 0) return parsed;

  return DEFAULT_CATEGORY_COMMISSION[offer.category] ?? DEFAULT_CATEGORY_COMMISSION.default;
}

function parseCommissionRange(value: string | null) {
  if (!value) return 0;
  const normalized = value.replaceAll(",", ".");
  if (normalized.includes("%")) return 0;
  const numbers = [...normalized.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1])).filter((number) => Number.isFinite(number) && number > 0);
  if (numbers.length === 0) return 0;
  return numbers.reduce((total, number) => total + number, 0) / numbers.length;
}

function getEstimatedConversionRate(category: string) {
  return DEFAULT_CATEGORY_CONVERSION_RATE[category] ?? DEFAULT_CATEGORY_CONVERSION_RATE.default;
}

function getClickOfferId(click: AffiliateClickRow) {
  return click.offer_id ?? getMetaString(click.meta ?? {}, "offer_slot_id") ?? getMetaString(click.meta ?? {}, "offerId");
}

function getEventOfferId(event: FunnelEventRow) {
  return getMetaString(event.meta ?? {}, "offerId") ?? getMetaString(event.meta ?? {}, "offer_slot_id");
}

function getClickCategory(click: AffiliateClickRow) {
  return getMetaString(click.meta ?? {}, "category_slug") ?? getMetaString(click.meta ?? {}, "category");
}

function isRejectedConversion(status: string | null) {
  if (!status) return false;
  return ["rejected", "declined", "cancelled", "canceled", "refused"].includes(status.toLowerCase());
}

function getPositiveNumber(value: number | null) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
}

function roundMoney(value: number) {
  return Number.isFinite(value) ? Math.round(value * 100) / 100 : 0;
}

function buildCategoryPerformance({
  leads,
  wizardEvents,
  diagnosticEvents,
  affiliateEvents,
  clicks,
}: {
  leads: LeadRow[];
  wizardEvents: FunnelEventRow[];
  diagnosticEvents: FunnelEventRow[];
  affiliateEvents: FunnelEventRow[];
  clicks: AffiliateClickRow[];
}): CategoryPerformance[] {
  const map = new Map<string, Omit<CategoryPerformance, "leadRate" | "clickRate">>();

  const ensure = (slug: string) => {
    const current = map.get(slug);
    if (current) return current;

    const next = { slug, views: 0, leads: 0, diagnostics: 0, clicks: 0, savings: 0 };
    map.set(slug, next);
    return next;
  };

  for (const event of wizardEvents) {
    if (!event.category_slug) continue;
    ensure(event.category_slug).views += 1;
  }

  for (const lead of leads) {
    ensure(lead.category_slug).leads += 1;
  }

  for (const event of diagnosticEvents) {
    const slug = event.category_slug ?? getDiagnosticTopSlug(event.meta);
    if (!slug) continue;
    const item = ensure(slug);
    item.diagnostics += 1;
    item.savings += getDiagnosticSavings(event.meta);
  }

  if (clicks.length > 0) {
    for (const click of clicks) {
      const slug = getMetaString(click.meta ?? {}, "category_slug") ?? getMetaString(click.meta ?? {}, "category");
      if (!slug) continue;
      ensure(slug).clicks += 1;
    }
  } else {
    for (const event of affiliateEvents) {
      const slug = event.category_slug;
      if (!slug) continue;
      ensure(slug).clicks += 1;
    }
  }

  return Array.from(map.values())
    .map((item) => ({
      ...item,
      savings: Math.round(item.savings),
      leadRate: rate(item.leads, item.views),
      clickRate: rate(item.clicks, Math.max(item.leads, item.diagnostics)),
    }))
    .sort((a, b) => b.clicks - a.clicks || b.leads - a.leads || b.savings - a.savings || b.views - a.views);
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

function formatEuro(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0€";
  if (value >= 1000) return `${Math.round(value).toLocaleString("fr-FR")}€`;
  return `${Math.round(value)}€`;
}

function formatRevenueEuro(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0€";
  if (value < 10) return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}€`;
  return `${Math.round(value).toLocaleString("fr-FR")}€`;
}

function formatPercentNumber(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0%";
  return `${(value * 100).toLocaleString("fr-FR", { maximumFractionDigits: 1 })}%`;
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

function getDiagnosticSavings(meta: Record<string, unknown> | null) {
  const summary = getMetaRecord(meta, "summary");
  const ai = getMetaRecord(meta, "ai");
  const summarySavings = getRecordNumber(summary, "totalSavings");
  const aiSavings = getRecordNumber(ai, "estimatedSavings");

  return Math.max(summarySavings, aiSavings, 0);
}

function getAiProvider(meta: Record<string, unknown> | null) {
  const ai = getMetaRecord(meta, "ai");
  return getRecordString(ai, "generatedBy");
}

function getDiagnosticTopSlug(meta: Record<string, unknown> | null) {
  const recommendations = meta?.recommendations;
  if (!Array.isArray(recommendations)) return null;
  const first = recommendations[0];
  if (!first || typeof first !== "object") return null;
  return getRecordString(first as Record<string, unknown>, "slug");
}

function getMetaRecord(meta: Record<string, unknown> | null, key: string) {
  const value = meta?.[key];
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function getRecordNumber(record: Record<string, unknown> | null, key: string) {
  const value = record?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function getRecordString(record: Record<string, unknown> | null, key: string) {
  const value = record?.[key];
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
