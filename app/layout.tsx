import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { siteConfig } from "@/lib/site";
import "./globals.css";

function normalizeGoogleSiteVerification(value?: string) {
  if (!value) return undefined;

  const trimmed = value.trim();
  const contentMatch = trimmed.match(/content=["']([^"']+)["']/i);

  return (contentMatch?.[1] ?? trimmed).trim();
}

const googleSiteVerification = normalizeGoogleSiteVerification(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION);

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
const defaultDescription =
  "Compare tes factures : assurances, énergie, mobile et abonnements. Diagnostic gratuit, offres classées et économies estimées sur comparetesfactures.fr.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/comparia-hero.jpg",
        width: 1100,
        height: 587,
        alt: `${siteConfig.name} — comparateur de factures et contrats pour économiser chaque mois`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/comparia-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
