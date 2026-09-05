"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, Button, Input, Label } from "@seamless/ui"
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


function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Label htmlFor="dlg-name">Name</Label>
            <Input id="dlg-name" defaultValue="David Cervantes" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Label htmlFor="dlg-user">Username</Label>
            <Input id="dlg-user" defaultValue="@david" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function DialogPage() {
  return (
    <DocsShell title="Dialog">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Dialog"
          description="A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
        />

        <Preview>
          <DialogDemo />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/dialog" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@seamless/ui"

export function Example() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
    <DialogFooter>
      <DialogClose />
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="With footer actions"
            description="Use DialogFooter for actions and DialogClose to dismiss the dialog."
            code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
          >
            <DialogDemo />
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <ApiHeading>Dialog</ApiHeading>
          <PropsTable
            rows={[
              { prop: "open", type: "boolean", def: "-", description: "The controlled open state of the dialog." },
              { prop: "defaultOpen", type: "boolean", def: "false", description: "The open state when uncontrolled." },
              { prop: "onOpenChange", type: "(open: boolean) => void", def: "-", description: "Callback fired when the open state changes." },
              { prop: "modal", type: "boolean", def: "true", description: "Whether interaction with outside content is disabled." },
            ]}
          />
          <ApiHeading>DialogContent</ApiHeading>
          <PropsTable
            rows={[
              { prop: "onEscapeKeyDown", type: "(event) => void", def: "-", description: "Fired when the escape key is pressed." },
              { prop: "onPointerDownOutside", type: "(event) => void", def: "-", description: "Fired when a pointer event occurs outside the content." },
              { prop: "className", type: "string", def: "-", description: "Classes merged onto the content element." },
            ]}
          />
          <ApiHeading>DialogTrigger / DialogClose</ApiHeading>
          <PropsTable
            rows={[
              { prop: "asChild", type: "boolean", def: "false", description: "Merge props onto the child element instead of rendering a button." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
