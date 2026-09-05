"use client"

import { useState } from "react"
import { DocsShell } from "../../components/docs-shell"
import { Input, Button } from "@seamless/ui"

/* ---------- shared primitives ---------- */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section id={id} style={{ scrollMarginTop: "80px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            marginTop: "6px",
            fontSize: "0.9375rem",
            color: "var(--color-muted-foreground)",
            maxWidth: "60ch",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}

const panelStyle: React.CSSProperties = {
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  background: "var(--color-card)",
  padding: "24px",
}

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: "12px",
}

/* ---------- Color ---------- */

type Swatch = {
  name: string
  token: string
  fg?: string
  kind?: "solid" | "border" | "ring"
}

const swatches: Swatch[] = [
  { name: "Background", token: "background", fg: "foreground" },
  { name: "Foreground", token: "foreground", fg: "background" },
  { name: "Card", token: "card", fg: "card-foreground" },
  { name: "Popover", token: "popover", fg: "popover-foreground" },
  { name: "Primary", token: "primary", fg: "primary-foreground" },
  { name: "Secondary", token: "secondary", fg: "secondary-foreground" },
  { name: "Muted", token: "muted", fg: "muted-foreground" },
  { name: "Accent", token: "accent", fg: "accent-foreground" },
  { name: "Destructive", token: "destructive", fg: "destructive-foreground" },
  { name: "Border", token: "border", kind: "border" },
  { name: "Input", token: "input", kind: "border" },
  { name: "Ring", token: "ring", kind: "ring" },
]

function ColorChip({ s }: { s: Swatch }) {
  const cssVar = `var(--color-${s.token})`
  let preview: React.ReactNode
  if (s.kind === "border") {
    preview = (
      <div
        style={{
          height: "72px",
          borderRadius: "10px",
          background: "var(--color-background)",
          border: `3px solid ${cssVar}`,
        }}
      />
    )
  } else if (s.kind === "ring") {
    preview = (
      <div
        style={{
          height: "72px",
          borderRadius: "10px",
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          outline: `3px solid ${cssVar}`,
          outlineOffset: "2px",
          margin: "3px",
        }}
      />
    )
  } else {
    preview = (
      <div
        style={{
          height: "72px",
          borderRadius: "10px",
          background: cssVar,
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: s.fg ? `var(--color-${s.fg})` : "var(--color-foreground)",
          fontWeight: 600,
          fontSize: "15px",
        }}
      >
        Aa
      </div>
    )
  }
  return (
    <div>
      {preview}
      <div style={{ marginTop: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500 }}>{s.name}</div>
        <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginTop: "2px" }}>
          --color-{s.token}
        </div>
      </div>
    </div>
  )
}

/* ---------- Typography ---------- */

type Type = {
  name: string
  size: string
  px: string
  weight: number
  lh: string
  mono?: boolean
}

const typeScale: Type[] = [
  { name: "Display", size: "3.75rem", px: "60px", weight: 700, lh: "1.05" },
  { name: "Heading 1", size: "3rem", px: "48px", weight: 700, lh: "1.1" },
  { name: "Heading 2", size: "2.25rem", px: "36px", weight: 700, lh: "1.15" },
  { name: "Heading 3", size: "1.875rem", px: "30px", weight: 600, lh: "1.2" },
  { name: "Heading 4", size: "1.5rem", px: "24px", weight: 600, lh: "1.25" },
  { name: "Heading 5", size: "1.25rem", px: "20px", weight: 600, lh: "1.3" },
  { name: "Heading 6", size: "1.125rem", px: "18px", weight: 600, lh: "1.4" },
  { name: "Body", size: "1rem", px: "16px", weight: 400, lh: "1.5" },
  { name: "Small", size: "0.875rem", px: "14px", weight: 400, lh: "1.5" },
  { name: "Caption", size: "0.75rem", px: "12px", weight: 400, lh: "1.5" },
  { name: "Mono", size: "0.875rem", px: "14px", weight: 400, lh: "1.6", mono: true },
]

/* ---------- Spacing / Radius / Shadow / Border ---------- */

const spacing = [
  { token: "space-1", value: "0.25rem", px: "4px" },
  { token: "space-2", value: "0.5rem", px: "8px" },
  { token: "space-3", value: "0.75rem", px: "12px" },
  { token: "space-4", value: "1rem", px: "16px" },
  { token: "space-5", value: "1.25rem", px: "20px" },
  { token: "space-6", value: "1.5rem", px: "24px" },
  { token: "space-8", value: "2rem", px: "32px" },
  { token: "space-10", value: "2.5rem", px: "40px" },
  { token: "space-12", value: "3rem", px: "48px" },
  { token: "space-16", value: "4rem", px: "64px" },
  { token: "space-20", value: "5rem", px: "80px" },
  { token: "space-24", value: "6rem", px: "96px" },
]

