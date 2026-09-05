"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Skeleton } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdCell: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const tdMono: React.CSSProperties = { ...tdCell, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)", whiteSpace: "nowrap" }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      aria-label="Copy code"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-muted-foreground)", cursor: "pointer" }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, right: 8 }}><CopyButton text={code} /></div>
      <pre style={{ margin: 0, padding: 16, overflowX: "auto", fontSize: 13, lineHeight: 1.6 }}>
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)" }}>{code}</code>
      </pre>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 16, minHeight: 320, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
      {children}
    </div>
  )
}

function ExampleSection({ title, description, code, children }: { title: string; description?: string; code: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{title}</h3>
        {description && <p style={{ margin: 0, fontSize: 14, color: "var(--color-muted-foreground)" }}>{description}</p>}
      </div>
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{children}</h2>
}

export default function SkeletonPage() {
  return (
    <DocsShell title="Skeleton">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Skeleton</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            Use to show a placeholder while content is loading.
          </p>
        </header>

        <Preview>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Skeleton variant="circular" style={{ height: 48, width: 48 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Skeleton style={{ height: 16, width: 200 }} />
              <Skeleton style={{ height: 16, width: 160 }} />
            </div>
          </div>
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/skeleton" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { Skeleton } from "@seamless/ui"

export default function Example() {
  return <Skeleton className="h-4 w-[250px]" />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Default"
            description="A simple rounded rectangle placeholder."
            code={`<Skeleton className="h-4 w-[250px]" />`}
          >
            <Skeleton style={{ height: 16, width: 250 }} />
          </ExampleSection>

          <ExampleSection
            title="Circular"
            description="Use the circular variant for avatars and icons."
            code={`<Skeleton variant="circular" className="h-12 w-12" />`}
          >
            <Skeleton variant="circular" style={{ height: 48, width: 48 }} />
          </ExampleSection>

          <ExampleSection
            title="Text lines"
            description="Stack text-variant skeletons to mimic a paragraph."
            code={`<div className="space-y-2">
  <Skeleton variant="text" />
  <Skeleton variant="text" className="w-[80%]" />
  <Skeleton variant="text" className="w-[60%]" />
</div>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
              <Skeleton variant="text" />
              <Skeleton variant="text" style={{ width: "80%" }} />
              <Skeleton variant="text" style={{ width: "60%" }} />
            </div>
          </ExampleSection>

          <ExampleSection
            title="Card"
            description="Compose skeletons to represent a loading card."
            code={`<div className="flex flex-col gap-3">
  <Skeleton className="h-[160px] w-[300px] rounded-xl" />
  <Skeleton className="h-4 w-[300px]" />
  <Skeleton className="h-4 w-[220px]" />
</div>`}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Skeleton style={{ height: 160, width: 300, borderRadius: 12 }} />
              <Skeleton style={{ height: 16, width: 300 }} />
              <Skeleton style={{ height: 16, width: 220 }} />
            </div>
          </ExampleSection>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>API Reference</H2>
          <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={tdMono}>variant</td><td style={tdMono}>&quot;default&quot; | &quot;circular&quot; | &quot;text&quot;</td><td style={tdMono}>&quot;default&quot;</td><td style={tdCell}>Shape preset of the placeholder.</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={tdMono}>className</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Size and layout overrides (height, width, radius).</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={tdMono}>...props</td><td style={tdMono}>HTMLAttributes&lt;HTMLDivElement&gt;</td><td style={tdMono}>—</td><td style={tdCell}>All standard div attributes are forwarded.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
