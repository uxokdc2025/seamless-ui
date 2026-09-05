"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { NotificationBadge, Avatar, AvatarFallback, IconButton } from "@seamless/ui"
import { Copy, Check, Bell, Mail, ShoppingCart } from "lucide-react"

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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 40, minHeight: 320, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
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

export default function NotificationBadgePage() {
  return (
    <DocsShell title="Notification Badge">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Notification Badge</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A small count or dot overlaid on an icon, avatar, or button to signal unread or pending items.
          </p>
        </header>

        <Preview>
          <NotificationBadge count={5}>
            <IconButton variant="outline" aria-label="Notifications"><Bell size={20} /></IconButton>
          </NotificationBadge>
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/notification-badge" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { NotificationBadge } from "@seamless/ui"
import { Bell } from "lucide-react"

export default function Example() {
  return (
    <NotificationBadge count={5}>
      <Bell size={20} />
    </NotificationBadge>
  )
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Count"
            description="Wraps any element and overlays the number of pending items."
            code={`<NotificationBadge count={5}>
  <IconButton variant="outline" aria-label="Notifications">
    <Bell size={20} />
  </IconButton>
</NotificationBadge>`}
          >
            <NotificationBadge count={5}>
              <IconButton variant="outline" aria-label="Notifications"><Bell size={20} /></IconButton>
            </NotificationBadge>
          </ExampleSection>

          <ExampleSection
            title="Dot"
            description="Use a plain dot when the exact count is not important."
            code={`<NotificationBadge dot>
  <IconButton variant="outline" aria-label="Mail">
    <Mail size={20} />
  </IconButton>
</NotificationBadge>`}
          >
            <NotificationBadge dot>
              <IconButton variant="outline" aria-label="Mail"><Mail size={20} /></IconButton>
            </NotificationBadge>
          </ExampleSection>

          <ExampleSection
            title="Max"
            description="Counts above max render as {max}+."
            code={`<NotificationBadge count={142} max={99}>
  <IconButton variant="outline" aria-label="Cart">
    <ShoppingCart size={20} />
  </IconButton>
</NotificationBadge>`}
          >
            <NotificationBadge count={142} max={99}>
              <IconButton variant="outline" aria-label="Cart"><ShoppingCart size={20} /></IconButton>
            </NotificationBadge>
          </ExampleSection>

          <ExampleSection
            title="On an avatar"
            description="Anchor a status dot to any element, such as an avatar."
            code={`<NotificationBadge dot variant="success" placement="bottom-right">
  <Avatar>
    <AvatarFallback>DC</AvatarFallback>
  </Avatar>
</NotificationBadge>`}
          >
            <NotificationBadge dot variant="success" placement="bottom-right">
              <Avatar><AvatarFallback>DC</AvatarFallback></Avatar>
            </NotificationBadge>
          </ExampleSection>

          <ExampleSection
            title="Variants"
            description="Choose a color to match the semantic meaning."
            code={`<NotificationBadge count={3} variant="primary">...</NotificationBadge>
<NotificationBadge count={3} variant="destructive">...</NotificationBadge>
<NotificationBadge count={3} variant="success">...</NotificationBadge>`}
          >
            {(["primary", "destructive", "success", "warning", "neutral"] as const).map((v) => (
              <NotificationBadge key={v} count={3} variant={v}>
                <IconButton variant="outline" aria-label={v}><Bell size={20} /></IconButton>
              </NotificationBadge>
            ))}
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>count</td><td style={tdMono}>number</td><td style={tdMono}>—</td><td style={tdCell}>Numeric count to display.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>dot</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Render a plain dot instead of a count.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>max</td><td style={tdMono}>number</td><td style={tdMono}>99</td><td style={tdCell}>Maximum before showing {"{max}+"}.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>showZero</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Show the badge even when count is 0.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>variant</td><td style={tdMono}>&quot;destructive&quot; | &quot;primary&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;neutral&quot;</td><td style={tdMono}>&quot;destructive&quot;</td><td style={tdCell}>Badge color.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>placement</td><td style={tdMono}>&quot;top-right&quot; | &quot;top-left&quot; | &quot;bottom-right&quot; | &quot;bottom-left&quot;</td><td style={tdMono}>&quot;top-right&quot;</td><td style={tdCell}>Corner the badge is anchored to.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>badgeClassName</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Class names for the overlaid badge element.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
