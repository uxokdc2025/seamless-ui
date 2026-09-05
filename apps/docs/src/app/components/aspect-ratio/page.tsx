"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { AspectRatio } from "@seamless/ui"
import { Copy, Check, ImageIcon } from "lucide-react"

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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 24, minHeight, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 32 }}>
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
      <Preview minHeight={220}>{preview}</Preview>
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

function Fill({ label }: { label: string }) {
  return (
    <div
      style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 8,
        background: "linear-gradient(135deg, var(--color-accent), var(--color-secondary))",
        color: "var(--color-accent-foreground)", fontSize: 13, fontWeight: 600,
      }}
    >
      <ImageIcon size={20} />
      {label}
    </div>
  )
}

export default function AspectRatioPage() {
  return (
    <DocsShell title="Aspect Ratio">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Aspect Ratio</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          Constrains its content to a fixed width-to-height ratio. Useful for images, video embeds, and media placeholders.
        </p>

        <Preview>
          <div style={{ width: 400, maxWidth: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <AspectRatio ratio="16/9">
              <Fill label="16 / 9" />
            </AspectRatio>
          </div>
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/aspect-ratio`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Example() {
  return (
    <AspectRatio ratio="16/9">
      <img src="/cover.jpg" alt="Cover" className="h-full w-full object-cover" />
    </AspectRatio>
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="Square"
            description="A 1:1 ratio, ideal for avatars and thumbnails."
            preview={
              <div style={{ width: 200, borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <AspectRatio ratio="square"><Fill label="1 / 1" /></AspectRatio>
              </div>
            }
            code={`<AspectRatio ratio="square">
  <img src="/avatar.jpg" alt="" className="h-full w-full object-cover" />
</AspectRatio>`}
          />
          <Example
            title="Video (16:9)"
            description="A widescreen ratio for video embeds and hero media."
            preview={
              <div style={{ width: 360, maxWidth: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <AspectRatio ratio="video"><Fill label="16 / 9" /></AspectRatio>
              </div>
            }
            code={`<AspectRatio ratio="video">
  <iframe src="https://..." className="h-full w-full" />
</AspectRatio>`}
          />
          <Example
            title="Portrait (3:4)"
            description="A taller-than-wide ratio for portrait imagery."
            preview={
              <div style={{ width: 180, borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <AspectRatio ratio="3/4"><Fill label="3 / 4" /></AspectRatio>
              </div>
            }
            code={`<AspectRatio ratio="3/4">
  <img src="/portrait.jpg" alt="" className="h-full w-full object-cover" />
</AspectRatio>`}
          />
          <Example
            title="Ultrawide (21:9)"
            description="A cinematic ratio for banners."
            preview={
              <div style={{ width: 420, maxWidth: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <AspectRatio ratio="21/9"><Fill label="21 / 9" /></AspectRatio>
              </div>
            }
            code={`<AspectRatio ratio="21/9">
  <img src="/banner.jpg" alt="" className="h-full w-full object-cover" />
</AspectRatio>`}
          />
          <Example
            title="Custom Ratio"
            description="Provide any numeric ratio with the customRatio prop."
            preview={
              <div style={{ width: 300, borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-border)" }}>
                <AspectRatio customRatio={2.35}><Fill label="2.35 : 1" /></AspectRatio>
              </div>
            }
            code={`<AspectRatio customRatio={2.35}>
  <img src="/cinema.jpg" alt="" className="h-full w-full object-cover" />
</AspectRatio>`}
          />
        </Section>

        <Section title="API Reference" description="AspectRatio accepts the following props.">
          <PropsTable
            rows={[
              { prop: "ratio", type: '"square" | "video" | "4/3" | "3/4" | "16/9" | "9/16" | "21/9"', def: '"square"', desc: "A preset width-to-height ratio." },
              { prop: "customRatio", type: "number", desc: "A custom numeric ratio (e.g. 2.35). Overrides ratio when set." },
              { prop: "className", type: "string", desc: "Additional classes for the wrapper element." },
              { prop: "children", type: "React.ReactNode", desc: "Content constrained to the ratio; should fill the box." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
