"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@seamless/ui"

const patterns = [
  { name: "Form Validation", category: "Forms", description: "Multi-step form with validation" },
  { name: "Data Tables", category: "Data", description: "Sortable, filterable tables" },
  { name: "Command Palette", category: "Navigation", description: "Keyboard-driven command menu" },
  { name: "Empty States", category: "Feedback", description: "Helpful empty state designs" },
  { name: "Loading States", category: "Feedback", description: "Skeleton loaders and spinners" },
  { name: "Error Handling", category: "Feedback", description: "User-friendly error messages" },
  { name: "Notifications", category: "Feedback", description: "Toast and banner notifications" },
  { name: "Modals & Drawers", category: "Overlay", description: "Dialog and drawer patterns" },
  { name: "Search & Filter", category: "Data", description: "Advanced search interfaces" },
  { name: "Pagination", category: "Navigation", description: "Page and infinite scroll" },
  { name: "File Upload", category: "Forms", description: "Drag-drop file upload" },
  { name: "Settings Panels", category: "Forms", description: "Multi-section settings" },
]

const categories = Array.from(new Set(patterns.map(p => p.category))).sort()

export default function PatternsPage() {
  return (
    <DocsShell title="Patterns">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Design Patterns</h1>
            <p className="text-lg text-muted-foreground">
              Common UI patterns and compositions built with Seamless components. Learn best practices
              for solving recurring design problems.
            </p>
          </div>

          <Grid cols={3} gap="md" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <Card key={pattern.name} className="hover:shadow-lg hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {pattern.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{pattern.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{pattern.description}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </DocsShell>
  )
}
