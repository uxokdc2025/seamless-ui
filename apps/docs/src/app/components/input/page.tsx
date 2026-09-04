"use client"

import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { Input } from "@seamless/ui"

export default function InputPage() {
  return (
    <DocsShell title="Input">
      <ComponentPage
        name="Input"
        description="A text input field for collecting user input. Supports various types, sizes, and states including disabled and error states."
        preview={<Input placeholder="Enter text..." />}
        installCommand="pnpm dlx shadcn@latest add @seamless/ui/input"
        usage={`import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input placeholder="Enter text..." />
}`}
        props={[
          {
            name: "type",
            type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url"',
            default: '"text"',
            description: "The input type",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder text",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the input is disabled",
          },
          {
            name: "error",
            type: "boolean",
            default: "false",
            description: "Whether the input has an error state",
          },
        ]}
        examples={[
          {
            title: "Basic Input",
            description: "Default text input",
            preview: <Input placeholder="Enter your name" />,
            code: `<Input placeholder="Enter your name" />`,
          },
          {
            title: "Email Input",
            description: "Email input with validation",
            preview: <Input type="email" placeholder="you@example.com" />,
            code: `<Input type="email" placeholder="you@example.com" />`,
          },
          {
            title: "Disabled State",
            description: "Disabled input field",
            preview: <Input placeholder="Disabled" disabled />,
            code: `<Input placeholder="Disabled" disabled />`,
          },
        ]}
        accessibility={[
          "Semantic <input> element",
          "Keyboard accessible",
          "ARIA attributes for error states",
          "Proper label association support",
        ]}
        keyboard={[
          { key: "Tab", description: "Move focus to next element" },
          { key: "Shift + Tab", description: "Move focus to previous element" },
        ]}
        related={["FormField", "Label", "Textarea", "PasswordInput"]}
        storybookUrl="https://storybook.goseamless.ai/?path=/story/ui-input--default"
      />
    </DocsShell>
  )
}
