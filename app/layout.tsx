import type { Metadata } from "next";
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
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
