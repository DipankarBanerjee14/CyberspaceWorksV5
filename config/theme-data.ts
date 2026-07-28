import type { ThemePreset } from "@/types/theme-customizer"

export interface ThemeOption {
  name: string
  value: string
  preset: ThemePreset
}

const defaultLight: ThemePreset["styles"]["light"] = {
  background: "#ffffff",
  foreground: "#111827",
  card: "#ffffff",
  cardForeground: "#111827",
  popover: "#ffffff",
  popoverForeground: "#111827",
  primary: "#0f172a",
  primaryForeground: "#f8fafc",
  secondary: "#f1f5f9",
  secondaryForeground: "#0f172a",
  muted: "#f8fafc",
  mutedForeground: "#64748b",
  accent: "#e2e8f0",
  accentForeground: "#0f172a",
  destructive: "#dc2626",
  border: "#e2e8f0",
  input: "#e2e8f0",
  ring: "#94a3b8",
  sidebar: "#f8fafc",
  sidebarForeground: "#111827",
  sidebarPrimary: "#0f172a",
  sidebarPrimaryForeground: "#f8fafc",
  sidebarAccent: "#e2e8f0",
  sidebarAccentForeground: "#0f172a",
  sidebarBorder: "#e2e8f0",
  sidebarRing: "#94a3b8",
}

const defaultDark: ThemePreset["styles"]["dark"] = {
  background: "#09090b",
  foreground: "#fafafa",
  card: "#18181b",
  cardForeground: "#fafafa",
  popover: "#18181b",
  popoverForeground: "#fafafa",
  primary: "#fafafa",
  primaryForeground: "#18181b",
  secondary: "#27272a",
  secondaryForeground: "#fafafa",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  accent: "#27272a",
  accentForeground: "#fafafa",
  destructive: "#ef4444",
  border: "rgba(255,255,255,0.1)",
  input: "rgba(255,255,255,0.14)",
  ring: "#71717a",
  sidebar: "#18181b",
  sidebarForeground: "#fafafa",
  sidebarPrimary: "#a1a1aa",
  sidebarPrimaryForeground: "#fafafa",
  sidebarAccent: "#27272a",
  sidebarAccentForeground: "#fafafa",
  sidebarBorder: "rgba(255,255,255,0.1)",
  sidebarRing: "#71717a",
}

const makePreset = (light: Partial<ThemePreset["styles"]["light"]>, dark: Partial<ThemePreset["styles"]["dark"]>): ThemePreset => ({
  styles: {
    light: { ...defaultLight, ...light },
    dark: { ...defaultDark, ...dark },
  },
})

export const colorThemes: ThemeOption[] = [
  {
    name: "Default",
    value: "default",
    preset: makePreset({}, {}),
  },
  {
    name: "Ocean",
    value: "ocean",
    preset: makePreset(
      { primary: "#0f766e", primaryForeground: "#ecfeff", accent: "#ccfbf1", accentForeground: "#0f172a", ring: "#14b8a6" },
      { primary: "#5eead4", primaryForeground: "#042f2e", accent: "#134e4a", accentForeground: "#f0fdfa", ring: "#2dd4bf" }
    ),
  },
  {
    name: "Sunset",
    value: "sunset",
    preset: makePreset(
      { primary: "#c2410c", primaryForeground: "#fff7ed", accent: "#ffedd5", accentForeground: "#7c2d12", ring: "#fb923c" },
      { primary: "#fb923c", primaryForeground: "#431407", accent: "#7c2d12", accentForeground: "#fff7ed", ring: "#fdba74" }
    ),
  },
  {
    name: "Forest",
    value: "forest",
    preset: makePreset(
      { primary: "#166534", primaryForeground: "#f0fdf4", accent: "#dcfce7", accentForeground: "#14532d", ring: "#22c55e" },
      { primary: "#4ade80", primaryForeground: "#052e16", accent: "#14532d", accentForeground: "#f0fdf4", ring: "#16a34a" }
    ),
  },
]

export const tweakcnThemes: ThemeOption[] = [
  {
    name: "Aurora",
    value: "aurora",
    preset: makePreset(
      { primary: "#4f46e5", primaryForeground: "#eef2ff", secondary: "#e0e7ff", accent: "#c7d2fe", ring: "#6366f1" },
      { primary: "#818cf8", primaryForeground: "#111827", secondary: "#312e81", accent: "#1e1b4b", ring: "#8b5cf6" }
    ),
  },
  {
    name: "Graphite",
    value: "graphite",
    preset: makePreset(
      { primary: "#111827", primaryForeground: "#f9fafb", secondary: "#e5e7eb", accent: "#f3f4f6", ring: "#374151" },
      { primary: "#f3f4f6", primaryForeground: "#111827", secondary: "#27272a", accent: "#3f3f46", ring: "#52525b" }
    ),
  },
  {
    name: "Neon",
    value: "neon",
    preset: makePreset(
      { primary: "#0ea5e9", primaryForeground: "#ecfeff", accent: "#cffafe", secondary: "#e0f2fe", ring: "#22d3ee" },
      { primary: "#22d3ee", primaryForeground: "#082f49", accent: "#164e63", secondary: "#0f172a", ring: "#06b6d4" }
    ),
  },
  {
    name: "Ember",
    value: "ember",
    preset: makePreset(
      { primary: "#b91c1c", primaryForeground: "#fef2f2", accent: "#fee2e2", secondary: "#fef2f2", ring: "#ef4444" },
      { primary: "#f87171", primaryForeground: "#450a0a", accent: "#7f1d1d", secondary: "#1f2937", ring: "#f97316" }
    ),
  },
]

export const defaultThemePreset = colorThemes[0].preset
