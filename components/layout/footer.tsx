import Link from "next/link";
import { Dumbbell, Globe, Share2, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ROUTES } from "@/lib/constants";
import { siteConfig } from "@/config/site";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: ROUTES.calculators, label: "Calculators" },
      { href: ROUTES.workouts, label: "Workout Plans" },
      { href: ROUTES.dietPlans, label: "Diet Plans" },
      { href: ROUTES.recipes, label: "Recipes" },
      { href: ROUTES.dashboard, label: "Dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: ROUTES.blog, label: "Blog" },
      { href: ROUTES.about, label: "About Us" },
      { href: ROUTES.contact, label: "Contact" },
      { href: "/api/rss", label: "RSS Feed" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: ROUTES.contact, label: "Help Center" },
      { href: ROUTES.forgotPassword, label: "Account" },
      { href: ROUTES.register, label: "Get Started" },
      { href: ROUTES.login, label: "Sign In" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: ROUTES.privacy, label: "Privacy Policy" },
      { href: ROUTES.terms, label: "Terms of Service" },
      { href: ROUTES.disclaimer, label: "Disclaimer" },
    ],
  },
];

const socialLinks = [
  { href: siteConfig.links.twitter, label: "Twitter", icon: Share2 },
  { href: siteConfig.links.github, label: "GitHub", icon: ExternalLink },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Globe },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="space-y-5 lg:col-span-2">
            <Link href={ROUTES.home} className="flex items-center gap-2.5 font-semibold">
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-xl">
                <Dumbbell className="text-primary h-5 w-5" aria-hidden />
              </div>
              <span className="font-display text-lg">FitCalc Hub</span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-background hover:bg-primary/10 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built for athletes, trainers, and health enthusiasts worldwide.
          </p>
        </div>
      </Container>
    </footer>
  );
}
