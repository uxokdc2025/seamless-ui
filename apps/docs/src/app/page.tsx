"use client"

import { DocsShell } from "../components/docs-shell"
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@seamless/ui"
import { Container, Stack, Grid } from "@seamless/layout"
import { ArrowRight, Zap, Palette, Box, Code, Blocks, Github } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Production Ready",
      description: "47 fully accessible components built with Radix UI and styled with Tailwind CSS.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Themeable",
      description: "8 built-in themes with live preview. Create custom themes with the Theme Studio.",
    },
    {
      icon: <Box className="h-6 w-6" />,
      title: "Modular Architecture",
      description: "Install only what you need. Each component is independently installable via CLI.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "TypeScript First",
      description: "Fully typed components with comprehensive IntelliSense support.",
    },
    {
      icon: <Blocks className="h-6 w-6" />,
      title: "Pre-built Patterns",
      description: "12 design patterns for common UI challenges: forms, data tables, modals, and more.",
    },
    {
      icon: <Github className="h-6 w-6" />,
      title: "Open Source",
      description: "MIT licensed. Use freely in commercial and personal projects.",
    },
  ]

  const stats = [
    { label: "Components", value: "47" },
    { label: "Themes", value: "8" },
    { label: "Patterns", value: "12" },
  ]

  return (
    <DocsShell title="Documentation">
      <div className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
          <Container>
            <Stack gap="xl" className="items-center text-center max-w-3xl mx-auto">
              <Badge variant="outline" className="gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v0.1.0 — Now in Beta
              </Badge>

              <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Build beautiful UIs, faster
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl">
                A comprehensive design system platform with production-ready components, themes, and blocks.
                Built with React, TypeScript, and Tailwind CSS.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/getting-started">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href="/components">
                  <Button size="lg" variant="outline">
                    Browse Components
                  </Button>
                </a>
                <a href="https://github.com/seamless-ui" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Github className="h-5 w-5" />
                    GitHub
                  </Button>
                </a>
              </div>

              <div className="flex gap-8 pt-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* Features */}
        <section className="py-20">
          <Container>
            <Stack gap="xl">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
                <p className="text-lg text-muted-foreground">
                  A complete design system platform with all the building blocks for modern web applications.
                </p>
              </div>

              <Grid cols={3} gap="lg" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mb-3 text-primary">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Quick Start */}
        <section className="py-20 bg-muted/20 border-y border-border">
          <Container>
            <Stack gap="xl">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
                <p className="text-lg text-muted-foreground">
                  Get up and running in minutes with our CLI tool.
                </p>
              </div>

              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Install a component</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <div className="bg-muted rounded-md p-4 font-mono text-sm">
                      <div className="text-muted-foreground"># Install the button component</div>
                      <div className="mt-1">pnpm dlx shadcn@latest add @seamless/ui/button</div>
                    </div>
                    <div className="bg-muted rounded-md p-4 font-mono text-sm">
                      <div className="text-muted-foreground"># Use in your app</div>
                      <div className="mt-1">{"import { Button } from '@/components/ui/button'"}</div>
                      <div className="mt-2">{"<Button>Click me</Button>"}</div>
                    </div>
                  </Stack>
                </CardContent>
              </Card>

              <div className="text-center">
                <a href="/getting-started">
                  <Button variant="outline" className="gap-2">
                    Read the full guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Stack>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20">
          <Container>
            <Card className="bg-primary text-primary-foreground border-primary">
              <CardContent className="py-12">
                <Stack gap="lg" className="items-center text-center">
                  <h2 className="text-3xl font-bold">Ready to build?</h2>
                  <p className="text-lg opacity-90 max-w-2xl">
                    Start building beautiful, accessible UIs today with Seamless UI.
                  </p>
                  <div className="flex gap-4">
                    <a href="/getting-started">
                      <Button size="lg" variant="secondary">
                        Get Started
                      </Button>
                    </a>
                    <a href="/components">
                      <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                        Browse Components
                      </Button>
                    </a>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </section>
      </div>
    </DocsShell>
  )
}
