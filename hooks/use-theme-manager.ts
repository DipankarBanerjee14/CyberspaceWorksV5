"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { baseColors } from "@/config/theme-customizer-constants"
import { colorThemes, tweakcnThemes } from "@/config/theme-data"
import type { ImportedTheme, ThemePreset } from "@/types/theme-customizer"

const THEME_VARIABLES = [
  ...baseColors.map((color) => color.cssVar),
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--border",
  "--input",
  "--ring",
  "--sidebar",
  "--sidebar-foreground",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
  "--sidebar-ring",
  "--radius",
]

function applyStyleVariables(values: Record<string, string>) {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement

  Object.entries(values).forEach(([cssVar, value]) => {
    if (value) {
      root.style.setProperty(cssVar, value)
    }
  })
}

function clearStyleVariables() {
  if (typeof document === "undefined") {
    return
  }

  const root = document.documentElement
  THEME_VARIABLES.forEach((cssVar) => root.style.removeProperty(cssVar))
}

function themePresetToVariables(preset: ThemePreset, isDarkMode: boolean) {
  const palette = isDarkMode ? preset.styles.dark : preset.styles.light

  return {
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--card": palette.card,
    "--card-foreground": palette.cardForeground,
    "--popover": palette.popover,
    "--popover-foreground": palette.popoverForeground,
    "--primary": palette.primary,
    "--primary-foreground": palette.primaryForeground,
    "--secondary": palette.secondary,
    "--secondary-foreground": palette.secondaryForeground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--accent": palette.accent,
    "--accent-foreground": palette.accentForeground,
    "--destructive": palette.destructive,
    "--border": palette.border,
    "--input": palette.input,
    "--ring": palette.ring,
    "--sidebar": palette.sidebar,
    "--sidebar-foreground": palette.sidebarForeground,
    "--sidebar-primary": palette.sidebarPrimary,
    "--sidebar-primary-foreground": palette.sidebarPrimaryForeground,
    "--sidebar-accent": palette.sidebarAccent,
    "--sidebar-accent-foreground": palette.sidebarAccentForeground,
    "--sidebar-border": palette.sidebarBorder,
    "--sidebar-ring": palette.sidebarRing,
  }
}

export function useThemeManager() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [brandColorsValues, setBrandColorsValues] = React.useState<Record<string, string>>({})

  const isDarkMode = resolvedTheme === "dark" || theme === "dark"

  const applyTheme = React.useCallback((themeValue: string, darkMode: boolean) => {
    const selectedTheme = colorThemes.find((entry) => entry.value === themeValue)
    if (!selectedTheme) {
      return
    }

    applyStyleVariables(themePresetToVariables(selectedTheme.preset, darkMode))
  }, [])

  const applyTweakcnTheme = React.useCallback((preset: ThemePreset | undefined | null, darkMode: boolean) => {
    if (!preset) {
      return
    }

    applyStyleVariables(themePresetToVariables(preset, darkMode))
  }, [])

  const applyRadius = React.useCallback((radius: string) => {
    if (typeof document === "undefined") {
      return
    }

    document.documentElement.style.setProperty("--radius", radius)
  }, [])

  const handleColorChange = React.useCallback((cssVar: string, value: string) => {
    setBrandColorsValues((current) => ({
      ...current,
      [cssVar]: value,
    }))

    if (typeof document !== "undefined" && value) {
      document.documentElement.style.setProperty(cssVar, value)
    }
  }, [])

  const applyImportedTheme = React.useCallback((themeData: ImportedTheme, darkMode: boolean) => {
    if (!themeData) {
      return
    }

    const selectedMode = themeData.mode ?? (darkMode ? "dark" : "light")

    if (themeData.radius) {
      applyRadius(themeData.radius)
    }

    if (themeData.styles?.[selectedMode]) {
      const presetLike = themeData.styles[selectedMode] ?? {}
      applyStyleVariables({
        ...(presetLike.background ? { "--background": presetLike.background } : {}),
        ...(presetLike.foreground ? { "--foreground": presetLike.foreground } : {}),
        ...(presetLike.card ? { "--card": presetLike.card } : {}),
        ...(presetLike.cardForeground ? { "--card-foreground": presetLike.cardForeground } : {}),
        ...(presetLike.popover ? { "--popover": presetLike.popover } : {}),
        ...(presetLike.popoverForeground ? { "--popover-foreground": presetLike.popoverForeground } : {}),
        ...(presetLike.primary ? { "--primary": presetLike.primary } : {}),
        ...(presetLike.primaryForeground ? { "--primary-foreground": presetLike.primaryForeground } : {}),
        ...(presetLike.secondary ? { "--secondary": presetLike.secondary } : {}),
        ...(presetLike.secondaryForeground ? { "--secondary-foreground": presetLike.secondaryForeground } : {}),
        ...(presetLike.muted ? { "--muted": presetLike.muted } : {}),
        ...(presetLike.mutedForeground ? { "--muted-foreground": presetLike.mutedForeground } : {}),
        ...(presetLike.accent ? { "--accent": presetLike.accent } : {}),
        ...(presetLike.accentForeground ? { "--accent-foreground": presetLike.accentForeground } : {}),
        ...(presetLike.destructive ? { "--destructive": presetLike.destructive } : {}),
        ...(presetLike.border ? { "--border": presetLike.border } : {}),
        ...(presetLike.input ? { "--input": presetLike.input } : {}),
        ...(presetLike.ring ? { "--ring": presetLike.ring } : {}),
        ...(presetLike.sidebar ? { "--sidebar": presetLike.sidebar } : {}),
        ...(presetLike.sidebarForeground ? { "--sidebar-foreground": presetLike.sidebarForeground } : {}),
        ...(presetLike.sidebarPrimary ? { "--sidebar-primary": presetLike.sidebarPrimary } : {}),
        ...(presetLike.sidebarPrimaryForeground ? { "--sidebar-primary-foreground": presetLike.sidebarPrimaryForeground } : {}),
        ...(presetLike.sidebarAccent ? { "--sidebar-accent": presetLike.sidebarAccent } : {}),
        ...(presetLike.sidebarAccentForeground ? { "--sidebar-accent-foreground": presetLike.sidebarAccentForeground } : {}),
        ...(presetLike.sidebarBorder ? { "--sidebar-border": presetLike.sidebarBorder } : {}),
        ...(presetLike.sidebarRing ? { "--sidebar-ring": presetLike.sidebarRing } : {}),
      })
      return
    }

    if (themeData.colors) {
      applyStyleVariables(themeData.colors)
    }
  }, [applyRadius])

  const resetTheme = React.useCallback(() => {
    clearStyleVariables()
    setBrandColorsValues({})
    setTheme("system")
  }, [setTheme])

  React.useEffect(() => {
    if (Object.keys(brandColorsValues).length === 0) {
      return
    }

    applyStyleVariables(brandColorsValues)
  }, [brandColorsValues])

  return {
    applyImportedTheme,
    isDarkMode,
    resetTheme,
    applyRadius,
    setBrandColorsValues,
    applyTheme,
    applyTweakcnTheme,
    brandColorsValues,
    handleColorChange,
  }
}
