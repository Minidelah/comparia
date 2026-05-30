import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandIcon, { getCategoryIcon, type IconName } from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare tes factures en 2 minutes",
  description: "Landing rapide Comparia pour choisir la facture à comparer : box, mobile, énergie, assurance ou banque.",
  alternates: {
    canonical: `${siteConfig.url}/snap`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

const utm = "utm_source=snapchat&utm_medium=paid&utm_campaign=video_ads&utm_content=landing_snap";

const quickChoices: {
  title: string;
  helper: string;
  href: string;
  icon: IconName;
  saving: string;
}[] = [
  {
    title: "Box internet",
    helper: "Fibre, Wi-Fi, TV, mobile",
    href: `/comparateurs/box-internet?${utm}`,
    icon: getCategoryIcon("box-internet"),
    saving: "jusqu’à 180€/an",
  },
  {
    title: "Forfait mobile",
    helper: "Data, réseau, Europe/Suisse",
    href: `/comparateurs/forfait-mobile?${utm}`,
    icon: getCategoryIcon("forfait-mobile"),
    saving: "jusqu’à 130€/an",
  },
  {
    title: "Assurance auto",
    helper: "Prix, garanties, franchises",
    href: `/comparateurs/assurance-auto?${utm}`,
    icon: getCategoryIcon("assurance-auto"),
    saving: "jusqu’à 396€/an",
  },
  {
    title: "Assurance habitation",
    helper: "Locataire, propriétaire, assistance",
    href: `/comparateurs/assurance-habitation?${utm}`,
    icon: getCategoryIcon("assurance-habitation"),
    saving: "jusqu’à 480€/an",
  },
  {
    title: "Énergie",
    helper: "Électricité ou gaz",
    href: `/comparateurs/electricite?${utm}`,
    icon: getCategoryIcon("electricite"),
    saving: "jusqu’à 120€/an",
  },
  {
    title: "Banque",
    helper: "Carte, frais, app mobile",
    href: `/comparateurs/banque?${utm}`,
    icon: getCategoryIcon("banque"),
    saving: "jusqu’à 140€/an",
  },
];

const proofItems = [
  { label: "Gratuit", icon: "gift" as const },
  { label: "2 minutes", icon: "clock" as const },
  { label: "Sans engagement", icon: "shield" as const },
];

export default function SnapLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(52,211,153,0.16),transparent_28%),linear-gradient(180deg,#05070d,#07111f_45%,#05070d)]" />

      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-5 sm:px-8">
        <header className="flex items-center justify-between gap-3">
          <Link href={`/?${utm}`} className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xl shadow-cyan-950/30">
              <Image src="/comparia-logo.svg" alt={siteConfig.name} width={40} height={40} className="h-8 w-8" priority />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black uppercase tracking-[0.16em] text-white">Comparia</span>
              <span className="block text-[11px] font-semibold text-cyan-200">Compare tes factures</span>
            </span>
          </Link>
          <Link
            href={`/onboarding?${utm}`}
            className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-black text-cyan-100"
          >
            Diagnostic
          </Link>
        </header>

        <div className="grid flex-1 gap-6 py-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">
              <BrandIcon name="sparkles" className="h-4 w-4" />
              Test rapide
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
              Tu payes trop cher ?
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Choisis ta facture et lance un comparateur en 2 minutes. Box, mobile, assurance, énergie ou banque : Comparia t’aide à voir où commencer.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {proofItems.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-slate-200">
                  <BrandIcon name={item.icon} className="h-4 w-4 text-cyan-300" />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/onboarding?${utm}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/30 transition hover:-translate-y-0.5"
              >
                Faire mon diagnostic gratuit
                <BrandIcon name="arrow-right" className="h-4 w-4" />
              </Link>
              <a
                href="#choix"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-base font-bold text-white transition hover:bg-white/[0.1]"
              >
                Choisir une facture
              </a>
            </div>
          </div>

          <div id="choix" className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/25 backdrop-blur sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Départ rapide</p>
                <h2 className="mt-2 text-2xl font-black">Quelle facture tu veux comparer ?</h2>
              </div>
              <span className="hidden rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200 sm:inline">
                1 clic
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {quickChoices.map((choice) => (
                <Link
                  key={choice.href}
                  href={choice.href}
                  className="group flex items-center justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-300/10"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-inset ring-cyan-300/20">
                      <BrandIcon name={choice.icon} className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-black text-white">{choice.title}</span>
                      <span className="mt-1 block text-sm text-slate-400">{choice.helper}</span>
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-xs font-black text-emerald-300">{choice.saving}</span>
                    <BrandIcon name="arrow-right" className="ml-auto mt-2 h-4 w-4 text-cyan-300 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-emerald-300/15 bg-emerald-300/10 p-4">
              <p className="text-sm font-bold text-emerald-100">Pas besoin de créer un compte.</p>
              <p className="mt-1 text-xs leading-5 text-emerald-100/80">
                Tu réponds à quelques questions, puis Comparia affiche les offres utiles selon ton profil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
