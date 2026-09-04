import { themes, modes, type Theme, type Mode } from "../../tokens/src/index"

export interface ThemeConfig {
  theme: Theme
  mode: Mode
}

export function applyTheme(config: ThemeConfig) {
  document.documentElement.setAttribute("data-theme", config.theme)
  document.documentElement.setAttribute("data-mode", config.mode)
}

export function getSystemTheme(): Mode {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export { themes, modes }
export type { Theme, Mode }