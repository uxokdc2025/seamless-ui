"use client"

import { useState } from "react"
import { DocsShell } from "../../components/docs-shell"
import {
  Button,
  Input,
  Textarea,
  Switch,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  EmptyState,
  Confirmation,
  FormField,
  Separator,
  Tag,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@seamless/ui"
import {
  Inbox,
  Search,
  Filter,
  Plus,
  Trash2,
  Check,
  Copy,
} from "lucide-react"

/* ---------- Pattern shell: preview + when-to-use + code ---------- */

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: "13px",
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
    }
  }
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={copy}
        aria-label="Copy code"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 9px",
          fontSize: "12px",
          borderRadius: "6px",
          border: "1px solid var(--color-border)",
          background: "var(--color-card)",
          color: "var(--color-muted-foreground)",
          cursor: "pointer",
        }}
      >
        {copied ? <Check style={{ width: 13, height: 13 }} /> : <Copy style={{ width: 13, height: 13 }} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        style={{
          margin: 0,
          padding: "18px 20px",
          background: "color-mix(in srgb, var(--color-muted) 45%, transparent)",
          borderTop: "1px solid var(--color-border)",
          overflowX: "auto",
          ...monoStyle,
          lineHeight: 1.65,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Pattern({
  id,
  title,
  category,
  whenToUse,
  preview,
  code,
}: {
  id: string
  title: string
  category: string
  whenToUse: string
  preview: React.ReactNode
  code: string
}) {
  const [showCode, setShowCode] = useState(false)
  return (
    <section id={id} style={{ scrollMarginTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
        <h2 style={{ fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
          {title}
        </h2>
        <Badge variant="secondary">{category}</Badge>
      </div>
      <p
        style={{
          margin: "0 0 16px",
          fontSize: "0.9375rem",
          color: "var(--color-muted-foreground)",
          maxWidth: "68ch",
          lineHeight: 1.6,
        }}
      >
        <span style={{ fontWeight: 600, color: "var(--color-foreground)" }}>When to use — </span>
        {whenToUse}
      </p>
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "var(--color-card)",
        }}
      >
        {/* Preview */}
        <div
          data-toc-ignore
          style={{
            padding: "32px",
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, color-mix(in srgb, var(--color-muted) 25%, transparent) 10px, color-mix(in srgb, var(--color-muted) 25%, transparent) 11px)",
          }}
        >
          <div
            style={{
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "10px",
              padding: "24px",
            }}
          >
            {preview}
          </div>
        </div>
        {/* Code toggle */}
        <button
          onClick={() => setShowCode((v) => !v)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "12px 20px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--color-muted-foreground)",
            background: "var(--color-card)",
            border: "none",
            borderTop: "1px solid var(--color-border)",
            cursor: "pointer",
          }}
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
        {showCode && <CodeBlock code={code} />}
      </div>
    </section>
  )
}

/* ---------- Live pattern implementations ---------- */

function SettingsFormPreview() {
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "440px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>Profile</h3>
          <p style={{ margin: "2px 0 0", fontSize: "13px", color: "var(--color-muted-foreground)" }}>
            Update how your account appears.
          </p>
        </div>
        <FormField label="Display name" htmlFor="sf-name">
          <Input id="sf-name" defaultValue="Ada Lovelace" />
        </FormField>
        <FormField label="Bio" htmlFor="sf-bio" help="Brief description for your profile.">
          <Textarea id="sf-bio" defaultValue="Building the analytical engine." rows={3} />
        </FormField>
        <Separator />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>Email notifications</div>
            <div style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>
              Get notified about account activity.
            </div>
          </div>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>Weekly digest</div>
            <div style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>
              A summary every Monday morning.
            </div>
          </div>
          <Switch checked={digest} onCheckedChange={setDigest} />
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <Button variant="ghost" type="button">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </div>
    </form>
  )
}

function EmptyStatePreview() {
  return (
    <EmptyState
      icon={<Inbox style={{ width: 40, height: 40, color: "var(--color-muted-foreground)" }} />}
      title="No messages yet"
      description="When someone sends you a message, it'll show up here. Start a conversation to get going."
      action={
        <Button>
          <Plus style={{ width: 16, height: 16 }} />
          New message
        </Button>
      }
    />
  )
}

function ConfirmationPreview() {
  const [open, setOpen] = useState(false)
  const [deleted, setDeleted] = useState(false)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        <Trash2 style={{ width: 16, height: 16 }} />
        Delete project
      </Button>
      {deleted && (
        <span style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>
          Project deleted. (demo — nothing was actually removed)
        </span>
      )}
      <Confirmation
        open={open}
        onOpenChange={setOpen}
        variant="destructive"
        title="Delete this project?"
        description="This permanently removes the project and all of its data. This action cannot be undone."
        confirmText="Delete"
        cancelText="Keep it"
        onConfirm={() => setDeleted(true)}
      />
    </div>
  )
}

function DataToolbarPreview() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", flex: "1 1 220px", minWidth: "200px" }}>
        <Search
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
            color: "var(--color-muted-foreground)",
            pointerEvents: "none",
          }}
        />
        <Input placeholder="Search records..." style={{ paddingLeft: "34px" }} />
      </div>
      <Select defaultValue="all">
        <SelectTrigger style={{ width: "150px" }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline">
        <Filter style={{ width: 16, height: 16 }} />
        Filters
        <Badge variant="secondary" style={{ marginLeft: "2px" }}>
          2
        </Badge>
      </Button>
      <div style={{ marginLeft: "auto" }}>
        <Button>
          <Plus style={{ width: 16, height: 16 }} />
          Add record
        </Button>
      </div>
    </div>
  )
}

function NotificationPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="info">
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Your trial ends in 5 days. Upgrade any time to keep your workspace active.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Your subscription is active through next year.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Couldn't save changes</AlertTitle>
        <AlertDescription>We lost the connection. Check your network and try again.</AlertDescription>
      </Alert>
    </div>
  )
}

function FilterTagsPreview() {
  const [tags, setTags] = useState(["Design", "Engineering", "Priority: High", "Q3"])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>Active filters</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", minHeight: "28px" }}>
        {tags.length === 0 && (
          <span style={{ fontSize: "13px", color: "var(--color-muted-foreground)" }}>
            No filters applied.
          </span>
        )}
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
      {tags.length > 0 && (
        <div>
          <Button variant="ghost" size="sm" onClick={() => setTags([])}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

/* ---------- Code samples ---------- */

const settingsCode = `<form onSubmit={handleSubmit}>
  <FormField label="Display name" htmlFor="name">
    <Input id="name" defaultValue="Ada Lovelace" />
  </FormField>
  <FormField label="Bio" htmlFor="bio" help="Brief description.">
    <Textarea id="bio" rows={3} />
  </FormField>
  <Separator />
  <div className="row">
    <div>
      <div>Email notifications</div>
      <div>Get notified about account activity.</div>
    </div>
    <Switch checked={notify} onCheckedChange={setNotify} />
  </div>
  <div className="actions">
    <Button variant="ghost" type="button">Cancel</Button>
    <Button type="submit">Save changes</Button>
  </div>
</form>`

const emptyCode = `<EmptyState
  icon={<Inbox className="size-10" />}
  title="No messages yet"
  description="When someone sends you a message, it'll show up here."
  action={<Button><Plus className="size-4" /> New message</Button>}
/>`

const confirmationCode = `const [open, setOpen] = useState(false)

<Button variant="destructive" onClick={() => setOpen(true)}>
  <Trash2 className="size-4" /> Delete project
</Button>

<Confirmation
  open={open}
  onOpenChange={setOpen}
  variant="destructive"
  title="Delete this project?"
  description="This permanently removes the project and all of its data."
  confirmText="Delete"
  cancelText="Keep it"
  onConfirm={handleDelete}
/>`

const toolbarCode = `<div className="toolbar">
  <div className="search">
    <Search className="icon" />
    <Input placeholder="Search records..." />
  </div>
  <Select defaultValue="all">
    <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All statuses</SelectItem>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="archived">Archived</SelectItem>
    </SelectContent>
  </Select>
  <Button variant="outline">
    <Filter className="size-4" /> Filters
    <Badge variant="secondary">2</Badge>
  </Button>
  <Button className="ml-auto"><Plus className="size-4" /> Add record</Button>
</div>`

const notificationCode = `// Alert renders the icon for its variant automatically.
<Alert variant="info">
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Your trial ends in 5 days.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>Your subscription is active.</AlertDescription>
</Alert>

<Alert variant="error">
  <AlertTitle>Couldn't save changes</AlertTitle>
  <AlertDescription>Check your network and try again.</AlertDescription>
</Alert>`

const filterTagsCode = `const [tags, setTags] = useState(["Design", "Engineering", "Q3"])

<div className="tags">
  {tags.map((t) => (
    <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>
      {t}
    </Tag>
  ))}
</div>
<Button variant="ghost" size="sm" onClick={() => setTags([])}>
  Clear all
</Button>`

export default function PatternsPage() {
  return (
    <DocsShell title="Patterns">
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
            Patterns
          </div>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.03em", margin: 0 }}>
            Composition patterns
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
            Recurring UI problems solved with real, working compositions of Seamless UI components. Each
            example is live — interact with it — with the source and guidance on when to reach for it.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
          <Pattern
            id="settings-form"
            title="Settings form"
            category="Forms"
            whenToUse="a screen collects a set of related preferences a user reviews and saves together. Group fields, pair each toggle with a clear label and helper text, and anchor primary/secondary actions at the bottom."
            preview={<SettingsFormPreview />}
            code={settingsCode}
          />
          <Pattern
            id="empty-state"
            title="Empty state"
            category="Feedback"
            whenToUse="a list, table, or view has no data yet. Explain what belongs here and offer the single action that fills it — never show a blank panel."
            preview={<EmptyStatePreview />}
            code={emptyCode}
          />
          <Pattern
            id="confirmation-dialog"
            title="Confirmation dialog"
            category="Overlay"
            whenToUse="an action is destructive or irreversible. Interrupt with a focused dialog, name the exact consequence, and make the confirm button match the risk (destructive styling)."
            preview={<ConfirmationPreview />}
            code={confirmationCode}
          />
          <Pattern
            id="data-toolbar"
            title="Data toolbar"
            category="Data"
            whenToUse="a collection view needs search, filtering, and a primary create action in one row. Lead with search, group filters together, and push the primary action to the far end."
            preview={<DataToolbarPreview />}
            code={toolbarCode}
          />
          <Pattern
            id="inline-notifications"
            title="Inline notifications"
            category="Feedback"
            whenToUse="you need to surface status in context — inside a page or panel, not as a transient toast. Match the variant to intent: informational, success, or error."
            preview={<NotificationPreview />}
            code={notificationCode}
          />
          <Pattern
            id="filter-tags"
            title="Removable filter tags"
            category="Data"
            whenToUse="active filters or multi-select values should stay visible and individually removable. Show each as a tag with a clear affordance to remove, plus a clear-all escape hatch."
            preview={<FilterTagsPreview />}
            code={filterTagsCode}
          />
        </div>
      </div>
    </DocsShell>
  )
}
