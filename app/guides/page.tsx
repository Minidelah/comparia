import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import BrandIcon, { getCategoryIcon } from "@/components/BrandIcon";
import PremiumVisual from "@/components/PremiumVisual";
import { getGuideCategory, seoGuides } from "@/lib/seo/guides";
import { getCategoryVisual } from "@/lib/visuals";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides économies factures | Comparia",
  description:
    "Guides pratiques pour réduire assurances, énergie, mobile, abonnements et dépenses frontalières avec Comparia.",
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesPage() {
  const featured = seoGuides[0];
  const featuredCategory = getGuideCategory(featured);
  const featuredVisual = getCategoryVisual(featured.categorySlug);

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteNav />

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Guides économies</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Les décisions simples qui font baisser tes factures.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Des guides courts, orientés action, pour comprendre quoi comparer avant de cliquer sur une offre. Chaque guide renvoie vers le bon tunnel Comparia.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Assurances", "Énergie", "Mobile", "Frontaliers", "Abonnements"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <PremiumVisual
            src={featuredVisual.src}
            alt={featuredVisual.alt}
            eyebrow={featured.eyebrow}
            title={featuredCategory.title}
            metric={featured.heroMetric}
            tone={featuredVisual.tone}
            fit={featuredVisual.fit}
            icon={getCategoryIcon(featured.categorySlug)}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </section>

        <section className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seoGuides.map((guide) => {
            const category = getGuideCategory(guide);
            const visual = getCategoryVisual(guide.categorySlug);

            return (
              <article key={guide.slug} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] transition hover:-translate-y-1 hover:border-cyan-300/25">
                <div className="relative p-4">
                  <PremiumVisual
                    src={visual.src}
                    alt={visual.alt}
                    eyebrow={guide.eyebrow}
                    title={category.title}
                    metric={guide.heroMetric}
                    tone={visual.tone}
                    fit={visual.fit}
                    icon={getCategoryIcon(guide.categorySlug)}
                    sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                    className="rounded-[1.35rem]"
                  />
                </div>
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    <BrandIcon name={getCategoryIcon(guide.categorySlug)} className="h-4 w-4" />
                    {guide.intent}
                  </div>
                  <h2 className="mt-3 text-xl font-bold tracking-tight text-white">{guide.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{guide.description}</p>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    Lire le guide
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
