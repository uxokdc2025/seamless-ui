"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Combobox } from "@seamless/ui"
import { Copy, Check as CheckIcon } from "lucide-react"

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


const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "svelte", label: "SvelteKit" },
]

function ComboboxDemo({ clearable = false }: { clearable?: boolean }) {
  const [value, setValue] = React.useState("")
  return (
    <div style={{ width: 260 }}>
      <Combobox
        options={frameworks}
        value={value}
        onChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search framework..."
        emptyMessage="No framework found."
        clearable={clearable}
      />
    </div>
  )
}

export default function ComboboxPage() {
  return (
    <DocsShell title="Combobox">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Combobox"
          description="Autocomplete input and command palette with a list of suggestions, built on Popover."
        />

        <Preview>
          <ComboboxDemo />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/combobox" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import { Combobox } from "@seamless/ui"

const options = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
]

export function Example() {
  const [value, setValue] = React.useState("")
  return <Combobox options={options} value={value} onChange={setValue} />
}`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Default"
            description="A searchable single-select with placeholder and empty message."
            code={`<Combobox
  options={frameworks}
  value={value}
  onChange={setValue}
  placeholder="Select framework..."
/>`}
          >
            <ComboboxDemo />
          </ExampleBlock>

          <ExampleBlock
            title="Clearable"
            description="Show a clear button once a value is selected."
            code={`<Combobox
  options={frameworks}
  value={value}
  onChange={setValue}
  clearable
/>`}
          >
            <ComboboxDemo clearable />
          </ExampleBlock>

          <ExampleBlock
            title="Disabled"
            description="Disable the entire control with the disabled prop."
            code={`<Combobox options={frameworks} disabled placeholder="Select framework..." />`}
          >
            <div style={{ width: 260 }}>
              <Combobox options={frameworks} disabled placeholder="Select framework..." />
            </div>
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <PropsTable
            rows={[
              { prop: "options", type: "ComboboxOption[]", def: "-", description: "Items to display. Each has value, label, and optional disabled." },
              { prop: "value", type: "string", def: "-", description: "The currently selected value (controlled)." },
              { prop: "onChange", type: "(value: string) => void", def: "-", description: "Callback fired when the selection changes." },
              { prop: "placeholder", type: "string", def: '"Select an option..."', description: "Trigger text shown when nothing is selected." },
              { prop: "searchPlaceholder", type: "string", def: '"Search..."', description: "Placeholder for the search input." },
              { prop: "emptyMessage", type: "string", def: '"No results found."', description: "Text shown when no options match." },
              { prop: "clearable", type: "boolean", def: "false", description: "Show a button to clear the selection." },
              { prop: "disabled", type: "boolean", def: "false", description: "Disable the control." },
              { prop: "className", type: "string", def: "-", description: "Classes merged onto the trigger button." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
