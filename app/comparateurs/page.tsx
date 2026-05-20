import Link from "next/link";
import Image from "next/image";
import { categories, categoryGroups } from "@/lib/categories";
import SiteNav from "@/components/SiteNav";
import CompariaIcon, { getCategoryIcon } from "@/components/CompariaIcon";
import SiteFooter from "@/components/SiteFooter";

export default function ComparateursPage() {
  const groupImages = {
    Maison: "/category-maison.jpg",
    Assurances: "/category-assurances.jpg",
    Frontaliers: "/category-frontaliers.jpg",
    Finances: "/comparia-hero.jpg",
  } as const;

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

        <div className="mt-8 space-y-8">
          {categoryGroups.map((group) => (
            <section key={group} id={group.toLowerCase()}>
              <div className="mb-4 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] md:grid md:grid-cols-[0.34fr_0.66fr]">
                <div className="relative aspect-video bg-slate-950/70 md:aspect-auto md:min-h-44">
                  <Image
                    src={groupImages[group]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 34vw, 100vw"
                    className="object-contain p-2"
                  />
                </div>
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
                  .map((category) => (
                    <article key={category.slug} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                            <CompariaIcon name={getCategoryIcon(category.slug)} />
                          </div>
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
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
