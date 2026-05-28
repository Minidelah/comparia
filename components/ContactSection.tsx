import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type ContactMethod = {
  type: string;
  value: string;
  icon: string;
  href?: string;
};

type Props = {
  title: string;
  description?: string;
  contactMethods: ContactMethod[];
  className?: string;
};

export default function ContactSection({ title, description, contactMethods, className }: Props) {
  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-teal-300 mb-4">
            <BrandIcon name="contact" className="h-3 w-3" />
            Contact
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={cn("card-premium hover-lift transition-all",
                index % 2 === 0 ? "bg-gradient-to-br from-neutral-900 to-neutral-800" : "")}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300">
                <BrandIcon name={method.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{method.type}</h3>
              {method.href ? (
                <a
                  href={method.href}
                  className="text-lg text-primary-300 hover:underline break-all"
                >
                  {method.value}
                </a>
              ) : (
                <p className="text-lg text-neutral-300 break-all">{method.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}