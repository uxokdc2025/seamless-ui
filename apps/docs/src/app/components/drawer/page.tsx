"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, DrawerFooter, DrawerClose, Button, Label, Input } from "@seamless/ui"
import { Copy, Check as CheckIcon } from "lucide-react"

const mono = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy to clipboard"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {copied ? <CheckIcon style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 48,
          overflowX: "auto",
          fontFamily: mono,
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-foreground)",
        }}
      >
        <code style={{ fontFamily: mono }}>{code}</code>
      </pre>
    </div>
  )
}

function InstallBlock({ command }: { command: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        padding: "12px 16px",
      }}
    >
      <span style={{ color: "var(--color-muted-foreground)", fontFamily: mono, fontSize: 13 }}>$</span>
      <code style={{ flex: 1, fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", overflowX: "auto" }}>
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  )
}

function Preview({ children, minHeight = 320 }: { children: React.ReactNode; minHeight?: number }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight,
          padding: 32,
          background: "var(--color-muted)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12, color: "var(--color-foreground)" }}>{title}</h2>
      {children}
    </section>
  )
}

function ExampleBlock({
  title,
  description,
  children,
  code,
}: {
  title: string
  description: string
  children: React.ReactNode
  code: string
}) {
  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: "var(--color-foreground)" }}>{title}</h3>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginTop: 0, marginBottom: 12 }}>
        {description}
      </p>
      <div style={{ marginBottom: 12 }}>
        <Preview minHeight={200}>{children}</Preview>
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function Tree({ code }: { code: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: 16,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
        fontFamily: mono,
        fontSize: 13,
        lineHeight: 1.6,
        color: "var(--color-muted-foreground)",
        overflowX: "auto",
      }}
    >
      <code style={{ fontFamily: mono }}>{code}</code>
    </pre>
  )
}

function PropsTable({ rows }: { rows: { prop: string; type: string; def: string; description: string }[] }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, overflow: "hidden", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 640 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  fontWeight: 600,
                  color: "var(--color-foreground)",
                  borderBottom: "1px solid var(--color-border)",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.prop} style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 13, color: "var(--color-foreground)", whiteSpace: "nowrap" }}>
                {r.prop}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)" }}>
                {r.type}
              </td>
              <td style={{ padding: "10px 16px", fontFamily: mono, fontSize: 12, color: "var(--color-muted-foreground)", whiteSpace: "nowrap" }}>
                {r.def}
              </td>
              <td style={{ padding: "10px 16px", color: "var(--color-muted-foreground)" }}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-foreground)", margin: 0 }}>
        {title}
      </h1>
      <p style={{ fontSize: 17, color: "var(--color-muted-foreground)", marginTop: 8, marginBottom: 0 }}>{description}</p>
    </div>
  )
}

function ApiHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 15, fontWeight: 600, margin: "24px 0 10px", fontFamily: mono, color: "var(--color-foreground)" }}>
      {children}
    </h3>
  )
}


type Side = "top" | "bottom" | "left" | "right"

function DrawerDemo({ side = "right" as Side, label = "Open drawer" }: { side?: Side; label?: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Drawer open={open} side={side} onClose={() => setOpen(false)} style={{ display: "flex", flexDirection: "column" }}>
        <DrawerHeader>
          <div>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>Make changes to your profile here.</DrawerDescription>
          </div>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label htmlFor="drawer-name">Name</Label>
              <Input id="drawer-name" defaultValue="David Cervantes" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Label htmlFor="drawer-email">Email</Label>
              <Input id="drawer-email" defaultValue="designer@uxokdc.com" />
            </div>
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} style={{ flex: 1 }}>
            Save
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export default function DrawerPage() {
  return (
    <DocsShell title="Drawer">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Drawer"
          description="A panel that slides in from the edge of the screen, useful for navigation, forms, and supplementary content."
        />

        <Preview>
          <DrawerDemo />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/drawer" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
} from "@seamless/ui"

export function Example() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer open={open} side="right" onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerContent>Content</DrawerContent>
      </Drawer>
    </>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<Drawer open={open} side="right" onClose={onClose}>
  <DrawerHeader>
    <DrawerTitle />
    <DrawerDescription />
    <DrawerClose />
  </DrawerHeader>
  <DrawerContent />
  <DrawerFooter />
</Drawer>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Sides"
            description="The drawer can slide in from any of the four edges via the side prop."
            code={`<Drawer open={open} side="left" onClose={onClose}>...</Drawer>
<Drawer open={open} side="right" onClose={onClose}>...</Drawer>
<Drawer open={open} side="top" onClose={onClose}>...</Drawer>
<Drawer open={open} side="bottom" onClose={onClose}>...</Drawer>`}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <DrawerDemo side="left" label="Left" />
              <DrawerDemo side="right" label="Right" />
              <DrawerDemo side="top" label="Top" />
              <DrawerDemo side="bottom" label="Bottom" />
            </div>
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <ApiHeading>Drawer</ApiHeading>
          <PropsTable
            rows={[
              { prop: "open", type: "boolean", def: "false", description: "Whether the drawer is visible." },
              { prop: "onClose", type: "() => void", def: "-", description: "Callback fired on overlay click or Escape key." },
              { prop: "side", type: '"top" | "bottom" | "left" | "right"', def: '"right"', description: "The edge the drawer slides in from." },
              { prop: "className", type: "string", def: "-", description: "Classes merged onto the panel element." },
            ]}
          />
          <ApiHeading>Sub-components</ApiHeading>
          <PropsTable
            rows={[
              { prop: "DrawerHeader", type: "div", def: "-", description: "Top bar of the drawer, holds the title and close button." },
              { prop: "DrawerTitle", type: "h2", def: "-", description: "Accessible title for the drawer." },
              { prop: "DrawerDescription", type: "p", def: "-", description: "Muted supporting text under the title." },
              { prop: "DrawerContent", type: "div", def: "-", description: "Scrollable main body of the drawer." },
              { prop: "DrawerFooter", type: "div", def: "-", description: "Bottom section for actions." },
              { prop: "DrawerClose", type: "button", def: "-", description: "Close button rendering an X icon." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
