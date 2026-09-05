"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { EmptyState, Button } from "@seamless/ui"
import { Copy, Check, Inbox, Search, FileText, Plus, Users } from "lucide-react"

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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", padding: 24 }}>
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
      <Preview minHeight={280}>{preview}</Preview>
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

function card(children: React.ReactNode) {
  return (
    <div style={{ width: "100%", maxWidth: 440, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-background)" }}>
      {children}
    </div>
  )
}

export default function EmptyPage() {
  return (
    <DocsShell title="Empty">
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Empty</h1>
        <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", margin: "0 0 32px", lineHeight: 1.6 }}>
          A centered placeholder shown when there is no data to display. Communicates the empty state and offers a next action.
        </p>

        <Preview>
          {card(
            <EmptyState
              icon={<Inbox size={40} />}
              title="No messages yet"
              description="When you receive messages, they'll show up here."
            />
          )}
        </Preview>

        <Section title="Installation">
          <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/empty`} />
        </Section>

        <Section title="Usage">
          <CodeBlock code={`import { EmptyState } from "@/components/ui/empty-state"
import { Inbox } from "lucide-react"

export default function Example() {
  return (
    <EmptyState
      icon={<Inbox className="h-10 w-10" />}
      title="No messages yet"
      description="When you receive messages, they'll show up here."
    />
  )
}`} />
        </Section>

        <Section title="Examples">
          <Example
            title="With Action"
            description="Give users a clear way to move forward."
            preview={
              card(
                <EmptyState
                  icon={<FileText size={40} />}
                  title="No documents"
                  description="Create your first document to get started."
                  action={<Button className="gap-2"><Plus size={16} /> New document</Button>}
                />
              )
            }
            code={`<EmptyState
  icon={<FileText className="h-10 w-10" />}
  title="No documents"
  description="Create your first document to get started."
  action={
    <Button className="gap-2">
      <Plus className="h-4 w-4" /> New document
    </Button>
  }
/>`}
          />
          <Example
            title="No Search Results"
            description="Use for empty search or filter results."
            preview={
              card(
                <EmptyState
                  icon={<Search size={40} />}
                  title="No results found"
                  description="Try adjusting your search or filters to find what you're looking for."
                  action={<Button variant="outline">Clear filters</Button>}
                />
              )
            }
            code={`<EmptyState
  icon={<Search className="h-10 w-10" />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button variant="outline">Clear filters</Button>}
/>`}
          />
          <Example
            title="Title Only"
            description="The description and icon are optional — only the title is required."
            preview={card(<EmptyState title="Nothing here yet" />)}
            code={`<EmptyState title="Nothing here yet" />`}
          />
          <Example
            title="With Multiple Actions"
            description="Offer a primary and a secondary action together."
            preview={
              card(
                <EmptyState
                  icon={<Users size={40} />}
                  title="No team members"
                  description="Invite people to collaborate on this workspace."
                  action={
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button className="gap-2"><Plus size={16} /> Invite</Button>
                      <Button variant="outline">Learn more</Button>
                    </div>
                  }
                />
              )
            }
            code={`<EmptyState
  icon={<Users className="h-10 w-10" />}
  title="No team members"
  description="Invite people to collaborate on this workspace."
  action={
    <div className="flex gap-2">
      <Button className="gap-2"><Plus className="h-4 w-4" /> Invite</Button>
      <Button variant="outline">Learn more</Button>
    </div>
  }
/>`}
          />
        </Section>

        <Section title="API Reference" description="EmptyState accepts the following props.">
          <PropsTable
            rows={[
              { prop: "title", type: "string", desc: "The primary message. Required." },
              { prop: "description", type: "string", desc: "Optional supporting text below the title." },
              { prop: "icon", type: "React.ReactNode", desc: "Optional icon rendered above the title." },
              { prop: "action", type: "React.ReactNode", desc: "Optional action element(s), such as a Button." },
              { prop: "className", type: "string", desc: "Additional classes for the container." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
