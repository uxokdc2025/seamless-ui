"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Button } from "@seamless/ui"
import { ExternalLink } from "lucide-react"

export default function DesignSystemsPage() {
  return (
    <DocsShell title="Design Systems">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Design Systems</h1>
            <p className="text-lg text-muted-foreground">
              Import and export design systems using the DESIGN.md format. Compatible with DTCG tokens,
              Tailwind configs, and CSS variables.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>DESIGN.md Format</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  DESIGN.md is a standardized format for design system documentation and token definition.
                  Seamless UI can import and export design systems in this format.
                </p>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`# Design System Name

## Colors
- Primary: #3B82F6
- Secondary: #8B5CF6
- Background: #FFFFFF

## Typography
- Font Family: Inter, system-ui
- Base Size: 16px

## Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px`}</code>
                </pre>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Import/Export</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Import from DESIGN.md</h4>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`import { importDesignMd } from "@seamless/design-system"

const tokens = await importDesignMd("./DESIGN.md")`}</code>
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm">Export to formats</h4>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`import { exportToCss, exportToTailwind } from "@seamless/design-system"

const css = exportToCss(tokens)
const tailwindConfig = exportToTailwind(tokens)`}</code>
                  </pre>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">DESIGN.md</div>
                    <div className="text-sm text-muted-foreground">Human-readable markdown format</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">DTCG Tokens</div>
                    <div className="text-sm text-muted-foreground">Design Tokens Community Group format</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">CSS Variables</div>
                    <div className="text-sm text-muted-foreground">CSS custom properties</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Tailwind Config</div>
                    <div className="text-sm text-muted-foreground">Tailwind theme configuration</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">JSON</div>
                    <div className="text-sm text-muted-foreground">Structured token data</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design System Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  Browse and import popular design systems from the catalog.
                </p>
                <a href="https://github.com/seamless-ui/design-systems" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Catalog
                  </Button>
                </a>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </DocsShell>
  )
}
