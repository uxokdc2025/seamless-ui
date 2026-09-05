"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { OTPInput, Label } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
const th: React.CSSProperties = {
  padding: "10px 12px",
  fontWeight: 600,
  color: "var(--color-foreground)",
  whiteSpace: "nowrap",
}
const td: React.CSSProperties = { padding: "10px 12px", verticalAlign: "top" }

type Prop = { name: string; type: string; default: string; description: string }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        width: 32,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: "16px 52px 16px 16px",
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: React.ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight,
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 20,
        fontWeight: 600,
        margin: "48px 0 8px",
        color: "var(--color-foreground)",
      }}
    >
      {children}
    </h2>
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
  children: React.ReactNode
  code: string
}) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          margin: "0 0 4px",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 14,
          color: "var(--color-muted-foreground)",
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={200}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: Prop[] }) {
  return (
    <div
      style={{
        marginTop: 12,
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)", textAlign: "left" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.name}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-foreground)",
                  fontWeight: 500,
                }}
              >
                {r.name}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.default}
              </td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function InputOTPPage() {
  const [value, setValue] = React.useState("")
  const [pin, setPin] = React.useState("")
  const [masked, setMasked] = React.useState("")
  const [code, setCode] = React.useState("")

  return (
    <DocsShell title="Input OTP">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Input OTP
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          Accessible one-time-password input with automatic focus management,
          paste support, and keyboard navigation.
        </p>

        <PreviewCard>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <OTPInput value={value} onChange={setValue} />
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "var(--color-muted-foreground)",
              }}
            >
              {value ? `Entered: ${value}` : "Enter your one-time password."}
            </p>
          </div>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/input-otp`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import { OTPInput } from "@seamless/ui"
import { useState } from "react"

export default function Example() {
  const [value, setValue] = useState("")
  return <OTPInput value={value} onChange={setValue} />
}`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Four digits"
          description="Set the length prop to control how many cells are rendered."
          code={`<OTPInput length={4} value={pin} onChange={setPin} />`}
        >
          <OTPInput length={4} value={pin} onChange={setPin} />
        </Example>

        <Example
          title="Masked"
          description="Pass mask to obscure entered characters, ideal for secure PINs."
          code={`<OTPInput mask value={masked} onChange={setMasked} />`}
        >
          <OTPInput mask value={masked} onChange={setMasked} />
        </Example>

        <Example
          title="Alphanumeric"
          description={
            'Use pattern="alphanumeric" to accept letters and numbers (auto-uppercased).'
          }
          code={`<OTPInput pattern="alphanumeric" value={code} onChange={setCode} />`}
        >
          <OTPInput pattern="alphanumeric" value={code} onChange={setCode} />
        </Example>

        <Example
          title="Disabled"
          description="Disabled inputs are non-interactive and dimmed."
          code={`<OTPInput disabled value="123" onChange={() => {}} />`}
        >
          <OTPInput disabled value="123" onChange={() => {}} />
        </Example>

        <Example
          title="With label"
          description="Pair the input with a Label to describe the expected value."
          code={`<div className="grid gap-2">
  <Label>Verification code</Label>
  <OTPInput value={value} onChange={setValue} />
</div>`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Label>Verification code</Label>
            <OTPInput value={value} onChange={setValue} />
          </div>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <PropsTable
          rows={[
            {
              name: "length",
              type: "number",
              default: "6",
              description: "Number of input cells to render.",
            },
            {
              name: "value",
              type: "string",
              default: '""',
              description: "The controlled value of the input.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              default: "—",
              description: "Called with the full string whenever it changes.",
            },
            {
              name: "pattern",
              type: '"numeric" | "alphanumeric"',
              default: '"numeric"',
              description: "Restricts which characters are accepted.",
            },
            {
              name: "mask",
              type: "boolean",
              default: "false",
              description: "Obscures entered characters like a password field.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Whether the input is disabled.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
