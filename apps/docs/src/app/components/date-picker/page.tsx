"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { DatePicker, DateRangePicker, Label } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [dob, setDob] = useState<Date | undefined>(new Date(1995, 5, 12))

  return (
    <DocsShell title="Date Picker">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Date Picker</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          A date picker built from a Popover and a Calendar. Select a single date, or use the range
          variant to select a start and end date.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <DatePicker date={date} onDateChange={setDate} />
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/date-picker`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import { useState } from "react"
import { DatePicker } from "@seamless/ui"

export default function Example() {
  const [date, setDate] = useState<Date>()
  return <DatePicker date={date} onDateChange={setDate} />
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 14, marginTop: 4 }}>
          <code style={codeInline}>DatePicker</code> composes a Popover trigger button with a Calendar
          rendered inside the popover content. State is fully controlled through{" "}
          <code style={codeInline}>date</code> and <code style={codeInline}>onDateChange</code>.
        </p>
        <CodeBlock
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">{formatted}</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Calendar mode="single" selected={date} onSelect={onDateChange} />
  </PopoverContent>
</Popover>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Basic"
          description="A single date selection with placeholder text until a date is chosen."
          preview={<DatePicker date={date} onDateChange={setDate} />}
          code={`const [date, setDate] = useState<Date>()

<DatePicker date={date} onDateChange={setDate} placeholder="Pick a date" />`}
        />

        <Example
          title="With label and default value"
          description="Pair the picker with a Label and seed it with an initial date."
          preview={
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label htmlFor="dob">Date of birth</Label>
              <DatePicker date={dob} onDateChange={setDob} />
            </div>
          }
          code={`const [dob, setDob] = useState<Date>(new Date(1995, 5, 12))

<Label htmlFor="dob">Date of birth</Label>
<DatePicker date={dob} onDateChange={setDob} />`}
        />

        <Example
          title="Date range"
          description="Use DateRangePicker to capture a start and end date in a single control."
          preview={<DateRangePicker />}
          code={`import { DateRangePicker } from "@seamless/ui"

<DateRangePicker placeholder="Pick a date range" />`}
        />

        <Example
          title="Disabled"
          description="Disable the trigger to prevent interaction."
          preview={<DatePicker disabled placeholder="Unavailable" />}
          code={`<DatePicker disabled placeholder="Unavailable" />`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>DatePicker</h3>
        <PropsTable
          rows={[
            { prop: "date", type: "Date | undefined", description: "The currently selected date." },
            { prop: "onDateChange", type: "(date: Date | undefined) => void", description: "Called when the selected date changes." },
            { prop: "placeholder", type: "string", default: '"Pick a date"', description: "Text shown when no date is selected." },
            { prop: "disabled", type: "boolean", default: "false", description: "Disable the trigger button." },
            { prop: "className", type: "string", description: "Classes forwarded to the trigger button." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>DateRangePicker</h3>
        <PropsTable
          rows={[
            { prop: "dateRange", type: "DateRange | undefined", description: "The currently selected { from, to } range." },
            { prop: "onDateRangeChange", type: "(range: DateRange | undefined) => void", description: "Called when the range changes." },
            { prop: "placeholder", type: "string", default: '"Pick a date range"', description: "Text shown when no range is selected." },
            { prop: "disabled", type: "boolean", default: "false", description: "Disable the trigger button." },
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
