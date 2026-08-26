import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

export function Form({ children, ...props }: React.ComponentProps<typeof FormProvider>) {
  return <FormProvider {...props}>{children}</FormProvider>
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
