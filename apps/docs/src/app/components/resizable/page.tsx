"use client"

import { useEffect, useRef, useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Check, Copy, GripVertical, GripHorizontal } from "lucide-react"

/* Working resizable-panels demo built on native pointer events.
   Mirrors the shadcn <ResizablePanelGroup> API shape for the docs. */
function ResizablePanels({
  direction = "horizontal",
  labels = ["One", "Two"],
}: {
  direction?: "horizontal" | "vertical"
  labels?: [string, string] | string[]
}) {
  const [pct, setPct] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const horizontal = direction === "horizontal"

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const raw = horizontal
        ? ((e.clientX - rect.left) / rect.width) * 100
        : ((e.clientY - rect.top) / rect.height) * 100
      setPct(Math.min(85, Math.max(15, raw)))
    }
    const onUp = () => {
      dragging.current = false
      document.body.style.userSelect = ""
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [horizontal])

  const panelStyle = (grow: number): React.CSSProperties => ({
    flexBasis: `${grow}%`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--color-foreground)",
    overflow: "hidden",
  })

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: horizontal ? "row" : "column",
        width: "100%",
        height: horizontal ? 220 : 300,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        overflow: "hidden",
        background: "var(--color-background)",
      }}
    >
      <div style={panelStyle(pct)}>{labels[0]}</div>
      <div
        onPointerDown={() => {
          dragging.current = true
          document.body.style.userSelect = "none"
        }}
        role="separator"
        aria-orientation={horizontal ? "vertical" : "horizontal"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "var(--color-border)",
          cursor: horizontal ? "col-resize" : "row-resize",
          width: horizontal ? 8 : "100%",
          height: horizontal ? "100%" : 8,
          touchAction: "none",
        }}
      >
        {horizontal ? (
          <GripVertical size={14} style={{ color: "var(--color-muted-foreground)" }} />
        ) : (
          <GripHorizontal size={14} style={{ color: "var(--color-muted-foreground)" }} />
        )}
      </div>
      <div style={panelStyle(100 - pct)}>{labels[1]}</div>
    </div>
  )
}

export default function ResizablePage() {
  return (
    <DocsShell title="Resizable">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Resizable</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          Accessible, draggable panel groups for splitting a layout into resizable regions. Drag the
          handle to redistribute space between panels.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <div style={{ width: "100%" }}>
              <ResizablePanels labels={["Sidebar", "Content"]} />
            </div>
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/resizable`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@seamless/ui"

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={50}>Sidebar</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>Content</ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <CodeBlock
          code={`<ResizablePanelGroup>
  <ResizablePanel />
  <ResizableHandle />
  <ResizablePanel />
</ResizablePanelGroup>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Horizontal"
          description="Split content into two side-by-side panels. Drag the vertical handle to resize."
          preview={
            <div style={{ width: "100%" }}>
              <ResizablePanels labels={["Left", "Right"]} />
            </div>
          }
          code={`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`}
        />

        <Example
          title="Vertical"
          description="Set direction to vertical to stack panels and drag a horizontal handle."
          preview={
            <div style={{ width: "100%" }}>
              <ResizablePanels direction="vertical" labels={["Header", "Body"]} />
            </div>
          }
          code={`<ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={35}>Header</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}>Body</ResizablePanel>
</ResizablePanelGroup>`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>ResizablePanelGroup</h3>
        <PropsTable
          rows={[
            { prop: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Axis along which panels are arranged." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>ResizablePanel</h3>
        <PropsTable
          rows={[
            { prop: "defaultSize", type: "number", description: "Initial size of the panel as a percentage." },
            { prop: "minSize", type: "number", description: "Minimum size the panel can shrink to (percent)." },
            { prop: "maxSize", type: "number", description: "Maximum size the panel can grow to (percent)." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>ResizableHandle</h3>
        <PropsTable
          rows={[
            { prop: "withHandle", type: "boolean", default: "false", description: "Render a visible grip on the handle." },
          ]}
        />
      </div>
    </DocsShell>
  )
}

/* ------------------------------------------------------------------ */
/* Shared documentation primitives (inline, page-local)               */
/* ------------------------------------------------------------------ */

type PropRow = { prop: string; type: string; default?: string; description: string }

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 600, marginTop: 48, marginBottom: 4 }
const thStyle: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const codeInline: React.CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 12, background: "var(--color-muted)", padding: "2px 6px", borderRadius: 4, color: "var(--color-foreground)" }

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
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 84,
          background: "var(--color-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--color-foreground)" }}>
          {code}
        </code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight: 320,
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Example({
  title,
  description,
  preview,
  code,
}: {
  title: string
  description: string
  preview: React.ReactNode
  code: string
}) {
  return (
    <section style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h3>
      <p style={{ color: "var(--color-muted-foreground)", fontSize: 14, marginTop: 4, marginBottom: 0 }}>{description}</p>
      <div style={{ marginTop: 16 }}>
        <PreviewCard>{preview}</PreviewCard>
        <CodeBlock code={code} />
      </div>
    </section>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: 8 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={thStyle}>Prop</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Default</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td style={tdStyle}><code style={codeInline}>{r.prop}</code></td>
              <td style={tdStyle}><code style={codeInline}>{r.type}</code></td>
              <td style={tdStyle}>{r.default ? <code style={codeInline}>{r.default}</code> : "—"}</td>
              <td style={tdStyle}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
