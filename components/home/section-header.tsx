import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-primary mb-3 text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
