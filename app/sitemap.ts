import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { seoGuides } from "@/lib/seo/guides";
import { priorityComparatorSlugs } from "@/lib/seo/priority-comparators";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/comparateurs",
  "/guides",
  "/onboarding",
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
      priority: priorityComparatorSlugs.has(category.slug) ? 0.92 : category.status === "active" ? 0.8 : 0.4,
    })),
    ...seoGuides.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
