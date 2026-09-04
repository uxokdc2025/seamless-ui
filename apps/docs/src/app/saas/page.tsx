"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@seamless/ui"

export default function SaaSPage() {
  return (
    <DocsShell title="SaaS Components">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">SaaS Components</h1>
            <p className="text-lg text-muted-foreground">
              Pre-built components specifically designed for SaaS applications. Includes app shells,
              navigation, and common SaaS UI patterns.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AppShell</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  A complete application shell with sidebar, header, and main content area. Responsive by default.
                </p>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { AppShell } from "@seamless/saas"

export default function App() {
  return (
    <AppShell 
      sidebar={<Sidebar />}
      header={<Header />}
      sidebarCollapsible
    >
      <main>{children}</main>
    </AppShell>
  )
}`}</code>
                </pre>
                <div className="space-y-2 text-sm">
                  <div><strong>Props:</strong></div>
                  <div><code className="bg-muted px-2 py-1 rounded">sidebar</code> — Sidebar content</div>
                  <div><code className="bg-muted px-2 py-1 rounded">header</code> — Header content</div>
                  <div><code className="bg-muted px-2 py-1 rounded">sidebarCollapsible</code> — Enable sidebar collapse</div>
                  <div><code className="bg-muted px-2 py-1 rounded">sidebarDefaultCollapsed</code> — Start collapsed</div>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                More SaaS components coming soon: Billing, Team Management, User Settings, and more.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </DocsShell>
  )
}
