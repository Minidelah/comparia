import Link from "next/link";
import type { Category } from "@/lib/categories";
import CompariaIcon, { getCategoryIcon } from "@/components/CompariaIcon";

type Props = {
  category: Category;
  showAction?: boolean;
};

export default function CategoryCard({ category, showAction = false }: Props) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-300/20">
        <CompariaIcon name={getCategoryIcon(category.slug)} />
      </div>
      <p className="mt-4 text-sm font-semibold text-white">{category.title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
      <p className="mt-5 text-sm font-semibold text-emerald-300">{category.saving}</p>
      {showAction && (
        <Link
          href={`/comparateurs/${category.slug}`}
          className="mt-5 block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-cyan-500/30"
        >
          Faire le comparateur
        </Link>
      )}
    </article>
  );
}
