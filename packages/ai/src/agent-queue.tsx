import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"

export interface AgentQueueProps extends React.HTMLAttributes<HTMLDivElement> {
  queueName: string
  totalTasks: number
  pendingTasks: number
  runningTasks: number
  completedTasks: number
  failedTasks: number
  showProgress?: boolean
}

const AgentQueue = React.forwardRef<HTMLDivElement, AgentQueueProps>(
  (
    {
      className,
      queueName,
      totalTasks,
      pendingTasks,
      runningTasks,
      completedTasks,
      failedTasks,
      showProgress = true,
      ...props
    },
    ref
  ) => {
    const completionPercentage = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{queueName}</h3>
            <span className="text-sm text-muted-foreground">
              {completedTasks} / {totalTasks}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {showProgress && (
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-success transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Pending: </span>
              <span className="font-medium">{pendingTasks}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Running: </span>
              <span className="font-medium">{runningTasks}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Completed: </span>
              <span className="font-medium text-success">{completedTasks}</span>
            </div>
            {failedTasks > 0 && (
              <div>
                <span className="text-muted-foreground">Failed: </span>
                <span className="font-medium text-destructive">{failedTasks}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
AgentQueue.displayName = "AgentQueue"

export { AgentQueue }
