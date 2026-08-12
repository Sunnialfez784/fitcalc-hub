/**
 * FitCalc Hub — Articles / Blog CMS
 */

export type * from "./types";

export {
  listArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getLatestArticles,
  getTrendingArticles,
  getRelatedArticles,
  getAdjacentArticles,
  listCategories,
  getCategoryBySlug,
  listTags,
  getTagBySlug,
  getPopularTags,
  listAuthors,
  getAllArticleSlugs,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  draftArticle,
  incrementViews,
  incrementLikes,
  incrementShares,
  prismaCreateArticle,
  prismaUpdateArticle,
  prismaDeleteArticle,
  prismaPublishArticle,
  prismaDraftArticle,
} from "./services";

export { incrementArticleLikes, incrementArticleShares, incrementArticleViews } from "./actions";

export {
  calculateReadingTime,
  slugify,
  extractTableOfContents,
  formatArticleDate,
  formatCount,
} from "./utils";

export {
  buildArticleMetadata,
  articleJsonLd,
  articleBreadcrumbJsonLd,
  articleFaqJsonLd,
} from "./seo";

export { SAMPLE_ARTICLES } from "./data/articles";
export { BLOG_AUTHORS, BLOG_CATEGORIES, BLOG_TAGS } from "./data/taxonomy";
