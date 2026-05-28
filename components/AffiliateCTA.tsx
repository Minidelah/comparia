"use client";

import { trackAffiliateClick } from "@/lib/affiliate/tracking";
import { cn } from "@/lib/utils";

type Props = {
  offerId: string;
  categorySlug?: string;
  href?: string;
  label: string;
  className?: string;
};

export default function AffiliateCTA({
  offerId,
  categorySlug,
  href = "/onboarding",
  label,
  className,
}: Props) {
  async function handleClick() {
    const lead = categorySlug ? readLead(categorySlug) : null;

    await trackAffiliateClick({
      offerId,
      category: categorySlug,
      affiliateLink: href,
      leadId: lead?.leadId,
      source: "comparator_detail",
    }).catch(() => null);

    window.location.href = href;
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-cyan-500/30",
        className,
      )}
    >
      {label}
    </button>
  );
}

function readLead(categorySlug: string) {
  try {
    const raw = localStorage.getItem(`ctf_lead_${categorySlug}`);
    if (!raw) return null;
    return JSON.parse(raw) as { leadId?: string };
  } catch {
    return null;
  }
}
