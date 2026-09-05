"use client"

import { useState } from "react"
import Link from "next/link"
import { DocsShell } from "../../components/docs-shell"
import { ArrowRight, Eye, Code2 } from "lucide-react"
import {
  blocks,
  categoryTabs,
  installCommand,
  BlockPreviewFrame,
  CodeBlock,
  CopyButton,
  type BlockCategory,
  type BlockEntry,
} from "./blocks-registry"

function InstallRow({ slug }: { slug: string }) {
  const cmd = installCommand(slug)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        background: "var(--color-muted)",
        padding: "6px 6px 6px 12px",
      }}
    >
      <code
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: "12.5px",
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
  )
}

function BlockCard({ block }: { block: BlockEntry }) {
  const [tab, setTab] = useState<"preview" | "code">("preview")

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Header row: name + description + toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Link
            href={`/blocks/${block.slug}`}
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--color-foreground)",
            }}
          >
            {block.name}
          </Link>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-muted-foreground)",
              marginTop: "2px",
              lineHeight: 1.5,
            }}
          >
            {block.description}
          </p>
        </div>

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
            const active = tab === t
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
                  padding: "5px 12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  background: active ? "var(--color-muted)" : "transparent",
                  color: active
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
      <InstallRow slug={block.slug} />

      {/* Preview / Code */}
      {tab === "preview" ? (
        <BlockPreviewFrame designWidth={block.designWidth}>
          {block.render()}
        </BlockPreviewFrame>
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

      <div>
        <Link
          href={`/blocks/${block.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--color-muted-foreground)",
          }}
        >
          View block <ArrowRight style={{ width: "14px", height: "14px" }} />
        </Link>
      </div>
    </div>
  )
}

export default function BlocksPage() {
  const [active, setActive] = useState<BlockCategory>("Featured")

  const visible = blocks.filter((b) => b.categories.includes(active))

  return (
    <DocsShell title="Blocks">
      <div style={{ maxWidth: "1100px" }}>
        {/* Heading */}
        <div style={{ marginBottom: "8px" }}>
          <h1 style={{ fontSize: "34px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Blocks
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "var(--color-muted-foreground)",
              marginTop: "8px",
              maxWidth: "640px",
              lineHeight: 1.6,
            }}
          >
            Production-ready, copy-and-paste compositions built from Seamless UI
            components. Preview each block live, grab the install command, and drop
            it into your app.
          </p>
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexWrap: "wrap",
            borderBottom: "1px solid var(--color-border)",
            marginTop: "28px",
            marginBottom: "8px",
          }}
        >
          {categoryTabs.map((cat) => {
            const isActive = active === cat
            const count = blocks.filter((b) => b.categories.includes(cat)).length
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: isActive
                    ? "var(--color-foreground)"
                    : "var(--color-muted-foreground)",
                  borderBottom: isActive
                    ? "2px solid var(--color-primary)"
                    : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                {cat}
                <span
                  style={{
                    marginLeft: "6px",
                    fontSize: "12px",
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Browse all label */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginTop: "28px",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "15px", fontWeight: 600 }}>
            {active === "Featured" ? "Featured blocks" : `${active} blocks`}
          </h2>
          <span
            style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}
          >
            Browse all {blocks.length} blocks
          </span>
        </div>

        {/* Blocks list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {visible.map((block) => (
            <BlockCard key={block.slug} block={block} />
          ))}
        </div>
      </div>
    </DocsShell>
  )
}
