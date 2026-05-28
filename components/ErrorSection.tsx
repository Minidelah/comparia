import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  description: string;
  cta?: {
    href: string;
    label: string;
  };
  icon?: string;
  className?: string;
};

export default function ErrorSection({ title, description, cta, icon = "alert-triangle", className }: Props) {
  return (
    <div className={cn("text-center py-16 px-5", className)}>
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-danger-500/20 to-danger-600/20 text-danger-300">
          <BrandIcon name={icon} className="h-10 w-10" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-neutral-400 mb-6 max-w-md mx-auto">{description}</p>

      {cta && (
        <Link href={cta.href}>
          <Button variant="primary" size="lg">
            {cta.label}
          </Button>
        </Link>
      )}
    </div>
  );
}