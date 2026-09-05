"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent, Input, Badge, Button } from "@seamless/ui"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

// Import actual components for live previews
import * as UIComponents from "@seamless/ui"

const components = [
  { name: "Autocomplete", category: "Form", status: "stable", description: "Search with suggestions", preview: "Input" },
  { name: "Badge", category: "Display", status: "stable", description: "Status indicators", preview: "Badge" },
  { name: "Button", category: "Action", status: "stable", description: "Primary action trigger", preview: "Button" },
  { name: "Button Group", category: "Action", status: "stable", description: "Grouped buttons", preview: "Button" },
  { name: "Calendar", category: "Form", status: "stable", description: "Date selection", preview: "Calendar" },
  { name: "Card", category: "Layout", status: "stable", description: "Content container", preview: "Card" },
  { name: "Checkbox", category: "Form", status: "stable", description: "Boolean selection", preview: "Checkbox" },
  { name: "Combobox", category: "Form", status: "stable", description: "Select with search", preview: "Select" },
  { name: "Date Picker", category: "Form", status: "stable", description: "Single date picker", preview: "Input" },
  { name: "Date Range Picker", category: "Form", status: "stable", description: "Date range selection", preview: "Input" },
  { name: "Dialog", category: "Overlay", status: "stable", description: "Modal dialogs", preview: "Button" },
  { name: "File Upload", category: "Form", status: "stable", description: "File input", preview: "Input" },
  { name: "Form Field", category: "Form", status: "stable", description: "Form field wrapper", preview: "Input" },
  { name: "Icon Button", category: "Action", status: "stable", description: "Icon-only button", preview: "Button" },
  { name: "Input", category: "Form", status: "stable", description: "Text input", preview: "Input" },
  { name: "Input Group", category: "Form", status: "stable", description: "Input with addons", preview: "Input" },
  { name: "Label", category: "Form", status: "stable", description: "Form labels", preview: "Label" },
  { name: "Native Select", category: "Form", status: "stable", description: "Native select", preview: "Select" },
  { name: "Number Input", category: "Form", status: "stable", description: "Numeric input", preview: "Input" },
  { name: "OTP Input", category: "Form", status: "stable", description: "One-time password", preview: "Input" },
  { name: "Password Input", category: "Form", status: "stable", description: "Password field", preview: "Input" },
  { name: "Radio", category: "Form", status: "stable", description: "Radio buttons", preview: "Radio" },
  { name: "Search", category: "Form", status: "stable", description: "Search input", preview: "Input" },
  { name: "Select", category: "Form", status: "stable", description: "Custom select", preview: "Select" },
  { name: "Slider", category: "Form", status: "stable", description: "Range slider", preview: "Slider" },
  { name: "Switch", category: "Form", status: "stable", description: "Toggle switch", preview: "Switch" },
  { name: "Tabs", category: "Navigation", status: "stable", description: "Tab navigation", preview: "Tabs" },
  { name: "Textarea", category: "Form", status: "stable", description: "Multi-line input", preview: "Textarea" },
]

const categories = Array.from(new Set(components.map(c => c.category))).sort()

