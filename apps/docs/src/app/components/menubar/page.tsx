"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
const th: React.CSSProperties = {
  padding: "10px 12px",
  fontWeight: 600,
  color: "var(--color-foreground)",
  whiteSpace: "nowrap",
}
const td: React.CSSProperties = { padding: "10px 12px", verticalAlign: "top" }

type Prop = { name: string; type: string; default: string; description: string }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 32,
        width: 32,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: "16px 52px 16px 16px",
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <div style={{ position: "absolute", top: 8, right: 8 }}>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: React.ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight,
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 20,
        fontWeight: 600,
        margin: "48px 0 8px",
        color: "var(--color-foreground)",
      }}
    >
      {children}
    </h2>
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
  children: React.ReactNode
  code: string
}) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 600,
          margin: "0 0 4px",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 14,
          color: "var(--color-muted-foreground)",
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={200}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: Prop[] }) {
  return (
    <div
      style={{
        marginTop: 12,
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)", textAlign: "left" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.name}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-foreground)",
                  fontWeight: 500,
                }}
              >
                {r.name}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.type}
              </td>
              <td
                style={{
                  ...td,
                  fontFamily: mono,
                  color: "var(--color-muted-foreground)",
                }}
              >
                {r.default}
              </td>
              <td style={{ ...td, color: "var(--color-muted-foreground)" }}>
                {r.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MenubarPage() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showFullUrls, setShowFullUrls] = React.useState(false)
  const [profile, setProfile] = React.useState("benoit")

  return (
    <DocsShell title="Menubar">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Menubar
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          A visually persistent menu common in desktop applications that
          provides quick access to a consistent set of commands.
        </p>

        <PreviewCard>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print… <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem
                  checked={showBookmarks}
                  onCheckedChange={setShowBookmarks}
                >
                  Always Show Bookmarks
                </MenubarCheckboxItem>
                <MenubarCheckboxItem
                  checked={showFullUrls}
                  onCheckedChange={setShowFullUrls}
                >
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/menubar`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@seamless/ui"

export default function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`}
        />

        <SectionHeading>Anatomy</SectionHeading>
        <CodeBlock
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger />
    <MenubarContent>
      <MenubarLabel />
      <MenubarItem />
      <MenubarSeparator />
      <MenubarCheckboxItem />
      <MenubarRadioGroup>
        <MenubarRadioItem />
      </MenubarRadioGroup>
      <MenubarSub>
        <MenubarSubTrigger />
        <MenubarSubContent />
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Radio group"
          description="Use a radio group inside a menu to select a single active profile."
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Profiles</MenubarTrigger>
    <MenubarContent>
      <MenubarLabel>Switch account</MenubarLabel>
      <MenubarSeparator />
      <MenubarRadioGroup value={profile} onValueChange={setProfile}>
        <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
        <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
        <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        >
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarLabel>Switch account</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup value={profile} onValueChange={setProfile}>
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "0 0 4px",
          }}
        >
          MenubarContent
        </p>
        <PropsTable
          rows={[
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"start"',
              description: "Preferred alignment against the trigger.",
            },
            {
              name: "alignOffset",
              type: "number",
              default: "-4",
              description: "Offset in pixels from the align edge.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "8",
              description: "Distance in pixels from the trigger.",
            },
          ]}
        />
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "24px 0 4px",
          }}
        >
          MenubarItem
        </p>
        <PropsTable
          rows={[
            {
              name: "inset",
              type: "boolean",
              default: "false",
              description: "Adds left padding to align with labeled items.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents interaction with the item.",
            },
            {
              name: "onSelect",
              type: "(event: Event) => void",
              default: "—",
              description: "Called when the item is selected.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
