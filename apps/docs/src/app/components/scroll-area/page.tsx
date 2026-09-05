"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Separator } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

const scrollBox: CSSProperties = {
  height: 200,
  width: 280,
  maxWidth: "100%",
  overflowY: "auto",
  borderRadius: 8,
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  padding: 16,
}

const tags = Array.from({ length: 24 }, (_, i) => `v1.2.0-beta.${24 - i}`)

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

export default function ScrollAreaDocsPage() {
  return (
    <Page title="Scroll Area">
      <PageHeader
        title="Scroll Area"
        description="A scrollable region for overflowing content, styled with the design tokens so it stays consistent across themes."
      />

      <div
        style={{
          padding: "12px 16px",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          fontSize: 13,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        Note: <code style={{ fontFamily: mono }}>@seamless/ui</code> does not yet
        export a dedicated <code style={{ fontFamily: mono }}>ScrollArea</code>{" "}
        component. This page documents the equivalent pattern using a native
        overflow container styled with design tokens. Swap in the component API
        below once it ships.
      </div>

      <PreviewCard>
        <div style={scrollBox}>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            Tags
          </p>
          {tags.map((t, i) => (
            <div key={t}>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--color-foreground)",
                  padding: "2px 0",
                }}
              >
                {t}
              </div>
              {i < tags.length - 1 ? (
                <Separator style={{ margin: "8px 0" }} />
              ) : null}
            </div>
          ))}
        </div>
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/scroll-area`} />
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`// Native overflow container using design tokens
<div
  style={{
    height: 200,
    overflowY: "auto",
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    background: "var(--color-background)",
    padding: 16,
  }}
>
  {/* long content */}
</div>`}
        />
      </Section>

      <Section title="Examples">
        <Example
          title="Vertical scroll"
          description="A fixed-height region that scrolls its overflowing content vertically."
          code={`<div style={{ height: 160, overflowY: "auto", padding: 16, border: "1px solid var(--color-border)", borderRadius: 8 }}>
  {items.map((item) => (
    <p key={item}>{item}</p>
  ))}
</div>`}
        >
          <div style={{ ...scrollBox, height: 160 }}>
            {Array.from({ length: 20 }, (_, i) => (
              <p
                key={i}
                style={{
                  margin: "0 0 10px",
                  fontSize: 13,
                  color: "var(--color-foreground)",
                }}
              >
                Line item number {i + 1}
              </p>
            ))}
          </div>
        </Example>

        <Example
          title="Horizontal scroll"
          description="Set overflowX to scroll a row of items sideways."
          code={`<div style={{ maxWidth: 320, overflowX: "auto", padding: 16, border: "1px solid var(--color-border)", borderRadius: 8 }}>
  <div style={{ display: "flex", gap: 12 }}>
    {cards.map((c) => (
      <div key={c} style={{ minWidth: 120 }}>{c}</div>
    ))}
  </div>
</div>`}
        >
          <div
            style={{
              maxWidth: 320,
              overflowX: "auto",
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              padding: 16,
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: 110,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-muted)",
                    fontSize: 13,
                    color: "var(--color-foreground)",
                  }}
                >
                  Card {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Example>
      </Section>

      <Section title="API Reference">
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-muted-foreground)",
          }}
        >
          When the <code style={{ fontFamily: mono }}>ScrollArea</code>{" "}
          component ships it is expected to mirror the Radix API below. Until
          then, the native container above uses standard CSS overflow.
        </p>
        <PropsTable
          rows={[
            {
              prop: "type",
              type: '"auto" | "always" | "scroll" | "hover"',
              default: '"hover"',
              description:
                "When scrollbars are visible relative to pointer interaction.",
            },
            {
              prop: "scrollHideDelay",
              type: "number",
              default: "600",
              description:
                "Delay in ms before hiding scrollbars after interaction.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the viewport.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
