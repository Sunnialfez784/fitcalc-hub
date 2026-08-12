export const siteConfig = {
  name: "FitCalc Hub",
  shortName: "FitCalc",
  description:
    "Enterprise fitness, nutrition, workout, and health platform — calculators, plans, recipes, and progress tracking.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/images/og-default.png",
  locale: "en_US",
  twitterHandle: "@fitcalchub",
  links: {
    twitter: "https://twitter.com/fitcalchub",
    github: "https://github.com/fitcalchub",
    linkedin: "https://linkedin.com/company/fitcalchub",
  },
} as const;

export type SiteConfig = typeof siteConfig;
