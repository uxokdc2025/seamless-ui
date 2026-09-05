"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button } from "@seamless/ui"
import { Copy, Check as CheckIcon, ChevronsUpDown } from "lucide-react"

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy to clipboard"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {copied ? <CheckIcon style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 48,
          overflowX: "auto",
          fontFamily: mono,
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-foreground)",
        }}
      >
        <code style={{ fontFamily: mono }}>{code}</code>
      </pre>
    </div>
  )
}

function InstallBlock({ command }: { command: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        padding: "12px 16px",
      }}
    >
      <span style={{ color: "var(--color-muted-foreground)", fontFamily: mono, fontSize: 13 }}>$</span>
      <code style={{ flex: 1, fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", overflowX: "auto" }}>
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  )
}

function Preview({ children, minHeight = 320 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight,
          padding: 32,
          background: "var(--color-muted)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, color: "var(--color-foreground)" }}>{title}</h2>
      {children}
    </section>
  )
}

function ExampleBlock({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: "var(--color-foreground)" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginTop: 0, marginBottom: 12 }}>
        {description}
      </p>
      <div style={{ marginBottom: 12 }}>
        <Preview minHeight={200}>{children}</Preview>
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function Tree({ code }: { code: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 16,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        fontFamily: mono,
        fontSize: 13,
        lineHeight: 1.6,
        color: "var(--color-muted-foreground)",
        overflowX: "auto",
      }}
    >
      <code style={{ fontFamily: mono }}>{code}</code>
    </pre>
  )
}

function PropsTable({ rows }: { rows: { prop: string; type: string; def: string; description: string }[] }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 640 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  fontWeight: 600,
                  color: "var(--color-foreground)",
                  borderBottom: "1px solid var(--color-border)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.prop} style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", whiteSpace: "nowrap" }}>
                {r.prop}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)" }}>
                {r.type}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)", whiteSpace: "nowrap" }}>
                {r.def}
              </td>
              <td style={{ padding: "10px 16px", color: "var(--color-muted-foreground)" }}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-foreground)", margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", marginTop: 8, marginBottom: 0 }}>{description}</p>
    </div>
  )
}

function ApiHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "24px 0 10px", fontFamily: mono, color: "var(--color-foreground)" }}>
      {children}
    </h3>
  )
}


function CollapsibleDemo() {
  const [open, setOpen] = React.useState(false)
  const rowStyle: React.CSSProperties = {
    borderRadius: 6,
    border: "1px solid var(--color-border)",
    padding: "8px 12px",
    fontSize: 13,
    fontFamily: mono,
    color: "var(--color-foreground)",
    background: "var(--color-background)",
  }
  return (
    <Collapsible open={open} onOpenChange={setOpen} style={{ width: 340, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-foreground)" }}>
          @seamless starred 3 repositories
        </span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon">
            <ChevronsUpDown style={{ width: 16, height: 16 }} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div style={rowStyle}>@seamless/ui</div>
      <CollapsibleContent style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={rowStyle}>@seamless/themes</div>
        <div style={rowStyle}>@seamless/icons</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function CollapsiblePage() {
  return (
    <DocsShell title="Collapsible">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Collapsible"
          description="An interactive component which expands and collapses a panel of content."
        />

        <Preview>
          <CollapsibleDemo />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/collapsible" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@seamless/ui"

export function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden content revealed on open.</CollapsibleContent>
    </Collapsible>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<Collapsible>
  <CollapsibleTrigger />
  <CollapsibleContent />
</Collapsible>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Controlled"
            description="Control the open state with the open and onOpenChange props."
            code={`const [open, setOpen] = React.useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="outline">{open ? "Hide" : "Show"} details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Extra details here.</CollapsibleContent>
</Collapsible>`}
          >
            <CollapsibleDemo />
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <ApiHeading>Collapsible</ApiHeading>
          <PropsTable
            rows={[
              { prop: "open", type: "boolean", def: "-", description: "The controlled open state of the collapsible." },
              { prop: "defaultOpen", type: "boolean", def: "false", description: "The open state when uncontrolled." },
              { prop: "onOpenChange", type: "(open: boolean) => void", def: "-", description: "Callback fired when the open state changes." },
              { prop: "disabled", type: "boolean", def: "false", description: "Disables the trigger and prevents toggling." },
            ]}
          />
          <ApiHeading>CollapsibleTrigger</ApiHeading>
          <PropsTable
            rows={[
              { prop: "asChild", type: "boolean", def: "false", description: "Merge props onto the child element instead of rendering a button." },
            ]}
          />
          <ApiHeading>CollapsibleContent</ApiHeading>
          <PropsTable
            rows={[
              { prop: "forceMount", type: "boolean", def: "-", description: "Force mounting the content for animation control." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
