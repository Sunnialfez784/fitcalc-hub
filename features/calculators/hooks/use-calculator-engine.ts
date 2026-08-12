"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  CalculatorConfig,
  CalculatorInput,
  CalculatorResult,
  FormulaFn,
  Recommendation,
  UnitSystem,
} from "../types";
import { buildSchemaFromFields, getDefaultValues } from "../validations";
import { getRecommendations } from "../formulas/recommendations";

type UseCalculatorEngineOptions = {
  config: CalculatorConfig;
  formula: FormulaFn;
};

/**
 * Core calculator engine hook.
 * Wires config → Zod schema → RHF → memoized formula → result + recommendations.
 */
export function useCalculatorEngine({ config, formula }: UseCalculatorEngineOptions) {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(config.defaultUnitSystem ?? "metric");

  const schema = useMemo(
    () => config.schemaOverride ?? buildSchemaFromFields(config.fields),
    [config.fields, config.schemaOverride],
  );

  const defaultValues = useMemo(() => getDefaultValues(config.fields), [config.fields]);

  const form = useForm<CalculatorInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
    mode: "onBlur",
  });

  const visibleFields = useMemo(() => {
    const values = form.watch();
    return config.fields.filter((field) => {
      if (!field.showWhen) return true;
      return values[field.showWhen.field] === field.showWhen.equals;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.fields, form.watch()]);

  const calculate = useCallback(
    (input: CalculatorInput) => {
      startTransition(() => {
        const next = formula(input, { unitSystem });
        setResult(next);
      });
    },
    [formula, unitSystem],
  );

  const onSubmit = form.handleSubmit((data) => {
    calculate(data);
  });

  const reset = useCallback(() => {
    form.reset(defaultValues);
    setResult(null);
  }, [form, defaultValues]);

  const recommendations: Recommendation[] = useMemo(() => {
    if (!result) return [];
    if (config.recommendationId) {
      return getRecommendations(config.recommendationId, result);
    }
    return config.recommendations ?? [];
  }, [result, config.recommendationId, config.recommendations]);

  return {
    form,
    fields: visibleFields,
    result,
    recommendations,
    isPending,
    unitSystem,
    setUnitSystem,
    onSubmit,
    reset,
    calculate,
  };
}

export type UseCalculatorEngineReturn = ReturnType<typeof useCalculatorEngine>;
