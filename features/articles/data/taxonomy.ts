import type { BlogAuthor, BlogCategory, BlogTag } from "../types";

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    id: "author-sarah",
    name: "Dr. Sarah Chen",
    slug: "sarah-chen",
    bio: "Sports nutritionist and researcher focused on evidence-based fueling for strength athletes.",
    role: "Nutrition Specialist",
    avatar: "SC",
  },
  {
    id: "author-mike",
    name: "Mike Torres",
    slug: "mike-torres",
    bio: "CSCS coach with 12 years helping beginners build sustainable gym habits.",
    role: "Strength Coach",
    avatar: "MT",
  },
  {
    id: "author-priya",
    name: "Priya Sharma",
    slug: "priya-sharma",
    bio: "Registered dietitian specializing in Indian cuisine adaptations for fat loss and muscle gain.",
    role: "Dietitian",
    avatar: "PS",
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-nutrition",
    name: "Nutrition",
    slug: "nutrition",
    description: "Protein, macros, supplements, and meal planning.",
  },
  {
    id: "cat-training",
    name: "Training",
    slug: "training",
    description: "Workout programs, form tips, and progressive overload.",
  },
  {
    id: "cat-science",
    name: "Science",
    slug: "science",
    description: "Explainer articles on body composition and metabolism.",
  },
  {
    id: "cat-supplements",
    name: "Supplements",
    slug: "supplements",
    description: "Creatine, whey, and evidence-backed ergogenics.",
  },
];

export const BLOG_TAGS: BlogTag[] = [
  { id: "tag-protein", name: "Protein", slug: "protein" },
  { id: "tag-bmi", name: "BMI", slug: "bmi" },
  { id: "tag-creatine", name: "Creatine", slug: "creatine" },
  { id: "tag-whey", name: "Whey", slug: "whey" },
  { id: "tag-weight-gain", name: "Weight Gain", slug: "weight-gain" },
  { id: "tag-fat-loss", name: "Fat Loss", slug: "fat-loss" },
  { id: "tag-ppl", name: "Push Pull Legs", slug: "push-pull-legs" },
  { id: "tag-beginner", name: "Beginner", slug: "beginner" },
  { id: "tag-muscle", name: "Muscle Gain", slug: "muscle-gain" },
  { id: "tag-diet", name: "Diet", slug: "diet" },
];
