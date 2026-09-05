"use client"

import { DocsShell } from "../../components/docs-shell"
import { DesignSystemsCatalog } from "../../components/design-systems-catalog"
import { Badge, Button } from "@seamless/ui"
import { FileText, Braces, Palette, Download, Upload, ArrowRight, Check } from "lucide-react"

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: "13px",
}

const panelStyle: React.CSSProperties = {
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  background: "var(--color-card)",
  padding: "24px",
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} style={{ scrollMarginTop: "80px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
          {title}
        </h2>
        {description && (
          <p
            style={{
              marginTop: "6px",
              fontSize: "0.9375rem",
              color: "var(--color-muted-foreground)",
              maxWidth: "62ch",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: "18px 20px",
        background: "color-mix(in srgb, var(--color-muted) 45%, transparent)",
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        overflowX: "auto",
        ...monoStyle,
        lineHeight: 1.65,
      }}
    >
      <code>{children}</code>
    </pre>
  )
}

/* ---------- Real capabilities ---------- */

const formats: { name: string; ext: string; desc: string; icon: React.ReactNode }[] = [
  { name: "DESIGN.md", ext: ".md", desc: "Human-readable markdown spec — the portable source of truth.", icon: <FileText style={{ width: 18, height: 18 }} /> },
  { name: "DTCG Tokens", ext: ".json", desc: "Design Tokens Community Group format for interchange.", icon: <Braces style={{ width: 18, height: 18 }} /> },
  { name: "CSS Variables", ext: ".css", desc: "Custom properties applied directly to :root and themes.", icon: <Palette style={{ width: 18, height: 18 }} /> },
  { name: "Tailwind Config", ext: ".ts", desc: "A theme extension for Tailwind-based projects.", icon: <Braces style={{ width: 18, height: 18 }} /> },
]

/* ---------- Catalog (curated from the Seamless Design Systems catalog) ---------- */

type CatalogEntry = {
  name: string
  org: string
  license: string
  status: "active" | "unknown"
  designmd?: boolean
  tokens?: boolean
  css?: boolean
}

const catalog: CatalogEntry[] = [
  { name: "shadcn/ui", org: "shadcn", license: "MIT", status: "active", tokens: true, css: true },
  { name: "Material Design", org: "Google", license: "Apache-2.0", status: "active", tokens: true },
  { name: "Carbon Design System", org: "IBM", license: "Apache-2.0", status: "active", tokens: true },
  { name: "Atlassian Design System", org: "Atlassian", license: "Apache-2.0", status: "active", tokens: true },
  { name: "Fluent UI", org: "Microsoft", license: "MIT", status: "active", tokens: true },
  { name: "Ant Design", org: "Ant Group", license: "MIT", status: "active", tokens: true },
  { name: "Chakra UI", org: "chakra-ui", license: "MIT", status: "active", tokens: true },
  { name: "Semi Design", org: "Douyin (ByteDance)", license: "MIT", status: "unknown", tokens: true },
  { name: "design.md", org: "Google Labs", license: "Apache-2.0", status: "active", designmd: true },
]

function FlagBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "11px",
        fontWeight: 500,
        padding: "2px 7px",
        borderRadius: "9999px",
        border: "1px solid var(--color-border)",
        color: "var(--color-muted-foreground)",
      }}
    >
      {children}
    </span>
  )
}

function CatalogCard({ e }: { e: CatalogEntry }) {
  const initials = e.name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        background: "var(--color-card)",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "color-mix(in srgb, var(--color-primary) 12%, var(--color-card))",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: "14px", fontWeight: 600 }}>{e.name}</div>
          <div style={{ fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "1px" }}>
            {e.org}
          </div>
        </div>
        {e.status === "active" ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="outline">Review</Badge>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        <FlagBadge>{e.license}</FlagBadge>
        {e.designmd && (
          <FlagBadge>
            <FileText style={{ width: 11, height: 11 }} /> DESIGN.md
          </FlagBadge>
        )}
        {e.tokens && (
          <FlagBadge>
            <Braces style={{ width: 11, height: 11 }} /> Tokens
          </FlagBadge>
        )}
        {e.css && (
          <FlagBadge>
            <Palette style={{ width: 11, height: 11 }} /> CSS
          </FlagBadge>
        )}
      </div>
    </div>
  )
}

