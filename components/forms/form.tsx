"use client";

import * as React from "react";
import {
  useForm,
  FormProvider,
  Controller,
  type FieldValues,
  type UseFormProps,
  type SubmitHandler,
  type Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormProps<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

/** Generic form wrapper with Zod + React Hook Form. */
export function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  const methods = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        {children}
      </form>
    </FormProvider>
  );
}

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

/** Controlled text input field for use inside Form. */
export function FormField<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  className,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("space-y-2", className)}>
          <Label htmlFor={String(name)}>{label}</Label>
          <Input id={String(name)} type={type} placeholder={placeholder} {...field} />
          {fieldState.error?.message ? (
            <p className="text-destructive text-sm">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

export function FormSubmit({
  children = "Submit",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button type="submit" className={className}>
      {children}
    </Button>
  );
}
