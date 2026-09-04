"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@seamless/ui"

export default function FoundationsPage() {
  const colorScales = [
    { name: "Primary", description: "Main brand color and interactive elements" },
    { name: "Secondary", description: "Supporting brand colors" },
    { name: "Accent", description: "Highlight and call-to-action colors" },
    { name: "Neutral", description: "Backgrounds, borders, and text" },
    { name: "Success", description: "Positive feedback and confirmations" },
    { name: "Warning", description: "Cautions and warnings" },
    { name: "Destructive", description: "Errors and destructive actions" },
  ]

  const typography = [
    { name: "Display", size: "4rem (64px)", weight: "700", usage: "Hero sections" },
    { name: "Heading 1", size: "3rem (48px)", weight: "700", usage: "Page titles" },
    { name: "Heading 2", size: "2rem (32px)", weight: "600", usage: "Section titles" },
    { name: "Heading 3", size: "1.5rem (24px)", weight: "600", usage: "Subsections" },
    { name: "Body Large", size: "1.125rem (18px)", weight: "400", usage: "Large paragraphs" },
    { name: "Body", size: "1rem (16px)", weight: "400", usage: "Default text" },
    { name: "Body Small", size: "0.875rem (14px)", weight: "400", usage: "Supporting text" },
    { name: "Caption", size: "0.75rem (12px)", weight: "400", usage: "Labels and captions" },
  ]

  const spacing = [
    { token: "--space-xs", value: "0.25rem (4px)", usage: "Tight spacing" },
    { token: "--space-sm", value: "0.5rem (8px)", usage: "Small gaps" },
    { token: "--space-md", value: "1rem (16px)", usage: "Default spacing" },
    { token: "--space-lg", value: "1.5rem (24px)", usage: "Large gaps" },
    { token: "--space-xl", value: "2rem (32px)", usage: "Section spacing" },
    { token: "--space-2xl", value: "3rem (48px)", usage: "Major sections" },
  ]

  const radius = [
    { token: "--radius-sm", value: "0.25rem (4px)", usage: "Small elements" },
    { token: "--radius-md", value: "0.5rem (8px)", usage: "Default radius" },
    { token: "--radius-lg", value: "0.75rem (12px)", usage: "Cards and panels" },
    { token: "--radius-xl", value: "1rem (16px)", usage: "Large containers" },
    { token: "--radius-full", value: "9999px", usage: "Pills and badges" },
  ]

  return (
    <DocsShell title="Foundations">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Foundations</h1>
            <p className="text-lg text-muted-foreground">
              Design tokens and foundational principles that power the Seamless UI design system.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-6">Color System</h2>
            <Grid cols={3} gap="md" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {colorScales.map((scale) => (
                <Card key={scale.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{scale.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{scale.description}</p>
                    <div className="space-y-2">
                      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                        <div key={shade} className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded border border-border"
                            style={{ 
                              backgroundColor: `var(--${scale.name.toLowerCase()}-${shade})` 
                            }}
                          />
                          <span className="text-xs font-mono">{shade}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Typography</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {typography.map((type) => (
                    <div key={type.name} className="border-b border-border pb-4 last:border-0">
                      <div className="grid md:grid-cols-4 gap-4 items-baseline">
                        <div className="md:col-span-1">
                          <div className="font-semibold">{type.name}</div>
                          <div className="text-sm text-muted-foreground">{type.size}</div>
                        </div>
                        <div 
                          className="md:col-span-2"
                          style={{ 
                            fontSize: type.size.split(" ")[0],
                            fontWeight: type.weight
                          }}
                        >
                          The quick brown fox jumps
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {type.usage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Spacing Scale</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {spacing.map((space) => (
                    <div key={space.token} className="flex items-center gap-6">
                      <code className="text-sm font-mono w-32">{space.token}</code>
                      <div 
                        className="h-8 bg-primary rounded"
                        style={{ width: space.value.split(" ")[0] }}
                      />
                      <span className="text-sm text-muted-foreground">{space.value}</span>
                      <span className="text-sm text-muted-foreground ml-auto">{space.usage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Border Radius</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {radius.map((r) => (
                    <div key={r.token} className="flex items-center gap-6">
                      <code className="text-sm font-mono w-32">{r.token}</code>
                      <div 
                        className="w-16 h-16 bg-primary"
                        style={{ borderRadius: r.value.split(" ")[0] }}
                      />
                      <span className="text-sm text-muted-foreground">{r.value}</span>
                      <span className="text-sm text-muted-foreground ml-auto">{r.usage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Design Tokens</h2>
            <Card>
              <CardContent className="pt-6">
                <Stack gap="md">
                  <p className="text-muted-foreground">
                    All design tokens are CSS custom properties that can be customized per theme.
                    Tokens are organized into semantic categories for easy maintenance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--color-*</code>
                      <span className="text-sm text-muted-foreground">Color tokens</span>
                    </div>
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--space-*</code>
                      <span className="text-sm text-muted-foreground">Spacing tokens</span>
                    </div>
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--radius-*</code>
                      <span className="text-sm text-muted-foreground">Border radius tokens</span>
                    </div>
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--font-*</code>
                      <span className="text-sm text-muted-foreground">Typography tokens</span>
                    </div>
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--shadow-*</code>
                      <span className="text-sm text-muted-foreground">Shadow tokens</span>
                    </div>
                    <div className="flex gap-3">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">--motion-*</code>
                      <span className="text-sm text-muted-foreground">Animation tokens</span>
                    </div>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </section>
        </Stack>
      </Container>
    </DocsShell>
  )
}
