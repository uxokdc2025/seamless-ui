"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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

function PreviewCard({
  children,
  align = "center",
}: {
  children: React.ReactNode
  align?: "center" | "stretch"
}) {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        background: "var(--color-muted)",
        minHeight: "320px",
        display: "flex",
        alignItems: align === "center" ? "center" : "stretch",
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
          minHeight: "160px",
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

const demoItems = [
  {
    q: "Is it accessible?",
    a: "Yes. It adheres to the WAI-ARIA design pattern and is fully keyboard navigable.",
  },
  {
    q: "Is it styled?",
    a: "Yes. It comes with default styles that match the Seamless design system, and you can override them.",
  },
  {
    q: "Is it animated?",
    a: "Yes. It is animated by default, respecting the user's reduced-motion preference.",
  },
]

export default function AccordionPage() {
  return (
    <DocsShell title="Accordion">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Accordion
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          A vertically stacked set of interactive headings that each reveal a
          section of content.
        </p>

        <PreviewCard>
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Accordion type="single" collapsible>
              {demoItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/accordion`} />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@seamless/ui"

export default function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Single"
          description="Only one item can be open at a time. Set collapsible to allow closing the open item."
          code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Accordion type="single" collapsible>
              {demoItems.map((item, i) => (
                <AccordionItem key={i} value={`single-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Example>

        <Example
          title="Multiple"
          description="Set type to multiple to allow several items to be open simultaneously."
          code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>First section</AccordionTrigger>
    <AccordionContent>Content for the first section.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second section</AccordionTrigger>
    <AccordionContent>Content for the second section.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Accordion type="multiple">
              {demoItems.map((item, i) => (
                <AccordionItem key={i} value={`multi-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Example>

        <Example
          title="Default open"
          description="Use defaultValue to expand a specific item on first render."
          code={`<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Open by default</AccordionTrigger>
    <AccordionContent>This item starts expanded.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Accordion type="single" collapsible defaultValue="open-0">
              {demoItems.map((item, i) => (
                <AccordionItem key={i} value={`open-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Example>

        <SectionTitle>API Reference</SectionTitle>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-muted-foreground)",
            marginBottom: "16px",
          }}
        >
          The Accordion is composed of Radix primitives. Key props on{" "}
          <code>Accordion</code> (Root):
        </p>
        <PropsTable
          rows={[
            {
              prop: "type",
              type: '"single" | "multiple"',
              def: "—",
              desc: "Whether one or multiple items can be open at once.",
            },
            {
              prop: "collapsible",
              type: "boolean",
              def: "false",
              desc: 'When type is "single", allows closing the open item.',
            },
            {
              prop: "defaultValue",
              type: "string | string[]",
              def: "—",
              desc: "The value(s) of the item(s) open by default (uncontrolled).",
            },
            {
              prop: "value",
              type: "string | string[]",
              def: "—",
              desc: "The controlled value(s) of the open item(s).",
            },
            {
              prop: "onValueChange",
              type: "(value) => void",
              def: "—",
              desc: "Callback fired when the open item(s) change.",
            },
            {
              prop: "disabled",
              type: "boolean",
              def: "false",
              desc: "When true, prevents interaction with all items.",
            },
          ]}
        />
      </div>
    </DocsShell>
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
