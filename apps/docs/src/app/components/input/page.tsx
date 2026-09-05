"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Input, Label, Button } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
const th: React.CSSProperties = {
  padding: "10px 12px",
  fontWeight: 600,
  color: "var(--color-foreground)",
  whiteSpace: "nowrap",
}
const td: React.CSSProperties = { padding: "10px 12px", verticalAlign: "top" }

type Prop = { name: string; type: string; default: string; description: string }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        width: 32,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: "16px 52px 16px 16px",
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: React.ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight,
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 20,
        fontWeight: 600,
        margin: "48px 0 8px",
        color: "var(--color-foreground)",
      }}
    >
      {children}
    </h2>
  )
}

function Example({
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
    <div style={{ marginTop: 40 }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          margin: "0 0 4px",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 14,
          color: "var(--color-muted-foreground)",
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={180}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: Prop[] }) {
  return (
    <div
      style={{
        marginTop: 12,
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)", textAlign: "left" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.name}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-foreground)",
                  fontWeight: 500,
                }}
              >
                {r.name}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.default}
              </td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function InputPage() {
  return (
    <DocsShell title="Input">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Input
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          Displays a form input field or a component that looks like an input
          field.
        </p>

        <PreviewCard>
          <div style={{ width: 280 }}>
            <Input type="email" placeholder="Email" />
          </div>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/input`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import { Input } from "@seamless/ui"

export default function Example() {
  return <Input type="email" placeholder="Email" />
}`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Default"
          description="A standard text input with a placeholder."
          code={`<Input type="text" placeholder="Name" />`}
        >
          <div style={{ width: 280 }}>
            <Input type="text" placeholder="Name" />
          </div>
        </Example>

        <Example
          title="With label"
          description="Pair an input with a Label using a shared htmlFor / id."
          code={`<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Email" />
</div>`}
        >
          <div
            style={{
              display: "grid",
              gap: 8,
              width: 280,
            }}
          >
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" />
          </div>
        </Example>

        <Example
          title="Disabled"
          description="Disabled inputs are non-interactive and dimmed."
          code={`<Input disabled type="email" placeholder="Email" />`}
        >
          <div style={{ width: 280 }}>
            <Input disabled type="email" placeholder="Email" />
          </div>
        </Example>

        <Example
          title="File"
          description={'Use type="file" for file selection inputs.'}
          code={`<div className="grid gap-2">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" />
</div>`}
        >
          <div style={{ display: "grid", gap: 8, width: 280 }}>
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
        </Example>

        <Example
          title="With button"
          description="Compose an input with a button for inline actions like subscribing."
          code={`<div className="flex gap-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit">Subscribe</Button>
</div>`}
        >
          <div style={{ display: "flex", gap: 8, width: 320 }}>
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "0 0 4px",
          }}
        >
          Input accepts all standard{" "}
          <code style={{ fontFamily: mono }}>&lt;input&gt;</code> attributes.
        </p>
        <PropsTable
          rows={[
            {
              name: "type",
              type: "string",
              default: '"text"',
              description:
                "The native input type (text, email, password, file, number, etc.).",
            },
            {
              name: "placeholder",
              type: "string",
              default: "—",
              description: "Placeholder text shown when the field is empty.",
            },
            {
              name: "value",
              type: "string",
              default: "—",
              description: "The controlled value of the input.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the input is disabled.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional classes merged onto the input.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
