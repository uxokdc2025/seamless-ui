"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Switch,
  Badge,
  Checkbox,
  Radio,
  RadioGroup,
  Separator
} from "@seamless/ui"
import { Container, Stack, Grid } from "@seamless/layout"
import { Download, Upload, RotateCcw, Palette, Type, Layout, Layers, Zap, Focus, Sun, Moon, Copy, Check } from "lucide-react"

// Token categories for the theme editor
const tokenCategories = [
  { id: "colors", label: "Colors", icon: Palette },
  { id: "typography", label: "Typography", icon: Type },
  { id: "spacing", label: "Spacing", icon: Layout },
  { id: "radius", label: "Border Radius", icon: Layers },
  { id: "shadows", label: "Shadows", icon: Layers },
  { id: "motion", label: "Motion", icon: Zap },
  { id: "focus", label: "Focus", icon: Focus },
]

interface ThemeTokens {
  colors: {
    background: string
    foreground: string
    surface: string
    surfaceRaised: string
    primary: string
    primaryForeground: string
    accent: string
    accentForeground: string
    error: string
    success: string
    warning: string
    border: string
    muted: string
    mutedForeground: string
  }
  typography: {
    fontSizeBase: string
    fontSizeSm: string
    fontSizeLg: string
    fontSizeXl: string
    fontWeightNormal: string
    fontWeightMedium: string
    fontWeightBold: string
    lineHeightNormal: string
    lineHeightTight: string
    letterSpacingNormal: string
  }
  spacing: {
    scale: string // multiplier
    density: "compact" | "normal" | "comfortable"
  }
  radius: {
    default: string
    sm: string
    lg: string
    xl: string
  }
  shadows: {
    sm: string
    base: string
    md: string
    lg: string
  }
  motion: {
    durationNormal: string
    easing: string
  }
  focus: {
    ringWidth: string
    ringOffset: string
  }
}

const defaultTokens: ThemeTokens = {
  colors: {
    background: "#15101a",
    foreground: "#f3ebda",
    surface: "#251d2c",
    surfaceRaised: "#2e2436",
    primary: "#d4a574",
    primaryForeground: "#15101a",
    accent: "#5ab896",
    accentForeground: "#15101a",
    error: "#c4607e",
    success: "#5ab896",
    warning: "#d4a574",
    border: "rgba(243, 235, 218, 0.08)",
    muted: "#251d2c",
    mutedForeground: "#a59783",
  },
  typography: {
    fontSizeBase: "16",
    fontSizeSm: "14",
    fontSizeLg: "18",
    fontSizeXl: "20",
    fontWeightNormal: "400",
    fontWeightMedium: "500",
    fontWeightBold: "700",
    lineHeightNormal: "1.5",
    lineHeightTight: "1.25",
    letterSpacingNormal: "0",
  },
  spacing: {
    scale: "1.0",
    density: "normal",
  },
  radius: {
    default: "8",
    sm: "4",
    lg: "12",
    xl: "16",
  },
  shadows: {
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    base: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  motion: {
    durationNormal: "200",
    easing: "cubic-bezier(0, 0, 0.2, 1)",
  },
  focus: {
    ringWidth: "2",
    ringOffset: "2",
  },
}

// Preset themes - loaded from the 8 real @seamless/tokens themes
const presets = {
  "midnight-aubergine": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#15101a",
      foreground: "#f3ebda",
      surface: "#251d2c",
      surfaceRaised: "#2e2436",
      primary: "#d4a574",
      primaryForeground: "#15101a",
      accent: "#5ab896",
      accentForeground: "#15101a",
      error: "#c4607e",
      border: "rgba(243, 235, 218, 0.08)",
    },
  },
  "together": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#10131a",
      foreground: "#f4f7fb",
      surface: "#202735",
      surfaceRaised: "#293344",
      primary: "#67e8f9",
      primaryForeground: "#10131a",
      accent: "#7dd3fc",
      accentForeground: "#10131a",
      error: "#a78bfa",
      border: "rgba(244, 247, 251, 0.08)",
    },
  },
  "airtable": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#f7f9fc",
      foreground: "#182230",
      surface: "#f1f4f8",
      surfaceRaised: "#e4eaf2",
      primary: "#2563eb",
      primaryForeground: "#ffffff",
      accent: "#059669",
      accentForeground: "#ffffff",
      error: "#7c3aed",
      border: "rgba(24, 34, 48, 0.12)",
    },
  },
  "claude": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#1a1715",
      foreground: "#f7f1e8",
      surface: "#302824",
      surfaceRaised: "#3c3028",
      primary: "#e07a50",
      primaryForeground: "#1a1715",
      accent: "#8fc7a3",
      accentForeground: "#1a1715",
      error: "#c98a9d",
      border: "rgba(247, 241, 232, 0.08)",
    },
  },
  "discord": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#1e1f22",
      foreground: "#f2f3f5",
      surface: "#313338",
      surfaceRaised: "#404249",
      primary: "#5865f2",
      primaryForeground: "#ffffff",
      accent: "#23a559",
      accentForeground: "#ffffff",
      error: "#f23f42",
      border: "rgba(242, 243, 245, 0.08)",
    },
  },
  "elevenlabs": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#0b0b0b",
      foreground: "#f5f5f5",
      surface: "#1d1d1d",
      surfaceRaised: "#292929",
      primary: "#f97316",
      primaryForeground: "#ffffff",
      accent: "#84cc16",
      accentForeground: "#0b0b0b",
      error: "#d946ef",
      border: "rgba(245, 245, 245, 0.08)",
    },
  },
  "ibm": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#101820",
      foreground: "#f4f7fb",
      surface: "#1f2e3b",
      surfaceRaised: "#2a3b4a",
      primary: "#78a9ff",
      primaryForeground: "#101820",
      accent: "#42be65",
      accentForeground: "#101820",
      error: "#be95ff",
      border: "rgba(244, 247, 251, 0.08)",
    },
  },
  "meta": {
    ...defaultTokens,
    colors: {
      ...defaultTokens.colors,
      background: "#0b1020",
      foreground: "#f4f7ff",
      surface: "#1a2542",
      surfaceRaised: "#243256",
      primary: "#60a5fa",
      primaryForeground: "#0b1020",
      accent: "#34d399",
      accentForeground: "#0b1020",
      error: "#a78bfa",
      border: "rgba(244, 247, 255, 0.08)",
    },
  },
}

