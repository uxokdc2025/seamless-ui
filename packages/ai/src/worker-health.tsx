import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

const workerHealthVariants = cva("flex items-center gap-2", {
  variants: {
    status: {
      healthy: "text-success",
      degraded: "text-warning",
      unhealthy: "text-destructive",
      unknown: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "unknown",
  },
})

export interface WorkerHealthProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof workerHealthVariants> {
  cpuUsage?: number
  memoryUsage?: number
  responseTime?: number
  errorRate?: number
  showMetrics?: boolean
}

const WorkerHealth = React.forwardRef<HTMLDivElement, WorkerHealthProps>(
  (
    {
      className,
      status,
      cpuUsage,
      memoryUsage,
      responseTime,
      errorRate,
      showMetrics = true,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className={workerHealthVariants({ status })}>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-current" />
              <span className="font-medium capitalize">{status}</span>
            </div>
          </div>
          {showMetrics && (
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              {cpuUsage !== undefined && (
                <div>
                  <span className="text-muted-foreground">CPU: </span>
                  <span className="font-medium">{cpuUsage}%</span>
                </div>
              )}
              {memoryUsage !== undefined && (
                <div>
                  <span className="text-muted-foreground">Memory: </span>
                  <span className="font-medium">{memoryUsage}%</span>
                </div>
              )}
              {responseTime !== undefined && (
                <div>
                  <span className="text-muted-foreground">Response: </span>
                  <span className="font-medium">{responseTime}ms</span>
                </div>
              )}
              {errorRate !== undefined && (
                <div>
                  <span className="text-muted-foreground">Errors: </span>
                  <span className="font-medium">{errorRate}%</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
WorkerHealth.displayName = "WorkerHealth"

export { WorkerHealth, workerHealthVariants }
