"use client"

import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@seamless/ui"

export default function SelectPage() {
  return (
    <DocsShell title="Select">
      <ComponentPage
        name="Select"
        description="A custom select dropdown built with Radix UI. Provides better styling and accessibility than native selects."
        preview={
          <Select defaultValue="1">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
              <SelectItem value="2">Option 2</SelectItem>
              <SelectItem value="3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        }
        installCommand="pnpm dlx shadcn@latest add @seamless/ui/select"
        usage={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  )
}`}
        props={[
          {
            name: "value",
            type: "string",
            description: "Controlled value",
          },
          {
            name: "defaultValue",
            type: "string",
            description: "Default uncontrolled value",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            description: "Callback when value changes",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the select is disabled",
          },
        ]}
        accessibility={[
          "Full keyboard navigation",
          "ARIA attributes for screen readers",
          "Focus management",
          "Disabled state handling",
        ]}
        keyboard={[
          { key: "Enter / Space", description: "Open/close the dropdown" },
          { key: "↑ / ↓", description: "Navigate options" },
          { key: "Esc", description: "Close dropdown" },
          { key: "Tab", description: "Move to next element" },
        ]}
        related={["NativeSelect", "Combobox", "Autocomplete"]}
        storybookUrl="https://storybook.goseamless.ai/?path=/story/ui-select--default"
      />
    </DocsShell>
  )
}
