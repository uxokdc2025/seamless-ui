import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface ToolCallProps extends React.HTMLAttributes<HTMLDivElement> {
  toolName: string
  parameters?: Record<string, unknown>
  status: "pending" | "running" | "success" | "error"
  timestamp?: Date | string
  duration?: number
}

const statusConfig = {
  pending: { color: "text-muted-foreground", bg: "bg-muted/50" },
  running: { color: "text-primary", bg: "bg-primary/10" },
  success: { color: "text-success", bg: "bg-success/10" },
  error: { color: "text-destructive", bg: "bg-destructive/10" },
}

const ToolCall = React.forwardRef<HTMLDivElement, ToolCallProps>(
  (
    { className, toolName, parameters, status, timestamp, duration, ...props },
    ref
  ) => {
    const config = statusConfig[status]

    return (
      <Card ref={ref} className={cn("w-full", config.bg, className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className={cn("font-mono text-sm font-semibold", config.color)}>
                  {toolName}
                </code>
                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide",
                    config.color
                  )}
                >
                  {status}
                </span>
              </div>
              {parameters && Object.keys(parameters).length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    Parameters
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 text-xs">
                    {JSON.stringify(parameters, null, 2)}
                  </pre>
                </details>
              )}
            </div>
            <div className="text-right text-xs text-muted-foreground">
              {timestamp && (
                <div>
                  {typeof timestamp === "string"
                    ? timestamp
                    : timestamp.toLocaleTimeString()}
                </div>
              )}
              {duration !== undefined && <div>{duration}ms</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
ToolCall.displayName = "ToolCall"

export { ToolCall }
