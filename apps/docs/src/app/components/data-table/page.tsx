"use client"

import { useState } from "react"
import { DocsShell } from "../../../components/docs-shell"
import { DataTable, Badge, type DataTableColumn } from "@seamless/ui"
import { Check, Copy } from "lucide-react"

type Person = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Invited" | "Suspended"
}

const people: Person[] = [
  { id: 1, name: "Olivia Martin", email: "olivia@example.com", role: "Owner", status: "Active" },
  { id: 2, name: "Jackson Lee", email: "jackson@example.com", role: "Admin", status: "Active" },
  { id: 3, name: "Isabella Nguyen", email: "isabella@example.com", role: "Member", status: "Invited" },
  { id: 4, name: "William Kim", email: "will@example.com", role: "Member", status: "Suspended" },
  { id: 5, name: "Sofia Davis", email: "sofia@example.com", role: "Viewer", status: "Active" },
]

const statusColor: Record<Person["status"], "success" | "secondary" | "destructive"> = {
  Active: "success",
  Invited: "secondary",
  Suspended: "destructive",
}

const columns: DataTableColumn<Person>[] = [
  { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
  { id: "email", header: "Email", accessorKey: "email", enableSorting: true },
  { id: "role", header: "Role", accessorKey: "role" },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (value: Person["status"]) => <Badge variant={statusColor[value]}>{value}</Badge>,
  },
]

export default function DataTablePage() {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  return (
    <DocsShell title="Data Table">
      <div style={{ maxWidth: 880 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, margin: 0 }}>Data Table</h1>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 16, marginTop: 8 }}>
          A powerful, responsive table for displaying structured data with sorting, row selection,
          density controls, and a mobile card fallback.
        </p>

        <div style={{ marginTop: 24 }}>
          <PreviewCard>
            <div style={{ width: "100%" }}>
              <DataTable data={people} columns={columns} enableSorting />
            </div>
          </PreviewCard>
        </div>

        <h2 style={h2Style}>Installation</h2>
        <CodeBlock code={`pnpm dlx shadcn@latest add @seamless/ui/data-table`} />

        <h2 style={h2Style}>Usage</h2>
        <CodeBlock
          code={`import { DataTable, type DataTableColumn } from "@seamless/ui"

type Person = { id: number; name: string; email: string }

const columns: DataTableColumn<Person>[] = [
  { id: "name", header: "Name", accessorKey: "name", enableSorting: true },
  { id: "email", header: "Email", accessorKey: "email" },
]

export default function Example() {
  return <DataTable data={people} columns={columns} enableSorting />
}`}
        />

        <h2 style={h2Style}>Anatomy</h2>
        <p style={{ color: "var(--color-muted-foreground)", fontSize: 14, marginTop: 4 }}>
          The table is configured declaratively through a <code style={codeInline}>columns</code> array
          and a <code style={codeInline}>data</code> array — there are no child sub-components to compose.
        </p>
        <CodeBlock
          code={`<DataTable
  data={data}
  columns={[
    { id, header, accessorKey, enableSorting, cell },
  ]}
  enableSorting
  enableSelection
  enablePagination
/>`}
        />

        <h2 style={h2Style}>Examples</h2>

        <Example
          title="With sorting"
          description="Set enableSorting on the table and enableSorting on each sortable column. Click a header to toggle the sort direction."
          preview={
            <div style={{ width: "100%" }}>
              <DataTable data={people} columns={columns} enableSorting />
            </div>
          }
          code={`<DataTable data={people} columns={columns} enableSorting />`}
        />

        <Example
          title="Row selection"
          description="Enable selection to render a checkbox column. Track the selected row indices with controlled state."
          preview={
            <div style={{ width: "100%" }}>
              <DataTable
                data={people}
                columns={columns}
                enableSelection
                selectedRows={selected}
                onSelectionChange={setSelected}
              />
              <p style={{ marginTop: 12, fontSize: 13, color: "var(--color-muted-foreground)" }}>
                {selected.size} row{selected.size === 1 ? "" : "s"} selected
              </p>
            </div>
          }
          code={`const [selected, setSelected] = useState<Set<number>>(new Set())

<DataTable
  data={people}
  columns={columns}
  enableSelection
  selectedRows={selected}
  onSelectionChange={setSelected}
/>`}
        />

        <Example
          title="Compact density"
          description="Use the density prop to trade vertical rhythm for information density."
          preview={
            <div style={{ width: "100%" }}>
              <DataTable data={people} columns={columns} density="compact" />
            </div>
          }
          code={`<DataTable data={people} columns={columns} density="compact" />`}
        />

        <Example
          title="Empty state"
          description="Pass an empty data array and a custom message to render the empty state."
          preview={
            <div style={{ width: "100%" }}>
              <DataTable data={[]} columns={columns} emptyMessage="No team members yet." />
            </div>
          }
          code={`<DataTable data={[]} columns={columns} emptyMessage="No team members yet." />`}
        />

        <h2 style={h2Style}>API Reference</h2>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20 }}>DataTable</h3>
        <PropsTable
          rows={[
            { prop: "data", type: "T[]", description: "Array of row objects to render." },
            { prop: "columns", type: "DataTableColumn<T>[]", description: "Column definitions." },
            { prop: "density", type: '"compact" | "default" | "comfortable"', default: '"default"', description: "Row padding / information density." },
            { prop: "enableSorting", type: "boolean", default: "false", description: "Enable header-click sorting for sortable columns." },
            { prop: "enableSelection", type: "boolean", default: "false", description: "Render a checkbox column for row selection." },
            { prop: "selectedRows", type: "Set<number>", description: "Controlled set of selected row indices." },
            { prop: "onSelectionChange", type: "(selected: Set<number>) => void", description: "Called when the selection changes." },
            { prop: "enablePagination", type: "boolean", default: "false", description: "Enable the pagination footer." },
            { prop: "stickyHeader", type: "boolean", default: "false", description: "Keep the header visible while scrolling." },
            { prop: "emptyMessage", type: "string", description: "Message shown when data is empty." },
            { prop: "loading", type: "boolean", default: "false", description: "Render skeleton rows while loading." },
          ]}
        />
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24 }}>DataTableColumn</h3>
        <PropsTable
          rows={[
            { prop: "id", type: "string", description: "Unique column identifier." },
            { prop: "header", type: "React.ReactNode", description: "Header cell content." },
            { prop: "accessorKey", type: "keyof T", description: "Key used to read the cell value from the row." },
            { prop: "cell", type: "(value, row, index) => ReactNode", description: "Custom cell renderer." },
            { prop: "enableSorting", type: "boolean", default: "false", description: "Allow sorting by this column." },
            { prop: "sticky", type: '"left" | "right" | false', default: "false", description: "Pin the column to an edge." },
          ]}
        />
      </div>
    </DocsShell>
  )
}

