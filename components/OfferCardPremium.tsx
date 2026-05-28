"use client";

import { useState } from "react";
import type { OfferSlot } from "@/lib/offers";
import AffiliateCTA from "@/components/AffiliateCTA";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  offer: OfferSlot;
  className?: string;
  variant?: "default" | "featured" | "compact";
};

export default function OfferCardPremium({ offer, className, variant = "default" }: Props) {
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

  const baseClasses = "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:shadow-2xl hover:shadow-cyan-950/20";
  
  const variantClasses = {
    default: "",
    featured:
      "border-2 border-cyan-400/35 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_55%),rgba(2,6,23,0.86)] shadow-[0_24px_80px_rgba(8,145,178,0.14)]",
    compact: "p-4",
  };

  return (
    <article className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-blue-500/[0.04] opacity-0 transition group-hover:opacity-100" />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-lg shadow-black/25 ring-1 ring-black/5">
            {offer.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={offer.logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
            ) : (
              <span className="text-sm font-black text-neutral-900">{offer.provider?.slice(0, 1) ?? "C"}</span>
            )}
          </span>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-neutral-200">{offer.provider ?? "Partenaire"}</h4>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-amber-300 flex items-center gap-1">
                <BrandIcon name="star" className="h-3 w-3" />
                {rating.toFixed(1)}/5
              </span>
              {offer.verified && (
                <span className="badge badge-outline-primary text-xs px-2 py-0.5">
                  Vérifié
                </span>
              )}
            </div>
          </div>
        </div>
        {offer.monthlyPrice !== undefined && offer.monthlyPrice !== null && (
          <div className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-black text-emerald-200">
            {offer.monthlyPrice === 0 ? "GRATUIT" : `${offer.monthlyPrice.toFixed(2).replace(".", ",")}€/mois`}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span
          className={cn("badge",
            offer.badge === "Meilleur choix" ? "badge-primary" :
            offer.badge === "Sponsorisé" ? "badge-warning" :
            "badge-success"
          )}
        >
          {offer.badge}
        </span>
        {offer.annualSavings && (
          <span className="text-sm font-semibold text-emerald-400">{offer.annualSavings}</span>
        )}
      </div>
      
      <h3 className="relative mt-4 text-xl font-bold text-white">{offer.title}</h3>
      <p className="mt-2 text-sm text-neutral-400 truncate-2">{offer.description}</p>
      
      {offer.couponCode && (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <BrandIcon name="tag" className="h-3 w-3" />
                Code promo détecté
              </p>
              <p className="mt-2 font-mono text-lg font-black tracking-wider text-white">{offer.couponCode}</p>
              {offer.couponEndsAt && (
                <p className="mt-1 text-xs text-amber-200/80">
                  Valable jusqu&apos;au {formatDateFr(offer.couponEndsAt)}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={copyCouponCode}
              className={cn(
                "inline-flex items-center rounded-xl border border-white/10 bg-white px-3 py-1.5 text-xs font-black text-slate-950 transition hover:bg-amber-50",
                copied ? "border-emerald-300/50 bg-emerald-100" : "",
              )}
            >
              {copied ? (
                <>
                  <BrandIcon name="check" className="h-3 w-3 mr-1" />
                  Copié
                </>
              ) : (
                <>
                  <BrandIcon name="copy" className="h-3 w-3 mr-1" />
                  Copier
                </>
              )}
            </button>
          </div>
        </div>
      )}
      
      {offer.rankReason && (
        <p className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-200 flex items-center gap-2">
          <BrandIcon name="info" className="h-3 w-3" />
          {offer.rankReason}
        </p>
      )}
      
      {offer.tags && offer.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {offer.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="badge badge-outline text-xs px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {offer.cashback && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-cyan-400">
          <BrandIcon name="gift" className="h-4 w-4" />
          {offer.cashback}
        </p>
      )}
      
      <div className="mt-5">
        <AffiliateCTA 
          offerId={offer.id} 
          categorySlug={offer.categorySlug} 
          href={offer.affiliateUrl} 
          label="Voir l'offre recommandée"
          className={cn("w-full",
            variant === "featured"
              ? "bg-gradient-to-r from-cyan-400 to-emerald-400 font-black text-slate-950 hover:shadow-emerald-500/20"
              : "border border-white/10 bg-white/[0.08] hover:bg-white/[0.12]")}
        />
      </div>
      
      {variant === "featured" && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="badge badge-primary text-xs px-3 py-1.5 rotate-12 shadow-lg">
            <BrandIcon name="crown" className="h-3 w-3 mr-1" />
            Offre phare
          </div>
        </div>
      )}
    </article>
  );
}

function formatDateFr(value: string) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return value;
  return new Intl.DateTimeFormat("fr-FR", { 
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric" 
  }).format(new Date(timestamp));
}
