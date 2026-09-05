"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Textarea, Label } from "@seamless/ui"
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
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

function CountingTextarea() {
  const [value, setValue] = React.useState("")
  const max = 180
  return (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 6 }}>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, max))}
        placeholder="Write a short bio..."
      />
      <span style={{ fontSize: 12, color: "var(--color-muted-foreground)", textAlign: "right" }}>{value.length}/{max}</span>
    </div>
  )
}

export default function TextareaPage() {
  return (
    <DocsShell title="Textarea">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Textarea</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A multi-line text input for longer form content.
          </p>
        </header>

        <Preview>
          <Textarea placeholder="Type your message here." style={{ width: 360 }} />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/textarea" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Textarea } from "@seamless/ui"

export default function Example() {
  return <Textarea placeholder="Type your message here." />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="A basic textarea with placeholder text."
            code={`<Textarea placeholder="Type your message here." />`}
          >
            <Textarea placeholder="Type your message here." style={{ width: 360 }} />
          </ExampleSection>

          <ExampleSection
            title="With label"
            description="Associate a Label for accessibility."
            code={`<div className="grid gap-2">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." />
</div>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
              <Label htmlFor="message">Your message</Label>
              <Textarea id="message" placeholder="Type your message here." />
            </div>
          </ExampleSection>

          <ExampleSection
            title="Disabled"
            description="Non-editable when disabled."
            code={`<Textarea placeholder="Type your message here." disabled />`}
          >
            <Textarea placeholder="Type your message here." disabled style={{ width: 360 }} />
          </ExampleSection>

          <ExampleSection
            title="Resize behavior"
            description="Control how the textarea can be resized."
            code={`<Textarea resize="none" placeholder="Cannot resize" />
<Textarea resize="both" placeholder="Resize any direction" />`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
              <Textarea resize="none" placeholder="resize: none" />
              <Textarea resize="both" placeholder="resize: both" />
            </div>
          </ExampleSection>

          <ExampleSection
            title="With character count"
            description="Track the value in state to enforce a limit."
            code={`const [value, setValue] = React.useState("")
const max = 180

return (
  <Textarea
    value={value}
    onChange={(e) => setValue(e.target.value.slice(0, max))}
  />
)`}
          >
            <CountingTextarea />
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>resize</td><td style={tdMono}>&quot;none&quot; | &quot;vertical&quot; | &quot;horizontal&quot; | &quot;both&quot;</td><td style={tdMono}>&quot;vertical&quot;</td><td style={tdCell}>How the textarea may be resized.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>placeholder</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Placeholder text shown when empty.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Controlled value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultValue</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Initial value for the uncontrolled textarea.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>rows</td><td style={tdMono}>number</td><td style={tdMono}>—</td><td style={tdCell}>Visible number of text lines.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>disabled</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Prevents editing when true.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>...props</td><td style={tdMono}>TextareaHTMLAttributes</td><td style={tdMono}>—</td><td style={tdCell}>All native textarea attributes are forwarded.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
