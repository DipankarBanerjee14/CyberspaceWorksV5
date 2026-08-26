import * as React from "react"
import { Controller, FormProvider, useFormContext, type FieldValues } from "react-hook-form"

export function Form<T extends FieldValues>({ children, ...props }: React.ComponentProps<typeof FormProvider<T>>) {
  return <FormProvider<T> {...(props as React.ComponentProps<typeof FormProvider<T>>)}>{children}</FormProvider>
}

export function FormField({ name, control, render, ...props }: any) {
  return <Controller name={name} control={control} render={render} {...props} />
}

export function FormItem({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>
}

export function FormLabel({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props}>{children}</label>
}

export function FormControl({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>
}

export function FormDescription({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{children}</p>
}

export function FormMessage({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props}>{children}</span>
}
