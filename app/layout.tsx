import type { Metadata } from "next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.comparetesfactures.fr"),
  title: "Comparia — Comparateurs intelligents",
  description: "Compare assurances, énergie, mobile et services pour trouver les meilleures offres.",
  openGraph: {
    title: "Comparia — Comparateurs intelligents",
    description: "Compare assurances, énergie, mobile et services pour trouver les meilleures offres.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/comparia-hero.jpg",
        width: 1100,
        height: 587,
        alt: "Comparia — comparateurs intelligents pour économiser sur tes factures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparia — Comparateurs intelligents",
    description: "Compare assurances, énergie, mobile et services pour trouver les meilleures offres.",
    images: ["/comparia-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
