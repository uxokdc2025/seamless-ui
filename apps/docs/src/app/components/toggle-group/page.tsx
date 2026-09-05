"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Copy, Check, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"

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

type Item = { value: string; label: React.ReactNode; ariaLabel: string }

function GroupItem({ active, outline, disabled, onClick, children }: {
  active: boolean; outline?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        height: 36, minWidth: 36, padding: "0 12px", fontSize: 14, fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer", userSelect: "none",
        border: outline ? "1px solid var(--color-border)" : "1px solid transparent",
        background: active ? "var(--color-accent)" : "transparent",
        color: active ? "var(--color-accent-foreground)" : "var(--color-foreground)",
        opacity: disabled ? 0.5 : 1, transition: "background .15s, color .15s",
      }}
    >
      {children}
    </button>
  )
}

function ToggleGroup({ items, type = "single", outline = false, disabled = false, defaultValue = [] }: {
  items: Item[]; type?: "single" | "multiple"; outline?: boolean; disabled?: boolean; defaultValue?: string[]
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue)
  const toggle = (value: string) => {
    if (type === "single") {
      setSelected((cur) => (cur[0] === value ? [] : [value]))
    } else {
      setSelected((cur) => (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]))
    }
  }
  return (
    <div
      role="group"
      style={{
        display: "inline-flex", borderRadius: 8, overflow: "hidden", gap: outline ? 0 : 2,
        border: outline ? "1px solid var(--color-border)" : "none", padding: outline ? 0 : 2,
        background: outline ? "transparent" : "var(--color-background)",
      }}
    >
      {items.map((it) => (
        <GroupItem
          key={it.value}
          active={selected.includes(it.value)}
          outline={outline}
          disabled={disabled}
          onClick={() => toggle(it.value)}
        >
          {it.label}
        </GroupItem>
      ))}
    </div>
  )
}

export default function ToggleGroupPage() {
  return (
    <DocsShell title="Toggle Group">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Toggle Group</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          A set of two-state buttons that can be toggled on or off. Supports single or multiple selection.
        </p>

        <Preview>
          <ToggleGroup
            type="multiple"
            defaultValue={["bold"]}
            items={[
              { value: "bold", label: <Bold size={16} />, ariaLabel: "Bold" },
              { value: "italic", label: <Italic size={16} />, ariaLabel: "Italic" },
              { value: "underline", label: <Underline size={16} />, ariaLabel: "Underline" },
            ]}
          />
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/toggle-group`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Example() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`} />
        </Section>

        <Section title="Composition">
          <CodeBlock code={`<ToggleGroup>
  <ToggleGroupItem />
  <ToggleGroupItem />
</ToggleGroup>`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Multiple Selection"
            description="Allow more than one item to be pressed at a time."
            preview={
              <ToggleGroup
                type="multiple"
                items={[
                  { value: "bold", label: <Bold size={16} />, ariaLabel: "Bold" },
                  { value: "italic", label: <Italic size={16} />, ariaLabel: "Italic" },
                  { value: "underline", label: <Underline size={16} />, ariaLabel: "Underline" },
                ]}
              />
            }
            code={`<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`}
          />
          <Example
            title="Single Selection"
            description="Only one item can be pressed at a time, like alignment."
            preview={
              <ToggleGroup
                type="single"
                defaultValue={["center"]}
                items={[
                  { value: "left", label: <AlignLeft size={16} />, ariaLabel: "Align left" },
                  { value: "center", label: <AlignCenter size={16} />, ariaLabel: "Align center" },
                  { value: "right", label: <AlignRight size={16} />, ariaLabel: "Align right" },
                ]}
              />
            }
            code={`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`}
          />
          <Example
            title="Outline"
            description="A bordered container groups the toggles together visually."
            preview={
              <ToggleGroup
                type="multiple"
                outline
                items={[
                  { value: "bold", label: <Bold size={16} />, ariaLabel: "Bold" },
                  { value: "italic", label: <Italic size={16} />, ariaLabel: "Italic" },
                  { value: "underline", label: <Underline size={16} />, ariaLabel: "Underline" },
                ]}
              />
            }
            code={`<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`}
          />
          <Example
            title="Disabled"
            description="Disable the entire group to prevent interaction."
            preview={
              <ToggleGroup
                type="multiple"
                disabled
                defaultValue={["italic"]}
                items={[
                  { value: "bold", label: <Bold size={16} />, ariaLabel: "Bold" },
                  { value: "italic", label: <Italic size={16} />, ariaLabel: "Italic" },
                  { value: "underline", label: <Underline size={16} />, ariaLabel: "Underline" },
                ]}
              />
            }
            code={`<ToggleGroup type="multiple" disabled>
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
</ToggleGroup>`}
          />
        </Section>

        <Section title="API Reference" description="ToggleGroup and ToggleGroupItem props.">
          <PropsTable
            rows={[
              { prop: "type", type: '"single" | "multiple"', def: '"single"', desc: "Whether one or many items can be pressed." },
              { prop: "value", type: "string | string[]", desc: "Controlled pressed value(s)." },
              { prop: "defaultValue", type: "string | string[]", desc: "Initial pressed value(s) when uncontrolled." },
              { prop: "onValueChange", type: "(value) => void", desc: "Callback fired when the selection changes." },
              { prop: "variant", type: '"default" | "outline"', def: '"default"', desc: "Visual style of the group items." },
              { prop: "size", type: '"sm" | "default" | "lg"', def: '"default"', desc: "Size applied to all items." },
              { prop: "disabled", type: "boolean", def: "false", desc: "Disables all items in the group." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
