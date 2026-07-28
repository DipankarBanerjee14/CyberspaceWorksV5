"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  label: string
  cssVar: string
  value: string
  onChange: (cssVar: string, value: string) => void
}

export function ColorPicker({ label, cssVar, value, onChange }: ColorPickerProps) {
  const displayValue = value || "#000000"

  return (
    <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-background/60 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted">
        <input
          aria-label={`${label} color swatch`}
          type="color"
          value={displayValue}
          onChange={(event) => onChange(cssVar, event.target.value)}
          className="h-10 w-10 cursor-pointer border-0 bg-transparent p-0"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
        <Input
          value={value}
          onChange={(event) => onChange(cssVar, event.target.value)}
          placeholder="#ffffff"
          className="h-9"
        />
      </div>
    </div>
  )
}
