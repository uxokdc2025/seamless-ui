"use client"

import { useMemo, useState } from "react"
import { Search, ExternalLink, FileText, Palette, Boxes } from "lucide-react"
import catalog from "../data/design-systems.json"

type DSystem = {
  name: string
  source_url: string
  author_or_org: string
  license: string
  has_designmd: boolean
  has_tokens: boolean
  has_css_tailwind_theme: boolean
  compatibility_status: string
  slug: string
}

const systems = catalog.systems as DSystem[]

function Chip({ icon, label, on }: { icon: React.ReactNode; label: string; on: boolean }) {
  if (!on) return null
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        padding: "2px 8px",
        borderRadius: 6,
        border: "1px solid var(--color-border)",
        color: "var(--color-muted-foreground)",
        background: "var(--color-muted)",
      }}
    >
      {icon}
      {label}
    </span>
  )
}

export function DesignSystemsCatalog() {
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return systems
    return systems.filter((s) =>
      (s.name + " " + s.author_or_org + " " + s.license + " " + s.compatibility_status)
        .toLowerCase()
        .includes(t)
    )
  }, [q])

  return (
    <div>
      {/* Search bar */}
      <div style={{ position: "sticky", top: 0, background: "var(--color-background)", paddingBottom: 12, zIndex: 1 }}>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-muted-foreground)" }}
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search design systems, orgs, licenses…"
            style={{
              width: "100%",
              height: 40,
              paddingLeft: 38,
              paddingRight: 12,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              color: "var(--color-foreground)",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "var(--color-muted-foreground)" }}>
          Showing {filtered.length} of {systems.length} systems
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 12,
          marginTop: 8,
        }}
      >
        {filtered.map((s) => (
          <a
            key={s.slug}
            href={s.source_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              border: "1px solid var(--color-border)",
              borderRadius: 12,
              padding: 16,
              textDecoration: "none",
              color: "var(--color-foreground)",
              background: "var(--color-card)",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-foreground)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{s.name}</div>
              <ExternalLink size={14} style={{ color: "var(--color-muted-foreground)", flexShrink: 0, marginTop: 2 }} />
            </div>
            <div style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginTop: 2 }}>{s.author_or_org}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              <span
                style={{
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 6,
                  border: "1px solid var(--color-border)",
                  color: "var(--color-muted-foreground)",
                }}
              >
                {s.license || "License unknown"}
              </span>
              <Chip icon={<FileText size={11} />} label="DESIGN.md" on={s.has_designmd} />
              <Chip icon={<Palette size={11} />} label="tokens" on={s.has_tokens} />
              <Chip icon={<Boxes size={11} />} label="theme" on={s.has_css_tailwind_theme} />
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: 48, textAlign: "center", color: "var(--color-muted-foreground)", fontSize: 14 }}>
          No design systems match “{q}”.
        </div>
      )}
    </div>
  )
}
