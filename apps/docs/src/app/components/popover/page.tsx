"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@seamless/ui"
import { Check, Copy, Settings2 } from "lucide-react"

const triggerStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  height: 40,
  padding: "0 16px",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  cursor: "pointer",
}

const fieldLabel: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-foreground)",
}

const fieldInput: CSSProperties = {
  height: 32,
  padding: "0 10px",
  fontSize: 13,
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  width: 96,
}

type PropRow = { prop: string; type: string; default?: string; description: string }

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        fontSize: 12,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: 16,
          paddingRight: 88,
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        padding: 32,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Example({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: ReactNode
  code: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          margin: 0,
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={180}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  const th: CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-foreground)",
  }
  const td: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-foreground)",
    verticalAlign: "top",
    lineHeight: 1.5,
  }
  const tdMono: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-muted-foreground)",
    verticalAlign: "top",
    fontFamily: mono,
  }
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td style={{ ...td, fontFamily: mono, fontWeight: 500 }}>
                {r.prop}
              </td>
              <td style={tdMono}>{r.type}</td>
              <td style={tdMono}>{r.default ?? "—"}</td>
              <td style={td}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.02em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          fontSize: 16,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <DocsShell title={title}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {children}
      </div>
    </DocsShell>
  )
}

export default function PopoverDocsPage() {
  return (
    <Page title="Popover">
      <PageHeader
        title="Popover"
        description="Displays rich content in a portal, anchored to a trigger element. Built on Radix Popover with full focus management and dismiss behavior."
      />

      <PreviewCard>
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" style={triggerStyle}>
              <Settings2 size={16} />
              Open popover
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-foreground)",
                  }}
                >
                  Dimensions
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 13,
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  Set the dimensions for the layer.
                </p>
              </div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={fieldLabel}>Width</span>
                <input defaultValue="100%" style={fieldInput} />
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={fieldLabel}>Height</span>
                <input defaultValue="25px" style={fieldInput} />
              </label>
            </div>
          </PopoverContent>
        </Popover>
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/popover`} />
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@seamless/ui"`}
        />
        <CodeBlock
          code={`<Popover>
  <PopoverTrigger asChild>
    <button>Open</button>
  </PopoverTrigger>
  <PopoverContent>
    Place content here.
  </PopoverContent>
</Popover>`}
        />
      </Section>

      <Section title="Anatomy">
        <CodeBlock
          code={`<Popover>
  <PopoverTrigger />
  <PopoverAnchor />
  <PopoverContent />
</Popover>`}
        />
      </Section>

      <Section title="Examples">
        <Example
          title="Simple content"
          description="A popover can hold any content, from plain text to full forms."
          code={`<Popover>
  <PopoverTrigger asChild>
    <button>Show details</button>
  </PopoverTrigger>
  <PopoverContent>
    <p>The quick brown fox jumps over the lazy dog.</p>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" style={triggerStyle}>
                Show details
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-foreground)",
                  lineHeight: 1.6,
                }}
              >
                The quick brown fox jumps over the lazy dog. Popovers portal
                above other content and trap focus while open.
              </p>
            </PopoverContent>
          </Popover>
        </Example>

        <Example
          title="Alignment"
          description="Use align and sideOffset on PopoverContent to control positioning relative to the trigger."
          code={`<PopoverContent align="start" sideOffset={8}>
  Aligned to the start edge.
</PopoverContent>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" style={triggerStyle}>
                Align start
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={8}>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "var(--color-foreground)",
                }}
              >
                This content is aligned to the start edge of the trigger.
              </p>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>

      <Section title="API Reference">
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-muted-foreground)",
          }}
        >
          The following props apply to{" "}
          <code style={{ fontFamily: mono }}>PopoverContent</code>. The root{" "}
          <code style={{ fontFamily: mono }}>Popover</code> accepts Radix props
          such as <code style={{ fontFamily: mono }}>open</code>,{" "}
          <code style={{ fontFamily: mono }}>defaultOpen</code>, and{" "}
          <code style={{ fontFamily: mono }}>onOpenChange</code>.
        </p>
        <PropsTable
          rows={[
            {
              prop: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description:
                "Alignment of the content against the trigger along its edge.",
            },
            {
              prop: "sideOffset",
              type: "number",
              default: "4",
              description:
                "Distance in pixels between the content and the trigger.",
            },
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"bottom"',
              description: "Preferred side the content renders on.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the content panel.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
