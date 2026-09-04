"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Input, Badge } from "@seamless/ui"
import { useState } from "react"
import { Search } from "lucide-react"
import saasComponents from "../../data/saas-components.json"

// Group components by category
const categories = Array.from(new Set(saasComponents.map((c) => c.category))).sort()

export default function SaaSPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = saasComponents.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || c.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DocsShell title="SaaS Components">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">SaaS Components</h1>
            <p className="text-lg text-muted-foreground">
              32 production-ready components specifically designed for SaaS applications. Includes
              app shells, navigation, billing, user management, and common SaaS UI patterns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search SaaS components..."
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
              {categories.map((cat) => (
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
            Showing {filtered.length} of {saasComponents.length} components
          </div>

          <Grid cols={3} gap="md" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((component) => (
              <a
                key={component.slug}
                href={`/saas/${component.slug}`}
                className="block group"
              >
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {component.category}
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
