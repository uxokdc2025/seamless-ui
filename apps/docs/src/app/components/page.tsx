"use client"

import { DocsShell } from "../../components/docs-shell"
import { Stack } from "@seamless/layout"
import { Input, Button } from "@seamless/ui"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

// Import actual components for live previews
import * as UIComponents from "@seamless/ui"

type ComponentEntry = {
  name: string
  slug: string
  category: string
  description: string
  preview?: string
}

// Every entry links to a real /components/<slug> route.
const components: ComponentEntry[] = [
  { name: "Accordion", slug: "accordion", category: "Layout", description: "Collapsible content sections" },
  { name: "Alert", slug: "alert", category: "Feedback", description: "Callout for user attention" },
  { name: "Alert Dialog", slug: "alert-dialog", category: "Overlay", description: "Confirm destructive actions", preview: "Button" },
  { name: "Aspect Ratio", slug: "aspect-ratio", category: "Layout", description: "Constrain content to a ratio" },
  { name: "Avatar", slug: "avatar", category: "Display", description: "User image or initials" },
  { name: "Badge", slug: "badge", category: "Display", description: "Status indicators", preview: "Badge" },
  { name: "Bottom Navigation", slug: "bottom-navigation", category: "Navigation", description: "Mobile bottom bar" },
  { name: "Breadcrumb", slug: "breadcrumb", category: "Navigation", description: "Page hierarchy trail" },
  { name: "Button", slug: "button", category: "Action", description: "Primary action trigger", preview: "Button" },
  { name: "Button Group", slug: "button-group", category: "Action", description: "Grouped buttons", preview: "Button" },
  { name: "Calendar", slug: "calendar", category: "Form", description: "Date selection", preview: "Calendar" },
  { name: "Card", slug: "card", category: "Layout", description: "Content container", preview: "Card" },
  { name: "Carousel", slug: "carousel", category: "Display", description: "Swipeable slides" },
  { name: "Chart", slug: "chart", category: "Data", description: "Data visualization" },
  { name: "Checkbox", slug: "checkbox", category: "Form", description: "Boolean selection", preview: "Checkbox" },
  { name: "Collapsible", slug: "collapsible", category: "Layout", description: "Show and hide content" },
  { name: "Combobox", slug: "combobox", category: "Form", description: "Select with search", preview: "Select" },
  { name: "Command", slug: "command", category: "Overlay", description: "Command palette" },
  { name: "Context Menu", slug: "context-menu", category: "Overlay", description: "Right-click menu" },
  { name: "Data Table", slug: "data-table", category: "Data", description: "Sortable data grid" },
  { name: "Date Picker", slug: "date-picker", category: "Form", description: "Single date picker", preview: "Input" },
  { name: "Dialog", slug: "dialog", category: "Overlay", description: "Modal dialogs", preview: "Button" },
  { name: "Drawer", slug: "drawer", category: "Overlay", description: "Slide-in panel" },
  { name: "Dropdown Menu", slug: "dropdown-menu", category: "Overlay", description: "Actions menu" },
  { name: "Empty", slug: "empty", category: "Feedback", description: "Empty state placeholder" },
  { name: "Field", slug: "field", category: "Form", description: "Form field wrapper", preview: "Input" },
  { name: "Hover Card", slug: "hover-card", category: "Overlay", description: "Hover preview card" },
  { name: "Input", slug: "input", category: "Form", description: "Text input", preview: "Input" },
  { name: "Input Group", slug: "input-group", category: "Form", description: "Input with addons", preview: "Input" },
  { name: "Input OTP", slug: "input-otp", category: "Form", description: "One-time password" },
  { name: "Kbd", slug: "kbd", category: "Display", description: "Keyboard key" },
  { name: "Label", slug: "label", category: "Form", description: "Form labels", preview: "Label" },
  { name: "Menubar", slug: "menubar", category: "Navigation", description: "Application menu bar" },
  { name: "Native Select", slug: "native-select", category: "Form", description: "Native select", preview: "Select" },
  { name: "Navigation Menu", slug: "navigation-menu", category: "Navigation", description: "Site navigation" },
  { name: "Notification Badge", slug: "notification-badge", category: "Display", description: "Count indicator" },
  { name: "Pagination", slug: "pagination", category: "Navigation", description: "Page navigation" },
  { name: "Popover", slug: "popover", category: "Overlay", description: "Floating content" },
  { name: "Progress", slug: "progress", category: "Feedback", description: "Progress bar" },
  { name: "Radio Group", slug: "radio-group", category: "Form", description: "Single choice from a set" },
  { name: "Rating", slug: "rating", category: "Form", description: "Star rating input" },
  { name: "Resizable", slug: "resizable", category: "Layout", description: "Resizable panels" },
  { name: "Scroll Area", slug: "scroll-area", category: "Layout", description: "Custom scrollbars" },
  { name: "Select", slug: "select", category: "Form", description: "Custom select", preview: "Select" },
  { name: "Separator", slug: "separator", category: "Layout", description: "Visual divider" },
  { name: "Sheet", slug: "sheet", category: "Overlay", description: "Side sheet panel" },
  { name: "Skeleton", slug: "skeleton", category: "Feedback", description: "Loading placeholder" },
  { name: "Slider", slug: "slider", category: "Form", description: "Range slider", preview: "Slider" },
  { name: "Sparkline", slug: "sparkline", category: "Data", description: "Inline mini chart" },
  { name: "Spinner", slug: "spinner", category: "Feedback", description: "Loading spinner" },
  { name: "Switch", slug: "switch", category: "Form", description: "Toggle switch", preview: "Switch" },
  { name: "Table", slug: "table", category: "Data", description: "Data table" },
  { name: "Tabs", slug: "tabs", category: "Navigation", description: "Tab navigation", preview: "Tabs" },
  { name: "Textarea", slug: "textarea", category: "Form", description: "Multi-line input", preview: "Textarea" },
  { name: "Toast", slug: "toast", category: "Feedback", description: "Transient notifications" },
  { name: "Toggle", slug: "toggle", category: "Action", description: "Two-state toggle button" },
  { name: "Toggle Group", slug: "toggle-group", category: "Action", description: "Grouped toggles" },
  { name: "Tooltip", slug: "tooltip", category: "Overlay", description: "Hover hint" },
  { name: "Typography", slug: "typography", category: "Display", description: "Text styles" },
]

