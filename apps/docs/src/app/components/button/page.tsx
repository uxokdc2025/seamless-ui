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
        sourceFiles={[
          {
            path: "ui/button.tsx",
            content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-lg transform hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
          },
        ]}
        designGuidance={{
          whenToUse: [
            "For primary actions that complete a flow (submit forms, confirm dialogs)",
            "For navigation to important destinations",
            "When users need a clear call-to-action",
          ],
          spacing: "Use consistent padding (default: h-10 px-4 py-2). Maintain at least 8px between adjacent buttons.",
          typography: "Text should be sentence case, concise (1-3 words ideally), and action-oriented.",
          colors: "Use 'default' variant for primary actions, 'outline' or 'ghost' for secondary actions, and 'destructive' only for irreversible actions.",
          other: [
            "Disabled buttons should clearly indicate why they are disabled",
            "Loading states should prevent multiple submissions",
            "Icon-only buttons must have proper aria-label attributes",
          ],
        }}
        dos={[
          "Use clear, action-oriented labels (\"Save changes\", \"Delete account\")",
          "Provide visual feedback on hover and active states",
          "Use the appropriate variant for the action hierarchy",
          "Include icons when they aid comprehension",
          "Make buttons large enough to be easily tappable (minimum 44x44px on mobile)",
        ]}
        donts={[
          "Don't use more than one primary (default) button in the same context",
          "Don't use vague labels like \"Click here\" or \"Submit\"",
          "Don't make destructive actions too easy to trigger accidentally",
          "Don't use buttons for navigation - use links instead (except for important CTAs)",
          "Don't disable buttons without explaining why",
        ]}
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
