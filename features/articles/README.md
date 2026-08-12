# Blog CMS

Production-ready article system for FitCalc Hub.

## Routes

| Route                   | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `/blog`                 | Home — featured, latest, trending, search, categories, tags |
| `/blog/[slug]`          | Article page                                                |
| `/blog/category/[slug]` | Category archive                                            |
| `/blog/tag/[slug]`      | Tag archive                                                 |
| `/api/rss`              | RSS feed                                                    |

## Add a new article (no admin yet)

### Option A — Content file (recommended now)

1. Open \`features/articles/data/articles.ts\`
2. Append an object to \`SAMPLE_ARTICLES\` (copy an existing entry)
3. Set \`title\`, \`slug\`, \`excerpt\`, \`content\` (Markdown), \`authorId\`, \`categoryId\`, \`tagIds\`
4. Refresh \`/blog\` — it appears immediately

Taxonomy IDs live in \`features/articles/data/taxonomy.ts\`.

### Option B — Service API (admin panel later)

\`\`\`ts
import { createArticle, publishArticle } from "@/features/articles";

const article = await createArticle({
title: "My New Guide",
excerpt: "…",
content: "## Hello\\n\\nMarkdown body…",
authorId: "author-mike",
categoryId: "cat-training",
tagIds: ["tag-beginner"],
status: "DRAFT",
});

await publishArticle(article.slug);
\`\`\`

### Option C — PostgreSQL

1. Configure \`DATABASE_URL\`
2. \`pnpm db:push\`
3. \`pnpm db:seed\` — syncs sample articles into Prisma
4. Use \`prismaCreateArticle\` / \`prismaPublishArticle\` from \`features/articles/services\`

## Architecture

\`\`\`
features/articles/
data/ Sample content + taxonomy
services/ Query + admin mutations (memory + Prisma)
utils/ Reading time, TOC, slugify
seo/ Metadata + JSON-LD
types/ Shared TypeScript types

components/blog/ UI (cards, markdown, TOC, actions…)
prisma/schema.prisma Article, Tag, Author, Comment, Bookmark, ArticleView…
\`\`\`
