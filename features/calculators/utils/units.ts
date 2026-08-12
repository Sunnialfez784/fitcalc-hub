/**
 * Unit conversion helpers — Metric ↔ Imperial
 */

export type LengthUnit = "cm" | "m" | "in" | "ft";
export type WeightUnit = "kg" | "lb" | "g" | "oz";

/** Round to fixed decimals without floating-point noise. */
export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// -----------------------------------------------------------------------------
// Length
// -----------------------------------------------------------------------------

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cmToInches(cm);
  const feet = Math.floor(totalInches / 12);
  const inches = round(totalInches % 12, 1);
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return inchesToCm(feet * 12 + inches);
}

export function metersToCm(m: number): number {
  return m * 100;
}

export function cmToMeters(cm: number): number {
  return cm / 100;
}

// -----------------------------------------------------------------------------
// Weight
// -----------------------------------------------------------------------------

export function kgToLbs(kg: number): number {
  return kg * 2.2046226218;
}

export function lbsToKg(lbs: number): number {
  return lbs / 2.2046226218;
}

export function kgToGrams(kg: number): number {
  return kg * 1000;
}

export function gramsToKg(g: number): number {
  return g / 1000;
}

/** Convert weight to kilograms from a named unit. */
export function toKg(value: number, unit: WeightUnit): number {
  switch (unit) {
    case "kg":
      return value;
    case "lb":
      return lbsToKg(value);
    case "g":
      return gramsToKg(value);
    case "oz":
      return lbsToKg(value / 16);
    default:
      return value;
  }
}

/** Convert length to centimeters from a named unit. */
export function toCm(value: number, unit: LengthUnit): number {
  switch (unit) {
    case "cm":
      return value;
    case "m":
      return metersToCm(value);
    case "in":
      return inchesToCm(value);
    case "ft":
      return inchesToCm(value * 12);
    default:
      return value;
  }
}

/** Generic unit converter for form engine. */
export function convertUnit(value: number, from: string, to: string): number {
  if (from === to) return value;

  // Normalize weight → kg → target
  const weightUnits: WeightUnit[] = ["kg", "lb", "g", "oz"];
  if (weightUnits.includes(from as WeightUnit) && weightUnits.includes(to as WeightUnit)) {
    const kg = toKg(value, from as WeightUnit);
    switch (to as WeightUnit) {
      case "kg":
        return kg;
      case "lb":
        return kgToLbs(kg);
      case "g":
        return kgToGrams(kg);
      case "oz":
        return kgToLbs(kg) * 16;
    }
  }

  // Normalize length → cm → target
  const lengthUnits: LengthUnit[] = ["cm", "m", "in", "ft"];
  if (lengthUnits.includes(from as LengthUnit) && lengthUnits.includes(to as LengthUnit)) {
    const cm = toCm(value, from as LengthUnit);
    switch (to as LengthUnit) {
      case "cm":
        return cm;
      case "m":
        return cmToMeters(cm);
      case "in":
        return cmToInches(cm);
      case "ft":
        return cmToInches(cm) / 12;
    }
  }

  return value;
}
