import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import CompariaIcon, { getCategoryIcon } from "@/components/CompariaIcon";
import PremiumVisual from "@/components/PremiumVisual";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { buildGuideJsonLd, getGuide, getGuideCategory, getGuideUrl, seoGuides } from "@/lib/seo/guides";
import { getCategoryVisual } from "@/lib/visuals";

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    return {
      title: "Guide introuvable | Comparia",
      robots: { index: false, follow: false },
    };
  }

  const visual = getCategoryVisual(guide.categorySlug);
  const ogImage = visual.src.endsWith(".svg") ? "/comparia-hero.jpg" : visual.src;

  return {
    title: `${guide.title} | Comparia`,
    description: guide.description,
    alternates: {
      canonical: getGuideUrl(guide.slug),
    },
    openGraph: {
      title: `${guide.title} | Comparia`,
      description: guide.description,
      url: getGuideUrl(guide.slug),
      type: "article",
      locale: "fr_FR",
      images: [{ url: ogImage, width: 1200, height: 630, alt: visual.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Comparia`,
      description: guide.description,
      images: [ogImage],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  const category = getGuideCategory(guide);
  const visual = getCategoryVisual(guide.categorySlug);
  const jsonLd = JSON.stringify(buildGuideJsonLd(guide)).replace(/</g, "\\u003c");

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 pb-24 text-white sm:px-8 sm:pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="mx-auto max-w-6xl">
        <SiteNav />

        <section className="mt-7 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 sm:p-7">
            <Link href="/guides" className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
              ← Tous les guides
            </Link>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cyan-300">{guide.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{guide.intro}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Potentiel</p>
                <p className="mt-2 text-xl font-bold text-white">{guide.heroMetric}</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Tunnel</p>
                <p className="mt-2 text-xl font-bold text-white">2 min</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Objectif</p>
                <p className="mt-2 text-xl font-bold text-white capitalize">{guide.intent}</p>
              </div>
            </div>
          </article>

          <div className="space-y-4">
            <PremiumVisual
              src={visual.src}
              alt={visual.alt}
              eyebrow={guide.eyebrow}
              title={category.title}
              metric={guide.heroMetric}
              tone={visual.tone}
              fit={visual.fit}
              icon={getCategoryIcon(guide.categorySlug)}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <Link
              href={`/comparateurs/${category.slug}`}
              className="block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 text-center font-bold text-white shadow-2xl shadow-cyan-950/40 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25"
            >
              Comparer maintenant
            </Link>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Signaux à surveiller</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.signals.map((signal) => (
                <span key={signal} className="rounded-full border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm font-semibold text-amber-100">
                  {signal}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {guide.painPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
                    <CompariaIcon name="search" className="h-4 w-4" />
                  </span>
                  <p className="text-sm leading-6 text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Méthode Comparia</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {guide.steps.map((step, index) => (
                <article key={step.title} className="rounded-[1.35rem] border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">
                    {index + 1}
                  </div>
                  <h2 className="mt-4 font-bold text-white">{step.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Questions fréquentes</p>
            <div className="mt-5 space-y-3">
              {guide.faq.map((item) => (
                <article key={item.question} className="rounded-[1.35rem] border border-white/10 bg-slate-950/50 p-4">
                  <h2 className="font-bold text-white">{item.question}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <AffiliateDisclosure />
        </section>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-40 sm:hidden">
        <Link
          href={`/comparateurs/${category.slug}`}
          className="block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 text-center font-bold text-white shadow-2xl shadow-cyan-950/60"
        >
          Lancer le comparateur
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
