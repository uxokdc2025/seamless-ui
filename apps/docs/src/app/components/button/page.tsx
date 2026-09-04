"use client"

import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { Button } from "@seamless/ui"
import { ArrowRight, Download, Trash2 } from "lucide-react"

export default function ButtonPage() {
  return (
    <DocsShell title="Button">
      <ComponentPage
        name="Button"
        description="A customizable button component with multiple variants, sizes, and states. Supports icon placement and loading states."
        preview={<Button>Click me</Button>}
        installCommand="pnpm dlx shadcn@latest add @seamless/ui/button"
        usage={`import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button>Click me</Button>
}`}
        props={[
          {
            name: "variant",
            type: '"default" | "secondary" | "outline" | "ghost" | "link" | "destructive"',
            default: '"default"',
            description: "The visual style variant of the button.",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg" | "icon"',
            default: '"md"',
            description: "The size of the button.",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the button is disabled.",
          },
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Shows a loading spinner when true.",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Render as a child element (uses Radix Slot).",
          },
        ]}
        variants={[
          {
            name: "Default",
            description: "The primary button style with solid background.",
            preview: <Button>Default</Button>,
          },
          {
            name: "Secondary",
            description: "A secondary style for less prominent actions.",
            preview: <Button variant="secondary">Secondary</Button>,
          },
          {
            name: "Outline",
            description: "Outlined button with transparent background.",
            preview: <Button variant="outline">Outline</Button>,
          },
          {
            name: "Ghost",
            description: "Minimal button with no background until hover.",
            preview: <Button variant="ghost">Ghost</Button>,
          },
          {
            name: "Link",
            description: "Styled like a text link.",
            preview: <Button variant="link">Link</Button>,
          },
          {
            name: "Destructive",
            description: "For destructive or dangerous actions.",
            preview: <Button variant="destructive">Destructive</Button>,
          },
        ]}
        examples={[
          {
            title: "Sizes",
            description: "Buttons come in three sizes: small, medium (default), and large.",
            preview: (
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            ),
            code: `<Button size="sm">Small</Button>
<Button>Medium</Button>
<Button size="lg">Large</Button>`,
          },
          {
            title: "With Icons",
            description: "Add icons to buttons for better visual communication.",
            preview: (
              <div className="flex items-center gap-4">
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ),
            code: `<Button className="gap-2">
  <Download className="h-4 w-4" />
  Download
</Button>
<Button variant="outline" className="gap-2">
  Continue
  <ArrowRight className="h-4 w-4" />
</Button>`,
          },
          {
            title: "Icon Only",
            description: "Use the icon size variant for buttons with only an icon.",
            preview: (
              <div className="flex items-center gap-4">
                <Button size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ),
            code: `<Button size="icon">
  <Download className="h-4 w-4" />
</Button>`,
          },
          {
            title: "Disabled State",
            description: "Disabled buttons are not interactive and have reduced opacity.",
            preview: (
              <div className="flex items-center gap-4">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </div>
            ),
            code: `<Button disabled>Disabled</Button>`,
          },
        ]}
        accessibility={[
          "Uses semantic <button> element",
          "Keyboard accessible via Tab navigation",
          "Focus visible with outline",
          "Disabled state prevents interaction",
          "ARIA attributes for loading state",
        ]}
        keyboard={[
          { key: "Enter", description: "Activate the button" },
          { key: "Space", description: "Activate the button" },
          { key: "Tab", description: "Move focus to the next focusable element" },
          { key: "Shift + Tab", description: "Move focus to the previous focusable element" },
        ]}
        related={["IconButton", "ButtonGroup"]}
        storybookUrl="https://storybook.goseamless.ai/?path=/story/ui-button--default"
      />
    </DocsShell>
  )
}
