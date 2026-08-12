# Workout Planner

Scalable workout CMS for FitCalc Hub — programs, plans, exercise library, user tracking.

## Routes

| Path                        | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `/workouts`                 | Catalog, filters, featured programs, categories |
| `/workouts/[slug]`          | Single workout plan                             |
| `/workouts/program/[slug]`  | Multi-day program                               |
| `/workouts/category/[slug]` | Category archive                                |
| `/dashboard/workouts`       | User streak, today, favorites, history          |

## Sample content

- **50** exercises
- **18** categories
- **12** programs (incl. 7-day PPL, 30-day fat loss, 90-day muscle gain)
- **6** standalone workout plans

## Admin-ready services

`createPlan` / `updatePlan` / `deletePlan` / `publishPlan`  
`createProgram` / `updateProgram` / `deleteProgram` / `publishProgram`  
`createCategory` / `createExercise`  
Prisma twins in `services/prisma-workouts.ts`

## Future AI

Implement `WorkoutAiProvider` and call `registerWorkoutAi(provider)` — see `features/workouts/ai/index.ts`.
