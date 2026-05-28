import { cn } from "@/lib/utils";

type Step = {
  id: string;
  label: string;
  completed?: boolean;
  current?: boolean;
};

type Props = {
  steps: Step[];
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export default function Stepper({ steps, className, orientation = "horizontal" }: Props) {
  return (
    <div className={cn(
      orientation === "horizontal" ? "flex items-center justify-between" : "flex flex-col gap-4",
      className
    )}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            orientation === "horizontal" ? "flex-1" : "w-full",
            "flex items-center gap-2"
          )}
        >
          <div className="relative flex flex-col items-center">
            <div
              className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition",
                step.completed ? "bg-success-500 text-white" :
                step.current ? "bg-primary-500 text-white" :
                "bg-neutral-800 text-neutral-500"
              )}
            >
              {step.completed ? (
                <span className="text-xs">✓</span>
              ) : (
                index + 1
              )}
            </div>

            {index < steps.length - 1 && orientation === "horizontal" && (
              <div className={cn("absolute top-full h-1 w-full border-t-2 transition",
                steps[index + 1].completed ? "border-success-500" :
                step.completed ? "border-success-500" :
                "border-neutral-800"
              )} />
            )}
          </div>

          <div className={cn(
            orientation === "horizontal" ? "text-center" : "mt-2",
            "flex-1"
          )}>
            <p className={cn("text-sm font-medium",
              step.completed ? "text-success-400" :
              step.current ? "text-primary-400" :
              "text-neutral-500"
            )}>
              {step.label}
            </p>
          </div>

          {index < steps.length - 1 && orientation === "vertical" && (
            <div className={cn("h-8 w-1 border-l-2 transition ml-3",
              steps[index + 1].completed ? "border-success-500" :
              step.completed ? "border-success-500" :
              "border-neutral-800"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}