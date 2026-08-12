import type { CalculatorConfig } from "../types";
import { activityField, proteinGoalField, weightFields } from "../data/shared-fields";

export const proteinConfig: CalculatorConfig = {
  id: "protein",
  slug: "protein",
  title: "Protein Calculator",
  shortTitle: "Protein",
  description:
    "Get personalized daily protein targets for maintain, lose fat, or gain muscle — including per-meal distribution.",
  category: "nutrition",
  icon: "Target",
  featured: true,
  published: true,
  defaultUnitSystem: "metric",
  seo: {
    title: "Protein Calculator — Daily Protein Needs | FitCalc Hub",
    description:
      "Calculate recommended, minimum, and maximum protein intake by goal and activity. Includes meal distribution.",
    keywords: ["protein calculator", "protein intake", "macros", "muscle protein"],
  },
  fields: [...weightFields, proteinGoalField, activityField],
  formulaId: "protein",
  formulaExplanation: {
    title: "How protein needs are estimated",
    body: "Targets use evidence-based g/kg ranges: Maintain 1.2–1.6, Lose Fat 1.8–2.4, Gain Muscle 1.6–2.2. Higher activity slightly raises the recommended midpoint. Intake is split across four meals for absorption and adherence.",
    latex: "Protein (g) = bodyweight (kg) × g/kg factor",
  },
  relatedCalculators: ["tdee", "bmr", "bmi", "water-intake"],
  recommendations: [
    {
      id: "spread",
      title: "Spread protein across the day",
      description: "20–40 g per meal is a practical target for muscle protein synthesis.",
      priority: "high",
    },
    {
      id: "sources",
      title: "Use complete sources",
      description: "Eggs, dairy, meat, fish, whey, soy, and complementary plant proteins all work.",
      priority: "medium",
    },
    {
      id: "hydrate",
      title: "Drink enough water",
      description:
        "Higher protein intake pairs well with solid hydration — check the Water Calculator.",
      priority: "low",
    },
  ],
  faqs: [
    {
      question: "Do I need more protein to lose fat?",
      answer:
        "Often yes — higher protein helps preserve muscle in a calorie deficit and increases satiety.",
    },
    {
      question: "Is too much protein dangerous?",
      answer:
        "For healthy kidneys, intakes in the ranges we show are generally considered safe. Those with kidney disease should consult a doctor.",
    },
    {
      question: "Can vegetarians hit these targets?",
      answer: "Yes — combine legumes, dairy/soy, tofu, seitan, and protein powders as needed.",
    },
  ],
};
