"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Rating } from "@seamless/ui"
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

function ControlledRating() {
  const [value, setValue] = React.useState(3)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Rating value={value} onValueChange={setValue} />
      <span style={{ fontSize: 14, color: "var(--color-foreground)" }}>{value} / 5</span>
    </div>
  )
}

export default function RatingPage() {
  return (
    <DocsShell title="Rating">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Rating</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A keyboard-accessible star rating control for capturing or displaying a score.
          </p>
        </header>

        <Preview>
          <Rating defaultValue={3} />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/rating" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Rating } from "@seamless/ui"

export default function Example() {
  return <Rating defaultValue={3} />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="Arrow keys adjust the value; Home and End jump to the extremes."
            code={`<Rating defaultValue={3} />`}
          >
            <Rating defaultValue={3} />
          </ExampleSection>

          <ExampleSection
            title="Half stars"
            description="Enable half-star precision with the allowHalf prop."
            code={`<Rating defaultValue={2.5} allowHalf />`}
          >
            <Rating defaultValue={2.5} allowHalf />
          </ExampleSection>

          <ExampleSection
            title="Sizes"
            description="Three sizes are available via the size prop."
            code={`<Rating defaultValue={4} size="sm" />
<Rating defaultValue={4} size="default" />
<Rating defaultValue={4} size="lg" />`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Rating defaultValue={4} size="sm" />
              <Rating defaultValue={4} size="default" />
              <Rating defaultValue={4} size="lg" />
            </div>
          </ExampleSection>

          <ExampleSection
            title="Controlled"
            description="Drive the value and reflect it elsewhere in your UI."
            code={`const [value, setValue] = React.useState(3)

return <Rating value={value} onValueChange={setValue} />`}
          >
            <ControlledRating />
          </ExampleSection>

          <ExampleSection
            title="Read-only"
            description="Display a score without allowing interaction."
            code={`<Rating value={4} readOnly />`}
          >
            <Rating value={4} readOnly />
          </ExampleSection>

          <ExampleSection
            title="Custom length"
            description="Use max to render more or fewer stars."
            code={`<Rating defaultValue={7} max={10} />`}
          >
            <Rating defaultValue={7} max={10} />
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>number</td><td style={tdMono}>—</td><td style={tdCell}>Controlled value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultValue</td><td style={tdMono}>number</td><td style={tdMono}>0</td><td style={tdCell}>Initial value when uncontrolled.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onValueChange</td><td style={tdMono}>(value: number) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when the value changes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>max</td><td style={tdMono}>number</td><td style={tdMono}>5</td><td style={tdCell}>Number of stars.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>allowHalf</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Allow half-star increments.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>readOnly</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Display only, no interaction.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>disabled</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Prevents interaction and dims the control.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>size</td><td style={tdMono}>&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td><td style={tdMono}>&quot;default&quot;</td><td style={tdCell}>Size of the stars.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>label</td><td style={tdMono}>string</td><td style={tdMono}>&quot;Rating&quot;</td><td style={tdCell}>Accessible label for the control.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
