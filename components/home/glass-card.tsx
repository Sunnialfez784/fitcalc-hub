import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
};

export function GlassCard({ className, glow, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "border-border/60 bg-card/60 rounded-2xl border shadow-sm backdrop-blur-xl",
        glow && "ring-primary/20 shadow-primary/5 ring-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
