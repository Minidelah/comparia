"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import Container from "@/components/Container";
import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";

export default function PolitiqueConfidentialitePage() {
  const navLinks = [
    {
      href: "/",
      label: "Accueil",
      icon: "home",
    },
    {
      href: "/comparateurs",
      label: "Comparateurs",
      icon: "comparison",
    },
    {
      href: "/politique-confidentialite",
      label: "Confidentialité",
      icon: "lock",
    },
  ];

  const footerSections = [
    {
      title: "Comparateurs",
      links: [
        { href: "/comparateurs/box-internet", label: "Box Internet" },
        { href: "/comparateurs/forfait-mobile", label: "Mobile" },
        { href: "/comparateurs/box-internet", label: "Box + Mobile" },
        { href: "/comparateurs/assurance-auto", label: "Assurance Auto" },
        { href: "/comparateurs/assurance-habitation", label: "Assurance Habitation" },
        { href: "/comparateurs/electricite", label: "Énergie" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { href: "/guides", label: "Guides pratiques" },
        { href: "/examples/blog", label: "Blog" },
        { href: "/examples/faq", label: "FAQ" },
        { href: "/examples/glossaire", label: "Glossaire" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { href: "/a-propos", label: "À propos" },
        { href: "/examples/team", label: "Notre équipe" },
        { href: "/examples/carrieres", label: "Carrières" },
        { href: "/examples/presse", label: "Presse" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", label: "Contact" },
        { href: "/examples/support", label: "Centre d'aide" },
        { href: "/examples/statut", label: "Statut du service" },
      ],
    },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: "facebook" },
    { href: "https://twitter.com", icon: "twitter" },
    { href: "https://instagram.com", icon: "instagram" },
    { href: "https://linkedin.com", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/examples/cgu", label: "Conditions générales" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Navigation */}
      <NavigationPremium
        logo={{ href: "/", label: "CompareTesFactures", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { label: "Politique de confidentialité", icon: "lock" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Politique de confidentialité</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Comment nous collectons, utilisons et protégeons vos données personnelles
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/mentions-legales">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="file-text" className="h-4 w-4" />
                Mentions légales
              </Button>
            </Link>
            <Link href="/cookies">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="cookie" className="h-4 w-4" />
                Gestion des cookies
              </Button>
            </Link>
          </div>
        </div>

        {/* Privacy policy content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Introduction</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                CompareTesFactures (« CompareTesFactures », « nous », « notre ») s'engage à protéger la vie privée et les données personnelles de ses utilisateurs (« vous », « votre »).
              </p>
              <p className="mb-4">
                La présente Politique de confidentialité explique quelles données personnelles nous collectons, comment nous les utilisons, avec qui nous les partageons, comment nous les protégeons, et quels sont vos droits concernant vos données personnelles.
              </p>
              <p className="mb-4">
                En utilisant notre site web <a href="https://comparetesfactures.fr" className="text-primary-400 hover:underline">https://comparetesfactures.fr</a> et nos services (collectivement, les « Services »), vous acceptez les pratiques décrites dans cette Politique de confidentialité.
              </p>
              <p>
                Si vous n'êtes pas d'accord avec cette Politique de confidentialité, veuillez ne pas utiliser nos Services.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">1. Données personnelles collectées</h2>

          <Card className="mb-6">
            <CardHeader title="1.1 Données que vous nous fournissez" />
            <CardBody>
              <p className="mb-4">
                Nous collectons les données personnelles que vous nous fournissez volontairement lorsque vous utilisez nos Services, notamment :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Informations de compte :</strong> lorsque vous créez un compte, nous collectons votre nom, adresse email, numéro de téléphone, et mot de passe.</li>
                <li><strong>Informations de profil :</strong> vous pouvez choisir de fournir des informations supplémentaires dans votre profil, telles que votre adresse postale, date de naissance, et préférences.</li>
                <li><strong>Informations de contact :</strong> lorsque vous nous contactez via notre formulaire de contact, chat en direct, ou par email, nous collectons votre nom, adresse email, numéro de téléphone, et le contenu de votre message.</li>
                <li><strong>Informations de comparaison :</strong> lorsque vous utilisez nos comparateurs, nous collectons les informations nécessaires pour vous proposer des offres adaptées (par exemple, votre consommation actuelle, vos préférences, etc.).</li>
                <li><strong>Informations de paiement :</strong> si vous souscrivez à un abonnement payant, nous collectons les informations de paiement via notre prestataire de paiement sécurisé (nous ne stockons pas vos informations de carte bancaire).</li>
              </ul>
              <p>
                Vous n'êtes pas obligé de nous fournir ces informations, mais certaines fonctionnalités de nos Services peuvent ne pas être disponibles si vous choisissez de ne pas le faire.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="1.2 Données collectées automatiquement" />
            <CardBody>
              <p className="mb-4">
                Lorsque vous utilisez nos Services, nous collectons automatiquement certaines informations :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Données d'utilisation :</strong> informations sur votre utilisation de nos Services, telles que les pages consultées, les fonctionnalités utilisées, les actions réalisées, et la durée des sessions.</li>
                <li><strong>Données techniques :</strong> informations sur votre appareil (type, modèle, système d'exploitation), votre navigateur, votre adresse IP, et d'autres données techniques.</li>
                <li><strong>Données de localisation :</strong> nous pouvons collecter des informations générales sur votre localisation (par exemple, votre ville ou région) pour vous proposer des offres pertinentes.</li>
                <li><strong>Cookies et technologies similaires :</strong> nous utilisons des cookies et des technologies similaires pour collecter des informations sur votre utilisation de nos Services. Pour en savoir plus, consultez notre <Link href="/cookies" className="text-primary-400 hover:underline">Politique de gestion des cookies</Link>.</li>
              </ul>
              <p>
                Ces informations sont collectées à l'aide de diverses technologies, notamment des cookies, des balises web, des pixels, et des outils d'analyse.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="1.3 Données provenantes de tiers" />
            <CardBody>
              <p className="mb-4">
                Nous pouvons également recevoir des informations vous concernant de la part de tiers, notamment :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Partenaires commerciaux :</strong> lorsque vous souscrivez à une offre via notre plateforme, nos partenaires peuvent nous transmettre des informations sur votre souscription.</li>
                <li><strong>Réseaux sociaux :</strong> si vous vous connectez à nos Services via un compte de réseau social (par exemple, Facebook, Google), nous pouvons recevoir des informations de ce réseau social, conformément à leurs politiques de confidentialité.</li>
                <li><strong>Services d'analyse :</strong> nous utilisons des services d'analyse tiers qui peuvent nous fournir des informations sur l'utilisation de nos Services.</li>
              </ul>
              <p>
                Nous nous assurons que ces tiers ont obtenu votre consentement ou ont le droit de nous transmettre ces informations conformément aux lois applicables.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">2. Utilisation des données personnelles</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Nous utilisons vos données personnelles pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Fournir et améliorer nos Services :</strong> pour vous permettre d'utiliser nos Services, personnaliser votre expérience, et améliorer la qualité de nos Services.
                </li>
                <li>
                  <strong>Communiquer avec vous :</strong> pour répondre à vos demandes, vous envoyer des informations sur nos Services, des mises à jour, des alertes, et des communications marketing (si vous y avez consenti).
                </li>
                <li>
                  <strong>Vous proposer des offres pertinentes :</strong> pour vous recommander des offres adaptées à votre profil et à vos besoins.
                </li>
                <li>
                  <strong>Analyser l'utilisation de nos Services :</strong> pour comprendre comment nos Services sont utilisés, identifier les tendances, et améliorer nos Services.
                </li>
                <li>
                  <strong>Prévenir la fraude et assurer la sécurité :</strong> pour détecter, prévenir, et enquêter sur les activités frauduleuses ou illégales, et pour assurer la sécurité de nos Services.
                </li>
                <li>
                  <strong>Respecter nos obligations légales :</strong> pour nous conformer aux lois et réglementations applicables, et pour répondre aux demandes des autorités compétentes.
                </li>
              </ul>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">3. Partage des données personnelles</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Nous pouvons partager vos données personnelles avec les catégories de destinataires suivantes :
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Fournisseurs de services :</strong> nous pouvons partager vos données avec des fournisseurs de services qui nous aident à fournir nos Services (par exemple, hébergement, analyse, paiement, support client). Ces fournisseurs sont tenus de protéger vos données et ne peuvent les utiliser que pour les finalités pour lesquelles nous les leur avons communiquées.
                </li>
                <li>
                  <strong>Partenaires commerciaux :</strong> lorsque vous souscrivez à une offre via notre plateforme, nous pouvons partager certaines de vos informations avec notre partenaire concerné pour faciliter la souscription et le suivi.
                </li>
                <li>
                  <strong>Autorités compétentes :</strong> nous pouvons divulguer vos données personnelles si la loi l'exige ou si nous estimons de bonne foi que cette divulgation est nécessaire pour : (a) nous conformer à une obligation légale ; (b) protéger et défendre nos droits ou notre propriété ; (c) prévenir ou enquêter sur d'éventuelles activités illégales ; (d) protéger la sécurité personnelle de nos utilisateurs ou du public.
                </li>
                <li>
                  <strong>Sociétés affiliées :</strong> nous pouvons partager vos données avec nos sociétés affiliées, filiales, ou sociétés mères, qui utiliseront vos données conformément à la présente Politique de confidentialité.
                </li>
                <li>
                  <strong>Acquéreurs potentiels :</strong> en cas de fusion, acquisition, ou vente de tout ou partie de nos actifs, vos données personnelles peuvent être transférées à l'acquéreur.
                </li>
              </ul>
              <p className="mt-4">
                Nous ne vendons pas vos données personnelles à des tiers.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">4. Conservation des données personnelles</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour les finalités pour lesquelles elles ont été collectées, conformément aux obligations légales, contractuelles, et réglementaires, et pendant la durée nécessaire ou pertinente pour nos opérations commerciales légitimes.
              </p>
              <p className="mb-4">
                Voici les durées de conservation spécifiques pour certaines catégories de données :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Données de compte :</strong> aussi longtemps que votre compte est actif, et pendant 3 ans après la fermeture de votre compte.</li>
                <li><strong>Données de transaction :</strong> pendant 10 ans à compter de la transaction, conformément aux obligations légales.</li>
                <li><strong>Données de contact :</strong> pendant 3 ans à compter de notre dernier contact.</li>
                <li><strong>Données de marketing :</strong> pendant 3 ans à compter de votre dernier engagement avec nos communications marketing, ou jusqu'à ce que vous vous désabonniez.</li>
              </ul>
              <p className="mt-4">
                Nous pouvons conserver certaines données pendant des périodes plus longues si cela est nécessaire pour nous conformer à nos obligations légales, résoudre des litiges, ou faire respecter nos accords.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">5. Sécurité des données personnelles</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques, physiques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction accidentelle ou illicite, la perte, l'altération, la divulgation non autorisée ou l'accès non autorisé.
              </p>
              <p className="mb-4">
                Ces mesures incluent :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Le chiffrement des données en transit et au repos</li>
                <li>Des pare-feu et des systèmes de détection d'intrusion</li>
                <li>Des contrôles d'accès stricts</li>
                <li>Des audits de sécurité réguliers</li>
                <li>Des formations en sécurité pour notre personnel</li>
              </ul>
              <p className="mb-4">
                Cependant, aucune méthode de transmission ou de stockage de données n'est totalement sécurisée. Nous ne pouvons donc pas garantir une sécurité absolue.
              </p>
              <p>
                En cas de violation de données personnelles susceptible d'engendrer un risque élevé pour vos droits et libertés, nous vous en informerons conformément aux obligations légales.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">6. Vos droits</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Conformément à la réglementation applicable en matière de protection des données personnelles, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Droit d'accès :</strong> vous avez le droit de demander une copie des données personnelles que nous détenons à votre sujet.
                </li>
                <li>
                  <strong>Droit de rectification :</strong> vous avez le droit de demander la correction des données personnelles inexactes ou incomplètes vous concernant.
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> dans certains cas, vous avez le droit de demander la suppression de vos données personnelles.
                </li>
                <li>
                  <strong>Droit à la limitation du traitement :</strong> vous avez le droit de demander la limitation du traitement de vos données personnelles dans certains cas.
                </li>
                <li>
                  <strong>Droit à la portabilité :</strong> vous avez le droit de recevoir les données personnelles que vous nous avez fournies dans un format structuré, couramment utilisé et lisible par machine, et de les transmettre à un autre responsable du traitement.
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> vous avez le droit de vous opposer au traitement de vos données personnelles pour des motifs tenant à votre situation particulière.
                </li>
                <li>
                  <strong>Droit de retirer votre consentement :</strong> lorsque le traitement de vos données personnelles est basé sur votre consentement, vous avez le droit de retirer ce consentement à tout moment.
                </li>
                <li>
                  <strong>Droit de définir des directives relatives au sort de vos données après votre décès :</strong> vous avez le droit de définir des directives relatives à la conservation, à l'effacement et à la communication de vos données personnelles après votre décès.
                </li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : dpo@comparetesfactures.fr.
              </p>
              <p className="mt-4">
                Nous répondrons à votre demande dans un délai d'un mois à compter de la réception de votre demande. Ce délai peut être prolongé de deux mois en cas de complexité ou de nombre élevé de demandes.
              </p>
              <p className="mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) si vous estimez que le traitement de vos données personnelles constitue une violation du Règlement Général sur la Protection des Données (RGPD).
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">7. Transfert international de données</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Vos données personnelles peuvent être transférées vers des pays situés en dehors de l'Espace Économique Européen (EEE), notamment vers les États-Unis, où nos fournisseurs de services ou partenaires peuvent être situés.
              </p>
              <p className="mb-4">
                Ces transferts sont encadrés par des garanties appropriées conformément à la réglementation applicable, notamment :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Des clauses contractuelles types approuvées par la Commission européenne</li>
                <li>Des règles d'entreprise contraignantes (BCR)</li>
                <li>Des décisions d'adéquation de la Commission européenne pour certains pays</li>
              </ul>
              <p>
                Vous pouvez obtenir une copie de ces garanties en nous contactant à l'adresse suivante : dpo@comparetesfactures.fr.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">8. Modifications de la Politique de confidentialité</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Nous pouvons modifier la présente Politique de confidentialité à tout moment. En cas de modification substantielle, nous vous en informerons par email ou via une notification sur notre site web avant que la modification ne prenne effet.
              </p>
              <p className="mb-4">
                Nous vous encourageons à consulter régulièrement cette Politique de confidentialité pour prendre connaissance des éventuelles modifications.
              </p>
              <p>
                Votre continuation de l'utilisation de nos Services après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">9. Contact</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Si vous avez des questions ou des préoccupations concernant cette Politique de confidentialité ou nos pratiques en matière de protection des données personnelles, vous pouvez nous contacter à l'adresse suivante :
              </p>
              <p className="mb-2"><strong>CompareTesFactures</strong></p>
              <p className="mb-2">À l'attention du Délégué à la Protection des Données (DPO)</p>
              <p className="mb-2">123 Rue de la Comparaison</p>
              <p className="mb-4">75001 Paris, France</p>
              <p><strong>Email :</strong> dpo@comparetesfactures.fr</p>
            </CardBody>
          </Card>

          <div className="text-center text-sm text-neutral-500">
            Dernière mise à jour : 15 juin 2024
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Des questions ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour toute question supplémentaire
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Nous contacter
              </Button>
            </Link>
            <Link href="/examples/faq">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="help" className="h-4 w-4" />
                Consulter la FAQ
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <FooterPremium
        sections={footerSections}
        socialLinks={socialLinks}
        legalLinks={legalLinks}
        copyright="© 2024 CompareTesFactures. Tous droits réservés."
      />
    </div>
  );
}