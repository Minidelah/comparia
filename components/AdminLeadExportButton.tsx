"use client";

import { useState } from "react";

export type ExportableLead = {
  createdAt: string;
  firstName: string;
  email: string;
  phone: string;
  category: string;
  source: string;
  score: string;
  consent: string;
  answers: string;
};

export default function AdminLeadExportButton({ leads }: { leads: ExportableLead[] }) {
  const [exported, setExported] = useState(false);

  const exportCsv = () => {
    const headers = ["Date", "Prenom", "Email", "Telephone", "Categorie", "Source", "Score", "Consentement", "Reponses"];
    const rows = leads.map((lead) => [
      lead.createdAt,
      lead.firstName,
      lead.email,
      lead.phone,
      lead.category,
      lead.source,
      lead.score,
      lead.consent,
      lead.answers,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(toCsvCell).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comparia-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExported(true);
    window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={exportCsv}
      disabled={leads.length === 0}
      className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {exported ? "CSV exporté" : `Exporter CSV (${leads.length})`}
    </button>
  );
}

function toCsvCell(value: string) {
  const safe = value.replace(/\r?\n|\r/g, " ").trim();
  return `"${safe.replaceAll('"', '""')}"`;
}
