export const siteConfig = {
  name: "Comparia",
  tagline: "Comparateurs intelligents",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.comparetesfactures.fr",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@comparetesfactures.fr",
  privacyEmail: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || "privacy@comparetesfactures.fr",
  legal: {
    editorName: process.env.NEXT_PUBLIC_LEGAL_EDITOR_NAME || "ELGH",
    editorStatus: process.env.NEXT_PUBLIC_LEGAL_EDITOR_STATUS || "Éditeur indépendant de Comparia",
    companyId:
      process.env.NEXT_PUBLIC_LEGAL_COMPANY_ID ||
      "Informations administratives disponibles sur demande avant finalisation de la mise en production publique",
    address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS || "France",
    publicationDirector: process.env.NEXT_PUBLIC_LEGAL_PUBLICATION_DIRECTOR || "ELGH",
    hosting:
      process.env.NEXT_PUBLIC_LEGAL_HOSTING ||
      "Vercel Inc. pour l’application web ; Supabase pour l’infrastructure de données",
  },
};
