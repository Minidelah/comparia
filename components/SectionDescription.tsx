import { cn } from "@/lib/utils";

type Props = {
  description: string;
  className?: string;
};

export default function SectionDescription({ description, className }: Props) {
  return (
    <p className={cn("text-lg text-neutral-400 max-w-3xl mx-auto", className)}>
      {description}
    </p>
  );
}