import * as React from "react"
import { cn } from "@seamless/ui"
import { Eye, EyeOff, Copy, Trash } from "lucide-react"

export interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  lastUsed?: Date
  expiresAt?: Date
}

export interface ApiKeyRowProps {
  apiKey: ApiKey
  onCopy?: (key: string) => void
  onRevoke?: (id: string) => void
  className?: string
}

const ApiKeyRow = React.forwardRef<HTMLDivElement, ApiKeyRowProps>(
  ({ apiKey, onCopy, onRevoke, className, ...props }, ref) => {
    const [revealed, setRevealed] = React.useState(false)

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    const maskKey = (key: string) => {
      if (key.length <= 8) return "••••••••"
      return `${key.substring(0, 4)}${"•".repeat(key.length - 8)}${key.substring(
        key.length - 4
      )}`
    }

    const isExpired = apiKey.expiresAt && apiKey.expiresAt < new Date()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3 rounded-lg border bg-muted/50 p-4",
          isExpired && "opacity-60",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{apiKey.name}</h4>
              {isExpired && (
                <span className="inline-flex items-center rounded-full bg-destructive px-2 py-0.5 text-xs font-semibold text-destructive-foreground">
                  Expired
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-xs font-mono bg-muted rounded px-2 py-1">
                {revealed ? apiKey.key : maskKey(apiKey.key)}
              </code>
              <button
                onClick={() => setRevealed(!revealed)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={revealed ? "Hide key" : "Show key"}
              >
                {revealed ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {onCopy && (
                <button
                  onClick={() => onCopy(apiKey.key)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Copy key"
                >
                  <Copy className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {onRevoke && (
            <button
              onClick={() => onRevoke(apiKey.id)}
              className="text-destructive hover:text-destructive/80"
              aria-label="Revoke key"
            >
              <Trash className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <span>Created {formatDate(apiKey.createdAt)}</span>
          {apiKey.lastUsed && (
            <span>Last used {formatDate(apiKey.lastUsed)}</span>
          )}
          {apiKey.expiresAt && !isExpired && (
            <span>Expires {formatDate(apiKey.expiresAt)}</span>
          )}
        </div>
      </div>
    )
  }
)
ApiKeyRow.displayName = "ApiKeyRow"

export { ApiKeyRow }
