# Calculator Engine

Config-driven architecture for 100+ FitCalc Hub calculators.

## Live calculators

| Slug                        | Formula ID | Config file          |
| --------------------------- | ---------- | -------------------- |
| `/calculators/bmi`          | `bmi`      | `configs/bmi.ts`     |
| `/calculators/bmr`          | `bmr`      | `configs/bmr.ts`     |
| `/calculators/tdee`         | `tdee`     | `configs/tdee.ts`    |
| `/calculators/protein`      | `protein`  | `configs/protein.ts` |
| `/calculators/water-intake` | `water`    | `configs/water.ts`   |

## Add a calculator in &lt; 5 minutes

### 1. Formula (`features/calculators/formulas/your-calc.ts`)

```ts
import { registerFormula } from "./registry";
import { toKg } from "../utils";

registerFormula("your-id", (input) => ({
  value: Number(input.weight),
  label: "Result",
  unit: "kg",
}));
```

### 2. Config (`features/calculators/configs/your-calc.ts`)

Copy an existing config (e.g. `bmi.ts`), change `slug`, `fields`, `formulaId`, SEO, FAQs.

### 3. Bootstrap (`features/calculators/bootstrap.ts`)

```ts
import "../formulas/your-calc";
import { yourConfig } from "./configs/your-calc";
// add to registerCalculators([...])
```

The route `/calculators/[slug]` picks it up automatically — layout, SEO, form, results, FAQ, share, PDF.

## Where things live

| Layer         | Path                                         |
| ------------- | -------------------------------------------- |
| Types         | `features/calculators/types`                 |
| Shared fields | `features/calculators/data/shared-fields.ts` |
| Formulas      | `features/calculators/formulas/*`            |
| Configs       | `features/calculators/configs/*`             |
| Bootstrap     | `features/calculators/bootstrap.ts`          |
| UI            | `components/calculators/*`                   |
| Route         | `app/(platform)/calculators/[slug]`          |
