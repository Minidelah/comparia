import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
};

export default function PaginationSection({ currentPage, totalPages, basePath, className }: Props) {
  const getPageRange = () => {
    const delta = 2;
    const range: number[] = [];
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        if (l !== undefined) {
          if (i - l === 2) {
            range.push(l + 1);
          } else if (i - l !== 1) {
            range.push(-1); // Ellipsis
          }
        }
        range.push(i);
        l = i;
      }
    }

    return range;
  };

  const pageRange = getPageRange();

  return (
    <section className={cn("px-5 py-8 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
          {/* Previous button */}
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className={cn("flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700",
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            )}
          >
            <BrandIcon name="chevron-left" className="h-4 w-4" />
          </Link>

          {/* Page numbers */}
          {pageRange.map((page, index) => (
            page === -1 ? (
              <span key={index} className="flex h-10 w-10 items-center justify-center text-neutral-500">
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={`${basePath}?page=${page}`}
                className={cn("flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition",
                  currentPage === page
                    ? "border-primary-500 bg-primary-500 text-white"
                    : "border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                )}
              >
                {page}
              </Link>
            )
          ))}

          {/* Next button */}
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className={cn("flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700",
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            )}
          >
            <BrandIcon name="chevron-right" className="h-4 w-4" />
          </Link>
        </nav>

        <div className="mt-4 text-center text-sm text-neutral-500">
          Page {currentPage} sur {totalPages}
        </div>
      </div>
    </section>
  );
}