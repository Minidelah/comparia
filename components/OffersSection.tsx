import { OfferSlot } from "@/lib/offers";
import OfferCardPremium from "@/components/OfferCardPremium";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description?: string;
  offers: OfferSlot[];
  showAllLink?: boolean;
  className?: string;
  variant?: "grid" | "list";
  categorySlug?: string;
};

export default function OffersSection({
  title,
  description,
  offers,
  showAllLink = true,
  className,
  variant = "grid",
  categorySlug,
}: Props) {
  
  // Sort offers by rating and savings
  const sortedOffers = [...offers].sort((a, b) => {
    // Featured offers first
    if (a.badge === "Meilleur choix" && b.badge !== "Meilleur choix") return -1;
    if (b.badge === "Meilleur choix" && a.badge !== "Meilleur choix") return 1;
    
    // Then by rating
    const ratingB = b.rating ?? 4.4;
    const ratingA = a.rating ?? 4.4;
    if (ratingB !== ratingA) return ratingB - ratingA;
    
    // Then by savings
    const savingsB = getSavingValue(b.annualSavings || "0€");
    const savingsA = getSavingValue(a.annualSavings || "0€");
    return savingsB - savingsA;
  });

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary-400/30 bg-secondary-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-secondary-300 mb-4">
            <BrandIcon name="offers" className="h-3 w-3" />
            Offres recommandées
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          variant === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-6"
        )}>
          {sortedOffers.map((offer, index) => (
            <OfferCardPremium
              key={offer.id}
              offer={offer}
              className={cn(
                variant === "grid" ? "" : "max-w-3xl mx-auto",
                index === 0 ? "lg:col-span-2" : "",
                index === 0 ? "featured" : ""
              )}
              variant={index === 0 ? "featured" : "default"}
            />
          ))}
        </div>

        {showAllLink && categorySlug && (
          <div className="mt-12 text-center">
            <a
              href={`/comparateurs/${categorySlug}`}
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Voir toutes les offres
              <BrandIcon name="arrow-right" className="h-4 w-4" />
            </a>
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