export function ThemeStudio() {
  const [tokens, setTokens] = useState<ThemeTokens>(defaultTokens)
  const [activeCategory, setActiveCategory] = useState("colors")
  const [mode, setMode] = useState<"light" | "dark">("dark")
  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTailwind, setCopiedTailwind] = useState(false)

  // Apply tokens to CSS variables
  const applyTokens = useCallback((newTokens: ThemeTokens) => {
    const root = document.documentElement
    
    // Colors
    root.style.setProperty("--color-background", newTokens.colors.background)
    root.style.setProperty("--color-foreground", newTokens.colors.foreground)
    root.style.setProperty("--color-surface", newTokens.colors.surface)
    root.style.setProperty("--color-surface-raised", newTokens.colors.surfaceRaised)
    root.style.setProperty("--color-primary", newTokens.colors.primary)
    root.style.setProperty("--color-primary-foreground", newTokens.colors.primaryForeground)
    root.style.setProperty("--color-accent", newTokens.colors.accent)
    root.style.setProperty("--color-accent-foreground", newTokens.colors.accentForeground)
    root.style.setProperty("--color-error", newTokens.colors.error)
    root.style.setProperty("--color-success", newTokens.colors.success)
    root.style.setProperty("--color-warning", newTokens.colors.warning)
    root.style.setProperty("--color-border", newTokens.colors.border)
    root.style.setProperty("--color-muted", newTokens.colors.muted)
    root.style.setProperty("--color-muted-foreground", newTokens.colors.mutedForeground)

    // Typography
    root.style.setProperty("--font-size-base", `${newTokens.typography.fontSizeBase}px`)
    root.style.setProperty("--font-size-sm", `${newTokens.typography.fontSizeSm}px`)
    root.style.setProperty("--font-size-lg", `${newTokens.typography.fontSizeLg}px`)
    root.style.setProperty("--font-size-xl", `${newTokens.typography.fontSizeXl}px`)
    root.style.setProperty("--font-weight-normal", newTokens.typography.fontWeightNormal)
    root.style.setProperty("--font-weight-medium", newTokens.typography.fontWeightMedium)
    root.style.setProperty("--font-weight-bold", newTokens.typography.fontWeightBold)
    root.style.setProperty("--line-height-normal", newTokens.typography.lineHeightNormal)
    root.style.setProperty("--line-height-tight", newTokens.typography.lineHeightTight)
    root.style.setProperty("--letter-spacing-normal", `${newTokens.typography.letterSpacingNormal}em`)

    // Spacing
    const spacingScale = parseFloat(newTokens.spacing.scale)
    root.style.setProperty("--space-scale", newTokens.spacing.scale)
    root.style.setProperty("--space-1", `${0.25 * spacingScale}rem`)
    root.style.setProperty("--space-2", `${0.5 * spacingScale}rem`)
    root.style.setProperty("--space-4", `${1 * spacingScale}rem`)
    root.style.setProperty("--space-6", `${1.5 * spacingScale}rem`)
    root.style.setProperty("--space-8", `${2 * spacingScale}rem`)

    // Radius
    root.style.setProperty("--radius", `${newTokens.radius.default}px`)
    root.style.setProperty("--radius-sm", `${newTokens.radius.sm}px`)
    root.style.setProperty("--radius-lg", `${newTokens.radius.lg}px`)
    root.style.setProperty("--radius-xl", `${newTokens.radius.xl}px`)

    // Shadows
    root.style.setProperty("--shadow-sm", newTokens.shadows.sm)
    root.style.setProperty("--shadow-base", newTokens.shadows.base)
    root.style.setProperty("--shadow-md", newTokens.shadows.md)
    root.style.setProperty("--shadow-lg", newTokens.shadows.lg)

    // Motion
    root.style.setProperty("--duration-normal", `${newTokens.motion.durationNormal}ms`)
    root.style.setProperty("--ease-out", newTokens.motion.easing)

    // Focus
    root.style.setProperty("--focus-ring-width", `${newTokens.focus.ringWidth}px`)
    root.style.setProperty("--focus-ring-offset", `${newTokens.focus.ringOffset}px`)
  }, [])

  // Apply tokens on mount and when they change
  useEffect(() => {
    applyTokens(tokens)
  }, [tokens, applyTokens])

  const updateTokens = (category: keyof ThemeTokens, key: string, value: string) => {
    setTokens((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const loadPreset = (presetName: string) => {
    const preset = presets[presetName as keyof typeof presets]
    if (preset) {
      setTokens(preset)
    }
  }

  const resetToDefault = () => {
    setTokens(defaultTokens)
  }

  const exportTokens = () => {
    const dataStr = JSON.stringify(tokens, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportFileDefaultName = "theme-tokens.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const copyCSSVariables = () => {
    const cssVars = `/* Custom Theme CSS Variables */
:root {
  /* Colors */
  --color-background: ${tokens.colors.background};
  --color-foreground: ${tokens.colors.foreground};
  --color-surface: ${tokens.colors.surface};
  --color-surface-raised: ${tokens.colors.surfaceRaised};
  --color-primary: ${tokens.colors.primary};
  --color-primary-foreground: ${tokens.colors.primaryForeground};
  --color-accent: ${tokens.colors.accent};
  --color-accent-foreground: ${tokens.colors.accentForeground};
  --color-error: ${tokens.colors.error};
  --color-success: ${tokens.colors.success};
  --color-warning: ${tokens.colors.warning};
  --color-border: ${tokens.colors.border};
  --color-muted: ${tokens.colors.muted};
  --color-muted-foreground: ${tokens.colors.mutedForeground};
  
  /* Typography */
  --font-size-base: ${tokens.typography.fontSizeBase}px;
  --font-size-sm: ${tokens.typography.fontSizeSm}px;
  --font-size-lg: ${tokens.typography.fontSizeLg}px;
  --font-size-xl: ${tokens.typography.fontSizeXl}px;
  --font-weight-normal: ${tokens.typography.fontWeightNormal};
  --font-weight-medium: ${tokens.typography.fontWeightMedium};
  --font-weight-bold: ${tokens.typography.fontWeightBold};
  --line-height-normal: ${tokens.typography.lineHeightNormal};
  --line-height-tight: ${tokens.typography.lineHeightTight};
  --letter-spacing-normal: ${tokens.typography.letterSpacingNormal}em;
  
  /* Spacing */
  --space-scale: ${tokens.spacing.scale};
  --space-1: ${0.25 * parseFloat(tokens.spacing.scale)}rem;
  --space-2: ${0.5 * parseFloat(tokens.spacing.scale)}rem;
  --space-4: ${1 * parseFloat(tokens.spacing.scale)}rem;
  --space-6: ${1.5 * parseFloat(tokens.spacing.scale)}rem;
  --space-8: ${2 * parseFloat(tokens.spacing.scale)}rem;
  
  /* Border Radius */
  --radius: ${tokens.radius.default}px;
  --radius-sm: ${tokens.radius.sm}px;
  --radius-lg: ${tokens.radius.lg}px;
  --radius-xl: ${tokens.radius.xl}px;
  
  /* Shadows */
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-base: ${tokens.shadows.base};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};
  
  /* Motion */
  --duration-normal: ${tokens.motion.durationNormal}ms;
  --ease-out: ${tokens.motion.easing};
  
  /* Focus */
  --focus-ring-width: ${tokens.focus.ringWidth}px;
  --focus-ring-offset: ${tokens.focus.ringOffset}px;
}
`
    navigator.clipboard.writeText(cssVars)
    setCopiedCSS(true)
    setTimeout(() => setCopiedCSS(false), 2000)
  }

  const exportTailwindConfig = () => {
    const tailwindConfig = `// Tailwind Config Theme Extension
// Add this to your tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '${tokens.colors.background}',
        foreground: '${tokens.colors.foreground}',
        surface: '${tokens.colors.surface}',
        'surface-raised': '${tokens.colors.surfaceRaised}',
        primary: '${tokens.colors.primary}',
        'primary-foreground': '${tokens.colors.primaryForeground}',
        accent: '${tokens.colors.accent}',
        'accent-foreground': '${tokens.colors.accentForeground}',
        error: '${tokens.colors.error}',
        success: '${tokens.colors.success}',
        warning: '${tokens.colors.warning}',
        border: '${tokens.colors.border}',
        muted: '${tokens.colors.muted}',
        'muted-foreground': '${tokens.colors.mutedForeground}',
      },
      fontSize: {
        xs: '${tokens.typography.fontSizeSm}px',
        sm: '${tokens.typography.fontSizeSm}px',
        base: '${tokens.typography.fontSizeBase}px',
        lg: '${tokens.typography.fontSizeLg}px',
        xl: '${tokens.typography.fontSizeXl}px',
      },
      fontWeight: {
        normal: ${tokens.typography.fontWeightNormal},
        medium: ${tokens.typography.fontWeightMedium},
        bold: ${tokens.typography.fontWeightBold},
      },
      lineHeight: {
        normal: ${tokens.typography.lineHeightNormal},
        tight: ${tokens.typography.lineHeightTight},
      },
      borderRadius: {
        DEFAULT: '${tokens.radius.default}px',
        sm: '${tokens.radius.sm}px',
        lg: '${tokens.radius.lg}px',
        xl: '${tokens.radius.xl}px',
      },
      boxShadow: {
        sm: '${tokens.shadows.sm}',
        DEFAULT: '${tokens.shadows.base}',
        md: '${tokens.shadows.md}',
        lg: '${tokens.shadows.lg}',
      },
      transitionDuration: {
        DEFAULT: '${tokens.motion.durationNormal}ms',
      },
      transitionTimingFunction: {
        DEFAULT: '${tokens.motion.easing}',
      },
    },
  },
}
`
    const dataUri = `data:text/javascript;charset=utf-8,${encodeURIComponent(tailwindConfig)}`
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", "tailwind.config.js")
    linkElement.click()
  }

  const importTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string)
          setTokens(imported)
        } catch (error) {
          console.error("Failed to import tokens:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}>
      {/* Header */}
      <div style={{ 
        borderBottom: "1px solid var(--color-border)", 
        background: "var(--color-surface)",
        padding: "1rem 0"
      }}>
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Theme Studio</h1>
              <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
                Live design system editor — every change updates the catalog in real-time
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              >
                {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={resetToDefault}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={copyCSSVariables}>
                {copiedCSS ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedCSS ? "Copied!" : "Copy CSS"}
              </Button>
              <Button variant="outline" size="sm" onClick={exportTailwindConfig}>
                <Download className="h-4 w-4 mr-2" />
                Tailwind
              </Button>
              <Button variant="outline" size="sm" onClick={exportTokens}>
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Button>
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importTokens}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar - Controls */}
        <div style={{ 
          width: "400px", 
          borderRight: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          height: "calc(100vh - 89px)",
          overflowY: "auto"
        }}>
          <div className="p-6 space-y-6">
            {/* Preset Selection */}
            <div className="space-y-2">
              <Label>Start From Preset</Label>
              <Select onValueChange={loadPreset}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a preset..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midnight-aubergine">Midnight Aubergine</SelectItem>
                  <SelectItem value="together">Together</SelectItem>
                  <SelectItem value="airtable">Airtable</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                  <SelectItem value="ibm">IBM</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-3 gap-2 w-full">
                {tokenCategories.slice(0, 3).map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-4 gap-2 w-full mt-2">
                {tokenCategories.slice(3).map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Colors Panel */}
              <TabsContent value="colors" className="space-y-4 mt-4">
                <ColorControl
                  label="Background"
                  value={tokens.colors.background}
                  onChange={(v) => updateTokens("colors", "background", v)}
                />
                <ColorControl
                  label="Foreground"
                  value={tokens.colors.foreground}
                  onChange={(v) => updateTokens("colors", "foreground", v)}
                />
                <ColorControl
                  label="Surface"
                  value={tokens.colors.surface}
                  onChange={(v) => updateTokens("colors", "surface", v)}
                />
                <ColorControl
                  label="Surface Raised"
                  value={tokens.colors.surfaceRaised}
                  onChange={(v) => updateTokens("colors", "surfaceRaised", v)}
                />
                <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
                <ColorControl
                  label="Primary"
                  value={tokens.colors.primary}
                  onChange={(v) => updateTokens("colors", "primary", v)}
                />
                <ColorControl
                  label="Primary Foreground"
                  value={tokens.colors.primaryForeground}
                  onChange={(v) => updateTokens("colors", "primaryForeground", v)}
                />
                <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
                <ColorControl
                  label="Accent"
                  value={tokens.colors.accent}
                  onChange={(v) => updateTokens("colors", "accent", v)}
                />
                <ColorControl
                  label="Accent Foreground"
                  value={tokens.colors.accentForeground}
                  onChange={(v) => updateTokens("colors", "accentForeground", v)}
                />
                <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
                <ColorControl
                  label="Error"
                  value={tokens.colors.error}
                  onChange={(v) => updateTokens("colors", "error", v)}
                />
                <ColorControl
                  label="Success"
                  value={tokens.colors.success}
                  onChange={(v) => updateTokens("colors", "success", v)}
                />
                <ColorControl
                  label="Warning"
                  value={tokens.colors.warning}
                  onChange={(v) => updateTokens("colors", "warning", v)}
                />
              </TabsContent>

              {/* Typography Panel */}
              <TabsContent value="typography" className="space-y-4 mt-4">
                <SliderControl
                  label="Base Font Size"
                  value={parseInt(tokens.typography.fontSizeBase)}
                  onChange={(v) => updateTokens("typography", "fontSizeBase", v.toString())}
                  min={12}
                  max={24}
                  unit="px"
                />
                <SliderControl
                  label="Small Font Size"
                  value={parseInt(tokens.typography.fontSizeSm)}
                  onChange={(v) => updateTokens("typography", "fontSizeSm", v.toString())}
                  min={10}
                  max={20}
                  unit="px"
                />
                <SliderControl
                  label="Large Font Size"
                  value={parseInt(tokens.typography.fontSizeLg)}
                  onChange={(v) => updateTokens("typography", "fontSizeLg", v.toString())}
                  min={14}
                  max={28}
                  unit="px"
                />
                <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
                <SliderControl
                  label="Normal Weight"
                  value={parseInt(tokens.typography.fontWeightNormal)}
                  onChange={(v) => updateTokens("typography", "fontWeightNormal", v.toString())}
                  min={300}
                  max={500}
                  step={100}
                />
                <SliderControl
                  label="Medium Weight"
                  value={parseInt(tokens.typography.fontWeightMedium)}
                  onChange={(v) => updateTokens("typography", "fontWeightMedium", v.toString())}
                  min={400}
                  max={600}
                  step={100}
                />
                <SliderControl
                  label="Bold Weight"
                  value={parseInt(tokens.typography.fontWeightBold)}
                  onChange={(v) => updateTokens("typography", "fontWeightBold", v.toString())}
                  min={600}
                  max={900}
                  step={100}
                />
                <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
                <SliderControl
                  label="Line Height"
                  value={parseFloat(tokens.typography.lineHeightNormal)}
                  onChange={(v) => updateTokens("typography", "lineHeightNormal", v.toString())}
                  min={1}
                  max={2}
                  step={0.05}
                />
              </TabsContent>

              {/* Spacing Panel */}
              <TabsContent value="spacing" className="space-y-4 mt-4">
                <SliderControl
                  label="Spacing Scale"
                  value={parseFloat(tokens.spacing.scale)}
                  onChange={(v) => updateTokens("spacing", "scale", v.toString())}
                  min={0.5}
                  max={2}
                  step={0.1}
                />
                <div className="space-y-2">
                  <Label>Density</Label>
                  <RadioGroup
                    value={tokens.spacing.density}
                    onValueChange={(v) => updateTokens("spacing", "density", v)}
                  >
                    <div className="flex items-center space-x-2">
                      <Radio value="compact" id="compact" />
                      <Label htmlFor="compact">Compact</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio value="normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Radio value="comfortable" id="comfortable" />
                      <Label htmlFor="comfortable">Comfortable</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              {/* Radius Panel */}
              <TabsContent value="radius" className="space-y-4 mt-4">
                <SliderControl
                  label="Default Radius"
                  value={parseInt(tokens.radius.default)}
                  onChange={(v) => updateTokens("radius", "default", v.toString())}
                  min={0}
                  max={24}
                  unit="px"
                />
                <SliderControl
                  label="Small Radius"
                  value={parseInt(tokens.radius.sm)}
                  onChange={(v) => updateTokens("radius", "sm", v.toString())}
                  min={0}
                  max={16}
                  unit="px"
                />
                <SliderControl
                  label="Large Radius"
                  value={parseInt(tokens.radius.lg)}
                  onChange={(v) => updateTokens("radius", "lg", v.toString())}
                  min={0}
                  max={32}
                  unit="px"
                />
                <SliderControl
                  label="XL Radius"
                  value={parseInt(tokens.radius.xl)}
                  onChange={(v) => updateTokens("radius", "xl", v.toString())}
                  min={0}
                  max={48}
                  unit="px"
                />
              </TabsContent>

              {/* Shadows Panel */}
              <TabsContent value="shadows" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Small Shadow</Label>
                  <Input
                    value={tokens.shadows.sm}
                    onChange={(e) => updateTokens("shadows", "sm", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Base Shadow</Label>
                  <Input
                    value={tokens.shadows.base}
                    onChange={(e) => updateTokens("shadows", "base", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Medium Shadow</Label>
                  <Input
                    value={tokens.shadows.md}
                    onChange={(e) => updateTokens("shadows", "md", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Large Shadow</Label>
                  <Input
                    value={tokens.shadows.lg}
                    onChange={(e) => updateTokens("shadows", "lg", e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* Motion Panel */}
              <TabsContent value="motion" className="space-y-4 mt-4">
                <SliderControl
                  label="Duration"
                  value={parseInt(tokens.motion.durationNormal)}
                  onChange={(v) => updateTokens("motion", "durationNormal", v.toString())}
                  min={0}
                  max={1000}
                  step={50}
                  unit="ms"
                />
                <div className="space-y-2">
                  <Label>Easing Function</Label>
                  <Select
                    value={tokens.motion.easing}
                    onValueChange={(v) => updateTokens("motion", "easing", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linear">Linear</SelectItem>
                      <SelectItem value="cubic-bezier(0.4, 0, 1, 1)">Ease In</SelectItem>
                      <SelectItem value="cubic-bezier(0, 0, 0.2, 1)">Ease Out</SelectItem>
                      <SelectItem value="cubic-bezier(0.4, 0, 0.2, 1)">Ease In Out</SelectItem>
                      <SelectItem value="cubic-bezier(0.34, 1.56, 0.64, 1)">Spring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              {/* Focus Panel */}
              <TabsContent value="focus" className="space-y-4 mt-4">
                <SliderControl
                  label="Ring Width"
                  value={parseInt(tokens.focus.ringWidth)}
                  onChange={(v) => updateTokens("focus", "ringWidth", v.toString())}
                  min={0}
                  max={8}
                  unit="px"
                />
                <SliderControl
                  label="Ring Offset"
                  value={parseInt(tokens.focus.ringOffset)}
                  onChange={(v) => updateTokens("focus", "ringOffset", v.toString())}
                  min={0}
                  max={8}
                  unit="px"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Main Area - Live Preview */}
        <div style={{ flex: 1, overflowY: "auto", height: "calc(100vh - 89px)" }}>
          <Container>
            <div className="py-8">
              <ComponentShowcase />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="color"
          value={value.startsWith("rgba") ? "#000000" : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10 p-1"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  )
}

function SliderControl({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  unit = "" 
}: { 
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  unit?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>{label}</Label>
        <span className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
          {value}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        min={min}
        max={max}
        step={step}
      />
    </div>
  )
}

// Component Showcase
function ComponentShowcase() {
  const [sliderValue, setSliderValue] = useState(60)

  return (
    <Stack gap="xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Live Component Preview</h2>
        <p style={{ color: "var(--color-muted-foreground)" }}>
          All components update in real-time as you adjust the theme tokens
        </p>
      </div>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Form Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid cols={2} gap="lg">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="select">Select</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slider">Slider ({sliderValue}%)</Label>
              <Slider id="slider" value={[sliderValue]} onValueChange={(v) => setSliderValue(v[0])} />
            </div>
          </Grid>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges & Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Checkboxes & Switches */}
      <Card>
        <CardHeader>
          <CardTitle>Selection Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" defaultChecked />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
            <div className="border-t" style={{ borderColor: "var(--color-border)", paddingTop: "1rem", marginTop: "1rem" }} />
            <div className="flex items-center space-x-2">
              <Switch id="switch1" />
              <Label htmlFor="switch1">Enable feature</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="switch2" defaultChecked />
              <Label htmlFor="switch2">Auto-save enabled</Label>
            </div>
          </Stack>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Card Variations</h3>
        <Grid cols={3} gap="lg">
          <Card>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
              <CardDescription>Surface elevation and spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--color-muted-foreground)" }}>
                This card demonstrates the surface color and elevation tokens.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
              <CardDescription>Border radius applied</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--color-muted-foreground)" }}>
                Corner radius is controlled by the radius token settings.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card 3</CardTitle>
              <CardDescription>Shadow and motion</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--color-muted-foreground)" }}>
                Shadows and transitions update with your theme.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </div>

      {/* Typography Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <h1 className="text-6xl font-bold">Display Heading</h1>
            <h2 className="text-4xl font-bold">Heading 1</h2>
            <h3 className="text-3xl font-semibold">Heading 2</h3>
            <h4 className="text-2xl font-semibold">Heading 3</h4>
            <p className="text-lg">Large body text for important content</p>
            <p>Regular body text for standard content</p>
            <p className="text-sm" style={{ color: "var(--color-muted-foreground)" }}>
              Small caption text for metadata
            </p>
          </Stack>
        </CardContent>
      </Card>

      {/* Radio Group Example */}
      <Card>
        <CardHeader>
          <CardTitle>Radio Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="option1">
            <div className="flex items-center space-x-2">
              <Radio value="option1" id="option1" />
              <Label htmlFor="option1">Option 1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Radio value="option2" id="option2" />
              <Label htmlFor="option2">Option 2</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Radio value="option3" id="option3" />
              <Label htmlFor="option3">Option 3</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </Stack>
  )
}
