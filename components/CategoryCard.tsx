import Link from "next/link";
import type { Category } from "@/lib/categories";
import BrandIcon, { getCategoryIcon } from "@/components/BrandIcon";

type Props = {
  category: Category;
  showAction?: boolean;
};

export default function CategoryCard({ category, showAction = false }: Props) {
  return (
    <article className="card-premium hover-lift hover-shadow transition-all duration-300">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 text-cyan-300 ring-1 ring-inset ring-cyan-300/30">
        <BrandIcon name={getCategoryIcon(category.slug)} className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{category.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{category.description}</p>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-semibold text-emerald-400">{category.saving}</span>
        {category.badge && (
          <span className="badge badge-success">
            {category.badge}
          </span>
        )}
      </div>
      {showAction && (
        <Link
          href={`/comparateurs/${category.slug}`}
          className="btn-premium mt-5 w-full text-center"
        >
          Comparer maintenant
        </Link>
      )}
    </article>
  );
}