const radii = [
  { token: "radius-sm", value: "2px" },
  { token: "radius-base", value: "4px" },
  { token: "radius-md", value: "6px" },
  { token: "radius-lg", value: "8px" },
  { token: "radius-xl", value: "12px" },
  { token: "radius-2xl", value: "16px" },
  { token: "radius-3xl", value: "24px" },
  { token: "radius-full", value: "9999px" },
]

const shadows = [
  { token: "shadow-xs", label: "Extra small" },
  { token: "shadow-sm", label: "Small" },
  { token: "shadow-base", label: "Base" },
  { token: "shadow-md", label: "Medium" },
  { token: "shadow-lg", label: "Large" },
  { token: "shadow-xl", label: "Extra large" },
]

const borderWidths = [
  { token: "border-width-1", value: "1px" },
  { token: "border-width-2", value: "2px" },
  { token: "border-width-4", value: "4px" },
  { token: "border-width-8", value: "8px" },
]

const durations = [
  { token: "duration-fast", value: "100ms" },
  { token: "duration-normal", value: "200ms" },
  { token: "duration-slow", value: "300ms" },
  { token: "duration-slower", value: "500ms" },
]

const easings = [
  { token: "ease-linear", value: "linear" },
  { token: "ease-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { token: "ease-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { token: "ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { token: "ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
]

const zIndex = [
  { token: "z-dropdown", value: "1000" },
  { token: "z-sticky", value: "1100" },
  { token: "z-fixed", value: "1200" },
  { token: "z-modal-backdrop", value: "1300" },
  { token: "z-modal", value: "1400" },
  { token: "z-popover", value: "1500" },
  { token: "z-tooltip", value: "1600" },
  { token: "z-toast", value: "1700" },
]

function MotionBox({ token, value }: { token: string; value: string }) {
  const [on, setOn] = useState(false)
  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "16px",
        background: "var(--color-card)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: "40px",
          borderRadius: "8px",
          background: "color-mix(in srgb, var(--color-muted) 60%, transparent)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "var(--color-primary)",
            transform: on ? "translateX(calc(100% + 160px))" : "translateX(0)",
            transitionProperty: "transform",
            transitionDuration: `var(--${token})`,
            transitionTimingFunction: "var(--ease-out)",
          }}
        />
      </div>
      <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: 500 }}>{value}</div>
      <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginTop: "2px" }}>
        --{token}
      </div>
    </div>
  )
}

function EasingBox({ token, value }: { token: string; value: string }) {
  const [on, setOn] = useState(false)
  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "16px",
        background: "var(--color-card)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: "40px",
          borderRadius: "8px",
          background: "color-mix(in srgb, var(--color-muted) 60%, transparent)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "var(--color-primary)",
            transform: on ? "translateX(calc(100% + 160px))" : "translateX(0)",
            transitionProperty: "transform",
            transitionDuration: "600ms",
            transitionTimingFunction: `var(--${token})`,
          }}
        />
      </div>
      <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: 500 }}>{token.replace("ease-", "")}</div>
      <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginTop: "2px" }}>{value}</div>
    </div>
  )
}

