import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Props = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  className?: string;
  variant?: "default" | "highlight";
};

export default function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  className,
  variant = "default",
}: Props) {
  return (
    <div
      className={cn(
        "card-premium relative overflow-hidden",
        variant === "highlight" ? "border-2 border-primary-500/30 bg-neutral-900/50" : "",
        className
      )}
    >
      {/* Quote icon */}
      <div className="absolute left-4 top-4 text-primary-500/20">
        <BrandIcon name="quote" className="h-12 w-12 opacity-20" />
      </div>

      <div className="relative z-10">
        <p className="text-lg font-medium text-neutral-100">"{quote}"</p>

        <div className="mt-6 flex items-center gap-4">
          {/* Avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="h-12 w-12 rounded-full object-cover"
              width={48}
              height={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold">
              {getInitials(author)}
            </div>
          )}

          <div>
            <p className="font-semibold text-white">{author}</p>
            {role && <p className="text-sm text-neutral-400">{role}</p>}
          </div>
        </div>

        {/* Rating */}
        {rating && (
          <div className="mt-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <BrandIcon
                key={i}
                name="star"
                className={cn("h-4 w-4", i < rating ? "text-amber-400" : "text-neutral-600")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.split(" ");
  let initials = parts[0].substring(0, 1).toUpperCase();

  if (parts.length > 1) {
    initials += parts[parts.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}