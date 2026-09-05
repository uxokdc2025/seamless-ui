"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
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

function ListItem({
  title,
  children,
  href = "#",
}: {
  title: string
  children: React.ReactNode
  href?: string
}) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        style={{
          display: "block",
          textDecoration: "none",
          userSelect: "none",
          borderRadius: 6,
          padding: "12px",
          lineHeight: 1.2,
          color: "var(--color-foreground)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 13,
            lineHeight: 1.5,
            color: "var(--color-muted-foreground)",
          }}
        >
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
}

export default function NavigationMenuPage() {
  return (
    <DocsShell title="Navigation Menu">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Navigation Menu
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          A collection of links for navigating websites, with expandable panels
          for grouped destinations.
        </p>

        <PreviewCard>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    style={{
                      display: "grid",
                      gap: 8,
                      padding: 16,
                      width: 380,
                      margin: 0,
                      listStyle: "none",
                    }}
                  >
                    <ListItem title="Introduction">
                      Re-usable components built with accessibility in mind.
                    </ListItem>
                    <ListItem title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem title="Typography">
                      Styles for headings, paragraphs, and lists.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    style={{
                      display: "grid",
                      gap: 8,
                      padding: 16,
                      width: 380,
                      gridTemplateColumns: "1fr 1fr",
                      margin: 0,
                      listStyle: "none",
                    }}
                  >
                    <ListItem title="Alert Dialog">
                      A modal dialog that interrupts with important content.
                    </ListItem>
                    <ListItem title="Hover Card">
                      Preview content available behind a link.
                    </ListItem>
                    <ListItem title="Progress">
                      Displays an indicator showing completion.
                    </ListItem>
                    <ListItem title="Tabs">
                      Layered sections of content shown one at a time.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/navigation-menu`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@seamless/ui"

export default function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#">Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`}
        />

        <SectionHeading>Anatomy</SectionHeading>
        <CodeBlock
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger />
      <NavigationMenuContent>
        <NavigationMenuLink />
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink />
    </NavigationMenuItem>
    <NavigationMenuIndicator />
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Simple link"
          description="Use navigationMenuTriggerStyle() to style a plain link like a trigger."
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink
        href="#"
        className={navigationMenuTriggerStyle()}
      >
        Overview
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink
        href="#"
        className={navigationMenuTriggerStyle()}
      >
        Pricing
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Overview
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "0 0 4px",
          }}
        >
          NavigationMenu (Root)
        </p>
        <PropsTable
          rows={[
            {
              name: "value",
              type: "string",
              default: "—",
              description: "The controlled value of the active menu item.",
            },
            {
              name: "defaultValue",
              type: "string",
              default: "—",
              description: "The value of the menu item open by default.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              default: "—",
              description: "Called when the active menu item changes.",
            },
            {
              name: "delayDuration",
              type: "number",
              default: "200",
              description:
                "Duration in ms from pointer enter before the content opens.",
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
          NavigationMenuLink
        </p>
        <PropsTable
          rows={[
            {
              name: "active",
              type: "boolean",
              default: "false",
              description: "Whether the link represents the current page.",
            },
            {
              name: "asChild",
              type: "boolean",
              default: "false",
              description:
                "Merge props onto the child element instead of rendering an anchor.",
            },
            {
              name: "onSelect",
              type: "(event: Event) => void",
              default: "—",
              description: "Called when the link is selected.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
