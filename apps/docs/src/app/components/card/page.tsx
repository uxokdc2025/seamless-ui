"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, Button, Input, Label } from "@seamless/ui"
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


export default function CardPage() {
  return (
    <DocsShell title="Card">
      <div style={{ maxWidth: 900 }}>
        <PageHeader
          title="Card"
          description="Displays a card with header, content, and footer. A flexible container for grouping related content and actions."
        />

        <Preview>
          <Card style={{ width: 360 }}>
            <CardHeader>
              <CardTitle style={{ fontSize: 20 }}>Create project</CardTitle>
              <CardDescription>Deploy your new project in one click.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Label htmlFor="card-name">Name</Label>
                  <Input id="card-name" placeholder="Name of your project" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Label htmlFor="card-fw">Framework</Label>
                  <Input id="card-fw" placeholder="Next.js" />
                </div>
              </div>
            </CardContent>
            <CardFooter style={{ justifyContent: "space-between" }}>
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </Preview>

        <Section title="Installation">
          <InstallBlock command="pnpm dlx shadcn@latest add @seamless/ui/card" />
        </Section>

        <Section title="Usage">
          <CodeBlock
            code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@seamless/ui"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  )
}`}
          />
        </Section>

        <Section title="Anatomy">
          <Tree
            code={`<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>`}
          />
        </Section>

        <Section title="Examples">
          <ExampleBlock
            title="Simple"
            description="A minimal card with just a title, description, and content."
            code={`<Card>
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent>Manage how you receive notifications.</CardContent>
</Card>`}
          >
            <Card style={{ width: 340 }}>
              <CardHeader>
                <CardTitle style={{ fontSize: 20 }}>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent style={{ fontSize: 14, color: "var(--color-muted-foreground)" }}>
                Manage how you receive notifications.
              </CardContent>
            </Card>
          </ExampleBlock>

          <ExampleBlock
            title="With footer actions"
            description="Place primary and secondary actions in the footer."
            code={`<Card>
  <CardHeader>
    <CardTitle>Upgrade plan</CardTitle>
    <CardDescription>Unlock every feature.</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button variant="outline">Later</Button>
    <Button>Upgrade</Button>
  </CardFooter>
</Card>`}
          >
            <Card style={{ width: 340 }}>
              <CardHeader>
                <CardTitle style={{ fontSize: 20 }}>Upgrade plan</CardTitle>
                <CardDescription>Unlock every feature.</CardDescription>
              </CardHeader>
              <CardFooter style={{ gap: 8 }}>
                <Button variant="outline">Later</Button>
                <Button>Upgrade</Button>
              </CardFooter>
            </Card>
          </ExampleBlock>
        </Section>

        <Section title="API Reference">
          <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginTop: 0 }}>
            <code style={{ fontFamily: mono }}>Card</code> and each of its sub-components render a native element and
            accept all standard HTML attributes for that element.
          </p>
          <PropsTable
            rows={[
              { prop: "Card", type: "div", def: "-", description: "Root container with border, background, and shadow." },
              { prop: "CardHeader", type: "div", def: "-", description: "Top section, typically holds title and description." },
              { prop: "CardTitle", type: "h3", def: "-", description: "Heading element for the card title." },
              { prop: "CardDescription", type: "p", def: "-", description: "Muted supporting text under the title." },
              { prop: "CardContent", type: "div", def: "-", description: "Main body of the card." },
              { prop: "CardFooter", type: "div", def: "-", description: "Bottom section for actions." },
              { prop: "className", type: "string", def: "-", description: "Additional classes merged onto the element." },
            ]}
          />
        </Section>
      </div>
    </DocsShell>
  )
}
