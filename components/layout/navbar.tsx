"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { NAV_LINKS, ROUTES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={ROUTES.home} className="flex items-center gap-2 font-semibold tracking-tight">
          <Dumbbell className="text-primary h-6 w-6" />
          <span className="text-lg">FitCalc Hub</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href={ROUTES.login}>Log in</Link>
          </Button>
          <Button asChild>
            <Link href={ROUTES.register}>Get started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      <div className={cn("border-t md:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col gap-2 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href={ROUTES.login}>Log in</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href={ROUTES.register}>Get started</Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
