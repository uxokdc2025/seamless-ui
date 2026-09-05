"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { Avatar, AvatarImage, AvatarFallback } from "@seamless/ui"
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

export default function AvatarPage() {
  return (
    <DocsShell title="Avatar">
      <div style={{ maxWidth: "860px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "8px" }}>
          Avatar
        </h1>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-muted-foreground)",
            marginBottom: "28px",
          }}
        >
          An image element with a fallback for representing a user, with support
          for multiple sizes.
        </p>

        <PreviewCard>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PreviewCard>

        <SectionTitle>Installation</SectionTitle>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/avatar`} />

        <SectionTitle>Usage</SectionTitle>
        <CodeBlock
          code={`import { Avatar, AvatarImage, AvatarFallback } from "@seamless/ui"

export default function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`}
        />

        <SectionTitle>Composition</SectionTitle>
        <CodeBlock
          code={`Avatar
├── AvatarImage
└── AvatarFallback`}
        />

        <SectionTitle>Examples</SectionTitle>

        <Example
          title="Fallback"
          description="When no src is provided or the image fails to load, the fallback is shown."
          code={`<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}
        >
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Example>

        <Example
          title="Sizes"
          description="Avatars come in four sizes: sm, default, lg, and xl."
          code={`<Avatar size="sm">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarFallback>MD</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>
<Avatar size="xl">
  <AvatarFallback>XL</AvatarFallback>
</Avatar>`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Avatar size="sm">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>XL</AvatarFallback>
            </Avatar>
          </div>
        </Example>

        <Example
          title="Group"
          description="Overlap multiple avatars to represent a group of users."
          code={`<div style={{ display: "flex" }}>
  <Avatar style={{ marginLeft: 0, boxShadow: "0 0 0 2px var(--color-background)" }}>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
  <Avatar style={{ marginLeft: -12, boxShadow: "0 0 0 2px var(--color-background)" }}>
    <AvatarFallback>CD</AvatarFallback>
  </Avatar>
  <Avatar style={{ marginLeft: -12, boxShadow: "0 0 0 2px var(--color-background)" }}>
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>`}
        >
          <div style={{ display: "flex" }}>
            <Avatar
              style={{ boxShadow: "0 0 0 2px var(--color-background)" }}
            >
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar
              style={{
                marginLeft: "-12px",
                boxShadow: "0 0 0 2px var(--color-background)",
              }}
            >
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <Avatar
              style={{
                marginLeft: "-12px",
                boxShadow: "0 0 0 2px var(--color-background)",
              }}
            >
              <AvatarFallback>EF</AvatarFallback>
            </Avatar>
            <Avatar
              style={{
                marginLeft: "-12px",
                boxShadow: "0 0 0 2px var(--color-background)",
              }}
            >
              <AvatarFallback>+5</AvatarFallback>
            </Avatar>
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
          Props on <code>Avatar</code> (root). <code>AvatarImage</code> accepts
          standard <code>img</code> attributes; <code>AvatarFallback</code>{" "}
          accepts standard <code>div</code> attributes.
        </p>
        <PropsTable
          rows={[
            {
              prop: "size",
              type: '"sm" | "default" | "lg" | "xl"',
              def: '"default"',
              desc: "The diameter of the avatar (32 / 40 / 48 / 64px).",
            },
            {
              prop: "className",
              type: "string",
              def: "—",
              desc: "Additional classes merged onto the root element.",
            },
          ]}
        />
      </div>
    </DocsShell>
  )
}
