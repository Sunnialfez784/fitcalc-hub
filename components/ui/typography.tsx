import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-display tracking-tight text-foreground", {
  variants: {
    level: {
      h1: "text-4xl font-bold md:text-5xl",
      h2: "text-3xl font-bold md:text-4xl",
      h3: "text-2xl font-semibold md:text-3xl",
      h4: "text-xl font-semibold md:text-2xl",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

type HeadingLevel = NonNullable<VariantProps<typeof headingVariants>["level"]>;

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: HeadingLevel;
  };

export function Heading({ className, level = "h2", as, children, ...props }: HeadingProps) {
  const Tag = as ?? level ?? "h2";
  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Tag>
  );
}

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      body: "text-base leading-relaxed",
      lead: "text-lg leading-relaxed text-muted-foreground",
      large: "text-lg font-medium",
      small: "text-sm leading-normal",
      muted: "text-sm text-muted-foreground",
      caption: "text-xs text-muted-foreground",
      code: "font-mono text-sm rounded bg-muted px-1.5 py-0.5",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "normal",
  },
});

export type TextProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof textVariants>;

export function Text({ className, variant, weight, children, ...props }: TextProps) {
  return (
    <p className={cn(textVariants({ variant, weight }), className)} {...props}>
      {children}
    </p>
  );
}

export function Lead({ className, ...props }: Omit<TextProps, "variant">) {
  return <Text variant="lead" className={className} {...props} />;
}

export function Muted({ className, ...props }: Omit<TextProps, "variant">) {
  return <Text variant="muted" className={className} {...props} />;
}

export function Blockquote({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn("border-primary text-muted-foreground border-l-4 pl-4 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function Code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code className={cn(textVariants({ variant: "code" }), className)} {...props}>
      {children}
    </code>
  );
}
