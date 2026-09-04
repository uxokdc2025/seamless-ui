"use client"

import { useState } from "react"
import { AppShell } from "@seamless/saas"
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@seamless/ui"
import { Container, Stack, Grid } from "@seamless/layout"
import { applyTheme, themes, modes, type Theme, type Mode } from "@seamless/themes"
import { 
  spacing, 
  fontSizes, 
  fontWeights, 
  radii, 
  shadows,
  chartColors,
  statusColors,
  typography
} from "@seamless/tokens/tokens"

const navigation = [
  { name: "Getting Started", href: "/getting-started" },
  { name: "Foundations", href: "/foundations", active: true },
  { name: "Components", href: "/" },
  { name: "Layout", href: "/layout" },
  { name: "SaaS", href: "/saas" },
  { name: "AI", href: "/ai" },
  { name: "Patterns", href: "/patterns" },
  { name: "Blocks", href: "/blocks" },
  { name: "Themes", href: "/themes" },
]

export default function FoundationsPage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight-aubergine")
  const [currentMode, setCurrentMode] = useState<Mode>("dark")

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme({ theme, mode: currentMode })
  }

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode)
    applyTheme({ theme: currentTheme, mode })
  }

  const sidebar = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Seamless UI</h2>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm ${
                item.active 
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )

  const header = (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Foundations</h1>
      <div className="flex items-center gap-4">
        <select 
          value={currentTheme} 
          onChange={(e) => handleThemeChange(e.target.value as Theme)}
          className="px-3 py-2 rounded-md bg-surface border border-border text-foreground"
        >
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1).replace(/-/g, " ")}
            </option>
          ))}
        </select>
        <select 
          value={currentMode} 
          onChange={(e) => handleModeChange(e.target.value as Mode)}
          className="px-3 py-2 rounded-md bg-surface border border-border text-foreground"
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <AppShell sidebar={sidebar} header={header}>
      <Container>
        <Stack gap="xl">
          {/* Header */}
          <div>
            <h2 className="text-4xl font-bold mb-2">Design Foundations</h2>
            <p className="text-muted-foreground text-lg">
              Complete design token system with colors, typography, spacing, motion, and more
            </p>
          </div>

          {/* Color Primitives */}
          <Card>
            <CardHeader>
              <CardTitle>Color Primitives</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <div>
                  <h3 className="font-semibold mb-3">Base Colors</h3>
                  <Grid cols={4} gap="md">
                    <ColorSwatch label="Background" var="--color-background" />
                    <ColorSwatch label="Foreground" var="--color-foreground" />
                    <ColorSwatch label="Surface" var="--color-surface" />
                    <ColorSwatch label="Surface Raised" var="--color-surface-raised" />
                    <ColorSwatch label="Overlay" var="--color-overlay" />
                    <ColorSwatch label="Muted" var="--color-muted" />
                    <ColorSwatch label="Muted FG" var="--color-muted-foreground" />
                  </Grid>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Semantic Colors</h3>
                  <Grid cols={4} gap="md">
                    <ColorSwatch label="Primary" var="--color-primary" />
                    <ColorSwatch label="Secondary" var="--color-secondary" />
                    <ColorSwatch label="Accent" var="--color-accent" />
                  </Grid>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Status Colors</h3>
                  <Grid cols={4} gap="md">
                    <ColorSwatch label="Success" var="--color-success" />
                    <ColorSwatch label="Warning" var="--color-warning" />
                    <ColorSwatch label="Error" var="--color-error" />
                    <ColorSwatch label="Info" var="--color-info" />
                  </Grid>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Interactive States</h3>
                  <Grid cols={4} gap="md">
                    <ColorSwatch label="Hover" var="--color-hover" />
                    <ColorSwatch label="Active" var="--color-active" />
                    <ColorSwatch label="Selected" var="--color-selected" />
                    <ColorSwatch label="Disabled" var="--color-disabled" />
                  </Grid>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Borders</h3>
                  <Grid cols={4} gap="md">
                    <ColorSwatch label="Border" var="--color-border" />
                    <ColorSwatch label="Border Subtle" var="--color-border-subtle" />
                    <ColorSwatch label="Border Strong" var="--color-border-strong" />
                  </Grid>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Data Visualization Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Data Visualization Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={8} gap="md">
                {chartColors.map((color, i) => (
                  <ColorSwatch key={i} label={`Chart ${i + 1}`} var={`--color-chart-${i + 1}`} />
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <div>
                  <h3 className="font-semibold mb-3">Font Families</h3>
                  <div className="space-y-2">
                    <div style={{ fontFamily: 'var(--font-sans)' }}>
                      Sans-serif: The quick brown fox jumps over the lazy dog
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)' }}>
                      Serif: The quick brown fox jumps over the lazy dog
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)' }}>
                      Monospace: The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Type Scale</h3>
                  <div className="space-y-4">
                    <div style={{ fontSize: 'var(--font-size-6xl)', lineHeight: 'var(--line-height-tight)' }}>
                      6XL Display — 60px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-5xl)', lineHeight: 'var(--line-height-tight)' }}>
                      5XL Display — 48px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-4xl)', lineHeight: 'var(--line-height-tight)' }}>
                      4XL Heading — 36px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-3xl)', lineHeight: 'var(--line-height-tight)' }}>
                      3XL Heading — 30px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-2xl)', lineHeight: 'var(--line-height-snug)' }}>
                      2XL Heading — 24px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xl)', lineHeight: 'var(--line-height-snug)' }}>
                      XL Heading — 20px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-normal)' }}>
                      Large — 18px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-normal)' }}>
                      Base Body — 16px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)' }}>
                      Small Label — 14px
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-normal)' }}>
                      Extra Small Caption — 12px
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Font Weights</h3>
                  <Grid cols={3} gap="md">
                    <div style={{ fontWeight: 300 }}>Light (300)</div>
                    <div style={{ fontWeight: 400 }}>Normal (400)</div>
                    <div style={{ fontWeight: 500 }}>Medium (500)</div>
                    <div style={{ fontWeight: 600 }}>Semibold (600)</div>
                    <div style={{ fontWeight: 700 }}>Bold (700)</div>
                    <div style={{ fontWeight: 800 }}>Extrabold (800)</div>
                  </Grid>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Typography Presets</h3>
                  <div className="space-y-4">
                    <div>
                      <Badge>Display</Badge>
                      <div style={{ 
                        fontSize: 'var(--text-display-size)',
                        fontWeight: 'var(--text-display-weight)',
                        lineHeight: 'var(--text-display-line-height)',
                        letterSpacing: 'var(--text-display-letter-spacing)'
                      }}>
                        Display Text
                      </div>
                    </div>
                    <div>
                      <Badge>Heading</Badge>
                      <div style={{ 
                        fontSize: 'var(--text-heading-size)',
                        fontWeight: 'var(--text-heading-weight)',
                        lineHeight: 'var(--text-heading-line-height)',
                        letterSpacing: 'var(--text-heading-letter-spacing)'
                      }}>
                        Heading Text
                      </div>
                    </div>
                    <div>
                      <Badge>Body</Badge>
                      <div style={{ 
                        fontSize: 'var(--text-body-size)',
                        fontWeight: 'var(--text-body-weight)',
                        lineHeight: 'var(--text-body-line-height)',
                        letterSpacing: 'var(--text-body-letter-spacing)'
                      }}>
                        Body text with normal line height and spacing for comfortable reading.
                      </div>
                    </div>
                    <div>
                      <Badge>Label</Badge>
                      <div style={{ 
                        fontSize: 'var(--text-label-size)',
                        fontWeight: 'var(--text-label-weight)',
                        lineHeight: 'var(--text-label-line-height)',
                        letterSpacing: 'var(--text-label-letter-spacing)'
                      }}>
                        LABEL TEXT
                      </div>
                    </div>
                    <div>
                      <Badge>Caption</Badge>
                      <div style={{ 
                        fontSize: 'var(--text-caption-size)',
                        fontWeight: 'var(--text-caption-weight)',
                        lineHeight: 'var(--text-caption-line-height)',
                        letterSpacing: 'var(--text-caption-letter-spacing)'
                      }}>
                        Caption text for small annotations
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Spacing */}
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <h3 className="font-semibold mb-3">Base Scale</h3>
                  <div className="space-y-2">
                    {Object.entries(spacing).slice(0, 20).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-4">
                        <code className="text-xs w-16">{key}</code>
                        <code className="text-xs w-24 text-muted-foreground">{value}</code>
                        <div 
                          className="h-6 bg-primary" 
                          style={{ width: value }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Semantic Spacing</h3>
                  <div className="space-y-2">
                    {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].map((size) => (
                      <div key={size} className="flex items-center gap-4">
                        <code className="text-xs w-16">{size}</code>
                        <div 
                          className="h-8 bg-accent" 
                          style={{ width: `var(--spacing-${size})` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Border Radius */}
          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={4} gap="lg">
                {Object.entries(radii).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div 
                      className="w-24 h-24 mx-auto mb-2 bg-primary"
                      style={{ borderRadius: value }}
                    />
                    <div className="font-medium">{key}</div>
                    <code className="text-xs text-muted-foreground">{value}</code>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Elevation/Shadows */}
          <Card>
            <CardHeader>
              <CardTitle>Elevation & Shadows</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={3} gap="lg">
                {Object.entries(shadows).filter(([key]) => key !== 'inner' && key !== 'none').map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div 
                      className="w-32 h-32 mx-auto mb-2 bg-surface flex items-center justify-center rounded-lg"
                      style={{ boxShadow: value }}
                    >
                      <span className="font-medium">{key}</span>
                    </div>
                    <code className="text-xs text-muted-foreground">shadow-{key}</code>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Motion/Transitions */}
          <Card>
            <CardHeader>
              <CardTitle>Motion & Transitions</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="lg">
                <div>
                  <h3 className="font-semibold mb-3">Duration Scale</h3>
                  <div className="space-y-2">
                    {['instant', 'fast', 'normal', 'slow', 'slower', 'slowest'].map((duration) => (
                      <div key={duration} className="flex items-center gap-4">
                        <code className="text-xs w-24">{duration}</code>
                        <code className="text-xs text-muted-foreground w-16">
                          {duration === 'instant' ? '0ms' : 
                           duration === 'fast' ? '100ms' :
                           duration === 'normal' ? '200ms' :
                           duration === 'slow' ? '300ms' :
                           duration === 'slower' ? '500ms' : '700ms'}
                        </code>
                        <Button 
                          size="sm"
                          className="transition-all"
                          style={{ 
                            transitionDuration: `var(--duration-${duration})`,
                            transitionProperty: 'transform'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(20px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)'
                          }}
                        >
                          Hover me
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Easing Functions</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'linear', value: 'linear' },
                      { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
                      { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
                      { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
                      { name: 'spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
                    ].map(({ name, value }) => (
                      <div key={name} className="flex items-center gap-4">
                        <code className="text-xs w-32">{name}</code>
                        <Button 
                          size="sm"
                          className="transition-all"
                          style={{ 
                            transitionDuration: '500ms',
                            transitionTimingFunction: value,
                            transitionProperty: 'transform'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(40px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)'
                          }}
                        >
                          Hover me
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Focus States */}
          <Card>
            <CardHeader>
              <CardTitle>Focus States</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-muted-foreground">
                  Keyboard navigation focus indicators (press Tab to see)
                </p>
                <div className="flex gap-4">
                  <Button>Focusable Button</Button>
                  <input 
                    type="text" 
                    placeholder="Focusable input"
                    className="px-3 py-2 rounded-md bg-input border border-input-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                  />
                  <a 
                    href="#" 
                    className="px-3 py-2 rounded-md bg-surface text-foreground inline-block"
                  >
                    Focusable Link
                  </a>
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Z-Index */}
          <Card>
            <CardHeader>
              <CardTitle>Z-Index Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'base', value: 0 },
                  { name: 'dropdown', value: 1000 },
                  { name: 'sticky', value: 1100 },
                  { name: 'fixed', value: 1200 },
                  { name: 'modal-backdrop', value: 1300 },
                  { name: 'modal', value: 1400 },
                  { name: 'popover', value: 1500 },
                  { name: 'tooltip', value: 1600 },
                  { name: 'toast', value: 1700 },
                  { name: 'max', value: 9999 },
                ].map(({ name, value }) => (
                  <div key={name} className="flex items-center justify-between p-2 bg-muted rounded">
                    <code className="text-sm">--z-{name}</code>
                    <code className="text-sm text-muted-foreground">{value}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <h3 className="font-semibold mb-2">Reduced Motion</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    All animations and transitions respect <code>prefers-reduced-motion</code> media query.
                    Users who prefer reduced motion will experience instant state changes.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    @media (prefers-reduced-motion: reduce)
                  </code>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">High Contrast</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Border and contrast values are enhanced for users who prefer high contrast.
                  </p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    @media (prefers-contrast: high)
                  </code>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Focus Visible</h3>
                  <p className="text-muted-foreground text-sm">
                    Focus indicators only appear for keyboard navigation, not mouse clicks.
                  </p>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </AppShell>
  )
}

function ColorSwatch({ label, var: cssVar }: { label: string; var: string }) {
  const [color, setColor] = useState('')
  
  useState(() => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.documentElement)
      setColor(style.getPropertyValue(cssVar))
    }
  })

  return (
    <div className="text-center">
      <div 
        className="w-full h-20 rounded-lg border border-border mb-2"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="text-xs font-medium mb-1">{label}</div>
      <code className="text-xs text-muted-foreground">{cssVar}</code>
    </div>
  )
}
