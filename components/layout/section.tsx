import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "py-0",
      sm: "py-8 md:py-10",
      default: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32",
    },
    variant: {
      default: "",
      muted: "bg-muted/40",
      accent: "bg-accent/30",
    },
  },
  defaultVariants: {
    spacing: "default",
    variant: "default",
  },
});

type SectionProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: "section" | "div" | "aside";
  };

export function Section({
  as: Comp = "section",
  className,
  spacing,
  variant,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn(sectionVariants({ spacing, variant }), className)} {...props}>
      {children}
    </Comp>
  );
}

export { sectionVariants };
