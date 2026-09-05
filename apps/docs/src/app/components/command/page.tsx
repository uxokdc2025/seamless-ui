"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut, Button } from "@seamless/ui"
import { Copy, Check as CheckIcon, Calendar, Smile, Calculator, User, CreditCard, Settings } from "lucide-react"

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy to clipboard"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {copied ? <CheckIcon style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 48,
          overflowX: "auto",
          fontFamily: mono,
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-foreground)",
        }}
      >
        <code style={{ fontFamily: mono }}>{code}</code>
      </pre>
    </div>
  )
}

function InstallBlock({ command }: { command: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        padding: "12px 16px",
      }}
    >
      <span style={{ color: "var(--color-muted-foreground)", fontFamily: mono, fontSize: 13 }}>$</span>
      <code style={{ flex: 1, fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", overflowX: "auto" }}>
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  )
}

function Preview({ children, minHeight = 320 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight,
          padding: 32,
          background: "var(--color-muted)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, color: "var(--color-foreground)" }}>{title}</h2>
      {children}
    </section>
  )
}

function ExampleBlock({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: "var(--color-foreground)" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginTop: 0, marginBottom: 12 }}>
        {description}
      </p>
      <div style={{ marginBottom: 12 }}>
        <Preview minHeight={200}>{children}</Preview>
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function Tree({ code }: { code: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 16,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        fontFamily: mono,
        fontSize: 13,
        lineHeight: 1.6,
        color: "var(--color-muted-foreground)",
        overflowX: "auto",
      }}
    >
      <code style={{ fontFamily: mono }}>{code}</code>
    </pre>
  )
}

function PropsTable({ rows }: { rows: { prop: string; type: string; def: string; description: string }[] }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 640 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  fontWeight: 600,
                  color: "var(--color-foreground)",
                  borderBottom: "1px solid var(--color-border)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.prop} style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", whiteSpace: "nowrap" }}>
                {r.prop}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)" }}>
                {r.type}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)", whiteSpace: "nowrap" }}>
                {r.def}
              </td>
              <td style={{ padding: "10px 16px", color: "var(--color-muted-foreground)" }}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-foreground)", margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", marginTop: 8, marginBottom: 0 }}>{description}</p>
    </div>
  )
}

function ApiHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "24px 0 10px", fontFamily: mono, color: "var(--color-foreground)" }}>
      {children}
    </h3>
  )
}


function CommandMenu() {
  return (
    <Command style={{ width: 380, border: "1px solid var(--color-border)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings style={{ width: 16, height: 16, marginRight: 8 }} />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command menu
      </Button>
      <p style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 10 }}>
        or press <kbd style={{ fontFamily: mono }}>⌘</kbd> + <kbd style={{ fontFamily: mono }}>K</kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar style={{ width: 16, height: 16, marginRight: 8 }} />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile style={{ width: 16, height: 16, marginRight: 8 }} />
              <span>Search Emoji</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default function CommandPage() {
  return (
    <DocsShell title="Command">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Command"
          description="Fast, composable, unstyled command menu for React. Built on cmdk."
        />

        <Preview>
          <CommandMenu />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/command" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@seamless/ui"

export function Example() {
  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<Command>
  <CommandInput />
  <CommandList>
    <CommandEmpty />
    <CommandGroup>
      <CommandItem>
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
  </CommandList>
</Command>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Dialog"
            description="Render the command menu inside a dialog, toggled with a keyboard shortcut."
            code={`const [open, setOpen] = React.useState(false)

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
          >
            <CommandDialogDemo />
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <ApiHeading>Command</ApiHeading>
          <PropsTable
            rows={[
              { prop: "value", type: "string", def: "-", description: "The controlled value of the highlighted item." },
              { prop: "onValueChange", type: "(value: string) => void", def: "-", description: "Callback fired when the highlighted value changes." },
              { prop: "shouldFilter", type: "boolean", def: "true", description: "Whether the menu filters items automatically." },
              { prop: "loop", type: "boolean", def: "false", description: "Whether keyboard navigation loops around the list." },
            ]}
          />
          <ApiHeading>CommandInput</ApiHeading>
          <PropsTable
            rows={[
              { prop: "value", type: "string", def: "-", description: "The controlled search query." },
              { prop: "onValueChange", type: "(value: string) => void", def: "-", description: "Callback fired when the query changes." },
              { prop: "placeholder", type: "string", def: "-", description: "Placeholder text for the search input." },
            ]}
          />
          <ApiHeading>CommandItem</ApiHeading>
          <PropsTable
            rows={[
              { prop: "value", type: "string", def: "-", description: "Value used for filtering and selection." },
              { prop: "onSelect", type: "(value: string) => void", def: "-", description: "Callback fired when the item is selected." },
              { prop: "disabled", type: "boolean", def: "false", description: "Prevents the item from being selected." },
            ]}
          />
          <ApiHeading>CommandDialog</ApiHeading>
          <PropsTable
            rows={[
              { prop: "open", type: "boolean", def: "-", description: "The controlled open state of the dialog." },
              { prop: "onOpenChange", type: "(open: boolean) => void", def: "-", description: "Callback fired when the open state changes." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
