import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transparence affiliation — Comparia",
  description: "Comment Comparia gagne de l’argent, classe les offres et signale les liens affiliés.",
};

export default function AffiliateTransparencyPage() {
  return (
    <LegalPageShell
      eyebrow="Affiliation"
      title="Transparence sur le modèle économique"
      description="Comparia peut être rémunéré par certains partenaires. Cette page explique le fonctionnement pour éviter toute ambiguïté."
    >
      <h2>Comment Comparia gagne de l’argent</h2>
      <p>
        Comparia peut percevoir une commission lorsqu’un utilisateur clique sur une offre partenaire, demande un devis, ouvre un compte ou souscrit un service via un
        lien suivi. Cette rémunération permet de garder le comparateur gratuit pour l’utilisateur.
      </p>

      <h2>Ce que cela ne change pas</h2>
      <ul>
        <li>Les offres sponsorisées doivent rester identifiables.</li>
        <li>Une rémunération partenaire ne doit pas masquer les critères de comparaison importants.</li>
        <li>Le choix final appartient toujours à l’utilisateur.</li>
        <li>Les estimations d’économie restent indicatives et doivent être vérifiées chez le partenaire.</li>
      </ul>

      <h2>Classement des offres</h2>
      <p>Comparia peut utiliser plusieurs signaux pour organiser les résultats :</p>
      <ul>
        <li>adéquation avec les réponses de l’utilisateur ;</li>
        <li>économie annuelle estimée ;</li>
        <li>garanties, niveau de service, conditions et simplicité de souscription ;</li>
        <li>cashback ou avantage d’activation ;</li>
        <li>statut sponsorisé lorsqu’il existe.</li>
      </ul>

      <h2>Partenaires et annonceurs</h2>
      <p>
        Comparia travaille ou peut candidater auprès de réseaux d’affiliation, comparateurs, assureurs, banques, opérateurs, fournisseurs d’énergie et services utiles au
        foyer. Les logos et noms de partenaires peuvent être affichés pour indiquer l’écosystème visé ou les offres disponibles.
      </p>

      <h2>Signalement d’une erreur</h2>
      <p>
        Si une offre semble incorrecte, périmée ou mal signalée, contactez-nous à{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. L’objectif est de corriger vite, pas de laisser une zone floue.
      </p>
    </LegalPageShell>
  );
}
