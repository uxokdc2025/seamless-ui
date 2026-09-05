"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Checkbox, Label } from "@seamless/ui"
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
        <Preview minHeight={180}>{children}</Preview>
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


export default function CheckboxPage() {
  const [checked, setChecked] = React.useState(true)
  return (
    <DocsShell title="Checkbox">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Checkbox"
          description="A control that allows the user to toggle between checked and not checked."
        />

        <Preview>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms" style={{ cursor: "pointer" }}>
              Accept terms and conditions
            </Label>
          </div>
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/checkbox" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import { Checkbox } from "@seamless/ui"

export function Example() {
  return <Checkbox id="terms" />
}`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="With label"
            description="Associate a label with the checkbox using a shared id."
            code={`<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Checkbox id="newsletter" />
  <Label htmlFor="newsletter">Subscribe to the newsletter</Label>
</div>`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter" style={{ cursor: "pointer" }}>
                Subscribe to the newsletter
              </Label>
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="With description"
            description="Pair the checkbox with a title and helper text."
            code={`<div style={{ display: "flex", gap: 8 }}>
  <Checkbox id="marketing" defaultChecked />
  <div>
    <Label htmlFor="marketing">Marketing emails</Label>
    <p>Receive emails about new products and features.</p>
  </div>
</div>`}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <Checkbox id="marketing" defaultChecked style={{ marginTop: 2 }} />
              <div>
                <Label htmlFor="marketing" style={{ cursor: "pointer" }}>
                  Marketing emails
                </Label>
                <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--color-muted-foreground)" }}>
                  Receive emails about new products and features.
                </p>
              </div>
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="Controlled"
            description="Drive the checked state from React state with onCheckedChange."
            code={`const [checked, setChecked] = React.useState(true)

<Checkbox
  id="controlled"
  checked={checked}
  onCheckedChange={(v) => setChecked(v === true)}
/>`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox id="controlled" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
              <Label htmlFor="controlled" style={{ cursor: "pointer" }}>
                {checked ? "Checked" : "Unchecked"}
              </Label>
            </div>
          </ExampleBlock>

          <ExampleBlock
            title="Disabled"
            description="Prevent interaction with the disabled prop."
            code={`<Checkbox id="disabled" disabled />
<Checkbox id="disabled-checked" disabled defaultChecked />`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled">Disabled</Label>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Checkbox id="disabled-checked" disabled defaultChecked />
                <Label htmlFor="disabled-checked">Disabled checked</Label>
              </div>
            </div>
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginTop: 0 }}>
            Built on Radix UI Checkbox. Accepts all props of the underlying Radix Root.
          </p>
          <PropsTable
            rows={[
              { prop: "checked", type: "boolean | \"indeterminate\"", def: "-", description: "The controlled checked state." },
              { prop: "defaultChecked", type: "boolean", def: "false", description: "The checked state when uncontrolled." },
              { prop: "onCheckedChange", type: "(checked) => void", def: "-", description: "Callback fired when the state changes." },
              { prop: "disabled", type: "boolean", def: "false", description: "Prevents user interaction." },
              { prop: "required", type: "boolean", def: "false", description: "Marks the checkbox as required in a form." },
              { prop: "name", type: "string", def: "-", description: "Name submitted with the form." },
              { prop: "value", type: "string", def: '"on"', description: "Value submitted with the form when checked." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
