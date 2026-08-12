import type { Article } from "../types";

/**
 * Sample published articles — source of truth for the CMS content layer.
 * Seed script and article services both read from this registry.
 * Add new articles here (or via admin services later).
 */
export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "art-protein-sources",
    title: "Best Protein Sources for Muscle Gain",
    slug: "best-protein-sources-muscle-gain",
    excerpt:
      "Complete guide to animal and plant proteins that actually support hypertrophy — with grams per serving and timing tips.",
    coverGradient: "from-emerald-600/40 via-teal-500/20 to-transparent",
    featured: true,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-06-12T10:00:00.000Z",
    updatedAt: "2026-06-18T10:00:00.000Z",
    readingTime: 9,
    views: 12840,
    likes: 842,
    shareCount: 210,
    seoTitle: "Best Protein Sources for Muscle Gain (Science-Backed)",
    seoDescription:
      "Discover the best protein foods for building muscle — whey, eggs, chicken, dairy, and complete plant options with targets per meal.",
    authorId: "author-sarah",
    categoryId: "cat-nutrition",
    tagIds: ["tag-protein", "tag-muscle"],
    faqs: [
      {
        question: "How much protein do I need to build muscle?",
        answer:
          "Most lifters do well with 1.6–2.2 g of protein per kg of bodyweight daily, spread across 3–5 meals.",
      },
      {
        question: "Are plant proteins enough for muscle gain?",
        answer:
          "Yes — prioritize complete sources (soy, quinoa) or combine legumes with grains, and consider a plant protein powder to hit targets.",
      },
    ],
    content: `## Why protein quality matters

Muscle protein synthesis needs enough **essential amino acids**, especially leucine. Not all protein sources are equal in digestibility and amino acid profile.

## Top animal sources

| Food | Protein (approx.) | Notes |
|------|-------------------|-------|
| Chicken breast (100g) | 31g | Lean, versatile |
| Eggs (2 large) | 12g | Complete amino profile |
| Greek yogurt (200g) | 20g | Great snack |
| Whey isolate (1 scoop) | 25g | Fast-digesting |

## Top plant sources

- **Tofu / tempeh** — complete soy protein
- **Lentils + rice** — complementary amino acids
- **Seitan** — high protein if you tolerate gluten
- **Pea / rice protein blends** — convenient powder option

## Practical daily template

1. Breakfast: eggs or Greek yogurt  
2. Lunch: chicken, fish, or tofu bowl  
3. Post-workout: whey or plant shake  
4. Dinner: lean meat or dal + paneer  

> Tip: Use the [Protein Calculator](/calculators/protein) to set your personal daily target.

## Bottom line

Hit your daily grams first, then optimize food quality and meal timing. Consistency beats perfection.
`,
  },
  {
    id: "art-bmi-explained",
    title: "BMI Explained: What It Means and What It Misses",
    slug: "bmi-explained",
    excerpt:
      "Understand BMI categories, healthy ranges, and why athletes should pair BMI with body-fat and waist measures.",
    coverGradient: "from-blue-600/40 via-indigo-500/20 to-transparent",
    featured: true,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-05-28T09:00:00.000Z",
    updatedAt: "2026-06-01T09:00:00.000Z",
    readingTime: 7,
    views: 9320,
    likes: 510,
    shareCount: 145,
    seoTitle: "BMI Explained — Categories, Limits & Healthy Weight",
    seoDescription:
      "Clear explanation of Body Mass Index, WHO categories, healthy weight ranges, and when BMI is misleading.",
    authorId: "author-mike",
    categoryId: "cat-science",
    tagIds: ["tag-bmi"],
    faqs: [
      {
        question: "What is a healthy BMI?",
        answer: "For most adults, 18.5–24.9 is considered normal by WHO guidelines.",
      },
      {
        question: "Is BMI accurate for athletes?",
        answer: "Often not — high muscle mass can push BMI into overweight despite low body fat.",
      },
    ],
    content: `## What is BMI?

**Body Mass Index** is a simple ratio:

\`BMI = weight (kg) ÷ height (m)²\`

## WHO categories

- **Underweight:** < 18.5  
- **Normal:** 18.5 – 24.9  
- **Overweight:** 25 – 29.9  
- **Obese:** ≥ 30  

## What BMI gets right

It is a fast **population screening tool** that correlates with health risks at scale.

## What BMI misses

- Muscle vs fat  
- Fat distribution (waist circumference matters)  
- Age and ethnicity nuances  

## Better stack of metrics

1. BMI (screening)  
2. Waist circumference  
3. Strength / performance trends  
4. Optional: body-fat estimate  

Try the free [BMI Calculator](/calculators/bmi) for your number and healthy weight range.
`,
  },
  {
    id: "art-creatine-guide",
    title: "Creatine Guide: Dosage, Benefits, and Myths",
    slug: "creatine-guide",
    excerpt:
      "Everything you need to know about creatine monohydrate — loading, maintenance, safety, and who benefits most.",
    coverGradient: "from-violet-600/40 via-purple-500/20 to-transparent",
    featured: true,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-06-02T11:00:00.000Z",
    updatedAt: "2026-06-10T11:00:00.000Z",
    readingTime: 8,
    views: 15600,
    likes: 1204,
    shareCount: 380,
    seoTitle: "Creatine Guide — Dosage, Benefits & Safety",
    seoDescription:
      "Evidence-based creatine monohydrate guide: 3–5g daily, optional loading, hydration tips, and common myths debunked.",
    authorId: "author-mike",
    categoryId: "cat-supplements",
    tagIds: ["tag-creatine", "tag-muscle"],
    faqs: [
      {
        question: "Do I need to load creatine?",
        answer:
          "No. Loading (20g/day for 5–7 days) saturates faster, but 3–5g daily works within 3–4 weeks.",
      },
      {
        question: "Is creatine safe for kidneys?",
        answer:
          "For healthy individuals, research supports safety at recommended doses. Those with kidney disease should consult a doctor.",
      },
    ],
    content: `## Why creatine works

Creatine increases **phosphocreatine** stores, helping regenerate ATP during high-intensity efforts — more reps, better power, and improved training quality over time.

## Recommended protocol

- **Form:** Creatine monohydrate  
- **Dose:** 3–5 g daily  
- **Timing:** Any time; consistency matters more than the clock  
- **Optional load:** 20 g/day split into 4 doses for 5–7 days  

## Expected benefits

- Strength and power  
- Lean mass (partly water in muscle)  
- Better high-intensity performance  

## Myths to ignore

| Myth | Reality |
|------|---------|
| Creatine is a steroid | It is not |
| You must cycle off | Continuous use is fine |
| It dehydrates you | Stay hydrated; no special dehydration risk at normal doses |

## Who benefits most

Strength athletes, sprinters, and anyone doing repeated high-intensity work. Vegetarians may see larger relative benefits due to lower dietary creatine.
`,
  },
  {
    id: "art-whey-guide",
    title: "Whey Protein Guide: Isolate vs Concentrate",
    slug: "whey-protein-guide",
    excerpt:
      "How to choose whey concentrate, isolate, or hydrolysate — lactose, protein %, timing, and who needs what.",
    coverGradient: "from-amber-600/40 via-orange-500/20 to-transparent",
    featured: false,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-05-15T08:00:00.000Z",
    updatedAt: "2026-05-20T08:00:00.000Z",
    readingTime: 6,
    views: 7450,
    likes: 390,
    shareCount: 98,
    seoTitle: "Whey Protein Guide — Isolate vs Concentrate",
    seoDescription:
      "Compare whey concentrate, isolate, and hydrolysate. Learn protein percentages, lactose content, and best use cases.",
    authorId: "author-sarah",
    categoryId: "cat-supplements",
    tagIds: ["tag-whey", "tag-protein"],
    faqs: [
      {
        question: "Is whey isolate better than concentrate?",
        answer:
          "Isolate is higher in protein % and lower in lactose — useful if you are lactose sensitive. Concentrate is fine for most people and often cheaper.",
      },
    ],
    content: `## Types of whey

### Concentrate (WPC)
Typically 70–80% protein. Contains more carbs/fat and lactose. Great everyday option.

### Isolate (WPI)
Usually 90%+ protein, filtered further. Lower lactose — better for sensitive stomachs.

### Hydrolysate (WPH)
Pre-digested peptides. Faster absorption, often pricier and more bitter. Not required for most lifters.

## When to use whey

- Post-workout convenience  
- Breakfast boost  
- Hitting daily protein when whole food is impractical  

## Buying checklist

1. Third-party tested when possible  
2. Clear protein per scoop  
3. Minimal unnecessary fillers  
4. Taste you will actually drink  

Whole food first — whey fills the gaps.
`,
  },
  {
    id: "art-weight-gain-diet",
    title: "Weight Gain Diet Plan: Clean Surplus Without Guesswork",
    slug: "weight-gain-diet-plan",
    excerpt:
      "A practical calorie surplus plan with sample macros, meal ideas, and weekly check-ins for lean gains.",
    coverGradient: "from-lime-600/40 via-green-500/20 to-transparent",
    featured: false,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-04-22T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
    readingTime: 10,
    views: 11200,
    likes: 670,
    shareCount: 190,
    seoTitle: "Weight Gain Diet Plan — Clean Surplus Guide",
    seoDescription:
      "Build muscle with a controlled surplus: how many calories to add, macro targets, sample meals, and progress checks.",
    authorId: "author-priya",
    categoryId: "cat-nutrition",
    tagIds: ["tag-weight-gain", "tag-diet", "tag-muscle"],
    faqs: [
      {
        question: "How big should my surplus be?",
        answer:
          "Start with +250–400 kcal above maintenance. Aggressive surpluses add more fat than muscle.",
      },
    ],
    content: `## Step 1 — Find maintenance

Use the [TDEE Calculator](/calculators/tdee) to estimate maintenance calories.

## Step 2 — Add a surplus

- **Beginners:** +300–400 kcal  
- **Advanced:** +200–300 kcal  

## Sample macros (80 kg athlete)

- Protein: 160 g  
- Fat: 70 g  
- Carbs: fill remaining calories  

## Sample day (Indian-friendly)

1. **Breakfast:** oats + milk + banana + peanut butter  
2. **Lunch:** rice + dal + paneer / chicken + salad  
3. **Snack:** yogurt + nuts + fruit  
4. **Dinner:** roti + veggies + eggs or tofu  

## Weekly check-in

Aim for **0.25–0.5% bodyweight gain per week**. If the scale stalls for 2 weeks, add 100–150 kcal.
`,
  },
  {
    id: "art-fat-loss-diet",
    title: "Fat Loss Diet Plan: Sustainable Deficit That Works",
    slug: "fat-loss-diet-plan",
    excerpt:
      "Build a fat-loss diet with protein-first meals, flexible carbs, and habits you can keep for months — not weeks.",
    coverGradient: "from-rose-600/40 via-pink-500/20 to-transparent",
    featured: true,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-06-20T09:30:00.000Z",
    updatedAt: "2026-06-22T09:30:00.000Z",
    readingTime: 9,
    views: 18900,
    likes: 1450,
    shareCount: 420,
    seoTitle: "Fat Loss Diet Plan — Sustainable Calorie Deficit",
    seoDescription:
      "Science-backed fat loss plan: deficit size, high-protein meals, weekly rate of loss, and adherence tips.",
    authorId: "author-priya",
    categoryId: "cat-nutrition",
    tagIds: ["tag-fat-loss", "tag-diet", "tag-protein"],
    faqs: [
      {
        question: "How fast should I lose fat?",
        answer: "About 0.5–1% of bodyweight per week is a sustainable target for most people.",
      },
    ],
    content: `## Set the deficit

Calculate TDEE, then subtract **300–500 kcal**. Larger cuts often backfire via hunger and muscle loss.

## Protein first

Keep protein high (1.8–2.4 g/kg when cutting) to protect muscle and stay full.

## Plate method

- ½ vegetables  
- ¼ protein  
- ¼ carbs  
- Add a thumb of fats  

## Habits that beat willpower

- Prep 2–3 proteins weekly  
- Keep high-volume snacks (fruit, yogurt, popcorn)  
- Sleep 7–9 hours  
- Walk 7–10k steps  

Pair with the [Protein Calculator](/calculators/protein) and [TDEE Calculator](/calculators/tdee).
`,
  },
  {
    id: "art-ppl",
    title: "Push Pull Legs Workout: Complete PPL Guide",
    slug: "push-pull-legs-workout",
    excerpt:
      "A proven 6-day Push Pull Legs split with exercise selection, sets, and progression for intermediate lifters.",
    coverGradient: "from-slate-600/40 via-zinc-500/20 to-transparent",
    featured: false,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-03-18T12:00:00.000Z",
    updatedAt: "2026-04-02T12:00:00.000Z",
    readingTime: 11,
    views: 22100,
    likes: 1680,
    shareCount: 510,
    seoTitle: "Push Pull Legs Workout — Full PPL Program",
    seoDescription:
      "Learn the Push Pull Legs split: sample 6-day routine, sets and reps, recovery tips, and progression strategies.",
    authorId: "author-mike",
    categoryId: "cat-training",
    tagIds: ["tag-ppl", "tag-muscle"],
    faqs: [
      {
        question: "Can beginners do PPL?",
        answer:
          "Yes, but a 3-day full-body or upper/lower often recovers better when you are new. PPL shines at intermediate volume needs.",
      },
    ],
    content: `## Why PPL works

Grouping muscles by movement pattern lets you hit each area **twice per week** with manageable fatigue.

## Sample 6-day split

**Push:** Bench, OHP, incline DB, triceps, laterals  
**Pull:** Deadlift or row, pull-ups, face pulls, curls  
**Legs:** Squat, RDL, lunges, calves, core  

## Sets & reps

- Compounds: 3–5 sets of 5–8  
- Accessories: 2–4 sets of 8–15  

## Progression

Add weight when you hit the top of the rep range with good form for all sets.

## Recovery rules

Sleep, protein, and at least one full rest day if joints feel beat up. Swap to 3-day PPL (one of each) when life gets busy.
`,
  },
  {
    id: "art-beginner-gym",
    title: "Beginner Gym Routine: Your First 12 Weeks",
    slug: "beginner-gym-routine",
    excerpt:
      "A simple full-body routine for new lifters — exercises, warm-ups, and how to progress without overwhelm.",
    coverGradient: "from-cyan-600/40 via-sky-500/20 to-transparent",
    featured: false,
    status: "PUBLISHED",
    published: true,
    publishedAt: "2026-02-10T08:00:00.000Z",
    updatedAt: "2026-03-01T08:00:00.000Z",
    readingTime: 8,
    views: 27400,
    likes: 2100,
    shareCount: 640,
    seoTitle: "Beginner Gym Routine — First 12 Weeks Plan",
    seoDescription:
      "Start the gym right with a 3-day full-body beginner routine, form cues, and a simple progression plan.",
    authorId: "author-mike",
    categoryId: "cat-training",
    tagIds: ["tag-beginner", "tag-muscle"],
    faqs: [
      {
        question: "How many days per week should a beginner train?",
        answer:
          "Three full-body sessions per week is ideal for learning movements and recovering well.",
      },
    ],
    content: `## The 3-day template

Train Monday / Wednesday / Friday (or any non-consecutive days).

### Each session

1. Squat pattern — 3×8  
2. Hinge (RDL) — 3×8  
3. Push (push-up or bench) — 3×8–10  
4. Pull (row or lat pulldown) — 3×8–10  
5. Carry or core — 2–3 sets  

## Warm-up (8 minutes)

- 3–5 min easy cardio  
- Bodyweight squats, hip hinges, band pull-aparts  

## Progression for 12 weeks

When you complete all reps with clean form, add the smallest plate next time.

## Mindset

Consistency beats intensity. Film your lifts monthly. Eat enough protein. Sleep. Show up.
`,
  },
];
