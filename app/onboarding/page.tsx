"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { DiagnosticAnswers } from "@/lib/diagnostic";
import type { AiExpenseInsight } from "@/lib/ai/types";
import { analyzeDiagnostic } from "@/lib/services/diagnostics";
import SiteNav from "@/components/SiteNav";
import MetricCard from "@/components/MetricCard";
import SiteFooter from "@/components/SiteFooter";

const goals = [
  "Réduire mes factures",
  "Mieux gérer mon argent",
  "Optimiser mon statut de frontalier",
  "Trouver les meilleures offres",
];

const baseStepLabels = ["Profil", "Revenus", "Énergie", "Mobile", "Assurances", "Abonnements", "Objectif"];
const crossBorderStepLabels = ["Profil", "Revenus", "Change", "Santé", "Énergie", "Mobile", "Assurances", "Abonnements", "Objectif"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isCrossBorderWorker, setIsCrossBorderWorker] = useState<boolean | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [incomeCurrency, setIncomeCurrency] = useState<"EUR" | "CHF" | "BOTH" | "">("");
  const [monthlyFxVolumeChf, setMonthlyFxVolumeChf] = useState("");
  const [healthInsurance, setHealthInsurance] = useState<"LAMAL" | "CMU" | "UNKNOWN" | "NONE" | "">("");
  const [monthlyElectricityCost, setMonthlyElectricityCost] = useState("");
  const [monthlyGasCost, setMonthlyGasCost] = useState("");
  const [mobilePlanCost, setMobilePlanCost] = useState("");
  const [monthlyAutoInsuranceCost, setMonthlyAutoInsuranceCost] = useState("");
  const [monthlyMotoInsuranceCost, setMonthlyMotoInsuranceCost] = useState("");
  const [monthlyBikeInsuranceCost, setMonthlyBikeInsuranceCost] = useState("");
  const [monthlyScooterInsuranceCost, setMonthlyScooterInsuranceCost] = useState("");
  const [monthlyPetInsuranceCost, setMonthlyPetInsuranceCost] = useState("");
  const [monthlyHomeInsuranceCost, setMonthlyHomeInsuranceCost] = useState("");
  const [monthlyMutuelleCost, setMonthlyMutuelleCost] = useState("");
  const [monthlySubscriptionsCost, setMonthlySubscriptionsCost] = useState("");
  const [goal, setGoal] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "not-configured" | "saved-locally">("idle");
  const [aiInsight, setAiInsight] = useState<AiExpenseInsight | null>(null);

  const answers: DiagnosticAnswers | null = useMemo(() => {
    if (isCrossBorderWorker === null) {
      return null;
    }

    return {
      isCrossBorderWorker,
      monthlyIncome: Number(monthlyIncome || 0),
      incomeCurrency: incomeCurrency || "EUR",
      monthlyFxVolumeChf: Number(monthlyFxVolumeChf || 0),
      healthInsurance: isCrossBorderWorker ? healthInsurance || "UNKNOWN" : "NONE",
      monthlyElectricityCost: Number(monthlyElectricityCost || 0),
      monthlyGasCost: Number(monthlyGasCost || 0),
      mobilePlanCost: Number(mobilePlanCost || 0),
      monthlyAutoInsuranceCost: Number(monthlyAutoInsuranceCost || 0),
      monthlyMotoInsuranceCost: Number(monthlyMotoInsuranceCost || 0),
      monthlyBikeInsuranceCost: Number(monthlyBikeInsuranceCost || 0),
      monthlyScooterInsuranceCost: Number(monthlyScooterInsuranceCost || 0),
      monthlyPetInsuranceCost: Number(monthlyPetInsuranceCost || 0),
      monthlyHomeInsuranceCost: Number(monthlyHomeInsuranceCost || 0),
      monthlyMutuelleCost: Number(monthlyMutuelleCost || 0),
      monthlySubscriptionsCost: Number(monthlySubscriptionsCost || 0),
      goal: goal || "Réduire mes factures",
    };
  }, [
    goal,
    healthInsurance,
    incomeCurrency,
    isCrossBorderWorker,
    mobilePlanCost,
    monthlyElectricityCost,
    monthlyGasCost,
    monthlyFxVolumeChf,
    monthlyIncome,
    monthlyAutoInsuranceCost,
    monthlyMotoInsuranceCost,
    monthlyBikeInsuranceCost,
    monthlyScooterInsuranceCost,
    monthlyPetInsuranceCost,
    monthlyHomeInsuranceCost,
    monthlyMutuelleCost,
    monthlySubscriptionsCost,
  ]);

  const analysis = useMemo(() => (answers ? analyzeDiagnostic(answers) : null), [answers]);
  const recommendations = analysis?.recommendations ?? [];
  const summary = analysis?.summary ?? null;
  const topRecommendation = recommendations[0];
  const stepLabels = isCrossBorderWorker ? crossBorderStepLabels : baseStepLabels;
  const progress = `${Math.round((step / stepLabels.length) * 100)}%`;

  const canContinue = step !== 1 || isCrossBorderWorker !== null;

  async function nextStep() {
    if (step < stepLabels.length) {
      setStep((current) => current + 1);
      return;
    }

    setShowResults(true);
    setAiInsight(null);

    if (!answers) {
      return;
    }

    setSaveState("saving");

    try {
      const anonymousId = getOrCreateAnonymousId();
      const response = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymousId, answers }),
      });
      const payload = (await response.json()) as {
        ai?: AiExpenseInsight;
        persistence?: { persisted?: boolean; reason?: string };
      };

      if (payload.ai) {
        setAiInsight(payload.ai);
      }

      if (payload.persistence?.persisted) {
        setSaveState("saved");
      } else if (payload.persistence?.reason === "supabase_not_configured") {
        saveDiagnosticLocally(answers);
        setSaveState("not-configured");
      } else {
        saveDiagnosticLocally(answers);
        setSaveState("saved-locally");
      }
    } catch {
      saveDiagnosticLocally(answers);
      setSaveState("saved-locally");
    }
  }

  if (showResults && answers) {
    return (
      <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SiteNav compact />

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Diagnostic CompareTesFactures</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Tu pourrais économiser jusqu’à {summary?.totalSavings ?? 0}€/an.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Voici les optimisations les plus prometteuses pour ton profil. Les chiffres sont volontairement
              simples pour ce premier diagnostic ; le prochain palier sera de les relier à de vraies offres.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              {saveState === "saving" && "Sauvegarde du diagnostic en cours…"}
              {saveState === "saved" && "Diagnostic sauvegardé pour ton suivi CompareTesFactures."}
              {saveState === "not-configured" && "Diagnostic prêt. La sauvegarde cloud sera activée dès que Supabase sera configuré."}
              {saveState === "saved-locally" && "Diagnostic sauvegardé sur cet appareil. La synchronisation cloud sera retentée plus tard."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <MetricCard label="Fuite mensuelle" value={`${summary?.monthlyLeak ?? 0}€`} />
              <MetricCard label="Score CompareTesFactures" value={`${summary?.optimizationScore ?? 0}/100`} />
              <MetricCard label="Priorité" value={topRecommendation?.category ?? "—"} />
            </div>
          </section>

          {topRecommendation && (
            <section className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Prochaine meilleure action</p>
              <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">{topRecommendation.category}</h2>
                  <p className="mt-2 max-w-2xl text-slate-200">{topRecommendation.reason}</p>
                </div>
                <Link href={`/comparateurs/${topRecommendation.slug}`} className="rounded-2xl bg-white px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-100">
                  {topRecommendation.cta}
                </Link>
              </div>
            </section>
          )}

          {aiInsight && (
            <section className="mt-6 rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-400/10 via-cyan-400/10 to-blue-500/10 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-violet-200">
                    Assistant IA {aiInsight.generatedBy === "mistral" ? "Mistral" : "CompareTesFactures"}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">Lecture personnalisée de ton profil</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{aiInsight.summary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Économie IA estimée</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-300">{aiInsight.estimatedSavings}€/an</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm font-semibold text-white">Priorités d’action</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                    {aiInsight.actionPriorities.map((priority) => (
                      <li key={priority}>• {priority}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <p className="text-sm font-semibold text-white">Explication simple</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{aiInsight.explanation}</p>
                </div>
              </div>
            </section>
          )}

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            {recommendations.map((item) => (
              <article key={item.category} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">{item.priority}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{item.category}</h2>
                  </div>
                  <p className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {item.annualSavings}€/an
                  </p>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{item.reason}</p>
                <Link href={`/comparateurs/${item.slug}`} className="mt-5 block w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-center font-semibold transition hover:shadow-lg hover:shadow-cyan-500/30">
                  {item.cta}
                </Link>
              </article>
            ))}
          </section>

          <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Sauvegarde tes économies.</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Crée ton compte pour suivre tes recommandations, recevoir les nouvelles opportunités et voir
              combien tu as réellement gagné avec CompareTesFactures.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100">
                Créer mon compte
              </button>
              <button
                onClick={() => setShowResults(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10"
              >
                Modifier mes réponses
              </button>
            </div>
          </section>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070d] px-5 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SiteNav compact />

        <div className="mt-8 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-400 transition-all" style={{ width: progress }} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Étape {step} sur {stepLabels.length}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.2 }}
                className="mt-5"
              >
                {step === 1 && (
                  <>
                    <h1 className="text-3xl font-semibold">Tu vis en France et travailles en Suisse ?</h1>
                    <p className="mt-3 text-slate-300">
                      Cette information nous aide à personnaliser les économies les plus pertinentes pour toi.
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Choice
                        selected={isCrossBorderWorker === true}
                        onClick={() => {
                          setIsCrossBorderWorker(true);
                          setHealthInsurance("");
                        }}
                      >
                        Oui, je suis frontalier
                      </Choice>
                      <Choice
                        selected={isCrossBorderWorker === false}
                        onClick={() => {
                          setIsCrossBorderWorker(false);
                          setHealthInsurance("NONE");
                        }}
                      >
                        Non, je vis et travaille en France
                      </Choice>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h1 className="text-3xl font-semibold">Quel est ton revenu mensuel net ?</h1>
                    <p className="mt-3 text-slate-300">Nous l’utilisons pour estimer certaines économies, jamais pour te juger.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Revenu mensuel" value={monthlyIncome} onChange={setMonthlyIncome} placeholder="Ex. 3500" />
                      <div>
                        <p className="mb-2 text-sm text-slate-300">Devise principale</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(["EUR", "CHF", "BOTH"] as const).map((currency) => (
                            <Choice key={currency} selected={incomeCurrency === currency} onClick={() => setIncomeCurrency(currency)}>
                              {currency === "BOTH" ? "Les deux" : currency}
                            </Choice>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isCrossBorderWorker && step === 3 && (
                  <>
                    <h1 className="text-3xl font-semibold">Combien de CHF convertis-tu chaque mois ?</h1>
                    <p className="mt-3 text-slate-300">
                      {isCrossBorderWorker
                        ? "C’est souvent ici que les pertes discrètes s’accumulent."
                        : "Tu peux passer cette étape si tu ne convertis pas de CHF."}
                    </p>
                    <div className="mt-6">
                      <Field
                        label="Volume mensuel en CHF"
                        value={monthlyFxVolumeChf}
                        onChange={setMonthlyFxVolumeChf}
                        placeholder="Ex. 4000"
                        disabled={!isCrossBorderWorker}
                      />
                    </div>
                  </>
                )}

                {isCrossBorderWorker && step === 4 && (
                  <>
                    {isCrossBorderWorker ? (
                      <>
                        <h1 className="text-3xl font-semibold">Quel est ton système d’assurance santé actuel ?</h1>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {[
                            ["LAMAL", "LAMal"],
                            ["CMU", "CMU / PUMA"],
                            ["UNKNOWN", "Je ne sais pas"],
                            ["NONE", "Non concerné"],
                          ].map(([value, label]) => (
                            <Choice
                              key={value}
                              selected={healthInsurance === value}
                              onClick={() => setHealthInsurance(value as typeof healthInsurance)}
                            >
                              {label}
                            </Choice>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-3xl font-semibold">Pas de régime frontalier à comparer pour toi.</h1>
                        <p className="mt-3 text-slate-300">
                          On garde le diagnostic concentré sur les économies qui ont vraiment du sens pour ton profil.
                        </p>
                      </>
                    )}
                  </>
                )}

                {step === (isCrossBorderWorker ? 5 : 3) && (
                  <>
                    <h1 className="text-3xl font-semibold">Combien paies-tu pour l’électricité et le gaz ?</h1>
                    <p className="mt-3 text-slate-300">On les sépare pour détecter les bonnes économies au bon endroit.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Électricité mensuelle" value={monthlyElectricityCost} onChange={setMonthlyElectricityCost} placeholder="Ex. 90" />
                      <Field label="Gaz mensuel" value={monthlyGasCost} onChange={setMonthlyGasCost} placeholder="Ex. 40" />
                    </div>
                  </>
                )}

                {step === (isCrossBorderWorker ? 6 : 4) && (
                  <>
                    <h1 className="text-3xl font-semibold">Combien te coûte ton forfait mobile ?</h1>
                    <p className="mt-3 text-slate-300">On compare d’abord le niveau de prix, puis on affinera avec l’usage réel.</p>
                    <div className="mt-6">
                      <Field label="Coût mensuel" value={mobilePlanCost} onChange={setMobilePlanCost} placeholder="Ex. 24" />
                    </div>
                  </>
                )}

                {step === (isCrossBorderWorker ? 7 : 5) && (
                  <>
                    <h1 className="text-3xl font-semibold">Quelles assurances paies-tu chaque mois ?</h1>
                    <p className="mt-3 text-slate-300">
                      Laisse vide si tu n’es pas concerné. CompareTesFactures comprendra automatiquement 0€.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <Field label="Assurance auto" value={monthlyAutoInsuranceCost} onChange={setMonthlyAutoInsuranceCost} placeholder="Ex. 58" />
                      <Field label="Assurance moto" value={monthlyMotoInsuranceCost} onChange={setMonthlyMotoInsuranceCost} placeholder="Ex. 32" />
                      <Field label="Assurance vélo" value={monthlyBikeInsuranceCost} onChange={setMonthlyBikeInsuranceCost} placeholder="Ex. 12" />
                      <Field label="Assurance trottinette" value={monthlyScooterInsuranceCost} onChange={setMonthlyScooterInsuranceCost} placeholder="Ex. 8" />
                      <Field label="Assurance animaux" value={monthlyPetInsuranceCost} onChange={setMonthlyPetInsuranceCost} placeholder="Ex. 24" />
                      <Field label="Assurance habitation" value={monthlyHomeInsuranceCost} onChange={setMonthlyHomeInsuranceCost} placeholder="Ex. 18" />
                      <Field label="Mutuelle santé" value={monthlyMutuelleCost} onChange={setMonthlyMutuelleCost} placeholder="Ex. 74" />
                    </div>
                  </>
                )}

                {step === (isCrossBorderWorker ? 8 : 6) && (
                  <>
                    <h1 className="text-3xl font-semibold">Combien dépenses-tu en abonnements chaque mois ?</h1>
                    <p className="mt-3 text-slate-300">
                      Streaming, apps, salles de sport, logiciels… c’est souvent là que l’argent fuit en silence.
                    </p>
                    <div className="mt-6">
                      <Field label="Abonnements mensuels" value={monthlySubscriptionsCost} onChange={setMonthlySubscriptionsCost} placeholder="Ex. 64" />
                    </div>
                  </>
                )}

                {step === (isCrossBorderWorker ? 9 : 7) && (
                  <>
                    <h1 className="text-3xl font-semibold">Quel est ton objectif principal ?</h1>
                    <div className="mt-6 grid gap-3">
                      {goals.map((item) => (
                        <Choice key={item} selected={goal === item} onClick={() => setGoal(item)}>
                          {item}
                        </Choice>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={() => setStep((current) => Math.max(1, current - 1))}
                disabled={step === 1}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Retour
              </button>
              <button
                onClick={nextStep}
                disabled={!canContinue}
                className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === stepLabels.length ? "Voir mes économies" : "Continuer"}
              </button>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Pourquoi ces questions ?</p>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
              <p>CompareTesFactures ne pousse pas une offre au hasard : il estime d’abord où ton argent s’échappe.</p>
              <p>Plus le profil est précis, plus la recommandation peut devenir utile — et crédible.</p>
              <p className="text-emerald-300">Tes données restent privées et tu gardes le contrôle.</p>
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}


function Choice({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
        selected
          ? "border-cyan-300/40 bg-cyan-400/10 text-white"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-40"
      />
    </label>
  );
}

function getOrCreateAnonymousId() {
  const storageKey = "ctf-anonymous-id";
  const existing = window.localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

  const nextId = crypto.randomUUID();
  window.localStorage.setItem(storageKey, nextId);
  return nextId;
}

function saveDiagnosticLocally(answers: DiagnosticAnswers) {
  window.localStorage.setItem(
    "ctf-last-diagnostic",
    JSON.stringify({
      answers,
      savedAt: new Date().toISOString(),
    }),
  );
}
