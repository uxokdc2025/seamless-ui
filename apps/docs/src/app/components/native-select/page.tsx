"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { NativeSelect } from "@seamless/ui"
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
      <Preview minHeight={200}>{preview}</Preview>
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

export default function NativeSelectPage() {
  return (
    <DocsShell title="Native Select">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Native Select</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          A styled wrapper around the native <code style={{ fontFamily: mono, fontSize: 15 }}>&lt;select&gt;</code> element. Uses the platform dropdown for the best mobile and accessibility behavior.
        </p>

        <Preview>
          <div style={{ width: 240 }}>
            <NativeSelect defaultValue="banana">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
            </NativeSelect>
          </div>
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/native-select`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { NativeSelect } from "@/components/ui/native-select"

export default function Example() {
  return (
    <NativeSelect defaultValue="banana">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </NativeSelect>
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="With Placeholder"
            description="Show a disabled placeholder option when no value is selected."
            preview={
              <div style={{ width: 240 }}>
                <NativeSelect placeholder="Select a fruit" defaultValue="">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </NativeSelect>
              </div>
            }
            code={`<NativeSelect placeholder="Select a fruit" defaultValue="">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
</NativeSelect>`}
          />
          <Example
            title="With Label"
            description="Pair the select with a label for accessibility."
            preview={
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
                <label htmlFor="country" style={{ fontSize: 14, fontWeight: 500, color: "var(--color-foreground)" }}>Country</label>
                <NativeSelect id="country" defaultValue="us">
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </NativeSelect>
              </div>
            }
            code={`<label htmlFor="country">Country</label>
<NativeSelect id="country" defaultValue="us">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</NativeSelect>`}
          />
          <Example
            title="Option Groups"
            description="Group related options with the native optgroup element."
            preview={
              <div style={{ width: 240 }}>
                <NativeSelect defaultValue="carrot">
                  <optgroup label="Fruits">
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                  </optgroup>
                  <optgroup label="Vegetables">
                    <option value="carrot">Carrot</option>
                    <option value="broccoli">Broccoli</option>
                  </optgroup>
                </NativeSelect>
              </div>
            }
            code={`<NativeSelect defaultValue="carrot">
  <optgroup label="Fruits">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">Carrot</option>
    <option value="broccoli">Broccoli</option>
  </optgroup>
</NativeSelect>`}
          />
          <Example
            title="Disabled"
            description="Disable the whole control to prevent interaction."
            preview={
              <div style={{ width: 240 }}>
                <NativeSelect disabled defaultValue="apple">
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                </NativeSelect>
              </div>
            }
            code={`<NativeSelect disabled defaultValue="apple">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</NativeSelect>`}
          />
        </Section>

        <Section title="API Reference" description="NativeSelect extends the native select element attributes.">
          <PropsTable
            rows={[
              { prop: "placeholder", type: "string", desc: "Text shown as a disabled first option when no value is set." },
              { prop: "value", type: "string", desc: "Controlled selected value." },
              { prop: "defaultValue", type: "string", desc: "Initial value when uncontrolled." },
              { prop: "onChange", type: "(e) => void", desc: "Native change event handler." },
              { prop: "disabled", type: "boolean", def: "false", desc: "Whether the select is disabled." },
              { prop: "required", type: "boolean", def: "false", desc: "Whether selection is required for form submission." },
              { prop: "name", type: "string", desc: "Form field name submitted with the form." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
