"use client";

import type { OfferSlot } from "@/lib/offers";
import AffiliateCTA from "@/components/AffiliateCTA";

type Props = {
  offer: OfferSlot;
};

export default function OfferCard({ offer }: Props) {
  const rating = offer.rating ?? 4.4;

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
