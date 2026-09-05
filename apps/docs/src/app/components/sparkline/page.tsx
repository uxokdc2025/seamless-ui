"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Sparkline } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdCell: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const tdMono: React.CSSProperties = { ...tdCell, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)", whiteSpace: "nowrap" }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      aria-label="Copy code"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-muted-foreground)", cursor: "pointer" }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, right: 8 }}><CopyButton text={code} /></div>
      <pre style={{ margin: 0, padding: 16, overflowX: "auto", fontSize: 13, lineHeight: 1.6 }}>
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)" }}>{code}</code>
      </pre>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 24, minHeight: 320, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
      {children}
    </div>
  )
}

function ExampleSection({ title, description, code, children }: { title: string; description?: string; code: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{title}</h3>
        {description && <p style={{ margin: 0, fontSize: 14, color: "var(--color-muted-foreground)" }}>{description}</p>}
      </div>
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{children}</h2>
}

const up = [4, 6, 5, 8, 7, 10, 9, 12, 14, 13, 16]
const down = [16, 14, 15, 11, 12, 9, 10, 7, 6, 5, 3]

export default function SparklinePage() {
  return (
    <DocsShell title="Sparkline">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Sparkline</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A tiny inline SVG trend line for showing a series at a glance inside tables, cards, and metrics.
          </p>
        </header>

        <Preview>
          <Sparkline data={up} width={160} height={48} style={{ color: "var(--color-primary)" }} />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/sparkline" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Sparkline } from "@seamless/ui"

export default function Example() {
  return <Sparkline data={[4, 6, 5, 8, 7, 10, 9]} />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="Inherits its color from the surrounding text via currentColor."
            code={`<Sparkline data={[4, 6, 5, 8, 7, 10, 9, 12, 14, 13, 16]} />`}
          >
            <span style={{ color: "var(--color-foreground)" }}>
              <Sparkline data={up} width={160} height={48} />
            </span>
          </ExampleSection>

          <ExampleSection
            title="Color"
            description="Pass an explicit color, or set color on a parent element."
            code={`<Sparkline data={data} color="var(--color-success)" />
<Sparkline data={data} color="var(--color-destructive)" />`}
          >
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <Sparkline data={up} width={140} height={40} color="var(--color-success)" />
              <Sparkline data={down} width={140} height={40} color="var(--color-destructive)" />
            </div>
          </ExampleSection>

          <ExampleSection
            title="Area fill"
            description="Fill the region beneath the line with a translucent tint."
            code={`<Sparkline data={data} area color="var(--color-primary)" />`}
          >
            <Sparkline data={up} width={180} height={56} area color="var(--color-primary)" />
          </ExampleSection>

          <ExampleSection
            title="End dot"
            description="Emphasize the latest value with a marker."
            code={`<Sparkline data={data} showEndDot color="var(--color-primary)" />`}
          >
            <Sparkline data={up} width={180} height={56} showEndDot color="var(--color-primary)" />
          </ExampleSection>

          <ExampleSection
            title="Inline with a metric"
            description="Sparklines sit naturally beside a number."
            code={`<span className="inline-flex items-center gap-3">
  <strong>$48.2k</strong>
  <Sparkline data={data} width={96} height={24} color="var(--color-success)" />
</span>`}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "var(--color-foreground)" }}>
              <strong style={{ fontSize: 20 }}>$48.2k</strong>
              <Sparkline data={up} width={96} height={24} color="var(--color-success)" />
            </span>
          </ExampleSection>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>API Reference</H2>
          <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>data</td><td style={tdMono}>number[]</td><td style={tdMono}>—</td><td style={tdCell}>Series of numeric values to plot.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>width</td><td style={tdMono}>number</td><td style={tdMono}>100</td><td style={tdCell}>Rendered width in pixels.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>height</td><td style={tdMono}>number</td><td style={tdMono}>32</td><td style={tdCell}>Rendered height in pixels.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>color</td><td style={tdMono}>string</td><td style={tdMono}>&quot;currentColor&quot;</td><td style={tdCell}>Stroke (and fill) color.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>strokeWidth</td><td style={tdMono}>number</td><td style={tdMono}>2</td><td style={tdCell}>Line thickness in pixels.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>area</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Fill the area beneath the line.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>showEndDot</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Render a dot on the final point.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>label</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Accessible label; hidden from AT when omitted.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
