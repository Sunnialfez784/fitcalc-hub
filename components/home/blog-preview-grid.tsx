"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { GlassCard } from "@/components/home/glass-card";
import { MotionStagger, MotionItem } from "@/components/home/motion";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type BlogPreviewCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  gradient: string;
};

export function BlogPreviewGrid({ articles }: { articles: BlogPreviewCard[] }) {
  return (
    <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:hidden">
      {articles.map((article) => (
        <MotionItem key={article.slug}>
          <GlassCard className="overflow-hidden">
            <div className={cn("h-1.5 bg-gradient-to-r", article.gradient.replace("/15", "/40"))} />
            <div className="p-5">
              <Badge variant="secondary" className="mb-2">
                {article.category}
              </Badge>
              <Link href={`${ROUTES.blog}/${article.slug}`}>
                <h3 className="font-display text-base font-semibold">{article.title}</h3>
              </Link>
              <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm">{article.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                      {article.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">{article.author}</span>
                </div>
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" aria-hidden />
                  {article.readTime}
                </span>
              </div>
            </div>
          </GlassCard>
        </MotionItem>
      ))}
    </MotionStagger>
  );
}
