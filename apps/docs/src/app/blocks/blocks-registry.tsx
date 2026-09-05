"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Badge, Button } from "@seamless/ui"
import { Copy, Check } from "lucide-react"
import {
  Dashboard01,
  Settings01,
  DataTable01,
  Kanban01,
  Inbox01,
  AgentChat01,
  AgentRun01,
  MissionControl01,
  FleetHealth01,
  Analytics01,
} from "@seamless/blocks"

const noop = () => {}

/* ------------------------------------------------------------------ *
 * Shared preview + code UI primitives
 * ------------------------------------------------------------------ */

const codeBlockStyle: React.CSSProperties = {
  margin: 0,
  padding: "16px",
  paddingRight: "48px",
  background: "var(--color-muted)",
  borderRadius: "8px",
  fontSize: "13px",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  overflowX: "auto",
  lineHeight: 1.6,
  color: "var(--color-foreground)",
  whiteSpace: "pre",
}

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        navigator.clipboard?.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      style={{
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
        flexShrink: 0,
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

export function CodeBlock({ code }: { code: string }) {
  return (
    <div style={{ position: "relative", marginTop: "12px" }}>
      <pre style={codeBlockStyle}>
        <code>{code}</code>
      </pre>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <CopyButton text={code} label="Copy code" />
      </div>
    </div>
  )
}

/**
 * Renders a live block, scaled down to fit its container width so the whole
 * composition is visible inside a framed preview card (shadcn /blocks style).
 */
export function BlockPreviewFrame({
  children,
  designWidth = 1200,
  previewHeight = 380,
  padded = true,
}: {
  children: React.ReactNode
  designWidth?: number
  previewHeight?: number
  padded?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.4)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      if (w > 0) setScale(Math.min(1, w / designWidth))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [designWidth])

  return (
    <div
      ref={ref}
      data-toc-ignore
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        background: "var(--color-background)",
        height: `${previewHeight}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${designWidth}px`,
          height: `${previewHeight / scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          padding: padded ? "24px" : 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Sample data + live renders for each block
 * ------------------------------------------------------------------ */

function DashboardPreview() {
  return (
    <Dashboard01
      title="Dashboard"
      stats={[
        { label: "Total Revenue", value: "$45,231", change: "+20.1% from last month" },
        { label: "Active Agents", value: 24, change: "+3 since last week" },
        { label: "Tasks Completed", value: "1,203", change: "+18.4% this month" },
        { label: "Avg. Response", value: "1.2s", change: "-0.3s improvement" },
      ]}
      actions={[{ label: "Download", onClick: noop }]}
    />
  )
}

function SettingsPreview() {
  return (
    <Settings01
      title="Settings"
      sections={[
        {
          id: "profile",
          label: "Profile",
          description: "Update your personal information.",
          fields: [
            { id: "name", label: "Full Name", type: "text", value: "David Cervantes" },
            { id: "email", label: "Email", type: "text", value: "david@seamless.os" },
          ],
        },
        {
          id: "notifications",
          label: "Notifications",
          description: "Choose what you want to hear about.",
          fields: [
            { id: "email-notif", label: "Email notifications", type: "toggle", value: true },
            { id: "push-notif", label: "Push notifications", type: "toggle", value: false },
          ],
        },
      ]}
      onSave={noop}
      onCancel={noop}
    />
  )
}

function DataTablePreview() {
  return (
    <DataTable01
      title="Team Members"
      searchable
      onSearch={noop}
      columns={[
        { id: "name", header: "Name", accessor: "name", sortable: true },
        { id: "email", header: "Email", accessor: "email" },
        { id: "role", header: "Role", accessor: "role" },
        {
          id: "status",
          header: "Status",
          accessor: (row: any) => (
            <Badge variant={row.status === "Active" ? "secondary" : "outline"}>
              {row.status}
            </Badge>
          ),
        },
      ]}
      data={[
        { name: "Ana Ruiz", email: "ana@seamless.os", role: "Admin", status: "Active" },
        { name: "Marcus Lee", email: "marcus@seamless.os", role: "Engineer", status: "Active" },
        { name: "Priya Patel", email: "priya@seamless.os", role: "Designer", status: "Invited" },
        { name: "Tom Nguyen", email: "tom@seamless.os", role: "Engineer", status: "Active" },
        { name: "Sara Kim", email: "sara@seamless.os", role: "Analyst", status: "Invited" },
      ]}
      pagination={{ page: 1, pageSize: 5, total: 24, onPageChange: noop }}
      actions={[{ label: "Add member", onClick: noop }]}
    />
  )
}

function KanbanPreview() {
  return (
    <Kanban01
      title="Sprint Board"
      actions={[{ label: "New task", onClick: noop }]}
      columns={[
        {
          id: "todo",
          title: "To Do",
          items: [
            { id: "1", title: "Design onboarding flow", description: "Wireframe the 3-step signup", assignee: "Ana", priority: "high", tags: ["design"] },
            { id: "2", title: "Audit API rate limits", assignee: "Marcus", priority: "medium", tags: ["backend"] },
          ],
        },
        {
          id: "progress",
          title: "In Progress",
          items: [
            { id: "3", title: "Build blocks gallery", description: "Live previews for 10 blocks", assignee: "Priya", priority: "high", tags: ["frontend"] },
          ],
        },
        {
          id: "done",
          title: "Done",
          items: [
            { id: "4", title: "Ship theme studio", assignee: "Tom", priority: "low", tags: ["frontend"] },
          ],
        },
      ]}
    />
  )
}

function InboxPreview() {
  const items = [
    { id: "1", from: "Vercel", subject: "Deployment succeeded", preview: "Your project seamless-ui deployed to production.", date: "9:41 AM", read: false, starred: true, labels: ["infra"] },
    { id: "2", from: "Ana Ruiz", subject: "Design review notes", preview: "Left a few comments on the blocks page.", date: "8:12 AM", read: false, labels: ["design"] },
    { id: "3", from: "GitHub", subject: "New pull request #128", preview: "feat: live block previews for /blocks.", date: "Yesterday", read: true, labels: ["code"] },
    { id: "4", from: "Marcus Lee", subject: "Re: API limits", preview: "Bumped the ceiling to 5k req/min.", date: "Yesterday", read: true },
  ]
  return (
    <Inbox01
      title="Inbox"
      items={items}
      selectedItem={items[0]}
      onItemSelect={noop}
      onItemCheck={noop}
      onSearch={noop}
      actions={[{ label: "Compose", onClick: noop }]}
    />
  )
}

function AgentChatPreview() {
  return (
    <AgentChat01
      title="Agent Chat"
      agentName="Seamless Assistant"
      agentStatus="online"
      messages={[
        { id: "1", role: "user", content: "Summarize today's fleet activity.", timestamp: "9:40 AM" },
        { id: "2", role: "assistant", content: "24 agents ran 1,203 tasks today with a 98.6% success rate. Average response time improved to 1.2s.", timestamp: "9:40 AM" },
        { id: "3", role: "user", content: "Any failures worth reviewing?", timestamp: "9:41 AM" },
        { id: "4", role: "assistant", content: "Two tasks failed on the billing worker — both retried and succeeded. No action needed.", timestamp: "9:41 AM" },
      ]}
      suggestions={["Show failed runs", "Restart idle agents", "Export report"]}
      onSendMessage={noop}
    />
  )
}

function AgentRunPreview() {
  const runs = [
    { id: "1", agentName: "Research Agent", task: "Summarize competitor pricing", status: "running" as const, progress: 62, startTime: "9:38 AM", logs: ["Fetching sources…", "Parsing 12 pages", "Drafting summary"] },
    { id: "2", agentName: "QA Agent", task: "Run accessibility audit", status: "completed" as const, progress: 100, startTime: "9:20 AM", endTime: "9:24 AM", logs: ["axe scan passed", "0 violations"] },
    { id: "3", agentName: "Deploy Agent", task: "Ship blocks page", status: "pending" as const, startTime: "—" },
    { id: "4", agentName: "Billing Agent", task: "Reconcile invoices", status: "failed" as const, progress: 40, startTime: "8:55 AM", endTime: "8:57 AM", logs: ["Timeout on gateway", "Retry scheduled"] },
  ]
  return (
    <AgentRun01
      title="Agent Runs"
      runs={runs}
      selectedRun={runs[0]}
      onRunSelect={noop}
      onCancel={noop}
      onRetry={noop}
      actions={[{ label: "New run", onClick: noop }]}
    />
  )
}

function MissionControlPreview() {
  return (
    <MissionControl01
      title="Mission Control"
      metrics={[
        { label: "Active Tasks", value: 18, change: "+4", status: "positive" },
        { label: "Success Rate", value: "98.6%", change: "+0.4%", status: "positive" },
        { label: "Queue Depth", value: 7, change: "-3", status: "positive" },
        { label: "Errors (24h)", value: 2, change: "+1", status: "negative" },
      ]}
      tasks={[
        { id: "1", name: "Summarize competitor pricing", status: "active", agent: "Research Agent", priority: "high" },
        { id: "2", name: "Run accessibility audit", status: "completed", agent: "QA Agent", priority: "medium" },
        { id: "3", name: "Reconcile invoices", status: "failed", agent: "Billing Agent", priority: "critical" },
        { id: "4", name: "Warm cache", status: "queued", agent: "Infra Agent", priority: "low" },
      ]}
      alerts={[
        { id: "1", message: "Billing agent retry scheduled", severity: "warning" },
        { id: "2", message: "New model version available", severity: "info" },
      ]}
      onTaskClick={noop}
      actions={[{ label: "Deploy agent", onClick: noop }]}
    />
  )
}

function FleetHealthPreview() {
  return (
    <FleetHealth01
      title="Fleet Health"
      summary={{ total: 24, online: 21, offline: 2, errors: 1 }}
      agents={[
        { id: "1", name: "Research Agent", status: "online", uptime: "12d 4h", tasksCompleted: 342, cpuUsage: 34, memoryUsage: 58, lastActivity: "2m ago" },
        { id: "2", name: "QA Agent", status: "online", uptime: "12d 4h", tasksCompleted: 511, cpuUsage: 21, memoryUsage: 41, lastActivity: "1m ago" },
        { id: "3", name: "Billing Agent", status: "error", uptime: "0d 2h", tasksCompleted: 88, cpuUsage: 77, memoryUsage: 82, lastActivity: "just now" },
        { id: "4", name: "Infra Agent", status: "idle", uptime: "8d 1h", tasksCompleted: 129, cpuUsage: 5, memoryUsage: 30, lastActivity: "15m ago" },
        { id: "5", name: "Deploy Agent", status: "offline", uptime: "—", tasksCompleted: 64, cpuUsage: 0, memoryUsage: 0, lastActivity: "1h ago" },
      ]}
      onAgentClick={noop}
      actions={[{ label: "Restart all", onClick: noop }]}
    />
  )
}

function AnalyticsPreview() {
  return (
    <Analytics01
      title="Analytics"
      metrics={[
        { label: "Page Views", value: "128.4k", change: "+12.3%", trend: "up" },
        { label: "Conversions", value: "3,204", change: "+4.1%", trend: "up" },
        { label: "Bounce Rate", value: "38.2%", change: "-2.0%", trend: "down" },
        { label: "Avg. Session", value: "4m 12s", change: "0%", trend: "stable" },
      ]}
      chartData={{
        weekly: [
          { label: "Mon", value: 42 },
          { label: "Tue", value: 55 },
          { label: "Wed", value: 48 },
          { label: "Thu", value: 71 },
          { label: "Fri", value: 63 },
          { label: "Sat", value: 38 },
          { label: "Sun", value: 45 },
        ],
      }}
      topItems={[
        { id: "1", name: "/blocks", value: 4821, percentage: 32 },
        { id: "2", name: "/components", value: 3910, percentage: 26 },
        { id: "3", name: "/themes", value: 2104, percentage: 14 },
        { id: "4", name: "/getting-started", value: 1580, percentage: 10 },
      ]}
      actions={[{ label: "Export", onClick: noop }]}
    />
  )
}

/* ------------------------------------------------------------------ *
 * Registry
 * ------------------------------------------------------------------ */

export type BlockCategory =
  | "Featured"
  | "Dashboard"
  | "Data"
  | "AI"
  | "Settings"

export interface BlockEntry {
  slug: string
  name: string
  description: string
  categories: BlockCategory[]
  designWidth: number
  render: () => React.ReactNode
  code: string
}

export const categoryTabs: BlockCategory[] = [
  "Featured",
  "Dashboard",
  "Data",
  "AI",
  "Settings",
]

export function installCommand(slug: string) {
  return `pnpm dlx shadcn@latest add @seamless/blocks/${slug}`
}

export const blocks: BlockEntry[] = [
  {
    slug: "dashboard-01",
    name: "Dashboard 01",
    description: "KPI stat grid with header actions and an overview panel.",
    categories: ["Featured", "Dashboard"],
    designWidth: 1200,
    render: () => <DashboardPreview />,
    code: `import { Dashboard01 } from "@seamless/blocks"

export function Example() {
  return (
    <Dashboard01
      title="Dashboard"
      stats={[
        { label: "Total Revenue", value: "$45,231", change: "+20.1% from last month" },
        { label: "Active Agents", value: 24, change: "+3 since last week" },
        { label: "Tasks Completed", value: "1,203", change: "+18.4% this month" },
        { label: "Avg. Response", value: "1.2s", change: "-0.3s improvement" },
      ]}
      actions={[{ label: "Download", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "analytics-01",
    name: "Analytics 01",
    description: "Metric cards, a time-range chart, and a top-items breakdown.",
    categories: ["Featured", "Dashboard"],
    designWidth: 1200,
    render: () => <AnalyticsPreview />,
    code: `import { Analytics01 } from "@seamless/blocks"

export function Example() {
  return (
    <Analytics01
      title="Analytics"
      metrics={[
        { label: "Page Views", value: "128.4k", change: "+12.3%", trend: "up" },
        { label: "Conversions", value: "3,204", change: "+4.1%", trend: "up" },
        { label: "Bounce Rate", value: "38.2%", change: "-2.0%", trend: "down" },
        { label: "Avg. Session", value: "4m 12s", change: "0%", trend: "stable" },
      ]}
      chartData={{
        weekly: [
          { label: "Mon", value: 42 }, { label: "Tue", value: 55 },
          { label: "Wed", value: 48 }, { label: "Thu", value: 71 },
          { label: "Fri", value: 63 }, { label: "Sat", value: 38 },
          { label: "Sun", value: 45 },
        ],
      }}
      topItems={[
        { id: "1", name: "/blocks", value: 4821, percentage: 32 },
        { id: "2", name: "/components", value: 3910, percentage: 26 },
      ]}
      actions={[{ label: "Export", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "mission-control-01",
    name: "Mission Control 01",
    description: "Live metrics, an agent task list, and an alert feed for operators.",
    categories: ["Featured", "Dashboard"],
    designWidth: 1200,
    render: () => <MissionControlPreview />,
    code: `import { MissionControl01 } from "@seamless/blocks"

export function Example() {
  return (
    <MissionControl01
      title="Mission Control"
      metrics={[
        { label: "Active Tasks", value: 18, change: "+4", status: "positive" },
        { label: "Success Rate", value: "98.6%", change: "+0.4%", status: "positive" },
        { label: "Queue Depth", value: 7, change: "-3", status: "positive" },
        { label: "Errors (24h)", value: 2, change: "+1", status: "negative" },
      ]}
      tasks={[
        { id: "1", name: "Summarize pricing", status: "active", agent: "Research Agent", priority: "high" },
        { id: "2", name: "Accessibility audit", status: "completed", agent: "QA Agent", priority: "medium" },
      ]}
      alerts={[{ id: "1", message: "Billing agent retry scheduled", severity: "warning" }]}
      onTaskClick={() => {}}
      actions={[{ label: "Deploy agent", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "fleet-health-01",
    name: "Fleet Health 01",
    description: "Fleet summary counters and a per-agent status/usage grid.",
    categories: ["Dashboard"],
    designWidth: 1200,
    render: () => <FleetHealthPreview />,
    code: `import { FleetHealth01 } from "@seamless/blocks"

export function Example() {
  return (
    <FleetHealth01
      title="Fleet Health"
      summary={{ total: 24, online: 21, offline: 2, errors: 1 }}
      agents={[
        { id: "1", name: "Research Agent", status: "online", uptime: "12d 4h",
          tasksCompleted: 342, cpuUsage: 34, memoryUsage: 58, lastActivity: "2m ago" },
        { id: "2", name: "Billing Agent", status: "error", uptime: "0d 2h",
          tasksCompleted: 88, cpuUsage: 77, memoryUsage: 82, lastActivity: "just now" },
      ]}
      onAgentClick={() => {}}
      actions={[{ label: "Restart all", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "data-table-01",
    name: "Data Table 01",
    description: "Searchable, paginated table with custom cell renderers.",
    categories: ["Featured", "Data"],
    designWidth: 1100,
    render: () => <DataTablePreview />,
    code: `import { DataTable01 } from "@seamless/blocks"
import { Badge } from "@seamless/ui"

export function Example() {
  return (
    <DataTable01
      title="Team Members"
      searchable
      onSearch={() => {}}
      columns={[
        { id: "name", header: "Name", accessor: "name", sortable: true },
        { id: "email", header: "Email", accessor: "email" },
        { id: "role", header: "Role", accessor: "role" },
        {
          id: "status",
          header: "Status",
          accessor: (row) => (
            <Badge variant={row.status === "Active" ? "secondary" : "outline"}>
              {row.status}
            </Badge>
          ),
        },
      ]}
      data={[
        { name: "Ana Ruiz", email: "ana@seamless.os", role: "Admin", status: "Active" },
        { name: "Marcus Lee", email: "marcus@seamless.os", role: "Engineer", status: "Active" },
      ]}
      pagination={{ page: 1, pageSize: 5, total: 24, onPageChange: () => {} }}
      actions={[{ label: "Add member", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "kanban-01",
    name: "Kanban 01",
    description: "Multi-column board with priority tags and item cards.",
    categories: ["Data"],
    designWidth: 1100,
    render: () => <KanbanPreview />,
    code: `import { Kanban01 } from "@seamless/blocks"

export function Example() {
  return (
    <Kanban01
      title="Sprint Board"
      actions={[{ label: "New task", onClick: () => {} }]}
      columns={[
        {
          id: "todo",
          title: "To Do",
          items: [
            { id: "1", title: "Design onboarding flow", assignee: "Ana", priority: "high", tags: ["design"] },
          ],
        },
        {
          id: "progress",
          title: "In Progress",
          items: [
            { id: "3", title: "Build blocks gallery", assignee: "Priya", priority: "high", tags: ["frontend"] },
          ],
        },
        { id: "done", title: "Done", items: [] },
      ]}
    />
  )
}`,
  },
  {
    slug: "inbox-01",
    name: "Inbox 01",
    description: "Message list, reading pane, and search — a mail-style layout.",
    categories: ["Data"],
    designWidth: 1100,
    render: () => <InboxPreview />,
    code: `import { Inbox01 } from "@seamless/blocks"

export function Example() {
  const items = [
    { id: "1", from: "Vercel", subject: "Deployment succeeded",
      preview: "Your project deployed to production.", date: "9:41 AM", read: false, starred: true },
    { id: "2", from: "Ana Ruiz", subject: "Design review notes",
      preview: "Left a few comments on the blocks page.", date: "8:12 AM", read: false },
  ]
  return (
    <Inbox01
      title="Inbox"
      items={items}
      selectedItem={items[0]}
      onItemSelect={() => {}}
      onSearch={() => {}}
      actions={[{ label: "Compose", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "agent-chat-01",
    name: "Agent Chat 01",
    description: "Conversational agent panel with status, messages, and suggestions.",
    categories: ["Featured", "AI"],
    designWidth: 1000,
    render: () => <AgentChatPreview />,
    code: `import { AgentChat01 } from "@seamless/blocks"

export function Example() {
  return (
    <AgentChat01
      title="Agent Chat"
      agentName="Seamless Assistant"
      agentStatus="online"
      messages={[
        { id: "1", role: "user", content: "Summarize today's fleet activity.", timestamp: "9:40 AM" },
        { id: "2", role: "assistant", content: "24 agents ran 1,203 tasks with a 98.6% success rate.", timestamp: "9:40 AM" },
      ]}
      suggestions={["Show failed runs", "Restart idle agents", "Export report"]}
      onSendMessage={() => {}}
    />
  )
}`,
  },
  {
    slug: "agent-run-01",
    name: "Agent Run 01",
    description: "Run list with live status, progress, and streaming logs.",
    categories: ["AI"],
    designWidth: 1100,
    render: () => <AgentRunPreview />,
    code: `import { AgentRun01 } from "@seamless/blocks"

export function Example() {
  const runs = [
    { id: "1", agentName: "Research Agent", task: "Summarize competitor pricing",
      status: "running", progress: 62, startTime: "9:38 AM", logs: ["Fetching sources…"] },
    { id: "2", agentName: "QA Agent", task: "Run accessibility audit",
      status: "completed", progress: 100, startTime: "9:20 AM", endTime: "9:24 AM" },
  ]
  return (
    <AgentRun01
      title="Agent Runs"
      runs={runs}
      selectedRun={runs[0]}
      onRunSelect={() => {}}
      onRetry={() => {}}
      actions={[{ label: "New run", onClick: () => {} }]}
    />
  )
}`,
  },
  {
    slug: "settings-01",
    name: "Settings 01",
    description: "Sectioned settings form with text fields and toggles.",
    categories: ["Settings"],
    designWidth: 900,
    render: () => <SettingsPreview />,
    code: `import { Settings01 } from "@seamless/blocks"

export function Example() {
  return (
    <Settings01
      title="Settings"
      sections={[
        {
          id: "profile",
          label: "Profile",
          description: "Update your personal information.",
          fields: [
            { id: "name", label: "Full Name", type: "text", value: "David Cervantes" },
            { id: "email", label: "Email", type: "text", value: "david@seamless.os" },
          ],
        },
        {
          id: "notifications",
          label: "Notifications",
          description: "Choose what you want to hear about.",
          fields: [
            { id: "email-notif", label: "Email notifications", type: "toggle", value: true },
          ],
        },
      ]}
      onSave={() => {}}
      onCancel={() => {}}
    />
  )
}`,
  },
]

export function getBlock(slug: string) {
  return blocks.find((b) => b.slug === slug)
}
