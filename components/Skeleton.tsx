import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
};

export default function Skeleton({ className, width, height, circle = false }: Props) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-neutral-800",
        circle ? "rounded-full" : "",
        className
      )}
      style={{ width, height }}
    />
  );
}