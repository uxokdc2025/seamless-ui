"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Spinner, Button } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

export default function SpinnerPage() {
  return (
    <DocsShell title="Spinner">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Spinner</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          An accessible loading indicator. Renders a spinning icon with a visually-hidden
          &ldquo;Loading&rdquo; label and <code style={codeInline}>role=&quot;status&quot;</code>.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <Spinner />
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/spinner`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import { Spinner } from "@seamless/ui"

export default function Example() {
  return <Spinner />
}`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Sizes"
          description="Four sizes are available: sm, default, lg, and xl."
          preview={
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              <Spinner size="sm" />
              <Spinner size="default" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </div>
          }
          code={`<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        />

        <Example
          title="With label"
          description="Pair the spinner with text to describe what is loading."
          preview={
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--color-muted-foreground)", fontSize: 14 }}>
              <Spinner size="sm" />
              <span>Loading your workspace…</span>
            </div>
          }
          code={`<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <Spinner size="sm" />
  <span>Loading your workspace…</span>
</div>`}
        />

        <Example
          title="Inside a button"
          description="Show a spinner in a disabled button to indicate a pending action."
          preview={
            <div style={{ display: "flex", gap: 12 }}>
              <Button disabled className="gap-2">
                <Spinner size="sm" className="text-current" />
                Saving…
              </Button>
              <Button variant="outline" disabled className="gap-2">
                <Spinner size="sm" className="text-current" />
                Please wait
              </Button>
            </div>
          }
          code={`<Button disabled className="gap-2">
  <Spinner size="sm" className="text-current" />
  Saving…
</Button>`}
        />

        <Example
          title="Centered in a container"
          description="Use a flex container to center the spinner while content loads."
          preview={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 160,
                border: "1px dashed var(--color-border)",
                borderRadius: 8,
              }}
            >
              <Spinner size="lg" />
            </div>
          }
          code={`<div className="flex h-40 items-center justify-center">
  <Spinner size="lg" />
</div>`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <PropsTable
          rows={[
            { prop: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "Diameter of the spinner." },
            { prop: "className", type: "string", description: "Additional classes for the wrapper element." },
            { prop: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Any other div attributes (aria, style, etc.)." },
          ]}
        />

        <h2 style={h2Style}>Accessibility</h2>
        <ul style={{ color: "var(--color-muted-foreground)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Wrapper carries <code style={codeInline}>role=&quot;status&quot;</code> and <code style={codeInline}>aria-label=&quot;Loading&quot;</code>.</li>
          <li>Includes a visually-hidden &ldquo;Loading…&rdquo; text node for screen readers.</li>
          <li>Respects the user&rsquo;s reduced-motion preferences where configured globally.</li>
        </ul>
      </div>
    </DocsShell>
  )
}

/* ------------------------------------------------------------------ */
/* Shared documentation primitives (inline, page-local)               */
/* ------------------------------------------------------------------ */

type PropRow = { prop: string; type: string; default?: string; description: string }

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 600, marginTop: 48, marginBottom: 4 }
const thStyle: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const codeInline: React.CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 12, background: "var(--color-muted)", padding: "2px 6px", borderRadius: 4, color: "var(--color-foreground)" }

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
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 84,
          background: "var(--color-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--color-foreground)" }}>
          {code}
        </code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight: 320,
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

function Example({
  title,
  description,
  preview,
  code,
}: {
  title: string
  description: string
  preview: React.ReactNode
  code: string
}) {
  return (
    <section style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h3>
      <p style={{ color: "var(--color-muted-foreground)", fontSize: 14, marginTop: 4, marginBottom: 0 }}>{description}</p>
      <div style={{ marginTop: 16 }}>
        <PreviewCard>{preview}</PreviewCard>
        <CodeBlock code={code} />
      </div>
    </section>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: 8 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={thStyle}>Prop</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Default</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td style={tdStyle}><code style={codeInline}>{r.prop}</code></td>
              <td style={tdStyle}><code style={codeInline}>{r.type}</code></td>
              <td style={tdStyle}>{r.default ? <code style={codeInline}>{r.default}</code> : "—"}</td>
              <td style={tdStyle}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
