"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Bookmark, Check, Share2 } from "lucide-react";
import { actionMarkComplete, actionToggleBookmark } from "@/features/workouts/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WorkoutActionsProps = {
  bookmarkKey: string;
  title: string;
  href: string;
  initialBookmarked?: boolean;
};

export function WorkoutActions({
  bookmarkKey,
  title,
  href,
  initialBookmarked = false,
}: WorkoutActionsProps) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [done, setDone] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : href;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant={bookmarked ? "default" : "outline"}
        size="sm"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const next = await actionToggleBookmark(bookmarkKey);
            setBookmarked(next);
          })
        }
      >
        <Bookmark className={bookmarked ? "fill-current" : undefined} />
        {bookmarked ? "Saved" : "Bookmark"}
      </Button>
      <Button
        type="button"
        variant={done ? "default" : "outline"}
        size="sm"
        disabled={pending || done}
        onClick={() =>
          start(async () => {
            await actionMarkComplete({ title, href });
            setDone(true);
            router.refresh();
          })
        }
      >
        <Check />
        {done ? "Completed" : "Mark complete"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="sm">
            <Share2 />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on X
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.href)}>
            Copy link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
