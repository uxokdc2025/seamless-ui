"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@seamless/ui"
import { Copy, Check, BarChart3 } from "lucide-react"

/* ------------------------------------------------------------------ *
 * Dependency-free SVG charts for the Seamless UI docs gallery.
 * Real sample data, theme-token colors, light-first neutral look.
 * ------------------------------------------------------------------ */

type Pt = { label: string; value: number }
type Series = { name: string; color: string; data: number[] }

/* Tasteful palette used where multiple series need distinct hues.
   Single-series charts prefer var(--color-primary). */
const PALETTE = ["#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"]

/* ------------------------------- Area ------------------------------ */

function AreaChart({ data, gradientId, color = "var(--color-primary)" }: { data: Pt[]; gradientId: string; color?: string }) {
  const w = 460, h = 220, pad = 34
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value), 0)
  const px = (i: number) => pad + (i * (w - pad * 2)) / (data.length - 1)
  const py = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  const line = data.map((d, i) => `${i ? "L" : "M"} ${px(i)} ${py(d.value)}`).join(" ")
  const area = `${line} L ${px(data.length - 1)} ${h - pad} L ${px(0)} ${h - pad} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Area chart">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad} y1={pad + t * (h - pad * 2)} x2={w - pad} y2={pad + t * (h - pad * 2)} stroke="var(--color-border)" strokeDasharray="3 3" opacity={0.6} />
      ))}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <text key={d.label} x={px(i)} y={h - pad + 18} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">{d.label}</text>
      ))}
    </svg>
  )
}

function StackedAreaChart({ series, labels, ids }: { series: Series[]; labels: string[]; ids: string[] }) {
  const w = 460, h = 220, pad = 34
  const n = labels.length
  const totals = labels.map((_, i) => series.reduce((s, ser) => s + ser.data[i], 0))
  const max = Math.max(...totals)
  const px = (i: number) => pad + (i * (w - pad * 2)) / (n - 1)
  const py = (v: number) => h - pad - (v / (max || 1)) * (h - pad * 2)
  const cum = labels.map(() => 0)
  const layers = series.map((ser, si) => {
    const top = ser.data.map((v, i) => { cum[i] += v; return cum[i] })
    const bottom = ser.data.map((v, i) => cum[i] - v)
    const topPath = top.map((v, i) => `${i ? "L" : "M"} ${px(i)} ${py(v)}`).join(" ")
    const botPath = bottom.map((v, i) => `L ${px(n - 1 - i)} ${py(bottom[n - 1 - i])}`).join(" ")
    return <path key={si} d={`${topPath} ${botPath} Z`} fill={`url(#${ids[si]})`} stroke={ser.color} strokeWidth={1.5} />
  })
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Stacked area chart">
      <defs>
        {series.map((ser, si) => (
          <linearGradient key={si} id={ids[si]} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ser.color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={ser.color} stopOpacity={0.08} />
          </linearGradient>
        ))}
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad} y1={pad + t * (h - pad * 2)} x2={w - pad} y2={pad + t * (h - pad * 2)} stroke="var(--color-border)" strokeDasharray="3 3" opacity={0.6} />
      ))}
      {layers}
      {labels.map((l, i) => (
        <text key={l} x={px(i)} y={h - pad + 18} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">{l}</text>
      ))}
    </svg>
  )
}

/* ------------------------------- Bar ------------------------------- */

