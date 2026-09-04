"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Input, Badge } from "@seamless/ui"
import { useState } from "react"
import { Search } from "lucide-react"

const components = [
  { name: "Autocomplete", category: "Form", status: "stable", description: "Search with suggestions" },
  { name: "Badge", category: "Display", status: "stable", description: "Status indicators" },
  { name: "Button", category: "Action", status: "stable", description: "Primary action trigger" },
  { name: "Button Group", category: "Action", status: "stable", description: "Grouped buttons" },
  { name: "Calendar", category: "Form", status: "stable", description: "Date selection" },
  { name: "Card", category: "Layout", status: "stable", description: "Content container" },
  { name: "Checkbox", category: "Form", status: "stable", description: "Boolean selection" },
  { name: "Combobox", category: "Form", status: "stable", description: "Select with search" },
  { name: "Date Picker", category: "Form", status: "stable", description: "Single date picker" },
  { name: "Date Range Picker", category: "Form", status: "stable", description: "Date range selection" },
  { name: "Dialog", category: "Overlay", status: "stable", description: "Modal dialogs" },
  { name: "File Upload", category: "Form", status: "stable", description: "File input" },
  { name: "Form Field", category: "Form", status: "stable", description: "Form field wrapper" },
  { name: "Icon Button", category: "Action", status: "stable", description: "Icon-only button" },
  { name: "Input", category: "Form", status: "stable", description: "Text input" },
  { name: "Input Group", category: "Form", status: "stable", description: "Input with addons" },
  { name: "Label", category: "Form", status: "stable", description: "Form labels" },
  { name: "Native Select", category: "Form", status: "stable", description: "Native select" },
  { name: "Number Input", category: "Form", status: "stable", description: "Numeric input" },
  { name: "OTP Input", category: "Form", status: "stable", description: "One-time password" },
  { name: "Password Input", category: "Form", status: "stable", description: "Password field" },
  { name: "Radio", category: "Form", status: "stable", description: "Radio buttons" },
  { name: "Search", category: "Form", status: "stable", description: "Search input" },
  { name: "Select", category: "Form", status: "stable", description: "Custom select" },
  { name: "Slider", category: "Form", status: "stable", description: "Range slider" },
  { name: "Switch", category: "Form", status: "stable", description: "Toggle switch" },
  { name: "Tabs", category: "Navigation", status: "stable", description: "Tab navigation" },
  { name: "Textarea", category: "Form", status: "stable", description: "Multi-line input" },
]

const categories = Array.from(new Set(components.map(c => c.category))).sort()

export default function ComponentsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = components.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || c.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DocsShell title="Components">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">Components</h1>
            <p className="text-lg text-muted-foreground">
              28 production-ready components built with Radix UI and Tailwind CSS.
              All components are fully accessible, themeable, and installable via CLI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filtered.length} of {components.length} components
          </div>

          <Grid cols={3} gap="md" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((component) => (
              <a
                key={component.name}
                href={`/components/${component.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block group"
              >
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {component.category}
                      </Badge>
                      <Badge variant={component.status === "stable" ? "default" : "secondary"} className="text-xs">
                        {component.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {component.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </Grid>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No components found matching your search.</p>
            </div>
          )}
        </Stack>
      </Container>
    </DocsShell>
  )
}
