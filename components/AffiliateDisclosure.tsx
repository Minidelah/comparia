export default function AffiliateDisclosure() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
      Certaines offres peuvent rémunérer CompareTesFactures si tu souscris via nos liens. Nous séparons toujours le meilleur choix pour ton profil,
      le meilleur cashback et les offres sponsorisées afin de garder la recommandation lisible.{" "}
      <a className="font-semibold text-cyan-300 transition hover:text-cyan-200" href="/transparence-affiliation">
        Voir notre politique d’affiliation
      </a>
      .
    </div>
  );
}
