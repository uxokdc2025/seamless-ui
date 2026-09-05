"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DocsShell } from "../../../components/docs-shell"
import { ArrowLeft, Eye, Code2 } from "lucide-react"
import {
  getBlock,
  installCommand,
  CodeBlock,
  CopyButton,
} from "../blocks-registry"

export default function BlockDetailPage() {
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : ""
  const block = getBlock(slug)
  const [tab, setTab] = useState<"preview" | "code">("preview")

  if (!block) {
    return (
      <DocsShell title="Block not found">
        <div style={{ maxWidth: "640px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700 }}>Block not found</h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-muted-foreground)",
              marginTop: "8px",
            }}
          >
            No block matches “{slug}”.
          </p>
          <Link
            href="/blocks"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "20px",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--color-foreground)",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} /> Back to blocks
          </Link>
        </div>
      </DocsShell>
    )
  }

  const cmd = installCommand(block.slug)

  return (
    <DocsShell title={block.name}>
      <div>
        {/* Breadcrumb / back */}
        <Link
          href="/blocks"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--color-muted-foreground)",
            marginBottom: "16px",
          }}
        >
          <ArrowLeft style={{ width: "14px", height: "14px" }} /> Blocks
        </Link>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {block.name}
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "var(--color-muted-foreground)",
                marginTop: "8px",
                maxWidth: "620px",
                lineHeight: 1.6,
              }}
            >
              {block.description}
            </p>
          </div>

          {/* Preview / Code toggle */}
          <div
            style={{
              display: "flex",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "2px",
              flexShrink: 0,
            }}
          >
            {(["preview", "code"] as const).map((t) => {
              const isActive = tab === t
              const Icon = t === "preview" ? Eye : Code2
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    fontSize: "13px",
                    fontWeight: 500,
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    background: isActive ? "var(--color-muted)" : "transparent",
                    color: isActive
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                  }}
                >
                  <Icon style={{ width: "14px", height: "14px" }} />
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Install command */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--color-border)",
            borderRadius: "8px",
            background: "var(--color-muted)",
            padding: "8px 8px 8px 14px",
            marginTop: "24px",
            maxWidth: "560px",
          }}
        >
          <code
            style={{
              flex: 1,
              minWidth: 0,
              fontSize: "13px",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              color: "var(--color-foreground)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {cmd}
          </code>
          <CopyButton text={cmd} label="Copy install command" />
        </div>

        {/* Preview / Code panel — full width */}
        <div style={{ marginTop: "24px" }}>
          {tab === "preview" ? (
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                background: "var(--color-background)",
                overflow: "hidden",
                padding: "24px",
              }}
            >
              {block.render()}
            </div>
          ) : (
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <CodeBlock code={block.code} />
            </div>
          )}
        </div>
      </div>
    </DocsShell>
  )
}
