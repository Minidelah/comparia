import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/comparateurs",
  "/onboarding",
  "/tableau-de-bord",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/transparence-affiliation",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/comparateurs/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: category.status === "active" ? 0.8 : 0.4,
    })),
  ];
}
