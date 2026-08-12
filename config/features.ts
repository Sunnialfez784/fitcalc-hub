/**
 * Feature flags & app-level configuration placeholders.
 * Toggle capabilities without hard-coding across the codebase.
 */
export const features = {
  auth: {
    google: true,
    email: false, // enable when AUTH_EMAIL_* is configured
  },
  calculators: false,
  ai: false,
  admin: false,
  subscriptions: false,
} as const;

export const cacheTags = {
  articles: "articles",
  workouts: "workouts",
  diets: "diets",
  recipes: "recipes",
} as const;
