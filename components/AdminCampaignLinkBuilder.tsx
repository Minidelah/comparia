"use client";

import { useMemo, useState } from "react";

const CHANNELS = [
  { label: "TikTok", source: "tiktok", medium: "social" },
  { label: "Instagram", source: "instagram", medium: "social" },
  { label: "Facebook", source: "facebook", medium: "social" },
  { label: "Google Ads", source: "google", medium: "cpc" },
  { label: "Email", source: "email", medium: "email" },
  { label: "WhatsApp", source: "whatsapp", medium: "social" },
  { label: "Partenaire", source: "partenaire", medium: "referral" },
];

const DESTINATIONS = [
  { label: "Accueil", path: "/" },
  { label: "Tous les comparateurs", path: "/comparateurs" },
  { label: "Assurance auto", path: "/comparateurs/assurance-auto" },
  { label: "Assurance habitation", path: "/comparateurs/assurance-habitation" },
  { label: "Électricité", path: "/comparateurs/electricite" },
  { label: "Gaz", path: "/comparateurs/gaz" },
  { label: "Forfait mobile", path: "/comparateurs/forfait-mobile" },
  { label: "Assurance animaux", path: "/comparateurs/assurance-animaux" },
  { label: "Frontaliers", path: "/comparateurs/change-chf-eur" },
  { label: "Guides SEO", path: "/guides" },
];

export default function AdminCampaignLinkBuilder({ baseUrl }: { baseUrl: string }) {
  const [source, setSource] = useState("tiktok");
  const [medium, setMedium] = useState("social");
  const [campaign, setCampaign] = useState("test_campagne");
  const [content, setContent] = useState("bio");
  const [path, setPath] = useState("/");
  const [copied, setCopied] = useState(false);

  const generatedUrl = useMemo(() => {
    const url = new URL(joinUrl(baseUrl, path));
    url.searchParams.set("utm_source", slugify(source));
    url.searchParams.set("utm_medium", slugify(medium));
    url.searchParams.set("utm_campaign", slugify(campaign || "campagne"));
    if (content.trim()) url.searchParams.set("utm_content", slugify(content));
    return url.toString();
  }, [baseUrl, campaign, content, medium, path, source]);

  const applyChannel = (channel: (typeof CHANNELS)[number]) => {
    setSource(channel.source);
    setMedium(channel.medium);
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mt-5 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 p-5 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Liens de campagne</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Crée tes liens traçables avant de publier.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Utilise ces URLs dans TikTok, Instagram, Google Ads, email ou partenariats. L’admin saura ensuite quelle source génère les visiteurs, leads et clics affiliés.
          </p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
        >
          {copied ? "Lien copié" : "Copier le lien"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Canal rapide</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CHANNELS.map((channel) => (
              <button
                key={channel.label}
                type="button"
                onClick={() => applyChannel(channel)}
                className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                  source === channel.source
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10"
                }`}
              >
                {channel.label}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" htmlFor="campaign-destination">
            Destination
          </label>
          <select
            id="campaign-destination"
            value={path}
            onChange={(event) => setPath(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60"
          >
            {DESTINATIONS.map((destination) => (
              <option key={destination.path} value={destination.path}>
                {destination.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <CampaignInput label="Source" value={source} onChange={setSource} />
            <CampaignInput label="Medium" value={medium} onChange={setMedium} />
            <CampaignInput label="Campaign" value={campaign} onChange={setCampaign} />
            <CampaignInput label="Content" value={content} onChange={setContent} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Lien généré</p>
            <p className="mt-3 break-all text-sm font-semibold leading-6 text-cyan-100">{generatedUrl}</p>
          </div>

          <div className="mt-4 grid gap-3 text-xs leading-5 text-slate-400 sm:grid-cols-3">
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Post TikTok : source=tiktok, medium=social.</p>
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Pub Google : source=google, medium=cpc.</p>
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">Email : source=email, medium=email.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CampaignInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm normal-case tracking-normal text-white outline-none transition focus:border-cyan-300/60"
      />
    </label>
  );
}

function joinUrl(baseUrl: string, path: string) {
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}
