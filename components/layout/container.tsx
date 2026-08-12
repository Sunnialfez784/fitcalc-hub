import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      default: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "default",
  },
});

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof containerVariants>;

export function Container({ className, size, padding, children, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ size, padding }), className)} {...props}>
      {children}
    </div>
  );
}

export { containerVariants };
