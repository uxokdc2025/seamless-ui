"use client"

import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { Input } from "@seamless/ui"
import { Search, Mail, Eye, EyeOff, Lock } from "lucide-react"

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
        sourceFiles={[
          {
            path: "ui/input.tsx",
            content: `import * as React from "react"
import { cn } from "./lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
          },
        ]}
        designGuidance={{
          whenToUse: [
            "For collecting short, single-line text input from users",
            "When users need to enter data like names, emails, passwords, or search queries",
            "In forms where structured data entry is required",
          ],
          spacing: "Use consistent height (default: h-10) with adequate padding (px-3 py-2). Maintain at least 16px vertical spacing between stacked inputs.",
          typography: "Placeholder text should be concise and descriptive. Use sentence case for labels and title case for placeholder hints.",
          colors: "Use border-input for default state, ring-ring for focus state, and border-destructive for error states. Disabled inputs should have reduced opacity (0.5).",
          other: [
            "Always pair inputs with visible labels for accessibility",
            "Use appropriate input types (email, tel, number) to trigger correct mobile keyboards",
            "Provide clear error messages when validation fails",
            "Consider max-width constraints for better readability (email, phone inputs shouldn't span full viewport width)",
          ],
        }}
        dos={[
          "Use descriptive placeholder text that provides examples (\"you@example.com\")",
          "Pair inputs with clear labels using htmlFor/id association",
          "Use appropriate type attributes for better UX and validation (email, tel, number, search)",
          "Provide visual feedback for focus, error, and disabled states",
          "Use autocomplete attributes to help users fill forms faster",
          "Make inputs large enough for easy interaction (minimum 44px height on mobile)",
        ]}
        donts={[
          "Don't use placeholder as a replacement for a label",
          "Don't make inputs too wide - constrain width for readability",
          "Don't use generic error messages - be specific about what's wrong",
          "Don't disable inputs without explaining why they're disabled",
          "Don't forget to handle edge cases (empty, whitespace-only, very long input)",
          "Don't use password type for non-sensitive data (reduces usability)",
        ]}
        props={[
          {
            name: "type",
            type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url" | "date" | "time" | "datetime-local" | "file"',
            default: '"text"',
            description: "The HTML input type",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder text displayed when input is empty",
          },
          {
            name: "value",
            type: "string",
            description: "Controlled value of the input",
          },
          {
            name: "defaultValue",
            type: "string",
            description: "Default uncontrolled value",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the input is disabled and non-interactive",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Whether the input is required for form submission",
          },
          {
            name: "readOnly",
            type: "boolean",
            default: "false",
            description: "Whether the input is read-only",
          },
          {
            name: "autoComplete",
            type: "string",
            description: "HTML autocomplete attribute for browser suggestions",
          },
          {
            name: "onChange",
            type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
            description: "Callback fired when input value changes",
          },
        ]}
        variants={[
          {
            name: "Text",
            description: "Default text input for general purpose text entry.",
            preview: <Input type="text" placeholder="Enter text..." />,
          },
          {
            name: "Email",
            description: "Email input with built-in validation and keyboard optimization on mobile.",
            preview: <Input type="email" placeholder="you@example.com" />,
          },
          {
            name: "Password",
            description: "Password input that masks entered characters for security.",
            preview: <Input type="password" placeholder="Enter password" />,
          },
          {
            name: "Number",
            description: "Numeric input with increment/decrement controls.",
            preview: <Input type="number" placeholder="Enter a number" />,
          },
          {
            name: "Search",
            description: "Search input with optimized keyboard and styling.",
            preview: <Input type="search" placeholder="Search..." />,
          },
          {
            name: "Tel",
            description: "Telephone input optimized for phone number entry.",
            preview: <Input type="tel" placeholder="+1 (555) 000-0000" />,
          },
        ]}
        examples={[
          {
            title: "Basic Input",
            description: "Default text input for general text entry.",
            preview: <Input placeholder="Enter your name" />,
            code: `<Input placeholder="Enter your name" />`,
          },
          {
            title: "With Label",
            description: "Input with associated label for better accessibility.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            ),
            code: `<div className="flex flex-col gap-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
          },
          {
            title: "With Icon (Search)",
            description: "Input with leading icon for visual context.",
            preview: (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Search..." />
              </div>
            ),
            code: `<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" placeholder="Search..." />
</div>`,
          },
          {
            title: "With Icon (Email)",
            description: "Email input with leading mail icon.",
            preview: (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" type="email" placeholder="you@example.com" />
              </div>
            ),
            code: `<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input className="pl-10" type="email" placeholder="you@example.com" />
</div>`,
          },
          {
            title: "Password Input",
            description: "Password field with masked characters.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
            ),
            code: `<Input type="password" placeholder="Enter password" />`,
          },
          {
            title: "Number Input",
            description: "Numeric input with browser controls.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <Input id="quantity" type="number" placeholder="0" min="0" max="100" />
              </div>
            ),
            code: `<Input type="number" placeholder="0" min="0" max="100" />`,
          },
          {
            title: "Disabled State",
            description: "Disabled input that is non-interactive with reduced opacity.",
            preview: (
              <div className="space-y-4">
                <Input placeholder="Disabled empty" disabled />
                <Input placeholder="Disabled with value" defaultValue="Cannot edit this" disabled />
              </div>
            ),
            code: `<Input placeholder="Disabled" disabled />
<Input defaultValue="Cannot edit" disabled />`,
          },
          {
            title: "Read-Only State",
            description: "Read-only input that displays but doesn't allow editing.",
            preview: <Input defaultValue="Read-only value" readOnly />,
            code: `<Input defaultValue="Read-only value" readOnly />`,
          },
          {
            title: "With Error State",
            description: "Input with error styling using custom class.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="email-error" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email-error"
                  type="email"
                  placeholder="you@example.com"
                  className="border-destructive focus-visible:ring-destructive"
                  defaultValue="invalid-email"
                />
                <p className="text-sm text-destructive">Please enter a valid email address</p>
              </div>
            ),
            code: `<Input
  type="email"
  className="border-destructive focus-visible:ring-destructive"
  defaultValue="invalid-email"
/>
<p className="text-sm text-destructive">
  Please enter a valid email address
</p>`,
          },
          {
            title: "File Upload",
            description: "File input for uploading documents and media.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="file" className="text-sm font-medium">
                  Upload file
                </label>
                <Input id="file" type="file" />
              </div>
            ),
            code: `<Input type="file" />`,
          },
          {
            title: "Date Input",
            description: "Date picker input with native browser controls.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Select date
                </label>
                <Input id="date" type="date" />
              </div>
            ),
            code: `<Input type="date" />`,
          },
          {
            title: "Width Variants",
            description: "Inputs can be sized using utility classes.",
            preview: (
              <div className="space-y-4">
                <Input className="w-full" placeholder="Full width (default)" />
                <Input className="w-80" placeholder="Fixed width (20rem)" />
                <Input className="w-64" placeholder="Medium width (16rem)" />
                <Input className="w-48" placeholder="Small width (12rem)" />
              </div>
            ),
            code: `<Input className="w-full" placeholder="Full width" />
<Input className="w-80" placeholder="Fixed width" />
<Input className="w-64" placeholder="Medium width" />`,
          },
        ]}
        accessibility={[
          "Uses semantic <input> element",
          "Keyboard accessible with native browser controls",
          "Focus visible with ring outline",
          "Disabled state prevents interaction and reduces opacity",
          "Supports aria-label, aria-describedby for additional context",
          "Type attribute provides appropriate mobile keyboards",
          "Proper label association via htmlFor/id",
        ]}
        keyboard={[
          { key: "Tab", description: "Move focus to next element" },
          { key: "Shift + Tab", description: "Move focus to previous element" },
          { key: "Ctrl + A / Cmd + A", description: "Select all text" },
          { key: "Ctrl + C / Cmd + C", description: "Copy selected text" },
          { key: "Ctrl + V / Cmd + V", description: "Paste text" },
        ]}
        related={["FormField", "Label", "Textarea", "PasswordInput", "InputGroup"]}
        storybookUrl="https://storybook.goseamless.ai/?path=/story/ui-input--default"
      />
    </DocsShell>
  )
}
