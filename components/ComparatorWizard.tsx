"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category } from "@/lib/categories";
import BrandIcon, { getCategoryIcon, type IconName } from "@/components/BrandIcon";
import { getAttributionMeta } from "@/lib/analytics/attribution";

type LeadState = "idle" | "saving" | "saved" | "local";
type LeadResponse = { persisted?: boolean; leadId?: string; reason?: string; details?: { message?: string; code?: string } };
type WizardStep = Category["flow"][number];

export default function ComparatorWizard({ category }: { category: Category }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentContact, setConsentContact] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadState, setLeadState] = useState<LeadState>("idle");
  const [leadError, setLeadError] = useState<string | null>(null);

  const leadStorageKey = `ctf_lead_${category.slug}`;
  const funnelConfig = getFunnelConfig(category);
  const flow = useMemo(() => [...category.flow, getIntentStep(category)], [category]);
  const isComplete = step >= flow.length;
  const current = flow[step];
  const progress = leadCaptured ? 100 : isComplete ? 92 : Math.max(18, Math.round(((step + 1) / (flow.length + 1)) * 100));
  const summary = useMemo(() => answers.filter(Boolean), [answers]);
  const intentScore = useMemo(() => calculateIntentScore(summary, category), [summary, category]);
  const emailIsValid = isValidEmail(email);
  const phoneDigits = phone.replace(/\D/g, "").length;
  const phoneIsValid = isValidPhone(phone);
  const submitBlockReason = getSubmitBlockReason({ email, emailIsValid, phone, phoneDigits, phoneIsValid, consentContact });
  const canSubmit = !submitBlockReason;

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      const savedLead = readLeadFromStorage(leadStorageKey);
      if (savedLead) {
        setLeadCaptured(true);
        setLeadState(savedLead.persisted ? "saved" : "local");
        if (typeof savedLead.email === "string") setEmail(savedLead.email);
        if (typeof savedLead.phone === "string") setPhone(savedLead.phone);
        if (typeof savedLead.firstName === "string") setFirstName(savedLead.firstName);
      }
    }, 0);

    trackFunnelEvent("wizard_viewed", category.slug, {
      categoryTitle: category.title,
      categoryGroup: category.group,
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [category.group, category.slug, category.title, leadStorageKey]);

  function choose(option: string) {
    const nextAnswers = [...answers];
    nextAnswers[step] = option;
    setAnswers(nextAnswers);
    setStep((currentStep) => currentStep + 1);

    trackFunnelEvent("wizard_step_answered", category.slug, {
      step: step + 1,
      question: current?.title,
      answer: option,
    });
  }

  function reset() {
    setAnswers([]);
    setStep(0);
    setEmail("");
    setPhone("");
    setFirstName("");
    setConsentContact(false);
    setLeadCaptured(false);
    setLeadState("idle");
    setLeadError(null);
    localStorage.removeItem(leadStorageKey);
    window.dispatchEvent(new CustomEvent("ctf:lead-reset", { detail: { categorySlug: category.slug } }));
  }

  function goBack() {
    setStep((currentStep) => Math.max(0, currentStep - 1));
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    setLeadState("saving");
    setLeadError(null);
    const attribution = getAttributionMeta();
    trackFunnelEvent("lead_submit_clicked", category.slug, { intentScore, answerCount: summary.length, attribution });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email,
          phone,
          consentContact,
          categorySlug: category.slug,
          answers: summary,
          intentScore,
          metadata: {
            categoryTitle: category.title,
            categoryGroup: category.group,
            saving: category.saving,
            path: window.location.pathname,
            attribution,
          },
        }),
      });
      const payload = (await response.json()) as LeadResponse;

      if (!response.ok) {
        throw new Error(payload.reason ?? payload.details?.message ?? "lead_api_rejected");
      }

      const nextState: LeadState = payload.persisted ? "saved" : "local";
      setLeadState(nextState);
      if (!payload.persisted) {
        setLeadError(payload.details?.message ?? payload.reason ?? "Sauvegarde Supabase non confirmée");
      }
      persistLeadLocally(leadStorageKey, {
        email,
        phone,
        firstName,
        leadId: payload.leadId,
        persisted: Boolean(payload.persisted),
      });
      window.dispatchEvent(
        new CustomEvent("ctf:lead-captured", {
          detail: { categorySlug: category.slug, leadId: payload.leadId, persisted: Boolean(payload.persisted) },
        }),
      );
      trackFunnelEvent("lead_captured", category.slug, {
        persisted: Boolean(payload.persisted),
        leadId: payload.leadId,
        intentScore,
        attribution,
      });
    } catch {
      setLeadState("local");
      setLeadError("La route /api/leads n’a pas répondu. Vérifie le terminal npm run dev.");
      persistLeadLocally(leadStorageKey, { email, phone, firstName, persisted: false });
      window.dispatchEvent(new CustomEvent("ctf:lead-captured", { detail: { categorySlug: category.slug, persisted: false } }));
      trackFunnelEvent("lead_capture_failed", category.slug, { reason: "network_or_api_error" });
    }

    setLeadCaptured(true);
  }

  return (
    <section id="devis" className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950/85 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-6 lg:sticky lg:top-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_35%)]" />
      <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
            <BrandIcon name={getCategoryIcon(category.slug)} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{funnelConfig.kicker}</p>
            <p className="mt-2 text-sm text-slate-400">{funnelConfig.promise}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-black text-slate-200">{progress}%</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {!isComplete && current ? (
        <QuestionStep current={current} step={step} categorySlug={category.slug} choose={choose} goBack={goBack} />
      ) : !leadCaptured ? (
        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Résultats prêts</p>
          <h2 className="mt-3 text-2xl font-semibold">{funnelConfig.leadTitle}</h2>
          <p className="mt-2 text-slate-300">{funnelConfig.leadHelper}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ValuePill label="Gain potentiel" value={category.saving} />
            <ValuePill label="Offres filtrées" value={funnelConfig.offerCount} />
            <ValuePill label="Score intention" value={`${intentScore}/100`} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {summary.map((answer) => (
              <span key={answer} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-slate-300">
                {answer}
              </span>
            ))}
          </div>

          <form onSubmit={submitLead} className="mt-6 grid gap-3">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Prénom <span className="text-slate-500">optionnel</span></span>
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Prénom"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Adresse email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="toi@email.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Numéro de téléphone</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="06 12 34 56 78 ou +41 79 123 45 67"
                aria-invalid={phone.length > 0 && !phoneIsValid}
                className={`w-full rounded-2xl border bg-white/[0.04] px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40 ${
                  phone.length > 0 && !phoneIsValid ? "border-amber-300/50" : "border-white/10"
                }`}
              />
              {phone.length > 0 && !phoneIsValid && (
                <span className="mt-2 block text-xs leading-5 text-amber-200">
                  Il manque {Math.max(10 - phoneDigits, 1)} chiffre{Math.max(10 - phoneDigits, 1) > 1 ? "s" : ""}. Mets un numéro complet à 10 chiffres minimum.
                </span>
              )}
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-slate-400">
              <input
                type="checkbox"
                checked={consentContact}
                onChange={(event) => setConsentContact(event.target.checked)}
                className="mt-1 h-4 w-4 accent-cyan-400"
              />
              <span>
                J’accepte d’être contacté au sujet de ma comparaison. Comparia garde mes données protégées et je peux demander leur suppression à tout moment.
              </span>
            </label>
            <button
              type="submit"
              disabled={!canSubmit || leadState === "saving"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3.5 font-black text-slate-950 shadow-xl shadow-cyan-950/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {leadState === "saving" && <BrandIcon name="loader" className="h-4 w-4 animate-spin" />}
              {leadState === "saving" ? "Préparation des offres…" : submitBlockReason ?? "Débloquer mes offres"}
            </button>
          </form>
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={goBack} className="text-sm font-semibold text-slate-400 transition hover:text-white">
              ← Modifier ma dernière réponse
            </button>
            <button type="button" onClick={reset} className="text-sm font-semibold text-slate-500 transition hover:text-white">
              Recommencer
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Offres débloquées</p>
          <h2 className="mt-3 text-2xl font-semibold">Ton comparatif est prêt.</h2>
          <p className="mt-2 text-sm text-slate-400">
            {leadState === "saved" ? "Tes coordonnées ont bien été enregistrées." : "Ton profil est prêt, mais la sauvegarde cloud n’a pas été confirmée."}
          </p>
          {leadState === "local" && leadError && (
            <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              <p className="font-semibold">Sauvegarde non confirmée</p>
              <p className="mt-1">{leadError}</p>
              <p className="mt-2 text-amber-100/80">Le comparatif reste utilisable. Vérifie le dashboard admin si le problème persiste.</p>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {summary.map((answer) => (
              <span key={answer} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-slate-300">
                {answer}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#offres" className="rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-3 text-center font-black text-slate-950">
              Voir les offres maintenant
            </a>
            <button type="button" onClick={reset} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              Recommencer
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}

function QuestionStep({
  current,
  step,
  categorySlug,
  choose,
  goBack,
}: {
  current: WizardStep;
  step: number;
  categorySlug: string;
  choose: (option: string) => void;
  goBack: () => void;
}) {
  const useVisualCards = current.options.length <= 4;

  return (
    <div className="mt-6 fade-in">
      <h2 className="text-2xl font-semibold">{current.title}</h2>
      <p className="mt-2 text-slate-300">{current.helper}</p>
      <div className={`mt-5 grid gap-3 ${useVisualCards ? "sm:grid-cols-3" : ""}`}>
        {current.options.map((option, index) => (
          <OptionCard key={option} option={option} index={index} categorySlug={categorySlug} visual={useVisualCards} onChoose={choose} />
        ))}
      </div>
      {step > 0 && (
        <button type="button" onClick={goBack} className="mt-4 text-sm font-semibold text-slate-400 transition hover:text-white">
          ← Retour
        </button>
      )}
    </div>
  );
}

function OptionCard({
  option,
  index,
  categorySlug,
  visual,
  onChoose,
}: {
  option: string;
  index: number;
  categorySlug: string;
  visual: boolean;
  onChoose: (option: string) => void;
}) {
  const icon = getOptionIcon(option, categorySlug);

  if (!visual) {
    return (
      <button
        type="button"
        onClick={() => onChoose(option)}
        className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-400/10"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-xs font-black text-cyan-200 ring-1 ring-inset ring-white/10">
            {index + 1}
          </span>
          {option}
        </span>
        <BrandIcon name="arrow-right" className="h-4 w-4 shrink-0 text-cyan-300 transition group-hover:translate-x-0.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onChoose(option)}
      className="group min-h-36 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-center shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-orange-300/45 hover:bg-white/[0.085] focus:outline-none focus:ring-2 focus:ring-orange-300/40 sm:min-h-44"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-300/10 text-orange-300 transition group-hover:scale-105 group-hover:bg-orange-300/15 sm:h-16 sm:w-16">
        <BrandIcon name={icon} className="h-8 w-8 sm:h-9 sm:w-9" />
      </span>
      <span className="mt-4 block text-sm font-black uppercase tracking-[0.02em] text-white sm:text-base">
        {option}
      </span>
      <span className="mx-auto mt-3 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-200/70 bg-slate-950/60 text-[11px] font-black text-cyan-100 transition group-hover:border-orange-300 group-hover:text-orange-200">
        {index + 1}
      </span>
    </button>
  );
}

function getOptionIcon(option: string, categorySlug: string): IconName {
  const text = normalizeOption(option);

  if (text.includes("box") && text.includes("mobile") && text.includes("tv")) return "tv";
  if (text.includes("box") && text.includes("mobile")) return "phone";
  if (text.includes("box") || text.includes("internet") || text.includes("fibre") || text.includes("adsl") || text.includes("wifi")) return "router";
  if (text.includes("tv")) return "tv";
  if (text.includes("mobile") || text.includes("data") || text.includes("go") || text.includes("suisse") || text.includes("europe")) return "phone";
  if (text.includes("voiture") || text.includes("auto") || text.includes("citadine") || text.includes("berline") || text.includes("suv") || text.includes("utilitaire")) return "car";
  if (text.includes("moto") || text.includes("scooter") || text.includes("cc")) return "scooter";
  if (text.includes("velo")) return "bike";
  if (text.includes("logement") || text.includes("maison") || text.includes("appartement") || text.includes("studio") || text.includes("locataire") || text.includes("proprietaire")) return "home";
  if (text.includes("chien") || text.includes("chat") || text.includes("animaux")) return "paw";
  if (text.includes("sante") || text.includes("dentaire") || text.includes("optique") || text.includes("hospitalisation") || text.includes("lamal") || text.includes("cmu")) return "heart";
  if (text.includes("gaz") || text.includes("chauffage") || text.includes("cuisine")) return "flame";
  if (text.includes("electricite") || text.includes("verte")) return "bolt";
  if (text.includes("prix") || text.includes("moins") || text.includes("frais") || text.includes("economie") || text.includes("mensualite") || text.includes("cashback")) return "coins";
  if (text.includes("carte") || text.includes("banque") || text.includes("epargne") || text.includes("voyage")) return "credit-card";
  if (text.includes("famille") || text.includes("couple") || text.includes("enfant")) return "users";
  if (text.includes("professionnel") || text.includes("service")) return "briefcase";
  if (text.includes("aujourd") || text.includes("semaine") || text.includes("rapidement")) return "clock";
  if (text.includes("reseau") || text.includes("equilibre") || text.includes("performance")) return "sparkles";

  return getCategoryIcon(categorySlug);
}

function normalizeOption(value: string) {
  return value
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function ValuePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function getIntentStep(category: Category): WizardStep {
  if (category.group === "Assurances") {
    return {
      title: "Tu veux comparer quand ?",
      helper: "Ça nous aide à prioriser les offres les plus simples à activer.",
      options: ["Aujourd’hui", "Cette semaine", "Je regarde seulement"],
    };
  }

  if (category.group === "Frontaliers") {
    return {
      title: "Ton besoin est plutôt…",
      helper: "On adapte le résultat selon le niveau d’urgence.",
      options: ["Réduire mes frais", "Clarifier ma situation", "Trouver un meilleur service"],
    };
  }

  return {
    title: "Tu es prêt à changer si l’offre est meilleure ?",
    helper: "On distingue les curieux des profils prêts à économiser vite.",
    options: ["Oui, rapidement", "Peut-être", "Je veux juste comparer"],
  };
}

function getFunnelConfig(category: Category) {
  if (category.group === "Assurances") {
    return {
      kicker: `Devis ${category.title}`,
      promise: "Garanties utiles, prix et activation rapide.",
      leadTitle: `Tes options ${category.title.toLowerCase()} sont prêtes.`,
      leadHelper: "Laisse tes coordonnées pour débloquer le comparatif et recevoir les offres compatibles avec ton profil.",
      offerCount: "3 à 5 devis",
    };
  }

  if (category.group === "Frontaliers") {
    return {
      kicker: `Comparatif ${category.title}`,
      promise: "Pensé pour les profils France–Suisse.",
      leadTitle: "Ton optimisation frontalier est prête.",
      leadHelper: "Tes réponses permettent de filtrer les solutions utiles sans mélanger les besoins classiques et frontaliers.",
      offerCount: "2 à 4 pistes",
    };
  }

  if (category.group === "Maison") {
    return {
      kicker: `Comparateur ${category.title}`,
      promise: "Facture, usage et économie potentielle.",
      leadTitle: `Ton comparatif ${category.title.toLowerCase()} est prêt.`,
      leadHelper: "On affiche les meilleures options après validation de tes coordonnées pour éviter de perdre ton résultat.",
      offerCount: "3 offres",
    };
  }

  return {
    kicker: `Comparatif ${category.title}`,
    promise: "Simple, rapide et sans engagement.",
    leadTitle: "Tes résultats sont prêts.",
    leadHelper: "Laisse tes coordonnées pour débloquer le comparatif personnalisé.",
    offerCount: "3 options",
  };
}

function calculateIntentScore(answers: string[], category: Category) {
  const answerText = answers.join(" ").toLowerCase();
  let score = 52;

  if (category.saving.includes("jusqu")) score += 8;
  if (answerText.includes("aujourd") || answerText.includes("rapidement")) score += 18;
  if (answerText.includes("cette semaine")) score += 12;
  if (answerText.includes("professionnel") || answerText.includes("quotidien") || answerText.includes("tous les jours")) score += 8;
  if (answerText.includes("je regarde") || answerText.includes("juste comparer")) score -= 8;

  return Math.max(10, Math.min(100, score));
}

function persistLeadLocally(
  key: string,
  value: { email: string; phone: string; firstName: string; leadId?: string; persisted: boolean },
) {
  localStorage.setItem(
    key,
    JSON.stringify({
      ...value,
      capturedAt: new Date().toISOString(),
    }),
  );
}

function readLeadFromStorage(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as { email?: string; phone?: string; firstName?: string; leadId?: string; persisted?: boolean };
  } catch {
    return null;
  }
}

function trackFunnelEvent(eventName: string, categorySlug: string, meta: Record<string, unknown> = {}) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName, categorySlug, meta: { ...meta, attribution: getAttributionMeta() } }),
    keepalive: true,
  }).catch(() => null);
}

function getSubmitBlockReason({
  email,
  emailIsValid,
  phone,
  phoneDigits,
  phoneIsValid,
  consentContact,
}: {
  email: string;
  emailIsValid: boolean;
  phone: string;
  phoneDigits: number;
  phoneIsValid: boolean;
  consentContact: boolean;
}) {
  if (!emailIsValid) return email.trim() ? "Email à vérifier" : "Ajoute ton email";
  if (!phoneIsValid) {
    if (!phone.trim()) return "Ajoute ton téléphone";
    return `Encore ${Math.max(10 - phoneDigits, 1)} chiffre${Math.max(10 - phoneDigits, 1) > 1 ? "s" : ""}`;
  }
  if (!consentContact) return "Coche le consentement";
  return null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}
