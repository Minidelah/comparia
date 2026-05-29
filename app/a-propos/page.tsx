import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos — Comparia",
  description: "Mission, méthode et positionnement de Comparia, comparateur intelligent orienté économies du quotidien.",
};

export default function AboutPage() {
  return (
    <LegalPageShell
      eyebrow="À propos"
      title="Un comparateur pensé pour les décisions utiles, pas pour noyer l’utilisateur."
      description="Comparia aide les particuliers à comparer leurs contrats du quotidien avec une approche simple, transparente et centrée sur les économies utiles."
    >
      <h2>Notre mission</h2>
      <p>
        Comparia accompagne les utilisateurs qui veulent réduire leurs dépenses contraintes : assurances, énergie, mobile, box internet, banque, services du foyer et
        besoins spécifiques des frontaliers France-Suisse.
      </p>

      <h2>Pourquoi Comparia existe</h2>
      <p>
        Beaucoup de comparateurs affichent une liste d’offres sans suffisamment expliquer pourquoi une offre est pertinente. Comparia structure le parcours autour de
        quelques questions simples, d’un résultat compréhensible et d’une mise en relation claire.
      </p>

      <h2>Notre méthode</h2>
      <ul>
        <li>Identifier la catégorie où l’économie potentielle est la plus forte.</li>
        <li>Collecter uniquement les informations utiles à la comparaison.</li>
        <li>Afficher les économies estimées avant le clic.</li>
        <li>Distinguer les offres sponsorisées, les cashbacks et les recommandations principales.</li>
        <li>Améliorer les recommandations grâce aux retours et aux résultats observés.</li>
      </ul>

      <h2>Pour les partenaires</h2>
      <p>
        Comparia travaille avec des partenaires capables de proposer des offres claires, utiles et cohérentes avec les profils comparés. Les partenaires peuvent nous contacter à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <p>
        <Link href="/contact">Contacter Comparia</Link>
      </p>
    </LegalPageShell>
  );
}
