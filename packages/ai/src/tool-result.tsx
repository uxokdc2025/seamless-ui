import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface ToolResultProps extends React.HTMLAttributes<HTMLDivElement> {
  toolName: string
  result?: unknown
  error?: string
  status: "success" | "error"
  timestamp?: Date | string
}

const ToolResult = React.forwardRef<HTMLDivElement, ToolResultProps>(
  ({ className, toolName, result, error, status, timestamp, ...props }, ref) => {
    const isError = status === "error"

    return (
      <Card
        ref={ref}
        className={cn(
          "w-full",
          isError ? "bg-destructive/10" : "bg-success/10",
          className
        )}
        {...props}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm font-semibold">
                  {toolName}
                </code>
                <span
                  className={cn(
                    "text-xs font-medium uppercase tracking-wide",
                    isError ? "text-destructive" : "text-success"
                  )}
                >
                  {status}
                </span>
              </div>
              {error && (
                <p className="mt-2 text-sm text-destructive">{error}</p>
              )}
              {result && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    Result
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 text-xs">
                    {typeof result === "string"
                      ? result
                      : JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              )}
            </div>
            {timestamp && (
              <time className="text-xs text-muted-foreground">
                {typeof timestamp === "string"
                  ? timestamp
                  : timestamp.toLocaleTimeString()}
              </time>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ToolResult.displayName = "ToolResult"

export { ToolResult }
