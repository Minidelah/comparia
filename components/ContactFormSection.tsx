"use client";

import { useState } from "react";
import BrandIcon from "@/components/BrandIcon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  options?: { value: string; label: string }[];
};

type Props = {
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel: string;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  successMessage?: string;
  className?: string;
};

export default function ContactFormSection({
  title,
  description,
  fields,
  submitLabel,
  onSubmit,
  successMessage = "Merci pour votre message ! Nous vous répondrons bientôt.",
  className,
}: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = "Ce champ est requis";
        isValid = false;
      }

      if (field.type === "email" && formData[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        newErrors[field.name] = "Email invalide";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await onSubmit(formData);
      setSubmitStatus("success");
      setFormData({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
        <div className="mx-auto max-w-2xl text-center">
          <div className="card-premium">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-500/20 text-success-400">
                <BrandIcon name="check-circle" className="h-8 w-8" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Message envoyé !</h2>
            <p className="text-neutral-300">{successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("px-5 py-14 sm:px-8 lg:px-10", className)}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1.5 text-xs uppercase tracking-widest text-green-300 mb-4">
            <BrandIcon name="mail" className="h-3 w-3" />
            Contact
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
          {description && (
            <p className="mt-3 text-lg text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <div className="card-premium">
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-neutral-200 mb-2">
                  {field.label}
                  {field.required && <span className="text-danger-400">*</span>}
                </label>
                
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={cn("input-premium min-h-[120px] resize-y",
                      errors[field.name] ? "border-danger-500" : ""
                    )}
                    required={field.required}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={cn("input-premium appearance-none",
                      errors[field.name] ? "border-danger-500" : ""
                    )}
                    required={field.required}
                  >
                    <option value="">{field.placeholder}</option>
                    {field.options?.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={cn("input-premium",
                      errors[field.name] ? "border-danger-500" : ""
                    )}
                    required={field.required}
                  />
                )}
                
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-danger-400 flex items-center gap-1">
                    <BrandIcon name="alert-triangle" className="h-3 w-3" />
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {submitStatus === "error" && (
              <div className="rounded-xl border border-danger-500/30 bg-danger-500/10 p-3 text-sm text-danger-300 flex items-center gap-2">
                <BrandIcon name="alert-triangle" className="h-4 w-4" />
                Une erreur est survenue. Veuillez réessayer.
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <BrandIcon name="loader" className="h-4 w-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <BrandIcon name="send" className="h-4 w-4 mr-2" />
                    {submitLabel}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}