import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function Checkbox({ id, label, checked, onChange, className, disabled = false }: Props) {
  return (
    <label htmlFor={id} className={cn("flex items-center gap-3", disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer", className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-neutral-600 text-primary-500 focus:ring-primary-500"
      />
      <span className={cn("text-sm text-neutral-300", disabled ? "text-neutral-500" : "")}>
        {label}
      </span>
    </label>
  );
}