"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@seamless/ui"

const blocks = [
  { name: "Dashboard 01", category: "Analytics", description: "Stats grid with KPI cards" },
  { name: "Dashboard 02", category: "Analytics", description: "Chart-focused dashboard" },
  { name: "Auth 01", category: "Authentication", description: "Sign in form" },
  { name: "Auth 02", category: "Authentication", description: "Sign up form with validation" },
  { name: "Settings 01", category: "Settings", description: "Profile settings form" },
  { name: "Settings 02", category: "Settings", description: "Multi-tab settings panel" },
  { name: "Pricing 01", category: "Marketing", description: "3-tier pricing table" },
  { name: "Pricing 02", category: "Marketing", description: "Comparison pricing grid" },
  { name: "Hero 01", category: "Marketing", description: "Centered hero with CTA" },
  { name: "Hero 02", category: "Marketing", description: "Split hero with image" },
]

export default function BlocksPage() {
  return (
    <DocsShell title="Blocks">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Blocks</h1>
            <p className="text-lg text-muted-foreground">
              10 production-ready composition blocks for common UI patterns. Each block combines multiple
              components into a complete, installable pattern.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Installing Blocks</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">pnpm dlx shadcn@latest add @seamless/blocks/dashboard-01</code>
                </pre>
                <p className="text-sm text-muted-foreground">
                  Blocks are installed with all their dependencies and can be customized after installation.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <div 
                key={block.name} 
                className="border rounded-lg overflow-hidden"
                style={{
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  borderColor: 'hsl(var(--color-border))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--color-primary) / 0.5)'
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--color-border))'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Preview Area */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '180px',
                  padding: '24px',
                  background: 'hsl(var(--color-muted) / 0.3)'
                }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: 'hsl(var(--color-muted-foreground))' 
                  }}>
                    Preview
                  </div>
                </div>
                
                {/* Block Info */}
                <div style={{ padding: '16px', borderTop: '1px solid hsl(var(--color-border))' }}>
                  <div style={{ 
                    fontSize: '12px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'hsl(var(--color-muted-foreground))',
                    marginBottom: '8px'
                  }}>
                    {block.category}
                  </div>
                  <h3 style={{ 
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '4px',
                    color: 'hsl(var(--color-foreground))'
                  }}>
                    {block.name}
                  </h3>
                  <p style={{ 
                    fontSize: '14px',
                    color: 'hsl(var(--color-muted-foreground))',
                    lineHeight: 1.5
                  }}>
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </DocsShell>
  )
}
