"use client";

import { useEffect, useMemo, useState } from "react";
import OfferCardPremium from "@/components/OfferCardPremium";
import type { OfferSlot } from "@/lib/offers";
import { getAttributionMeta } from "@/lib/analytics/attribution";
import BrandIcon from "@/components/BrandIcon";

type Props = {
  categorySlug: string;
  categoryTitle: string;
  categorySaving: string;
  offers: OfferSlot[];
};

export default function GatedOffers({ categorySlug, categoryTitle, categorySaving, offers }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const leadStorageKey = `ctf_lead_${categorySlug}`;
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
              description: "Une offre à comparer selon ton profil, tes besoins et les conditions affichées avant souscription.",
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

    window.addEventListener("ctf:lead-captured", handleLeadCaptured);
    window.addEventListener("ctf:lead-reset", handleLeadReset);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("ctf:lead-captured", handleLeadCaptured);
      window.removeEventListener("ctf:lead-reset", handleLeadReset);
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

        <div className="mt-5 overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.035))] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">Profil qualifié = offres utiles</p>
              <h3 className="mt-3 text-2xl font-semibold">{displayOffers.length} recommandations attendent ton profil.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                On évite la liste brute : tu vois d’abord les offres compatibles, puis le meilleur choix, le meilleur prix et les éventuels avantages.
              </p>
              <div className="mt-5 grid gap-2 text-sm text-slate-300">
                {["Classement par pertinence", "Économies et avantages séparés", "Redirection partenaire suivie"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <BrandIcon name="check-circle" className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
              <a href="#devis" className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 font-black text-slate-950 shadow-xl shadow-cyan-950/30 transition duration-300 hover:-translate-y-0.5">
                <BrandIcon name="unlock" className="h-4 w-4" />
                Finir mon devis express
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {displayOffers.slice(0, 3).map((offer, index) => (
                <div key={offer.id} className="relative min-h-44 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 p-4">
                  <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[3px]" />
                  <div className="relative flex h-full flex-col justify-between opacity-80">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white p-2 shadow-lg shadow-black/20">
                          {offer.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={offer.logo} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 object-contain" />
                          ) : (
                            <BrandIcon name="shield" className="h-5 w-5 text-slate-950" />
                          )}
                        </span>
                        <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[11px] font-bold text-slate-300">#{index + 1}</span>
                      </div>
                      <p className="mt-4 text-xs font-semibold text-cyan-300">{offer.badge}</p>
                      <h4 className="mt-2 text-sm font-bold leading-5 text-white">{offer.title}</h4>
                    </div>
                    <p className="mt-3 text-xs font-bold text-emerald-300">{offer.annualSavings}</p>
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
          Les offres sont classées automatiquement avec tes signaux réels : économies estimées, cashback, clics affiliés et performance du comparateur.
        </p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {displayOffers.map((offer, index) => (
          <OfferCardPremium
            key={offer.id}
            offer={offer}
            variant={index === 0 ? "featured" : "default"}
            className={index === 0 ? "lg:col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
}

function trackFunnelEvent(eventName: string, categorySlug: string, meta: Record<string, unknown>) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, categorySlug, meta: { ...meta, attribution: getAttributionMeta() } }),
    keepalive: true,
  }).catch(() => null);
}
