"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
  icon?: string;
};

type Props = {
  title: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
};

export default function FAQSection({ title, description, faqs, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-info-400/30 bg-info-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-info-300 mb-4">
            <BrandIcon name="help" className="h-3 w-3" />
            Questions fréquentes
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 max-w-3xl mx-auto text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden",
                openIndex === index ? "border-primary-500/30" : ""
              )}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-neutral-800"
              >
                <div className="flex items-center gap-3">
                  {faq.icon && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/20 text-primary-300">
                      <BrandIcon name={faq.icon} className="h-4 w-4" />
                    </div>
                  )}
                  <h3 className="font-bold text-white">{faq.question}</h3>
                </div>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition",
                  openIndex === index ? "rotate-180 bg-primary-500 text-white" : "")}
                >
                  <BrandIcon name="chevron-down" className="h-4 w-4" />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-sm leading-6 text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}