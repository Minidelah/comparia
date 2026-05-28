import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type SearchResultItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  icon?: string;
};

type Props = {
  query: string;
  results: SearchResultItem[];
  onClear: () => void;
  className?: string;
};

export default function SearchResults({ query, results, onClear, className }: Props) {
  return (
    <div className={cn("card-premium", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">
          Résultats pour "{query}"
        </h3>
        <button
          onClick={onClear}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
        >
          <BrandIcon name="x" className="h-4 w-4" />
        </button>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-8">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-400">
              <BrandIcon name="search" className="h-6 w-6" />
            </div>
          </div>
          <p className="text-neutral-400">Aucun résultat trouvé</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((result) => (
            <a
              key={result.id}
              href={result.href}
              className="flex items-center justify-between gap-4 rounded-lg p-3 transition hover:bg-neutral-800"
            >
              <div className="flex items-center gap-3">
                {result.icon && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/20 text-primary-300">
                    <BrandIcon name={result.icon} className="h-4 w-4" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-white truncate">{result.title}</h4>
                  {result.category && (
                    <p className="text-xs text-neutral-400">{result.category}</p>
                  )}
                  <p className="text-sm text-neutral-400 truncate-2">{result.description}</p>
                </div>
              </div>
              <BrandIcon name="chevron-right" className="h-4 w-4 text-neutral-400" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}