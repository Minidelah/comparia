const partners = [
  { name: "Revolut", domain: "revolut.com" },
  { name: "Wise", domain: "wise.com" },
  { name: "Boursobank", domain: "boursobank.com" },
  { name: "Fortuneo", domain: "fortuneo.fr" },
  { name: "Hello bank!", domain: "hellobank.fr" },
  { name: "Acheel", domain: "acheel.com" },
  { name: "Alan", domain: "alan.com" },
  { name: "April", domain: "april.fr" },
  { name: "EDF", domain: "edf.fr" },
  { name: "Engie", domain: "engie.fr" },
  { name: "OHM Énergie", domain: "ohm-energie.com" },
  { name: "TotalEnergies", domain: "totalenergies.fr" },
  { name: "Octopus Energy", domain: "octopusenergy.fr" },
  { name: "Sosh", domain: "sosh.fr" },
  { name: "Free", domain: "free.fr" },
  { name: "B&You", domain: "bouyguestelecom.fr" },
  { name: "RED", domain: "red-by-sfr.fr" },
  { name: "Orange", domain: "orange.fr" },
  { name: "Netflix", domain: "netflix.com" },
  { name: "Prime Video", domain: "primevideo.com" },
];

function getLogoUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`;
}

export default function PartnerMarquee() {
  const loop = [...partners, ...partners];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <div className="px-5 pb-3 text-center text-xs font-semibold tracking-[0.22em] text-slate-300">
        Écosystème partenaires
      </div>
      <div className="overflow-hidden">
        <div className="animate-logo-marquee flex w-max min-w-full gap-3">
          {loop.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex min-w-44 items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-sm shadow-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getLogoUrl(partner.domain)}
                  alt=""
                  width={28}
                  height={28}
                  loading="lazy"
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="text-sm font-semibold text-slate-100">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
