import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique cookies — Comparia",
  description: "Utilisation des cookies, stockage local, mesure interne et liens affiliés Comparia.",
};

export default function CookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Cookies"
      title="Politique cookies et traceurs"
      description="Comparia limite les traceurs au strict nécessaire pour le fonctionnement du service et la mesure interne du tunnel."
    >
      <h2>Cookies utilisés par Comparia</h2>
      <p>
        À ce stade, Comparia n’utilise pas de cookie publicitaire tiers sur le site. Le service peut utiliser du stockage local ou des événements serveur pour garder la
        continuité du parcours, par exemple l’identifiant d’un lead après validation du formulaire ou un identifiant visiteur pseudonyme pour la mesure d’audience interne.
      </p>

      <h2>Mesure d’audience interne</h2>
      <p>
        Comparia mesure des événements simples : page vue, page comparateur vue, étape répondue, formulaire envoyé, offre débloquée, clic affilié. Cette mesure sert à comprendre
        le tunnel et à améliorer la qualité des comparateurs.
      </p>

      <h2>Liens affiliés</h2>
      <p>
        Lorsque l’utilisateur clique vers un partenaire, le site partenaire ou le réseau d’affiliation peut utiliser ses propres cookies ou paramètres de suivi afin
        d’attribuer une conversion. Ces traitements dépendent du partenaire concerné et de sa propre politique de confidentialité.
      </p>

      <h2>Gestion des préférences</h2>
      <p>
        L’utilisateur peut gérer les cookies depuis son navigateur. Si Comparia ajoute plus tard des outils analytics ou publicitaires non essentiels, un mécanisme de
        consentement dédié devra être affiché avant leur activation.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question sur les cookies : <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>

      <h2>Référence utile</h2>
      <p>
        La CNIL publie des ressources sur les{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noreferrer">
          cookies et autres traceurs
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
