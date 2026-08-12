import Link from "next/link";
import type { BlogAuthor } from "@/features/articles/types";
import { GlassCard } from "@/components/home/glass-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AuthorCardProps = {
  author: BlogAuthor;
  className?: string;
};

export function AuthorCard({ author, className }: AuthorCardProps) {
  return (
    <GlassCard className={cn("flex gap-4 p-5", className)}>
      <Avatar className="h-14 w-14">
        <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
          {author.avatar ?? author.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-display text-lg font-semibold">{author.name}</p>
        {author.role ? <p className="text-primary text-sm font-medium">{author.role}</p> : null}
        {author.bio ? (
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{author.bio}</p>
        ) : null}
        <Link
          href={`/blog?author=${author.slug}`}
          className="text-primary mt-2 inline-block text-sm font-medium hover:underline"
        >
          View articles
        </Link>
      </div>
    </GlassCard>
  );
}
