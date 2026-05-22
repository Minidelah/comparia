"use client";

import { useState } from "react";
import type { OfferSlot } from "@/lib/offers";
import AffiliateCTA from "@/components/AffiliateCTA";

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
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-cyan-950/25">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.08] via-transparent to-blue-500/[0.06] opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-sm shadow-black/30">
            {offer.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={offer.logo} alt="" width={32} height={32} loading="lazy" className="h-8 w-8 object-contain" />
            ) : (
              <span className="text-sm font-black text-slate-950">{offer.provider?.slice(0, 1) ?? "C"}</span>
            )}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-300">{offer.provider ?? "Partenaire"}</p>
            <p className="mt-1 text-xs text-amber-200">★ {rating.toFixed(1)}/5</p>
          </div>
        </div>
        {offer.monthlyPrice !== undefined && offer.monthlyPrice !== null && (
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-semibold text-slate-200">
            {offer.monthlyPrice === 0 ? "0€/mois" : `${offer.monthlyPrice.toFixed(2).replace(".", ",")}€/mois`}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`mt-5 rounded-full px-3 py-1 text-xs font-semibold ${
            offer.badge === "Meilleur choix"
              ? "bg-cyan-400/10 text-cyan-200"
              : offer.badge === "Sponsorisé"
                ? "bg-amber-400/10 text-amber-200"
                : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {offer.badge}
        </span>
        <span className="mt-5 text-sm font-semibold text-emerald-300">{offer.annualSavings}</span>
      </div>
      <h3 className="relative mt-4 text-xl font-semibold">{offer.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
      {offer.couponCode && (
        <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/[0.08] p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Code promo détecté</p>
              <p className="mt-2 font-mono text-lg font-black tracking-[0.16em] text-white">{offer.couponCode}</p>
              {offer.couponEndsAt && <p className="mt-1 text-xs text-amber-100/75">Valable jusqu’au {formatDateFr(offer.couponEndsAt)}</p>}
            </div>
            <button
              type="button"
              onClick={copyCouponCode}
              className="rounded-2xl border border-amber-200/30 bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-100"
            >
              {copied ? "Copié" : "Copier"}
            </button>
          </div>
        </div>
      )}
      {offer.rankReason && (
        <p className="mt-3 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100">
          {offer.rankReason}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(offer.tags ?? ["Profil compatible", "Souscription rapide", "Vérifiable"]).slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      {offer.cashback && <p className="mt-3 text-sm font-semibold text-cyan-300">{offer.cashback}</p>}
      <AffiliateCTA offerId={offer.id} categorySlug={offer.categorySlug} href={offer.affiliateUrl} label="Voir l’offre recommandée" />
    </article>
  );
}

function formatDateFr(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return value;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(timestamp));
}
