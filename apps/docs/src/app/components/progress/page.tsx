"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Progress } from "@seamless/ui"
import { Check, Copy, Minus, Plus } from "lucide-react"

const stepButton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 32,
  width: 32,
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  cursor: "pointer",
}

function ProgressDemo() {
  const [value, setValue] = useState(60)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: 320,
        maxWidth: "100%",
      }}
    >
      <Progress value={value} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          style={stepButton}
          onClick={() => setValue((v) => Math.max(0, v - 10))}
          aria-label="Decrease"
        >
          <Minus size={14} />
        </button>
        <span
          style={{
            fontSize: 14,
            fontVariantNumeric: "tabular-nums",
            color: "var(--color-foreground)",
            width: 48,
            textAlign: "center",
          }}
        >
          {value}%
        </span>
        <button
          type="button"
          style={stepButton}
          onClick={() => setValue((v) => Math.min(100, v + 10))}
          aria-label="Increase"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

type PropRow = { prop: string; type: string; default?: string; description: string }

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        fontSize: 12,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: 16,
          paddingRight: 88,
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        padding: 32,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
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
  children: ReactNode
  code: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          margin: 0,
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={180}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  const th: CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-foreground)",
  }
  const td: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-foreground)",
    verticalAlign: "top",
    lineHeight: 1.5,
  }
  const tdMono: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-muted-foreground)",
    verticalAlign: "top",
    fontFamily: mono,
  }
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td style={{ ...td, fontFamily: mono, fontWeight: 500 }}>
                {r.prop}
              </td>
              <td style={tdMono}>{r.type}</td>
              <td style={tdMono}>{r.default ?? "—"}</td>
              <td style={td}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.02em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          fontSize: 16,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <DocsShell title={title}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {children}
      </div>
    </DocsShell>
  )
}

export default function ProgressDocsPage() {
  return (
    <Page title="Progress">
      <PageHeader
        title="Progress"
        description="Displays an indicator showing the completion progress of a task, typically a horizontal progress bar."
      />

      <PreviewCard>
        <ProgressDemo />
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/progress`} />
      </Section>

      <Section title="Usage">
        <CodeBlock code={`import { Progress } from "@seamless/ui"`} />
        <CodeBlock code={`<Progress value={60} />`} />
      </Section>

      <Section title="Examples">
        <Example
          title="Sizes"
          description="Three heights are available via the size prop: sm, default, and lg."
          code={`<Progress value={40} size="sm" />
<Progress value={60} size="default" />
<Progress value={80} size="lg" />`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: 320,
              maxWidth: "100%",
            }}
          >
            <Progress value={40} size="sm" />
            <Progress value={60} size="default" />
            <Progress value={80} size="lg" />
          </div>
        </Example>

        <Example
          title="Variants"
          description="Semantic color variants communicate the meaning of the progress state."
          code={`<Progress value={70} variant="default" />
<Progress value={70} variant="success" />
<Progress value={70} variant="warning" />
<Progress value={70} variant="error" />`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: 320,
              maxWidth: "100%",
            }}
          >
            <Progress value={70} variant="default" />
            <Progress value={70} variant="success" />
            <Progress value={70} variant="warning" />
            <Progress value={70} variant="error" />
          </div>
        </Example>

        <Example
          title="Steps"
          description="Progress values map naturally to multi-step flows."
          code={`<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={100} />`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: 320,
              maxWidth: "100%",
            }}
          >
            <Progress value={0} />
            <Progress value={25} />
            <Progress value={50} />
            <Progress value={100} />
          </div>
        </Example>
      </Section>

      <Section title="API Reference">
        <PropsTable
          rows={[
            {
              prop: "value",
              type: "number",
              default: "0",
              description: "Completion percentage between 0 and 100.",
            },
            {
              prop: "size",
              type: '"sm" | "default" | "lg"',
              default: '"default"',
              description: "Height of the progress track.",
            },
            {
              prop: "variant",
              type: '"default" | "success" | "warning" | "error"',
              default: '"default"',
              description: "Semantic color of the filled indicator.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the track element.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
