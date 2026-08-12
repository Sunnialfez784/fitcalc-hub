import { SAMPLE_ARTICLES } from "../data/articles";
import { BLOG_AUTHORS, BLOG_CATEGORIES, BLOG_TAGS } from "../data/taxonomy";
import type {
  Article,
  ArticleListParams,
  ArticleWithRelations,
  BlogAuthor,
  BlogCategory,
  BlogTag,
  CreateArticleInput,
  PaginatedArticles,
  UpdateArticleInput,
} from "../types";
import { calculateReadingTime, slugify } from "../utils";

/**
 * In-memory content store — powers the blog until Prisma/admin is wired.
 * Admin services mutate this store so the architecture stays the same.
 */
let articlesStore: Article[] = [...SAMPLE_ARTICLES];

function hydrate(article: Article): ArticleWithRelations {
  const author = BLOG_AUTHORS.find((a) => a.id === article.authorId) ?? BLOG_AUTHORS[0];
  const category = BLOG_CATEGORIES.find((c) => c.id === article.categoryId) ?? BLOG_CATEGORIES[0];
  const tags = BLOG_TAGS.filter((t) => article.tagIds.includes(t.id));
  return { ...article, author, category, tags };
}

function publishedFilter(list: Article[], publishedOnly = true) {
  if (!publishedOnly) return list;
  return list.filter((a) => a.published && a.status === "PUBLISHED");
}

// =============================================================================
// Queries
// =============================================================================

export async function listArticles(params: ArticleListParams = {}): Promise<PaginatedArticles> {
  const {
    page = 1,
    pageSize = 9,
    categorySlug,
    tagSlug,
    authorSlug,
    query,
    featured,
    publishedOnly = true,
  } = params;

  let list = publishedFilter(articlesStore, publishedOnly);

  if (featured !== undefined) {
    list = list.filter((a) => a.featured === featured);
  }

  if (categorySlug) {
    const cat = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
    if (cat) list = list.filter((a) => a.categoryId === cat.id);
  }

  if (tagSlug) {
    const tag = BLOG_TAGS.find((t) => t.slug === tagSlug);
    if (tag) list = list.filter((a) => a.tagIds.includes(tag.id));
  }

  if (authorSlug) {
    const author = BLOG_AUTHORS.find((a) => a.slug === authorSlug);
    if (author) list = list.filter((a) => a.authorId === author.id);
  }

  if (query?.trim()) {
    const q = query.toLowerCase();
    list = list.filter((a) => {
      const author = BLOG_AUTHORS.find((x) => x.id === a.authorId);
      const category = BLOG_CATEGORIES.find((x) => x.id === a.categoryId);
      const tags = BLOG_TAGS.filter((t) => a.tagIds.includes(t.id));
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        author?.name.toLowerCase().includes(q) ||
        category?.name.toLowerCase().includes(q) ||
        tags.some((t) => t.name.toLowerCase().includes(q) || t.slug.includes(q))
      );
    });
  }

  list = [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const items = list.slice(start, start + pageSize).map(hydrate);

  return { items, page, pageSize, total, totalPages };
}

export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  const article = articlesStore.find((a) => a.slug === slug);
  return article ? hydrate(article) : null;
}

export async function getFeaturedArticles(limit = 3): Promise<ArticleWithRelations[]> {
  const { items } = await listArticles({ featured: true, pageSize: limit });
  return items;
}

export async function getLatestArticles(limit = 6): Promise<ArticleWithRelations[]> {
  const { items } = await listArticles({ pageSize: limit });
  return items;
}

export async function getTrendingArticles(limit = 4): Promise<ArticleWithRelations[]> {
  const list = publishedFilter(articlesStore)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
    .map(hydrate);
  return list;
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<ArticleWithRelations[]> {
  const current = articlesStore.find((a) => a.slug === slug);
  if (!current) return [];

  const scored = publishedFilter(articlesStore)
    .filter((a) => a.slug !== slug)
    .map((a) => {
      let score = 0;
      if (a.categoryId === current.categoryId) score += 3;
      score += a.tagIds.filter((t) => current.tagIds.includes(t)).length;
      return { a, score };
    })
    .sort((x, y) => y.score - x.score || y.a.views - x.a.views)
    .slice(0, limit)
    .map(({ a }) => hydrate(a));

  return scored;
}

export async function getAdjacentArticles(slug: string): Promise<{
  prev: ArticleWithRelations | null;
  next: ArticleWithRelations | null;
}> {
  const list = publishedFilter(articlesStore).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const index = list.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: list[index + 1] ? hydrate(list[index + 1]) : null,
    next: list[index - 1] ? hydrate(list[index - 1]) : null,
  };
}

