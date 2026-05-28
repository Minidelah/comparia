"use client";

import { useState, useEffect } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  description: string;
  acceptLabel: string;
  rejectLabel: string;
  learnMoreLabel: string;
  learnMoreUrl: string;
  className?: string;
};

export default function CookieConsent({
  title,
  description,
  acceptLabel,
  rejectLabel,
  learnMoreLabel,
  learnMoreUrl,
  className,
}: Props) {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if cookie consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay to allow page to load before showing consent
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
    // Here you would typically load any tracking scripts
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className={cn("fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl", className)}>
      <div className="card-premium border-2 border-primary-500/30 bg-neutral-900/80 backdrop-blur">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-300">
            <BrandIcon name="cookie" className="h-6 w-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-neutral-300 mb-4">
              {description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleAccept}
                variant="primary"
                size="sm"
                className="flex-1"
              >
                {acceptLabel}
              </Button>
              <Button
                onClick={handleReject}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                {rejectLabel}
              </Button>
            </div>

            <a
              href={learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-primary-300"
            >
              <BrandIcon name="info" className="h-3 w-3" />
              {learnMoreLabel}
            </a>
          </div>

          <button
            onClick={handleReject}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
          >
            <BrandIcon name="x" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}