"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Button } from "@seamless/ui"
import { ExternalLink } from "lucide-react"

export default function RegistryPage() {
  return (
    <DocsShell title="Registry">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Registry</h1>
            <p className="text-lg text-muted-foreground">
              Seamless UI uses a shadcn-compatible registry for component distribution. Install components,
              blocks, and themes via the CLI.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How the Registry Works</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-muted-foreground">
                  The registry is a JSON catalog of all components, their dependencies, and source files.
                  When you install a component, the CLI fetches the definition and copies it to your project.
                </p>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`{
  "name": "button",
  "type": "components:ui",
  "dependencies": [
    "@radix-ui/react-slot",
    "class-variance-authority"
  ],
  "files": [
    {
      "name": "components/ui/button.tsx",
      "content": "..."
    }
  ]
}`}</code>
                  </pre>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Namespaces</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/ui/*</code>
                  <p className="text-sm text-muted-foreground mt-1">Core UI components (28 components)</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/layout/*</code>
                  <p className="text-sm text-muted-foreground mt-1">Layout primitives (14 components)</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/saas/*</code>
                  <p className="text-sm text-muted-foreground mt-1">SaaS-specific components (4 components)</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/ai/*</code>
                  <p className="text-sm text-muted-foreground mt-1">AI and agent components (1 component)</p>
                </div>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">@seamless/blocks/*</code>
                  <p className="text-sm text-muted-foreground mt-1">Pre-built composition blocks (1 block)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registry API</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-muted-foreground">
                  The registry is available at <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    /api/registry
                  </code> and provides programmatic access to all components.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <code className="bg-muted px-2 py-1 rounded font-mono">GET /api/registry</code>
                    <span className="text-muted-foreground">List all components</span>
                  </div>
                  <div className="flex gap-2">
                    <code className="bg-muted px-2 py-1 rounded font-mono">GET /api/registry/:name</code>
                    <span className="text-muted-foreground">Get a specific component</span>
                  </div>
                  <div className="flex gap-2">
                    <code className="bg-muted px-2 py-1 rounded font-mono">GET /api/registry/type/:type</code>
                    <span className="text-muted-foreground">Filter by type</span>
                  </div>
                </div>
                <a href="https://github.com/seamless-ui/registry" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Registry Source
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
