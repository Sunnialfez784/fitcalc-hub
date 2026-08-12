import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/rss"],
      disallow: ["/dashboard", "/profile", "/admin", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
