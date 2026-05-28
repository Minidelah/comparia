import { cn } from "@/lib/utils";

type ListItem = {
  id: string;
  content: React.ReactNode;
};

type Props = {
  items: ListItem[];
  className?: string;
  variant?: "default" | "ordered" | "unordered" | "inline";
  marker?: "disc" | "circle" | "square" | "decimal" | "none";
};

export default function List({ items, className, variant = "unordered", marker = "disc" }: Props) {
  
  const variantClasses = {
    default: "list-none",
    ordered: "list-decimal",
    unordered: `list-${marker}`,
    inline: "list-none flex flex-wrap gap-2",
  };

  const Component = variant === "ordered" ? "ol" : "ul";

  return (
    <Component className={cn("space-y-2 pl-5", variantClasses[variant], className)}>
      {items.map((item) => (
        <li key={item.id} className={cn(variant === "inline" ? "inline-flex items-center gap-2" : "")}>
          {item.content}
        </li>
      ))}
    </Component>
  );
}