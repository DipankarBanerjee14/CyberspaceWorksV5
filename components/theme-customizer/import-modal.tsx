"use client"

import * as React from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { ImportedTheme } from "@/types/theme-customizer"

interface ImportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (theme: ImportedTheme) => void
}

const EXAMPLE_THEME = JSON.stringify(
  {
    name: "My Theme",
    mode: "light",
    radius: "0.75rem",
    colors: {
      "--primary": "#2563eb",
      "--accent": "#dbeafe",
      "--ring": "#3b82f6",
    },
  },
  null,
  2
)

function normalizeImportedTheme(rawTheme: unknown): ImportedTheme {
  if (!rawTheme || typeof rawTheme !== "object") {
    throw new Error("Theme data must be a JSON object.")
  }

  const themeObject = rawTheme as Record<string, unknown>
  const colorsFromRoot = Object.fromEntries(
    Object.entries(themeObject).filter(([key, value]) => key.startsWith("--") && typeof value === "string")
  )

  const colors =
    themeObject.colors && typeof themeObject.colors === "object"
      ? Object.fromEntries(Object.entries(themeObject.colors as Record<string, unknown>).filter(([, value]) => typeof value === "string"))
      : colorsFromRoot

  const mode = themeObject.mode === "dark" || themeObject.mode === "light" ? themeObject.mode : undefined
  const radius = typeof themeObject.radius === "string" ? themeObject.radius : undefined
  const name = typeof themeObject.name === "string" ? themeObject.name : undefined

  return {
    name,
    mode,
    radius,
    colors: Object.keys(colors).length > 0 ? (colors as Record<string, string>) : undefined,
  }
}

export function ImportModal({ open, onOpenChange, onImport }: ImportModalProps) {
  const [themeName, setThemeName] = React.useState("")
  const [rawJson, setRawJson] = React.useState(EXAMPLE_THEME)
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    if (!open) {
      return
    }

    setThemeName("")
    setRawJson(EXAMPLE_THEME)
    setError("")
  }, [open])

  const handleImport = () => {
    try {
      const parsedTheme = normalizeImportedTheme(JSON.parse(rawJson))
      onImport({ ...parsedTheme, name: themeName || parsedTheme.name })
      onOpenChange(false)
    } catch (importError) {
      setError(importError instanceof Error ? importError.message : "Unable to parse the theme JSON.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import Theme</DialogTitle>
          <DialogDescription>
            Paste a JSON theme export. The importer accepts root-level color variables or a nested <code>colors</code> object.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Theme name</label>
            <Input value={themeName} onChange={(event) => setThemeName(event.target.value)} placeholder="My custom theme" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Theme JSON</label>
            <Textarea
              value={rawJson}
              onChange={(event) => setRawJson(event.target.value)}
              className="min-h-[240px] font-mono text-xs"
              spellCheck={false}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
