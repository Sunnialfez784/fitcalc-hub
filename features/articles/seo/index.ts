import type { Metadata } from "next";
import { buildMetadata, canonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import type { ArticleWithRelations } from "../types";

export function buildArticleMetadata(article: ArticleWithRelations): Metadata {
  const path = `/blog/${article.slug}`;
  const canonical = article.canonicalUrl || canonicalUrl(path);
  const base = buildMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path,
    image: article.coverImage,
  });

  return {
    ...base,
    alternates: { canonical },
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags.map((t) => t.name),
    },
  };
}

export function articleJsonLd(article: ArticleWithRelations) {
  const url = article.canonicalUrl || canonicalUrl(`/blog/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    image: article.coverImage ? [article.coverImage] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      url: canonicalUrl(`/blog?author=${article.author.slug}`),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icons/logo.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category.name,
    keywords: article.tags.map((t) => t.name).join(", "),
    wordCount: article.content.split(/\s+/).length,
    timeRequired: `PT${article.readingTime}M`,
  };
}

export function articleBreadcrumbJsonLd(article: ArticleWithRelations) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category.name,
        item: `${siteConfig.url}/blog/category/${article.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: `${siteConfig.url}/blog/${article.slug}`,
      },
    ],
  };
}

export function articleFaqJsonLd(article: ArticleWithRelations) {
  if (!article.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
