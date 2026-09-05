"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { KeyboardKey } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace"

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
        position: "absolute", top: 8, right: 8, display: "inline-flex", alignItems: "center",
        gap: 4, padding: "4px 8px", fontSize: 12, borderRadius: 6,
        border: "1px solid var(--color-border)", background: "var(--color-background)",
        color: "var(--color-muted-foreground)", cursor: "pointer",
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
      <pre style={{ margin: 0, overflowX: "auto", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 16, fontSize: 13, lineHeight: 1.6 }}>
        <code style={{ fontFamily: mono, color: "var(--color-foreground)" }}>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function Preview({ children, minHeight = 320 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 16, minHeight, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 32 }}>
      {children}
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 44 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{title}</h2>
      {description && <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--color-muted-foreground)" }}>{description}</p>}
      {children}
    </section>
  )
}

function Example({ title, description, preview, code }: { title: string; description: string; preview: React.ReactNode; code: string }) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{title}</h3>
      <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--color-muted-foreground)" }}>{description}</p>
      <Preview minHeight={180}>{preview}</Preview>
      <CodeBlock code={code} />
    </div>
  )
}

const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 13, color: "var(--color-foreground)" }
const td: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const tdMono: React.CSSProperties = { padding: "10px 14px", fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", verticalAlign: "top", whiteSpace: "nowrap" }

function PropsTable({ rows }: { rows: { prop: string; type: string; def?: string; desc: string }[] }) {
  return (
    <div style={{ marginTop: 16, overflowX: "auto", borderRadius: 8, border: "1px solid var(--color-border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td style={tdMono}>{r.prop}</td>
              <td style={tdMono}>{r.type}</td>
              <td style={tdMono}>{r.def ?? "—"}</td>
              <td style={td}>{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function KbdPage() {
  return (
    <DocsShell title="Kbd">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Kbd</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          Displays a keyboard key or shortcut. Rendered as a semantic <code style={{ fontFamily: mono, fontSize: 15 }}>&lt;kbd&gt;</code> element via KeyboardKey.
        </p>

        <Preview>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <KeyboardKey>⌘</KeyboardKey>
            <KeyboardKey>K</KeyboardKey>
          </div>
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/kbd`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { KeyboardKey } from "@/components/ui/keyboard-key"

export default function Example() {
  return (
    <span className="inline-flex items-center gap-1">
      <KeyboardKey>⌘</KeyboardKey>
      <KeyboardKey>K</KeyboardKey>
    </span>
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Single Keys"
            description="Individual keys rendered at a compact size."
            preview={
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <KeyboardKey>Esc</KeyboardKey>
                <KeyboardKey>Tab</KeyboardKey>
                <KeyboardKey>Enter</KeyboardKey>
                <KeyboardKey>⌘</KeyboardKey>
                <KeyboardKey>⇧</KeyboardKey>
              </div>
            }
            code={`<KeyboardKey>Esc</KeyboardKey>
<KeyboardKey>Tab</KeyboardKey>
<KeyboardKey>Enter</KeyboardKey>
<KeyboardKey>⌘</KeyboardKey>
<KeyboardKey>⇧</KeyboardKey>`}
          />
          <Example
            title="Key Combinations"
            description="Compose several keys to show a shortcut."
            preview={
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <KeyboardKey>⌘</KeyboardKey><KeyboardKey>⇧</KeyboardKey><KeyboardKey>P</KeyboardKey>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <KeyboardKey>Ctrl</KeyboardKey><KeyboardKey>C</KeyboardKey>
                </span>
              </div>
            }
            code={`<span className="inline-flex items-center gap-1">
  <KeyboardKey>⌘</KeyboardKey>
  <KeyboardKey>⇧</KeyboardKey>
  <KeyboardKey>P</KeyboardKey>
</span>`}
          />
          <Example
            title="Outline Variant"
            description="A lighter style that sits on the page background."
            preview={
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <KeyboardKey variant="outline">⌘</KeyboardKey>
                <KeyboardKey variant="outline">K</KeyboardKey>
              </div>
            }
            code={`<KeyboardKey variant="outline">⌘</KeyboardKey>
<KeyboardKey variant="outline">K</KeyboardKey>`}
          />
          <Example
            title="Within Text"
            description="Inline shortcuts read naturally inside a sentence."
            preview={
              <p style={{ fontSize: 15, color: "var(--color-foreground)", lineHeight: 1.7, maxWidth: 440, textAlign: "center" }}>
                Press{" "}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>
                  <KeyboardKey>⌘</KeyboardKey><KeyboardKey>K</KeyboardKey>
                </span>{" "}
                to open the command palette.
              </p>
            }
            code={`<p>
  Press <KeyboardKey>⌘</KeyboardKey><KeyboardKey>K</KeyboardKey> to
  open the command palette.
</p>`}
          />
          <Example
            title="In a Menu Row"
            description="Shortcuts aligned to the end of a menu item."
            preview={
              <div style={{ width: 260, border: "1px solid var(--color-border)", borderRadius: 8, background: "var(--color-background)", overflow: "hidden" }}>
                {[
                  { label: "New File", keys: ["⌘", "N"] },
                  { label: "Search", keys: ["⌘", "K"] },
                  { label: "Settings", keys: ["⌘", ","] },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", fontSize: 14, color: "var(--color-foreground)", borderTop: "1px solid var(--color-border)" }}>
                    <span>{row.label}</span>
                    <span style={{ display: "inline-flex", gap: 4 }}>
                      {row.keys.map((k, i) => (<KeyboardKey key={i}>{k}</KeyboardKey>))}
                    </span>
                  </div>
                ))}
              </div>
            }
            code={`<div className="flex items-center justify-between px-3 py-2">
  <span>Search</span>
  <span className="inline-flex gap-1">
    <KeyboardKey>⌘</KeyboardKey>
    <KeyboardKey>K</KeyboardKey>
  </span>
</div>`}
          />
        </Section>

        <Section title="API Reference" description="KeyboardKey accepts the following props.">
          <PropsTable
            rows={[
              { prop: "variant", type: '"default" | "outline"', def: '"default"', desc: "Visual style of the key." },
              { prop: "className", type: "string", desc: "Additional classes for the kbd element." },
              { prop: "children", type: "React.ReactNode", desc: "The key label or symbol to display." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
