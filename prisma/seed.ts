/**
 * Seed script — syncs sample blog content into PostgreSQL when DATABASE_URL is set.
 * Run: pnpm db:seed
 *
 * Until the admin panel exists, prefer adding articles in:
 *   features/articles/data/articles.ts
 * then re-run seed to push to the database.
 */

import { PrismaClient } from "@prisma/client";
import { SAMPLE_ARTICLES } from "../features/articles/data/articles";
import { BLOG_AUTHORS, BLOG_CATEGORIES, BLOG_TAGS } from "../features/articles/data/taxonomy";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FitCalc Hub blog content…");

  for (const author of BLOG_AUTHORS) {
    await prisma.author.upsert({
      where: { slug: author.slug },
      update: {
        name: author.name,
        bio: author.bio,
        avatar: author.avatar,
        role: author.role,
      },
      create: {
        id: author.id,
        name: author.name,
        slug: author.slug,
        bio: author.bio,
        avatar: author.avatar,
        role: author.role,
      },
    });
  }

  for (const category of BLOG_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        type: "article",
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        type: "article",
      },
    });
  }

  for (const tag of BLOG_TAGS) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: { name: tag.name, description: tag.description },
      create: {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        description: tag.description,
      },
    });
  }

  for (const article of SAMPLE_ARTICLES) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        featured: article.featured,
        status: article.status,
        published: article.published,
        publishedAt: new Date(article.publishedAt),
        readingTime: article.readingTime,
        views: article.views,
        likes: article.likes,
        shareCount: article.shareCount,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        authorId: article.authorId,
        categoryId: article.categoryId,
        faqJson: article.faqs,
      },
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        coverImage: article.coverImage,
        featured: article.featured,
        status: article.status,
        published: article.published,
        publishedAt: new Date(article.publishedAt),
        readingTime: article.readingTime,
        views: article.views,
        likes: article.likes,
        shareCount: article.shareCount,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        authorId: article.authorId,
        categoryId: article.categoryId,
        faqJson: article.faqs,
        tags: {
          create: article.tagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    // Sync tags for updates
    await prisma.articleTag.deleteMany({ where: { articleId: article.id } });
    if (article.tagIds.length) {
      await prisma.articleTag.createMany({
        data: article.tagIds.map((tagId) => ({ articleId: article.id, tagId })),
        skipDuplicates: true,
      });
    }
  }

  console.log(
    `Seeded ${BLOG_AUTHORS.length} authors, ${BLOG_CATEGORIES.length} categories, ${BLOG_TAGS.length} tags, ${SAMPLE_ARTICLES.length} articles.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
