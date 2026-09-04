import * as React from "react"
import { cn } from "@seamless/ui"

export interface AuditLogEntry {
  id: string
  actor: string
  action: string
  resource: string
  timestamp: Date
  ipAddress?: string
  metadata?: Record<string, any>
}

export interface AuditLogProps {
  entries: AuditLogEntry[]
  onLoadMore?: () => void
  hasMore?: boolean
  loading?: boolean
  className?: string
}

const AuditLog = React.forwardRef<HTMLDivElement, AuditLogProps>(
  ({ entries, onLoadMore, hasMore, loading, className, ...props }, ref) => {
    const formatTimestamp = (date: Date) => {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-2 rounded-lg border bg-card p-4", className)}
        {...props}
      >
        <h3 className="font-semibold text-sm mb-4">Audit Log</h3>
        <div className="space-y-2">
          {entries.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No audit entries found
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-1 rounded-md border bg-muted/50 p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <p>
                    <span className="font-medium">{entry.actor}</span>{" "}
                    <span className="text-muted-foreground">{entry.action}</span>{" "}
                    <span className="font-medium">{entry.resource}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatTimestamp(entry.timestamp)}</span>
                  {entry.ipAddress && <span>IP: {entry.ipAddress}</span>}
                </div>
                {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs text-brand hover:underline">
                      View details
                    </summary>
                    <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 text-xs">
                      {JSON.stringify(entry.metadata, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className="pt-2 text-center">
            <button
              onClick={onLoadMore}
              disabled={loading}
              className="text-sm text-brand hover:underline disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    )
  }
)
AuditLog.displayName = "AuditLog"

export { AuditLog }
