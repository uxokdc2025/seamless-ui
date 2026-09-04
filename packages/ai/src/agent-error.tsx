import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"

export interface AgentErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  errorMessage: string
  errorType?: string
  stackTrace?: string
  timestamp?: Date | string
  retryCount?: number
  maxRetries?: number
  onRetry?: () => void
}

const AgentError = React.forwardRef<HTMLDivElement, AgentErrorProps>(
  (
    {
      className,
      errorMessage,
      errorType,
      stackTrace,
      timestamp,
      retryCount,
      maxRetries,
      onRetry,
      ...props
    },
    ref
  ) => {
    const canRetry = maxRetries !== undefined && retryCount !== undefined && retryCount < maxRetries

    return (
      <Card
        ref={ref}
        className={cn("w-full border-l-4 border-l-destructive bg-destructive/5", className)}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-destructive">Error</h3>
                {errorType && (
                  <Badge variant="destructive" className="text-xs">
                    {errorType}
                  </Badge>
                )}
              </div>
              {timestamp && (
                <time className="mt-1 text-xs text-muted-foreground">
                  {typeof timestamp === "string"
                    ? timestamp
                    : timestamp.toLocaleString()}
                </time>
              )}
            </div>
            {retryCount !== undefined && maxRetries !== undefined && (
              <div className="text-xs text-muted-foreground">
                Retry {retryCount} / {maxRetries}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <p className="text-sm font-medium">Message:</p>
            <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
          </div>
          {stackTrace && (
            <details>
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                Stack Trace
              </summary>
              <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
                {stackTrace}
              </pre>
            </details>
          )}
          {onRetry && canRetry && (
            <button
              onClick={onRetry}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Retry
            </button>
          )}
        </CardContent>
      </Card>
    )
  }
)
AgentError.displayName = "AgentError"

export { AgentError }
