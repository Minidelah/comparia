"use client";

import { useEffect, useMemo, useState } from "react";
import OfferCard from "@/components/OfferCard";
import type { OfferSlot } from "@/lib/offers";

type Props = {
  categorySlug: string;
  categoryTitle: string;
  categorySaving: string;
  offers: OfferSlot[];
};

export default function GatedOffers({ categorySlug, categoryTitle, categorySaving, offers }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const leadStorageKey = `comparia_lead_${categorySlug}`;
  const displayOffers = useMemo(
    () =>
      offers.length > 0
        ? offers
        : [
            {
              id: `${categorySlug}-best-fit`,
              categorySlug,
              badge: "Meilleur choix" as const,
              title: `Meilleure offre ${categoryTitle.toLowerCase()}`,
              description: "Le choix à mettre en avant quand les partenaires réels seront connectés.",
              annualSavings: categorySaving,
            },
          ],
    [categorySaving, categorySlug, categoryTitle, offers],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUnlocked(Boolean(localStorage.getItem(leadStorageKey)));
    }, 0);

    function handleLeadCaptured(event: Event) {
      const detail = (event as CustomEvent<{ categorySlug?: string }>).detail;
      if (detail?.categorySlug === categorySlug) {
        setUnlocked(true);
        trackFunnelEvent("offers_unlocked", categorySlug, {});
      }
    }

    function handleLeadReset(event: Event) {
      const detail = (event as CustomEvent<{ categorySlug?: string }>).detail;
      if (detail?.categorySlug === categorySlug) {
        setUnlocked(false);
      }
    }

    window.addEventListener("comparia:lead-captured", handleLeadCaptured);
    window.addEventListener("comparia:lead-reset", handleLeadReset);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("comparia:lead-captured", handleLeadCaptured);
      window.removeEventListener("comparia:lead-reset", handleLeadReset);
    };
  }, [categorySlug, leadStorageKey]);

  if (!unlocked) {
    return (
      <section id="offres" className="mt-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Offres prêtes</p>
            <h2 className="mt-3 text-3xl font-semibold">Débloque ton comparatif personnalisé.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            Les offres sont filtrées selon tes réponses. Termine le devis express pour afficher les liens recommandés.
          </p>
        </div>

        <div className="mt-5 rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Lead qualifié = offres utiles</p>
              <h3 className="mt-3 text-2xl font-semibold">{displayOffers.length} recommandations attendent ton profil.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                On évite la liste brute : tu vois d’abord les offres compatibles, puis le meilleur choix, le meilleur prix et les éventuels avantages.
              </p>
              <a href="#devis" className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white">
                Finir mon devis express
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {displayOffers.slice(0, 3).map((offer) => (
                <div key={offer.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="absolute inset-0 backdrop-blur-[3px]" />
                  <div className="relative opacity-70">
                    <p className="text-xs font-semibold text-cyan-300">{offer.badge}</p>
                    <h4 className="mt-3 text-sm font-bold text-white">{offer.title}</h4>
                    <p className="mt-2 text-xs text-emerald-300">{offer.annualSavings}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offres" className="mt-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Offres débloquées</p>
          <h2 className="mt-3 text-3xl font-semibold">Choisis avec le moins de friction possible.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Les emplacements d’offres sont prêts pour accueillir tes partenaires réels, tes liens affiliés et tes tests de conversion.
        </p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {displayOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

function trackFunnelEvent(eventName: string, categorySlug: string, meta: Record<string, unknown>) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, categorySlug, meta }),
    keepalive: true,
  }).catch(() => null);
}
