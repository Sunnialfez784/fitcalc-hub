/**
 * Bootstrap — register formulas + calculator configs.
 * Add new calculators here (import formula, then registerCalculator).
 */

import "./formulas/bmi";
import "./formulas/bmi-recommendations";
import "./formulas/bmr";
import "./formulas/tdee";
import "./formulas/protein";
import "./formulas/water";

import { registerCalculators } from "./configs";
import { bmiConfig } from "./configs/bmi";
import { bmrConfig } from "./configs/bmr";
import { tdeeConfig } from "./configs/tdee";
import { proteinConfig } from "./configs/protein";
import { waterConfig } from "./configs/water";

registerCalculators([bmiConfig, bmrConfig, tdeeConfig, proteinConfig, waterConfig]);
