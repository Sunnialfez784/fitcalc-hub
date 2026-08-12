import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Apple,
  Brain,
  Calculator,
  Dumbbell,
  Droplets,
  Flame,
  Gauge,
  Heart,
  Leaf,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  BookOpen,
  Shield,
  Search,
  BarChart3,
} from "lucide-react";

export type HomeStat = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
};

export type HomeCategory = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
};

export type HomeFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HomeCalculator = {
  title: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  gradient: string;
};

export type HomeWorkoutPlan = {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
  gradient: string;
  href?: string;
};

export type HomeDietPlan = {
  title: string;
  description: string;
  calories: string;
  icon: LucideIcon;
  gradient: string;
};

export type HomeArticle = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  slug: string;
  gradient: string;
};

export type HomeTestimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type HomeFaq = {
  question: string;
  answer: string;
};

export const HOME_STATS: HomeStat[] = [
  { label: "Calculators", value: 100, suffix: "+", icon: Calculator },
  { label: "Articles", value: 500, suffix: "+", icon: BookOpen },
  { label: "Workout Plans", value: 100, suffix: "+", icon: Dumbbell },
  { label: "Diet Plans", value: 50, suffix: "+", icon: Apple },
  { label: "Users", value: 10, suffix: "K+", icon: Users },
];

