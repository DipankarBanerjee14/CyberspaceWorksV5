"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function useCircularTransition() {
  const { resolvedTheme, setTheme, theme } = useTheme()

  const toggleTheme = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const isDark = resolvedTheme === "dark" || theme === "dark"
    setTheme(isDark ? "light" : "dark")
  }, [resolvedTheme, setTheme, theme])

  return { toggleTheme }
}
