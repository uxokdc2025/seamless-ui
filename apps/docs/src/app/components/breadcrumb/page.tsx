"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@seamless/ui"
import { Copy, Check, Slash } from "lucide-react"

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
          minHeight: "120px",
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

export default function BreadcrumbPageDoc() {
  return (
    <DocsShell title="Breadcrumb">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Breadcrumb
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          Displays the path to the current resource using a hierarchy of links.
        </p>

        <PreviewCard>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock
          code={`pnpm dlx shadcn@latest add @seamless/ui/breadcrumb`}
        />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@seamless/ui"

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   ├── BreadcrumbLink
    │   └── BreadcrumbPage
    ├── BreadcrumbSeparator
    └── BreadcrumbEllipsis`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Custom separator"
          description="Pass any node as a child of BreadcrumbSeparator to replace the default chevron."
          code={`<BreadcrumbSeparator>
  <Slash />
</BreadcrumbSeparator>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>

        <Example
          title="With ellipsis"
          description="Collapse the middle of a long path with BreadcrumbEllipsis."
          code={`<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>

        <Example
          title="Sizes"
          description="Use the size prop for small, medium, or large breadcrumbs."
          code={`<Breadcrumb size="sm"> ... </Breadcrumb>
<Breadcrumb size="lg"> ... </Breadcrumb>`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <Breadcrumb size="sm">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Small</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Breadcrumb size="lg">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Large</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
          Props on the <code>Breadcrumb</code> root (a <code>nav</code>
          element):
        </p>
        <PropsTable
          rows={[
            {
              prop: "size",
              type: '"sm" | "md" | "lg"',
              def: '"md"',
              desc: "The text size of the breadcrumb trail.",
            },
            {
              prop: "className",
              type: "string",
              def: "—",
              desc: "Additional classes merged onto the nav element.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
