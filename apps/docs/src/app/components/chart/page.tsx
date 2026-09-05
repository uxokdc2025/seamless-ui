"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Check, Copy } from "lucide-react"

type Point = { label: string; value: number }

const revenue: Point[] = [
  { label: "Jan", value: 42 },
  { label: "Feb", value: 55 },
  { label: "Mar", value: 48 },
  { label: "Apr", value: 71 },
  { label: "May", value: 66 },
  { label: "Jun", value: 89 },
]

/* Lightweight, dependency-free SVG charts for the docs preview. */
function BarChart({ data }: { data: Point[] }) {
  const [active, setActive] = useState<number | null>(null)
  const w = 380
  const h = 200
  const pad = 28
  const max = Math.max(...data.map((d) => d.value))
  const bw = (w - pad * 2) / data.length

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Bar chart">
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--color-border)" />
      {data.map((d, i) => {
        const bh = ((d.value / max) * (h - pad * 2))
        const x = pad + i * bw + bw * 0.2
        const y = h - pad - bh
        return (
          <g key={d.label} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <rect
              x={x}
              y={y}
              width={bw * 0.6}
              height={bh}
              rx={4}
              fill="var(--color-primary)"
              opacity={active === null || active === i ? 1 : 0.4}
            />
            {active === i && (
              <text x={x + bw * 0.3} y={y - 6} textAnchor="middle" fontSize={11} fill="var(--color-foreground)">
                {d.value}
              </text>
            )}
            <text x={x + bw * 0.3} y={h - pad + 16} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChart({ data }: { data: Point[] }) {
  const w = 380
  const h = 200
  const pad = 28
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const px = (i: number) => pad + (i * (w - pad * 2)) / (data.length - 1)
  const py = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  const line = data.map((d, i) => `${i === 0 ? "M" : "L"} ${px(i)} ${py(d.value)}`).join(" ")
  const area = `${line} L ${px(data.length - 1)} ${h - pad} L ${px(0)} ${h - pad} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Line chart">
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--color-border)" />
      <path d={area} fill="var(--color-primary)" opacity={0.12} />
      <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={px(i)} cy={py(d.value)} r={3.5} fill="var(--color-background)" stroke="var(--color-primary)" strokeWidth={2} />
          <text x={px(i)} y={h - pad + 16} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function ChartPage() {
  return (
    <DocsShell title="Chart">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Chart</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          Composable charts that inherit your theme tokens. Build bar, line, and area visualizations
          that stay legible in light and dark mode.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <BarChart data={revenue} />
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/chart`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import { ChartContainer, ChartTooltip } from "@seamless/ui"
import { Bar, BarChart, XAxis } from "recharts"

const config = { revenue: { label: "Revenue", color: "var(--color-primary)" } }

export default function Example() {
  return (
    <ChartContainer config={config}>
      <BarChart data={data}>
        <XAxis dataKey="label" />
        <Bar dataKey="value" fill="var(--color-primary)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <CodeBlock
          code={`<ChartContainer config={config}>
  <BarChart>
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="value" />
  </BarChart>
</ChartContainer>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Bar chart"
          description="Compare discrete categories. Hover a bar to reveal its value."
          preview={<BarChart data={revenue} />}
          code={`<ChartContainer config={config}>
  <BarChart data={data}>
    <XAxis dataKey="label" />
    <Bar dataKey="value" fill="var(--color-primary)" radius={4} />
  </BarChart>
</ChartContainer>`}
        />

        <Example
          title="Line chart"
          description="Show a trend over a continuous range with a filled area beneath the line."
          preview={<LineChart data={revenue} />}
          code={`<ChartContainer config={config}>
  <AreaChart data={data}>
    <XAxis dataKey="label" />
    <Area dataKey="value" stroke="var(--color-primary)" fill="var(--color-primary)" />
  </AreaChart>
</ChartContainer>`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>ChartContainer</h3>
        <PropsTable
          rows={[
            { prop: "config", type: "ChartConfig", description: "Maps each data series to a label and a color token." },
            { prop: "children", type: "React.ReactElement", description: "A single Recharts chart element to render." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>ChartTooltip</h3>
        <PropsTable
          rows={[
            { prop: "content", type: "React.ReactNode", description: "Custom tooltip content, typically <ChartTooltipContent />." },
            { prop: "cursor", type: "boolean", default: "true", description: "Show the hover cursor guideline." },
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
