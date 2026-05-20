"use client";

import { useState } from "react";

type ImportSummary = {
  programmesFetched: number;
  matchedProgrammes: number;
  offersPrepared: number;
  offersImported: number;
  categories: Record<string, number>;
  warnings: string[];
  sample: {
    categorySlug: string;
    provider: string;
    title: string;
    hasAffiliateUrl: boolean;
  }[];
};

export default function AdminAwinImportButton() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function importOffers() {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await fetch("/api/admin/awin/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ dryRun: false }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Import Awin impossible.");
      }

      setSummary(payload as ImportSummary);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Import Awin impossible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Awin connecté</p>
          <p className="mt-1 text-cyan-100/70">Importe les programmes acceptés et crée les offres Supabase automatiquement.</p>
        </div>
        <button
          type="button"
          onClick={importOffers}
          disabled={loading}
          className="rounded-2xl bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Import en cours…" : "Importer Awin"}
        </button>
      </div>

      {summary && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-cyan-50">
          <p className="font-semibold">
            {summary.offersImported} offres importées sur {summary.programmesFetched} programmes analysés.
          </p>
          <p className="mt-1 text-cyan-100/70">
            {summary.matchedProgrammes} correspondances détectées · {summary.offersPrepared} offres préparées.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(summary.categories).map(([category, count]) => (
              <span key={category} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                {category} · {count}
              </span>
            ))}
          </div>
          {summary.warnings.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-amber-100">
              {summary.warnings.slice(0, 3).map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-rose-100">
          {error.includes("SUPABASE_OFFERS_IMPORT_FAILED") ? (
            <p>
              Supabase bloque l’écriture dans <strong>offers</strong>. Lance la migration/GRANT puis réessaie.
            </p>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
