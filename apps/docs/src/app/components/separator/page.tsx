"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Separator } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

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

export default function SeparatorDocsPage() {
  return (
    <Page title="Separator">
      <PageHeader
        title="Separator"
        description="Visually or semantically separates content with a thin line, horizontally or vertically."
      />

      <PreviewCard>
        <div style={{ width: 280, maxWidth: "100%" }}>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-foreground)",
              }}
            >
              Seamless UI
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "var(--color-muted-foreground)",
              }}
            >
              An open-source component library.
            </p>
          </div>
          <Separator style={{ margin: "16px 0" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              color: "var(--color-foreground)",
            }}
          >
            <span>Blog</span>
            <Separator orientation="vertical" style={{ height: 16 }} />
            <span>Docs</span>
            <Separator orientation="vertical" style={{ height: 16 }} />
            <span>Source</span>
          </div>
        </div>
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/separator`} />
      </Section>

      <Section title="Usage">
        <CodeBlock code={`import { Separator } from "@seamless/ui"`} />
        <CodeBlock code={`<Separator />`} />
      </Section>

      <Section title="Examples">
        <Example
          title="Horizontal"
          description="The default orientation spans the full width of its container."
          code={`<div>
  <p>Above the line</p>
  <Separator style={{ margin: "12px 0" }} />
  <p>Below the line</p>
</div>`}
        >
          <div style={{ width: 260, maxWidth: "100%" }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--color-foreground)",
              }}
            >
              Above the line
            </p>
            <Separator style={{ margin: "12px 0" }} />
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "var(--color-foreground)",
              }}
            >
              Below the line
            </p>
          </div>
        </Example>

        <Example
          title="Vertical"
          description="Set orientation to vertical and give the separator a height to divide inline items."
          code={`<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <span>Profile</span>
  <Separator orientation="vertical" style={{ height: 20 }} />
  <span>Settings</span>
  <Separator orientation="vertical" style={{ height: 20 }} />
  <span>Log out</span>
</div>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 14,
              color: "var(--color-foreground)",
            }}
          >
            <span>Profile</span>
            <Separator orientation="vertical" style={{ height: 20 }} />
            <span>Settings</span>
            <Separator orientation="vertical" style={{ height: 20 }} />
            <span>Log out</span>
          </div>
        </Example>

        <Example
          title="Semantic separator"
          description="Set decorative to false when the separator conveys meaningful structure to assistive technology."
          code={`<Separator decorative={false} />`}
        >
          <div style={{ width: 260, maxWidth: "100%" }}>
            <Separator decorative={false} />
          </div>
        </Example>
      </Section>

      <Section title="API Reference">
        <PropsTable
          rows={[
            {
              prop: "orientation",
              type: '"horizontal" | "vertical"',
              default: '"horizontal"',
              description: "Direction the separator runs.",
            },
            {
              prop: "decorative",
              type: "boolean",
              default: "true",
              description:
                "When true the separator is hidden from assistive tech; set false to expose it as a semantic separator.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the element.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
