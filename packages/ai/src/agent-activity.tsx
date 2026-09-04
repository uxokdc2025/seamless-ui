import * as React from "react"
import { cn } from "@seamless/ui"
import { Stack } from "@seamless/layout"

export interface AgentActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  activities: Array<{
    id: string
    timestamp: Date | string
    action: string
    description?: string
  }>
  showTimestamps?: boolean
}

const AgentActivity = React.forwardRef<HTMLDivElement, AgentActivityProps>(
  ({ className, activities, showTimestamps = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Stack gap="sm">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                {activity.description && (
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                )}
                {showTimestamps && (
                  <time className="text-xs text-muted-foreground">
                    {typeof activity.timestamp === "string"
                      ? activity.timestamp
                      : activity.timestamp.toLocaleString()}
                  </time>
                )}
              </div>
            </div>
          ))}
        </Stack>
      </div>
    )
  }
)
AgentActivity.displayName = "AgentActivity"

export { AgentActivity }
