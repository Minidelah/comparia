"use client";

import type { OfferSlot } from "@/lib/offers";
import AffiliateCTA from "@/components/AffiliateCTA";

type Props = {
  offer: OfferSlot;
};

export default function OfferCard({ offer }: Props) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            offer.badge === "Meilleur choix"
              ? "bg-cyan-400/10 text-cyan-200"
              : offer.badge === "Sponsorisé"
                ? "bg-amber-400/10 text-amber-200"
                : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {offer.badge}
        </span>
        <span className="text-sm font-semibold text-emerald-300">{offer.annualSavings}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{offer.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-400">
        <li>✓ Profil compatible</li>
        <li>✓ Souscription rapide</li>
        <li>✓ Offre vérifiable avant activation</li>
      </ul>
      {offer.cashback && <p className="mt-3 text-sm font-semibold text-cyan-300">{offer.cashback}</p>}
      <AffiliateCTA offerId={offer.id} categorySlug={offer.categorySlug} href={offer.affiliateUrl} label="Voir l’offre recommandée" />
    </article>
  );
}
