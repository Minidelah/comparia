import Link from "next/link";
import { categories } from "@/lib/categories";
import CategoryCardPremium from "@/components/CategoryCardPremium";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  categories?: string[];
  showAllLink?: boolean;
  className?: string;
  variant?: "grid" | "list";
};

export default function ComparatorSection({
  title,
  description,
  categories: categorySlugs,
  showAllLink = true,
  className,
  variant = "grid",
}: Props) {
  
  // Filter categories based on provided slugs or use all active categories
  const filteredCategories = categorySlugs
    ? categories.filter(cat => categorySlugs.includes(cat.slug) && cat.status === "active")
    : categories.filter(cat => cat.status === "active");
  
  // Sort by saving value
  const sortedCategories = [...filteredCategories].sort((a, b) => 
    getSavingValue(b.saving) - getSavingValue(a.saving)
  );

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-primary-300 mb-4">
            <BrandIcon name="comparison" className="h-3 w-3" />
            Comparateurs
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          "grid gap-6",
          variant === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"
        )}>
          {sortedCategories.map((category, index) => (
            <CategoryCardPremium
              key={category.slug}
              category={category}
              showAction={true}
              className={cn(
                variant === "grid" ? "" : "max-w-2xl mx-auto",
                index < 2 ? "hover-glow" : ""
              )}
              variant={index === 0 ? "gradient" : index === 1 ? "glass" : "default"}
            />
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 text-center">
            <Link
              href="/comparateurs"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Voir tous les comparateurs
              <BrandIcon name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function getSavingValue(saving: string) {
  const amount = saving.match(/\d+/)?.[0];
  return amount ? Number(amount) : 0;
}