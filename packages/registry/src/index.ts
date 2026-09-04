// Registry schema for shadcn-compatible component distribution
export interface ComponentRegistry {
  name: string
  type: "components:ui" | "components:layout" | "components:saas" | "components:ai" | "blocks" | "themes"
  dependencies: string[]
  files: Array<{
    name: string
    content: string
  }>
  tailwind?: {
    config?: any
    css?: string[]
  }
}

export const registry: ComponentRegistry[] = [
  {
    name: "button",
    type: "components:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        name: "components/ui/button.tsx",
        content: "// Button component implementation"
      }
    ]
  },
  {
    name: "dashboard-01",
    type: "blocks",
    dependencies: ["@seamless/ui", "@seamless/layout"],
    files: [
      {
        name: "blocks/dashboard-01.tsx",
        content: "// Dashboard block implementation"
      }
    ]
  }
]

export function getComponent(name: string): ComponentRegistry | undefined {
  return registry.find(component => component.name === name)
}

export function getComponentsByType(type: ComponentRegistry["type"]): ComponentRegistry[] {
  return registry.filter(component => component.type === type)
}