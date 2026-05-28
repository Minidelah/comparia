import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — CompareTesFactures",
  description: "Informations légales, éditeur, hébergement et responsabilités de CompareTesFactures.",
};

export default function LegalNoticePage() {
  return (
    <LegalPageShell
      eyebrow="Cadre légal"
      title="Mentions légales"
      description="Une page claire pour identifier l’éditeur, comprendre le rôle de CompareTesFactures et rassurer utilisateurs comme partenaires."
    >
      <h2>Éditeur du site</h2>
      <ul>
        <li>
          <strong>Nom commercial :</strong> {siteConfig.name}
        </li>
        <li>
          <strong>Éditeur :</strong> {siteConfig.legal.editorName}
        </li>
        <li>
          <strong>Statut :</strong> {siteConfig.legal.editorStatus}
        </li>
        <li>
          <strong>Identifiant administratif :</strong> {siteConfig.legal.companyId}
        </li>
        <li>
          <strong>Adresse :</strong> {siteConfig.legal.address}
        </li>
        <li>
          <strong>Contact :</strong> <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </li>
      </ul>

      <h2>Direction de la publication</h2>
      <p>Le directeur de la publication est {siteConfig.legal.publicationDirector}.</p>

      <h2>Hébergement</h2>
      <p>{siteConfig.legal.hosting}. Les informations définitives de l’hébergeur de production doivent être vérifiées avant publication officielle.</p>

      <h2>Nature du service</h2>
      <p>
        CompareTesFactures est un service d’aide à la comparaison. Le site présente des estimations, des informations commerciales et des offres partenaires selon les réponses
        fournies par l’utilisateur. CompareTesFactures ne remplace pas un conseil financier, juridique, fiscal ou assurantiel personnalisé.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations affichées sont fournies à titre indicatif. Les tarifs, conditions, garanties, commissions, bonus et disponibilités peuvent évoluer chez les
        partenaires. Avant toute souscription, l’utilisateur doit vérifier les conditions contractuelles directement auprès du partenaire concerné.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, interfaces, visuels, composants, bases de données, tunnels de comparaison et éléments de marque de CompareTesFactures sont protégés. Toute reproduction,
        extraction automatisée, copie substantielle ou réutilisation non autorisée est interdite. Les marques et logos de partenaires appartiennent à leurs
        propriétaires respectifs et peuvent être utilisés à titre d’identification ou dans le cadre de relations d’affiliation.
      </p>

      <h2>Références utiles</h2>
      <p>
        Pour le cadre général des obligations d’un site professionnel, voir les informations publiques de{" "}
        <a href="https://www.service-public.fr/professionnels-entreprises/vosdroits/F31228" target="_blank" rel="noreferrer">
          Service-Public.fr
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
