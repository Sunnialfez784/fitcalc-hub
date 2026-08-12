export const APP_NAME = "FitCalc Hub";
export const APP_DESCRIPTION = "The all-in-one fitness, nutrition, workout, and health platform.";

export const ROUTES = {
  home: "/",
  calculators: "/calculators",
  blog: "/blog",
  workouts: "/workouts",
  dietPlans: "/diet-plans",
  recipes: "/recipes",
  dashboard: "/dashboard",
  dashboardProfile: "/dashboard/profile",
  dashboardProgress: "/dashboard/progress",
  dashboardHistory: "/dashboard/history",
  dashboardSaved: "/dashboard/saved",
  dashboardSettings: "/dashboard/settings",
  dashboardNotifications: "/dashboard/notifications",
  dashboardWorkouts: "/dashboard/workouts",
  /** @deprecated Prefer ROUTES.dashboardProfile */
  profile: "/dashboard/profile",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  contact: "/contact",
  about: "/about",
  privacy: "/privacy-policy",
  terms: "/terms",
  disclaimer: "/disclaimer",
  admin: "/admin",
} as const;

export const NAV_LINKS = [
  { href: ROUTES.calculators, label: "Calculators" },
  { href: ROUTES.workouts, label: "Workouts" },
  { href: ROUTES.dietPlans, label: "Diet Plans" },
  { href: ROUTES.recipes, label: "Recipes" },
  { href: ROUTES.blog, label: "Blog" },
] as const;
