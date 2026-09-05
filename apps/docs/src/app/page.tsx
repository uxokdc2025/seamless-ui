"use client"

import { DocsShell } from "../components/docs-shell"
import { Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@seamless/ui"
import { Container, Stack, Grid } from "@seamless/layout"
import { ArrowRight, Zap, Palette, Box, Code, Blocks, Github } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: <Zap style={{ width: '24px', height: '24px' }} />,
      title: "Production Ready",
      description: "47 fully accessible UI components built with Radix UI and styled with design system tokens.",
    },
    {
      icon: <Palette style={{ width: '24px', height: '24px' }} />,
      title: "Themeable",
      description: "8 built-in themes with live preview. Full light and dark mode support for every theme.",
    },
    {
      icon: <Box style={{ width: '24px', height: '24px' }} />,
      title: "Modular Architecture",
      description: "Install only what you need. Each component is independently installable via CLI.",
    },
    {
      icon: <Code style={{ width: '24px', height: '24px' }} />,
      title: "TypeScript First",
      description: "Fully typed components with comprehensive IntelliSense support.",
    },
    {
      icon: <Blocks style={{ width: '24px', height: '24px' }} />,
      title: "Pre-built Blocks",
      description: "10 production-ready blocks for common patterns: dashboards, forms, auth, and more.",
    },
    {
      icon: <Github style={{ width: '24px', height: '24px' }} />,
      title: "Open Source",
      description: "MIT licensed. Use freely in commercial and personal projects.",
    },
  ]

  const stats = [
    { label: "Components", value: "47" },
    { label: "Themes", value: "8" },
    { label: "Blocks", value: "10" },
  ]

  return (
    <DocsShell title="Seamless UI">
      <div style={{ margin: '-32px', marginTop: '-32px' }}>
        {/* Hero */}
        <section style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid hsl(var(--color-border))',
          background: 'linear-gradient(to bottom, hsl(var(--color-background)), hsl(var(--color-muted) / 0.2))',
          padding: '120px 32px'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <Stack gap="xl">
              <Badge variant="outline" style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}>
                <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                  <span style={{
                    position: 'absolute',
                    display: 'inline-flex',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'hsl(var(--color-primary))',
                    opacity: 0.75,
                    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}></span>
                  <span style={{
                    position: 'relative',
                    display: 'inline-flex',
                    borderRadius: '50%',
                    width: '8px',
                    height: '8px',
                    background: 'hsl(var(--color-primary))'
                  }}></span>
                </span>
                v0.1.0 — Now in Beta
              </Badge>

              <h1 style={{
                fontSize: '72px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                background: 'linear-gradient(to right, hsl(var(--color-foreground)), hsl(var(--color-foreground) / 0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Build beautiful UIs, faster
              </h1>

              <p style={{
                fontSize: '20px',
                color: 'hsl(var(--color-muted-foreground))',
                lineHeight: 1.6,
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                A comprehensive design system with production-ready components, themes, and blocks.
                Built with React, TypeScript, and Radix UI.
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                marginTop: '16px'
              }}>
                <Link href="/getting-started">
                  <Button size="lg" style={{ gap: '8px' }}>
                    Get Started
                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </Button>
                </Link>
                <Link href="/components">
                  <Button size="lg" variant="outline">
                    Browse Components
                  </Button>
                </Link>
                <a href="https://github.com/seamless-ui" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" style={{ gap: '8px' }}>
                    <Github style={{ width: '20px', height: '20px' }} />
                    GitHub
                  </Button>
                </a>
              </div>

              <div style={{
                display: 'flex',
                gap: '48px',
                justifyContent: 'center',
                paddingTop: '32px'
              }}>
                {stats.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', fontWeight: 700 }}>{stat.value}</div>
                    <div style={{ fontSize: '14px', color: 'hsl(var(--color-muted-foreground))' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Stack gap="xl">
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Everything you need
                </h2>
                <p style={{ fontSize: '18px', color: 'hsl(var(--color-muted-foreground))', lineHeight: 1.6 }}>
                  A complete design system platform with all the building blocks for modern web applications.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {features.map((feature, idx) => (
                  <Card 
                    key={idx} 
                    style={{ 
                      transition: 'box-shadow 0.2s ease',
                      cursor: 'default'
                    }}
                  >
                    <CardHeader>
                      <div style={{ marginBottom: '12px', color: 'hsl(var(--color-primary))' }}>
                        {feature.icon}
                      </div>
                      <CardTitle style={{ fontSize: '20px' }}>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p style={{ color: 'hsl(var(--color-muted-foreground))', lineHeight: 1.6 }}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stack>
          </div>
        </section>

        {/* Quick Start */}
        <section style={{
          padding: '80px 32px',
          background: 'hsl(var(--color-muted) / 0.2)',
          borderTop: '1px solid hsl(var(--color-border))',
          borderBottom: '1px solid hsl(var(--color-border))'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Stack gap="xl">
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Quick Start
                </h2>
                <p style={{ fontSize: '18px', color: 'hsl(var(--color-muted-foreground))', lineHeight: 1.6 }}>
                  Get up and running in minutes with our CLI tool.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Install a component</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <div style={{
                      background: 'hsl(var(--color-muted))',
                      borderRadius: '6px',
                      padding: '16px',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '14px'
                    }}>
                      <div style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                        # Install the button component
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        pnpm dlx shadcn@latest add @seamless/ui/button
                      </div>
                    </div>
                    <div style={{
                      background: 'hsl(var(--color-muted))',
                      borderRadius: '6px',
                      padding: '16px',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '14px'
                    }}>
                      <div style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                        # Use in your app
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        {"import { Button } from '@/components/ui/button'"}
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        {"<Button>Click me</Button>"}
                      </div>
                    </div>
                  </Stack>
                </CardContent>
              </Card>

              <div style={{ textAlign: 'center' }}>
                <Link href="/getting-started">
                  <Button variant="outline" style={{ gap: '8px' }}>
                    Read the full guide
                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </Button>
                </Link>
              </div>
            </Stack>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card style={{
              background: 'hsl(var(--color-primary))',
              color: 'hsl(var(--color-primary-foreground))',
              border: '1px solid hsl(var(--color-primary))'
            }}>
              <CardContent style={{ padding: '64px 32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <Stack gap="lg">
                    <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.01em' }}>
                      Ready to build?
                    </h2>
                    <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                      Start building beautiful, accessible UIs today with Seamless UI.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
                      <Link href="/getting-started">
                        <Button size="lg" variant="secondary">
                          Get Started
                        </Button>
                      </Link>
                      <Link href="/components">
                        <Button 
                          size="lg" 
                          variant="outline"
                          style={{
                            borderColor: 'hsl(var(--color-primary-foreground))',
                            color: 'hsl(var(--color-primary-foreground))'
                          }}
                        >
                          Browse Components
                        </Button>
                      </Link>
                    </div>
                  </Stack>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </DocsShell>
  )
}
