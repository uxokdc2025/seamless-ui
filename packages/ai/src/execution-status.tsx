import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface ExecutionStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "idle" | "running" | "completed" | "failed" | "cancelled"
  startTime?: Date | string
  endTime?: Date | string
  duration?: number
  message?: string
}

const statusConfig = {
  idle: { color: "text-muted-foreground", bg: "bg-muted/50" },
  running: { color: "text-primary", bg: "bg-primary/10" },
  completed: { color: "text-success", bg: "bg-success/10" },
  failed: { color: "text-destructive", bg: "bg-destructive/10" },
  cancelled: { color: "text-warning", bg: "bg-warning/10" },
}

const ExecutionStatus = React.forwardRef<HTMLDivElement, ExecutionStatusProps>(
  (
    { className, status, startTime, endTime, duration, message, ...props },
    ref
  ) => {
    const config = statusConfig[status]

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  config.bg
                )}
              >
                <div className={cn("h-3 w-3 rounded-full", config.color.replace("text-", "bg-"))} />
              </div>
              <div>
                <p className={cn("font-medium capitalize", config.color)}>
                  {status}
                </p>
                {message && (
                  <p className="text-sm text-muted-foreground">{message}</p>
                )}
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              {startTime && (
                <div>
                  Started:{" "}
                  {typeof startTime === "string"
                    ? startTime
                    : startTime.toLocaleTimeString()}
                </div>
              )}
              {endTime && (
                <div>
                  Ended:{" "}
                  {typeof endTime === "string"
                    ? endTime
                    : endTime.toLocaleTimeString()}
                </div>
              )}
              {duration !== undefined && <div>Duration: {duration}s</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
ExecutionStatus.displayName = "ExecutionStatus"

export { ExecutionStatus }
