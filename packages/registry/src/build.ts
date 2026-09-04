import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { RegistryItem, RegistryIndex } from "./schema"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REGISTRY_DIR = path.join(__dirname, "..")
const PACKAGES_DIR = path.join(REGISTRY_DIR, "..")
const OUTPUT_DIR = path.join(REGISTRY_DIR, "dist")

// Component metadata mappings
const UI_COMPONENTS = [
  { name: "button", deps: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"] },
  { name: "button-group", deps: [] },
  { name: "input", deps: [] },
  { name: "textarea", deps: [] },
  { name: "label", deps: ["@radix-ui/react-label"] },
  { name: "checkbox", deps: ["@radix-ui/react-checkbox"] },
  { name: "radio", deps: ["@radix-ui/react-radio-group"] },
  { name: "switch", deps: ["@radix-ui/react-switch"] },
  { name: "select", deps: ["@radix-ui/react-select"] },
  { name: "native-select", deps: [] },
  { name: "combobox", deps: ["@radix-ui/react-popover", "lucide-react"] },
  { name: "autocomplete", deps: ["@radix-ui/react-popover"] },
  { name: "slider", deps: ["@radix-ui/react-slider"] },
  { name: "badge", deps: [] },
  { name: "card", deps: [] },
  { name: "dialog", deps: ["@radix-ui/react-dialog"] },
  { name: "tabs", deps: ["@radix-ui/react-tabs"] },
  { name: "calendar", deps: ["react-day-picker", "date-fns"] },
  { name: "date-picker", deps: ["@radix-ui/react-popover", "react-day-picker", "date-fns"], registryDeps: ["calendar", "button"] },
  { name: "date-range-picker", deps: ["@radix-ui/react-popover", "react-day-picker", "date-fns"], registryDeps: ["calendar", "button"] },
  { name: "file-upload", deps: ["lucide-react"] },
  { name: "form-field", deps: [] },
  { name: "icon-button", deps: [], registryDeps: ["button"] },
  { name: "input-group", deps: [] },
  { name: "number-input", deps: [], registryDeps: ["input"] },
  { name: "otp-input", deps: [] },
  { name: "password-input", deps: ["lucide-react"], registryDeps: ["input"] },
  { name: "search", deps: ["lucide-react"], registryDeps: ["input"] },
]

const LAYOUT_COMPONENTS = [
  { name: "container", deps: [] },
  { name: "stack", deps: [] },
  { name: "inline", deps: [] },
  { name: "cluster", deps: [] },
  { name: "grid", deps: [] },
  { name: "columns", deps: [] },
  { name: "split", deps: [] },
  { name: "sidebar", deps: [] },
  { name: "sidebar-layout", deps: [], registryDeps: ["@seamless/layout/sidebar"] },
  { name: "scroll-area", deps: [] },
  { name: "page-shell", deps: [] },
  { name: "workspace", deps: [] },
  { name: "dashboard-grid", deps: [] },
  { name: "resizable-panels", deps: ["react-resizable-panels"] },
]

const SAAS_COMPONENTS = [
  { name: "app-shell", deps: [], registryDeps: ["@seamless/layout/sidebar"] },
  { name: "navigation", deps: [] },
  { name: "nav-group", deps: [] },
  { name: "nav-item", deps: [] },
]

const AI_COMPONENTS = [
  { name: "agent-card", deps: [], registryDeps: ["@seamless/ui/card", "@seamless/ui/badge"] },
]

const BLOCKS = [
  { name: "dashboard-01", deps: [], registryDeps: ["@seamless/ui/card", "@seamless/layout/grid"] },
]

function readComponentFile(packageName: string, componentName: string): string {
  const filePath = path.join(PACKAGES_DIR, packageName, "src", `${componentName}.tsx`)
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Component file not found: ${filePath}`)
    return ""
  }
  return fs.readFileSync(filePath, "utf-8")
}

function readUtilsFile(packageName: string): string | null {
  const filePath = path.join(PACKAGES_DIR, packageName, "src", "lib", "utils.ts")
  if (!fs.existsSync(filePath)) {
    return null
  }
  return fs.readFileSync(filePath, "utf-8")
}

function createRegistryItem(
  name: string,
  type: RegistryItem["type"],
  packageName: string,
  deps: string[] = [],
  registryDeps: string[] = []
): RegistryItem {
  const content = readComponentFile(packageName, name)
  const files: RegistryItem["files"] = [
    {
      path: `registry/default/${packageName}/${name}.tsx`,
      type: "registry:component",
      content,
    },
  ]

  // Add utils file for ui components if not already a dependency
  if (packageName === "ui" && !registryDeps.includes("@seamless/ui/utils")) {
    const utilsContent = readUtilsFile(packageName)
    if (utilsContent) {
      files.push({
        path: `registry/default/${packageName}/lib/utils.ts`,
        type: "registry:lib",
        target: "@/lib/utils.ts",
        content: utilsContent,
      })
    }
  }

  return {
    name: `@seamless/${packageName}/${name}`,
    type,
    title: name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    dependencies: deps.length > 0 ? deps : undefined,
    registryDependencies: registryDeps.length > 0 ? registryDeps : undefined,
    files,
  }
}

function buildRegistry(): RegistryIndex {
  const items: RegistryItem[] = []

  // UI Components
  for (const { name, deps = [], registryDeps = [] } of UI_COMPONENTS) {
    items.push(createRegistryItem(name, "registry:ui", "ui", deps, registryDeps))
  }

  // Layout Components
  for (const { name, deps = [], registryDeps = [] } of LAYOUT_COMPONENTS) {
    items.push(createRegistryItem(name, "registry:layout", "layout", deps, registryDeps))
  }

  // SaaS Components
  for (const { name, deps = [], registryDeps = [] } of SAAS_COMPONENTS) {
    items.push(createRegistryItem(name, "registry:saas", "saas", deps, registryDeps))
  }

  // AI Components
  for (const { name, deps = [], registryDeps = [] } of AI_COMPONENTS) {
    items.push(createRegistryItem(name, "registry:ai", "ai", deps, registryDeps))
  }

  // Blocks
  for (const { name, deps = [], registryDeps = [] } of BLOCKS) {
    items.push(createRegistryItem(name, "registry:block", "blocks", deps, registryDeps))
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "seamless",
    homepage: "https://seamless-ui.dev",
    items,
  }
}

// Build and write registry
function main() {
  const registry = buildRegistry()

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // Write main registry.json
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "registry.json"),
    JSON.stringify(registry, null, 2)
  )

  // Write individual component files for each namespace
  const namespaces = ["ui", "layout", "saas", "ai", "blocks", "themes"]
  for (const ns of namespaces) {
    const nsItems = (registry.items || []).filter(item => item.name.startsWith(`@seamless/${ns}/`))
    if (nsItems.length > 0) {
      const nsRegistry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: `seamless-${ns}`,
        homepage: "https://seamless-ui.dev",
        items: nsItems,
      }
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${ns}.json`),
        JSON.stringify(nsRegistry, null, 2)
      )
    }
  }

  console.log(`✓ Built registry with ${registry.items?.length || 0} components`)
  console.log(`✓ Output: ${OUTPUT_DIR}/registry.json`)
}

main()