const categories = Array.from(new Set(components.map((c) => c.category))).sort()

function ComponentPreview({ component }: { component: ComponentEntry }) {
  // Render a simple live preview where one exists; otherwise a neutral monogram.
  try {
    switch (component.preview) {
      case "Button":
        return <UIComponents.Button>Click me</UIComponents.Button>
      case "Badge":
        return <UIComponents.Badge>New</UIComponents.Badge>
      case "Input":
        return <UIComponents.Input placeholder="Enter text..." style={{ width: "100%" }} />
      case "Checkbox":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <UIComponents.Checkbox id={`preview-${component.slug}`} />
            <UIComponents.Label htmlFor={`preview-${component.slug}`}>Check me</UIComponents.Label>
          </div>
        )
      case "Switch":
        return <UIComponents.Switch />
      case "Select":
        return (
          <UIComponents.Select defaultValue="option1">
            <UIComponents.SelectTrigger style={{ width: "180px" }}>
              <UIComponents.SelectValue />
            </UIComponents.SelectTrigger>
            <UIComponents.SelectContent>
              <UIComponents.SelectItem value="option1">Option 1</UIComponents.SelectItem>
              <UIComponents.SelectItem value="option2">Option 2</UIComponents.SelectItem>
            </UIComponents.SelectContent>
          </UIComponents.Select>
        )
      case "Slider":
        return <UIComponents.Slider defaultValue={[50]} max={100} step={1} style={{ width: "100%" }} />
      case "Textarea":
        return <UIComponents.Textarea placeholder="Type here..." style={{ width: "100%" }} />
      case "Label":
        return <UIComponents.Label>Form Label</UIComponents.Label>
      case "Card":
        return (
          <UIComponents.Card style={{ width: "100%" }}>
            <UIComponents.CardHeader>
              <UIComponents.CardTitle style={{ fontSize: "14px" }}>Card</UIComponents.CardTitle>
            </UIComponents.CardHeader>
          </UIComponents.Card>
        )
      case "Tabs":
        return (
          <UIComponents.Tabs defaultValue="tab1" style={{ width: "100%" }}>
            <UIComponents.TabsList>
              <UIComponents.TabsTrigger value="tab1">Tab 1</UIComponents.TabsTrigger>
              <UIComponents.TabsTrigger value="tab2">Tab 2</UIComponents.TabsTrigger>
            </UIComponents.TabsList>
          </UIComponents.Tabs>
        )
      default:
        return (
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--color-muted-foreground)",
            }}
          >
            {component.name.charAt(0)}
          </div>
        )
    }
  } catch {
    return <UIComponents.Button size="sm">Preview</UIComponents.Button>
  }
}

export default function ComponentsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = components.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || c.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DocsShell title="Components">
      <div style={{ maxWidth: "1200px" }}>
        <Stack gap="xl">
          <div>
            <h1
              style={{
                fontSize: "40px",
                fontWeight: 700,
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              Components
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "var(--color-muted-foreground)",
                lineHeight: 1.6,
                maxWidth: "700px",
              }}
            >
              Beautifully designed, accessible components. Built with Radix UI and styled with our
              design system tokens.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ position: "relative", maxWidth: "400px" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "var(--color-muted-foreground)",
                }}
              />
              <Input
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: "40px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Button
                variant={!selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
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

          <div style={{ fontSize: "14px", color: "var(--color-muted-foreground)" }}>
            Showing {filtered.length} of {components.length} components
          </div>

          {/* Component Grid with Live Previews */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {filtered.map((component) => (
              <Link
                key={component.slug}
                href={`/components/${component.slug}`}
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    height: "100%",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor =
                      "color-mix(in srgb, var(--color-primary) calc(0.5 * 100%), transparent)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  {/* Live Preview Area */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "160px",
                      padding: "24px",
                      background: "var(--color-muted)",
                    }}
                  >
                    <ComponentPreview component={component} />
                  </div>

                  {/* Component Info */}
                  <div style={{ padding: "16px", borderTop: "1px solid var(--color-border)" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "var(--color-muted-foreground)",
                        marginBottom: "6px",
                      }}
                    >
                      {component.category}
                    </div>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "4px",
                        color: "var(--color-foreground)",
                      }}
                    >
                      {component.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--color-muted-foreground)",
                        lineHeight: 1.5,
                      }}
                    >
                      {component.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "var(--color-muted-foreground)" }}>
              <p>No components found matching your search.</p>
            </div>
          )}
        </Stack>
      </div>
    </DocsShell>
  )
}
