"use client"

import { useState } from "react"
import { AppShell } from "@seamless/saas" 
import { Button, Card, CardHeader, CardTitle, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@seamless/ui"
import { Container, Grid, Stack } from "@seamless/layout"
import { AgentCard } from "@seamless/ai"
import { Dashboard01 } from "@seamless/blocks"
import { applyTheme, themes, modes, type Theme, type Mode } from "@seamless/themes"

const navigation = [
  { name: "Getting Started", href: "/getting-started" },
  { name: "Foundations", href: "/foundations" },
  { name: "Components", href: "/components", active: true },
  { name: "Layout", href: "/layout" },
  { name: "SaaS", href: "/saas" },
  { name: "AI", href: "/ai" },
  { name: "Patterns", href: "/patterns" },
  { name: "Blocks", href: "/blocks" },
  { name: "Themes", href: "/themes" },
  { name: "Theme Studio", href: "/theme-studio" },
  { name: "Registry", href: "/registry" },
]

export default function HomePage() {
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
      <h1 className="text-xl font-semibold">Components</h1>
      <div className="flex items-center gap-4">
        <Select value={currentTheme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1).replace("-", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={currentMode} onValueChange={handleModeChange}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {modes.map((mode) => (
              <SelectItem key={mode} value={mode}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  return (
    <AppShell sidebar={sidebar} header={header}>
      <Container>
        <Stack gap="xl">
          <div>
            <h2 className="text-3xl font-bold mb-2">Components</h2>
            <p className="text-muted-foreground">
              Live preview of migrated primitives with theme switching
            </p>
          </div>

          {/* Button Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          {/* Layout Example */}
          <Card>
            <CardHeader>
              <CardTitle>Layout Primitives</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={3} gap="md">
                <div className="bg-muted p-4 rounded">Grid Item 1</div>
                <div className="bg-muted p-4 rounded">Grid Item 2</div>
                <div className="bg-muted p-4 rounded">Grid Item 3</div>
              </Grid>
            </CardContent>
          </Card>

          {/* AI Component Example */}
          <Card>
            <CardHeader>
              <CardTitle>AI Components</CardTitle>
            </CardHeader>
            <CardContent>
              <Grid cols={2} gap="md">
                <AgentCard
                  name="Claude Assistant"
                  status="active"
                  description="Natural language AI assistant"
                  metrics={{ tasks: 42, uptime: "99.9%" }}
                />
                <AgentCard
                  name="Code Generator" 
                  status="idle"
                  description="Automated code generation agent"
                  metrics={{ tasks: 12, uptime: "98.2%" }}
                />
              </Grid>
            </CardContent>
          </Card>

          {/* Block Example */}
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Block</CardTitle>
            </CardHeader>
            <CardContent>
              <Dashboard01
                title="Analytics Dashboard"
                stats={[
                  { label: "Users", value: "1,234", change: "+12%" },
                  { label: "Revenue", value: "$56,789", change: "+8%" },
                  { label: "Orders", value: "890", change: "+15%" },
                  { label: "Conversion", value: "3.2%", change: "-2%" },
                ]}
                actions={[
                  { label: "Export", onClick: () => alert("Export") },
                  { label: "Refresh", onClick: () => alert("Refresh") },
                ]}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </AppShell>
  )
}