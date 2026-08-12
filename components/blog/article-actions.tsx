"use client";

import { useCallback, useState } from "react";
import { Bookmark, Check, Heart, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { incrementArticleLikes, incrementArticleShares } from "@/features/articles/actions";
import { cn } from "@/lib/utils";

type ArticleActionsProps = {
  slug: string;
  title: string;
  initialLikes: number;
  className?: string;
};

export function ArticleActions({ slug, title, initialLikes, className }: ArticleActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      await incrementArticleShares(slug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [slug]);

  const onLike = async () => {
    if (liked) return;
    const next = await incrementArticleLikes(slug);
    setLikes(next);
    setLiked(true);
  };

  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button type="button" variant={liked ? "default" : "outline"} size="sm" onClick={onLike}>
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
        {likes}
      </Button>
      <Button
        type="button"
        variant={bookmarked ? "default" : "outline"}
        size="sm"
        onClick={() => setBookmarked((v) => !v)}
      >
        <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
        {bookmarked ? "Saved" : "Bookmark"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a href={tweet} target="_blank" rel="noopener noreferrer">
              Share on X / Twitter
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
