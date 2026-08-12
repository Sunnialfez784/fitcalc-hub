import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { listArticles } from "@/features/articles/services";

/** RSS feed of published articles. */
export async function GET() {
  const { items } = await listArticles({ pageSize: 50 });

  const entries = items
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteConfig.url}/blog/${article.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <category><![CDATA[${article.category.name}]]></category>
      <author><![CDATA[${article.author.name}]]></author>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/api/rss" rel="self" type="application/rss+xml" />
    ${entries}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
