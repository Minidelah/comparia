import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: Props) {
  return (
    <nav className={cn("mb-6", className)} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <BrandIcon name="chevron-right" className="h-3 w-3 text-neutral-500" />
            )}
            
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
              >
                {item.icon && <BrandIcon name={item.icon} className="h-3 w-3" />}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1 rounded-lg px-2 py-1 text-neutral-300">
                {item.icon && <BrandIcon name={item.icon} className="h-3 w-3" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}