"use client"

import * as React from "react"
import { DocsShell } from "../../../components/docs-shell"
import { DataTable, Badge, type DataTableColumn } from "@seamless/ui"
import { Copy, Check } from "lucide-react"

const th: React.CSSProperties = { textAlign: "left", padding: "10px 14px", fontWeight: 600, color: "var(--color-foreground)", whiteSpace: "nowrap" }
const tdCell: React.CSSProperties = { padding: "10px 14px", color: "var(--color-muted-foreground)", verticalAlign: "top" }
const tdMono: React.CSSProperties = { ...tdCell, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)", whiteSpace: "nowrap" }

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      aria-label="Copy code"
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", fontSize: 12, borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-background)", color: "var(--color-muted-foreground)", cursor: "pointer" }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy"}
    </button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, right: 8 }}><CopyButton text={code} /></div>
      <pre style={{ margin: 0, padding: 16, overflowX: "auto", fontSize: 13, lineHeight: 1.6 }}>
        <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--color-foreground)" }}>{code}</code>
      </pre>
    </div>
  )
}

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 320, padding: 24, borderRadius: 8, border: "1px solid var(--color-border)", background: "var(--color-muted)" }}>
      <div style={{ width: "100%", background: "var(--color-background)", borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  )
}

function ExampleSection({ title, description, code, children }: { title: string; description?: string; code: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{title}</h3>
        {description && <p style={{ margin: 0, fontSize: 14, color: "var(--color-muted-foreground)" }}>{description}</p>}
      </div>
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "var(--color-foreground)" }}>{children}</h2>
}

interface Invoice {
  id: string
  invoice: string
  status: "Paid" | "Pending" | "Unpaid"
  method: string
  amount: string
}

const invoices: Invoice[] = [
  { id: "1", invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "2", invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "3", invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "4", invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "5", invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
]

const statusColor: Record<Invoice["status"], "success" | "secondary" | "destructive"> = {
  Paid: "success",
  Pending: "secondary",
  Unpaid: "destructive",
}

const baseColumns: DataTableColumn<Invoice>[] = [
  { id: "invoice", header: "Invoice", accessorKey: "invoice", enableSorting: true },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    enableSorting: true,
    cell: (value: Invoice["status"]) => <Badge variant={statusColor[value]}>{value}</Badge>,
  },
  { id: "method", header: "Method", accessorKey: "method" },
  { id: "amount", header: "Amount", accessorKey: "amount", className: "text-right", headerClassName: "text-right" },
]

function SelectableTable() {
  const [selected, setSelected] = React.useState<Set<number>>(new Set([0, 2]))
  return (
    <DataTable
      data={invoices}
      columns={baseColumns}
      enableSelection
      selectedRows={selected}
      onSelectionChange={setSelected}
    />
  )
}

export default function TablePage() {
  return (
    <DocsShell title="Table">
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: "var(--color-foreground)" }}>Table</h1>
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-muted-foreground)" }}>
            A responsive data table with sorting, selection, density and column visibility, driven by a columns config.
          </p>
        </header>

        <Preview>
          <DataTable data={invoices} columns={baseColumns} />
        </Preview>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Installation</H2>
          <CodeBlock code="pnpm dlx shadcn@latest add @seamless/ui/table" />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>Usage</H2>
          <CodeBlock code={`import { DataTable, type DataTableColumn } from "@seamless/ui"

interface Invoice {
  invoice: string
  status: string
  amount: string
}

const columns: DataTableColumn<Invoice>[] = [
  { id: "invoice", header: "Invoice", accessorKey: "invoice" },
  { id: "status", header: "Status", accessorKey: "status" },
  { id: "amount", header: "Amount", accessorKey: "amount" },
]

export default function Example() {
  return <DataTable data={data} columns={columns} />
}`} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <H2>Examples</H2>

          <ExampleSection
            title="Sortable columns"
            description="Set enableSorting on a column and turn on sorting for the table."
            code={`const columns: DataTableColumn<Invoice>[] = [
  { id: "invoice", header: "Invoice", accessorKey: "invoice", enableSorting: true },
  { id: "status", header: "Status", accessorKey: "status", enableSorting: true },
]

<DataTable data={data} columns={columns} enableSorting />`}
          >
            <DataTable data={invoices} columns={baseColumns} enableSorting />
          </ExampleSection>

          <ExampleSection
            title="Custom cells"
            description="Use a column's cell renderer to format a value — here a status Badge."
            code={`{
  id: "status",
  header: "Status",
  accessorKey: "status",
  cell: (value) => <Badge variant={statusColor[value]}>{value}</Badge>,
}`}
          >
            <DataTable data={invoices} columns={baseColumns} />
          </ExampleSection>

          <ExampleSection
            title="Row selection"
            description="Enable checkboxes and control the selected rows with a Set of indices."
            code={`const [selected, setSelected] = React.useState<Set<number>>(new Set())

<DataTable
  data={data}
  columns={columns}
  enableSelection
  selectedRows={selected}
  onSelectionChange={setSelected}
/>`}
          >
            <SelectableTable />
          </ExampleSection>

          <ExampleSection
            title="Compact density"
            description="Tighten row spacing with the density prop."
            code={`<DataTable data={data} columns={columns} density="compact" />`}
          >
            <DataTable data={invoices} columns={baseColumns} density="compact" />
          </ExampleSection>

          <ExampleSection
            title="Empty state"
            description="Pass an emptyMessage to render when there is no data."
            code={`<DataTable data={[]} columns={columns} emptyMessage="No invoices yet." />`}
          >
            <DataTable data={[]} columns={baseColumns} emptyMessage="No invoices yet." />
          </ExampleSection>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <H2>API Reference</H2>
          <div style={{ borderRadius: 8, border: "1px solid var(--color-border)", overflow: "hidden", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--color-muted)" }}>
                  <th style={th}>Prop</th><th style={th}>Type</th><th style={th}>Default</th><th style={th}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>data</td><td style={tdMono}>T[]</td><td style={tdMono}>—</td><td style={tdCell}>Array of row objects to render.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>columns</td><td style={tdMono}>DataTableColumn&lt;T&gt;[]</td><td style={tdMono}>—</td><td style={tdCell}>Column definitions (header, accessorKey, cell, sorting).</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>enableSorting</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Enables click-to-sort on sortable columns.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>enableSelection</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Adds a checkbox column for row selection.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>selectedRows</td><td style={tdMono}>Set&lt;number&gt;</td><td style={tdMono}>—</td><td style={tdCell}>Controlled set of selected row indices.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>onSelectionChange</td><td style={tdMono}>(selected: Set&lt;number&gt;) =&gt; void</td><td style={tdMono}>—</td><td style={tdCell}>Callback fired when selection changes.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>density</td><td style={tdMono}>&quot;compact&quot; | &quot;default&quot; | &quot;comfortable&quot;</td><td style={tdMono}>&quot;default&quot;</td><td style={tdCell}>Row spacing density.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>stickyHeader</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Keeps the header visible while scrolling.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>emptyMessage</td><td style={tdMono}>string</td><td style={tdMono}>—</td><td style={tdCell}>Message shown when data is empty.</td></tr>
                <tr style={{ borderTop: "1px solid var(--color-border)" }}><td style={tdMono}>loading</td><td style={tdMono}>boolean</td><td style={tdMono}>false</td><td style={tdCell}>Shows a loading state.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
