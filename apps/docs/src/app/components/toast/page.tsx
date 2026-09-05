"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Button,
} from "@seamless/ui"
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

type Variant = "default" | "success" | "warning" | "error"

function ToastDemo({ variant = "default", label }: { variant?: Variant; label: string }) {
  const [open, setOpen] = React.useState(false)
  const titles: Record<Variant, string> = {
    default: "Scheduled",
    success: "Saved",
    warning: "Heads up",
    error: "Something went wrong",
  }
  const descriptions: Record<Variant, string> = {
    default: "Your meeting is set for Friday at 10:00 AM.",
    success: "Your changes have been saved successfully.",
    warning: "Your session expires in 5 minutes.",
    error: "We couldn't reach the server. Try again.",
  }
  return (
    <ToastProvider swipeDirection="right">
      <Button variant="outline" onClick={() => { setOpen(false); window.setTimeout(() => setOpen(true), 80) }}>
        {label}
      </Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen}>
        <div style={{ display: "grid", gap: 4 }}>
          <ToastTitle>{titles[variant]}</ToastTitle>
          <ToastDescription>{descriptions[variant]}</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

function ToastWithAction() {
  const [open, setOpen] = React.useState(false)
  return (
    <ToastProvider swipeDirection="right">
      <Button variant="outline" onClick={() => { setOpen(false); window.setTimeout(() => setOpen(true), 80) }}>
        Show with action
      </Button>
      <Toast open={open} onOpenChange={setOpen}>
        <div style={{ display: "grid", gap: 4 }}>
          <ToastTitle>Message archived</ToastTitle>
          <ToastDescription>You can restore it from the archive.</ToastDescription>
        </div>
        <ToastAction altText="Undo archive">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

export default function ToastPage() {
  return (
    <DocsShell title="Toast">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Toast</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A succinct message that appears temporarily to give feedback about an action.
          </p>
        </header>

        <Preview>
          <ToastDemo label="Show toast" />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/toast" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Anatomy</H2>
          <CodeBlock code={`<ToastProvider>
  <Toast>
    <ToastTitle />
    <ToastDescription />
    <ToastAction />
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@seamless/ui"

export default function Example() {
  const [open, setOpen] = React.useState(false)
  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show</Button>
      <Toast open={open} onOpenChange={setOpen}>
        <ToastTitle>Scheduled</ToastTitle>
        <ToastDescription>Friday at 10:00 AM.</ToastDescription>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="With an action"
            description="Add a ToastAction button for a follow-up like undo."
            code={`<Toast open={open} onOpenChange={setOpen}>
  <ToastTitle>Message archived</ToastTitle>
  <ToastDescription>You can restore it from the archive.</ToastDescription>
  <ToastAction altText="Undo archive">Undo</ToastAction>
  <ToastClose />
</Toast>`}
          >
            <ToastWithAction />
          </ExampleSection>

          <ExampleSection
            title="Variants"
            description="Communicate status with default, success, warning and error styles."
            code={`<Toast variant="success">...</Toast>
<Toast variant="warning">...</Toast>
<Toast variant="error">...</Toast>`}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <ToastDemo variant="success" label="Success" />
              <ToastDemo variant="warning" label="Warning" />
              <ToastDemo variant="error" label="Error" />
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
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>variant</td><td style={tdMono}>&quot;default&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;error&quot;</td><td style={tdMono}>&quot;default&quot;</td><td style={tdCell}>Visual status style of the toast.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>open</td><td style={tdMono}>boolean</td><td style={tdMono}>—</td><td style={tdCell}>Controlled open state.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onOpenChange</td><td style={tdMono}>(open: boolean) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when the toast opens or closes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>duration</td><td style={tdMono}>number</td><td style={tdMono}>5000</td><td style={tdCell}>Time in ms before the toast auto-dismisses.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>ToastAction.altText</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Required accessible description of the action.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>ToastProvider.swipeDirection</td><td style={tdMono}>&quot;right&quot; | &quot;left&quot; | &quot;up&quot; | &quot;down&quot;</td><td style={tdMono}>&quot;right&quot;</td><td style={tdCell}>Direction to swipe a toast away.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
