"use client";

import { useState } from "react";
import type { OfferSlot } from "@/lib/offers";
import AffiliateCTA from "@/components/AffiliateCTA";
import BrandIcon from "@/components/BrandIcon";

type Props = {
  offer: OfferSlot;
};

export default function OfferCard({ offer }: Props) {
  const rating = offer.rating ?? 4.4;
  const [copied, setCopied] = useState(false);

  async function copyCouponCode() {
    if (!offer.couponCode) return;

    try {
      await navigator.clipboard.writeText(offer.couponCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="card-premium group relative overflow-hidden hover-scale">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-blue-500/[0.04] opacity-0 transition group-hover:opacity-100" />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm shadow-black/20">
            {offer.logo ? (
              <img src={offer.logo} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
            ) : (
              <span className="text-sm font-black text-neutral-900">{offer.provider?.slice(0, 1) ?? "C"}</span>
            )}
          </span>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-neutral-200">{offer.provider ?? "Partenaire"}</h4>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-amber-300">★ {rating.toFixed(1)}</span>
              {offer.verified && (
                <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-300">Vérifié</span>
              )}
            </div>
          </div>
        </div>
        {offer.monthlyPrice !== undefined && offer.monthlyPrice !== null && (
          <div className="rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-100">
            {offer.monthlyPrice === 0 ? "GRATUIT" : `${offer.monthlyPrice.toFixed(2).replace(".", ",")}€/mois`}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            offer.badge === "Meilleur choix"
              ? "badge badge-primary"
              : offer.badge === "Sponsorisé"
                ? "badge badge-warning"
                : "badge badge-success"
          }`}
        >
          {offer.badge}
        </span>
        {offer.annualSavings && (
          <span className="text-sm font-semibold text-emerald-400">{offer.annualSavings}</span>
        )}
      </div>
      
      <h3 className="relative mt-4 text-xl font-bold text-white">{offer.title}</h3>
      <p className="mt-3 text-sm text-neutral-400">{offer.description}</p>
      
      {offer.couponCode && (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">Code promo détecté</p>
              <p className="mt-2 font-mono text-lg font-black tracking-wider text-white">{offer.couponCode}</p>
              {offer.couponEndsAt && <p className="mt-1 text-xs text-amber-200/80">Valable jusqu'au {formatDateFr(offer.couponEndsAt)}</p>}
            </div>
            <button
              type="button"
              onClick={copyCouponCode}
              className="rounded-xl border border-amber-300/30 bg-white px-4 py-2 text-sm font-bold text-neutral-900 transition hover:bg-amber-100 focus:ring-2 focus:ring-amber-400/50"
            >
              {copied ? "Copié ✓" : "Copier"}
            </button>
          </div>
        </div>
      )}
      
      {offer.rankReason && (
        <p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200">
          <BrandIcon name="info" className="mr-1 inline h-3 w-3" />
          {offer.rankReason}
        </p>
      )}
      
      <div className="mt-4 flex flex-wrap gap-2">
        {(offer.tags ?? ["Profil compatible", "Souscription rapide", "Vérifiable"]).slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-neutral-700 bg-neutral-800/70 px-3 py-1 text-xs font-semibold text-neutral-300">
            {tag}
          </span>
        ))}
      </div>
      
      {offer.cashback && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-cyan-400">
          <BrandIcon name="gift" className="h-4 w-4" />
          {offer.cashback}
        </p>
      )}
      
      <AffiliateCTA 
        offerId={offer.id} 
        categorySlug={offer.categorySlug} 
        href={offer.affiliateUrl} 
        label="Voir l'offre recommandée"
        className="mt-5"
      />
    </article>
  );
}

function formatDateFr(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return value;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(timestamp));
}
