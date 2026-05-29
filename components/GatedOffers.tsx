"use client";

import { useEffect, useMemo, useState } from "react";
import OfferCardPremium from "@/components/OfferCardPremium";
import type { OfferSlot } from "@/lib/offers";
import { getAttributionMeta } from "@/lib/analytics/attribution";
import BrandIcon, { getCategoryIcon, type IconName } from "@/components/BrandIcon";

type Props = {
  categorySlug: string;
  categoryTitle: string;
  categorySaving: string;
  offers: OfferSlot[];
};

type ChoicePreview = {
  id: string;
  label: string;
  helper: string;
  badge: string;
  icon: IconName;
  partnerLogos: string[];
};

const COMPARIA_LOGO = "/comparia-logo.svg";

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
  const choicePreviews = useMemo(
    () => buildChoicePreviews(categorySlug, categoryTitle, displayOffers),
    [categorySlug, categoryTitle, displayOffers],
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
              {choicePreviews.map((choice, index) => (
                <div
                  key={choice.id}
                  className="group relative min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 p-4 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_42%)] opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-emerald-400/10 to-transparent" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 shadow-lg shadow-black/25 ring-1 ring-white/70">
                          <LogoMark icon={choice.icon} size="large" />
                        </span>
                        <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[11px] font-bold text-slate-300">Choix {index + 1}</span>
                      </div>
                      <p className="mt-4 text-xs font-semibold text-cyan-300">{choice.badge}</p>
                      <h4 className="mt-2 text-base font-black leading-5 text-white">{choice.label}</h4>
                      <p className="mt-2 text-xs leading-5 text-slate-300">{choice.helper}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex -space-x-2">
                        {choice.partnerLogos.map((logo) => (
                          <span key={`${choice.id}-${logo}`} className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-950 bg-white p-1 shadow-sm">
                            <LogoMark src={logo} icon={choice.icon} size="small" />
                          </span>
                        ))}
                        {choice.partnerLogos.length === 0 ? (
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
                            <BrandIcon name={choice.icon} className="h-4 w-4 text-cyan-200" />
                          </span>
                        ) : null}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-300">Filtré</span>
                    </div>
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

function buildChoicePreviews(categorySlug: string, categoryTitle: string, offers: OfferSlot[]): ChoicePreview[] {
  const categoryIcon = getCategoryIcon(categorySlug);

  const byCategory: Record<string, Omit<ChoicePreview, "partnerLogos">[]> = {
    "box-internet": [
      { id: "box-internet", label: "Box internet", helper: "Fibre, Wi-Fi et prix mensuel comparés.", badge: "Maison connectée", icon: "router" },
      { id: "box-mobile", label: "Box + mobile", helper: "Internet fixe et forfait regroupés.", badge: "Pack malin", icon: "phone" },
      { id: "box-tv", label: "Box + TV", helper: "Débit, chaînes et engagement vérifiés.", badge: "Triple play", icon: "tv" },
    ],
    "forfait-mobile": [
      { id: "mobile-5g", label: "Forfait 5G", helper: "Data, réseau et prix réel du forfait.", badge: "Usage quotidien", icon: "phone" },
      { id: "mobile-budget", label: "Petit prix", helper: "Forfaits simples pour payer moins.", badge: "Économie", icon: "coins" },
      { id: "mobile-roaming", label: "Europe & Suisse", helper: "Options utiles pour voyager sans surprise.", badge: "International", icon: "globe" },
    ],
    electricite: [
      { id: "electricite-prix", label: "Prix bas", helper: "Offres classées par gain estimé.", badge: "Économie", icon: "bolt" },
      { id: "electricite-stable", label: "Prix stable", helper: "Contrats plus lisibles sur la durée.", badge: "Sérénité", icon: "shield" },
      { id: "electricite-verte", label: "Offre verte", helper: "Options énergie verte et garanties.", badge: "Responsable", icon: "sparkles" },
    ],
    gaz: [
      { id: "gaz-chauffage", label: "Chauffage", helper: "Offres adaptées à ta consommation.", badge: "Foyer", icon: "flame" },
      { id: "gaz-prix", label: "Prix maîtrisé", helper: "Mensualités et conditions comparées.", badge: "Budget", icon: "shield" },
      { id: "gaz-service", label: "Service client", helper: "Souscription et suivi plus simples.", badge: "Confort", icon: "home" },
    ],
    "assurance-habitation": [
      { id: "habitation-locataire", label: "Locataire", helper: "Garanties essentielles et prix comparés.", badge: "Logement", icon: "home" },
      { id: "habitation-proprietaire", label: "Propriétaire", helper: "Protection adaptée au bien et aux risques.", badge: "Protection", icon: "shield" },
      { id: "habitation-assistance", label: "Assistance", helper: "Dégâts, urgence et services inclus.", badge: "Soutien", icon: "help" },
    ],
    "assurance-auto": [
      { id: "auto-tiers", label: "Au tiers", helper: "Couverture simple pour réduire le coût.", badge: "Prix", icon: "car" },
      { id: "auto-tous-risques", label: "Tous risques", helper: "Protection renforcée pour ton véhicule.", badge: "Garantie", icon: "shield" },
      { id: "auto-assistance", label: "Assistance", helper: "Dépannage, kilométrage et options utiles.", badge: "Service", icon: "help" },
    ],
    "assurance-moto": [
      { id: "moto-tiers", label: "Moto au tiers", helper: "L’essentiel pour rouler assuré.", badge: "Prix", icon: "scooter" },
      { id: "moto-vol", label: "Vol & incendie", helper: "Garanties utiles selon ton deux-roues.", badge: "Protection", icon: "shield" },
      { id: "moto-assistance", label: "Assistance", helper: "Dépannage et options du quotidien.", badge: "Service", icon: "help" },
    ],
    banque: [
      { id: "banque-carte", label: "Carte gratuite", helper: "Frais, plafonds et conditions comparés.", badge: "Compte", icon: "credit-card" },
      { id: "banque-mobile", label: "App mobile", helper: "Pilotage simple et services inclus.", badge: "Digital", icon: "phone" },
      { id: "banque-voyage", label: "Voyage", helper: "Paiements, retraits et frais à l’étranger.", badge: "International", icon: "globe" },
    ],
  };

  const choices =
    byCategory[categorySlug] ??
    offers.slice(0, 3).map((offer) => ({
      id: `${offer.id}-preview`,
      label: offer.provider ?? offer.title,
      helper: offer.description,
      badge: offer.badge,
      icon: categoryIcon,
    }));

  const fallbackChoices =
    choices.length > 0
      ? choices
      : [
          { id: `${categorySlug}-best`, label: `Choix ${categoryTitle}`, helper: "Profil, prix et avantages comparés.", badge: "Meilleur choix", icon: categoryIcon },
          { id: `${categorySlug}-price`, label: "Meilleur prix", helper: "Option pensée pour réduire la facture.", badge: "Économie", icon: "coins" as const },
          { id: `${categorySlug}-service`, label: "Service utile", helper: "Avantages et conditions vérifiés.", badge: "Confort", icon: "shield" as const },
        ];

  return fallbackChoices.slice(0, 3).map((choice) => ({
    ...choice,
    partnerLogos: [COMPARIA_LOGO],
  }));
}

function LogoMark({ src, icon, size }: { src?: string; icon: IconName; size: "small" | "large" }) {
  const iconClassName = size === "large" ? "h-6 w-6 text-slate-950" : "h-4 w-4 text-slate-950";
  const imageClassName = size === "large" ? "h-8 w-8 object-contain" : "h-5 w-5 object-contain";
  const imageSize = size === "large" ? 34 : 22;
  const logoSrc = src ?? COMPARIA_LOGO;

  return (
    <span className="relative flex h-full w-full items-center justify-center">
      <BrandIcon name={icon} className={iconClassName} />
      <img
        src={logoSrc}
        alt=""
        width={imageSize}
        height={imageSize}
        loading="lazy"
        className={`absolute ${imageClassName}`}
        onError={(event) => {
          event.currentTarget.remove();
        }}
      />
    </span>
  );
}
