import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Comparia",
  description: "Contacter Comparia pour une demande utilisateur, partenaire, affiliation ou données personnelles.",
};

const contactCards = [
  {
    title: "Utilisateur",
    body: "Question sur une comparaison, demande de suppression ou correction d’une information.",
    email: siteConfig.contactEmail,
  },
  {
    title: "Partenaire / annonceur",
    body: "Programme d’affiliation, partenariat, intégration d’offre ou suivi de conversion.",
    email: siteConfig.contactEmail,
  },
  {
    title: "Données personnelles",
    body: "Accès, suppression, opposition, retrait du consentement ou question RGPD.",
    email: siteConfig.privacyEmail,
  },
];

export default function ContactPage() {
  return (
    <LegalPageShell
      eyebrow="Contact"
      title="Une demande, un partenariat ou une question conformité ?"
      description="Comparia centralise les demandes utilisateur, les sujets partenaires et les demandes liées aux données personnelles."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {contactCards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <h2 className="mt-0 text-xl font-semibold text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{card.body}</p>
            <a className="mt-4 inline-flex rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200" href={`mailto:${card.email}`}>
              {card.email}
            </a>
          </article>
        ))}
      </div>

      <h2>Informations utiles à envoyer</h2>
      <ul>
        <li>Votre nom et votre email de contact.</li>
        <li>La catégorie concernée : assurance, mobile, énergie, banque, frontaliers, etc.</li>
        <li>Le lien ou la page concernée si la demande porte sur une offre.</li>
        <li>Pour un partenaire : nom de l’annonceur, réseau d’affiliation et conditions de tracking.</li>
      </ul>

      <h2>Délai de réponse</h2>
      <p>
        Nous faisons le maximum pour répondre rapidement aux demandes prioritaires. Les demandes liées aux données personnelles sont traitées conformément aux délais
        applicables.
      </p>
    </LegalPageShell>
  );
}
