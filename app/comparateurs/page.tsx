import Link from "next/link";
import Image from "next/image";
import { categories, categoryGroups } from "@/lib/categories";
import SiteNav from "@/components/SiteNav";
import BrandIcon, { getCategoryIcon } from "@/components/BrandIcon";
import SiteFooter from "@/components/SiteFooter";
import PremiumVisual from "@/components/PremiumVisual";
import { getCategoryVisual, groupVisuals } from "@/lib/visuals";
import { priorityComparators } from "@/lib/seo/priority-comparators";

export default function ComparateursPage() {
  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SiteNav />

        <section className="mt-7 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Comparateurs Comparia</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tous les grands contrats qui pèsent sur ton budget, réunis au même endroit.
          </h1>
          <p className="mt-5 text-slate-300">
            Comparia n’a pas vocation à devenir un catalogue froid. Chaque comparateur s’inscrit dans un
            diagnostic plus large pour t’aider à savoir quoi optimiser en premier.
          </p>
        </section>

        <nav className="mt-6 flex flex-wrap gap-2">
          {categoryGroups.map((group) => (
            <a
              key={group}
              href={`#${group.toLowerCase()}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
            >
              {group}
            </a>
          ))}
        </nav>

        <section className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_36%),rgba(255,255,255,0.045)] p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Pages prioritaires</p>
              <h2 className="mt-3 text-2xl font-semibold">Les recherches les plus rentables à couvrir.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Cinq entrées SEO claires pour capter les intentions box, mobile, énergie, assurance et banque.
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {priorityComparators.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-[1.35rem] border border-white/10 bg-slate-950/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-400/10"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">#{index + 1}</span>
                <h3 className="mt-3 text-base font-black text-white">{link.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{link.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Ouvrir
                  <BrandIcon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 space-y-8">
          {categoryGroups.map((group) => (
            <section key={group} id={group.toLowerCase()}>
              <div className="mb-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] md:grid md:grid-cols-[0.34fr_0.66fr]">
                <PremiumVisual
                  src={groupVisuals[group].src}
                  alt={groupVisuals[group].alt}
                  eyebrow={groupVisuals[group].eyebrow}
                  title={groupVisuals[group].title}
                  metric={groupVisuals[group].metric}
                  tone={groupVisuals[group].tone}
                  fit={groupVisuals[group].fit}
                  icon={getCategoryIcon(categories.find((category) => category.group === group)?.slug ?? "banque")}
                  sizes="(min-width: 768px) 34vw, 100vw"
                  className="rounded-none border-0 shadow-none md:min-h-44"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-semibold">{group}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    {group === "Maison" && "Les contrats qui reviennent chaque mois et qu’on peut optimiser vite."}
                    {group === "Assurances" && "Les protections où comparer peut changer fortement le prix annuel."}
                    {group === "Frontaliers" && "Les besoins spécifiques aux revenus suisses et à la vie France–Suisse."}
                    {group === "Finances" && "Les comparateurs qui touchent directement au coût de l’argent."}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categories
                  .filter((category) => category.group === group)
                  .map((category) => {
                    const visual = getCategoryVisual(category.slug);

                    return (
                    <article key={category.slug} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                      <div className="relative aspect-[16/9] bg-slate-950/70">
                        <Image
                          src={visual.src}
                          alt={visual.alt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-contain p-2"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950/80 text-cyan-300 ring-1 ring-inset ring-cyan-300/20 backdrop-blur">
                          <BrandIcon name={getCategoryIcon(category.slug)} className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{category.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            category.status === "active"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {category.status === "active" ? category.saving : "Bientôt"}
                        </span>
                      </div>
                      <Link
                        href={`/comparateurs/${category.slug}`}
                        className={`mt-5 block w-full rounded-2xl px-4 py-3 text-center font-semibold transition ${
                          category.status === "active"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                            : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                        }`}
                      >
                        {category.status === "active" ? "Comparer maintenant" : "Voir l’aperçu"}
                      </Link>
                      </div>
                    </article>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
