/**
 * Blog / Articles — domain types (CMS-ready).
 */

export type ArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BlogAuthor = {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  role?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type BlogTag = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  coverImage?: string;
  coverGradient?: string; // fallback visual when no image
  featured: boolean;
  status: ArticleStatus;
  published: boolean;
  publishedAt: string; // ISO
  updatedAt: string;
  readingTime: number;
  views: number;
  likes: number;
  shareCount: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  authorId: string;
  categoryId: string;
  tagIds: string[];
  faqs?: ArticleFaq[];
};

export type ArticleWithRelations = Article & {
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
};

export type ArticleListParams = {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  authorSlug?: string;
  query?: string;
  featured?: boolean;
  publishedOnly?: boolean;
};

export type PaginatedArticles = {
  items: ArticleWithRelations[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type CreateArticleInput = {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  featured?: boolean;
  status?: ArticleStatus;
  authorId: string;
  categoryId: string;
  tagIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: ArticleFaq[];
};

export type UpdateArticleInput = Partial<CreateArticleInput> & {
  published?: boolean;
  publishedAt?: string;
};
