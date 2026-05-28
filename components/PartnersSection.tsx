import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  logo: string;
  url?: string;
};

type Props = {
  title: string;
  description?: string;
  partners: Partner[];
  className?: string;
};

export default function PartnersSection({ title, description, partners, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-amber-300 mb-4">
            <BrandIcon name="partners" className="h-3 w-3" />
            Partenaires
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={cn("flex items-center justify-center p-6 grayscale transition hover:grayscale-0",
                partner.url ? "cursor-pointer" : "")}
            >
              {partner.url ? (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className="flex h-16 items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}