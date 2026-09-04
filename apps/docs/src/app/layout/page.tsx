"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@seamless/ui"

export default function LayoutPage() {
  return (
    <DocsShell title="Layout">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Layout Primitives</h1>
            <p className="text-lg text-muted-foreground">
              Composable layout components for building responsive interfaces. All layout primitives support
              responsive props and gap spacing.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">Container</h2>
            <Card>
              <CardHeader>
                <CardTitle>Center content with max-width constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack gap="md">
                  <p className="text-sm text-muted-foreground">
                    Container provides centered content with configurable max-width sizes.
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`import { Container } from "@seamless/layout"

<Container size="lg">
  <h1>Centered Content</h1>
</Container>`}</code>
                  </pre>
                  <div className="space-y-2">
                    <div><code className="bg-muted px-2 py-1 rounded text-sm">size="sm"</code> — max-width: 640px</div>
                    <div><code className="bg-muted px-2 py-1 rounded text-sm">size="md"</code> — max-width: 768px (default)</div>
                    <div><code className="bg-muted px-2 py-1 rounded text-sm">size="lg"</code> — max-width: 1024px</div>
                    <div><code className="bg-muted px-2 py-1 rounded text-sm">size="xl"</code> — max-width: 1280px</div>
                    <div><code className="bg-muted px-2 py-1 rounded text-sm">size="full"</code> — no max-width</div>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Stack</h2>
            <Card>
              <CardHeader>
                <CardTitle>Vertical layout with consistent spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack gap="md">
                  <p className="text-sm text-muted-foreground">
                    Stack creates vertical layouts with consistent gap spacing between children.
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`import { Stack } from "@seamless/layout"

<Stack gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`}</code>
                  </pre>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Preview</h4>
                    <Stack gap="md" className="border border-border rounded-md p-4">
                      <div className="bg-muted p-4 rounded">Item 1</div>
                      <div className="bg-muted p-4 rounded">Item 2</div>
                      <div className="bg-muted p-4 rounded">Item 3</div>
                    </Stack>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Grid</h2>
            <Card>
              <CardHeader>
                <CardTitle>Responsive grid layouts</CardTitle>
              </CardHeader>
              <CardContent>
                <Stack gap="md">
                  <p className="text-sm text-muted-foreground">
                    Grid creates responsive grid layouts with configurable columns and gap.
                  </p>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                    <code>{`import { Grid } from "@seamless/layout"

<Grid cols={3} gap="md">
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</Grid>`}</code>
                  </pre>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Preview (3 columns)</h4>
                    <Grid cols={3} gap="md" className="border border-border rounded-md p-4">
                      <div className="bg-muted p-4 rounded">Col 1</div>
                      <div className="bg-muted p-4 rounded">Col 2</div>
                      <div className="bg-muted p-4 rounded">Col 3</div>
                      <div className="bg-muted p-4 rounded">Col 4</div>
                      <div className="bg-muted p-4 rounded">Col 5</div>
                      <div className="bg-muted p-4 rounded">Col 6</div>
                    </Grid>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Gap Spacing</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="xs"</code> — 0.25rem (4px)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="sm"</code> — 0.5rem (8px)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="md"</code> — 1rem (16px)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="lg"</code> — 1.5rem (24px)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="xl"</code> — 2rem (32px)</div>
                  <div><code className="bg-muted px-2 py-1 rounded text-sm">gap="2xl"</code> — 3rem (48px)</div>
                </div>
              </CardContent>
            </Card>
          </section>
        </Stack>
      </Container>
    </DocsShell>
  )
}
