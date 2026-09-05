"use client"

import { useMemo, useState, type CSSProperties } from "react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Badge,
  Checkbox,
  Separator,
  Progress,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@seamless/ui"
import {
  Copy,
  Check,
  RotateCcw,
  Code2,
  Sun,
  Moon,
  Palette,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Token model                                                         */
/* ------------------------------------------------------------------ */

type Mode = "light" | "dark"

interface CoreColors {
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
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

type NeutralColors = Pick<
  CoreColors,
  | "background"
  | "foreground"
  | "card"
  | "cardForeground"
  | "popover"
  | "popoverForeground"
  | "secondary"
  | "secondaryForeground"
  | "muted"
  | "mutedForeground"
  | "accent"
  | "accentForeground"
  | "border"
  | "input"
>

/* ------------------------------------------------------------------ */
/* Presets — 8 Seamless brand themes + shadcn-neutral default          */
/* ------------------------------------------------------------------ */

interface BrandSeed {
  background: string
  foreground: string
  surface: string
  surfaceRaised: string
  primary: string
  primaryForeground: string
  accent: string
  accentForeground: string
  error: string
  border: string
  muted: string
  mutedForeground: string
}

function expandBrand(c: BrandSeed): CoreColors {
  return {
    background: c.background,
    foreground: c.foreground,
    card: c.surface,
    cardForeground: c.foreground,
    popover: c.surface,
    popoverForeground: c.foreground,
    primary: c.primary,
    primaryForeground: c.primaryForeground,
    secondary: c.surfaceRaised,
    secondaryForeground: c.foreground,
    muted: c.muted,
    mutedForeground: c.mutedForeground,
    accent: c.accent,
    accentForeground: c.accentForeground,
    destructive: c.error,
    destructiveForeground: "#ffffff",
    border: c.border,
    input: c.border,
    ring: c.primary,
  }
}

const brandSeeds: Record<string, BrandSeed> = {
  "midnight-aubergine": {
    background: "#15101a", foreground: "#f3ebda", surface: "#251d2c", surfaceRaised: "#2e2436",
    primary: "#d4a574", primaryForeground: "#15101a", accent: "#5ab896", accentForeground: "#15101a",
    error: "#c4607e", border: "rgba(243, 235, 218, 0.10)", muted: "#251d2c", mutedForeground: "#a59783",
  },
  together: {
    background: "#10131a", foreground: "#f4f7fb", surface: "#202735", surfaceRaised: "#293344",
    primary: "#67e8f9", primaryForeground: "#10131a", accent: "#7dd3fc", accentForeground: "#10131a",
    error: "#a78bfa", border: "rgba(244, 247, 251, 0.10)", muted: "#202735", mutedForeground: "#9fb0c8",
  },
  airtable: {
    background: "#f7f9fc", foreground: "#182230", surface: "#ffffff", surfaceRaised: "#eef2f8",
    primary: "#2563eb", primaryForeground: "#ffffff", accent: "#059669", accentForeground: "#ffffff",
    error: "#dc2626", border: "rgba(24, 34, 48, 0.12)", muted: "#eef2f8", mutedForeground: "#5b6b80",
  },
  claude: {
    background: "#1a1715", foreground: "#f7f1e8", surface: "#302824", surfaceRaised: "#3c3028",
    primary: "#e07a50", primaryForeground: "#1a1715", accent: "#8fc7a3", accentForeground: "#1a1715",
    error: "#c98a9d", border: "rgba(247, 241, 232, 0.10)", muted: "#302824", mutedForeground: "#b7a894",
  },
  discord: {
    background: "#1e1f22", foreground: "#f2f3f5", surface: "#313338", surfaceRaised: "#404249",
    primary: "#5865f2", primaryForeground: "#ffffff", accent: "#23a559", accentForeground: "#ffffff",
    error: "#f23f42", border: "rgba(242, 243, 245, 0.10)", muted: "#313338", mutedForeground: "#b5bac1",
  },
  elevenlabs: {
    background: "#0b0b0b", foreground: "#f5f5f5", surface: "#1d1d1d", surfaceRaised: "#292929",
    primary: "#f97316", primaryForeground: "#ffffff", accent: "#84cc16", accentForeground: "#0b0b0b",
    error: "#d946ef", border: "rgba(245, 245, 245, 0.10)", muted: "#1d1d1d", mutedForeground: "#a3a3a3",
  },
  ibm: {
    background: "#101820", foreground: "#f4f7fb", surface: "#1f2e3b", surfaceRaised: "#2a3b4a",
    primary: "#78a9ff", primaryForeground: "#101820", accent: "#42be65", accentForeground: "#101820",
    error: "#be95ff", border: "rgba(244, 247, 251, 0.10)", muted: "#1f2e3b", mutedForeground: "#9fb2c4",
  },
  meta: {
    background: "#0b1020", foreground: "#f4f7ff", surface: "#1a2542", surfaceRaised: "#243256",
    primary: "#60a5fa", primaryForeground: "#0b1020", accent: "#34d399", accentForeground: "#0b1020",
    error: "#a78bfa", border: "rgba(244, 247, 255, 0.10)", muted: "#1a2542", mutedForeground: "#9db0d0",
  },
}

const brandLabels: Record<string, string> = {
  "midnight-aubergine": "Midnight Aubergine",
  together: "Together",
  airtable: "Airtable",
  claude: "Claude",
  discord: "Discord",
  elevenlabs: "ElevenLabs",
  ibm: "IBM",
  meta: "Meta",
}

/* Base color neutral ramps (shadcn base colors) per mode */
const baseColorRamps: Record<string, Record<Mode, NeutralColors>> = {
  neutral: {
    light: { background: "#ffffff", foreground: "#0a0a0a", card: "#ffffff", cardForeground: "#0a0a0a", popover: "#ffffff", popoverForeground: "#0a0a0a", secondary: "#f5f5f5", secondaryForeground: "#171717", muted: "#f5f5f5", mutedForeground: "#737373", accent: "#f5f5f5", accentForeground: "#171717", border: "#e5e5e5", input: "#e5e5e5" },
    dark: { background: "#0a0a0a", foreground: "#fafafa", card: "#0a0a0a", cardForeground: "#fafafa", popover: "#0a0a0a", popoverForeground: "#fafafa", secondary: "#262626", secondaryForeground: "#fafafa", muted: "#262626", mutedForeground: "#a3a3a3", accent: "#262626", accentForeground: "#fafafa", border: "#262626", input: "#262626" },
  },
  zinc: {
    light: { background: "#ffffff", foreground: "#09090b", card: "#ffffff", cardForeground: "#09090b", popover: "#ffffff", popoverForeground: "#09090b", secondary: "#f4f4f5", secondaryForeground: "#18181b", muted: "#f4f4f5", mutedForeground: "#71717a", accent: "#f4f4f5", accentForeground: "#18181b", border: "#e4e4e7", input: "#e4e4e7" },
    dark: { background: "#09090b", foreground: "#fafafa", card: "#09090b", cardForeground: "#fafafa", popover: "#09090b", popoverForeground: "#fafafa", secondary: "#27272a", secondaryForeground: "#fafafa", muted: "#27272a", mutedForeground: "#a1a1aa", accent: "#27272a", accentForeground: "#fafafa", border: "#27272a", input: "#27272a" },
  },
  slate: {
    light: { background: "#ffffff", foreground: "#020817", card: "#ffffff", cardForeground: "#020817", popover: "#ffffff", popoverForeground: "#020817", secondary: "#f1f5f9", secondaryForeground: "#0f172a", muted: "#f1f5f9", mutedForeground: "#64748b", accent: "#f1f5f9", accentForeground: "#0f172a", border: "#e2e8f0", input: "#e2e8f0" },
    dark: { background: "#020817", foreground: "#f8fafc", card: "#020817", cardForeground: "#f8fafc", popover: "#020817", popoverForeground: "#f8fafc", secondary: "#1e293b", secondaryForeground: "#f8fafc", muted: "#1e293b", mutedForeground: "#94a3b8", accent: "#1e293b", accentForeground: "#f8fafc", border: "#1e293b", input: "#1e293b" },
  },
  stone: {
    light: { background: "#ffffff", foreground: "#0c0a09", card: "#ffffff", cardForeground: "#0c0a09", popover: "#ffffff", popoverForeground: "#0c0a09", secondary: "#f5f5f4", secondaryForeground: "#1c1917", muted: "#f5f5f4", mutedForeground: "#78716c", accent: "#f5f5f4", accentForeground: "#1c1917", border: "#e7e5e4", input: "#e7e5e4" },
    dark: { background: "#0c0a09", foreground: "#fafaf9", card: "#0c0a09", cardForeground: "#fafaf9", popover: "#0c0a09", popoverForeground: "#fafaf9", secondary: "#292524", secondaryForeground: "#fafaf9", muted: "#292524", mutedForeground: "#a8a29e", accent: "#292524", accentForeground: "#fafaf9", border: "#292524", input: "#292524" },
  },
  gray: {
    light: { background: "#ffffff", foreground: "#030712", card: "#ffffff", cardForeground: "#030712", popover: "#ffffff", popoverForeground: "#030712", secondary: "#f3f4f6", secondaryForeground: "#111827", muted: "#f3f4f6", mutedForeground: "#6b7280", accent: "#f3f4f6", accentForeground: "#111827", border: "#e5e7eb", input: "#e5e7eb" },
    dark: { background: "#030712", foreground: "#f9fafb", card: "#030712", cardForeground: "#f9fafb", popover: "#030712", popoverForeground: "#f9fafb", secondary: "#1f2937", secondaryForeground: "#f9fafb", muted: "#1f2937", mutedForeground: "#9ca3af", accent: "#1f2937", accentForeground: "#f9fafb", border: "#1f2937", input: "#1f2937" },
  },
}

/* shadcn-neutral default preset, mode-aware */
function defaultPreset(mode: Mode): CoreColors {
  const n = baseColorRamps.neutral[mode]
  return {
    ...n,
    primary: mode === "dark" ? "#fafafa" : "#18181b",
    primaryForeground: mode === "dark" ? "#18181b" : "#fafafa",
    destructive: "#ef4444",
    destructiveForeground: "#fafafa",
    ring: mode === "dark" ? "#d4d4d8" : "#18181b",
  }
}

const defaultCustom: CoreColors = {
  background: "#ffffff",
  foreground: "#0a0a0a",
  card: "#ffffff",
  cardForeground: "#0a0a0a",
  popover: "#ffffff",
  popoverForeground: "#0a0a0a",
  primary: "#6d28d9",
  primaryForeground: "#ffffff",
  secondary: "#f4f4f5",
  secondaryForeground: "#18181b",
  muted: "#f4f4f5",
  mutedForeground: "#71717a",
  accent: "#ede9fe",
  accentForeground: "#4c1d95",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
  border: "#e4e4e7",
  input: "#e4e4e7",
  ring: "#6d28d9",
}

/* ------------------------------------------------------------------ */
/* Fonts & radius                                                      */
/* ------------------------------------------------------------------ */

const FONTS: Record<string, string> = {
  system: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  geist: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, Consolas, monospace',
}

const RADII = ["0", "0.25rem", "0.5rem", "0.75rem", "1rem"]

const CORE_KEYS: (keyof CoreColors)[] = [
  "background", "foreground", "card", "cardForeground", "popover", "popoverForeground",
  "primary", "primaryForeground", "secondary", "secondaryForeground",
  "muted", "mutedForeground", "accent", "accentForeground",
  "destructive", "destructiveForeground", "border", "input", "ring",
]

/* map camelCase token key -> css custom prop name */
function cssVarName(key: keyof CoreColors): string {
  const kebab = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
  return `--color-${kebab}`
}

function remToPx(rem: string): number {
  if (rem.endsWith("rem")) return parseFloat(rem) * 16
  if (rem.endsWith("px")) return parseFloat(rem)
  return parseFloat(rem) || 0
}

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

export function ThemeStudio() {
  const [preset, setPreset] = useState<string>("midnight-aubergine")
  const [baseColor, setBaseColor] = useState<string>("brand")
  const [radius, setRadius] = useState<string>("0.5rem")
  const [headingFont, setHeadingFont] = useState<string>("geist")
  const [bodyFont, setBodyFont] = useState<string>("geist")
  const [mode, setMode] = useState<Mode>("dark")
  const [custom, setCustom] = useState<CoreColors>(defaultCustom)

  const [copiedCSS, setCopiedCSS] = useState(false)
  const [copiedTw, setCopiedTw] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  const isCustom = preset === "custom"

  // Resolve the active color set from preset + base color + mode.
  const colors: CoreColors = useMemo(() => {
    let resolved: CoreColors
    if (isCustom) {
      resolved = custom
    } else if (preset === "default") {
      resolved = defaultPreset(mode)
    } else {
      resolved = expandBrand(brandSeeds[preset])
    }

    // Base color overrides the neutral family, keeping brand accents.
    if (baseColor !== "brand" && baseColorRamps[baseColor]) {
      const n = baseColorRamps[baseColor][mode]
      resolved = { ...resolved, ...n }
    }
    return resolved
  }, [preset, baseColor, mode, custom, isCustom])

  // Build the scoped CSS-variable style object for the preview wrapper.
  const previewStyle: CSSProperties = useMemo(() => {
    const style: Record<string, string> = {}
    for (const key of CORE_KEYS) {
      style[cssVarName(key)] = colors[key]
    }
    const px = remToPx(radius)
    style["--radius"] = `${px}px`
    style["--radius-sm"] = `${Math.max(0, px - 4)}px`
    style["--radius-base"] = `${Math.max(0, px - 2)}px`
    style["--radius-md"] = `${Math.max(0, px - 2)}px`
    style["--radius-lg"] = `${px}px`
    style["--radius-xl"] = `${px + 4}px`
    style["--radius-2xl"] = `${px + 8}px`
    style["--font-sans"] = FONTS[bodyFont]
    style.background = colors.background
    style.color = colors.foreground
    style.fontFamily = FONTS[bodyFont]
    return style as CSSProperties
  }, [colors, radius, bodyFont])

  const headingStyle: CSSProperties = { fontFamily: FONTS[headingFont] }

  /* ---- exports ---------------------------------------------------- */

  const cssBlock = useMemo(() => {
    const px = remToPx(radius)
    const lines = CORE_KEYS.map((k) => `  ${cssVarName(k)}: ${colors[k]};`).join("\n")
    return `:root {\n${lines}\n  --radius: ${px}px;\n  --font-sans: ${FONTS[bodyFont]};\n  --font-heading: ${FONTS[headingFont]};\n}`
  }, [colors, radius, bodyFont, headingFont])

  const tailwindBlock = useMemo(() => {
    const entries = CORE_KEYS.map((k) => {
      const kebab = k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
      return `        '${kebab}': 'var(${cssVarName(k)})',`
    }).join("\n")
    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      },\n      borderRadius: {\n        DEFAULT: 'var(--radius)',\n      },\n      fontFamily: {\n        sans: ['var(--font-sans)'],\n        heading: ['var(--font-heading)'],\n      },\n    },\n  },\n}`
  }, [colors])

  const copy = (text: string, set: (v: boolean) => void) => {
    navigator.clipboard?.writeText(text)
    set(true)
    setTimeout(() => set(false), 1800)
  }

  const reset = () => {
    setPreset("midnight-aubergine")
    setBaseColor("brand")
    setRadius("0.5rem")
    setHeadingFont("geist")
    setBodyFont("geist")
    setMode("dark")
    setCustom(defaultCustom)
  }

  const updateCustom = (key: keyof CoreColors, value: string) =>
    setCustom((prev) => ({ ...prev, [key]: value }))

  const customPickers: (keyof CoreColors)[] = [
    "background", "foreground", "primary", "secondary", "accent", "muted", "border", "ring", "destructive",
  ]

  /* neutral chrome tokens (the studio's own shell — inherits docs shell) */
  const chrome = {
    panel: "var(--color-card)",
    border: "var(--color-border)",
    muted: "var(--color-muted-foreground)",
    fg: "var(--color-foreground)",
  }

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: chrome.fg }}>
            Theme Studio
          </h1>
          <p className="text-sm" style={{ color: chrome.muted }}>
            Pick a preset, tune the tokens, and watch the dashboard restyle live. Then copy the CSS.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => copy(cssBlock, setCopiedCSS)}>
            {copiedCSS ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copiedCSS ? "Copied" : "Copy CSS"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => copy(tailwindBlock, setCopiedTw)}>
            {copiedTw ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copiedTw ? "Copied" : "Copy Tailwind"}
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Code2 className="h-4 w-4" />
                Get Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Theme CSS variables</DialogTitle>
                <DialogDescription>
                  Drop this into your global stylesheet to apply the theme.
                </DialogDescription>
              </DialogHeader>
              <pre
                className="mt-2 max-h-[50vh] overflow-auto rounded-md p-4 text-xs leading-relaxed"
                style={{
                  background: "var(--color-muted)",
                  color: "var(--color-foreground)",
                  fontFamily: FONTS.mono,
                }}
              >
                <code>{cssBlock}</code>
              </pre>
              <Button className="mt-2 w-full" onClick={() => copy(cssBlock, setCopiedCode)}>
                {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copiedCode ? "Copied to clipboard" : "Copy CSS"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Two-column: left rail + live dashboard */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* LEFT RAIL */}
        <aside
          className="w-full shrink-0 space-y-5 rounded-xl border p-5 lg:sticky lg:top-6 lg:w-[300px]"
          style={{ borderColor: chrome.border, background: chrome.panel }}
        >
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" style={{ color: chrome.muted }} />
            <span className="text-sm font-semibold" style={{ color: chrome.fg }}>
              Customize
            </span>
          </div>

          {/* Theme / preset */}
          <Field label="Theme">
            <Select value={preset} onValueChange={setPreset}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (shadcn neutral)</SelectItem>
                {Object.keys(brandSeeds).map((k) => (
                  <SelectItem key={k} value={k}>
                    {brandLabels[k]}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Create new…</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Base color */}
          <Field label="Base Color">
            <Select value={baseColor} onValueChange={setBaseColor}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Brand default</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="zinc">Zinc</SelectItem>
                <SelectItem value="slate">Slate</SelectItem>
                <SelectItem value="stone">Stone</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Radius */}
          <Field label="Radius">
            <div className="grid grid-cols-5 gap-1.5">
              {RADII.map((r) => {
                const active = r === radius
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRadius(r)}
                    className="h-8 rounded-md border text-xs font-medium transition-colors"
                    style={{
                      borderColor: active ? "var(--color-primary)" : chrome.border,
                      background: active ? "var(--color-primary)" : "transparent",
                      color: active ? "var(--color-primary-foreground)" : chrome.fg,
                    }}
                  >
                    {r === "0" ? "0" : r.replace("rem", "")}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* Fonts */}
          <Field label="Heading Font">
            <FontSelect value={headingFont} onChange={setHeadingFont} />
          </Field>
          <Field label="Body Font">
            <FontSelect value={bodyFont} onChange={setBodyFont} />
          </Field>

          {/* Mode */}
          <Field label="Mode">
            <div className="grid grid-cols-2 gap-1.5">
              {(["light", "dark"] as Mode[]).map((m) => {
                const active = m === mode
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className="flex h-8 items-center justify-center gap-1.5 rounded-md border text-xs font-medium capitalize transition-colors"
                    style={{
                      borderColor: active ? "var(--color-primary)" : chrome.border,
                      background: active ? "var(--color-primary)" : "transparent",
                      color: active ? "var(--color-primary-foreground)" : chrome.fg,
                    }}
                  >
                    {m === "light" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    {m}
                  </button>
                )
              })}
            </div>
          </Field>

          {/* Custom color pickers */}
          {isCustom && (
            <>
              <Separator />
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: chrome.muted }}>
                  Colors
                </span>
                {customPickers.map((key) => (
                  <ColorPicker
                    key={key}
                    label={labelFor(key)}
                    value={custom[key]}
                    onChange={(v) => updateCustom(key, v)}
                    border={chrome.border}
                    fg={chrome.fg}
                  />
                ))}
              </div>
            </>
          )}
        </aside>

        {/* CENTER — LIVE PREVIEW (scoped tokens) */}
        <div className="min-w-0 flex-1">
          <div
            data-toc-ignore
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: chrome.border }}
          >
            <div style={previewStyle} className="p-5 sm:p-6">
              <DashboardPreview headingStyle={headingStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Left-rail helpers                                                   */
/* ------------------------------------------------------------------ */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium" style={{ color: "var(--color-muted-foreground)" }}>
        {label}
      </Label>
      {children}
    </div>
  )
}

function FontSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System</SelectItem>
        <SelectItem value="geist">Geist</SelectItem>
        <SelectItem value="inter">Inter</SelectItem>
        <SelectItem value="mono">Mono</SelectItem>
      </SelectContent>
    </Select>
  )
}

function ColorPicker({
  label,
  value,
  onChange,
  border,
  fg,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  border: string
  fg: string
}) {
  const hex = value.startsWith("#") ? value : "#000000"
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs" style={{ color: fg }}>
        {label}
      </span>
      <div
        className="flex items-center gap-1.5 rounded-md border px-1.5 py-1"
        style={{ borderColor: border }}
      >
        <input
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
          aria-label={`${label} color`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[74px] bg-transparent text-xs outline-none"
          style={{ color: fg, fontFamily: FONTS.mono }}
          aria-label={`${label} hex`}
        />
      </div>
    </div>
  )
}

function labelFor(key: keyof CoreColors): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (m) => m.toUpperCase())
}

/* ------------------------------------------------------------------ */
/* Live dashboard preview                                              */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: "Revenue", value: "$48,120", delta: "+12.5%", up: true, icon: DollarSign },
  { label: "Active Users", value: "2,318", delta: "+4.1%", up: true, icon: Users },
  { label: "Conversion", value: "3.24%", delta: "-0.8%", up: false, icon: TrendingUp },
  { label: "Sessions", value: "12,840", delta: "+9.3%", up: true, icon: Activity },
]

const CHART = [42, 55, 38, 61, 47, 72, 58, 66, 51, 78, 63, 84]
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

const ROWS = [
  { name: "Ava Reyes", email: "ava@acme.io", plan: "Pro", status: "Active", amount: "$120" },
  { name: "Liam Chen", email: "liam@acme.io", plan: "Team", status: "Active", amount: "$480" },
  { name: "Noah Patel", email: "noah@acme.io", plan: "Free", status: "Trial", amount: "$0" },
  { name: "Mia Torres", email: "mia@acme.io", plan: "Pro", status: "Past due", amount: "$120" },
]

function DashboardPreview({ headingStyle }: { headingStyle: CSSProperties }) {
  const [range, setRange] = useState("30d")
  const [sliderValue, setSliderValue] = useState(64)
  const [notify, setNotify] = useState(true)

  return (
    <div className="space-y-5">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold" style={headingStyle}>
              Overview
            </h2>
            <p className="text-xs text-muted-foreground">Welcome back — here is your week.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">New report</Button>
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {STATS.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{s.label}</CardDescription>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl" style={headingStyle}>
                  {s.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium"
                  style={{ color: s.up ? "var(--color-accent)" : "var(--color-destructive)" }}
                >
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.delta}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">vs last month</span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* chart + activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle style={headingStyle}>Revenue</CardTitle>
            <CardDescription>Monthly recurring revenue, this year</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={headingStyle}>Goal</CardTitle>
            <CardDescription>Quarterly target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{sliderValue}%</span>
              </div>
              <Progress value={sliderValue} />
            </div>
            <Slider value={[sliderValue]} onValueChange={(v) => setSliderValue(v[0])} max={100} step={1} />
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge>On track</Badge>
              <Badge variant="secondary">Q3</Badge>
              <Badge variant="outline">Sales</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* form + table */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle style={headingStyle}>Create project</CardTitle>
            <CardDescription>Spin up a new workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ts-name">Name</Label>
              <Input id="ts-name" placeholder="Acme dashboard" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ts-plan">Plan</Label>
              <Select defaultValue="pro">
                <SelectTrigger id="ts-plan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ts-terms" defaultChecked />
              <Label htmlFor="ts-terms" className="text-sm font-normal">
                Accept terms
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="ts-notify" className="text-sm font-normal">
                Email notifications
              </Label>
              <Switch id="ts-notify" checked={notify} onCheckedChange={setNotify} />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button className="flex-1">Create</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>

        {/* table via tabs */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle style={headingStyle}>Customers</CardTitle>
            <CardDescription>Recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="trial">Trial</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-3">
                <DataTable rows={ROWS} />
              </TabsContent>
              <TabsContent value="active" className="mt-3">
                <DataTable rows={ROWS.filter((r) => r.status === "Active")} />
              </TabsContent>
              <TabsContent value="trial" className="mt-3">
                <DataTable rows={ROWS.filter((r) => r.status === "Trial")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* button gallery */}
      <Card>
        <CardHeader>
          <CardTitle style={headingStyle}>Components</CardTitle>
          <CardDescription>Every control inherits the active theme.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Separator className="mx-1 hidden h-6 sm:block" style={{ width: 1 }} />
          <Badge>New</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">v2.0</Badge>
          <Badge variant="destructive">Deprecated</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

/* Inline SVG bar chart — themed via currentColor / css vars */
function BarChart() {
  const max = Math.max(...CHART)
  const w = 520
  const h = 180
  const pad = 24
  const barW = (w - pad * 2) / CHART.length - 8
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label="Revenue bar chart"
        style={{ maxWidth: "100%" }}
      >
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={pad}
            x2={w - pad}
            y1={h - pad - (h - pad * 2) * g}
            y2={h - pad - (h - pad * 2) * g}
            stroke="var(--color-border)"
            strokeWidth={1}
          />
        ))}
        {CHART.map((v, i) => {
          const bh = ((h - pad * 2) * v) / max
          const x = pad + i * ((w - pad * 2) / CHART.length) + 4
          const y = h - pad - bh
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={bh}
                rx={4}
                fill="var(--color-primary)"
                opacity={i === CHART.length - 1 ? 1 : 0.85}
              />
              <text
                x={x + barW / 2}
                y={h - pad + 12}
                textAnchor="middle"
                fontSize={9}
                fill="var(--color-muted-foreground)"
              >
                {MONTHS[i]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function DataTable({ rows }: { rows: typeof ROWS }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ color: "var(--color-muted-foreground)" }}>
            <th className="py-2 pr-3 text-left font-medium">Customer</th>
            <th className="py-2 pr-3 text-left font-medium">Plan</th>
            <th className="py-2 pr-3 text-left font-medium">Status</th>
            <th className="py-2 text-right font-medium">MRR</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.email} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td className="py-2.5 pr-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback>{r.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-2.5 pr-3">{r.plan}</td>
              <td className="py-2.5 pr-3">
                <Badge
                  variant={
                    r.status === "Active" ? "default" : r.status === "Past due" ? "destructive" : "secondary"
                  }
                >
                  {r.status}
                </Badge>
              </td>
              <td className="py-2.5 text-right font-medium">{r.amount}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="py-6 text-center text-sm text-muted-foreground">
                No customers in this view.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
