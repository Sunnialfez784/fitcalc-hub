import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/lib/constants";
import {
  getAllArticleSlugs,
  listCategories as listBlogCategories,
  listTags,
} from "@/features/articles/services";
import {
  getAllPlanSlugs,
  getAllProgramSlugs,
  listCategories as listWorkoutCategories,
} from "@/features/workouts/services";
import "@/features/calculators/bootstrap";
import { listCalculatorSlugs } from "@/features/calculators/configs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    ROUTES.home,
    ROUTES.calculators,
    ROUTES.blog,
    ROUTES.workouts,
    ROUTES.dietPlans,
    ROUTES.recipes,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.privacy,
    ROUTES.terms,
    ROUTES.disclaimer,
  ];

  const [
    articleSlugs,
    blogCategories,
    tags,
    calculatorSlugs,
    planSlugs,
    programSlugs,
    workoutCategories,
  ] = await Promise.all([
    getAllArticleSlugs(),
    listBlogCategories(),
    listTags(),
    Promise.resolve(listCalculatorSlugs()),
    getAllPlanSlugs(),
    getAllProgramSlugs(),
    listWorkoutCategories(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  return [
    ...staticEntries,
    ...articleSlugs.map((slug) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogCategories.map((c) => ({
      url: `${siteConfig.url}/blog/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...tags.map((t) => ({
      url: `${siteConfig.url}/blog/tag/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...calculatorSlugs.map((slug) => ({
      url: `${siteConfig.url}/calculators/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...planSlugs.map((slug) => ({
      url: `${siteConfig.url}/workouts/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...programSlugs.map((slug) => ({
      url: `${siteConfig.url}/workouts/program/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...workoutCategories.map((c) => ({
      url: `${siteConfig.url}/workouts/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
