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

export default function CGUPage() {
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
      href: "/examples/cgu",
      label: "Conditions générales",
      icon: "file-text",
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
        logo={{ href: "/", label: "Comparia", icon: "logo" }}
        links={navLinks}
        cta={{ href: "/comparateurs", label: "Comparer maintenant", icon: "comparison" }}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { href: "/", label: "Accueil", icon: "home" },
            { label: "Conditions générales", icon: "file-text" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Conditions Générales d'Utilisation</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Conditions régissant l'utilisation de nos services de comparaison
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/mentions-legales">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="file-text" className="h-4 w-4" />
                Mentions légales
              </Button>
            </Link>
            <Link href="/politique-confidentialite">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="lock" className="h-4 w-4" />
                Politique de confidentialité
              </Button>
            </Link>
          </div>
        </div>

        {/* CGU content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Introduction</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'utilisation du site web <a href="https://comparetesfactures.fr" className="text-primary-400 hover:underline">https://comparetesfactures.fr</a> (ci-après le « Site ») et des services proposés par Comparia (ci-après « Comparia », « nous », « notre »).
              </p>
              <p className="mb-4">
                En accédant au Site et en utilisant nos services (ci-après les « Services »), vous acceptez sans réserve les présentes CGU. Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser nos Services.
              </p>
              <p className="mb-4">
                Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le Site. Votre continuation de l'utilisation des Services après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
              <p>
                Nous vous encourageons à consulter régulièrement les présentes CGU pour prendre connaissance des éventuelles modifications.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">1. Définitions</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Dans les présentes CGU, les termes suivants ont la signification suivante :
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>« Site » :</strong> le site web accessible à l'adresse https://comparetesfactures.fr et ses sous-domaines.
                </li>
                <li>
                  <strong>« Services » :</strong> l'ensemble des services proposés par Comparia via le Site, notamment les services de comparaison d'offres.
                </li>
                <li>
                  <strong>« Utilisateur » ou « Vous » :</strong> toute personne physique ou morale utilisant le Site et/ou les Services.
                </li>
                <li>
                  <strong>« Compte » :</strong> un compte utilisateur créé sur le Site permettant d'accéder à certaines fonctionnalités des Services.
                </li>
                <li>
                  <strong>« Contenu » :</strong> l'ensemble des textes, images, vidéos, données, et autres éléments disponibles sur le Site.
                </li>
                <li>
                  <strong>« Partenaire » :</strong> un fournisseur de services ou de produits avec lequel Comparia a établi un partenariat.
                </li>
              </ul>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">2. Accès aux Services</h2>

          <Card className="mb-6">
            <CardHeader title="2.1 Conditions d'accès" />
            <CardBody>
              <p className="mb-4">
                L'accès aux Services est gratuit et ouvert à toute personne physique majeure et capable, ou personne morale, disposant d'un équipement informatique et d'une connexion internet.
              </p>
              <p className="mb-4">
                Pour accéder à certaines fonctionnalités des Services, vous devrez créer un Compte en fournissant les informations requises. Vous vous engagez à fournir des informations exactes, complètes et à jour.
              </p>
              <p>
                Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités qui se déroulent sous votre Compte.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="2.2 Restrictions d'accès" />
            <CardBody>
              <p className="mb-4">
                Nous nous réservons le droit de suspendre ou de résilier l'accès aux Services à tout moment, sans préavis, pour toute raison, notamment en cas de :
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Violation des présentes CGU</li>
                <li>Activité suspecte ou frauduleuse</li>
                <li>Comportement nuisible à la réputation de Comparia</li>
                <li>Inactivité prolongée du Compte</li>
                <li>Exigence légale ou réglementaire</li>
              </ul>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">3. Utilisation des Services</h2>

          <Card className="mb-6">
            <CardHeader title="3.1 Obligations de l'Utilisateur" />
            <CardBody>
              <p className="mb-4">
                En utilisant les Services, vous vous engagez à :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Respecter les présentes CGU et toutes les lois et réglementations applicables</li>
                <li>Fournir des informations exactes et à jour</li>
                <li>Ne pas utiliser les Services à des fins illégales ou non autorisées</li>
                <li>Ne pas perturber le fonctionnement des Services</li>
                <li>Ne pas accéder, utiliser ou tenter d'accéder ou d'utiliser les comptes d'autres Utilisateurs</li>
                <li>Ne pas reproduire, dupliquer, copier, vendre, revendre ou exploiter toute partie des Services</li>
                <li>Ne pas utiliser de robot, d'araignée, de scraper ou autre moyen automatisé pour accéder aux Services</li>
                <li>Ne pas introduire de virus, de chevaux de Troie, de vers, de bombes logiques ou autre matériel technologiquement nuisible</li>
              </ul>
              <p>
                Vous êtes seul responsable de votre utilisation des Services et de tout contenu que vous publiez ou transmettez via les Services.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="3.2 Propriété intellectuelle" />
            <CardBody>
              <p className="mb-4">
                L'ensemble du Contenu du Site et des Services, y compris mais sans s'y limiter, les textes, images, logos, vidéos, données, logiciels, et la structure générale du Site, est la propriété exclusive de Comparia ou de ses licenciers et est protégé par les lois françaises et internationales sur la propriété intellectuelle.
              </p>
              <p className="mb-4">
                Vous vous engagez à ne pas :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Reproduire, modifier, adapter, traduire, ou créer des œuvres dérivées du Contenu</li>
                <li>Distribuer, afficher, performer, ou communiquer le Contenu au public</li>
                <li>Utiliser le Contenu à des fins commerciales</li>
                <li>Supprimer ou altérer les mentions de propriété intellectuelle</li>
              </ul>
              <p>
                Toute utilisation non autorisée du Contenu constitue une violation des présentes CGU et peut engager votre responsabilité civile et pénale.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="3.3 Liens vers des sites tiers" />
            <CardBody>
              <p className="mb-4">
                Le Site peut contenir des liens vers des sites web tiers qui ne sont pas contrôlés par Comparia. Comparia n'est pas responsable du contenu, des politiques de confidentialité, ou des pratiques de ces sites tiers.
              </p>
              <p>
                L'inclusion de ces liens ne constitue pas une approbation ou une recommandation de ces sites par Comparia. Vous utilisez ces sites tiers à vos propres risques.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">4. Services de comparaison</h2>

          <Card className="mb-6">
            <CardHeader title="4.1 Fonctionnement" />
            <CardBody>
              <p className="mb-4">
                Nos Services de comparaison vous permettent de comparer les offres de nos Partenaires pour divers produits et services, notamment les forfaits mobile, les box internet, les assurances, et les offres d'énergie.
              </p>
              <p className="mb-4">
                Les résultats de comparaison sont basés sur les informations que vous fournissez et les données disponibles auprès de nos Partenaires. Nous nous efforçons de fournir des informations exactes et à jour, mais nous ne pouvons garantir l'exhaustivité ou l'exactitude des informations présentées.
              </p>
              <p>
                Les offres présentées peuvent varier en fonction de votre localisation, de votre profil, et des informations que vous fournissez.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="4.2 Souscription" />
            <CardBody>
              <p className="mb-4">
                Lorsque vous souscrivez à une offre via nos Services, vous êtes redirigé vers le site web de notre Partenaire concerné pour finaliser la souscription. La relation contractuelle est établie directement entre vous et le Partenaire.
              </p>
              <p className="mb-4">
                Comparia n'est pas partie aux contrats conclus entre vous et nos Partenaires. Nous ne sommes pas responsables des produits ou services fournis par nos Partenaires, ni des conditions, garanties, ou obligations associées à ces produits ou services.
              </p>
              <p>
                Toute question, réclamation, ou litige concernant une offre souscrite via nos Services doit être adressée directement au Partenaire concerné.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="4.3 Rémunération" />
            <CardBody>
              <p className="mb-4">
                Comparia peut recevoir une rémunération de la part de ses Partenaires lorsque vous souscrivez à une offre via nos Services. Cette rémunération n'affecte pas le prix que vous payez pour les produits ou services souscrits.
              </p>
              <p className="mb-4">
                Nous nous engageons à présenter les offres de manière objective et transparente. Les offres sponsorisées sont clairement identifiées comme telles.
              </p>
              <p>
                La rémunération que nous recevons peut varier en fonction du Partenaire et du type d'offre souscrite.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">5. Responsabilités</h2>

          <Card className="mb-6">
            <CardHeader title="5.1 Responsabilité de Comparia" />
            <CardBody>
              <p className="mb-4">
                Comparia s'engage à fournir les Services avec diligence et selon les règles de l'art. Cependant, Comparia ne peut garantir que les Services seront exempts d'erreurs, d'interruptions, ou de défauts.
              </p>
              <p className="mb-4">
                Comparia ne sera pas responsable :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Des dommages indirects, spéciaux, ou consécutifs</li>
                <li>Des pertes de profits, de données, ou d'opportunités commerciales</li>
                <li>Des dommages résultant de l'utilisation ou de l'impossibilité d'utiliser les Services</li>
                <li>Des dommages résultant de l'utilisation de sites tiers liés à nos Services</li>
                <li>Des dommages résultant de la violation des présentes CGU par l'Utilisateur</li>
              </ul>
              <p>
                En aucun cas, la responsabilité de Comparia ne pourra excéder le montant des frais effectivement payés par l'Utilisateur pour l'utilisation des Services au cours des douze (12) mois précédant l'événement donnant lieu à la responsabilité.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="5.2 Responsabilité de l'Utilisateur" />
            <CardBody>
              <p className="mb-4">
                L'Utilisateur est seul responsable de son utilisation des Services et de tout contenu qu'il publie ou transmet via les Services.
              </p>
              <p className="mb-4">
                L'Utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Respecter les présentes CGU et toutes les lois et réglementations applicables</li>
                <li>Ne pas utiliser les Services à des fins illégales ou non autorisées</li>
                <li>Ne pas perturber le fonctionnement des Services</li>
                <li>Ne pas porter atteinte aux droits de Comparia ou de tiers</li>
                <li>Ne pas introduire de virus ou autre matériel technologiquement nuisible</li>
              </ul>
              <p>
                L'Utilisateur indemnise Comparia contre toute réclamation, perte, responsabilité, ou dépense (y compris les frais raisonnables d'avocat) résultant de la violation des présentes CGU par l'Utilisateur.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">6. Durée et résiliation</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Les présentes CGU entrent en vigueur à compter de votre première utilisation des Services et restent en vigueur jusqu'à leur résiliation.
              </p>
              <p className="mb-4">
                Vous pouvez résilier votre utilisation des Services à tout moment en cessant d'utiliser les Services et, le cas échéant, en fermant votre Compte.
              </p>
              <p className="mb-4">
                Comparia peut résilier votre accès aux Services à tout moment, sans préavis, pour toute raison, notamment en cas de violation des présentes CGU.
              </p>
              <p>
                La résiliation des présentes CGU n'affecte pas les droits et obligations des parties nés avant la résiliation.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">7. Loi applicable et litiges</h2>

          <Card className="mb-6">
            <CardBody>
              <p className="mb-4">
                Les présentes CGU sont régies par le droit français.
              </p>
              <p className="mb-4">
                Tout litige relatif à l'interprétation ou à l'exécution des présentes CGU sera soumis à la compétence exclusive des tribunaux français.
              </p>
              <p className="mb-4">
                En cas de litige, les parties s'engagent à tenter de le résoudre à l'amiable avant d'engager toute action en justice.
              </p>
              <p>
                Si le litige persiste, les parties peuvent recourir à la médiation conformément aux dispositions du Code de la consommation.
              </p>
            </CardBody>
          </Card>

          <h2 className="text-2xl font-bold text-white mb-6">8. Divers</h2>

          <Card className="mb-6">
            <CardHeader title="8.1 Intégralité de l'accord" />
            <CardBody>
              <p>
                Les présentes CGU constituent l'intégralité de l'accord entre vous et Comparia concernant l'utilisation des Services et remplacent tous les accords ou entendements antérieurs, écrits ou oraux.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="8.2 Nullité partielle" />
            <CardBody>
              <p>
                Si une disposition des présentes CGU est jugée nulle ou inapplicable par un tribunal compétent, cette nullité ou inapplicabilité n'affectera pas la validité des autres dispositions, qui resteront en vigueur.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="8.3 Cession" />
            <CardBody>
              <p className="mb-4">
                Comparia se réserve le droit de céder, transférer, ou sous-traiter tout ou partie de ses droits et obligations au titre des présentes CGU à tout tiers, sous réserve de vous en informer par écrit.
              </p>
              <p>
                Vous ne pouvez céder ou transférer vos droits et obligations au titre des présentes CGU sans l'accord écrit préalable de Comparia.
              </p>
            </CardBody>
          </Card>

          <Card className="mb-6">
            <CardHeader title="8.4 Modifications" />
            <CardBody>
              <p className="mb-4">
                Comparia se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le Site.
              </p>
              <p className="mb-4">
                Nous vous informerons des modifications substantielles par email ou via une notification sur le Site avant que la modification ne prenne effet.
              </p>
              <p>
                Votre continuation de l'utilisation des Services après la publication des modifications constitue votre acceptation de ces modifications.
              </p>
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
        copyright="© 2024 Comparia. Tous droits réservés."
      />
    </div>
  );
}