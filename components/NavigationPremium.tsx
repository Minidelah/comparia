"use client";

import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type NavLink = {
  href: string;
  label: string;
  icon?: string;
  dropdown?: NavLink[];
};

type Props = {
  logo: {
    href: string;
    label: string;
    icon: string;
  };
  links: NavLink[];
  cta?: {
    href: string;
    label: string;
    icon?: string;
  };
  className?: string;
};

export default function NavigationPremium({ logo, links, cta, className }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-2xl"
        : "border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur",
      className
    )}>
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href={logo.href} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500">
                  <BrandIcon name={logo.icon} className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">{logo.label}</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {links.map((link) => (
                <div key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800 hover:text-white",
                      activeDropdown === link.href ? "bg-neutral-800" : ""
                    )}
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.href)}
                    onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                  >
                    {link.icon && <BrandIcon name={link.icon} className="h-4 w-4" />}
                    {link.label}
                    {link.dropdown && (
                      <BrandIcon name="chevron-down" className="h-3 w-3 text-neutral-400" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.href && (
                    <div
                      className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-neutral-900 p-4 shadow-2xl shadow-black/30"
                      onMouseEnter={() => setActiveDropdown(link.href)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="grid gap-2">
                        {link.dropdown.map((dropdownLink) => (
                          <Link
                            key={dropdownLink.href}
                            href={dropdownLink.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                          >
                            {dropdownLink.icon && <BrandIcon name={dropdownLink.icon} className="h-4 w-4" />}
                            {dropdownLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {cta && (
              <div className="hidden lg:block">
                <Link
                  href={cta.href}
                  className="btn-premium inline-flex items-center justify-center gap-1 px-4 py-2 text-sm"
                >
                  {cta.icon && <BrandIcon name={cta.icon} className="h-4 w-4" />}
                  {cta.label}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 text-neutral-200 transition hover:bg-neutral-700"
              >
                <BrandIcon name={mobileMenuOpen ? "x" : "menu"} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
            <div className="grid gap-4">
              {links.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-neutral-200 transition hover:bg-neutral-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      {link.icon && <BrandIcon name={link.icon} className="h-4 w-4" />}
                      {link.label}
                    </div>
                    {link.dropdown && (
                      <BrandIcon name="chevron-right" className="h-4 w-4 text-neutral-400" />
                    )}
                  </Link>

                  {/* Mobile Dropdown */}
                  {link.dropdown && (
                    <div className="ml-4 mt-2 grid gap-2 border-l border-neutral-800 pl-4">
                      {link.dropdown.map((dropdownLink) => (
                        <Link
                          key={dropdownLink.href}
                          href={dropdownLink.href}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownLink.icon && <BrandIcon name={dropdownLink.icon} className="h-4 w-4" />}
                          {dropdownLink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {cta && (
                <Link
                  href={cta.href}
                  className="btn-premium inline-flex items-center justify-center gap-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cta.icon && <BrandIcon name={cta.icon} className="h-4 w-4" />}
                  {cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}