"use client"

import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@seamless/ui"

export default function SelectPage() {
  return (
    <DocsShell title="Select">
      <ComponentPage
        name="Select"
        description="A custom select dropdown built with Radix UI. Provides better styling, animations, and accessibility than native selects with full keyboard navigation support."
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
        usage={`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

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
        sourceFiles={[
          {
            path: "ui/select.tsx",
            content: `import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "./lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className={cn("p-1")}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}`,
          },
        ]}
        designGuidance={{
          whenToUse: [
            "When users need to choose one option from a list of 3-15 items",
            "For selections where all options should be visible at once when opened",
            "When you need better styling and animation control than native <select>",
            "In forms where consistent cross-browser appearance is important",
          ],
          spacing: "Match input height (h-10) for visual consistency in forms. Use appropriate trigger width based on content length - avoid overly narrow or wide selects.",
          typography: "Use sentence case for options. Keep option text concise (1-3 words ideally). Group labels should be short and descriptive.",
          colors: "Follow input color patterns: border-input for default, ring-ring for focus, disabled state at 50% opacity. Selected items show check indicator and accent background.",
          other: [
            "For very long lists (>15 items), consider a searchable Combobox instead",
            "Use SelectGroup and SelectLabel to organize related options",
            "Provide a clear placeholder when no default value is set",
            "Consider using SelectSeparator to visually divide option groups",
          ],
        }}
        dos={[
          "Use clear, scannable option labels",
          "Set a sensible default value when appropriate",
          "Provide descriptive placeholder text (\"Choose a country...\")",
          "Group related options with SelectGroup and SelectLabel",
          "Set appropriate trigger width with className (w-48, w-64, etc.)",
          "Use disabled prop on specific SelectItems to show unavailable options",
        ]}
        donts={[
          "Don't use for binary choices - use a Switch or Radio Group instead",
          "Don't make lists too long (>15 items) - consider Combobox with search",
          "Don't use vague placeholders like \"Select...\"",
          "Don't forget to handle the unselected state in forms",
          "Don't make the trigger too narrow - options should fit comfortably",
          "Don't use select for navigation - use proper links or navigation components",
        ]}
        props={[
          {
            name: "value",
            type: "string",
            description: "Controlled value of the select",
          },
          {
            name: "defaultValue",
            type: "string",
            description: "Default uncontrolled value",
          },
          {
            name: "onValueChange",
            type: "(value: string) => void",
            description: "Callback fired when the selected value changes",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the select is disabled and non-interactive",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Whether selection is required for form submission",
          },
          {
            name: "name",
            type: "string",
            description: "Form field name for form submission",
          },
          {
            name: "open",
            type: "boolean",
            description: "Controlled open state of the dropdown",
          },
          {
            name: "onOpenChange",
            type: "(open: boolean) => void",
            description: "Callback fired when dropdown open state changes",
          },
        ]}
        variants={[
          {
            name: "Default Width",
            description: "Select with auto width based on trigger content.",
            preview: (
              <Select defaultValue="option1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            ),
          },
          {
            name: "Fixed Width",
            description: "Select with fixed width for consistent sizing.",
            preview: (
              <Select defaultValue="small">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            ),
          },
          {
            name: "Full Width",
            description: "Select that spans the full width of its container.",
            preview: (
              <Select defaultValue="1">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Full Width Option 1</SelectItem>
                  <SelectItem value="2">Full Width Option 2</SelectItem>
                </SelectContent>
              </Select>
            ),
          },
          {
            name: "With Placeholder",
            description: "Select with placeholder text when no value is selected.",
            preview: (
              <Select>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Choose an option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Choice A</SelectItem>
                  <SelectItem value="b">Choice B</SelectItem>
                  <SelectItem value="c">Choice C</SelectItem>
                </SelectContent>
              </Select>
            ),
          },
        ]}
        examples={[
          {
            title: "Basic Select",
            description: "Simple select with a few options.",
            preview: (
              <Select defaultValue="apple">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                </SelectContent>
              </Select>
            ),
            code: `<Select defaultValue="apple">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`,
          },
          {
            title: "With Label",
            description: "Select with associated label for better accessibility.",
            preview: (
              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-sm font-medium">
                  Country
                </label>
                <Select defaultValue="us">
                  <SelectTrigger id="country" className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ),
            code: `<div className="flex flex-col gap-2">
  <label htmlFor="country" className="text-sm font-medium">
    Country
  </label>
  <Select defaultValue="us">
    <SelectTrigger id="country" className="w-64">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
    </SelectContent>
  </Select>
</div>`,
          },
          {
            title: "With Groups",
            description: "Organize options into labeled groups.",
            preview: (
              <Select defaultValue="apple">
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select food" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="carrot">Carrot</SelectItem>
                    <SelectItem value="broccoli">Broccoli</SelectItem>
                    <SelectItem value="spinach">Spinach</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ),
            code: `<Select>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="Select food" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="broccoli">Broccoli</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
          },
          {
            title: "Disabled Items",
            description: "Some items can be disabled to prevent selection.",
            preview: (
              <Select defaultValue="basic">
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Plan</SelectItem>
                  <SelectItem value="pro">Pro Plan</SelectItem>
                  <SelectItem value="enterprise" disabled>
                    Enterprise (Contact Sales)
                  </SelectItem>
                </SelectContent>
              </Select>
            ),
            code: `<Select>
  <SelectTrigger className="w-64">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="basic">Basic Plan</SelectItem>
    <SelectItem value="pro">Pro Plan</SelectItem>
    <SelectItem value="enterprise" disabled>
      Enterprise (Contact Sales)
    </SelectItem>
  </SelectContent>
</Select>`,
          },
          {
            title: "Disabled State",
            description: "Entire select can be disabled to prevent interaction.",
            preview: (
              <div className="space-y-4">
                <Select disabled defaultValue="option1">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Disabled with no value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ),
            code: `<Select disabled defaultValue="option1">
  <SelectTrigger className="w-64">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`,
          },
          {
            title: "Long List",
            description: "Select handles long lists with scrolling.",
            preview: (
              <Select defaultValue="5">
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Option {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
            code: `<Select defaultValue="5">
  <SelectTrigger className="w-64">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {Array.from({ length: 20 }, (_, i) => (
      <SelectItem key={i} value={String(i)}>
        Option {i}
      </SelectItem>
    ))}
  </SelectContent>
</Select>`,
          },
          {
            title: "Width Variants",
            description: "Different width options for various layouts.",
            preview: (
              <div className="space-y-4">
                <Select defaultValue="1">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Full width</SelectItem>
                    <SelectItem value="2">Spans container</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="1">
                  <SelectTrigger className="w-80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Large (20rem)</SelectItem>
                    <SelectItem value="2">Fixed width</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="1">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Medium (12rem)</SelectItem>
                    <SelectItem value="2">Standard size</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="1">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Small (8rem)</SelectItem>
                    <SelectItem value="2">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ),
            code: `<Select>
  <SelectTrigger className="w-full">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>

<Select>
  <SelectTrigger className="w-48">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>...</SelectContent>
</Select>`,
          },
          {
            title: "Form Integration",
            description: "Select works seamlessly in forms with name attribute.",
            preview: (
              <form className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Select your role
                  </label>
                  <Select name="role" defaultValue="developer">
                    <SelectTrigger id="role" className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            ),
            code: `<form>
  <label htmlFor="role">Select your role</label>
  <Select name="role" defaultValue="developer">
    <SelectTrigger id="role" className="w-64">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="developer">Developer</SelectItem>
      <SelectItem value="designer">Designer</SelectItem>
      <SelectItem value="manager">Manager</SelectItem>
    </SelectContent>
  </Select>
</form>`,
          },
        ]}
        accessibility={[
          "Full keyboard navigation support",
          "ARIA attributes for screen readers (role, aria-expanded, aria-controls)",
          "Focus management with visible focus indicators",
          "Disabled state handling prevents interaction",
          "Proper labeling support via htmlFor/id",
          "Type-ahead search to quickly find options",
          "Screen reader announces selected value and state changes",
        ]}
        keyboard={[
          { key: "Enter / Space", description: "Open/close the dropdown" },
          { key: "↑ / ↓", description: "Navigate between options" },
          { key: "Home", description: "Jump to first option" },
          { key: "End", description: "Jump to last option" },
          { key: "Esc", description: "Close dropdown and return focus" },
          { key: "Tab", description: "Move to next focusable element" },
          { key: "Shift + Tab", description: "Move to previous focusable element" },
          { key: "Type character(s)", description: "Jump to option starting with typed text" },
        ]}
        related={["NativeSelect", "Combobox", "Autocomplete", "RadioGroup"]}
        storybookUrl="https://storybook.goseamless.ai/?path=/story/ui-select--default"
      />
    </DocsShell>
  )
}
