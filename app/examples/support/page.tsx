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
import CardFooter from "@/components/CardFooter";
import Accordion from "@/components/Accordion";

export default function SupportPage() {
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
      href: "/examples/support",
      label: "Support",
      icon: "help",
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

  const supportTopics = [
    {
      title: "Création de compte",
      description: "Comment créer un compte et gérer vos informations personnelles.",
      icon: "user-plus",
      articles: [
        {
          question: "Comment créer un compte ?",
          answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page, puis remplissez le formulaire avec vos informations. Vous recevrez un email de confirmation pour activer votre compte.",
        },
        {
          question: "J'ai oublié mon mot de passe, que faire ?",
          answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié ?' et suivez les instructions pour réinitialiser votre mot de passe. Vous recevrez un lien par email.",
        },
        {
          question: "Comment modifier mes informations personnelles ?",
          answer: "Connectez-vous à votre compte, allez dans 'Paramètres' puis 'Informations personnelles'. Vous pouvez modifier vos informations et enregistrer les changements.",
        },
      ],
    },
    {
      title: "Utilisation des comparateurs",
      description: "Comment utiliser nos outils de comparaison pour trouver les meilleures offres.",
      icon: "comparison",
      articles: [
        {
          question: "Comment utiliser un comparateur ?",
          answer: "Sélectionnez la catégorie de produit ou service que vous souhaitez comparer, répondez aux questions sur vos besoins, et consultez les offres recommandées. Vous pouvez filtrer et trier les résultats.",
        },
        {
          question: "Comment savoir si une offre est adaptée à mes besoins ?",
          answer: "Nos algorithmes analysent votre profil et vos réponses pour vous proposer les offres les plus adaptées. Vous pouvez également consulter les détails de chaque offre et comparer les caractéristiques.",
        },
        {
          question: "Puis-je enregistrer mes comparaisons ?",
          answer: "Oui, si vous êtes connecté à votre compte, vos comparaisons sont automatiquement enregistrées dans votre historique. Vous pouvez y accéder à tout moment depuis votre tableau de bord.",
        },
      ],
    },
    {
      title: "Souscription",
      description: "Comment souscrire à une offre via notre plateforme.",
      icon: "credit-card",
      articles: [
        {
          question: "Comment souscrire à une offre ?",
          answer: "Lorsque vous trouvez une offre qui vous convient, cliquez sur le bouton 'Souscrire' ou 'Voir l'offre'. Vous serez redirigé vers le site de notre partenaire pour finaliser la souscription.",
        },
        {
          question: "La souscription est-elle sécurisée ?",
          answer: "Oui, toutes les souscriptions sont effectuées directement sur les sites sécurisés de nos partenaires. Nous ne stockons pas vos informations de paiement.",
        },
        {
          question: "Puis-je annuler une souscription ?",
          answer: "Les conditions d'annulation dépendent du partenaire. Consultez les conditions générales du partenaire ou contactez leur service client pour plus d'informations.",
        },
      ],
    },
    {
      title: "Facturation et paiement",
      description: "Questions sur la facturation et les méthodes de paiement.",
      icon: "dollar-sign",
      articles: [
        {
          question: "Comment fonctionne la facturation ?",
          answer: "La facturation est gérée directement par nos partenaires. Vous recevrez une facture de leur part selon les modalités convenues lors de la souscription.",
        },
        {
          question: "Quels modes de paiement sont acceptés ?",
          answer: "Les modes de paiement acceptés dépendent du partenaire. La plupart acceptent les cartes bancaires (Visa, Mastercard), les prélèvements automatiques, et parfois PayPal.",
        },
        {
          question: "Puis-je obtenir une facture ?",
          answer: "Oui, vous recevrez une facture par email de la part du partenaire après votre souscription. Vous pouvez également en faire la demande via votre espace client chez le partenaire.",
        },
      ],
    },
    {
      title: "Problèmes techniques",
      description: "Résolution des problèmes techniques et assistance.",
      icon: "tool",
      articles: [
        {
          question: "Le site ne fonctionne pas correctement, que faire ?",
          answer: "Essayez de rafraîchir la page ou de vider le cache de votre navigateur. Si le problème persiste, contactez notre support technique avec une description du problème.",
        },
        {
          question: "Je ne reçois pas les emails de confirmation",
          answer: "Vérifiez votre dossier de spam ou courrier indésirable. Si vous ne trouvez pas l'email, contactez-nous pour que nous vous le renversions.",
        },
        {
          question: "Comment signaler un bug ?",
          answer: "Utilisez notre formulaire de contact en sélectionnant 'Problème technique' comme sujet. Décrivez le bug avec autant de détails que possible pour nous aider à le reproduire.",
        },
      ],
    },
    {
      title: "Sécurité et confidentialité",
      description: "Questions sur la sécurité de vos données et la confidentialité.",
      icon: "shield",
      articles: [
        {
          question: "Comment mes données sont-elles protégées ?",
          answer: "Nous utilisons des protocoles de sécurité avancés pour protéger vos données. Toutes les communications sont chiffrées et nous respectons les normes de sécurité les plus strictes.",
        },
        {
          question: "Partagez-vous mes données avec des tiers ?",
          answer: "Nous ne partageons vos données qu'avec vos partenaires lorsque cela est nécessaire pour la souscription à une offre, et toujours conformément à notre Politique de confidentialité.",
        },
        {
          question: "Comment supprimer mes données ?",
          answer: "Vous pouvez demander la suppression de vos données en nous contactant via notre formulaire de contact. Nous traiterons votre demande conformément à la réglementation en vigueur.",
        },
      ],
    },
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
            { label: "Centre d'aide", icon: "help" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Centre d'aide</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Trouvez des réponses à vos questions et obtenez de l'aide pour utiliser nos services
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
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

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="#creation-compte" className="text-neutral-300 hover:text-white">
              Création de compte
            </Link>
            <span className="text-neutral-500">•</span>
            <Link href="#comparateurs" className="text-neutral-300 hover:text-white">
              Comparateurs
            </Link>
            <span className="text-neutral-500">•</span>
            <Link href="#souscription" className="text-neutral-300 hover:text-white">
              Souscription
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-2">
              <BrandIcon name="search" className="h-5 w-5 text-neutral-400 ml-3" />
              <input
                type="text"
                placeholder="Rechercher dans le centre d'aide..."
                className="w-full bg-transparent py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none"
              />
              <Button variant="primary" size="sm" className="mr-2">
                <BrandIcon name="search" className="h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>

        {/* Support topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Sujets d'aide populaires</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportTopics.map((topic, index) => (
              <Card key={index} variant="glass">
                <CardHeader
                  title={
                    <div className="flex items-center gap-3">
                      <BrandIcon name={topic.icon} className="h-6 w-6 text-primary-400" />
                      {topic.title}
                    </div>
                  }
                />
                <CardBody>
                  <p className="text-neutral-300 mb-4">{topic.description}</p>

                  <Accordion
                    items={topic.articles.map((article, articleIndex) => ({
                      id: `topic-${index}-article-${articleIndex}`,
                      title: article.question,
                      content: <p className="text-neutral-300">{article.answer}</p>,
                      icon: "help",
                    }))}
                    allowMultiple
                  />
                </CardBody>
                <CardFooter>
                  <Link href="/contact" className="text-sm text-primary-400 hover:underline flex items-center gap-1">
                    <BrandIcon name="mail" className="h-4 w-4" />
                    Contactez-nous pour plus d'aide
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Ressources supplémentaires</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card variant="glass">
              <CardHeader title="Guides pratiques" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Consultez nos guides détaillés pour vous aider à choisir les meilleures offres.
                </p>
                <Link href="/guides" className="btn-outline inline-flex items-center justify-center gap-2">
                  <BrandIcon name="book" className="h-4 w-4" />
                  Voir les guides
                </Link>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Statut du service" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Vérifiez l'état de nos services et consultez l'historique des incidents.
                </p>
                <Link href="/examples/statut" className="btn-outline inline-flex items-center justify-center gap-2">
                  <BrandIcon name="activity" className="h-4 w-4" />
                  Voir le statut
                </Link>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Blog" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Découvrez nos articles et conseils pour mieux comprendre vos options.
                </p>
                <Link href="/examples/blog" className="btn-outline inline-flex items-center justify-center gap-2">
                  <BrandIcon name="edit" className="h-4 w-4" />
                  Lire le blog
                </Link>
              </CardBody>
            </Card>

            <Card variant="glass">
              <CardHeader title="Glossaire" />
              <CardBody>
                <p className="text-neutral-300 mb-4">
                  Comprenez les termes techniques utilisés dans nos comparateurs.
                </p>
                <Link href="/examples/glossaire" className="btn-outline inline-flex items-center justify-center gap-2">
                  <BrandIcon name="book-open" className="h-4 w-4" />
                  Consulter le glossaire
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous n'avez pas trouvé de réponse ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Notre équipe support est à votre disposition pour répondre à toutes vos questions
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <BrandIcon name="mail" className="h-4 w-4" />
                Nous contacter
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="secondary" size="lg" className="gap-2">
                <BrandIcon name="message-circle" className="h-4 w-4" />
                Chat en direct
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <BrandIcon name="phone" className="h-4 w-4 text-primary-400" />
              <span>Support téléphonique : 01 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-2">
              <BrandIcon name="clock" className="h-4 w-4 text-success-400" />
              <span>Disponible du lundi au vendredi, 9h-18h</span>
            </div>
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