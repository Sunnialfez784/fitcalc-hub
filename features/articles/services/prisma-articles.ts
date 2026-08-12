/**
 * Prisma-backed article repository (admin-ready).
 * Use when DATABASE_URL is configured and schema is pushed.
 * The in-memory service remains the default for local/demo.
 */

import { prisma } from "@/lib/prisma";
import type { CreateArticleInput, UpdateArticleInput } from "../types";
import { calculateReadingTime, slugify } from "../utils";

export async function prismaCreateArticle(input: CreateArticleInput) {
  const slug = input.slug || slugify(input.title);
  const status = input.status ?? "DRAFT";
  const published = status === "PUBLISHED";

  return prisma.article.create({
    data: {
      title: input.title,
      slug,
      excerpt: input.excerpt,
      content: input.content,
      coverImage: input.coverImage,
      featured: input.featured ?? false,
      status,
      published,
      publishedAt: published ? new Date() : null,
      readingTime: calculateReadingTime(input.content),
      seoTitle: input.seoTitle,
      seoDescription: input.seoDescription,
      authorId: input.authorId,
      categoryId: input.categoryId,
      faqJson: input.faqs,
      tags: input.tagIds?.length
        ? {
            create: input.tagIds.map((tagId) => ({ tagId })),
          }
        : undefined,
    },
    include: { author: true, category: true, tags: { include: { tag: true } } },
  });
}

export async function prismaUpdateArticle(slug: string, input: UpdateArticleInput) {
  const data: Record<string, unknown> = { ...input, updatedAt: new Date() };
  if (input.content) data.readingTime = calculateReadingTime(input.content);
  if (input.status === "PUBLISHED") {
    data.published = true;
    data.publishedAt = new Date();
  }
  if (input.status === "DRAFT") {
    data.published = false;
  }

  delete data.tagIds;

  return prisma.article.update({
    where: { slug },
    data,
  });
}

export async function prismaDeleteArticle(slug: string) {
  return prisma.article.delete({ where: { slug } });
}

export async function prismaPublishArticle(slug: string) {
  return prisma.article.update({
    where: { slug },
    data: { status: "PUBLISHED", published: true, publishedAt: new Date() },
  });
}

export async function prismaDraftArticle(slug: string) {
  return prisma.article.update({
    where: { slug },
    data: { status: "DRAFT", published: false },
  });
}
