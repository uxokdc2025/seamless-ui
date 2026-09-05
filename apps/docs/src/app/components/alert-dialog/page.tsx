"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const codeBlockStyle: React.CSSProperties = {
  margin: 0,
  padding: "16px",
  paddingRight: "48px",
  background: "var(--color-muted)",
  borderRadius: "8px",
  fontSize: "13px",
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  overflowX: "auto",
  lineHeight: 1.6,
  color: "var(--color-foreground)",
  whiteSpace: "pre",
}

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
        top: "10px",
        right: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        borderRadius: "6px",
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? (
        <Check style={{ width: "14px", height: "14px" }} />
      ) : (
        <Copy style={{ width: "14px", height: "14px" }} />
      )}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: "12px" }}>
      <pre style={codeBlockStyle}>
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        background: "var(--color-muted)",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "22px",
        fontWeight: 600,
        marginTop: "48px",
        marginBottom: "12px",
        paddingBottom: "8px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {children}
    </h2>
  )
}

function Example({
  title,
  description,
  code,
  children,
}: {
  title: string
  description: string
  code: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginTop: "32px" }}>
      <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "var(--color-muted-foreground)",
          marginBottom: "12px",
        }}
      >
        {description}
      </p>
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          background: "var(--color-muted)",
          minHeight: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
        }}
      >
        {children}
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({
  rows,
}: {
  rows: { prop: string; type: string; def: string; desc: string }[]
}) {
  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "13px",
    fontWeight: 600,
    borderBottom: "1px solid var(--color-border)",
    background: "var(--color-muted)",
  }
  const td: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "13px",
    borderBottom: "1px solid var(--color-border)",
    verticalAlign: "top",
  }
  const mono: React.CSSProperties = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    color: "var(--color-foreground)",
  }
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        overflow: "hidden",
        overflowX: "auto",
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}
      >
        <thead>
          <tr>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ ...td, ...mono, fontWeight: 600 }}>{r.prop}</td>
              <td
                style={{
                  ...td,
                  ...mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td style={{ ...td, ...mono }}>{r.def}</td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.desc}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AlertDialogPage() {
  return (
    <DocsShell title="Alert Dialog">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Alert Dialog
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          A modal dialog that interrupts the user with important content and
          expects a response before continuing.
        </p>

        <PreviewCard>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock
          code={`pnpm dlx shadcn@latest add @seamless/ui/alert-dialog`}
        />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from "@seamless/ui"

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Destructive action"
          description="Use the destructive button variant on the action for irreversible operations."
          code={`<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete account?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently removes your account and all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className={buttonVariants({ variant: "destructive" })}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes your account and all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  style={{
                    background: "var(--color-destructive)",
                    color: "var(--color-destructive-foreground)",
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Example>

        <Example
          title="Controlled"
          description="Control open state yourself to trigger the dialog programmatically."
          code={`function Example() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your unsaved edits will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}`}
        >
          <ControlledDemo />
        </Example>

        <SectionTitle>API Reference</SectionTitle>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-muted-foreground)",
            marginBottom: "16px",
          }}
        >
          Props on the <code>AlertDialog</code> root:
        </p>
        <PropsTable
          rows={[
            {
              prop: "open",
              type: "boolean",
              def: "—",
              desc: "The controlled open state of the dialog.",
            },
            {
              prop: "defaultOpen",
              type: "boolean",
              def: "false",
              desc: "The open state when initially rendered (uncontrolled).",
            },
            {
              prop: "onOpenChange",
              type: "(open: boolean) => void",
              def: "—",
              desc: "Callback fired when the open state changes.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}

function ControlledDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your unsaved edits will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
