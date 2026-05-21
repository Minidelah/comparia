import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { categories } from "@/lib/categories";
import { getOfferSlotsForCategory } from "@/lib/offers";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import ComparatorWizard from "@/components/ComparatorWizard";
import GatedOffers from "@/components/GatedOffers";
import CompariaIcon, { getCategoryIcon } from "@/components/CompariaIcon";
import SiteFooter from "@/components/SiteFooter";
import PremiumVisual from "@/components/PremiumVisual";
import { getCategoryVisual } from "@/lib/visuals";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function ComparatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const offers = await getOfferSlotsForCategory(category.slug);
  const visual = getCategoryVisual(category.slug);

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-5 pb-24 text-white sm:px-8 sm:pb-6">
      <div className="mx-auto max-w-6xl">
        <SiteNav />

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-7">
            <PremiumVisual
              src={visual.src}
              alt={visual.alt}
              eyebrow={visual.eyebrow}
              title={visual.title}
              metric={visual.metric ?? category.saving}
              tone={visual.tone}
              fit={visual.fit}
              icon={getCategoryIcon(category.slug)}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="rounded-[1.5rem]"
            />
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-cyan-300">{category.group}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{category.title}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">{category.headline}</p>
            <div className="mt-5 inline-flex rounded-full bg-emerald-400/10 px-4 py-2 font-semibold text-emerald-300">
              {category.status === "active" ? category.saving : "Ouverture prochaine"}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Gratuit", "Sans engagement", "Réponse rapide"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <ComparatorWizard category={category} />
        </section>

        {category.status === "active" && (
          <>
            <section className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                {
                  title: "1. Réponds",
                  description: "Quelques réponses simples sur ton usage, pas un dossier administratif complet.",
                  icon: "search" as const,
                },
                {
                  title: "2. Compare",
                  description: "On regarde le besoin réel, le prix, les garanties utiles et l’intérêt économique global.",
                  icon: "sparkles" as const,
                },
                {
                  title: "3. Active",
                  description: "Tu gardes la décision finale : Comparia éclaire le choix, elle ne choisit pas à ta place.",
                  icon: "unlock" as const,
                },
              ].map(({ title, description, icon }) => (
                <article key={title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                    <CompariaIcon name={icon} />
                  </div>
                  <h2 className="font-bold">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                </article>
              ))}
            </section>

            <section className="mt-5 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
              <PremiumVisual
                src={visual.src}
                alt={visual.alt}
                eyebrow="Identité visuelle"
                title={visual.title}
                metric={category.saving}
                tone={visual.tone}
                fit={visual.fit}
                icon={getCategoryIcon(category.slug)}
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Pourquoi cette page est claire</p>
                <h2 className="mt-3 text-2xl font-semibold">Le visuel sert la conversion, pas la décoration.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{visual.body}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {category.flow.slice(0, 3).map((step) => (
                    <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{step.helper}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <GatedOffers categorySlug={category.slug} categoryTitle={category.title} categorySaving={category.saving} offers={offers} />

            <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Transparence avant activation</p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                  <li>• Une économie chiffrée avant le clic.</li>
                  <li>• Une recommandation hiérarchisée plutôt qu’une liste brute.</li>
                  <li>• Une distinction claire entre meilleur choix, cashback et sponsorisation.</li>
                </ul>
              </div>
              <AffiliateDisclosure />
            </section>
          </>
        )}
      </div>
      {category.status === "active" && (
        <div className="fixed inset-x-4 bottom-4 z-40 sm:hidden">
          <Link
            href="#offres"
            className="block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 text-center font-bold text-white shadow-2xl shadow-cyan-950/60"
          >
            Voir les offres
          </Link>
        </div>
      )}
      <SiteFooter />
    </main>
  );
}
