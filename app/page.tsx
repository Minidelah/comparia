import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/categories";
import SiteNav from "@/components/SiteNav";

import BrandIcon, { getCategoryIcon } from "@/components/BrandIcon";
import SiteFooter from "@/components/SiteFooter";
import PremiumVisual from "@/components/PremiumVisual";
import { cashbackVisual, heroVisual, showcaseVisuals } from "@/lib/visuals";
import { seoGuides } from "@/lib/seo/guides";

const pillars = categories
  .filter((category) => category.status === "active")
  .sort((a, b) => getSavingValue(b.saving) - getSavingValue(a.saving));

const trustPoints = [
  {
    title: "Gratuit et sans engagement",
    description: "Compare sans souscrire et sans frais cachés.",
    icon: "check" as const,
  },
  {
    title: "Méthode transparente",
    description: "Classement clair par adéquation, prix et avantages.",
    icon: "search" as const,
  },
  {
    title: "Données protégées",
    description: "Tes informations sont sécurisées et confidentielles.",
    icon: "lock" as const,
  },
];

const priorityGuideSlugs = [
  "meilleure-box-internet-pas-chere",
  "forfait-mobile-sans-engagement",
  "assurance-habitation-pas-chere",
  "banque-en-ligne-gratuite",
];

const priorityGuides = seoGuides.filter((guide) => priorityGuideSlugs.includes(guide.slug));

const faqs = [
  {
    question: "Pourquoi donner mon email et mon téléphone ?",
    answer: "Pour recevoir ton résultat, être recontacté si une offre évolue et éviter de perdre ta comparaison en cours.",
  },
  {
    question: "Comment Comparia classe les offres ?",
    answer: "D'abord par adéquation avec ton profil, puis par prix, économies estimées et avantages éventuels.",
  },
  {
    question: "Une offre sponsorisée peut-elle passer devant la meilleure offre ?",
    answer: "Non : elle doit rester identifiée comme sponsorisée et ne remplace pas le meilleur choix calculé pour ton profil.",
  },
];

