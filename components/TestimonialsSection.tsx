import TestimonialCard from "@/components/TestimonialCard";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
};

type Props = {
  title: string;
  description?: string;
  testimonials: Testimonial[];
  className?: string;
};

export default function TestimonialsSection({ title, description, testimonials, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-success-400/30 bg-success-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-success-300 mb-4">
            <BrandIcon name="users" className="h-3 w-3" />
            Témoignages
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              variant={index === 1 ? "highlight" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}