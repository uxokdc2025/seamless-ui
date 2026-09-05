"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { RadioGroup, Radio } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
}

const labelStyle: CSSProperties = {
  fontSize: 14,
  color: "var(--color-foreground)",
  cursor: "pointer",
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

export default function RadioGroupDocsPage() {
  return (
    <Page title="Radio Group">
      <PageHeader
        title="Radio Group"
        description="A set of checkable buttons where no more than one can be selected at a time. Built on Radix Radio Group with full keyboard support."
      />

      <PreviewCard>
        <RadioGroup defaultValue="comfortable">
          <div style={rowStyle}>
            <Radio value="default" id="r-default" />
            <label htmlFor="r-default" style={labelStyle}>
              Default
            </label>
          </div>
          <div style={rowStyle}>
            <Radio value="comfortable" id="r-comfortable" />
            <label htmlFor="r-comfortable" style={labelStyle}>
              Comfortable
            </label>
          </div>
          <div style={rowStyle}>
            <Radio value="compact" id="r-compact" />
            <label htmlFor="r-compact" style={labelStyle}>
              Compact
            </label>
          </div>
        </RadioGroup>
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/radio-group`} />
      </Section>

      <Section title="Usage">
        <CodeBlock code={`import { RadioGroup, Radio } from "@seamless/ui"`} />
        <CodeBlock
          code={`<RadioGroup defaultValue="one">
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Radio value="one" id="one" />
    <label htmlFor="one">Option one</label>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Radio value="two" id="two" />
    <label htmlFor="two">Option two</label>
  </div>
</RadioGroup>`}
        />
      </Section>

      <Section title="Anatomy">
        <CodeBlock
          code={`<RadioGroup>
  <Radio />
  <Radio />
</RadioGroup>`}
        />
      </Section>

      <Section title="Examples">
        <Example
          title="With descriptions"
          description="Pair each radio with a label and helper text for clearer choices."
          code={`<RadioGroup defaultValue="card">
  <div style={{ display: "flex", gap: 8 }}>
    <Radio value="card" id="pay-card" />
    <label htmlFor="pay-card">
      Card
      <span>Pay with a credit or debit card.</span>
    </label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="card">
            {[
              { v: "card", t: "Card", d: "Pay with a credit or debit card." },
              { v: "paypal", t: "PayPal", d: "Redirect to PayPal to finish." },
              { v: "bank", t: "Bank transfer", d: "Manual transfer, 2–3 days." },
            ].map((o) => (
              <div key={o.v} style={{ display: "flex", gap: 8 }}>
                <Radio value={o.v} id={`pay-${o.v}`} style={{ marginTop: 2 }} />
                <label htmlFor={`pay-${o.v}`} style={{ cursor: "pointer" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      color: "var(--color-foreground)",
                    }}
                  >
                    {o.t}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: "var(--color-muted-foreground)",
                    }}
                  >
                    {o.d}
                  </span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </Example>

        <Example
          title="Horizontal"
          description="Lay options out in a row by overriding the group's layout classes."
          code={`<RadioGroup defaultValue="m" className="flex flex-row gap-6">
  <div style={{ display: "flex", gap: 8 }}>
    <Radio value="s" id="s" />
    <label htmlFor="s">Small</label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup
            defaultValue="m"
            className="flex flex-row gap-6"
            style={{ display: "flex", flexDirection: "row", gap: 24 }}
          >
            {[
              { v: "s", t: "Small" },
              { v: "m", t: "Medium" },
              { v: "l", t: "Large" },
            ].map((o) => (
              <div key={o.v} style={rowStyle}>
                <Radio value={o.v} id={`size-${o.v}`} />
                <label htmlFor={`size-${o.v}`} style={labelStyle}>
                  {o.t}
                </label>
              </div>
            ))}
          </RadioGroup>
        </Example>

        <Example
          title="Disabled"
          description="Disable the whole group, or individual radios."
          code={`<RadioGroup defaultValue="a" disabled>
  <Radio value="a" id="a" />
  <Radio value="b" id="b" />
</RadioGroup>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <RadioGroup defaultValue="a" disabled>
              <div style={rowStyle}>
                <Radio value="a" id="dis-a" />
                <label htmlFor="dis-a" style={labelStyle}>
                  Entire group disabled
                </label>
              </div>
              <div style={rowStyle}>
                <Radio value="b" id="dis-b" />
                <label htmlFor="dis-b" style={labelStyle}>
                  Also disabled
                </label>
              </div>
            </RadioGroup>
            <RadioGroup defaultValue="x">
              <div style={rowStyle}>
                <Radio value="x" id="one-x" />
                <label htmlFor="one-x" style={labelStyle}>
                  Available
                </label>
              </div>
              <div style={rowStyle}>
                <Radio value="y" id="one-y" disabled />
                <label
                  htmlFor="one-y"
                  style={{ ...labelStyle, color: "var(--color-muted-foreground)" }}
                >
                  Single option disabled
                </label>
              </div>
            </RadioGroup>
          </div>
        </Example>
      </Section>

      <Section title="API Reference">
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-foreground)",
          }}
        >
          RadioGroup
        </p>
        <PropsTable
          rows={[
            {
              prop: "value",
              type: "string",
              description: "Controlled value of the selected radio.",
            },
            {
              prop: "defaultValue",
              type: "string",
              description: "Value selected on initial render (uncontrolled).",
            },
            {
              prop: "onValueChange",
              type: "(value: string) => void",
              description: "Callback fired when the selection changes.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables every radio in the group.",
            },
            {
              prop: "name",
              type: "string",
              description: "Form field name submitted with the group value.",
            },
          ]}
        />
        <p
          style={{
            margin: 0,
            marginTop: 4,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-foreground)",
          }}
        >
          Radio
        </p>
        <PropsTable
          rows={[
            {
              prop: "value",
              type: "string",
              description: "The unique value this radio represents. Required.",
            },
            {
              prop: "id",
              type: "string",
              description: "Associates the radio with an external label.",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "Disables this individual radio.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
