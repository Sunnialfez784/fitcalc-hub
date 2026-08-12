import type { CalculatorConfig, CalculatorField } from "../types";
import { weightFields } from "../data/shared-fields";

const exerciseMinutesField: CalculatorField = {
  name: "exerciseMinutes",
  label: "Exercise (minutes/day)",
  type: "slider",
  min: 0,
  max: 180,
  step: 5,
  defaultValue: 30,
  description: "Average daily workout duration",
  validation: { required: true, min: 0, max: 300 },
  colSpan: 2,
};

const weatherField: CalculatorField = {
  name: "weather",
  label: "Weather / Climate",
  type: "select",
  defaultValue: "moderate",
  options: [
    { value: "cool", label: "Cool / Air-conditioned" },
    { value: "moderate", label: "Moderate" },
    { value: "hot", label: "Hot / Humid" },
  ],
  validation: { required: true },
  colSpan: 2,
};

export const waterConfig: CalculatorConfig = {
  id: "water-intake",
  slug: "water-intake",
  title: "Water Intake Calculator",
  shortTitle: "Water",
  description:
    "Estimate daily water needs based on body weight, exercise duration, and climate — plus bottle and glass counts.",
  category: "hydration",
  icon: "Droplets",
  featured: true,
  published: true,
  defaultUnitSystem: "metric",
  seo: {
    title: "Water Intake Calculator — Daily Hydration Needs | FitCalc Hub",
    description:
      "Calculate how much water to drink daily based on weight, exercise, and weather. See bottles and glasses.",
    keywords: ["water intake calculator", "hydration", "how much water", "daily water"],
  },
  fields: [...weightFields, exerciseMinutesField, weatherField],
  formulaId: "water",
  formulaExplanation: {
    title: "How water needs are estimated",
    body: "Base hydration ≈ 33 ml per kg bodyweight, adjusted for climate. Exercise adds about 12 ml per minute of activity. Results are shown in liters, 500 ml bottles, and 250 ml glasses. Individual needs vary with sweat rate and diet.",
    latex: "Water (L) ≈ (weight_kg × 0.033 × climate) + (exercise_min × 0.012)",
  },
  relatedCalculators: ["bmi", "tdee", "protein", "bmr"],
  recommendations: [
    {
      id: "sip",
      title: "Sip throughout the day",
      description: "Steady intake beats chugging large volumes at once.",
      priority: "medium",
    },
    {
      id: "workout",
      title: "Hydrate around workouts",
      description: "Drink before, during, and after training — especially in heat.",
      priority: "high",
    },
    {
      id: "urine",
      title: "Use urine color as a guide",
      description: "Pale straw usually indicates good hydration; dark yellow suggests drink more.",
      priority: "low",
    },
  ],
  faqs: [
    {
      question: "Does coffee count toward water intake?",
      answer:
        "Mildly caffeinated drinks contribute to fluid intake for most people, but plain water remains the best default.",
    },
    {
      question: "Can I drink too much water?",
      answer:
        "Yes — excessive intake can dilute sodium (hyponatremia). Stick near the calculated range unless advised otherwise.",
    },
    {
      question: "Why does hot weather increase needs?",
      answer: "You lose more fluid through sweat. Our hot-climate setting applies a ~15% increase.",
    },
  ],
};
