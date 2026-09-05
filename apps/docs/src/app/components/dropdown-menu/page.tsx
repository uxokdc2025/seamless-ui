"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@seamless/ui"
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Plus,
  UserPlus,
  Mail,
  Copy,
  Check,
} from "lucide-react"

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

export default function DropdownMenuPage() {
  const [showStatus, setShowStatus] = React.useState(true)
  const [showActivity, setShowActivity] = React.useState(false)
  const [position, setPosition] = React.useState("bottom")

  return (
    <DocsShell title="Dropdown Menu">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Dropdown Menu
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          Displays a menu to the user — such as a set of actions or functions —
          triggered by a button.
        </p>

        <PreviewCard>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: 224 }}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User style={{ marginRight: 8, height: 16, width: 16 }} />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard
                    style={{ marginRight: 8, height: 16, width: 16 }}
                  />
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings style={{ marginRight: 8, height: 16, width: 16 }} />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut style={{ marginRight: 8, height: 16, width: 16 }} />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/dropdown-menu`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@seamless/ui"

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
        />

        <SectionHeading>Anatomy</SectionHeading>
        <CodeBlock
          code={`<DropdownMenu>
  <DropdownMenuTrigger />
  <DropdownMenuContent>
    <DropdownMenuLabel />
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem />
      <DropdownMenuCheckboxItem />
      <DropdownMenuRadioGroup>
        <DropdownMenuRadioItem />
      </DropdownMenuRadioGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger />
        <DropdownMenuSubContent />
      </DropdownMenuSub>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Checkbox items"
          description="Use checkbox items to toggle boolean options directly from the menu."
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Appearance</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem
      checked={showStatus}
      onCheckedChange={setShowStatus}
    >
      Status Bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem
      checked={showActivity}
      onCheckedChange={setShowActivity}
    >
      Activity Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Appearance</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: 208 }}>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatus}
                onCheckedChange={setShowStatus}
              >
                Status Bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivity}
                onCheckedChange={setShowActivity}
              >
                Activity Bar
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>

        <Example
          title="Radio group"
          description="Use a radio group when only one option can be selected at a time."
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Panel Position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Panel Position</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: 208 }}>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>

        <Example
          title="With submenu"
          description="Nest a submenu to group related secondary actions."
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Invite</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      <Plus /> New Team
    </DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <UserPlus /> Invite users
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>
          <Mail /> Email
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Invite</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: 208 }}>
              <DropdownMenuItem>
                <Plus style={{ marginRight: 8, height: 16, width: 16 }} />
                New Team
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus
                    style={{ marginRight: 8, height: 16, width: 16 }}
                  />
                  Invite users
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail style={{ marginRight: 8, height: 16, width: 16 }} />
                    Email
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "0 0 4px",
          }}
        >
          DropdownMenuContent
        </p>
        <PropsTable
          rows={[
            {
              name: "align",
              type: '"start" | "center" | "end"',
              default: '"center"',
              description: "Preferred alignment against the trigger.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels from the trigger.",
            },
            {
              name: "loop",
              type: "boolean",
              default: "false",
              description: "Whether keyboard focus loops within the menu.",
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
          DropdownMenuItem
        </p>
        <PropsTable
          rows={[
            {
              name: "inset",
              type: "boolean",
              default: "false",
              description: "Adds left padding to align with items that have icons.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents the user from interacting with the item.",
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
