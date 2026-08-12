import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type SpinnerProps = React.SVGAttributes<SVGSVGElement> &
  VariantProps<typeof spinnerVariants>;

export function Spinner({ className, size, ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn(spinnerVariants({ size }), className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}

type LoadingSpinnerProps = {
  label?: string;
  className?: string;
  size?: VariantProps<typeof spinnerVariants>["size"];
};

export function LoadingSpinner({
  label = "Loading...",
  className,
  size = "default",
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)} role="status">
      <Spinner size={size} />
      {label ? <p className="text-muted-foreground text-sm">{label}</p> : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}
