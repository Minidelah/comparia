import Link from "next/link";
import type { Category } from "@/lib/categories";
import BrandIcon, { getCategoryIcon } from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  category: Category;
  showAction?: boolean;
  className?: string;
  variant?: "default" | "gradient" | "glass";
};

export default function CategoryCardPremium({
  category,
  showAction = false,
  className,
  variant = "default",
}: Props) {
  
  const baseClasses = "card-premium hover-lift hover-shadow transition-all duration-300";
  
  const variantClasses = {
    default: "bg-neutral-900 border-neutral-800",
    gradient: "bg-gradient-to-br from-neutral-900 to-neutral-800 border-transparent",
    glass: "card-glass border-neutral-800/30",
  };
  
  return (
    <article className={cn(baseClasses, variantClasses[variant], className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 text-cyan-300 ring-1 ring-inset ring-cyan-300/30">
        <BrandIcon name={getCategoryIcon(category.slug)} className="h-6 w-6" />
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {category.title}
          {category.new && (
            <span className="badge badge-success badge-outline text-xs px-2 py-0.5">
              Nouveau
            </span>
          )}
        </h3>
        
        <p className="mt-2 text-sm text-neutral-400">{category.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-emerald-400">{category.saving}</span>
            {category.popular && (
              <span className="badge badge-warning text-xs px-2 py-0.5">
                Populaire
              </span>
            )}
          </div>
          {category.rating && (
            <div className="flex items-center gap-1">
              <BrandIcon name="star" className="h-3 w-3 text-amber-400" />
              <span className="text-xs text-amber-300">{category.rating}/5</span>
            </div>
          )}
        </div>
      </div>
      
      {showAction && (
        <Link
          href={`/comparateurs/${category.slug}`}
          className={cn("btn-premium mt-5 w-full text-center justify-center", 
            variant === "glass" ? "bg-white/10 backdrop-blur-sm" : "")}
        >
          Comparer maintenant
          <BrandIcon name="arrow-right" className="h-4 w-4 ml-1" />
        </Link>
      )}
    </article>
  );
}