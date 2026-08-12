import { z, type ZodType } from "zod";
import type { CalculatorField, CalculatorInput } from "../types";

/**
 * Build a Zod schema dynamically from calculator field configuration.
 * Supports number, text, select, radio, checkbox, slider, and unit fields.
 */
export function buildSchemaFromFields(fields: CalculatorField[]): ZodType<CalculatorInput> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    shape[field.name] = fieldToZod(field);
  }

  return z.object(shape) as ZodType<CalculatorInput>;
}

function fieldToZod(field: CalculatorField): z.ZodTypeAny {
  const v = field.validation ?? {};
  const message = v.message;

  switch (field.type) {
    case "number":
    case "slider": {
      let schema = z.coerce.number({
        error: message ?? `${field.label} must be a number`,
      });

      if (v.min !== undefined) {
        schema = schema.min(v.min, message ?? `${field.label} must be at least ${v.min}`);
      }
      if (v.max !== undefined) {
        schema = schema.max(v.max, message ?? `${field.label} must be at most ${v.max}`);
      }
      if (v.integer) {
        schema = schema.int(message ?? `${field.label} must be a whole number`);
      }

      return v.required === false ? schema.optional() : schema;
    }

    case "text": {
      let schema = z.string();
      if (v.required !== false) {
        schema = schema.min(1, message ?? `${field.label} is required`);
      }
      return v.required === false ? schema.optional() : schema;
    }

    case "select":
    case "radio":
    case "unit": {
      const values = (field.options ?? field.units ?? []).map((o) => String(o.value));
      if (values.length === 0) {
        return z.string().min(1, message ?? `${field.label} is required`);
      }
      const schema = z.enum(values as [string, ...string[]], {
        error: message ?? `Select a valid ${field.label.toLowerCase()}`,
      });
      return v.required === false ? schema.optional() : schema;
    }

    case "checkbox": {
      return z.coerce.boolean().optional().default(false);
    }

    default:
      return z.unknown().optional();
  }
}

/**
 * Get default form values from field config.
 */
export function getDefaultValues(fields: CalculatorField[]): CalculatorInput {
  const defaults: CalculatorInput = {};
  for (const field of fields) {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    } else if (field.type === "checkbox") {
      defaults[field.name] = false;
    } else if (field.type === "unit" && field.units?.[0]) {
      defaults[field.name] = field.units[0].value;
    } else if ((field.type === "select" || field.type === "radio") && field.options?.[0]) {
      defaults[field.name] = field.options[0].value;
    } else if (field.type === "slider" && field.min !== undefined) {
      defaults[field.name] = field.defaultValue ?? field.min;
    }
  }
  return defaults;
}
