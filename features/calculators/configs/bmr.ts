import type { CalculatorConfig } from "../types";
import { ageField, genderField, heightFields, weightFields } from "../data/shared-fields";

export const bmrConfig: CalculatorConfig = {
  id: "bmr",
  slug: "bmr",
  title: "BMR Calculator",
  shortTitle: "BMR",
  description:
    "Estimate your Basal Metabolic Rate — the calories your body burns at complete rest — using the Mifflin-St Jeor equation.",
  category: "metabolism",
  icon: "Flame",
  featured: true,
  published: true,
  defaultUnitSystem: "metric",
  seo: {
    title: "BMR Calculator — Basal Metabolic Rate | FitCalc Hub",
    description:
      "Calculate your BMR with age, gender, height, and weight. See resting calorie burn and sedentary daily needs.",
    keywords: ["BMR calculator", "basal metabolic rate", "Mifflin St Jeor", "resting calories"],
  },
  fields: [ageField, genderField, ...weightFields, ...heightFields],
  formulaId: "bmr",
  formulaExplanation: {
    title: "Mifflin-St Jeor formula",
    body: "Widely regarded as one of the most accurate BMR equations for the general population. Men: 10×weight(kg) + 6.25×height(cm) − 5×age + 5. Women: 10×weight(kg) + 6.25×height(cm) − 5×age − 161.",
    latex: "BMR♂ = 10w + 6.25h − 5a + 5   |   BMR♀ = 10w + 6.25h − 5a − 161",
  },
  relatedCalculators: ["tdee", "bmi", "protein", "water-intake"],
  recommendations: [
    {
      id: "tdee-next",
      title: "Calculate your TDEE next",
      description:
        "Multiply BMR by activity level to get maintenance, loss, and gain calorie targets.",
      priority: "high",
    },
    {
      id: "dont-eat-bmr",
      title: "Don't eat only your BMR",
      description:
        "BMR is resting burn only. Eating at BMR long-term is usually too aggressive — use TDEE.",
      priority: "medium",
    },
  ],
  faqs: [
    {
      question: "What does BMR mean?",
      answer:
        "Basal Metabolic Rate is the energy your body needs to maintain vital functions at complete rest — breathing, circulation, cell production.",
    },
    {
      question: "Which formula do you use?",
      answer:
        "FitCalc Hub uses Mifflin-St Jeor, preferred over Harris-Benedict for most modern populations.",
    },
    {
      question: "Why is my BMR different from another site?",
      answer:
        "Different equations (Harris-Benedict, Katch-McArdle) produce slightly different results. Body composition also affects true metabolic rate.",
    },
  ],
};