export default function DesignSystemsPage() {
  return (
    <DocsShell title="Design Systems">
      <div style={{ maxWidth: "980px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-muted-foreground)",
              marginBottom: "12px",
            }}
          >
            Design Systems
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
            Import a design system
          </h1>
          <p
            style={{
              marginTop: "12px",
              fontSize: "1.0625rem",
              color: "var(--color-muted-foreground)",
              maxWidth: "64ch",
              lineHeight: 1.6,
            }}
          >
            Seamless UI reads and writes the portable{" "}
            <code style={{ ...monoStyle, padding: "2px 6px", background: "var(--color-muted)", borderRadius: "4px" }}>
              DESIGN.md
            </code>{" "}
            format. Point it at a system's tokens and Seamless maps them onto its semantic{" "}
            <code style={{ ...monoStyle, padding: "2px 6px", background: "var(--color-muted)", borderRadius: "4px" }}>
              var(--color-*)
            </code>{" "}
            layer — so every component in this library re-skins to match, with no component changes.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          {/* HOW IT WORKS */}
          <Section
            id="how-it-works"
            title="How it works"
            description="Three steps take an external system's tokens to a live Seamless theme."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                { n: "01", t: "Read", d: "Parse a DESIGN.md, DTCG token file, CSS variables, or Tailwind config." },
                { n: "02", t: "Map", d: "Match source roles to Seamless semantic tokens — primary, muted, destructive, and the rest." },
                { n: "03", t: "Apply", d: "Emit a theme block. The whole component library adopts it instantly." },
              ].map((s) => (
                <div key={s.n} style={panelStyle}>
                  <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginBottom: "8px" }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>{s.t}</div>
                  <div style={{ fontSize: "13px", color: "var(--color-muted-foreground)", lineHeight: 1.55 }}>
                    {s.d}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* DESIGN.md FORMAT */}
          <Section
            id="design-md-format"
            title="The DESIGN.md format"
            description="A single markdown file describes a system's tokens in plain, reviewable text. It is diffable, portable, and readable without tooling."
          >
            <Code>{`# Acme Design System

## Colors
- Background: #ffffff
- Foreground: #09090b
- Primary: #2563eb
- Primary Foreground: #ffffff
- Muted: #f4f4f5
- Destructive: #ef4444
- Border: #e4e4e7

## Typography
- Font Family: Geist, system-ui
- Base Size: 16px
- Scale: 1.25 (major third)

## Spacing
- Base: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48

## Radius
- Default: 8px`}</Code>
          </Section>

          {/* IMPORT / EXPORT */}
          <Section
            id="import-export"
            title="Import & export"
            description="Bring a system in, or emit the current Seamless theme back out in any supported format."
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Upload style={{ width: 15, height: 15, color: "var(--color-muted-foreground)" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>Import from DESIGN.md</span>
                </div>
                <Code>{`import { importDesignMd, applyTokens } from "@seamless/design-system"

const tokens = await importDesignMd("./DESIGN.md")
applyTokens(tokens) // maps to var(--color-*) and applies`}</Code>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Download style={{ width: 15, height: 15, color: "var(--color-muted-foreground)" }} />
                  <span style={{ fontSize: "14px", fontWeight: 600 }}>Export to any format</span>
                </div>
                <Code>{`import { exportToCss, exportToTailwind, exportToDtcg } from "@seamless/design-system"

const css = exportToCss(tokens)            // :root { --color-*: ... }
const twConfig = exportToTailwind(tokens)  // theme.extend
const dtcg = exportToDtcg(tokens)          // DTCG JSON`}</Code>
              </div>
            </div>
          </Section>

          {/* FORMATS */}
          <Section id="supported-formats" title="Supported formats">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "16px",
              }}
            >
              {formats.map((f) => (
                <div key={f.name} style={{ ...panelStyle, display: "flex", gap: "14px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "color-mix(in srgb, var(--color-primary) 12%, var(--color-card))",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>{f.name}</span>
                      <span style={{ ...monoStyle, fontSize: "12px", color: "var(--color-muted-foreground)" }}>
                        {f.ext}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--color-muted-foreground)", marginTop: "3px", lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* CATALOG */}
          <Section
            id="catalog"
            title="Catalog"
            description="The Seamless Design Systems catalog indexes public design systems and their tokens, maintained automatically by the Research Scout. Search the full set below — filter by name, org, or license."
          >
            <DesignSystemsCatalog />
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                fontSize: "13px",
                color: "var(--color-muted-foreground)",
              }}
            >
              <Check style={{ width: 14, height: 14 }} />
              Only systems whose licenses permit redistribution include downloadable tokens; others are
              indexed by metadata and flagged for review.
            </div>
            <div style={{ marginTop: "20px" }}>
              <a
                href="https://github.com/seamless-ui/design-systems"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  Browse the full catalog
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </Button>
              </a>
            </div>
          </Section>
        </div>
      </div>
    </DocsShell>
  )
}
