"use client";

import { Controller, type UseFormReturn } from "react-hook-form";
import type { CalculatorField, CalculatorInput } from "@/features/calculators/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalculatorFormProps = {
  fields: CalculatorField[];
  form: UseFormReturn<CalculatorInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onReset?: () => void;
  isPending?: boolean;
  className?: string;
};

/**
 * Dynamic form engine — renders fields from CalculatorConfig.
 * Supports number, text, select, radio, checkbox, slider, unit.
 */
export function CalculatorForm({
  fields,
  form,
  onSubmit,
  onReset,
  isPending,
  className,
}: CalculatorFormProps) {
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={cn("space-y-2", field.colSpan === 2 && "sm:col-span-2")}>
            <FieldControl
              field={field}
              control={control}
              register={register}
              error={errors[field.name]?.message as string | undefined}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" disabled={isPending} className="min-w-[140px]">
          {isPending ? "Calculating…" : "Calculate"}
        </Button>
        {onReset ? (
          <Button type="button" variant="outline" onClick={onReset} disabled={isPending}>
            Reset
          </Button>
        ) : null}
      </div>
    </form>
  );
}

type FieldControlProps = {
  field: CalculatorField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
};

function FieldControl({ field, control, register, error }: FieldControlProps) {
  const descriptionId = `${field.name}-hint`;
  const errorId = `${field.name}-error`;

  switch (field.type) {
    case "number":
      return (
        <>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type="number"
            step={field.step ?? field.validation?.step ?? "any"}
            placeholder={field.placeholder}
            aria-describedby={error ? errorId : field.description ? descriptionId : undefined}
            aria-invalid={Boolean(error)}
            {...register(field.name)}
          />
          <FieldMeta field={field} error={error} descriptionId={descriptionId} errorId={errorId} />
        </>
      );

    case "text":
      return (
        <>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            type="text"
            placeholder={field.placeholder}
            aria-invalid={Boolean(error)}
            {...register(field.name)}
          />
          <FieldMeta field={field} error={error} descriptionId={descriptionId} errorId={errorId} />
        </>
      );

    case "select":
    case "unit":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: rhf }) => (
            <>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Select
                value={rhf.value !== undefined ? String(rhf.value) : undefined}
                onValueChange={rhf.onChange}
              >
                <SelectTrigger id={field.name} aria-invalid={Boolean(error)}>
                  <SelectValue placeholder={field.placeholder ?? "Select…"} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options ?? field.units ?? []).map((opt) => (
                    <SelectItem key={String(opt.value)} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldMeta
                field={field}
                error={error}
                descriptionId={descriptionId}
                errorId={errorId}
              />
            </>
          )}
        />
      );

    case "radio":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: rhf }) => (
            <>
              <Label>{field.label}</Label>
              <RadioGroup
                value={rhf.value !== undefined ? String(rhf.value) : undefined}
                onValueChange={rhf.onChange}
                className="flex flex-wrap gap-4"
              >
                {(field.options ?? []).map((opt) => (
                  <div key={String(opt.value)} className="flex items-center gap-2">
                    <RadioGroupItem value={String(opt.value)} id={`${field.name}-${opt.value}`} />
                    <Label htmlFor={`${field.name}-${opt.value}`} className="font-normal">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <FieldMeta
                field={field}
                error={error}
                descriptionId={descriptionId}
                errorId={errorId}
              />
            </>
          )}
        />
      );

    case "checkbox":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: rhf }) => (
            <div className="flex items-center gap-2 pt-6">
              <Checkbox
                id={field.name}
                checked={Boolean(rhf.value)}
                onCheckedChange={rhf.onChange}
              />
              <Label htmlFor={field.name} className="font-normal">
                {field.label}
              </Label>
            </div>
          )}
        />
      );

    case "slider":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: rhf }) => (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor={field.name}>{field.label}</Label>
                <span className="text-muted-foreground text-sm tabular-nums">{rhf.value}</span>
              </div>
              <input
                id={field.name}
                type="range"
                min={field.min ?? field.validation?.min ?? 0}
                max={field.max ?? field.validation?.max ?? 100}
                step={field.step ?? 1}
                value={Number(rhf.value ?? field.min ?? 0)}
                onChange={(e) => rhf.onChange(Number(e.target.value))}
                className="accent-primary w-full"
                aria-valuemin={field.min}
                aria-valuemax={field.max}
                aria-valuenow={Number(rhf.value ?? 0)}
              />
              <FieldMeta
                field={field}
                error={error}
                descriptionId={descriptionId}
                errorId={errorId}
              />
            </>
          )}
        />
      );

    default:
      return null;
  }
}

function FieldMeta({
  field,
  error,
  descriptionId,
  errorId,
}: {
  field: CalculatorField;
  error?: string;
  descriptionId: string;
  errorId: string;
}) {
  return (
    <>
      {field.description && !error ? (
        <p id={descriptionId} className="text-muted-foreground text-xs">
          {field.description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}
