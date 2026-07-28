"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

interface ModeToggleProps {
  variant?: React.ComponentProps<typeof Button>["variant"]
}

export function ModeToggle({ variant = "ghost" }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
