import type { CalculatorConfig } from "../types";
import { BMI_RANGES } from "../utils";
import { heightFields, weightFields } from "../data/shared-fields";

export const bmiConfig: CalculatorConfig = {
  id: "bmi",
  slug: "bmi",
  title: "BMI Calculator",
  shortTitle: "BMI",
  description:
    "Calculate your Body Mass Index, see your category, and get a healthy weight range for your height.",
  category: "body-composition",
  icon: "Scale",
  featured: true,
  published: true,
  defaultUnitSystem: "metric",
  seo: {
    title: "BMI Calculator — Free Body Mass Index Tool | FitCalc Hub",
    description:
      "Free BMI calculator with metric & imperial units. Instant score, WHO category, healthy weight range, and personalized tips.",
    keywords: ["BMI calculator", "body mass index", "healthy weight", "BMI chart"],
  },
  fields: [...weightFields, ...heightFields],
  formulaId: "bmi",
  ranges: BMI_RANGES,
  formulaExplanation: {
    title: "How BMI is calculated",
    body: "Body Mass Index divides your weight in kilograms by height in meters squared. Categories follow World Health Organization guidelines. BMI is a screening tool — it does not measure body fat directly.",
    latex: "BMI = weight (kg) ÷ [height (m)]²",
  },
  relatedCalculators: ["bmr", "tdee", "protein", "water-intake"],
  recommendationId: "bmi",
  faqs: [
    {
      question: "What is a healthy BMI?",
      answer:
        "For most adults, a BMI between 18.5 and 24.9 is considered normal. Individual health depends on muscle mass, age, and other factors.",
    },
    {
      question: "Is BMI accurate for athletes?",
      answer:
        "BMI does not distinguish muscle from fat. Muscular athletes may classify as overweight despite low body fat — use body-fat tools for more nuance.",
    },
    {
      question: "Can I use feet and pounds?",
      answer:
        "Yes. Switch height to ft and weight to lb — FitCalc converts everything to metric internally for the formula.",
    },
  ],
};
