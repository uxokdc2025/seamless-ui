"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Switch, Label } from "@seamless/ui"
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

function Preview({ children, minH = 320 }: { children: React.ReactNode; minH?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 24, minHeight: minH, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
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
      <Preview minH={180}>{children}</Preview>
      <CodeBlock code={code} />
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{children}</h2>
}

function ControlledSwitch() {
  const [checked, setChecked] = React.useState(true)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
      <span style={{ fontSize: 14, color: "var(--color-foreground)" }}>{checked ? "On" : "Off"}</span>
    </div>
  )
}

export default function SwitchPage() {
  return (
    <DocsShell title="Switch">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Switch</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A control that toggles between an on and off state.
          </p>
        </header>

        <Preview>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Switch id="airplane" defaultChecked />
            <Label htmlFor="airplane">Airplane mode</Label>
          </div>
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/switch" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Switch } from "@seamless/ui"

export default function Example() {
  return <Switch />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="An uncontrolled switch, off by default."
            code={`<Switch />`}
          >
            <Switch />
          </ExampleSection>

          <ExampleSection
            title="With label"
            description="Pair the switch with a Label using a shared id."
            code={`<div className="flex items-center gap-3">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications">Enable notifications</Label>
            </div>
          </ExampleSection>

          <ExampleSection
            title="Sizes"
            description="Three sizes are available via the size prop."
            code={`<Switch size="sm" defaultChecked />
<Switch size="default" defaultChecked />
<Switch size="lg" defaultChecked />`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Switch size="sm" defaultChecked />
              <Switch size="default" defaultChecked />
              <Switch size="lg" defaultChecked />
            </div>
          </ExampleSection>

          <ExampleSection
            title="Controlled"
            description="Drive the state and reflect it in your UI."
            code={`const [checked, setChecked] = React.useState(true)

return <Switch checked={checked} onCheckedChange={setChecked} />`}
          >
            <ControlledSwitch />
          </ExampleSection>

          <ExampleSection
            title="Disabled"
            description="Non-interactive in both states."
            code={`<Switch disabled />
<Switch disabled defaultChecked />`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Switch disabled />
              <Switch disabled defaultChecked />
            </div>
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>checked</td><td style={tdMono}>boolean</td><td style={tdMono}>—</td><td style={tdCell}>Controlled checked state.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultChecked</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Initial state for the uncontrolled switch.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onCheckedChange</td><td style={tdMono}>(checked: boolean) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when the state changes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>size</td><td style={tdMono}>&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td><td style={tdMono}>&quot;default&quot;</td><td style={tdCell}>Size of the switch.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>disabled</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Prevents interaction when true.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>name</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Form field name for submission.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
