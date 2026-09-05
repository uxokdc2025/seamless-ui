"use client"

import { useState, type ReactNode, type CSSProperties } from "react"
import { DocsShell } from "../../../components/docs-shell"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@seamless/ui"
import { Check, Copy } from "lucide-react"

type PropRow = { prop: string; type: string; default?: string; description: string }

const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      aria-label="Copy code"
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        fontSize: 12,
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        background: "var(--color-background)",
        color: "var(--color-muted-foreground)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative" }}>
      <pre
        style={{
          margin: 0,
          overflowX: "auto",
          borderRadius: 8,
          border: "1px solid var(--color-border)",
          background: "var(--color-muted)",
          color: "var(--color-foreground)",
          padding: 16,
          paddingRight: 88,
          fontSize: 13,
          lineHeight: 1.6,
          fontFamily: mono,
        }}
      >
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({
  children,
  minHeight = 320,
}: {
  children: ReactNode
  minHeight?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
        padding: 32,
        borderRadius: 8,
        border: "1px solid var(--color-border)",
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.01em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
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
  children: ReactNode
  code: string
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          margin: 0,
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      <PreviewCard minHeight={180}>{children}</PreviewCard>
      <CodeBlock code={code} />
    </div>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  const th: CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--color-foreground)",
  }
  const td: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-foreground)",
    verticalAlign: "top",
    lineHeight: 1.5,
  }
  const tdMono: CSSProperties = {
    padding: "10px 14px",
    fontSize: 13,
    color: "var(--color-muted-foreground)",
    verticalAlign: "top",
    fontFamily: mono,
  }
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid var(--color-border)",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}
      >
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={th}>Prop</th>
            <th style={th}>Type</th>
            <th style={th}>Default</th>
            <th style={th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.prop}
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <td style={{ ...td, fontFamily: mono, fontWeight: 500 }}>
                {r.prop}
              </td>
              <td style={tdMono}>{r.type}</td>
              <td style={tdMono}>{r.default ?? "—"}</td>
              <td style={td}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PageHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.02em",
          color: "var(--color-foreground)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 12,
          marginBottom: 0,
          fontSize: 16,
          color: "var(--color-muted-foreground)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <DocsShell title={title}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {children}
      </div>
    </DocsShell>
  )
}

export default function PaginationDocsPage() {
  return (
    <Page title="Pagination">
      <PageHeader
        title="Pagination"
        description="Navigation for splitting content across pages, with previous / next controls, numbered links, and truncation via an ellipsis."
      />

      <PreviewCard>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </PreviewCard>

      <Section title="Installation">
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/pagination`} />
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@seamless/ui"`}
        />
        <CodeBlock
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </Section>

      <Section title="Anatomy">
        <CodeBlock
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink isActive />
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </Section>

      <Section title="Examples">
        <Example
          title="With ellipsis"
          description="Use PaginationEllipsis to truncate a long range of pages while keeping the first, last, and current pages visible."
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        8
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">9</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  8
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>

        <Example
          title="Numbers only"
          description="A compact set of numbered links without previous / next controls."
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>

        <Example
          title="Sizes"
          description="Scale the whole pagination row with the size prop (sm, md, lg)."
          code={`<Pagination size="sm">...</Pagination>
<Pagination size="md">...</Pagination>
<Pagination size="lg">...</Pagination>`}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <Pagination key={s} size={s}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ))}
          </div>
        </Example>
      </Section>

      <Section title="API Reference">
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-muted-foreground)",
          }}
        >
          <code style={{ fontFamily: mono }}>Pagination</code> renders a{" "}
          <code style={{ fontFamily: mono }}>&lt;nav&gt;</code> element and
          accepts all native nav attributes.
        </p>
        <PropsTable
          rows={[
            {
              prop: "size",
              type: '"sm" | "md" | "lg"',
              default: '"md"',
              description: "Text scale applied to the pagination row.",
            },
            {
              prop: "className",
              type: "string",
              description: "Additional classes merged onto the nav element.",
            },
          ]}
        />
        <p
          style={{
            margin: 0,
            marginTop: 4,
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-foreground)",
          }}
        >
          PaginationLink
        </p>
        <PropsTable
          rows={[
            {
              prop: "isActive",
              type: "boolean",
              default: "false",
              description:
                "Marks the link as the current page (adds aria-current).",
            },
            {
              prop: "size",
              type: '"default" | "sm" | "lg" | "icon"',
              default: '"icon"',
              description: "Sizing of the link, mirroring the Button sizes.",
            },
            {
              prop: "href",
              type: "string",
              description: "Destination for the underlying anchor element.",
            },
          ]}
        />
      </Section>
    </Page>
  )
}
