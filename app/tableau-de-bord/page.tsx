import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import MetricCard from "@/components/MetricCard";
import SiteFooter from "@/components/SiteFooter";

const alerts = [
  {
    title: "Hausse détectée sur ta facture énergie",
    detail: "Ton contrat semble moins compétitif qu’il y a 3 mois.",
    action: "Comparer maintenant",
  },
  {
    title: "2 abonnements à revoir",
    detail: "Tu n’as presque pas utilisé deux services sur les 30 derniers jours.",
    action: "Analyser mes abonnements",
  },
  {
    title: "Fenêtre de change favorable",
    detail: "Le spread estimé est meilleur que ta moyenne récente.",
    action: "Voir le change",
  },
];

const upcoming = [
  "Renouvellement assurance auto dans 18 jours",
  "Facture mobile prévue vendredi",
  "Nouvelle offre box internet disponible",
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteNav />

        <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Tableau de bord</p>
            <h1 className="mt-4 text-4xl font-semibold">Ton argent mérite une veille continue.</h1>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Économies détectées" value="1 284€/an" />
              <MetricCard label="Fuite ce mois-ci" value="107€" />
              <MetricCard label="Score Comparia" value="72/100" />
            </div>
          </div>

          <aside className="rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Action prioritaire</p>
            <h2 className="mt-4 text-2xl font-semibold">Comparer ton assurance auto</h2>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              C’est actuellement le levier qui peut réduire le plus vite tes dépenses contraintes.
            </p>
            <Link href="/comparateurs/assurance-auto" className="mt-5 block w-full rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-950">
              Activer cette économie
            </Link>
          </aside>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Flux d’opportunités</p>
            <div className="mt-5 space-y-3">
              {alerts.map((alert) => (
                <article key={alert.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <h2 className="font-semibold">{alert.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{alert.detail}</p>
                  <Link href="/comparateurs" className="mt-4 inline-block text-sm font-semibold text-cyan-300">
                    {alert.action} →
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">À venir</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              {upcoming.map((item) => (
                <li key={item} className="rounded-2xl bg-white/[0.04] p-4">
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
