"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { FormField, FieldGroup, Input, Textarea, Label, Checkbox } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

export default function FieldPage() {
  const [email, setEmail] = useState("")

  return (
    <DocsShell title="Field">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Field</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          Field wraps a form control with its label, help text, and validation message. Use{" "}
          <code style={codeInline}>FormField</code> for a single input and{" "}
          <code style={codeInline}>FieldGroup</code> to group related fields under a legend.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <div style={{ width: 340 }}>
              <FormField label="Email" htmlFor="email-preview" help="We'll never share your email.">
                <Input id="email-preview" type="email" placeholder="you@example.com" />
              </FormField>
            </div>
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/field`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import { FormField, Input } from "@seamless/ui"

export default function Example() {
  return (
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" placeholder="you@example.com" />
    </FormField>
  )
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <CodeBlock
          code={`<FieldGroup legend="Account" description="...">
  <FormField label="Email" htmlFor="email" help="...">
    <Input id="email" />
  </FormField>
  <FormField label="Password" htmlFor="password" error="...">
    <Input id="password" type="password" />
  </FormField>
</FieldGroup>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Basic field"
          description="A label associated with a control via htmlFor, plus optional help text."
          preview={
            <div style={{ width: 340 }}>
              <FormField label="Username" htmlFor="username" help="This will be your public handle.">
                <Input id="username" placeholder="acme" />
              </FormField>
            </div>
          }
          code={`<FormField label="Username" htmlFor="username" help="This will be your public handle.">
  <Input id="username" placeholder="acme" />
</FormField>`}
        />

        <Example
          title="Required with validation error"
          description="Set required to add an asterisk, and error to render an inline validation message (help is hidden while an error is present)."
          preview={
            <div style={{ width: 340 }}>
              <FormField
                label="Email"
                htmlFor="email-err"
                required
                error={email && !email.includes("@") ? "Enter a valid email address." : undefined}
              >
                <Input
                  id="email-err"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </FormField>
            </div>
          }
          code={`<FormField
  label="Email"
  htmlFor="email"
  required
  error={invalid ? "Enter a valid email address." : undefined}
>
  <Input id="email" value={email} onChange={onChange} />
</FormField>`}
        />

        <Example
          title="Horizontal orientation"
          description="Set orientation to horizontal to place the label beside the control."
          preview={
            <div style={{ width: 420 }}>
              <FormField label="Bio" htmlFor="bio" orientation="horizontal" help="Max 160 characters.">
                <Textarea id="bio" placeholder="Tell us about yourself" rows={3} />
              </FormField>
            </div>
          }
          code={`<FormField label="Bio" htmlFor="bio" orientation="horizontal" help="Max 160 characters.">
  <Textarea id="bio" rows={3} />
</FormField>`}
        />

        <Example
          title="Field group"
          description="Group related fields inside a fieldset with a legend and description."
          preview={
            <div style={{ width: 380 }}>
              <FieldGroup legend="Notifications" description="Choose how you want to be reached.">
                <FormField label="Work email" htmlFor="work">
                  <Input id="work" type="email" placeholder="you@work.com" />
                </FormField>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                  <Checkbox id="marketing" />
                  <span>Send me product updates</span>
                </label>
              </FieldGroup>
            </div>
          }
          code={`<FieldGroup legend="Notifications" description="Choose how you want to be reached.">
  <FormField label="Work email" htmlFor="work">
    <Input id="work" type="email" />
  </FormField>
  <label>
    <Checkbox id="marketing" /> Send me product updates
  </label>
</FieldGroup>`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>FormField</h3>
        <PropsTable
          rows={[
            { prop: "label", type: "string", description: "Text rendered in the field label." },
            { prop: "htmlFor", type: "string", description: "id of the control the label is bound to." },
            { prop: "required", type: "boolean", default: "false", description: "Appends a required asterisk to the label." },
            { prop: "help", type: "string", description: "Helper text shown below the control (hidden when error is set)." },
            { prop: "error", type: "string", description: "Validation message shown with role=\"alert\"." },
            { prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Label placement relative to the control." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>FieldGroup</h3>
        <PropsTable
          rows={[
            { prop: "legend", type: "string", description: "Fieldset legend heading." },
            { prop: "description", type: "string", description: "Supporting text under the legend." },
            { prop: "error", type: "string", description: "Group-level validation message." },
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
