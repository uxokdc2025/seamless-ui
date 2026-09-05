"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { BottomNavigation, BottomNavigationItem } from "@seamless/ui"
import { Copy, Check, Home, Search, Bell, User } from "lucide-react"

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

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 320, borderRadius: 24, border: "1px solid var(--color-border)", background: "var(--color-background)", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
      <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-muted-foreground)", fontSize: 14 }}>
        App content
      </div>
      {children}
    </div>
  )
}

function DemoNav() {
  const [tab, setTab] = React.useState("home")
  return (
    <PhoneFrame>
      <BottomNavigation value={tab} onValueChange={setTab}>
        <BottomNavigationItem value="home" icon={<Home size={20} />} label="Home" />
        <BottomNavigationItem value="search" icon={<Search size={20} />} label="Search" />
        <BottomNavigationItem value="alerts" icon={<Bell size={20} />} label="Alerts" />
        <BottomNavigationItem value="profile" icon={<User size={20} />} label="Profile" />
      </BottomNavigation>
    </PhoneFrame>
  )
}

export default function BottomNavigationPage() {
  return (
    <DocsShell title="Bottom Navigation">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Bottom Navigation</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A mobile tab bar for switching between top-level destinations. Each item pairs an icon with a label and reflects the active route.
          </p>
        </header>

        <Preview>
          <DemoNav />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/bottom-navigation" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { BottomNavigation, BottomNavigationItem } from "@seamless/ui"
import { Home, Search, Bell, User } from "lucide-react"

export default function Example() {
  const [tab, setTab] = React.useState("home")
  return (
    <BottomNavigation value={tab} onValueChange={setTab}>
      <BottomNavigationItem value="home" icon={<Home size={20} />} label="Home" />
      <BottomNavigationItem value="search" icon={<Search size={20} />} label="Search" />
      <BottomNavigationItem value="alerts" icon={<Bell size={20} />} label="Alerts" />
      <BottomNavigationItem value="profile" icon={<User size={20} />} label="Profile" />
    </BottomNavigation>
  )
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Controlled"
            description="Drive the active item and respond to changes with onValueChange."
            code={`<BottomNavigation value={tab} onValueChange={setTab}>
  <BottomNavigationItem value="home" icon={<Home size={20} />} label="Home" />
  <BottomNavigationItem value="profile" icon={<User size={20} />} label="Profile" />
</BottomNavigation>`}
          >
            <DemoNav />
          </ExampleSection>

          <ExampleSection
            title="Uncontrolled"
            description="Provide defaultValue to let the component manage its own state."
            code={`<BottomNavigation defaultValue="search">
  <BottomNavigationItem value="home" icon={<Home size={20} />} label="Home" />
  <BottomNavigationItem value="search" icon={<Search size={20} />} label="Search" />
  <BottomNavigationItem value="profile" icon={<User size={20} />} label="Profile" />
</BottomNavigation>`}
          >
            <div style={{ width: 320, borderRadius: 12, border: "1px solid var(--color-border)", overflow: "hidden" }}>
              <BottomNavigation defaultValue="search">
                <BottomNavigationItem value="home" icon={<Home size={20} />} label="Home" />
                <BottomNavigationItem value="search" icon={<Search size={20} />} label="Search" />
                <BottomNavigationItem value="profile" icon={<User size={20} />} label="Profile" />
              </BottomNavigation>
            </div>
          </ExampleSection>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>API Reference</H2>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>BottomNavigation</h3>
          <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Controlled active item value.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>defaultValue</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Initial active value when uncontrolled.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onValueChange</td><td style={tdMono}>(value: string) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when the active item changes.</td></tr>
              </tbody>
            </table>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "8px 0 0", color: "var(--color-foreground)" }}>BottomNavigationItem</h3>
          <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>value</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Unique value identifying this item.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>icon</td><td style={tdMono}>React.ReactNode</td><td style={tdMono}>—</td><td style={tdCell}>Icon rendered above the label.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>label</td><td style={tdMono}>React.ReactNode</td><td style={tdMono}>—</td><td style={tdCell}>Text label for the item.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
