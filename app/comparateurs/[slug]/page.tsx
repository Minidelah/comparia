import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { categories } from "@/lib/categories";
import { getOfferSlotsForCategory } from "@/lib/offers";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import ComparatorWizard from "@/components/ComparatorWizard";
import GatedOffers from "@/components/GatedOffers";
import BrandIcon, { getCategoryIcon, type IconName } from "@/components/BrandIcon";
import SiteFooter from "@/components/SiteFooter";
import PremiumVisual from "@/components/PremiumVisual";
import { getCategoryVisual } from "@/lib/visuals";
import { buildComparatorJsonLd, getComparatorSeo, getComparatorUrl } from "@/lib/seo/comparator-seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

type ComparatorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ComparatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Comparateur introuvable | CompareTesFactures",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seo = getComparatorSeo(category);
  const visual = getCategoryVisual(category.slug);
  const ogImage = visual.src.endsWith(".svg") ? "/comparetesfactures-hero.jpg" : visual.src;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: getComparatorUrl(category.slug),
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: getComparatorUrl(category.slug),
      type: "website",
      locale: "fr_FR",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: visual.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    robots: {
      index: category.status === "active",
      follow: true,
    },
  };
}

export default async function ComparatorDetailPage({
  params,
}: ComparatorPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const offers = await getOfferSlotsForCategory(category.slug);
  const visual = getCategoryVisual(category.slug);
  const seo = getComparatorSeo(category);
  const jsonLd = JSON.stringify(buildComparatorJsonLd(category, seo)).replace(/</g, "\\u003c");
  const featuredUniverses = getFeaturedUniverses(category.slug);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060812] px-4 py-4 pb-24 text-white sm:px-8 sm:pb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.14),transparent_26%),radial-gradient(circle_at_88%_14%,rgba(16,185,129,0.10),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_24%)]" />
      <div className="mx-auto max-w-7xl">
        <SiteNav />

        <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:min-h-[650px]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.15),transparent_24%)]" />
            <div className="relative grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
              <div className="order-2 xl:order-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100">
                  <BrandIcon name={getCategoryIcon(category.slug)} className="h-4 w-4" />
                  Comparateur {category.group.toLocaleLowerCase("fr-FR")}
                </div>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {category.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{category.headline}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#devis"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/20"
                  >
                    <BrandIcon name="sparkles" className="h-4 w-4" />
                    Lancer ma comparaison
                  </a>
                  <a
                    href="#offres"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.09]"
                  >
                    <BrandIcon name="unlock" className="h-4 w-4" />
                    Voir les offres
                  </a>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Économie estimée", value: category.status === "active" ? category.saving : "bientôt", icon: "coins" as const },
                    { label: "Temps moyen", value: "2 min", icon: "clock" as const },
                    { label: "Engagement", value: "0€", icon: "shield" as const },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                      <BrandIcon name={item.icon} className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                      <p className="mt-1 text-lg font-black text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 50vw, 100vw"
                className="order-1 rounded-[1.5rem] xl:order-2"
              />
            </div>
            <TrustStrip />
          </div>

          <ComparatorWizard category={category} />
        </section>

        <FeaturedUniverses universes={featuredUniverses} />

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
                  description: "Tu gardes la décision finale : CompareTesFactures éclaire le choix, sans choisir à ta place.",
                  icon: "unlock" as const,
                },
              ].map(({ title, description, icon }) => (
                <article key={title} className="group rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.065]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                    <BrandIcon name={icon} />
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

            <section className="mt-5 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),rgba(255,255,255,0.045)] p-5 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Guide comparateur</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Pourquoi comparer {category.title.toLocaleLowerCase("fr-FR")} avec CompareTesFactures ?
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{seo.intro}</p>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-white">Ce que CompareTesFactures analyse</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {seo.analysisPoints.map((point) => (
                        <span
                          key={point}
                          className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                  <p className="text-sm font-semibold text-white">Pourquoi ça convertit mieux</p>
                  <div className="mt-4 space-y-3">
                    {seo.benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-300/20">
                          <BrandIcon name="sparkles" className="h-3.5 w-3.5" />
                        </span>
                        <p className="text-sm leading-6 text-slate-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-3">
                {seo.faqs.map((faq) => (
                  <article key={faq.question} className="rounded-[1.35rem] border border-white/10 bg-slate-950/45 p-4">
                    <h3 className="text-sm font-bold text-white">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{faq.answer}</p>
                  </article>
                ))}
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

type FeaturedUniverse = {
  title: string;
  href: string;
  icon: IconName;
  label: string;
  metric: string;
};

function getFeaturedUniverses(currentSlug: string): FeaturedUniverse[] {
  const slugs = ["box-internet", "forfait-mobile", "electricite", "assurance-auto", "banque"];
  return slugs.map((slug) => {
    const item = categories.find((category) => category.slug === slug);
    return {
      title: item?.title ?? slug,
      href: `/comparateurs/${slug}`,
      icon: getCategoryIcon(slug),
      label: slug === currentSlug ? "En cours" : item?.group ?? "Comparateur",
      metric: item?.saving ?? "Comparer",
    };
  });
}

function FeaturedUniverses({ universes }: { universes: FeaturedUniverse[] }) {
  return (
    <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {universes.map((universe) => (
        <Link
          key={universe.href}
          href={universe.href}
          className="group rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950/70 text-cyan-200 ring-1 ring-inset ring-white/10">
              <BrandIcon name={universe.icon} className="h-5 w-5" />
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {universe.label}
            </span>
          </div>
          <h2 className="mt-4 text-base font-black text-white">{universe.title}</h2>
          <p className="mt-2 text-sm font-semibold text-emerald-300">{universe.metric}</p>
        </Link>
      ))}
    </section>
  );
}

function TrustStrip() {
  const items = [
    { label: "Classement transparent", icon: "check-circle" as const },
    { label: "Logos partenaires lisibles", icon: "globe" as const },
    { label: "Tunnel court, mobile first", icon: "phone" as const },
  ];

  return (
    <div className="relative mt-6 grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-sm font-semibold text-slate-300">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
            <BrandIcon name={item.icon} className="h-4 w-4" />
          </span>
          {item.label}
        </div>
      ))}
    </div>
  );
}
