import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardFooter({ children, className }: Props) {
  return (
    <div className={cn("border-t border-neutral-800 pt-4 mt-4", className)}>
      {children}
    </div>
  );
}