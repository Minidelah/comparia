"use client";

import { useState } from "react";

type ImportSummary = {
  programmesFetched: number;
  matchedProgrammes: number;
  offersPrepared: number;
  offersImported: number;
  couponsFetched: number;
  couponsPrepared: number;
  couponsImported: number;
  couponsExpired: number;
  categories: Record<string, number>;
  warnings: string[];
  sample: {
    categorySlug: string;
    provider: string;
    title: string;
    hasAffiliateUrl: boolean;
  }[];
};

type TransactionSyncSummary = {
  startDate: string;
  endDate: string;
  transactionsFetched: number;
  conversionsImported: number;
  matchedOffers: number;
  unmatchedTransactions: number;
  totalCommission: number;
  statuses: Record<string, number>;
  warnings: string[];
};

export default function AdminAwinImportButton() {
  const [loading, setLoading] = useState(false);
  const [syncingTransactions, setSyncingTransactions] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [transactionSummary, setTransactionSummary] = useState<TransactionSyncSummary | null>(null);
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

  async function syncTransactions() {
    setSyncingTransactions(true);
    setError(null);
    setTransactionSummary(null);

    try {
      const token = new URLSearchParams(window.location.search).get("token");
      const response = await fetch("/api/admin/awin/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ days: 31 }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof payload.error === "string" ? payload.error : "Synchronisation Awin impossible.");
      }

      setTransactionSummary(payload as TransactionSyncSummary);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Synchronisation Awin impossible.");
    } finally {
      setSyncingTransactions(false);
    }
  }

  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">Awin connecté</p>
          <p className="mt-1 text-cyan-100/70">Importe les offres, puis synchronise les transactions réelles Awin dans Supabase.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={importOffers}
            disabled={loading || syncingTransactions}
            className="rounded-2xl bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Import en cours…" : "Importer offres + coupons"}
          </button>
          <button
            type="button"
            onClick={syncTransactions}
            disabled={loading || syncingTransactions}
            className="rounded-2xl border border-white/15 bg-slate-950/60 px-4 py-2 font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {syncingTransactions ? "Sync en cours…" : "Sync conversions"}
          </button>
        </div>
      </div>

      {summary && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-cyan-50">
          <p className="font-semibold">
            {summary.offersImported} offres + {summary.couponsImported} coupon{summary.couponsImported > 1 ? "s" : ""} importé
            {summary.couponsImported > 1 ? "s" : ""} sur {summary.programmesFetched} programmes analysés.
          </p>
          <p className="mt-1 text-cyan-100/70">
            {summary.matchedProgrammes} correspondances détectées · {summary.offersPrepared} offres préparées · {summary.couponsPrepared} coupon
            {summary.couponsPrepared > 1 ? "s" : ""} préparé{summary.couponsPrepared > 1 ? "s" : ""}.
            {summary.couponsExpired > 0 ? ` ${summary.couponsExpired} ancien${summary.couponsExpired > 1 ? "s" : ""} coupon${summary.couponsExpired > 1 ? "s" : ""} désactivé${summary.couponsExpired > 1 ? "s" : ""}.` : ""}
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

      {transactionSummary && (
        <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-emerald-50">
          <p className="font-semibold">
            {transactionSummary.conversionsImported} conversion{transactionSummary.conversionsImported > 1 ? "s" : ""} synchronisée{transactionSummary.conversionsImported > 1 ? "s" : ""}.
          </p>
          <p className="mt-1 text-emerald-100/70">
            {transactionSummary.transactionsFetched} transaction{transactionSummary.transactionsFetched > 1 ? "s" : ""} Awin · {transactionSummary.matchedOffers} rapprochée{transactionSummary.matchedOffers > 1 ? "s" : ""} d’une offre · commission {formatEuro(transactionSummary.totalCommission)}.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(transactionSummary.statuses).map(([status, count]) => (
              <span key={status} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                {status} · {count}
              </span>
            ))}
            {transactionSummary.unmatchedTransactions > 0 && (
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-100">
                non rapprochées · {transactionSummary.unmatchedTransactions}
              </span>
            )}
          </div>
          {transactionSummary.warnings.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-amber-100">
              {transactionSummary.warnings.slice(0, 3).map((warning) => (
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

function formatEuro(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0€";
  return `${value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}€`;
}
