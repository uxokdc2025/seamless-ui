"use client"

import { useState } from "react"
import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Slider } from "@seamless/ui"
import { applyTheme, themes, type Theme } from "@seamless/themes"
import { Download, Copy, Check } from "lucide-react"

export default function ThemeStudioPage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight-aubergine")
  const [copied, setCopied] = useState(false)

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme({ theme, mode: "dark" })
  }

  const copyThemeConfig = () => {
    const config = `// Theme configuration
import { applyTheme } from "@seamless/themes"

applyTheme({ 
  theme: "${currentTheme}", 
  mode: "dark" 
})`
    navigator.clipboard.writeText(config)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tokenCategories = [
    {
      name: "Colors",
      tokens: [
        { name: "--primary", value: "hsl(var(--primary))" },
        { name: "--secondary", value: "hsl(var(--secondary))" },
        { name: "--accent", value: "hsl(var(--accent))" },
        { name: "--background", value: "hsl(var(--background))" },
        { name: "--foreground", value: "hsl(var(--foreground))" },
        { name: "--muted", value: "hsl(var(--muted))" },
        { name: "--border", value: "hsl(var(--border))" },
      ]
    },
    {
      name: "Typography",
      tokens: [
        { name: "--font-sans", value: "system-ui, sans-serif" },
        { name: "--font-mono", value: "monospace" },
      ]
    },
    {
      name: "Spacing",
      tokens: [
        { name: "--space-xs", value: "0.25rem" },
        { name: "--space-sm", value: "0.5rem" },
        { name: "--space-md", value: "1rem" },
        { name: "--space-lg", value: "1.5rem" },
        { name: "--space-xl", value: "2rem" },
      ]
    },
    {
      name: "Radius",
      tokens: [
        { name: "--radius-sm", value: "0.25rem" },
        { name: "--radius-md", value: "0.5rem" },
        { name: "--radius-lg", value: "0.75rem" },
      ]
    }
  ]

  return (
    <DocsShell title="Theme Studio">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Theme Studio</h1>
            <p className="text-lg text-muted-foreground">
              Live theme editor for customizing design tokens. Preview changes in real-time and export your custom theme.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <Select value={currentTheme} onValueChange={handleThemeChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme}>
                            {theme.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2" onClick={copyThemeConfig}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Config"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="lg">
                    {tokenCategories.map(category => (
                      <div key={category.name}>
                        <h3 className="font-semibold mb-3 text-sm">{category.name}</h3>
                        <Stack gap="sm">
                          {category.tokens.map(token => (
                            <div key={token.name} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-mono">{token.name}</label>
                                {category.name === "Colors" && (
                                  <div 
                                    className="w-6 h-6 rounded border border-border"
                                    style={{ backgroundColor: token.value }}
                                  />
                                )}
                              </div>
                              <Input 
                                defaultValue={token.value}
                                className="text-xs font-mono"
                                disabled
                              />
                            </div>
                          ))}
                        </Stack>
                      </div>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="lg">
                    {/* Preview Components */}
                    <div>
                      <h3 className="font-semibold mb-3">Buttons</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button>Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Form Controls</h3>
                      <Stack gap="md">
                        <Input placeholder="Text input" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Option 1</SelectItem>
                            <SelectItem value="2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </Stack>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Cards</h3>
                      <Grid cols={2} gap="md">
                        <Card>
                          <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Card content with muted text
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Another Card</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              More card content
                            </p>
                          </CardContent>
                        </Card>
                      </Grid>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Typography</h3>
                      <Stack gap="sm">
                        <h1 className="text-4xl font-bold">Heading 1</h1>
                        <h2 className="text-3xl font-bold">Heading 2</h2>
                        <h3 className="text-2xl font-semibold">Heading 3</h3>
                        <p className="text-base">Body text with default styling</p>
                        <p className="text-sm text-muted-foreground">Small muted text</p>
                      </Stack>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  Export your custom theme as a CSS file or JavaScript configuration.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download CSS
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download JSON
                  </Button>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </DocsShell>
  )
}
