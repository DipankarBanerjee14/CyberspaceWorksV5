export type ThemeMode = "light" | "dark"

export interface ThemeStyle {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  border: string
  input: string
  ring: string
  sidebar: string
  sidebarForeground: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
  sidebarAccent: string
  sidebarAccentForeground: string
  sidebarBorder: string
  sidebarRing: string
}

export interface ThemePreset {
  styles: Record<ThemeMode, ThemeStyle>
}

export interface ImportedTheme {
  name?: string
  mode?: ThemeMode
  radius?: string
  colors?: Record<string, string>
  styles?: Partial<Record<ThemeMode, Partial<ThemeStyle>>>
}