export default function FoundationsPage() {
  return (
    <DocsShell title="Foundations">
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
            Foundations
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
            Design tokens
          </h1>
          <p
            style={{
              marginTop: "12px",
              fontSize: "1.0625rem",
              color: "var(--color-muted-foreground)",
              maxWidth: "62ch",
              lineHeight: 1.6,
            }}
          >
            The primitives every Seamless UI component is built from — color, type, space, radius,
            elevation, motion, and layering. Each specimen below is rendered live from the same
            <code style={{ ...monoStyle, margin: "0 4px", padding: "2px 6px", background: "var(--color-muted)", borderRadius: "4px" }}>
              var(--color-*)
            </code>
            and scale tokens the library ships with, so this page always reflects the active theme.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          {/* COLOR */}
          <Section
            id="color"
            title="Color"
            description="Semantic color tokens map intent (primary, muted, destructive) to concrete values per theme. Compose interfaces from these — never from raw hex — so a theme swap re-skins the whole surface."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "20px",
              }}
            >
              {swatches.map((s) => (
                <ColorChip key={s.token} s={s} />
              ))}
            </div>
          </Section>

          {/* TYPOGRAPHY */}
          <Section
            id="typography"
            title="Typography"
            description="The type scale is set in Geist. Sizes step on a modular scale; headings tighten line-height and letter-spacing while body text stays at 1.5 for readability."
          >
            <div style={panelStyle}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {typeScale.map((t, i) => (
                  <div
                    key={t.name}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "140px 1fr",
                      gap: "24px",
                      alignItems: "baseline",
                      padding: "18px 0",
                      borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600 }}>{t.name}</div>
                      <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginTop: "4px", lineHeight: 1.5 }}>
                        {t.px} · {t.weight}
                        <br />
                        lh {t.lh}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: t.size,
                        fontWeight: t.weight,
                        lineHeight: t.lh,
                        letterSpacing: t.weight >= 600 ? "-0.02em" : "normal",
                        fontFamily: t.mono
                          ? "var(--font-geist-mono), ui-monospace, monospace"
                          : "inherit",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.mono ? "const seamless = true" : "The quick brown fox"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* SPACING */}
          <Section
            id="spacing"
            title="Spacing"
            description="An 8-point-derived scale drives padding, gaps, and layout rhythm. Bars below are drawn at each token's real width."
          >
            <div style={panelStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {spacing.map((s) => (
                  <div key={s.token} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <code style={{ ...monoStyle, width: "96px", color: "var(--color-muted-foreground)", flexShrink: 0 }}>
                      {s.token}
                    </code>
                    <div
                      style={{
                        height: "16px",
                        width: s.value,
                        background: "var(--color-primary)",
                        borderRadius: "3px",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>{s.px}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* RADIUS */}
          <Section
            id="radius"
            title="Radius"
            description="Corner radii from subtle to fully rounded. Cards and popovers default to the large end; pills and avatars use full."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "20px",
              }}
            >
              {radii.map((r) => (
                <div key={r.token}>
                  <div
                    style={{
                      height: "80px",
                      background: "color-mix(in srgb, var(--color-primary) 12%, var(--color-card))",
                      border: "1px solid var(--color-border)",
                      borderRadius: `var(--${r.token})`,
                    }}
                  />
                  <div style={{ marginTop: "10px", ...monoStyle }}>--{r.token}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "2px" }}>
                    {r.value}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ELEVATION */}
          <Section
            id="elevation"
            title="Elevation & shadows"
            description="Shadows communicate stacking depth — from a hairline lift on cards to the deep drop of a modal. Use sparingly and consistently."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "28px",
                padding: "20px 8px",
              }}
            >
              {shadows.map((s) => (
                <div key={s.token} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      height: "88px",
                      background: "var(--color-card)",
                      borderRadius: "12px",
                      boxShadow: `var(--${s.token})`,
                      border: "1px solid var(--color-border)",
                    }}
                  />
                  <div style={{ marginTop: "14px", fontSize: "13px", fontWeight: 500 }}>{s.label}</div>
                  <div style={{ ...monoStyle, color: "var(--color-muted-foreground)", marginTop: "2px" }}>
                    --{s.token}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* BORDER WIDTHS */}
          <Section
            id="border-widths"
            title="Border widths"
            description="Stroke weights for dividers, inputs, and emphasis. Most surfaces use a single hairline; heavier weights signal focus or state."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "20px",
              }}
            >
              {borderWidths.map((b) => (
                <div key={b.token}>
                  <div
                    style={{
                      height: "80px",
                      background: "var(--color-card)",
                      borderRadius: "10px",
                      border: `var(--${b.token}) solid var(--color-foreground)`,
                    }}
                  />
                  <div style={{ marginTop: "10px", ...monoStyle }}>--{b.token}</div>
                  <div style={{ fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "2px" }}>
                    {b.value}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* MOTION */}
          <Section
            id="motion"
            title="Motion"
            description="Duration and easing tokens keep transitions coherent. Hover any tile to play it. Motion respects the user's reduced-motion preference automatically."
          >
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, margin: "0 0 12px" }}>Duration</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {durations.map((d) => (
                <MotionBox key={d.token} token={d.token} value={d.value} />
              ))}
            </div>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, margin: "0 0 12px" }}>Easing</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              {easings.map((e) => (
                <EasingBox key={e.token} token={e.token} value={e.value} />
              ))}
            </div>
          </Section>

          {/* Z-INDEX */}
          <Section
            id="z-index"
            title="Z-index"
            description="A named layering scale keeps overlays predictable: dropdowns sit below modals, modals below popovers, toasts on top of everything."
          >
            <div style={panelStyle}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {zIndex.map((z, i) => (
                  <div
                    key={z.token}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: `color-mix(in srgb, var(--color-primary) ${4 + i * 3}%, var(--color-card))`,
                      border: "1px solid var(--color-border)",
                      marginLeft: `${i * 14}px`,
                    }}
                  >
                    <code style={{ ...monoStyle, flex: 1 }}>--{z.token}</code>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-muted-foreground)" }}>
                      {z.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* FOCUS RING */}
          <Section
            id="focus-ring"
            title="Focus ring"
            description="Keyboard focus is always visible: a 2px ring in the --color-ring token with a 2px offset. Tab into the controls below to see it, or click to focus."
          >
            <div style={{ ...panelStyle, display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center" }}>
              <div style={{ maxWidth: "260px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                  Focusable input
                </label>
                <Input placeholder="Tab or click to focus" />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                  Focusable button
                </label>
                <Button variant="outline">Focus me</Button>
              </div>
              <div
                style={{
                  ...monoStyle,
                  color: "var(--color-muted-foreground)",
                  lineHeight: 1.7,
                  paddingLeft: "8px",
                  borderLeft: "1px solid var(--color-border)",
                }}
              >
                outline: 2px solid var(--color-ring)
                <br />
                outline-offset: 2px
              </div>
            </div>
          </Section>
        </div>
      </div>
    </DocsShell>
  )
}
