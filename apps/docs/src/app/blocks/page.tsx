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

          <Grid cols={2} gap="md" className="grid-cols-1 md:grid-cols-2">
            {blocks.map((block) => (
              <Card key={block.name} className="hover:shadow-lg hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {block.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{block.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <p className="text-sm text-muted-foreground">{block.description}</p>
                    <div className="bg-muted/50 border border-border rounded-md h-40 flex items-center justify-center text-sm text-muted-foreground">
                      Preview
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </DocsShell>
  )
}
