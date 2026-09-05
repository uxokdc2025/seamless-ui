"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Button } from "@seamless/ui"
import { Check, Copy, ChevronLeft, ChevronRight } from "lucide-react"

/* Working carousel demo. Mirrors the shadcn <Carousel> API shape for the docs. */
function CarouselDemo({ count = 5, dots = false }: { count?: number; dots?: boolean }) {
  const [index, setIndex] = useState(0)
  const go = (next: number) => setIndex((next + count) % count)

  return (
    <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center" }}>
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          style={{
            position: "relative",
            width: 240,
            height: 200,
            overflow: "hidden",
            borderRadius: 8,
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 0.35s ease",
            }}
          >
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 44,
                  fontWeight: 700,
                  color: "var(--color-foreground)",
                  background: "var(--color-muted)",
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {dots && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: i === index ? "var(--color-primary)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CarouselPage() {
  return (
    <DocsShell title="Carousel">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Carousel</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          A slideshow for cycling through a set of items, with previous / next controls and optional
          pagination dots.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <CarouselDemo count={5} />
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/carousel`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@seamless/ui"

export default function Example() {
  return (
    <Carousel>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>{item.label}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <CodeBlock
          code={`<Carousel>
  <CarouselContent>
    <CarouselItem />
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="Basic"
          description="Cycle through slides with the previous and next controls."
          preview={<CarouselDemo count={5} />}
          code={`<Carousel>
  <CarouselContent>
    {slides.map((s) => (
      <CarouselItem key={s.id}>{s.content}</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />

        <Example
          title="With pagination dots"
          description="Show dots to indicate position and jump directly to a slide."
          preview={<CarouselDemo count={4} dots />}
          code={`<Carousel>
  <CarouselContent>{/* items */}</CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselDots />
</Carousel>`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>Carousel</h3>
        <PropsTable
          rows={[
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Scroll axis of the carousel." },
            { prop: "opts", type: "object", description: "Options forwarded to the underlying carousel engine (e.g. loop, align)." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>CarouselItem</h3>
        <PropsTable
          rows={[
            { prop: "className", type: "string", description: "Sizing classes control how many items are visible (e.g. basis-1/2)." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>CarouselPrevious / CarouselNext</h3>
        <PropsTable
          rows={[
            { prop: "variant", type: "ButtonProps[\"variant\"]", default: '"outline"', description: "Visual style of the control button." },
            { prop: "disabled", type: "boolean", description: "Auto-disabled at the start / end when loop is off." },
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
