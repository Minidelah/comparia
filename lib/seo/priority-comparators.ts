export const priorityComparators = [
  {
    href: "/comparateurs/box-internet",
    slug: "box-internet",
    title: "Comparateur box internet",
    body: "Comparer fibre, Wi-Fi, TV et services inclus pour réduire une facture internet trop haute.",
  },
  {
    href: "/comparateurs/forfait-mobile",
    slug: "forfait-mobile",
    title: "Comparateur forfait mobile",
    body: "Comparer data, réseau, Europe et Suisse incluse sans payer des options inutiles.",
  },
  {
    href: "/comparateurs/electricite",
    slug: "electricite",
    title: "Comparateur électricité",
    body: "Comparer prix, stabilité et offre verte selon ton logement et ta consommation.",
  },
  {
    href: "/comparateurs/assurance-habitation",
    slug: "assurance-habitation",
    title: "Comparateur assurance habitation",
    body: "Comparer ton contrat logement selon ton statut, la surface et les garanties utiles.",
  },
  {
    href: "/comparateurs/banque",
    slug: "banque",
    title: "Comparateur banque en ligne",
    body: "Comparer frais, carte, application mobile et services utiles au quotidien.",
  },
] as const;

export const priorityComparatorSlugs: ReadonlySet<string> = new Set(priorityComparators.map((item) => item.slug));
