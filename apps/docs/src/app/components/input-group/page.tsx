"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  InputElement,
  Label,
} from "@seamless/ui"
import { Search, DollarSign, Copy, Check } from "lucide-react"

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

export default function InputGroupPage() {
  return (
    <DocsShell title="Input Group">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Input Group
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          Group an input with addons and inline elements — icons, prefixes, and
          suffixes — inside a single bordered control.
        </p>

        <PreviewCard>
          <InputGroup style={{ width: 320 }}>
            <InputLeftAddon>https://</InputLeftAddon>
            <InputElement placeholder="yoursite" />
            <InputRightAddon>.com</InputRightAddon>
          </InputGroup>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/input-group`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import {
  InputGroup,
  InputLeftAddon,
  InputElement,
} from "@seamless/ui"

export default function Example() {
  return (
    <InputGroup>
      <InputLeftAddon>https://</InputLeftAddon>
      <InputElement placeholder="yoursite" />
    </InputGroup>
  )
}`}
        />

        <SectionHeading>Anatomy</SectionHeading>
        <CodeBlock
          code={`<InputGroup>
  <InputLeftAddon />
  <InputLeftElement />
  <InputElement />
  <InputRightElement />
  <InputRightAddon />
</InputGroup>`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Left icon element"
          description="Use InputLeftElement to place a non-interactive icon inside the field."
          code={`<InputGroup>
  <InputLeftElement>
    <Search className="h-4 w-4" />
  </InputLeftElement>
  <InputElement placeholder="Search..." />
</InputGroup>`}
        >
          <InputGroup style={{ width: 320 }}>
            <InputLeftElement>
              <Search style={{ height: 16, width: 16 }} />
            </InputLeftElement>
            <InputElement placeholder="Search..." />
          </InputGroup>
        </Example>

        <Example
          title="Currency addon"
          description="Combine a left element and a right addon for currency amounts."
          code={`<InputGroup>
  <InputLeftElement>
    <DollarSign className="h-4 w-4" />
  </InputLeftElement>
  <InputElement placeholder="0.00" />
  <InputRightAddon>USD</InputRightAddon>
</InputGroup>`}
        >
          <InputGroup style={{ width: 320 }}>
            <InputLeftElement>
              <DollarSign style={{ height: 16, width: 16 }} />
            </InputLeftElement>
            <InputElement placeholder="0.00" />
            <InputRightAddon>USD</InputRightAddon>
          </InputGroup>
        </Example>

        <Example
          title="Sizes"
          description="Use the size prop to render small, default, or large groups."
          code={`<InputGroup size="sm">
  <InputLeftAddon>@</InputLeftAddon>
  <InputElement placeholder="username" />
</InputGroup>
<InputGroup size="lg">
  <InputLeftAddon>@</InputLeftAddon>
  <InputElement placeholder="username" />
</InputGroup>`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: 320,
            }}
          >
            <InputGroup size="sm">
              <InputLeftAddon>@</InputLeftAddon>
              <InputElement placeholder="username" />
            </InputGroup>
            <InputGroup size="lg">
              <InputLeftAddon>@</InputLeftAddon>
              <InputElement placeholder="username" />
            </InputGroup>
          </div>
        </Example>

        <Example
          title="With label"
          description="Pair a group with a Label for accessible forms."
          code={`<div className="grid gap-2">
  <Label htmlFor="site">Website</Label>
  <InputGroup>
    <InputLeftAddon>https://</InputLeftAddon>
    <InputElement id="site" placeholder="yoursite" />
  </InputGroup>
</div>`}
        >
          <div style={{ display: "grid", gap: 8, width: 320 }}>
            <Label htmlFor="site">Website</Label>
            <InputGroup>
              <InputLeftAddon>https://</InputLeftAddon>
              <InputElement id="site" placeholder="yoursite" />
            </InputGroup>
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
          InputGroup
        </p>
        <PropsTable
          rows={[
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: "Controls the height and text size of the group.",
            },
            {
              name: "className",
              type: "string",
              default: "—",
              description: "Additional classes merged onto the group container.",
            },
          ]}
        />
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "24px 0 4px",
          }}
        >
          Subcomponents
        </p>
        <PropsTable
          rows={[
            {
              name: "InputElement",
              type: "React.InputHTMLAttributes",
              default: "—",
              description: "The editable input; accepts all native input props.",
            },
            {
              name: "InputLeftAddon / InputRightAddon",
              type: "React.HTMLAttributes<HTMLDivElement>",
              default: "—",
              description:
                "Bordered, muted segments rendered before or after the input.",
            },
            {
              name: "InputLeftElement / InputRightElement",
              type: "React.HTMLAttributes<HTMLDivElement>",
              default: "—",
              description:
                "Inline overlays (usually icons) inside the field's padding.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
