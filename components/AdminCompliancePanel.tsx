import type { AdminOfferRow } from "@/components/AdminOffersManager";
import { affiliateComplianceRules, buildComplianceChecksForOffers } from "@/lib/affiliate/compliance";

export default function AdminCompliancePanel({ offers }: { offers: AdminOfferRow[] }) {
  const heliosRule = affiliateComplianceRules.find((rule) => rule.partnerSlug === "helios-fr") ?? affiliateComplianceRules[0];
  const checks = buildComplianceChecksForOffers(offers);
  const heliosChecks = checks.filter((check) => check.rule.partnerSlug === "helios-fr");
  const activeHeliosOffers = heliosChecks.filter((check) => check.active).length;

  return (
    <section className="mt-5 rounded-[2rem] border border-amber-300/20 bg-gradient-to-br from-amber-400/10 via-slate-950/80 to-cyan-400/10 p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Compliance affiliation</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Garde-fou partenaires.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Helios est compatible avec CompareTesFactures, mais la marque doit être protégée : aucun achat de mot-clé marque, et les termes sensibles doivent rester en négatif.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:min-w-80">
          <ComplianceMetric label="Règles actives" value={String(affiliateComplianceRules.length)} tone="amber" />
          <ComplianceMetric label="Offres Helios" value={String(activeHeliosOffers)} tone={activeHeliosOffers > 0 ? "emerald" : "cyan"} />
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-400/10 px-3 py-1 text-xs font-bold text-rose-200">PPC marque interdit</span>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">Comparateur autorisé</span>
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">Cashback/coupon autorisé</span>
          </div>
          <h3 className="mt-4 text-xl font-bold text-white">{heliosRule.brandName}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{heliosRule.summary}</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <RuleList title="Autorisé" items={heliosRule.allowedLevers} tone="emerald" />
            <RuleList title="Sous conditions" items={heliosRule.conditionalLevers} tone="amber" />
          </div>

          <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200">À ne pas faire</p>
            <ul className="mt-3 space-y-2 text-sm text-rose-50/90">
              {heliosRule.forbiddenLevers.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Mots-clés négatifs à mettre dans Google/Bing Ads</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {heliosRule.negativeKeywords.map((keyword) => (
              <span key={keyword} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-200">
                {keyword}
              </span>
            ))}
          </div>
          <textarea
            readOnly
            value={heliosRule.negativeKeywords.join("\n")}
            className="mt-4 h-40 w-full rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-5 text-slate-200 outline-none"
            aria-label="Mots-clés négatifs Helios"
          />
          <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-50/90">
            {heliosChecks.length > 0 ? (
              <p>
                {heliosChecks.length} offre{heliosChecks.length > 1 ? "s" : ""} Helios détectée{heliosChecks.length > 1 ? "s" : ""}. Vérifie que tes campagnes payantes excluent bien ces mots-clés avant diffusion.
              </p>
            ) : (
              <p>Aucune offre Helios active en base pour l’instant. La règle est prête : dès qu’une offre Helios est importée, elle sera signalée ici.</p>
            )}
          </div>
        </div>
      </div>

      {heliosChecks.length > 0 && (
        <div className="mt-4 space-y-3">
          {heliosChecks.map((check) => (
            <div key={check.offerId} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{check.provider} · {check.title}</p>
                  <p className="mt-1 text-xs text-slate-500">Statut : {check.active ? "active" : "inactive"}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${check.status === "ok" ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-400/10 text-amber-200"}`}>
                  {check.status === "ok" ? "OK" : "À vérifier"}
                </span>
              </div>
              {check.warnings.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs leading-5 text-amber-100">
                  {check.warnings.map((warning) => (
                    <li key={warning}>• {warning}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ComplianceMetric({ label, value, tone }: { label: string; value: string; tone: "amber" | "emerald" | "cyan" }) {
  const tones = {
    amber: "border-amber-300/20 bg-amber-400/10 text-amber-200",
    emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-xs uppercase tracking-[0.2em] opacity-75">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function RuleList({ title, items, tone }: { title: string; items: string[]; tone: "emerald" | "amber" }) {
  const color = tone === "emerald" ? "text-emerald-200" : "text-amber-200";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${color}`}>{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
