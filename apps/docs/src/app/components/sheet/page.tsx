"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "@seamless/ui"
import { Check, Copy } from "lucide-react"

const triggerStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  padding: "0 16px",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  cursor: "pointer",
}

const solidButton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 40,
  padding: "0 16px",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  border: "1px solid var(--color-primary)",
  background: "var(--color-primary)",
  color: "var(--color-primary-foreground)",
  cursor: "pointer",
}

type Side = "top" | "right" | "bottom" | "left"

function BasicSheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" style={triggerStyle} onClick={() => setOpen(true)}>
        Open sheet
      </button>
      <Sheet open={open} onClose={() => setOpen(false)} side="right">
        <SheetClose onClick={() => setOpen(false)} />
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <SheetContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "16px 0",
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{ fontSize: 13, color: "var(--color-foreground)" }}
              >
                Name
              </span>
              <input
                defaultValue="David Cervantes"
                style={{
                  height: 36,
                  padding: "0 10px",
                  fontSize: 14,
                  borderRadius: 6,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                  color: "var(--color-foreground)",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{ fontSize: 13, color: "var(--color-foreground)" }}
              >
                Username
              </span>
              <input
                defaultValue="@david"
                style={{
                  height: 36,
                  padding: "0 10px",
                  fontSize: 14,
                  borderRadius: 6,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                  color: "var(--color-foreground)",
                }}
              />
            </label>
          </div>
        </SheetContent>
        <SheetFooter>
          <button
            type="button"
            style={solidButton}
            onClick={() => setOpen(false)}
          >
            Save changes
          </button>
        </SheetFooter>
      </Sheet>
    </>
  )
}

function SidesSheet() {
  const [side, setSide] = useState<Side | null>(null)
  const sides: Side[] = ["top", "right", "bottom", "left"]
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {sides.map((s) => (
          <button
            key={s}
            type="button"
            style={triggerStyle}
            onClick={() => setSide(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <Sheet
        open={side !== null}
        onClose={() => setSide(null)}
        side={side ?? "right"}
      >
        <SheetClose onClick={() => setSide(null)} />
        <SheetHeader>
          <SheetTitle>Side: {side}</SheetTitle>
          <SheetDescription>
            The sheet slides in from the {side} edge of the viewport.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <button
            type="button"
            style={solidButton}
            onClick={() => setSide(null)}
          >
            Close
          </button>
        </SheetFooter>
      </Sheet>
    </>
  )
}

type PropRow = { prop: string; type: string; default?: string; description: string }

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
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
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: 16,
          paddingRight: 88,
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        padding: 32,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function Example({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: ReactNode
  code: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          margin: 0,
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={180}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  const th: CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-foreground)",
  }
  const td: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-foreground)",
    verticalAlign: "top",
    lineHeight: 1.5,
  }
  const tdMono: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-muted-foreground)",
    verticalAlign: "top",
    fontFamily: mono,
  }
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td style={{ ...td, fontFamily: mono, fontWeight: 500 }}>
                {r.prop}
              </td>
              <td style={tdMono}>{r.type}</td>
              <td style={tdMono}>{r.default ?? "—"}</td>
              <td style={td}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.02em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          fontSize: 16,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <DocsShell title={title}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {children}
      </div>
    </DocsShell>
  )
}

export default function SheetDocsPage() {
  return (
    <Page title="Sheet">
      <PageHeader
        title="Sheet"
        description="A panel that slides in from an edge of the screen for complementary content or forms. Controlled via the open and onClose props."
      />

      <PreviewCard>
        <BasicSheet />
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/sheet`} />
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent,
  SheetFooter,
  SheetClose,
} from "@seamless/ui"`}
        />
        <CodeBlock
          code={`const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Open</button>
<Sheet open={open} onClose={() => setOpen(false)} side="right">
  <SheetClose onClick={() => setOpen(false)} />
  <SheetHeader>
    <SheetTitle>Title</SheetTitle>
    <SheetDescription>Description</SheetDescription>
  </SheetHeader>
  <SheetContent>{/* body */}</SheetContent>
  <SheetFooter>
    <button onClick={() => setOpen(false)}>Save</button>
  </SheetFooter>
</Sheet>`}
        />
      </Section>

      <Section title="Anatomy">
        <CodeBlock
          code={`<Sheet open onClose>
  <SheetClose />
  <SheetHeader>
    <SheetTitle />
    <SheetDescription />
  </SheetHeader>
  <SheetContent />
  <SheetFooter />
</Sheet>`}
        />
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            lineHeight: 1.6,
          }}
        >
          Unlike a trigger-based dialog, Sheet is fully controlled: you render it
          conditionally with the <code style={{ fontFamily: mono }}>open</code>{" "}
          prop and close it from <code style={{ fontFamily: mono }}>onClose</code>
          . It also closes on Escape and on overlay click automatically.
        </p>
      </Section>

      <Section title="Examples">
        <Example
          title="Sides"
          description="The side prop controls which edge the sheet enters from: top, right, bottom, or left."
          code={`<Sheet open={side !== null} onClose={() => setSide(null)} side={side}>
  <SheetHeader>
    <SheetTitle>Side: {side}</SheetTitle>
  </SheetHeader>
</Sheet>`}
        >
          <SidesSheet />
        </Example>
      </Section>

      <Section title="API Reference">
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-foreground)",
          }}
        >
          Sheet
        </p>
        <PropsTable
          rows={[
            {
              prop: "open",
              type: "boolean",
              default: "false",
              description:
                "Whether the sheet is visible. The sheet renders nothing when false.",
            },
            {
              prop: "onClose",
              type: "() => void",
              description:
                "Called when the user dismisses via Escape or overlay click.",
            },
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"right"',
              description: "The edge the sheet slides in from.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the sheet panel.",
            },
          ]}
        />
        <p
          style={{
            margin: 0,
            marginTop: 4,
            fontSize: 14,
            color: "var(--color-muted-foreground)",
          }}
        >
          <code style={{ fontFamily: mono }}>SheetHeader</code>,{" "}
          <code style={{ fontFamily: mono }}>SheetFooter</code>,{" "}
          <code style={{ fontFamily: mono }}>SheetTitle</code>,{" "}
          <code style={{ fontFamily: mono }}>SheetDescription</code>,{" "}
          <code style={{ fontFamily: mono }}>SheetContent</code>, and{" "}
          <code style={{ fontFamily: mono }}>SheetClose</code> are layout
          helpers that accept standard element props.{" "}
          <code style={{ fontFamily: mono }}>SheetClose</code> takes an{" "}
          <code style={{ fontFamily: mono }}>onClick</code> handler to trigger
          your close logic.
        </p>
      </Section>
    </Page>
  )
}
