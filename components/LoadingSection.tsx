import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  className?: string;
};

export default function LoadingSection({ message = "Chargement en cours...", className }: Props) {
  return (
    <div className={cn("text-center py-16 px-5", className)}>
      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300">
          <BrandIcon name="loader" className="h-10 w-10 animate-spin" />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white">{message}</h2>
    </div>
  );
}