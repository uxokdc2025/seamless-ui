"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from "@seamless/ui"
import { Copy, Check, Plus } from "lucide-react"

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

function Preview({ children, minHeight = 320 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 24, minHeight, padding: 32, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
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
      <Preview minHeight={180}>{children}</Preview>
      <CodeBlock code={code} />
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{children}</h2>
}

export default function TooltipPage() {
  return (
    <DocsShell title="Tooltip">
      <TooltipProvider>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
          <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Tooltip</h1>
            <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
              A popup that displays information related to an element when it receives focus or hover.
            </p>
          </header>

          <Preview>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p style={{ margin: 0 }}>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </Preview>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <H2>Installation</H2>
            <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/tooltip" />
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <H2>Usage</H2>
            <CodeBlock code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@seamless/ui"

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`} />
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <H2>Anatomy</H2>
            <CodeBlock code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger />
    <TooltipContent />
  </Tooltip>
</TooltipProvider>`} />
            <p style={{ margin: 0, fontSize: 14, color: "var(--color-muted-foreground)" }}>
              Wrap your app (or subtree) once in a single <code style={{ fontFamily: "ui-monospace, monospace" }}>TooltipProvider</code> to share delay timing across tooltips.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <H2>Examples</H2>

            <ExampleSection
              title="Sides"
              description="Position the content on any side of the trigger."
              code={`<TooltipContent side="top">Top</TooltipContent>
<TooltipContent side="right">Right</TooltipContent>
<TooltipContent side="bottom">Bottom</TooltipContent>
<TooltipContent side="left">Left</TooltipContent>`}
            >
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger asChild>
                    <Button variant="outline">{side}</Button>
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    <p style={{ margin: 0 }}>On {side}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </ExampleSection>

            <ExampleSection
              title="On an icon button"
              description="A common pattern for labeling icon-only controls."
              code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  </TooltipTrigger>
  <TooltipContent>New item</TooltipContent>
</Tooltip>`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="New item">
                    <Plus size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p style={{ margin: 0 }}>New item</p>
                </TooltipContent>
              </Tooltip>
            </ExampleSection>

            <ExampleSection
              title="Custom delay"
              description="Set delayDuration on the Tooltip to change how fast it opens."
              code={`<Tooltip delayDuration={0}>
  <TooltipTrigger asChild>
    <Button variant="outline">Instant</Button>
  </TooltipTrigger>
  <TooltipContent>Opens immediately</TooltipContent>
</Tooltip>`}
            >
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button variant="outline">Instant</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p style={{ margin: 0 }}>Opens immediately</p>
                </TooltipContent>
              </Tooltip>
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
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>delayDuration</td><td style={tdMono}>number</td><td style={tdMono}>700</td><td style={tdCell}>Delay (ms) before the tooltip opens on hover.</td></tr>
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>open</td><td style={tdMono}>boolean</td><td style={tdMono}>—</td><td style={tdCell}>Controlled open state.</td></tr>
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onOpenChange</td><td style={tdMono}>(open: boolean) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when open state changes.</td></tr>
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>TooltipTrigger.asChild</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Merge props onto the child instead of rendering a button.</td></tr>
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>TooltipContent.side</td><td style={tdMono}>&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</td><td style={tdMono}>&quot;top&quot;</td><td style={tdCell}>Preferred side to render on.</td></tr>
                  <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>TooltipContent.sideOffset</td><td style={tdMono}>number</td><td style={tdMono}>4</td><td style={tdCell}>Distance in px from the trigger.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </TooltipProvider>
    </DocsShell>
  )
}
