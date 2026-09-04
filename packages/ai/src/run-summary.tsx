import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"

export interface RunSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  runId: string
  status: "completed" | "failed" | "cancelled" | "running"
  startTime: Date | string
  endTime?: Date | string
  duration?: number
  tokenUsage?: {
    input: number
    output: number
    total: number
  }
  cost?: number
  error?: string
}

const statusConfig = {
  completed: { color: "text-success", bg: "bg-success/10" },
  failed: { color: "text-destructive", bg: "bg-destructive/10" },
  cancelled: { color: "text-warning", bg: "bg-warning/10" },
  running: { color: "text-primary", bg: "bg-primary/10" },
}

const RunSummary = React.forwardRef<HTMLDivElement, RunSummaryProps>(
  (
    {
      className,
      runId,
      status,
      startTime,
      endTime,
      duration,
      tokenUsage,
      cost,
      error,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status]

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Run Summary</h3>
              <p className="mt-1 text-xs text-muted-foreground">ID: {runId}</p>
            </div>
            <div className={cn("rounded-full px-3 py-1 text-xs font-medium capitalize", config.bg, config.color)}>
              {status}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Started: </span>
              <span className="font-medium">
                {typeof startTime === "string"
                  ? startTime
                  : startTime.toLocaleString()}
              </span>
            </div>
            {endTime && (
              <div>
                <span className="text-muted-foreground">Ended: </span>
                <span className="font-medium">
                  {typeof endTime === "string"
                    ? endTime
                    : endTime.toLocaleString()}
                </span>
              </div>
            )}
            {duration !== undefined && (
              <div>
                <span className="text-muted-foreground">Duration: </span>
                <span className="font-medium">{duration}s</span>
              </div>
            )}
            {tokenUsage && (
              <div>
                <span className="text-muted-foreground">Tokens: </span>
                <span className="font-medium">{tokenUsage.total.toLocaleString()}</span>
              </div>
            )}
            {cost !== undefined && (
              <div>
                <span className="text-muted-foreground">Cost: </span>
                <span className="font-medium">${cost.toFixed(4)}</span>
              </div>
            )}
          </div>
          {error && (
            <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <p className="font-medium">Error:</p>
              <p className="mt-1">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
RunSummary.displayName = "RunSummary"

export { RunSummary }
