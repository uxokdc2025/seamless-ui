"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Slider } from "@seamless/ui"
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 16, minHeight: 320, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
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

function ControlledSlider() {
  const [value, setValue] = React.useState([50])
  return (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-muted-foreground)" }}>
        <span>Volume</span>
        <span style={{ color: "var(--color-foreground)", fontWeight: 600 }}>{value[0]}</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  )
}

export default function SliderPage() {
  return (
    <DocsShell title="Slider">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Slider</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            An input where the user selects a value from within a given range.
          </p>
        </header>

        <Preview>
          <Slider defaultValue={[50]} max={100} step={1} style={{ width: 320 }} />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/slider" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Slider } from "@seamless/ui"

export default function Example() {
  return <Slider defaultValue={[50]} max={100} step={1} />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="A single-thumb slider with a default value."
            code={`<Slider defaultValue={[50]} max={100} step={1} />`}
          >
            <Slider defaultValue={[50]} max={100} step={1} style={{ width: 320 }} />
          </ExampleSection>

          <ExampleSection
            title="Range"
            description="Pass two values to render a range with two thumbs."
            code={`<Slider defaultValue={[25, 75]} max={100} step={1} />`}
          >
            <Slider defaultValue={[25, 75]} max={100} step={1} style={{ width: 320 }} />
          </ExampleSection>

          <ExampleSection
            title="Stepped"
            description="Use step to constrain the increments."
            code={`<Slider defaultValue={[40]} max={100} step={10} />`}
          >
            <Slider defaultValue={[40]} max={100} step={10} style={{ width: 320 }} />
          </ExampleSection>

          <ExampleSection
            title="Controlled with label"
            description="Track the value in state to display it live."
            code={`const [value, setValue] = React.useState([50])

return (
  <Slider value={value} onValueChange={setValue} max={100} step={1} />
)`}
          >
            <ControlledSlider />
          </ExampleSection>

          <ExampleSection
            title="Disabled"
            description="Non-interactive when disabled."
            code={`<Slider defaultValue={[50]} max={100} disabled />`}
          >
            <Slider defaultValue={[50]} max={100} disabled style={{ width: 320 }} />
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultValue</td><td style={tdMono}>number[]</td><td style={tdMono}>—</td><td style={tdCell}>Initial value for the uncontrolled slider.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>number[]</td><td style={tdMono}>—</td><td style={tdCell}>Controlled value of the slider.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onValueChange</td><td style={tdMono}>(value: number[]) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired as the value changes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>min</td><td style={tdMono}>number</td><td style={tdMono}>0</td><td style={tdCell}>Minimum allowed value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>max</td><td style={tdMono}>number</td><td style={tdMono}>100</td><td style={tdCell}>Maximum allowed value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>step</td><td style={tdMono}>number</td><td style={tdMono}>1</td><td style={tdCell}>Stepping interval.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>orientation</td><td style={tdMono}>&quot;horizontal&quot; | &quot;vertical&quot;</td><td style={tdMono}>&quot;horizontal&quot;</td><td style={tdCell}>Orientation of the slider.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>disabled</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Prevents interaction when true.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
