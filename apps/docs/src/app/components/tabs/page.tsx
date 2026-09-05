"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@seamless/ui"
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

const panelStyle: React.CSSProperties = { fontSize: 14, color: "var(--color-muted-foreground)", padding: "16px 4px", maxWidth: 420 }

export default function TabsPage() {
  return (
    <DocsShell title="Tabs">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Tabs</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A set of layered sections of content, shown one panel at a time.
          </p>
        </header>

        <Preview>
          <Tabs defaultValue="account" style={{ width: 420 }}>
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p style={panelStyle}>Make changes to your account here. Click save when you&apos;re done.</p>
            </TabsContent>
            <TabsContent value="password">
              <p style={panelStyle}>Change your password here. You&apos;ll be signed out afterwards.</p>
            </TabsContent>
          </Tabs>
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/tabs" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@seamless/ui"

export default function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings.</TabsContent>
      <TabsContent value="password">Password settings.</TabsContent>
    </Tabs>
  )
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Anatomy</H2>
          <CodeBlock code={`<Tabs>
  <TabsList>
    <TabsTrigger />
  </TabsList>
  <TabsContent />
</Tabs>`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Multiple tabs"
            description="Tabs scale to any number of triggers."
            code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview panel.</TabsContent>
  <TabsContent value="analytics">Analytics panel.</TabsContent>
  <TabsContent value="reports">Reports panel.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="overview" style={{ width: 420 }}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview"><p style={panelStyle}>A high-level summary of your workspace.</p></TabsContent>
              <TabsContent value="analytics"><p style={panelStyle}>Traffic, engagement and conversion metrics.</p></TabsContent>
              <TabsContent value="reports"><p style={panelStyle}>Download and schedule recurring reports.</p></TabsContent>
            </Tabs>
          </ExampleSection>

          <ExampleSection
            title="Disabled tab"
            description="Individual triggers can be disabled."
            code={`<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
  </TabsList>
  <TabsContent value="active">Active items.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="active" style={{ width: 420 }}>
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
              </TabsList>
              <TabsContent value="active"><p style={panelStyle}>Items that are currently active.</p></TabsContent>
              <TabsContent value="archived"><p style={panelStyle}>Archived items.</p></TabsContent>
            </Tabs>
          </ExampleSection>

          <ExampleSection
            title="Full width triggers"
            description="Stretch the list and triggers to fill the container."
            code={`<Tabs defaultValue="a" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="a" className="flex-1">Design</TabsTrigger>
    <TabsTrigger value="b" className="flex-1">Develop</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Design panel.</TabsContent>
  <TabsContent value="b">Develop panel.</TabsContent>
</Tabs>`}
          >
            <Tabs defaultValue="a" className="w-full" style={{ width: 420 }}>
              <TabsList className="w-full">
                <TabsTrigger value="a" className="flex-1">Design</TabsTrigger>
                <TabsTrigger value="b" className="flex-1">Develop</TabsTrigger>
              </TabsList>
              <TabsContent value="a"><p style={panelStyle}>Design tokens and component specs.</p></TabsContent>
              <TabsContent value="b"><p style={panelStyle}>Implementation and integration notes.</p></TabsContent>
            </Tabs>
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultValue</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>The tab active by default (uncontrolled).</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Controlled active tab value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onValueChange</td><td style={tdMono}>(value: string) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when the active tab changes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>orientation</td><td style={tdMono}>&quot;horizontal&quot; | &quot;vertical&quot;</td><td style={tdMono}>&quot;horizontal&quot;</td><td style={tdCell}>Orientation of the tab list.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>TabsTrigger.value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Value linking a trigger to its content.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>TabsContent.value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Value linking content to its trigger.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