export const CALCULATOR_CATEGORIES: HomeCategory[] = [
  {
    name: "BMI",
    slug: "bmi",
    description: "Body mass index & healthy weight range",
    icon: Scale,
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  {
    name: "Protein",
    slug: "protein",
    description: "Daily protein needs for your goals",
    icon: Target,
    gradient: "from-blue-500/20 to-cyan-500/5",
  },
  {
    name: "Calories",
    slug: "calories",
    description: "Calorie targets for loss or gain",
    icon: Flame,
    gradient: "from-orange-500/20 to-amber-500/5",
  },
  {
    name: "Macros",
    slug: "macros",
    description: "Protein, carbs & fat breakdown",
    icon: Gauge,
    gradient: "from-violet-500/20 to-purple-500/5",
  },
  {
    name: "Body Fat",
    slug: "body-fat",
    description: "Estimate body composition",
    icon: Activity,
    gradient: "from-rose-500/20 to-pink-500/5",
  },
  {
    name: "Water Intake",
    slug: "water-intake",
    description: "Hydration based on activity",
    icon: Droplets,
    gradient: "from-sky-500/20 to-blue-500/5",
  },
  {
    name: "Heart Rate",
    slug: "heart-rate",
    description: "Training zones & max HR",
    icon: Heart,
    gradient: "from-red-500/20 to-rose-500/5",
  },
  {
    name: "Ideal Weight",
    slug: "ideal-weight",
    description: "Healthy weight for your frame",
    icon: Scale,
    gradient: "from-lime-500/20 to-green-500/5",
  },
  {
    name: "Lean Mass",
    slug: "lean-mass",
    description: "Muscle mass estimation",
    icon: Dumbbell,
    gradient: "from-indigo-500/20 to-blue-500/5",
  },
  {
    name: "TDEE",
    slug: "tdee",
    description: "Total daily energy expenditure",
    icon: TrendingUp,
    gradient: "from-primary/25 to-emerald-500/5",
  },
];

export const WHY_CHOOSE_FEATURES: HomeFeature[] = [
  {
    title: "Lightning Fast",
    description: "Instant calculator results with zero friction — built for speed at scale.",
    icon: Zap,
  },
  {
    title: "SEO Optimized",
    description: "Expert content structured for discoverability and long-term organic growth.",
    icon: Search,
  },
  {
    title: "AI Powered",
    description: "Smart recommendations tailored to your body, goals, and training style.",
    icon: Brain,
  },
  {
    title: "Progress Tracking",
    description: "Visual dashboards to monitor weight, macros, and performance over time.",
    icon: BarChart3,
  },
  {
    title: "Free Calculators",
    description: "100+ professional-grade tools — no paywall on essential health metrics.",
    icon: Calculator,
  },
  {
    title: "Expert Content",
    description: "Evidence-based articles from certified trainers and nutrition specialists.",
    icon: Shield,
  },
];

export const FEATURED_CALCULATORS: HomeCalculator[] = [
  {
    title: "BMI Calculator",
    description: "Find your body mass index and understand your healthy weight range in seconds.",
    slug: "bmi",
    icon: Scale,
    gradient: "from-emerald-600/30 via-emerald-500/10 to-transparent",
  },
  {
    title: "TDEE Calculator",
    description: "Calculate total daily energy expenditure for cutting, bulking, or maintenance.",
    slug: "tdee",
    icon: TrendingUp,
    gradient: "from-primary/30 via-primary/10 to-transparent",
  },
  {
    title: "Macro Calculator",
    description: "Get personalized protein, carb, and fat targets aligned with your fitness goals.",
    slug: "macros",
    icon: Gauge,
    gradient: "from-violet-600/30 via-violet-500/10 to-transparent",
  },
  {
    title: "Protein Calculator",
    description: "Determine optimal daily protein intake based on weight and activity level.",
    slug: "protein",
    icon: Target,
    gradient: "from-blue-600/30 via-blue-500/10 to-transparent",
  },
];

export const FEATURED_WORKOUTS: HomeWorkoutPlan[] = [
  {
    title: "7-Day Push Pull Legs",
    description: "Balanced hypertrophy split with push, pull, and legs across the week.",
    tag: "Hypertrophy",
    icon: Dumbbell,
    gradient: "from-emerald-600/40 to-teal-900/20",
    href: "/workouts/program/push-pull-legs",
  },
  {
    title: "Home Dumbbell Program",
    description: "No gym needed — dumbbells and bodyweight for full-body results.",
    tag: "Home",
    icon: Flame,
    gradient: "from-cyan-600/40 to-cyan-900/20",
    href: "/workouts/program/home-dumbbell-program",
  },
  {
    title: "30-Day Fat Loss",
    description: "Strength plus HIIT to support a sustainable calorie deficit.",
    tag: "Fat Loss",
    icon: TrendingUp,
    gradient: "from-orange-600/40 to-orange-900/20",
    href: "/workouts/program/30-day-fat-loss",
  },
  {
    title: "90-Day Muscle Gain",
    description: "Twelve-week PPL progression for serious hypertrophy.",
    tag: "Muscle Gain",
    icon: Activity,
    gradient: "from-violet-600/40 to-violet-900/20",
    href: "/workouts/program/90-day-muscle-gain",
  },
  {
    title: "5x5 Strength",
    description: "Linear progression on squat, bench, press, and deadlift.",
    tag: "Strength",
    icon: Target,
    gradient: "from-amber-600/40 to-amber-900/20",
    href: "/workouts/program/5x5-strength",
  },
  {
    title: "Full Body 3-Day",
    description: "Beginner-friendly full-body training three times per week.",
    tag: "Beginner",
    icon: Sparkles,
    gradient: "from-blue-600/40 to-blue-900/20",
    href: "/workouts/program/full-body",
  },
];

export const DIET_PLANS: HomeDietPlan[] = [
  {
    title: "High Protein",
    description: "Maximize muscle recovery with 180g+ daily protein targets.",
    calories: "2,200 kcal",
    icon: Target,
    gradient: "from-blue-500/20 to-indigo-500/5",
  },
  {
    title: "Indian Diet",
    description: "Balanced roti, dal, and regional meals with macro tracking.",
    calories: "1,800 kcal",
    icon: Leaf,
    gradient: "from-orange-500/20 to-amber-500/5",
  },
  {
    title: "Weight Gain",
    description: "Calorie surplus plan for lean bulk with structured meal timing.",
    calories: "3,000 kcal",
    icon: TrendingUp,
    gradient: "from-emerald-500/20 to-teal-500/5",
  },
  {
    title: "Weight Loss",
    description: "Sustainable deficit with high satiety foods and flexible macros.",
    calories: "1,600 kcal",
    icon: Flame,
    gradient: "from-rose-500/20 to-pink-500/5",
  },
  {
    title: "Keto",
    description: "Low-carb, high-fat protocol for ketosis and mental clarity.",
    calories: "1,900 kcal",
    icon: Zap,
    gradient: "from-purple-500/20 to-violet-500/5",
  },
  {
    title: "Vegetarian",
    description: "Plant-powered nutrition with complete amino acid coverage.",
    calories: "2,000 kcal",
    icon: Apple,
    gradient: "from-lime-500/20 to-green-500/5",
  },
];

export const BLOG_ARTICLES: HomeArticle[] = [
  {
    title: "The Science of Protein Timing for Muscle Growth",
    excerpt:
      "When you eat protein matters — but not as much as you think. Here's what research says.",
    category: "Nutrition",
    readTime: "8 min read",
    author: "Dr. Sarah Chen",
    slug: "protein-timing-muscle-growth",
    gradient: "from-emerald-500/15 to-teal-500/5",
  },
  {
    title: "How to Calculate Your TDEE Accurately",
    excerpt: "Stop guessing your calorie needs. Learn the formulas pros use for precise targets.",
    category: "Calculators",
    readTime: "6 min read",
    author: "Mike Torres",
    slug: "calculate-tdee-accurately",
    gradient: "from-blue-500/15 to-indigo-500/5",
  },
  {
    title: "Beginner's Guide to Progressive Overload",
    excerpt: "The single most important principle for building strength and muscle over time.",
    category: "Training",
    readTime: "10 min read",
    author: "Alex Rivera",
    slug: "progressive-overload-guide",
    gradient: "from-violet-500/15 to-purple-500/5",
  },
];

export const TESTIMONIALS: HomeTestimonial[] = [
  {
    quote:
      "FitCalc Hub replaced three apps for me. The calculators are instant, accurate, and the workout plans actually fit my schedule.",
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    avatar: "PS",
  },
  {
    quote:
      "As a trainer, I recommend FitCalc to every client. The macro breakdowns and progress tracking are best-in-class.",
    name: "James Mitchell",
    role: "Certified Personal Trainer",
    avatar: "JM",
  },
  {
    quote:
      "Finally a fitness platform that looks premium and works flawlessly. The Indian diet plan section is a game changer.",
    name: "Arjun Patel",
    role: "Software Engineer",
    avatar: "AP",
  },
  {
    quote:
      "I've tried MyFitnessPal, Cronometer, and others. FitCalc Hub's UX is on another level — clean, fast, and trustworthy.",
    name: "Emily Watson",
    role: "Marathon Runner",
    avatar: "EW",
  },
];

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "Are FitCalc Hub calculators free to use?",
    answer:
      "Yes. All 100+ calculators are completely free with no account required. Premium features like progress tracking and personalized plans will be available with optional subscriptions.",
  },
  {
    question: "How accurate are the BMI and TDEE calculators?",
    answer:
      "Our calculators use clinically validated formulas (Mifflin-St Jeor, WHO BMI standards). Results are estimates — consult a healthcare provider for medical decisions.",
  },
  {
    question: "Can I use FitCalc Hub on mobile?",
    answer:
      "Absolutely. FitCalc Hub is fully responsive and optimized for phones, tablets, and desktops with the same premium experience everywhere.",
  },
  {
    question: "Do you offer personalized diet and workout plans?",
    answer:
      "Curated plans are available for common goals. AI-powered personalized recommendations are coming soon as part of our Pro tier.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "We take privacy seriously. Your data is encrypted, never sold to third parties, and you can export or delete it anytime from your profile settings.",
  },
];

export const HERO_FLOATING_ICONS = [
  { icon: Dumbbell, className: "top-[18%] left-[8%] rotate-[-12deg]" },
  { icon: Heart, className: "top-[25%] right-[10%] rotate-[15deg]" },
  { icon: Apple, className: "bottom-[30%] left-[12%] rotate-[8deg]" },
  { icon: Activity, className: "bottom-[22%] right-[8%] rotate-[-8deg]" },
  { icon: Flame, className: "top-[45%] left-[5%] rotate-[20deg]" },
  { icon: Droplets, className: "top-[40%] right-[6%] rotate-[-15deg]" },
];
