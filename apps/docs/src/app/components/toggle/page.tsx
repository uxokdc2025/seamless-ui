"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Copy, Check, Bold, Italic, Underline } from "lucide-react"

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

type ToggleSize = "sm" | "default" | "lg"
type ToggleVariant = "default" | "outline"

function Toggle({
  children, defaultPressed = false, variant = "default", size = "default", disabled = false, ariaLabel,
}: {
  children: React.ReactNode
  defaultPressed?: boolean
  variant?: ToggleVariant
  size?: ToggleSize
  disabled?: boolean
  ariaLabel?: string
}) {
  const [pressed, setPressed] = useState(defaultPressed)
  const dims: Record<ToggleSize, React.CSSProperties> = {
    sm: { height: 32, padding: "0 8px", minWidth: 32 },
    default: { height: 36, padding: "0 12px", minWidth: 36 },
    lg: { height: 40, padding: "0 20px", minWidth: 40 },
  }
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => setPressed((p) => !p)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none", transition: "background .15s, color .15s",
        border: variant === "outline" ? "1px solid var(--color-border)" : "1px solid transparent",
        background: pressed ? "var(--color-accent)" : "transparent",
        color: pressed ? "var(--color-accent-foreground)" : "var(--color-foreground)",
        opacity: disabled ? 0.5 : 1, ...dims[size],
      }}
    >
      {children}
    </button>
  )
}

export default function TogglePage() {
  return (
    <DocsShell title="Toggle">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Toggle</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          A two-state button that can be either on or off. Useful for toolbar controls such as bold, italic, and underline.
        </p>

        <Preview>
          <Toggle ariaLabel="Toggle italic"><Italic size={16} /></Toggle>
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/toggle`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { Toggle } from "@/components/ui/toggle"

export default function Example() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Default"
            description="The default toggle with an icon."
            preview={<Toggle ariaLabel="Toggle bold"><Bold size={16} /></Toggle>}
            code={`<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`}
          />
          <Example
            title="Outline"
            description="Toggle with a visible border for lower-emphasis toolbars."
            preview={<Toggle variant="outline" ariaLabel="Toggle italic"><Italic size={16} /></Toggle>}
            code={`<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>`}
          />
          <Example
            title="With Text"
            description="Combine an icon with a label."
            preview={<Toggle ariaLabel="Toggle italic"><Italic size={16} /> Italic</Toggle>}
            code={`<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
  Italic
</Toggle>`}
          />
          <Example
            title="Sizes"
            description="Toggles come in small, default, and large sizes."
            preview={
              <>
                <Toggle size="sm" ariaLabel="Small"><Bold size={14} /></Toggle>
                <Toggle size="default" ariaLabel="Default"><Bold size={16} /></Toggle>
                <Toggle size="lg" ariaLabel="Large"><Bold size={18} /></Toggle>
              </>
            }
            code={`<Toggle size="sm"><Bold className="h-3.5 w-3.5" /></Toggle>
<Toggle size="default"><Bold className="h-4 w-4" /></Toggle>
<Toggle size="lg"><Bold className="h-5 w-5" /></Toggle>`}
          />
          <Example
            title="Disabled"
            description="A disabled toggle cannot be interacted with."
            preview={<Toggle disabled ariaLabel="Toggle underline"><Underline size={16} /></Toggle>}
            code={`<Toggle disabled aria-label="Toggle underline">
  <Underline className="h-4 w-4" />
</Toggle>`}
          />
        </Section>

        <Section title="API Reference" description="Toggle accepts the following props.">
          <PropsTable
            rows={[
              { prop: "pressed", type: "boolean", desc: "Controlled pressed state of the toggle." },
              { prop: "defaultPressed", type: "boolean", def: "false", desc: "Initial pressed state when uncontrolled." },
              { prop: "onPressedChange", type: "(pressed: boolean) => void", desc: "Callback fired when the pressed state changes." },
              { prop: "variant", type: '"default" | "outline"', def: '"default"', desc: "Visual style of the toggle." },
              { prop: "size", type: '"sm" | "default" | "lg"', def: '"default"', desc: "Size of the toggle." },
              { prop: "disabled", type: "boolean", def: "false", desc: "Whether the toggle is disabled." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
