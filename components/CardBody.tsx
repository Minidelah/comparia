import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CardBody({ children, className }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}