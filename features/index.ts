/**
 * Feature module placeholders — implement business logic inside these folders.
 * Keep UI in components/, domain logic in features/ + services/.
 */

export const featureModules = [
  "auth",
  "calculators",
  "articles",
  "workouts",
  "diets",
  "dashboard",
  "profile",
  "admin",
] as const;

export type FeatureModule = (typeof featureModules)[number];
