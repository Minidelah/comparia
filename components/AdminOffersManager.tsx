"use client";

import { useMemo, useState } from "react";

export type AdminOfferRow = {
  id: string;
  category: string;
  provider: string;
  title: string;
  monthly_cost: number | null;
  annual_savings_estimate: number | null;
  affiliate_url: string | null;
  cashback_amount: number | null;
  sponsored: boolean | null;
  active: boolean | null;
  metadata: Record<string, unknown> | null;
  click_count: number;
  created_at: string;
};

type EditableOfferState = {
  annualSavings: string;
  cashback: string;
  priority: string;
};

type NewOfferState = {
  category: string;
  provider: string;
  title: string;
  affiliateUrl: string;
  description: string;
  monthlyCost: string;
  annualSavings: string;
  cashback: string;
  priority: string;
  sponsored: boolean;
};

type Props = {
  offers: AdminOfferRow[];
};

const priorityCategories = [
  "box-internet",
  "forfait-mobile",
  "electricite",
  "gaz",
  "assurance-habitation",
  "assurance-auto",
  "mutuelle-sante",
  "banque",
  "change-chf-eur",
];

export default function AdminOffersManager({ offers }: Props) {
  const [rows, setRows] = useState(offers);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createDraft, setCreateDraft] = useState<NewOfferState>({
    category: "box-internet",
    provider: "",
    title: "",
    affiliateUrl: "",
    description: "",
    monthlyCost: "",
    annualSavings: "",
    cashback: "",
    priority: "80",
    sponsored: false,
  });
  const [drafts, setDrafts] = useState<Record<string, EditableOfferState>>(() =>
    Object.fromEntries(offers.map((offer) => [offer.id, buildDraft(offer)])),
  );

  const grouped = useMemo(() => {
    return rows.reduce<Record<string, AdminOfferRow[]>>((acc, offer) => {
      acc[offer.category] = [...(acc[offer.category] ?? []), offer];
      return acc;
    }, {});
  }, [rows]);

  async function updateOffer(offerId: string, patch: Record<string, unknown>) {
    const draft = drafts[offerId];
    setSavingId(offerId);
    setMessage(null);
    setError(null);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await fetch("/api/admin/offers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          offerId,
          annualSavings: parseOptionalNumber(draft?.annualSavings),
          cashbackAmount: parseOptionalNumber(draft?.cashback),
          priority: parseOptionalNumber(draft?.priority),
          ...patch,
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Mise à jour impossible.");
      }

      const updated = payload.offer as AdminOfferRow;
      setRows((current) => current.map((offer) => (offer.id === offerId ? { ...offer, ...updated } : offer)));
      setDrafts((current) => ({ ...current, [offerId]: buildDraft({ ...rows.find((offer) => offer.id === offerId), ...updated } as AdminOfferRow) }));
      setMessage("Offre mise à jour.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Mise à jour impossible.");
    } finally {
      setSavingId(null);
    }
  }

  async function createOffer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingId("new-offer");
    setMessage(null);
    setError(null);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await fetch("/api/admin/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          category: createDraft.category,
          provider: createDraft.provider,
          title: createDraft.title,
          affiliateUrl: createDraft.affiliateUrl,
          description: createDraft.description,
          monthlyCost: parseOptionalNumber(createDraft.monthlyCost),
          annualSavings: parseOptionalNumber(createDraft.annualSavings),
          cashbackAmount: parseOptionalNumber(createDraft.cashback),
          priority: parseOptionalNumber(createDraft.priority),
          sponsored: createDraft.sponsored,
          active: true,
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Création impossible.");
      }

      const created = payload.offer as AdminOfferRow;
      setRows((current) => [created, ...current]);
      setDrafts((current) => ({ ...current, [created.id]: buildDraft(created) }));
      setCreateDraft({
        category: "box-internet",
        provider: "",
        title: "",
        affiliateUrl: "",
        description: "",
        monthlyCost: "",
        annualSavings: "",
        cashback: "",
        priority: "80",
        sponsored: false,
      });
      setCreateOpen(false);
      setMessage("Offre partenaire ajoutée.");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Création impossible.");
    } finally {
      setSavingId(null);
    }
  }

  function updateDraft(offerId: string, key: keyof EditableOfferState, value: string) {
    setDrafts((current) => ({
      ...current,
      [offerId]: {
        ...(current[offerId] ?? { annualSavings: "", cashback: "", priority: "" }),
        [key]: value,
      },
    }));
  }

  return (
    <section className="mt-5 rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Pilotage offres</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Contrôle manuel de l’affiliation.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            L’algorithme classe automatiquement, mais ici tu peux forcer une offre business : priorité, cashback, statut actif ou sponsorisé.
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
          {rows.length} offre{rows.length > 1 ? "s" : ""} en base
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-cyan-300/15 bg-cyan-400/[0.06] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Ajouter une offre partenaire manuelle</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Pratique pour brancher un lien Awin, un lien de parrainage ou une offre directe sans attendre un import.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCreateOpen((value) => !value)}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
          >
            {createOpen ? "Fermer" : "Ajouter une offre"}
          </button>
        </div>

        {createOpen && (
          <form onSubmit={createOffer} className="mt-4 grid gap-3 lg:grid-cols-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Catégorie</span>
              <select
                value={createDraft.category}
                onChange={(event) => setCreateDraft((current) => ({ ...current, category: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
              >
                {priorityCategories.map((category) => (
                  <option key={category} value={category}>
                    {formatSlug(category)}
                  </option>
                ))}
              </select>
            </label>
            <AdminTextInput label="Partenaire" value={createDraft.provider} required onChange={(value) => setCreateDraft((current) => ({ ...current, provider: value }))} />
            <AdminTextInput label="Nom de l’offre" value={createDraft.title} required onChange={(value) => setCreateDraft((current) => ({ ...current, title: value }))} />
            <AdminTextInput label="Lien affilié" value={createDraft.affiliateUrl} required placeholder="https://... ou /comparateurs/..." onChange={(value) => setCreateDraft((current) => ({ ...current, affiliateUrl: value }))} />
            <div className="lg:col-span-2">
              <AdminTextInput label="Description" value={createDraft.description} onChange={(value) => setCreateDraft((current) => ({ ...current, description: value }))} />
            </div>
            <AdminNumberInput label="Prix €/mois" value={createDraft.monthlyCost} onChange={(value) => setCreateDraft((current) => ({ ...current, monthlyCost: value }))} />
            <AdminNumberInput label="Économie €/an" value={createDraft.annualSavings} onChange={(value) => setCreateDraft((current) => ({ ...current, annualSavings: value }))} />
            <AdminNumberInput label="Cashback €" value={createDraft.cashback} onChange={(value) => setCreateDraft((current) => ({ ...current, cashback: value }))} />
            <AdminNumberInput label="Priorité business" value={createDraft.priority} onChange={(value) => setCreateDraft((current) => ({ ...current, priority: value }))} />
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-slate-200">
              <input
                type="checkbox"
                checked={createDraft.sponsored}
                onChange={(event) => setCreateDraft((current) => ({ ...current, sponsored: event.target.checked }))}
                className="h-4 w-4 accent-cyan-400"
              />
              Offre sponsorisée
            </label>
            <button
              type="submit"
              disabled={savingId === "new-offer"}
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-60"
            >
              {savingId === "new-offer" ? "Ajout…" : "Créer l’offre"}
            </button>
          </form>
        )}
      </div>

      {(message || error) && (
        <div className={`mt-4 rounded-2xl border p-4 text-sm ${error ? "border-rose-300/20 bg-rose-300/10 text-rose-100" : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"}`}>
          {error ?? message}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {Object.entries(grouped).map(([category, categoryOffers]) => (
          <div key={category}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{formatSlug(category)}</h3>
              <span className="text-xs text-slate-500">{categoryOffers.length} offre{categoryOffers.length > 1 ? "s" : ""}</span>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {categoryOffers.map((offer) => {
                const draft = drafts[offer.id] ?? buildDraft(offer);
                const priority = getPriority(offer);
                return (
                  <article key={offer.id} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${offer.active ? "bg-emerald-400/10 text-emerald-200" : "bg-slate-400/10 text-slate-300"}`}>
                            {offer.active ? "Actif" : "Inactif"}
                          </span>
                          {offer.sponsored && <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">Sponsorisé</span>}
                          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">{offer.click_count} clic{offer.click_count > 1 ? "s" : ""}</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-300">{offer.provider}</p>
                        <h4 className="mt-1 text-lg font-bold text-white">{offer.title}</h4>
                        <p className="mt-2 break-all text-xs text-slate-500">{offer.affiliate_url ? cleanUrlLabel(offer.affiliate_url) : "Aucun lien affilié"}</p>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-2">
                        {offer.affiliate_url && (
                          <a href={offer.affiliate_url} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10">
                            Tester
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => updateOffer(offer.id, { active: !offer.active })}
                          disabled={savingId === offer.id}
                          className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10 disabled:opacity-50"
                        >
                          {offer.active ? "Désactiver" : "Activer"}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateOffer(offer.id, { sponsored: !offer.sponsored })}
                          disabled={savingId === offer.id}
                          className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs font-bold text-amber-100 transition hover:bg-amber-300/20 disabled:opacity-50"
                        >
                          {offer.sponsored ? "Retirer sponsor" : "Sponsor"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <AdminNumberInput label="Économie €/an" value={draft.annualSavings} onChange={(value) => updateDraft(offer.id, "annualSavings", value)} />
                      <AdminNumberInput label="Cashback €" value={draft.cashback} onChange={(value) => updateDraft(offer.id, "cashback", value)} />
                      <AdminNumberInput label="Priorité business" value={draft.priority || String(priority)} onChange={(value) => updateDraft(offer.id, "priority", value)} />
                    </div>

                    <button
                      type="button"
                      onClick={() => updateOffer(offer.id, {})}
                      disabled={savingId === offer.id}
                      className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingId === offer.id ? "Enregistrement…" : "Enregistrer les réglages"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdminNumberInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50"
      />
    </label>
  );
}

function AdminTextInput({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <input
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
      />
    </label>
  );
}

function buildDraft(offer: AdminOfferRow): EditableOfferState {
  return {
    annualSavings: offer.annual_savings_estimate === null ? "" : String(Math.round(offer.annual_savings_estimate)),
    cashback: offer.cashback_amount === null ? "" : String(Math.round(offer.cashback_amount)),
    priority: getPriority(offer) ? String(getPriority(offer)) : "",
  };
}

function getPriority(offer: AdminOfferRow) {
  const value = offer.metadata?.priority;
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 0;
}

function parseOptionalNumber(value?: string) {
  if (value === undefined || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function formatSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function cleanUrlLabel(value: string) {
  try {
    const url = new URL(value);
    return `${url.hostname}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return value;
  }
}
