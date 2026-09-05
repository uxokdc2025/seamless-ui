"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from "@seamless/ui"
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


function ContextMenuDemo() {
  const [bookmarks, setBookmarks] = React.useState(true)
  const [fullUrls, setFullUrls] = React.useState(false)
  const [person, setPerson] = React.useState("pedro")
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 320,
          height: 150,
          borderRadius: 8,
          border: "1px dashed var(--color-border)",
          fontSize: 14,
          color: "var(--color-muted-foreground)",
          background: "var(--color-background)",
          userSelect: "none",
        }}
      >
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent style={{ minWidth: 220 }}>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent style={{ minWidth: 200 }}>
            <ContextMenuItem>Save Page As...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
          Show Bookmarks Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={fullUrls} onCheckedChange={setFullUrls}>
          Show Full URLs
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default function ContextMenuPage() {
  return (
    <DocsShell title="Context Menu">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Context Menu"
          description="Displays a menu to the user — such as a set of actions or functions — triggered by a right click."
        />

        <Preview>
          <ContextMenuDemo />
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/context-menu" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@seamless/ui"

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<ContextMenu>
  <ContextMenuTrigger />
  <ContextMenuContent>
    <ContextMenuLabel />
    <ContextMenuItem />
    <ContextMenuCheckboxItem />
    <ContextMenuRadioGroup>
      <ContextMenuRadioItem />
    </ContextMenuRadioGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger />
      <ContextMenuSubContent />
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuShortcut />
  </ContextMenuContent>
</ContextMenu>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Checkbox and radio items"
            description="Combine checkbox items and a radio group for stateful selections."
            code={`<ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
  Show Bookmarks Bar
</ContextMenuCheckboxItem>

<ContextMenuRadioGroup value={person} onValueChange={setPerson}>
  <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
  <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
</ContextMenuRadioGroup>`}
          >
            <ContextMenuDemo />
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <ApiHeading>ContextMenu</ApiHeading>
          <PropsTable
            rows={[
              { prop: "onOpenChange", type: "(open: boolean) => void", def: "-", description: "Callback fired when the menu opens or closes." },
              { prop: "modal", type: "boolean", def: "true", description: "Whether the menu blocks interaction with the rest of the page." },
            ]}
          />
          <ApiHeading>ContextMenuItem</ApiHeading>
          <PropsTable
            rows={[
              { prop: "inset", type: "boolean", def: "false", description: "Adds left padding to align with items that have icons." },
              { prop: "disabled", type: "boolean", def: "false", description: "Prevents the item from being selected." },
              { prop: "onSelect", type: "(event) => void", def: "-", description: "Callback fired when the item is selected." },
            ]}
          />
          <ApiHeading>ContextMenuCheckboxItem</ApiHeading>
          <PropsTable
            rows={[
              { prop: "checked", type: "boolean", def: "-", description: "The controlled checked state." },
              { prop: "onCheckedChange", type: "(checked: boolean) => void", def: "-", description: "Callback fired when the checked state changes." },
            ]}
          />
          <ApiHeading>ContextMenuRadioItem</ApiHeading>
          <PropsTable
            rows={[
              { prop: "value", type: "string", def: "-", description: "The unique value of the radio item." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
