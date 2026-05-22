export type AffiliateLeverStatus = "allowed" | "conditional" | "forbidden";

export type AffiliateComplianceRule = {
  partnerSlug: string;
  brandName: string;
  providerMatchers: string[];
  riskLevel: "low" | "medium" | "high";
  summary: string;
  allowedLevers: string[];
  conditionalLevers: string[];
  forbiddenLevers: string[];
  negativeKeywords: string[];
  blockedKeywords: string[];
  notes: string[];
};

export type ComplianceOfferInput = {
  id: string;
  provider: string;
  title: string;
  affiliate_url: string | null;
  active: boolean | null;
  metadata: Record<string, unknown> | null;
};

export type ComplianceOfferCheck = {
  offerId: string;
  provider: string;
  title: string;
  active: boolean;
  rule: AffiliateComplianceRule;
  status: "ok" | "warning";
  warnings: string[];
};

export const affiliateComplianceRules: AffiliateComplianceRule[] = [
  {
    partnerSlug: "helios-fr",
    brandName: "helios FR",
    providerMatchers: ["helios", "hélios", "helios fr", "hélios fr"],
    riskLevel: "high",
    summary: "Programme compatible avec un comparateur, mais PPC marque strictement interdit.",
    allowedLevers: ["Cashback", "Bon de réduction", "Comparateurs de prix", "Content to commerce", "Display"],
    conditionalLevers: ["Blogs / portails", "Influence marketing", "E-mailing / newsletter", "Retargeting", "Community", "Loyalty"],
    forbiddenLevers: ["SEM sur marque helios", "Search/PPC avec nom de marque", "Display URL contenant helios en paid search"],
    negativeKeywords: [
      "helios",
      "hélios",
      "helios banque",
      "hélios banque",
      "banque helios",
      "banque hélios",
      "avis helios",
      "avis hélios",
      "parrainage helios",
      "parrainage hélios",
      "banque écologie",
      "banque ecologie",
      "banque éthique",
      "banque ethique",
    ],
    blockedKeywords: ["helios", "hélios", "banque écologie", "banque ecologie", "banque éthique", "banque ethique"],
    notes: [
      "Ajouter helios et variantes en mots-clés négatifs avant toute campagne Google/Bing.",
      "Ne pas créer d’annonce payante ciblant la marque ou ses fautes d’orthographe.",
      "Éviter une page SEO dédiée à la marque tant que le programme ne l’autorise pas explicitement.",
      "Afficher l’offre dans une carte comparateur générique reste cohérent avec le levier comparateur autorisé.",
    ],
  },
];

export function getComplianceRuleForPartner(provider: string, title = "") {
  const text = normalizeComplianceText(`${provider} ${title}`);
  return affiliateComplianceRules.find((rule) => rule.providerMatchers.some((matcher) => text.includes(normalizeComplianceText(matcher)))) ?? null;
}

export function getComplianceMetadataForPartner(provider: string, title = "") {
  const rule = getComplianceRuleForPartner(provider, title);
  if (!rule) return null;

  return {
    partnerSlug: rule.partnerSlug,
    brandName: rule.brandName,
    riskLevel: rule.riskLevel,
    allowedLevers: rule.allowedLevers,
    conditionalLevers: rule.conditionalLevers,
    forbiddenLevers: rule.forbiddenLevers,
    negativeKeywords: rule.negativeKeywords,
    blockedKeywords: rule.blockedKeywords,
    notes: rule.notes,
  };
}

export function buildComplianceChecksForOffers(offers: ComplianceOfferInput[]) {
  return offers
    .map((offer) => {
      const rule = getComplianceRuleForPartner(offer.provider, offer.title);
      if (!rule) return null;

      const warnings = buildOfferWarnings(offer, rule);
      return {
        offerId: offer.id,
        provider: offer.provider,
        title: offer.title,
        active: offer.active !== false,
        rule,
        status: warnings.length > 0 ? "warning" : "ok",
        warnings,
      } satisfies ComplianceOfferCheck;
    })
    .filter((check): check is ComplianceOfferCheck => Boolean(check));
}

export function isKeywordBlockedForPartner(keyword: string, partnerSlug: string) {
  const rule = affiliateComplianceRules.find((item) => item.partnerSlug === partnerSlug);
  if (!rule) return false;

  const text = normalizeComplianceText(keyword);
  return rule.blockedKeywords.some((blocked) => text.includes(normalizeComplianceText(blocked)));
}

function buildOfferWarnings(offer: ComplianceOfferInput, rule: AffiliateComplianceRule) {
  const warnings: string[] = [];
  const metadataCompliance = offer.metadata?.compliance;

  if (!metadataCompliance) {
    warnings.push("Règle compliance non encore enregistrée dans metadata.compliance : réimporte l’offre Awin pour l’inscrire automatiquement.");
  }

  if (rule.riskLevel === "high") {
    warnings.push("Risque PPC élevé : ne jamais utiliser cette marque en mot-clé payé.");
  }

  return warnings;
}

function normalizeComplianceText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}
