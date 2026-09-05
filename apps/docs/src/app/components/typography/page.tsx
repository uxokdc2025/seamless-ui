"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", minHeight, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 32 }}>
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
      <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 32 }}>{preview}</div>
      <CodeBlock code={code} />
    </div>
  )
}

// Typography primitives — Seamless UI does not ship a Typography component,
// so these are plain styled elements demonstrating the text scale.
const h1: React.CSSProperties = { fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, color: "var(--color-foreground)" }
const h2s: React.CSSProperties = { fontSize: 32, fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.01em", margin: 0, color: "var(--color-foreground)" }
const h3s: React.CSSProperties = { fontSize: 24, fontWeight: 600, lineHeight: 1.3, margin: 0, color: "var(--color-foreground)" }
const h4s: React.CSSProperties = { fontSize: 20, fontWeight: 600, lineHeight: 1.4, margin: 0, color: "var(--color-foreground)" }
const p: React.CSSProperties = { fontSize: 16, lineHeight: 1.7, margin: 0, color: "var(--color-foreground)" }
const lead: React.CSSProperties = { fontSize: 20, lineHeight: 1.6, margin: 0, color: "var(--color-muted-foreground)" }
const large: React.CSSProperties = { fontSize: 18, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }
const small: React.CSSProperties = { fontSize: 14, fontWeight: 500, lineHeight: 1.4, margin: 0, color: "var(--color-foreground)" }
const muted: React.CSSProperties = { fontSize: 14, margin: 0, color: "var(--color-muted-foreground)" }

export default function TypographyPage() {
  return (
    <DocsShell title="Typography">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Typography</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          Styles for headings, paragraphs, lists, and inline text. Typography is applied with utility classes rather than a component.
        </p>

        <Preview>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h1 style={h1}>The King&apos;s plans</h1>
            <p style={lead}>A modern type scale built for reading — legible, balanced, and consistent across every surface.</p>
          </div>
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/typography`} />
        </Section>

        <Section title="Usage">
          <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 12 }}>
            Compose type with semantic HTML and the tokenized scale. There is no wrapper component to import.
          </p>
          <CodeBlock code={`export default function Example() {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
        The King's plans
      </h1>
      <p className="leading-7 text-muted-foreground">
        A modern type scale built for reading.
      </p>
    </div>
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Headings"
            description="Four heading levels with decreasing size and weight."
            preview={
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h1 style={h1}>Heading 1</h1>
                <h2 style={h2s}>Heading 2</h2>
                <h3 style={h3s}>Heading 3</h3>
                <h4 style={h4s}>Heading 4</h4>
              </div>
            }
            code={`<h1 className="text-5xl font-extrabold tracking-tight">Heading 1</h1>
<h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
<h3 className="text-2xl font-semibold">Heading 3</h3>
<h4 className="text-xl font-semibold">Heading 4</h4>`}
          />
          <Example
            title="Paragraph"
            description="Body copy with comfortable line height."
            preview={
              <p style={{ ...p, maxWidth: 560 }}>
                The best time to plant a tree was twenty years ago. The second best time is now. Good typography rewards the reader with rhythm, contrast, and a clear hierarchy.
              </p>
            }
            code={`<p className="leading-7">
  The best time to plant a tree was twenty years ago. The second best
  time is now.
</p>`}
          />
          <Example
            title="Lead"
            description="A larger, muted intro paragraph."
            preview={<p style={{ ...lead, maxWidth: 560 }}>A modern type scale built for reading — legible, balanced, and consistent.</p>}
            code={`<p className="text-xl text-muted-foreground">
  A modern type scale built for reading.
</p>`}
          />
          <Example
            title="Blockquote"
            description="Quotations set off with a left border."
            preview={
              <blockquote style={{ borderLeft: "3px solid var(--color-border)", paddingLeft: 20, margin: 0, fontStyle: "italic", color: "var(--color-foreground)", maxWidth: 560, lineHeight: 1.7 }}>
                &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
              </blockquote>
            }
            code={`<blockquote className="mt-6 border-l-2 pl-6 italic">
  "Design is not just what it looks like and feels like.
  Design is how it works."
</blockquote>`}
          />
          <Example
            title="List"
            description="Unordered lists with consistent spacing."
            preview={
              <ul style={{ margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8, color: "var(--color-foreground)", lineHeight: 1.6 }}>
                <li>Foundation before execution</li>
                <li>Mobile-first, always</li>
                <li>Every view has loading, empty, and error states</li>
              </ul>
            }
            code={`<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
  <li>Foundation before execution</li>
  <li>Mobile-first, always</li>
  <li>Every view has loading, empty, and error states</li>
</ul>`}
          />
          <Example
            title="Inline Code"
            description="Monospace inline code within a sentence."
            preview={
              <p style={{ ...p }}>
                Install with{" "}
                <code style={{ fontFamily: mono, fontSize: 14, background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: 4, padding: "2px 6px" }}>
                  npm install
                </code>{" "}
                to get started.
              </p>
            }
            code={`<p>
  Install with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
    npm install
  </code> to get started.
</p>`}
          />
          <Example
            title="Large, Small & Muted"
            description="Supporting text sizes for captions and emphasis."
            preview={
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={large}>Large — emphasized supporting text</p>
                <p style={small}>Small — a compact label</p>
                <p style={muted}>Muted — secondary helper text</p>
              </div>
            }
            code={`<div className="text-lg font-semibold">Large</div>
<small className="text-sm font-medium leading-none">Small</small>
<p className="text-sm text-muted-foreground">Muted</p>`}
          />
        </Section>

        <Section title="Type Scale" description="Reference for the sizes used across the system.">
          <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid var(--color-border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>Element</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>Size</th>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { el: "h1", size: "48px", weight: "800" },
                  { el: "h2", size: "32px", weight: "600" },
                  { el: "h3", size: "24px", weight: "600" },
                  { el: "h4", size: "20px", weight: "600" },
                  { el: "p / body", size: "16px", weight: "400" },
                  { el: "lead", size: "20px", weight: "400" },
                  { el: "small", size: "14px", weight: "500" },
                ].map((r) => (
                  <tr key={r.el} style={{ borderTop: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "10px 14px", fontFamily: mono, fontSize: 13, color: "var(--color-foreground)" }}>{r.el}</td>
                    <td style={{ padding: "10px 14px", color: "var(--color-muted-foreground)" }}>{r.size}</td>
                    <td style={{ padding: "10px 14px", color: "var(--color-muted-foreground)" }}>{r.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </DocsShell>
  )
}