export async function listCategories(): Promise<BlogCategory[]> {
  return BLOG_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export async function listTags(): Promise<BlogTag[]> {
  return BLOG_TAGS;
}

export async function getTagBySlug(slug: string): Promise<BlogTag | null> {
  return BLOG_TAGS.find((t) => t.slug === slug) ?? null;
}

export async function getPopularTags(limit = 12): Promise<Array<BlogTag & { count: number }>> {
  const counts = new Map<string, number>();
  for (const article of publishedFilter(articlesStore)) {
    for (const tagId of article.tagIds) {
      counts.set(tagId, (counts.get(tagId) ?? 0) + 1);
    }
  }
  return BLOG_TAGS.map((tag) => ({ ...tag, count: counts.get(tag.id) ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function listAuthors(): Promise<BlogAuthor[]> {
  return BLOG_AUTHORS;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return publishedFilter(articlesStore).map((a) => a.slug);
}

// =============================================================================
// Mutations (admin-ready) — in-memory for now; swap body to Prisma later
// =============================================================================

export async function createArticle(input: CreateArticleInput): Promise<ArticleWithRelations> {
  const now = new Date().toISOString();
  const slug = input.slug || slugify(input.title);
  const article: Article = {
    id: `art-${slug}`,
    title: input.title,
    slug,
    excerpt: input.excerpt,
    content: input.content,
    coverImage: input.coverImage,
    featured: input.featured ?? false,
    status: input.status ?? "DRAFT",
    published: input.status === "PUBLISHED",
    publishedAt: input.status === "PUBLISHED" ? now : now,
    updatedAt: now,
    readingTime: calculateReadingTime(input.content),
    views: 0,
    likes: 0,
    shareCount: 0,
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    authorId: input.authorId,
    categoryId: input.categoryId,
    tagIds: input.tagIds ?? [],
    faqs: input.faqs,
  };
  articlesStore = [article, ...articlesStore];
  return hydrate(article);
}

export async function updateArticle(
  slug: string,
  input: UpdateArticleInput,
): Promise<ArticleWithRelations | null> {
  const index = articlesStore.findIndex((a) => a.slug === slug);
  if (index === -1) return null;

  const current = articlesStore[index];
  const updated: Article = {
    ...current,
    ...input,
    tagIds: input.tagIds ?? current.tagIds,
    readingTime: input.content ? calculateReadingTime(input.content) : current.readingTime,
    updatedAt: new Date().toISOString(),
    slug: input.slug ?? current.slug,
  };

  articlesStore = [...articlesStore.slice(0, index), updated, ...articlesStore.slice(index + 1)];
  return hydrate(updated);
}

export async function deleteArticle(slug: string): Promise<boolean> {
  const before = articlesStore.length;
  articlesStore = articlesStore.filter((a) => a.slug !== slug);
  return articlesStore.length < before;
}

export async function publishArticle(slug: string): Promise<ArticleWithRelations | null> {
  return updateArticle(slug, {
    status: "PUBLISHED",
    published: true,
    publishedAt: new Date().toISOString(),
  });
}

export async function draftArticle(slug: string): Promise<ArticleWithRelations | null> {
  return updateArticle(slug, {
    status: "DRAFT",
    published: false,
  });
}

export async function incrementViews(slug: string): Promise<void> {
  const article = articlesStore.find((a) => a.slug === slug);
  if (article) article.views += 1;
}

export async function incrementLikes(slug: string): Promise<number> {
  const article = articlesStore.find((a) => a.slug === slug);
  if (!article) return 0;
  article.likes += 1;
  return article.likes;
}

export async function incrementShares(slug: string): Promise<number> {
  const article = articlesStore.find((a) => a.slug === slug);
  if (!article) return 0;
  article.shareCount += 1;
  return article.shareCount;
}
