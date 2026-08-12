import type { CalculatorConfig } from "../types";
import {
  activityField,
  ageField,
  genderField,
  heightFields,
  weightFields,
} from "../data/shared-fields";

export const tdeeConfig: CalculatorConfig = {
  id: "tdee",
  slug: "tdee",
  title: "TDEE Calculator",
  shortTitle: "TDEE",
  description:
    "Estimate Total Daily Energy Expenditure — maintenance calories plus targets for weight loss and weight gain.",
  category: "metabolism",
  icon: "TrendingUp",
  featured: true,
  published: true,
  defaultUnitSystem: "metric",
  seo: {
    title: "TDEE Calculator — Maintenance, Loss & Gain Calories | FitCalc Hub",
    description:
      "Free TDEE calculator with activity levels. Get maintenance, weight loss, and weight gain calorie targets instantly.",
    keywords: ["TDEE calculator", "maintenance calories", "calorie deficit", "activity level"],
  },
  fields: [ageField, genderField, ...weightFields, ...heightFields, activityField],
  formulaId: "tdee",
  formulaExplanation: {
    title: "How TDEE is calculated",
    body: "We compute BMR with Mifflin-St Jeor, then multiply by an activity factor: Sedentary 1.2, Light 1.375, Moderate 1.55, Heavy 1.725, Athlete 1.9. Weight loss ≈ TDEE − 500 kcal. Weight gain ≈ TDEE + 300 kcal.",
    latex: "TDEE = BMR × activity multiplier",
  },
  relatedCalculators: ["bmr", "bmi", "protein", "water-intake"],
  recommendations: [
    {
      id: "track",
      title: "Track for 2 weeks",
      description: "Adjust intake based on real weight trend — calculators are starting estimates.",
      priority: "high",
    },
    {
      id: "protein-pair",
      title: "Pair with protein targets",
      description: "Use the Protein Calculator to protect muscle while in a deficit or surplus.",
      priority: "medium",
    },
    {
      id: "deficit-safe",
      title: "Keep deficits moderate",
      description: "Avoid cutting more than ~500–750 kcal below TDEE without professional advice.",
      priority: "medium",
    },
  ],
  faqs: [
    {
      question: "What is TDEE?",
      answer:
        "Total Daily Energy Expenditure is the total calories you burn in a day including rest, digestion, and activity.",
    },
    {
      question: "Which activity level should I pick?",
      answer:
        "Be honest — most office workers with 3 gym sessions are Moderate. Overestimating activity is a common reason weight loss stalls.",
    },
    {
      question: "How fast will I lose weight at −500 kcal?",
      answer:
        "Roughly 0.5 kg (≈1 lb) per week on average, though water and glycogen shifts make the scale noisy week to week.",
    },
  ],
};
