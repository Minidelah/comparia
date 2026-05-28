import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type FooterLink = {
  href: string;
  label?: string;
  icon?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type Props = {
  sections: FooterSection[];
  socialLinks: FooterLink[];
  legalLinks: FooterLink[];
  copyright: string;
  className?: string;
};

export default function FooterPremium({
  sections,
  socialLinks,
  legalLinks,
  copyright,
  className,
}: Props) {
  return (
    <footer className={cn("border-t border-neutral-800 bg-neutral-950/50 backdrop-blur", className)}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500">
                <BrandIcon name="logo" className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">{siteConfig.name}</span>
            </div>
            <p className="mt-4 text-sm text-neutral-400">{siteConfig.tagline}.</p>
            <p className="mt-2 text-xs text-neutral-500">
              <a href={siteConfig.url} className="hover:text-primary-400">
                {siteConfig.url.replace(/^https:\/\//, "")}
              </a>
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300 transition hover:bg-primary-500 hover:text-white"
                >
                  <BrandIcon name={link.icon || "link"} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {sections.map((section) => (
            <div key={section.title} className="">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition hover:text-primary-400 flex items-center gap-2"
                    >
                      {link.icon && <BrandIcon name={link.icon} className="h-4 w-4" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal and copyright */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-neutral-500">{copyright}</p>
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 transition hover:text-neutral-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <BrandIcon name="lock" className="h-4 w-4 text-neutral-500" />
            <span className="text-xs text-neutral-500">
              Toutes tes données sont sécurisées et confidentielles
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}