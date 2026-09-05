"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Button,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@seamless/ui"
import { CalendarDays, Copy, Check } from "lucide-react"

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

export default function HoverCardPage() {
  return (
    <DocsShell title="Hover Card">
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            margin: "0 0 8px",
            color: "var(--color-foreground)",
          }}
        >
          Hover Card
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--color-muted-foreground)",
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          For sighted users to preview content available behind a link.
        </p>

        <PreviewCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@seamless</Button>
            </HoverCardTrigger>
            <HoverCardContent style={{ width: 288 }}>
              <div style={{ display: "flex", gap: 16 }}>
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--color-foreground)",
                    }}
                  >
                    @seamless
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "var(--color-foreground)",
                    }}
                  >
                    The design system for building beautiful, accessible product
                    interfaces.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 4,
                      fontSize: 12,
                      color: "var(--color-muted-foreground)",
                    }}
                  >
                    <CalendarDays style={{ height: 14, width: 14 }} />
                    <span>Joined December 2024</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </PreviewCard>

        <SectionHeading>Installation</SectionHeading>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/hover-card`} />

        <SectionHeading>Usage</SectionHeading>
        <CodeBlock
          code={`import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@seamless/ui"

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}`}
        />

        <SectionHeading>Anatomy</SectionHeading>
        <CodeBlock
          code={`<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent />
</HoverCard>`}
        />

        <SectionHeading>Examples</SectionHeading>

        <Example
          title="Alignment"
          description="Control where the card appears relative to the trigger using align and side."
          code={`<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="outline">Aligned start</Button>
  </HoverCardTrigger>
  <HoverCardContent align="start">
    This card is aligned to the start of the trigger.
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline">Aligned start</Button>
            </HoverCardTrigger>
            <HoverCardContent align="start">
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--color-foreground)",
                }}
              >
                This card is aligned to the start of the trigger.
              </p>
            </HoverCardContent>
          </HoverCard>
        </Example>

        <Example
          title="Custom delay"
          description="Tune openDelay and closeDelay to make the card feel more or less eager."
          code={`<HoverCard openDelay={0} closeDelay={100}>
  <HoverCardTrigger asChild>
    <Button variant="outline">Instant open</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    Opens immediately on hover.
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="outline">Instant open</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--color-foreground)",
                }}
              >
                Opens immediately on hover.
              </p>
            </HoverCardContent>
          </HoverCard>
        </Example>

        <SectionHeading>API Reference</SectionHeading>
        <p
          style={{
            fontSize: 14,
            color: "var(--color-muted-foreground)",
            margin: "0 0 4px",
          }}
        >
          HoverCard (Root)
        </p>
        <PropsTable
          rows={[
            {
              name: "openDelay",
              type: "number",
              default: "700",
              description:
                "Duration in ms before the card opens after the pointer enters.",
            },
            {
              name: "closeDelay",
              type: "number",
              default: "300",
              description:
                "Duration in ms before the card closes after the pointer leaves.",
            },
            {
              name: "open",
              type: "boolean",
              default: "—",
              description: "Controlled open state of the hover card.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              default: "—",
              description: "Event handler called when the open state changes.",
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
          HoverCardContent
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
              name: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"bottom"',
              description: "Preferred side of the trigger to render against.",
            },
            {
              name: "sideOffset",
              type: "number",
              default: "4",
              description: "Distance in pixels from the trigger.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