/* ------------------------------------------------------------------ */
/* Shared documentation primitives (inline, page-local)               */
/* ------------------------------------------------------------------ */

type PropRow = { prop: string; type: string; default?: string; description: string }

const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 600, marginTop: 48, marginBottom: 4 }
const thStyle: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdStyle: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const codeInline: React.CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, monospace", fontSize: 12, background: "var(--color-muted)", padding: "2px 6px", borderRadius: 4, color: "var(--color-foreground)" }

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
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          padding: 16,
          paddingRight: 84,
          background: "var(--color-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          overflowX: "auto",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace", color: "var(--color-foreground)" }}>
          {code}
        </code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

function PreviewCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 16,
        minHeight: 320,
        padding: 32,
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        background: "var(--color-muted)",
      }}
    >
      {children}
    </div>
  )
}

function Example({
  title,
  description,
  preview,
  code,
}: {
  title: string
  description: string
  preview: React.ReactNode
  code: string
}) {
  return (
    <section style={{ marginTop: 40 }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{title}</h3>
      <p style={{ color: "var(--color-muted-foreground)", fontSize: 14, marginTop: 4, marginBottom: 0 }}>{description}</p>
      <div style={{ marginTop: 16 }}>
        <PreviewCard>{preview}</PreviewCard>
        <CodeBlock code={code} />
      </div>
    </section>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: 8 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--color-muted)" }}>
            <th style={thStyle}>Prop</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Default</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} style={{ borderTop: "1px solid var(--color-border)" }}>
              <td style={tdStyle}><code style={codeInline}>{r.prop}</code></td>
              <td style={tdStyle}><code style={codeInline}>{r.type}</code></td>
              <td style={tdStyle}>{r.default ? <code style={codeInline}>{r.default}</code> : "—"}</td>
              <td style={tdStyle}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
