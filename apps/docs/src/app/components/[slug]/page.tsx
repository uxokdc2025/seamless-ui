import { notFound } from "next/navigation"
import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import registry from "../../../../../../packages/registry/dist/registry.json"
import { readdirSync } from "fs"
import { join } from "path"

// Extract component slug from registry name (e.g., "@seamless/ui/button" -> "button")
function getSlugFromName(name: string): string {
  const parts = name.split("/")
  return parts[parts.length - 1]
}

// Map registry items to slug -> component data
const componentMap = new Map(
  registry.items.map((item) => [
    getSlugFromName(item.name),
    item,
  ])
)

// Get all component slugs from the UI package
function getAllComponentSlugs(): string[] {
  try {
    const uiSrcPath = join(process.cwd(), "../../packages/ui/src")
    const files = readdirSync(uiSrcPath)
    return files
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""))
      .filter((slug) => slug !== "index" && slug !== "lib")
  } catch (error) {
    // Fallback to registry-only slugs if we can't read the UI package
    return Array.from(componentMap.keys())
  }
}

// Generate static params for all components (both in registry and UI package)
export async function generateStaticParams() {
  const allSlugs = new Set([
    ...Array.from(componentMap.keys()),
    ...getAllComponentSlugs(),
  ])
  return Array.from(allSlugs).map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ComponentSlugPage({ params }: PageProps) {
  const { slug } = await params
  const component = componentMap.get(slug)

  // Check if component exists in UI package even if not in registry
  const allComponentSlugs = getAllComponentSlugs()
  if (!component && !allComponentSlugs.includes(slug)) {
    notFound()
  }

  const title = component?.title || slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  const description = getDefaultDescription(slug, title)
  const componentName = component ? component.name : `@seamless/ui/${slug}`

  return (
    <DocsShell title={title}>
      <ComponentPage
        name={title}
        description={description}
        preview={<DefaultPreview name={title} />}
        installCommand={`pnpm dlx shadcn@latest add ${componentName}`}
        usage={getDefaultUsage(componentName, title)}
        props={getDefaultProps(slug)}
        accessibility={getDefaultAccessibility(slug)}
        related={getRelatedComponents(slug)}
      />
    </DocsShell>
  )
}

// Default preview component
function DefaultPreview({ name }: { name: string }) {
  return (
    <div className="text-center">
      <div className="text-sm text-muted-foreground">
        {name} component preview
      </div>
    </div>
  )
}

// Generate default description based on component type
function getDefaultDescription(slug: string, title: string): string {
  const descriptions: Record<string, string> = {
    // Form components
    autocomplete: "Search input with autocomplete suggestions and keyboard navigation.",
    badge: "Status indicators and labels with multiple variants.",
    "button-group": "Group related buttons together with customizable spacing and orientation.",
    calendar: "Date selection component with month/year navigation.",
    checkbox: "Boolean input control with indeterminate state support.",
    combobox: "Searchable select dropdown with keyboard navigation.",
    "date-picker": "Single date picker with calendar popup.",
    "date-range-picker": "Date range selection with start and end dates.",
    "file-upload": "File input component with drag-and-drop support.",
    "form-field": "Form field wrapper with label, error, and help text.",
    "icon-button": "Button component optimized for icon-only use cases.",
    "input-group": "Input component with prefix and suffix addons.",
    label: "Form label component with proper accessibility attributes.",
    "native-select": "Native HTML select element with custom styling.",
    "number-input": "Numeric input with increment/decrement controls.",
    "otp-input": "One-time password input with auto-focus and paste support.",
    "password-input": "Password input field with show/hide toggle.",
    radio: "Radio button group for mutually exclusive selections.",
    search: "Search input field with search icon and clear button.",
    slider: "Range slider for selecting numeric values.",
    switch: "Toggle switch for boolean on/off states.",
    textarea: "Multi-line text input with resize controls.",
    
    // Layout & containers
    card: "Flexible content container with header, content, and footer sections.",
    accordion: "Collapsible content sections with expand/collapse functionality.",
    collapsible: "Hide and show content with smooth animations.",
    separator: "Visual divider to separate content sections.",
    sheet: "Slide-out panel from the edge of the screen.",
    
    // Overlays & dialogs
    dialog: "Modal dialog overlay for focused interactions.",
    "alert-dialog": "Modal dialog for important confirmations and alerts.",
    drawer: "Slide-out drawer panel for navigation or actions.",
    popover: "Floating content panel anchored to an element.",
    tooltip: "Contextual information that appears on hover or focus.",
    "hover-card": "Rich content card that appears on hover.",
    "context-menu": "Right-click context menu with actions.",
    "dropdown-menu": "Dropdown menu with actions and submenus.",
    
    // Navigation
    tabs: "Tab navigation component with keyboard support.",
    "vertical-tabs": "Vertical tab navigation for side-by-side layouts.",
    menubar: "Menu bar with dropdown menus for desktop applications.",
    "navigation-menu": "Hierarchical navigation menu with submenus.",
    breadcrumb: "Navigation breadcrumb trail showing current location.",
    pagination: "Navigate through pages of content.",
    
    // Data display
    "data-table": "Sortable, filterable data table with pagination.",
    "data-grid": "Grid layout for displaying data with advanced features.",
    avatar: "User profile picture with fallback to initials.",
    "avatar-group": "Stack multiple avatars with overflow indicator.",
    chip: "Compact elements for tags, filters, or selections.",
    tag: "Label or category tag with remove functionality.",
    "status-badge": "Badge showing status with color coding.",
    "status-dot": "Small colored dot indicating status.",
    "key-value": "Display key-value pairs in a structured format.",
    list: "List component for displaying items vertically.",
    timeline: "Vertical timeline for chronological events.",
    tree: "Hierarchical tree view with expand/collapse.",
    
    // Feedback
    alert: "Prominent message to communicate important information.",
    banner: "Full-width announcement or notification banner.",
    toast: "Temporary notification that appears and dismisses.",
    progress: "Linear progress indicator showing completion.",
    "circular-progress": "Circular progress indicator or spinner.",
    spinner: "Loading spinner animation.",
    loading: "Generic loading state indicator.",
    skeleton: "Placeholder for content that is loading.",
    "empty-state": "Empty state illustration and message.",
    "error-state": "Error state illustration and message.",
    
    // Media & content
    image: "Image component with loading states and fallbacks.",
    code: "Syntax-highlighted code block component.",
    "keyboard-key": "Visual representation of keyboard keys.",
    "command-palette": "Command palette for quick actions and search.",
    
    // Data entry
    stepper: "Multi-step form or process indicator.",
    metric: "Display a metric or KPI with label and value.",
    stat: "Statistic display with optional trend indicator.",
    "aspect-ratio": "Container that maintains a specific aspect ratio.",
  }

  return descriptions[slug] || `A ${title} component for your application.`
}

// Generate default usage code
function getDefaultUsage(name: string, title: string): string {
  const componentName = title.replace(/\s+/g, "")
  return `import { ${componentName} } from "@/components/ui/${getSlugFromName(name)}"

export default function Example() {
  return <${componentName} />
}`
}

// Get default props based on component type
function getDefaultProps(slug: string): Array<{
  name: string
  type: string
  description: string
  default?: string
}> {
  type PropItem = {
    name: string
    type: string
    description: string
    default?: string
  }

  // Common props for most components
  const commonProps: PropItem[] = [
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply.",
    },
  ]

  // Component-specific props
  const specificProps: Record<string, PropItem[]> = {
    autocomplete: [
      { name: "value", type: "string", description: "The current value." },
      { name: "onChange", type: "(value: string) => void", description: "Change handler." },
      { name: "options", type: "string[]", description: "Autocomplete suggestions." },
      { name: "placeholder", type: "string", description: "Placeholder text." },
    ],
    badge: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "destructive"',
        default: '"default"',
        description: "Visual variant of the badge.",
      },
    ],
    checkbox: [
      { name: "checked", type: "boolean", description: "Whether the checkbox is checked." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Change handler." },
      { name: "disabled", type: "boolean", default: "false", description: "Whether the checkbox is disabled." },
    ],
    radio: [
      { name: "value", type: "string", description: "The value of this radio button." },
      { name: "checked", type: "boolean", description: "Whether the radio is checked." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Change handler." },
    ],
    slider: [
      { name: "value", type: "number[]", description: "The current value(s)." },
      { name: "onValueChange", type: "(value: number[]) => void", description: "Change handler." },
      { name: "min", type: "number", default: "0", description: "Minimum value." },
      { name: "max", type: "number", default: "100", description: "Maximum value." },
      { name: "step", type: "number", default: "1", description: "Step increment." },
    ],
    switch: [
      { name: "checked", type: "boolean", description: "Whether the switch is on." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Change handler." },
      { name: "disabled", type: "boolean", default: "false", description: "Whether the switch is disabled." },
    ],
    tabs: [
      { name: "defaultValue", type: "string", description: "The default active tab." },
      { name: "value", type: "string", description: "The controlled active tab." },
      { name: "onValueChange", type: "(value: string) => void", description: "Change handler." },
    ],
  }

  return [...commonProps, ...(specificProps[slug] || [])]
}

// Get default accessibility features
function getDefaultAccessibility(slug: string): string[] {
  const common = [
    "Keyboard accessible",
    "Screen reader friendly",
    "Focus visible with outline",
  ]

  const specific: Record<string, string[]> = {
    checkbox: ["Supports indeterminate state", "Proper ARIA attributes"],
    radio: ["Arrow key navigation within group", "Proper ARIA role"],
    slider: ["Arrow key adjustment", "Home/End key support"],
    switch: ["Space/Enter to toggle", "Proper ARIA role"],
    tabs: ["Arrow key navigation", "Home/End key support", "ARIA tabs pattern"],
    dialog: ["Focus trap", "Escape to close", "ARIA dialog role"],
  }

  return [...common, ...(specific[slug] || [])]
}

// Get related components
function getRelatedComponents(slug: string): string[] {
  const relations: Record<string, string[]> = {
    button: ["Button Group", "Icon Button"],
    "button-group": ["Button", "Icon Button"],
    "icon-button": ["Button", "Button Group"],
    input: ["Input Group", "Textarea", "Label"],
    "input-group": ["Input", "Search"],
    textarea: ["Input", "Label"],
    checkbox: ["Radio", "Switch"],
    radio: ["Checkbox", "Switch"],
    switch: ["Checkbox", "Radio"],
    select: ["Native Select", "Combobox"],
    "native-select": ["Select", "Combobox"],
    combobox: ["Select", "Autocomplete"],
    autocomplete: ["Combobox", "Search"],
    "date-picker": ["Date Range Picker", "Calendar"],
    "date-range-picker": ["Date Picker", "Calendar"],
    calendar: ["Date Picker", "Date Range Picker"],
    badge: ["Card"],
    card: ["Badge"],
    dialog: ["Tabs"],
    tabs: ["Dialog"],
  }

  return relations[slug] || []
}
