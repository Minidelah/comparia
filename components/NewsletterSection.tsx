"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  description?: string;
  onSubmit: (email: string) => Promise<void>;
  successMessage?: string;
  className?: string;
};

export default function NewsletterSection({
  title,
  description,
  onSubmit,
  successMessage = "Merci pour votre inscription !",
  className,
}: Props) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Veuillez entrer votre email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email invalide");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setError("");

    try {
      await onSubmit(email);
      setSubmitStatus("success");
      setEmail("");
    } catch (err) {
      setSubmitStatus("error");
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
        <div className="mx-auto max-w-2xl">
          <div className="card-premium text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/20 text-success-400">
                <BrandIcon name="check-circle" className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Inscription réussie !</h2>
            <p className="text-neutral-300">{successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-4xl">
        <div className="card-premium bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/30">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              {description && (
                <p className="text-neutral-300 mb-6">{description}</p>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <BrandIcon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="email"
                      placeholder="Votre email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className={cn("input-premium pl-12 pr-4",
                        error ? "border-danger-500" : "")}
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-xs text-danger-400 flex items-center gap-1">
                      <BrandIcon name="alert-triangle" className="h-3 w-3" />
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <BrandIcon name="loader" className="h-4 w-4 mr-2 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <BrandIcon name="send" className="h-4 w-4 mr-2" />
                      S'inscrire
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-4 text-xs text-neutral-500">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500">
                <BrandIcon name="newsletter" className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}