"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { Button } from "@/components/ui/Button";
import Breadcrumb from "@/components/Breadcrumb";
import NavigationPremium from "@/components/NavigationPremium";
import FooterPremium from "@/components/FooterPremium";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import Container from "@/components/Container";

export default function BlogPage() {
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
      href: "/guides",
      label: "Guides",
      icon: "book",
    },
    {
      href: "/examples/blog",
      label: "Blog",
      icon: "edit",
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
    { href: "/comparateurs/forfait-mobile", icon: "instagram" },
    { href: "https://linkedin.com", icon: "linkedin" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/cookies", label: "Gestion des cookies" },
    { href: "/examples/cgu", label: "Conditions générales" },
  ];

  const blogPosts = [
    {
      id: "1",
      title: "Les meilleures offres mobile de l'été 2024",
      excerpt: "Découvrez les promotions exceptionnelles sur les forfaits mobile pour cet été. Économisez jusqu'à 40% sur votre abonnement.",
      slug: "meilleures-offres-mobile-ete-2024",
      date: "2024-06-15",
      author: "Marie Martin",
      category: "Mobile",
      readingTime: 5,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      title: "Comment réduire sa facture d'électricité de 30% ?",
      excerpt: "Nos conseils pratiques pour optimiser votre consommation et choisir le fournisseur le plus adapté à vos besoins.",
      slug: "reduire-facture-electricite",
      date: "2024-06-10",
      author: "Thomas Leroy",
      category: "Énergie",
      readingTime: 7,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "3",
      title: "Assurance habitation : le guide complet 2024",
      excerpt: "Tout ce qu'il faut savoir pour bien choisir son assurance habitation et protéger son logement efficacement.",
      slug: "guide-assurance-habitation-2024",
      date: "2024-06-05",
      author: "Sophie Bernard",
      category: "Assurance",
      readingTime: 10,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "4",
      title: "Box Internet : fibre vs ADSL, que choisir ?",
      excerpt: "Analyse comparative des technologies d'accès à internet pour vous aider à faire le bon choix.",
      slug: "fibre-vs-adsl-que-choisir",
      date: "2024-05-30",
      author: "Jean Dupont",
      category: "Box Internet",
      readingTime: 6,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "5",
      title: "Les pièges à éviter lors de la souscription d'un forfait mobile",
      excerpt: "Apprenez à repérer les clauses abusives et les offres trop belles pour être vraies.",
      slug: "pieges-forfaits-mobile",
      date: "2024-05-25",
      author: "Marie Martin",
      category: "Mobile",
      readingTime: 8,
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "6",
      title: "Comment bien choisir son assurance auto jeune conducteur ?",
      excerpt: "Nos conseils pour les jeunes conducteurs qui cherchent une assurance auto abordable et complète.",
      slug: "assurance-auto-jeune-conducteur",
      date: "2024-05-20",
      author: "Thomas Leroy",
      category: "Assurance",
      readingTime: 9,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const handleNewsletterSubmit = async (email: string) => {
    void email;
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
  };

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
            { label: "Blog", icon: "edit" },
          ]}
          className="mb-6"
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Notre Blog</h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Découvrez nos articles, conseils et analyses pour vous aider à mieux comprendre 
            le monde des télécommunications et faire les meilleurs choix
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/blog/mobile">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="phone" className="h-4 w-4" />
                Mobile
              </Button>
            </Link>
            <Link href="/blog/box-internet">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="wifi" className="h-4 w-4" />
                Box Internet
              </Button>
            </Link>
            <Link href="/blog/assurance">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="shield" className="h-4 w-4" />
                Assurances
              </Button>
            </Link>
            <Link href="/blog/energie">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="zap" className="h-4 w-4" />
                Énergie
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            <BrandIcon name="star" className="h-5 w-5 mr-2 text-amber-400" />
            Article à la une
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="h-full w-full object-cover transition hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 rounded-full bg-primary-500/20 px-2 py-1 text-primary-300">
                  <BrandIcon name="calendar" className="h-3 w-3" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-neutral-300">
                  <BrandIcon name="user" className="h-3 w-3" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-neutral-800 px-2 py-1 text-neutral-300">
                  <BrandIcon name="clock" className="h-3 w-3" />
                  {blogPosts[0].readingTime} min
                </span>
                <span className="flex items-center gap-1 rounded-full bg-primary-500/20 px-2 py-1 text-primary-300">
                  <BrandIcon name="tag" className="h-3 w-3" />
                  {blogPosts[0].category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{blogPosts[0].title}</h3>
              <p className="text-neutral-400 mb-6">{blogPosts[0].excerpt}</p>

              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="btn-premium inline-flex items-center justify-center gap-2 w-fit"
              >
                Lire l'article
                <BrandIcon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Blog posts */}
        <BlogSection
          title="Tous nos articles"
          description="Découvrez nos derniers articles et analyses"
          posts={blogPosts.slice(1)}
        />

        {/* Newsletter */}
        <NewsletterSection
          title="Ne manquez aucun article !"
          description="Abonnez-vous à notre newsletter pour recevoir nos derniers articles et conseils directement dans votre boîte mail."
          onSubmit={handleNewsletterSubmit}
        />

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vous avez aimé nos articles ?
          </h2>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Découvrez nos comparateurs pour passer à l'action et économiser dès maintenant
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/comparateurs/box-internet">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="wifi" className="h-4 w-4" />
                Comparer les box internet
              </Button>
            </Link>
            <Link href="/comparateurs/forfait-mobile">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="phone" className="h-4 w-4" />
                Comparer les forfaits mobile
              </Button>
            </Link>
            <Link href="/comparateurs/electricite">
              <Button variant="outline" size="lg" className="gap-2">
                <BrandIcon name="zap" className="h-4 w-4" />
                Comparer les offres d'énergie
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