const steps = [
  {
    step: 1,
    title: "Réponds à quelques questions",
    description: "2 minutes pour décrire ta situation financière",
    icon: "search" as const,
    detail: "Usage, contrat actuel, priorité et niveau d’urgence.",
  },
  {
    step: 2,
    title: "Comparia analyse tes besoins",
    description: "Nos algorithmes détectent les économies possibles",
    icon: "sparkles" as const,
    detail: "Prix, garanties, services utiles et avantages éventuels.",
  },
  {
    step: 3,
    title: "Compare et économise",
    description: "Accès aux meilleures offres + cash-back automatique",
    icon: "unlock" as const,
    detail: "Tu gardes le contrôle avant chaque redirection partenaire.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Navigation */}
      <section className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-3 backdrop-blur">
            <SiteNav />
          </div>
        </div>
      </section>

      {/* Hero Section - Premium Design */}
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-20 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-neutral-950 to-neutral-950" />
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/35 via-blue-500/25 to-emerald-500/18 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
              <span className="text-cyan-200 drop-shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                Compare tes factures
              </span>
              <br />
              <span className="text-white">en moins de 2 minutes</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              Électricité, gaz, mobile, assurances : réponds à quelques questions et vois les offres les plus adaptées à ton profil.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-950/20">
                <BrandIcon name="gift" className="h-4 w-4" />
                Gratuit
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-400/15 px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg shadow-blue-950/20">
                <BrandIcon name="clock" className="h-4 w-4" />
                2 minutes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-950/20">
                <BrandIcon name="unlock" className="h-4 w-4" />
                Sans engagement
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/comparateurs"
                className="btn-premium inline-flex items-center justify-center gap-2"
              >
                Comparer maintenant
                <BrandIcon name="arrow-right" className="h-4 w-4" />
              </Link>
              <a
                href="#univers-comparia"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                Voir les univers
                <BrandIcon name="grid" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-900/50 shadow-2xl shadow-black/30 backdrop-blur">
            <PremiumVisual
              src={heroVisual.src}
              alt={heroVisual.alt}
              eyebrow={heroVisual.eyebrow}
              title={heroVisual.title}
              metric={heroVisual.metric}
              tone={heroVisual.tone}
              fit={heroVisual.fit}
              icon="sparkles"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="rounded-none border-0 shadow-none"
            />
            <div className="p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Commence ici</p>
              <h2 className="mt-3 text-2xl font-bold">Quel contrat veux-tu comparer ?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">
                Classés du plus gros potentiel d'économie au plus petit pour t'aider à commencer là où ça compte le plus.
              </p>
              <div className="mt-5 max-h-[22rem] space-y-3 overflow-y-auto pr-2">
                {pillars.map((category, index) => (
                  <Link
                    key={category.slug}
                    href={`/comparateurs/${category.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                        <BrandIcon name={getCategoryIcon(category.slug)} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-bold">
                          <span className="mr-2 text-neutral-500">#{index + 1}</span>
                          {category.title}
                        </span>
                        <span className="mt-1 block text-sm text-neutral-400">{category.group}</span>
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-emerald-300">{category.saving}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                <BrandIcon name={point.icon} />
              </div>
              <h2 className="mt-4 font-bold">{point.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-400">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.10] via-cyan-400/[0.06] to-blue-500/[0.08] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <BrandIcon name="cashback" className="h-4 w-4" />
                Économies suivies
              </div>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Tu vois clairement ce qui peut faire baisser la facture.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-300">
                Comparia sépare les économies estimées, les avantages éventuels et les conditions utiles avant de te rediriger. Le but est simple :
                comprendre vite ce qui vaut le coup, sans mélanger prix, bonus et promesses commerciales.
              </p>
            </div>
            <div className="grid gap-4 xl:grid-cols-[0.9fr_1fr] xl:items-stretch">
              <PremiumVisual
                src={cashbackVisual.src}
                alt={cashbackVisual.alt}
                eyebrow={cashbackVisual.eyebrow}
                title={cashbackVisual.title}
                metric={cashbackVisual.metric}
                tone={cashbackVisual.tone}
                fit={cashbackVisual.fit}
                icon="cashback"
                sizes="(min-width: 1280px) 30vw, 100vw"
                className="min-h-full"
              />
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {[
                  ["Prix", "Le coût reste lisible avant de passer à l’étape suivante."],
                  ["Avantages", "Les bonus éventuels sont séparés de la recommandation."],
                  ["Pertinence", "Les options affichées restent liées à ton profil."],
                ].map(([title, body]) => (
                  <article key={title} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
                    <p className="text-lg font-bold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Guides pratiques</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Comprendre avant de changer de contrat.</h2>
            </div>
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white">
              Tous les guides
              <BrandIcon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {priorityGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group rounded-[1.5rem] border border-neutral-800 bg-neutral-900/40 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  <BrandIcon name={getCategoryIcon(guide.categorySlug)} className="h-4 w-4" />
                  {guide.eyebrow}
                </span>
                <span className="mt-4 block text-lg font-black leading-6 text-white">{guide.title}</span>
                <span className="mt-3 block text-sm leading-6 text-neutral-400">{guide.description}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  Lire
                  <BrandIcon name="arrow-right" className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Univers Comparia</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Des repères visuels pour choisir plus vite.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-400">
              Chaque famille de contrats garde une interface claire : maison, assurances, finances et frontaliers se parcourent sans confusion.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {showcaseVisuals.map((visual) => (
              <article key={visual.eyebrow} className="rounded-[2rem] border border-neutral-800 bg-neutral-900/30 p-3">
                <PremiumVisual
                  src={visual.src}
                  alt={visual.alt}
                  eyebrow={visual.eyebrow}
                  title={visual.title}
                  metric={visual.metric}
                  tone={visual.tone}
                  fit={visual.fit}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="rounded-[1.5rem]"
                />
                <p className="px-2 pb-3 pt-4 text-sm leading-6 text-neutral-300">{visual.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Processus simple</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                Un parcours clair, du diagnostic au choix final.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-400">
              Chaque étape réduit le bruit : tu réponds, Comparia trie, puis tu compares seulement les options utiles.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((item, index) => (
              <article
                key={item.step}
                className="group relative overflow-hidden rounded-[1.5rem] border border-neutral-800 bg-slate-950/55 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-400/10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                    <BrandIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-black text-slate-300">
                    0{item.step}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{item.description}</p>
                <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-neutral-400">{item.detail}</p>
                {index < steps.length - 1 && (
                  <div className="mt-5 hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 lg:flex">
                    Étape suivante
                    <BrandIcon name="arrow-right" className="h-4 w-4" />
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-[1.5rem] border border-emerald-300/15 bg-emerald-400/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-emerald-100">
              Gratuit, sans engagement, et pensé pour t’amener rapidement vers le bon comparateur.
            </p>
            <Link href="/comparateurs" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100">
              Commencer
              <BrandIcon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="univers-comparia" className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Univers Comparia</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Trois façons d'entrer dans tes économies.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Maison",
                icon: "home" as const,
                image: "/category-maison.jpg",
                body: "Électricité, gaz, box et mobile : les contrats du quotidien qui bougent vite.",
                href: "/comparateurs#maison",
                categories: ["Électricité", "Gaz", "Box", "Mobile"],
              },
              {
                title: "Assurances",
                icon: "shield" as const,
                image: "/category-assurances.jpg",
                body: "Auto, habitation, santé, animaux : là où la marge d'économie peut devenir très forte.",
                href: "/comparateurs#assurances",
                categories: ["Auto", "Habitation", "Santé", "Animaux"],
              },
              {
                title: "Frontaliers",
                icon: "coins" as const,
                image: "/category-frontaliers.jpg",
                body: "Change CHF/EUR et santé transfrontalière pour les profils qui ont des besoins à part.",
                href: "/comparateurs#frontaliers",
                categories: ["Change", "Santé", "CHF/EUR"],
              },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group overflow-hidden rounded-[1.75rem] border border-neutral-800 bg-neutral-900/30 transition-all hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-2xl hover:shadow-cyan-950/20">
                <div className="relative aspect-video bg-neutral-900/70">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/25 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
                      <BrandIcon name={item.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <BrandIcon name="arrow-right" className="h-5 w-5 text-cyan-300 transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-400">{item.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.categories.map((category) => (
                      <span key={category} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-neutral-300">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-emerald-300 mb-4">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Transparence
            </div>
            <h2 className="text-4xl font-bold">Ce que tu sais avant de cliquer</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Économie estimée", "Le gain potentiel est visible avant toute redirection."],
              ["Raison de la recommandation", "Tu comprends pourquoi une offre ressort pour ton profil."],
              ["Nature de l'offre", "Sponsorisation, cashback et meilleur choix restent distincts."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-6 hover:border-cyan-400/30 transition"
              >
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-neutral-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Questions fréquentes</p>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
                <h2 className="font-bold">{faq.question}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-14 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">Prêt à économiser ?</h2>
          <p className="text-lg text-neutral-300 mb-8">
            Choisis le contrat qui peut te faire gagner le plus, puis compare en quelques minutes.
          </p>
          <Link
            href="/comparateurs"
            className="btn-premium inline-flex items-center justify-center gap-2 text-lg"
          >
            Comparer maintenant
            <BrandIcon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function getSavingValue(saving: string) {
  const amount = saving.match(/\d+/)?.[0];
  return amount ? Number(amount) : 0;
}
