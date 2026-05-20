import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Comparia",
  description: "Données collectées, finalités, durée de conservation et droits des utilisateurs Comparia.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      description="Comparia collecte uniquement les informations nécessaires pour fournir une comparaison, suivre les demandes et améliorer le tunnel de conversion."
    >
      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement est {siteConfig.legal.editorName}, éditeur de {siteConfig.name}. Pour toute demande liée aux données personnelles :{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Identité de contact : prénom, email, numéro de téléphone.</li>
        <li>Réponses au comparateur : catégorie, choix sélectionnés, estimation de besoin ou de budget.</li>
        <li>Données techniques : page consultée, source de trafic, navigateur, horodatage, événements du tunnel.</li>
        <li>Données d’affiliation : clics vers une offre partenaire, catégorie concernée, identifiant de lead si disponible.</li>
      </ul>

      <h2>Finalités</h2>
      <ul>
        <li>Fournir le résultat du comparateur et débloquer les offres adaptées.</li>
        <li>Recontacter l’utilisateur uniquement lorsqu’il a donné son consentement.</li>
        <li>Mesurer la performance du tunnel : pages vues, leads, offres débloquées, clics affiliés.</li>
        <li>Améliorer les recommandations et prioriser les catégories utiles.</li>
        <li>Respecter les obligations légales et gérer les demandes de suppression ou d’accès.</li>
      </ul>

      <h2>Bases légales</h2>
      <p>
        Selon le contexte, les traitements reposent sur le consentement de l’utilisateur, l’exécution d’une demande de comparaison, l’intérêt légitime de Comparia à
        mesurer ses performances ou le respect d’obligations légales.
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont accessibles aux outils techniques nécessaires au fonctionnement du service, notamment l’hébergement, la base de données et les outils
        d’affiliation. Les partenaires ne reçoivent des informations que lorsque cela est nécessaire à la mise en relation, au suivi de conversion ou à la demande
        explicite de l’utilisateur.
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Leads et demandes de comparaison : jusqu’à 36 mois après le dernier contact ou la dernière interaction utile.</li>
        <li>Événements analytics internes : jusqu’à 25 mois.</li>
        <li>Données nécessaires à la preuve du consentement : durée requise pour démontrer le respect des obligations applicables.</li>
      </ul>

      <h2>Droits des utilisateurs</h2>
      <p>
        L’utilisateur peut demander l’accès, la rectification, l’effacement, la limitation, l’opposition ou la portabilité de ses données. Il peut également retirer son
        consentement à la prospection. Les demandes sont à envoyer à{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>

      <h2>Sécurité</h2>
      <p>
        Comparia applique une logique de minimisation, de limitation des accès et de séparation entre les clés publiques et les clés serveur. Les clés sensibles ne sont
        pas exposées côté navigateur.
      </p>

      <h2>Références utiles</h2>
      <p>
        Pour mieux comprendre les droits RGPD et les obligations de transparence, consulter les ressources de la{" "}
        <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank" rel="noreferrer">
          CNIL
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
