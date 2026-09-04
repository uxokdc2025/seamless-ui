"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Button } from "@seamless/ui"
import { ArrowRight, Package, Terminal, Palette, Code } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <DocsShell title="Getting Started">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Getting Started</h1>
            <p className="text-lg text-muted-foreground">
              Learn how to install and use Seamless UI in your React application.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="h-6 w-6 text-primary" />
                <CardTitle>Installation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <h3 className="text-sm font-semibold mb-2">1. Create a new Next.js project</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">npx create-next-app@latest my-app --typescript --tailwind</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">2. Install the Seamless UI CLI</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">pnpm add -D @seamless/cli</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">3. Initialize Seamless UI</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">pnpm seamless init</code>
                  </pre>
                  <p className="text-sm text-muted-foreground mt-2">
                    This will configure your project with the necessary dependencies and setup files.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">4. Install your first component</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">pnpm dlx shadcn@latest add @seamless/ui/button</code>
                  </pre>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Code className="h-6 w-6 text-primary" />
                <CardTitle>Usage</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <h3 className="text-sm font-semibold mb-2">Import and use components</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">{`import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}`}</code>
                  </pre>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Palette className="h-6 w-6 text-primary" />
                <CardTitle>Theming</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  Seamless UI comes with 8 built-in themes. You can apply them globally or create custom themes.
                </p>
                <div>
                  <h3 className="text-sm font-semibold mb-2">Apply a theme</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">{`import { applyTheme } from "@seamless/themes"

applyTheme({ 
  theme: "midnight-aubergine", 
  mode: "dark" 
})`}</code>
                  </pre>
                </div>
                <a href="/theme-studio">
                  <Button variant="outline" className="gap-2">
                    Open Theme Studio
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-6 w-6 text-primary" />
                <CardTitle>Package Structure</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/ui</code>
                  <span className="text-sm text-muted-foreground">28 core UI components</span>
                </div>
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/layout</code>
                  <span className="text-sm text-muted-foreground">Layout primitives (Container, Grid, Stack)</span>
                </div>
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/saas</code>
                  <span className="text-sm text-muted-foreground">SaaS components (AppShell, Sidebar)</span>
                </div>
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/ai</code>
                  <span className="text-sm text-muted-foreground">AI-specific components</span>
                </div>
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/blocks</code>
                  <span className="text-sm text-muted-foreground">10 pre-built composition blocks</span>
                </div>
                <div className="flex gap-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/themes</code>
                  <span className="text-sm text-muted-foreground">Theming system with 5 presets</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <a href="/components">
              <Button className="gap-2">
                Browse Components
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="/foundations">
              <Button variant="outline">Learn Foundations</Button>
            </a>
          </div>
        </Stack>
      </Container>
    </DocsShell>
  )
}
