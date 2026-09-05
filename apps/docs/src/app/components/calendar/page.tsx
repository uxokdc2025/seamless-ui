"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Calendar } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace"

// Local structural type — Seamless UI does not re-export react-day-picker's DateRange.
type DateRange = { from: Date | undefined; to?: Date | undefined }

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
      <Preview minHeight={360}>{preview}</Preview>
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

function surface(children: React.ReactNode) {
  return (
    <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-background)" }}>
      {children}
    </div>
  )
}

function SingleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return surface(<Calendar mode="single" selected={date} onSelect={setDate} />)
}

function MultipleCalendar() {
  const [days, setDays] = useState<Date[] | undefined>([])
  return surface(<Calendar mode="multiple" selected={days} onSelect={setDays} />)
}

function RangeCalendar() {
  const [range, setRange] = useState<DateRange | undefined>(undefined)
  return surface(<Calendar mode="range" selected={range} onSelect={(r) => setRange(r)} />)
}

function DisabledCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  // Disable weekends
  return surface(
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(day: Date) => day.getDay() === 0 || day.getDay() === 6}
    />
  )
}

export default function CalendarPage() {
  return (
    <DocsShell title="Calendar">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Calendar</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          A date field component that lets users select single dates, multiple dates, or a range. Built on React DayPicker.
        </p>

        <Preview minHeight={360}>
          <SingleCalendar />
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/calendar`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Single Date"
            description="Select a single day. This is the default mode."
            preview={<SingleCalendar />}
            code={`const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} />`}
          />
          <Example
            title="Multiple Dates"
            description="Select any number of individual days."
            preview={<MultipleCalendar />}
            code={`const [days, setDays] = useState<Date[] | undefined>([])

<Calendar mode="multiple" selected={days} onSelect={setDays} />`}
          />
          <Example
            title="Date Range"
            description="Select a start and end date to define a range."
            preview={<RangeCalendar />}
            code={`const [range, setRange] = useState<DateRange | undefined>()

<Calendar mode="range" selected={range} onSelect={setRange} />`}
          />
          <Example
            title="Disabled Dates"
            description="Prevent selection of specific days with a matcher — here, weekends."
            preview={<DisabledCalendar />}
            code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(day) => day.getDay() === 0 || day.getDay() === 6}
/>`}
          />
        </Section>

        <Section title="API Reference" description="Calendar forwards all React DayPicker props. Common props below.">
          <PropsTable
            rows={[
              { prop: "mode", type: '"single" | "multiple" | "range"', def: '"single"', desc: "Selection behavior of the calendar." },
              { prop: "selected", type: "Date | Date[] | DateRange", desc: "The currently selected date(s), matching the mode." },
              { prop: "onSelect", type: "(value) => void", desc: "Callback fired when the selection changes." },
              { prop: "disabled", type: "Matcher | Matcher[]", desc: "Days that cannot be selected (date, range, or predicate)." },
              { prop: "numberOfMonths", type: "number", def: "1", desc: "How many month grids to render side by side." },
              { prop: "showOutsideDays", type: "boolean", def: "true", desc: "Show days from adjacent months to fill the grid." },
              { prop: "defaultMonth", type: "Date", desc: "The month displayed on first render." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
