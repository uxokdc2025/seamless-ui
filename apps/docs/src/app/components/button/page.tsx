"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Button, buttonVariants } from "@seamless/ui"
import { Copy, Check, Download, ArrowRight, Trash2, Mail, Loader2 } from "lucide-react"

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
          minHeight: "180px",
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

export default function ButtonPageDoc() {
  return (
    <DocsShell title="Button">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Button
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          Displays a button or a component that looks like a button, with
          variants and sizes.
        </p>

        <PreviewCard>
          <Button>Button</Button>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/button`} />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import { Button } from "@seamless/ui"

export default function Example() {
  return <Button variant="outline">Click me</Button>
}`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Variants"
          description="Six variants cover the full action hierarchy."
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </Example>

        <Example
          title="Sizes"
          description="Three text sizes plus a square icon size."
          code={`<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Mail className="h-4 w-4" /></Button>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Mail style={{ width: "16px", height: "16px" }} />
            </Button>
          </div>
        </Example>

        <Example
          title="With icon"
          description="Compose an icon and label; use a small gap between them."
          code={`<Button style={{ gap: 8 }}>
  <Download className="h-4 w-4" />
  Download
</Button>
<Button variant="outline" style={{ gap: 8 }}>
  Continue
  <ArrowRight className="h-4 w-4" />
</Button>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button style={{ gap: "8px" }}>
              <Download style={{ width: "16px", height: "16px" }} />
              Download
            </Button>
            <Button variant="outline" style={{ gap: "8px" }}>
              Continue
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Button>
          </div>
        </Example>

        <Example
          title="Icon only"
          description="Use the icon size for square, icon-only buttons. Always provide an aria-label."
          code={`<Button size="icon" aria-label="Download">
  <Download className="h-4 w-4" />
</Button>
<Button size="icon" variant="outline" aria-label="Delete">
  <Trash2 className="h-4 w-4" />
</Button>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Button size="icon" aria-label="Download">
              <Download style={{ width: "16px", height: "16px" }} />
            </Button>
            <Button size="icon" variant="outline" aria-label="Delete">
              <Trash2 style={{ width: "16px", height: "16px" }} />
            </Button>
          </div>
        </Example>

        <Example
          title="Disabled"
          description="Disabled buttons are non-interactive and rendered at reduced opacity."
          code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </Example>

        <Example
          title="Loading"
          description="Show a spinning icon and disable the button while an action is in flight."
          code={`<Button disabled>
  <Loader2 className="h-4 w-4 animate-spin" />
  Please wait
</Button>`}
        >
          <Button disabled style={{ gap: "8px" }}>
            <Loader2 className="animate-spin" style={{ width: "16px", height: "16px" }} />
            Please wait
          </Button>
        </Example>

        <Example
          title="As child"
          description="Use asChild to render a different element (like a link) with button styling, or apply buttonVariants directly."
          code={`<Button asChild>
  <a href="/login">Login</a>
</Button>

<a className={buttonVariants({ variant: "outline" })} href="/docs">
  Documentation
</a>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button asChild>
              <a href="#login">Login</a>
            </Button>
            <a className={buttonVariants({ variant: "outline" })} href="#docs">
              Documentation
            </a>
          </div>
        </Example>

        <SectionTitle>API Reference</SectionTitle>
        <PropsTable
          rows={[
            {
              prop: "variant",
              type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
              def: '"default"',
              desc: "The visual style of the button.",
            },
            {
              prop: "size",
              type: '"default" | "sm" | "lg" | "icon"',
              def: '"default"',
              desc: "The size of the button.",
            },
            {
              prop: "asChild",
              type: "boolean",
              def: "false",
              desc: "Merge props onto the child element instead of rendering a button (Radix Slot).",
            },
            {
              prop: "disabled",
              type: "boolean",
              def: "false",
              desc: "Whether the button is disabled.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
