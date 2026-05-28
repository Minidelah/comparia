import { cn } from "@/lib/utils";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export default function Radio({ id, name, label, value, checked, onChange, className, disabled = false }: Props) {
  return (
    <label htmlFor={id} className={cn("flex items-center gap-3", disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer", className)}>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="h-4 w-4 border-neutral-600 text-primary-500 focus:ring-primary-500"
      />
      <span className={cn("text-sm text-neutral-300", disabled ? "text-neutral-500" : "")}>
        {label}
      </span>
    </label>
  );
}