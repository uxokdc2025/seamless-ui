"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Alert, AlertTitle, AlertDescription } from "@seamless/ui"
import { Copy, Check, Terminal, RocketIcon } from "lucide-react"

const codeBlockStyle: React.CSSProperties = {
  margin: 0,
  padding: "16px",
  paddingRight: "48px",
  background: "var(--color-muted)",
  borderRadius: "8px",
  fontSize: "13px",
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  overflowX: "auto",
  lineHeight: 1.6,
  color: "var(--color-foreground)",
  whiteSpace: "pre",
}

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
        top: "10px",
        right: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "6px",
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? (
        <Check style={{ width: "14px", height: "14px" }} />
      ) : (
        <Copy style={{ width: "14px", height: "14px" }} />
      )}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: "12px" }}>
      <pre style={codeBlockStyle}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        background: "var(--color-muted)",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "22px",
        fontWeight: 600,
        marginTop: "48px",
        marginBottom: "12px",
        paddingBottom: "8px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {children}
    </h2>
  )
}

function Example({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "var(--color-muted-foreground)",
          marginBottom: "12px",
        }}
      >
        {description}
      </p>
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          background: "var(--color-muted)",
          minHeight: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({
  rows,
}: {
  rows: { prop: string; type: string; def: string; desc: string }[]
}) {
  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 600,
    borderBottom: "1px solid var(--color-border)",
    background: "var(--color-muted)",
  }
  const td: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "13px",
    borderBottom: "1px solid var(--color-border)",
    verticalAlign: "top",
  }
  const mono: React.CSSProperties = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    color: "var(--color-foreground)",
  }
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        overflow: "hidden",
        overflowX: "auto",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}
      >
        <thead>
          <tr>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, ...mono, fontWeight: 600 }}>{r.prop}</td>
              <td
                style={{
                  ...td,
                  ...mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td style={{ ...td, ...mono }}>{r.def}</td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AlertPage() {
  return (
    <DocsShell title="Alert">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Alert
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          Displays a callout for user attention, with an optional icon, title,
          and description.
        </p>

        <PreviewCard>
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Alert>
              <Terminal style={{ width: "16px", height: "16px" }} />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the CLI.
              </AlertDescription>
            </Alert>
          </div>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/alert`} />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import { Alert, AlertTitle, AlertDescription } from "@seamless/ui"
import { Terminal } from "lucide-react"

export default function Example() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`Alert
├── (icon)
├── AlertTitle
└── AlertDescription`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Default"
          description="The neutral variant, used for general informational callouts."
          code={`<Alert>
  <RocketIcon className="h-4 w-4" />
  <AlertTitle>New feature</AlertTitle>
  <AlertDescription>
    Command palette is now available. Press Cmd+K to open it.
  </AlertDescription>
</Alert>`}
        >
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Alert>
              <RocketIcon style={{ width: "16px", height: "16px" }} />
              <AlertTitle>New feature</AlertTitle>
              <AlertDescription>
                Command palette is now available. Press Cmd+K to open it.
              </AlertDescription>
            </Alert>
          </div>
        </Example>

        <Example
          title="Variants"
          description="Semantic variants convey status: success, warning, error, and info."
          code={`<Alert variant="success">
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>Your subscription is now active.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Storage almost full</AlertTitle>
  <AlertDescription>You have used 90% of your quota.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Payment failed</AlertTitle>
  <AlertDescription>Update your card to continue.</AlertDescription>
</Alert>

<Alert variant="info">
  <AlertTitle>Scheduled maintenance</AlertTitle>
  <AlertDescription>The API will be down Sunday 2-3am UTC.</AlertDescription>
</Alert>`}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Alert variant="success">
              <AlertTitle>Payment received</AlertTitle>
              <AlertDescription>
                Your subscription is now active.
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTitle>Storage almost full</AlertTitle>
              <AlertDescription>
                You have used 90% of your quota.
              </AlertDescription>
            </Alert>
            <Alert variant="error">
              <AlertTitle>Payment failed</AlertTitle>
              <AlertDescription>
                Update your card to continue.
              </AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertTitle>Scheduled maintenance</AlertTitle>
              <AlertDescription>
                The API will be down Sunday 2-3am UTC.
              </AlertDescription>
            </Alert>
          </div>
        </Example>

        <Example
          title="Dismissible"
          description="Set dismissible and pass onDismiss to render a close button."
          code={`function Example() {
  const [open, setOpen] = React.useState(true)
  if (!open) return null
  return (
    <Alert variant="info" dismissible onDismiss={() => setOpen(false)}>
      <AlertTitle>Tip</AlertTitle>
      <AlertDescription>You can dismiss this alert.</AlertDescription>
    </Alert>
  )
}`}
        >
          <DismissibleDemo />
        </Example>

        <SectionTitle>API Reference</SectionTitle>
        <PropsTable
          rows={[
            {
              prop: "variant",
              type: '"default" | "success" | "warning" | "error" | "info"',
              def: '"default"',
              desc: "The visual style conveying the alert's severity.",
            },
            {
              prop: "icon",
              type: "React.ReactNode",
              def: "auto",
              desc: "Override the default icon. Pass null to hide the icon.",
            },
            {
              prop: "dismissible",
              type: "boolean",
              def: "false",
              desc: "Renders a close button in the top-right corner.",
            },
            {
              prop: "onDismiss",
              type: "() => void",
              def: "—",
              desc: "Callback fired when the dismiss button is clicked.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}

function DismissibleDemo() {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      {open ? (
        <Alert variant="info" dismissible onDismiss={() => setOpen(false)}>
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>You can dismiss this alert.</AlertDescription>
        </Alert>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            fontSize: "14px",
            color: "var(--color-muted-foreground)",
            background: "transparent",
            border: "1px dashed var(--color-border)",
            borderRadius: "8px",
            padding: "12px 16px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Alert dismissed — click to restore
        </button>
      )}
    </div>
  )
}