function ComponentPreview({ componentName }: { componentName: string }) {
  // Render a simple live preview of the component
  try {
    switch (componentName) {
      case "Button":
        return <UIComponents.Button>Click me</UIComponents.Button>
      case "Badge":
        return <UIComponents.Badge>New</UIComponents.Badge>
      case "Input":
        return <UIComponents.Input placeholder="Enter text..." style={{ width: '100%' }} />
      case "Checkbox":
        return <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UIComponents.Checkbox id="preview" />
          <UIComponents.Label htmlFor="preview">Check me</UIComponents.Label>
        </div>
      case "Switch":
        return <UIComponents.Switch />
      case "Select":
        return (
          <UIComponents.Select defaultValue="option1">
            <UIComponents.SelectTrigger style={{ width: '180px' }}>
              <UIComponents.SelectValue />
            </UIComponents.SelectTrigger>
            <UIComponents.SelectContent>
              <UIComponents.SelectItem value="option1">Option 1</UIComponents.SelectItem>
              <UIComponents.SelectItem value="option2">Option 2</UIComponents.SelectItem>
            </UIComponents.SelectContent>
          </UIComponents.Select>
        )
      case "Slider":
        return <UIComponents.Slider defaultValue={[50]} max={100} step={1} style={{ width: '100%' }} />
      case "Textarea":
        return <UIComponents.Textarea placeholder="Type here..." style={{ width: '100%' }} />
      case "Label":
        return <UIComponents.Label>Form Label</UIComponents.Label>
      case "Card":
        return (
          <UIComponents.Card style={{ width: '100%' }}>
            <UIComponents.CardHeader>
              <UIComponents.CardTitle style={{ fontSize: '14px' }}>Card</UIComponents.CardTitle>
            </UIComponents.CardHeader>
          </UIComponents.Card>
        )
      case "Tabs":
        return (
          <UIComponents.Tabs defaultValue="tab1" style={{ width: '100%' }}>
            <UIComponents.TabsList>
              <UIComponents.TabsTrigger value="tab1">Tab 1</UIComponents.TabsTrigger>
              <UIComponents.TabsTrigger value="tab2">Tab 2</UIComponents.TabsTrigger>
            </UIComponents.TabsList>
          </UIComponents.Tabs>
        )
      default:
        return <UIComponents.Button size="sm">Preview</UIComponents.Button>
    }
  } catch (e) {
    return <UIComponents.Button size="sm">Preview</UIComponents.Button>
  }
}

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
      <div style={{ maxWidth: '1200px' }}>
        <Stack gap="xl">
          <div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700, 
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Components
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: 'hsl(var(--color-muted-foreground))',
              lineHeight: 1.6,
              maxWidth: '700px'
            }}>
              Beautifully designed, accessible components. Built with Radix UI and styled with our design system tokens.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '16px' 
          }}>
            <div style={{ position: 'relative', maxWidth: '400px' }}>
              <Search style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: 'hsl(var(--color-muted-foreground))'
              }} />
              <Input
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ 
            fontSize: '14px', 
            color: 'hsl(var(--color-muted-foreground))',
            marginTop: '8px'
          }}>
            Showing {filtered.length} of {components.length} components
          </div>

          {/* Component Grid with Live Previews */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((component) => (
              <Link
                key={component.name}
                href={`/components/${component.name.toLowerCase().replace(/\s+/g, "-")}`}
                style={{ 
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div 
                  className="border rounded-lg overflow-hidden"
                  style={{
                    height: '100%',
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
                  {/* Live Preview Area */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                    padding: '24px',
                    background: 'hsl(var(--color-muted) / 0.3)'
                  }}>
                    <ComponentPreview componentName={component.preview} />
                  </div>
                  
                  {/* Component Info */}
                  <div style={{ padding: '16px', borderTop: '1px solid hsl(var(--color-border))' }}>
                    <div style={{ 
                      fontSize: '12px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'hsl(var(--color-muted-foreground))',
                      marginBottom: '8px'
                    }}>
                      {component.category}
                    </div>
                    <h3 style={{ 
                      fontSize: '14px',
                      fontWeight: 500,
                      marginBottom: '4px',
                      color: 'hsl(var(--color-foreground))'
                    }}>
                      {component.name}
                    </h3>
                    <p style={{ 
                      fontSize: '14px',
                      color: 'hsl(var(--color-muted-foreground))',
                      lineHeight: 1.5
                    }}>
                      {component.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '64px 0',
              color: 'hsl(var(--color-muted-foreground))'
            }}>
              <p>No components found matching your search.</p>
            </div>
          )}
        </Stack>
      </div>
    </DocsShell>
  )
}