function BarChart({ data, color = "var(--color-primary)" }: { data: Pt[]; color?: string }) {
  const [active, setActive] = useState<number | null>(null)
  const w = 460, h = 220, pad = 34
  const max = Math.max(...data.map((d) => d.value))
  const bw = (w - pad * 2) / data.length
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Bar chart">
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--color-border)" />
      {data.map((d, i) => {
        const bh = (d.value / max) * (h - pad * 2)
        const x = pad + i * bw + bw * 0.18
        const y = h - pad - bh
        return (
          <g key={d.label} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <rect x={x} y={y} width={bw * 0.64} height={bh} rx={5} fill={color} opacity={active === null || active === i ? 1 : 0.4} />
            {active === i && (
              <text x={x + bw * 0.32} y={y - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--color-foreground)">{d.value}</text>
            )}
            <text x={x + bw * 0.32} y={h - pad + 18} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function HorizontalBarChart({ data }: { data: Pt[] }) {
  const w = 460, h = 220, pad = 12, labelW = 70
  const max = Math.max(...data.map((d) => d.value))
  const bh = (h - pad * 2) / data.length
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Horizontal bar chart">
      {data.map((d, i) => {
        const bw = (d.value / max) * (w - pad * 2 - labelW)
        const y = pad + i * bh + bh * 0.18
        return (
          <g key={d.label}>
            <text x={pad} y={y + bh * 0.4} fontSize={11} fill="var(--color-muted-foreground)" dominantBaseline="middle">{d.label}</text>
            <rect x={pad + labelW} y={y} width={Math.max(bw, 2)} height={bh * 0.64} rx={5} fill="var(--color-primary)" />
            <text x={pad + labelW + bw + 6} y={y + bh * 0.4} fontSize={11} fontWeight={600} fill="var(--color-foreground)" dominantBaseline="middle">{d.value}</text>
          </g>
        )
      })}
    </svg>
  )
}

function GroupedBarChart({ series, labels }: { series: Series[]; labels: string[] }) {
  const w = 460, h = 220, pad = 34
  const max = Math.max(...series.flatMap((s) => s.data))
  const groupW = (w - pad * 2) / labels.length
  const barW = (groupW * 0.62) / series.length
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Grouped bar chart">
      <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="var(--color-border)" />
      {labels.map((label, gi) => (
        <g key={label}>
          {series.map((ser, si) => {
            const bh = (ser.data[gi] / max) * (h - pad * 2)
            const x = pad + gi * groupW + groupW * 0.19 + si * barW
            return <rect key={si} x={x} y={h - pad - bh} width={barW * 0.86} height={bh} rx={3} fill={ser.color} />
          })}
          <text x={pad + gi * groupW + groupW * 0.5} y={h - pad + 18} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">{label}</text>
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------ Line ------------------------------- */

function LineChart({ series, labels, dots = false }: { series: Series[]; labels: string[]; dots?: boolean }) {
  const w = 460, h = 220, pad = 34
  const all = series.flatMap((s) => s.data)
  const max = Math.max(...all)
  const min = Math.min(...all)
  const px = (i: number) => pad + (i * (w - pad * 2)) / (labels.length - 1)
  const py = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" aria-label="Line chart">
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad} y1={pad + t * (h - pad * 2)} x2={w - pad} y2={pad + t * (h - pad * 2)} stroke="var(--color-border)" strokeDasharray="3 3" opacity={0.6} />
      ))}
      {series.map((ser, si) => {
        const line = ser.data.map((v, i) => `${i ? "L" : "M"} ${px(i)} ${py(v)}`).join(" ")
        return (
          <g key={si}>
            <path d={line} fill="none" stroke={ser.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            {dots && ser.data.map((v, i) => (
              <circle key={i} cx={px(i)} cy={py(v)} r={3.5} fill="var(--color-background)" stroke={ser.color} strokeWidth={2} />
            ))}
          </g>
        )
      })}
      {labels.map((l, i) => (
        <text key={l} x={px(i)} y={h - pad + 18} textAnchor="middle" fontSize={11} fill="var(--color-muted-foreground)">{l}</text>
      ))}
    </svg>
  )
}

/* ------------------------------- Pie ------------------------------- */

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}
function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, end)
  const e = polar(cx, cy, r, start)
  const large = end - start <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 0 ${e.x} ${e.y} Z`
}

type Slice = { label: string; value: number; color: string }

function PieChart({ data, donut = false, showLegend = false }: { data: Slice[]; donut?: boolean; showLegend?: boolean }) {
  const size = 220, cx = size / 2, cy = size / 2, r = size / 2 - 12
  const total = data.reduce((s, d) => s + d.value, 0)
  let angle = 0
  const slices = data.map((d) => {
    const start = angle
    const end = angle + (d.value / total) * 360
    angle = end
    return { d, path: arcPath(cx, cy, r, start, end) }
  })
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 200 }} role="img" aria-label="Pie chart">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.d.color} stroke="var(--color-background)" strokeWidth={2} />
        ))}
        {donut && <circle cx={cx} cy={cy} r={r * 0.58} fill="var(--color-card)" />}
        {donut && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={22} fontWeight={700} fill="var(--color-foreground)">{total}</text>
        )}
      </svg>
      {showLegend && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.map((d) => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted-foreground)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
              <span style={{ color: "var(--color-foreground)" }}>{d.label}</span>
              <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------ Radar ------------------------------ */

function RadarChart({ labels, series, filled = false }: { labels: string[]; series: Series[]; filled?: boolean }) {
  const size = 240, cx = size / 2, cy = size / 2, r = size / 2 - 34
  const n = labels.length
  const max = Math.max(...series.flatMap((s) => s.data))
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2
  const point = (i: number, ratio: number) => ({ x: cx + Math.cos(angle(i)) * r * ratio, y: cy + Math.sin(angle(i)) * r * ratio })
  const rings = [0.25, 0.5, 0.75, 1]
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 220 }} role="img" aria-label="Radar chart">
      {rings.map((ring) => (
        <polygon key={ring} points={labels.map((_, i) => { const p = point(i, ring); return `${p.x},${p.y}` }).join(" ")} fill="none" stroke="var(--color-border)" opacity={0.7} />
      ))}
      {labels.map((_, i) => { const p = point(i, 1); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--color-border)" opacity={0.7} /> })}
      {series.map((ser, si) => {
        const pts = ser.data.map((v, i) => { const p = point(i, v / max); return `${p.x},${p.y}` }).join(" ")
        return <polygon key={si} points={pts} fill={ser.color} fillOpacity={filled ? 0.35 : 0.18} stroke={ser.color} strokeWidth={2} />
      })}
      {labels.map((l, i) => { const p = point(i, 1.16); return <text key={l} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="var(--color-muted-foreground)">{l}</text> })}
    </svg>
  )
}

/* ------------------------------ Radial ----------------------------- */

function RadialChart({ data }: { data: Slice[] }) {
  const size = 220, cx = size / 2, cy = size / 2
  const stroke = 16, gap = 6
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 200 }} role="img" aria-label="Radial chart">
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {data.map((d, i) => {
            const r = size / 2 - 12 - i * (stroke + gap)
            const c = 2 * Math.PI * r
            const pct = Math.min(d.value, 100) / 100
            return (
              <g key={d.label}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={stroke} />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
              </g>
            )
          })}
        </g>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
            <span style={{ color: "var(--color-foreground)" }}>{d.label}</span>
            <span style={{ marginLeft: "auto", color: "var(--color-muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------- Card wrapper -------------------------- */

function ChartCard({ title, subtitle, code, children }: { title: string; subtitle: string; code: string; children: React.ReactNode }) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* noop */ }
  }
  const toggleBtn = (key: "preview" | "code", label: string) => (
    <button
      onClick={() => setTab(key)}
      style={{
        padding: "4px 10px", fontSize: 12, fontWeight: 500, borderRadius: 6, border: "none", cursor: "pointer",
        background: tab === key ? "var(--color-background)" : "transparent",
        color: tab === key ? "var(--color-foreground)" : "var(--color-muted-foreground)",
        boxShadow: tab === key ? "0 1px 2px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {label}
    </button>
  )
  return (
    <div data-toc-ignore style={{ border: "1px solid var(--color-border)", borderRadius: 12, background: "var(--color-card)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "16px 18px 12px" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--color-card-foreground)" }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 2, padding: 2, background: "var(--color-muted)", borderRadius: 8 }}>
            {toggleBtn("preview", "Preview")}
            {toggleBtn("code", "Code")}
          </div>
          <button
            onClick={copy}
            aria-label="Copy code"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-background)", cursor: "pointer", color: "var(--color-muted-foreground)" }}
          >
            {copied ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
          </button>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--color-border)", flex: 1 }}>
        {tab === "preview" ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 18px", minHeight: 240 }}>
            {children}
          </div>
        ) : (
          <pre style={{ margin: 0, padding: "18px", fontSize: 12.5, lineHeight: 1.6, overflowX: "auto", background: "var(--color-muted)", color: "var(--color-foreground)", fontFamily: "var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)" }}>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

/* ----------------------------- Sample data ------------------------- */

const months6: Pt[] = [
  { label: "Jan", value: 42 }, { label: "Feb", value: 55 }, { label: "Mar", value: 48 },
  { label: "Apr", value: 71 }, { label: "May", value: 66 }, { label: "Jun", value: 89 },
]
const traffic: Pt[] = [
  { label: "Mon", value: 120 }, { label: "Tue", value: 145 }, { label: "Wed", value: 132 },
  { label: "Thu", value: 178 }, { label: "Fri", value: 210 }, { label: "Sat", value: 165 }, { label: "Sun", value: 98 },
]
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const desktopMobile: Series[] = [
  { name: "Desktop", color: PALETTE[0], data: [42, 55, 48, 71, 66, 89] },
  { name: "Mobile", color: PALETTE[1], data: [24, 31, 40, 38, 52, 61] },
]
const channels: Pt[] = [
  { label: "Direct", value: 88 }, { label: "Organic", value: 74 }, { label: "Social", value: 52 },
  { label: "Email", value: 41 }, { label: "Referral", value: 33 },
]
const pieData: Slice[] = [
  { label: "Chrome", value: 62, color: PALETTE[0] },
  { label: "Safari", value: 21, color: PALETTE[1] },
  { label: "Firefox", value: 10, color: PALETTE[2] },
  { label: "Edge", value: 7, color: PALETTE[3] },
]
const radarLabels = ["Speed", "Reliability", "Comfort", "Safety", "Efficiency", "Value"]
const radarSeries: Series[] = [
  { name: "Model A", color: PALETTE[0], data: [80, 90, 70, 85, 75, 88] },
  { name: "Model B", color: PALETTE[3], data: [65, 70, 88, 72, 90, 60] },
]
const radialData: Slice[] = [
  { label: "Move", value: 82, color: PALETTE[0] },
  { label: "Exercise", value: 64, color: PALETTE[1] },
  { label: "Stand", value: 91, color: PALETTE[2] },
]

/* ------------------------------ Gallery ---------------------------- */

const CATEGORIES = ["Area", "Bar", "Line", "Pie", "Radar", "Radial"] as const

export function ChartsGallery() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "24px 16px 40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <Badge variant="secondary">
            <BarChart3 style={{ width: 13, height: 13, marginRight: 4 }} /> Charts
          </Badge>
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--color-foreground)", margin: 0 }}>
          Beautiful Charts &amp; Graphs
        </h1>
        <p style={{ fontSize: 18, color: "var(--color-muted-foreground)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.5 }}>
          A collection of ready-to-use, copy-and-paste chart components. Built dependency-free with
          your theme tokens — every chart renders live with real data.
        </p>
      </div>

      <Tabs defaultValue="Area">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="Area">
          <Grid>
            <ChartCard title="Area Chart" subtitle="Monthly revenue — last 6 months" code={CODE.area}>
              <AreaChart data={months6} gradientId="area-basic" />
            </ChartCard>
            <ChartCard title="Area Chart — Stacked" subtitle="Desktop vs. mobile visitors" code={CODE.areaStacked}>
              <StackedAreaChart series={desktopMobile} labels={monthLabels} ids={["stk-0", "stk-1"]} />
            </ChartCard>
          </Grid>
        </TabsContent>

        <TabsContent value="Bar">
          <Grid>
            <ChartCard title="Bar Chart" subtitle="Revenue by month (hover a bar)" code={CODE.bar}>
              <BarChart data={months6} />
            </ChartCard>
            <ChartCard title="Bar Chart — Horizontal" subtitle="Sessions by channel" code={CODE.barH}>
              <HorizontalBarChart data={channels} />
            </ChartCard>
            <ChartCard title="Bar Chart — Multiple" subtitle="Desktop vs. mobile, grouped" code={CODE.barGrouped}>
              <GroupedBarChart series={desktopMobile} labels={monthLabels} />
            </ChartCard>
          </Grid>
        </TabsContent>

        <TabsContent value="Line">
          <Grid>
            <ChartCard title="Line Chart" subtitle="Weekly traffic" code={CODE.line}>
              <LineChart series={[{ name: "Visitors", color: "var(--color-primary)", data: traffic.map((t) => t.value) }]} labels={traffic.map((t) => t.label)} />
            </ChartCard>
            <ChartCard title="Line Chart — Multiple" subtitle="Two series with dots" code={CODE.lineMulti}>
              <LineChart series={desktopMobile} labels={monthLabels} dots />
            </ChartCard>
          </Grid>
        </TabsContent>

        <TabsContent value="Pie">
          <Grid>
            <ChartCard title="Pie Chart" subtitle="Browser market share" code={CODE.pie}>
              <PieChart data={pieData} />
            </ChartCard>
            <ChartCard title="Pie Chart — Donut" subtitle="Total in the center" code={CODE.donut}>
              <PieChart data={pieData} donut />
            </ChartCard>
            <ChartCard title="Pie Chart — Legend" subtitle="With a labelled legend" code={CODE.pieLegend}>
              <PieChart data={pieData} donut showLegend />
            </ChartCard>
          </Grid>
        </TabsContent>

        <TabsContent value="Radar">
          <Grid>
            <ChartCard title="Radar Chart" subtitle="Two products compared" code={CODE.radar}>
              <RadarChart labels={radarLabels} series={radarSeries} />
            </ChartCard>
            <ChartCard title="Radar Chart — Filled" subtitle="Single series, filled grid" code={CODE.radarFilled}>
              <RadarChart labels={radarLabels} series={[radarSeries[0]]} filled />
            </ChartCard>
          </Grid>
        </TabsContent>

        <TabsContent value="Radial">
          <Grid>
            <ChartCard title="Radial Chart" subtitle="Activity rings — % of goal" code={CODE.radial}>
              <RadialChart data={radialData} />
            </ChartCard>
            <ChartCard title="Radial Chart — Single" subtitle="One metric gauge" code={CODE.radialSingle}>
              <RadialChart data={[radialData[2]]} />
            </ChartCard>
          </Grid>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, alignItems: "stretch" }}>
      {children}
    </div>
  )
}

/* Concise, honest usage snippets for the "Code" tab. */
const CODE = {
  area: `import { AreaChart } from "@/components/charts"

const data = [
  { label: "Jan", value: 42 }, { label: "Feb", value: 55 },
  { label: "Mar", value: 48 }, { label: "Apr", value: 71 },
  { label: "May", value: 66 }, { label: "Jun", value: 89 },
]

<AreaChart data={data} gradientId="revenue" />`,
  areaStacked: `const series = [
  { name: "Desktop", color: "#3b82f6", data: [42, 55, 48, 71, 66, 89] },
  { name: "Mobile",  color: "#22c55e", data: [24, 31, 40, 38, 52, 61] },
]

<StackedAreaChart series={series} labels={months} ids={["a","b"]} />`,
  bar: `const data = [
  { label: "Jan", value: 42 }, { label: "Feb", value: 55 },
  { label: "Mar", value: 48 }, { label: "Apr", value: 71 },
]

<BarChart data={data} />`,
  barH: `const data = [
  { label: "Direct", value: 88 }, { label: "Organic", value: 74 },
  { label: "Social", value: 52 }, { label: "Email", value: 41 },
]

<HorizontalBarChart data={data} />`,
  barGrouped: `const series = [
  { name: "Desktop", color: "#3b82f6", data: [42, 55, 48, 71, 66, 89] },
  { name: "Mobile",  color: "#22c55e", data: [24, 31, 40, 38, 52, 61] },
]

<GroupedBarChart series={series} labels={months} />`,
  line: `const series = [
  { name: "Visitors", color: "var(--color-primary)",
    data: [120, 145, 132, 178, 210, 165, 98] },
]

<LineChart series={series} labels={days} />`,
  lineMulti: `const series = [
  { name: "Desktop", color: "#3b82f6", data: [42, 55, 48, 71, 66, 89] },
  { name: "Mobile",  color: "#22c55e", data: [24, 31, 40, 38, 52, 61] },
]

<LineChart series={series} labels={months} dots />`,
  pie: `const data = [
  { label: "Chrome", value: 62, color: "#3b82f6" },
  { label: "Safari", value: 21, color: "#22c55e" },
  { label: "Firefox", value: 10, color: "#f59e0b" },
  { label: "Edge",    value: 7,  color: "#8b5cf6" },
]

<PieChart data={data} />`,
  donut: `<PieChart data={data} donut />`,
  pieLegend: `<PieChart data={data} donut showLegend />`,
  radar: `const labels = ["Speed","Reliability","Comfort","Safety","Efficiency","Value"]
const series = [
  { name: "Model A", color: "#3b82f6", data: [80, 90, 70, 85, 75, 88] },
  { name: "Model B", color: "#8b5cf6", data: [65, 70, 88, 72, 90, 60] },
]

<RadarChart labels={labels} series={series} />`,
  radarFilled: `<RadarChart labels={labels} series={[series[0]]} filled />`,
  radial: `const data = [
  { label: "Move",     value: 82, color: "#3b82f6" },
  { label: "Exercise", value: 64, color: "#22c55e" },
  { label: "Stand",    value: 91, color: "#f59e0b" },
]

<RadialChart data={data} />`,
  radialSingle: `<RadialChart data={[{ label: "Stand", value: 91, color: "#f59e0b" }]} />`,
}
