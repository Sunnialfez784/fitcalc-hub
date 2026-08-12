import { registerRecommendations } from "./recommendations";

/** Dynamic BMI tips based on WHO category. */
registerRecommendations("bmi", (result) => {
  const id = result.range?.id;
  if (id === "underweight") {
    return [
      {
        id: "gain",
        title: "Aim for gradual weight gain",
        description: "Add 250–500 kcal/day with nutrient-dense foods and strength training.",
        priority: "high",
      },
      {
        id: "protein",
        title: "Prioritize protein",
        description: "Target 1.6–2.2 g protein per kg to support lean mass.",
        priority: "medium",
      },
    ];
  }
  if (id === "normal") {
    return [
      {
        id: "maintain",
        title: "Maintain your healthy range",
        description: "Keep balanced nutrition, strength training, and consistent sleep.",
        priority: "low",
      },
    ];
  }
  if (id === "overweight") {
    return [
      {
        id: "deficit",
        title: "Create a moderate calorie deficit",
        description: "A 300–500 kcal daily deficit supports sustainable fat loss.",
        priority: "high",
      },
      {
        id: "activity",
        title: "Increase daily activity",
        description: "Combine resistance training with walking for better composition.",
        priority: "medium",
      },
    ];
  }
  return [
    {
      id: "medical",
      title: "Consider professional guidance",
      description: "Work with a clinician or dietitian for a personalized plan.",
      priority: "high",
    },
  ];
});
