"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { ButtonGroup, Button } from "@seamless/ui"
import {
  Copy,
  Check,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react"

const codeBlockStyle: React.CSSProperties = {
  margin: 0,
  padding: "16px",
  paddingRight: "48px",
  background: "var(--color-muted)",
  borderRadius: "8px",
  fontSize: "13px",
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  overflowX: "auto",
  lineHeight: 1.6,
  color: "var(--color-foreground)",
  whiteSpace: "pre",
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label="Copy code"
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "6px",
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? (
        <Check style={{ width: "14px", height: "14px" }} />
      ) : (
        <Copy style={{ width: "14px", height: "14px" }} />
      )}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: "12px" }}>
      <pre style={codeBlockStyle}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        background: "var(--color-muted)",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "22px",
        fontWeight: 600,
        marginTop: "48px",
        marginBottom: "12px",
        paddingBottom: "8px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {children}
    </h2>
  )
}

function Example({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "var(--color-muted-foreground)",
          marginBottom: "12px",
        }}
      >
        {description}
      </p>
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          background: "var(--color-muted)",
          minHeight: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({
  rows,
}: {
  rows: { prop: string; type: string; def: string; desc: string }[]
}) {
  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 600,
    borderBottom: "1px solid var(--color-border)",
    background: "var(--color-muted)",
  }
  const td: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "13px",
    borderBottom: "1px solid var(--color-border)",
    verticalAlign: "top",
  }
  const mono: React.CSSProperties = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    color: "var(--color-foreground)",
  }
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        overflow: "hidden",
        overflowX: "auto",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}
      >
        <thead>
          <tr>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, ...mono, fontWeight: 600 }}>{r.prop}</td>
              <td
                style={{
                  ...td,
                  ...mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td style={{ ...td, ...mono }}>{r.def}</td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ButtonGroupPage() {
  return (
    <DocsShell title="Button Group">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Button Group
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          Groups a set of related buttons together, joining their edges into a
          single segmented control.
        </p>

        <PreviewCard>
          <ButtonGroup>
            <Button variant="outline">Years</Button>
            <Button variant="outline">Months</Button>
            <Button variant="outline">Days</Button>
          </ButtonGroup>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock
          code={`pnpm dlx shadcn@latest add @seamless/ui/button-group`}
        />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import { ButtonGroup, Button } from "@seamless/ui"

export default function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`ButtonGroup
├── Button
├── Button
└── Button`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Horizontal (joined)"
          description="By default, buttons join at their edges into a segmented control."
          code={`<ButtonGroup>
  <Button variant="outline"><AlignLeft className="h-4 w-4" /></Button>
  <Button variant="outline"><AlignCenter className="h-4 w-4" /></Button>
  <Button variant="outline"><AlignRight className="h-4 w-4" /></Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Align left">
              <AlignLeft style={{ width: "16px", height: "16px" }} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Align center">
              <AlignCenter style={{ width: "16px", height: "16px" }} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Align right">
              <AlignRight style={{ width: "16px", height: "16px" }} />
            </Button>
          </ButtonGroup>
        </Example>

        <Example
          title="Vertical"
          description="Set orientation to vertical to stack the buttons."
          code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`}
        >
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        </Example>

        <Example
          title="Spacing"
          description="Use the spacing prop to separate buttons instead of joining them."
          code={`<ButtonGroup spacing="md">
  <Button><Bold className="h-4 w-4" /></Button>
  <Button variant="secondary"><Italic className="h-4 w-4" /></Button>
  <Button variant="outline"><Underline className="h-4 w-4" /></Button>
</ButtonGroup>`}
        >
          <ButtonGroup spacing="md">
            <Button size="icon" aria-label="Bold">
              <Bold style={{ width: "16px", height: "16px" }} />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Italic">
              <Italic style={{ width: "16px", height: "16px" }} />
            </Button>
            <Button size="icon" variant="outline" aria-label="Underline">
              <Underline style={{ width: "16px", height: "16px" }} />
            </Button>
          </ButtonGroup>
        </Example>

        <SectionTitle>API Reference</SectionTitle>
        <PropsTable
          rows={[
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              def: '"horizontal"',
              desc: "The direction in which the buttons are laid out.",
            },
            {
              prop: "spacing",
              type: '"none" | "sm" | "md" | "lg"',
              def: '"none"',
              desc: 'Gap between buttons. "none" joins their edges into a segmented control.',
            },
            {
              prop: "className",
              type: "string",
              def: "—",
              desc: "Additional classes merged onto the group element.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
