import * as React from "react"
import { cn } from "@seamless/ui"

export interface ActivityItem {
  id: string
  actor: string
  action: string
  target?: string
  timestamp: Date
  avatar?: string
  icon?: React.ReactNode
}

export interface ActivityFeedProps {
  items: ActivityItem[]
  emptyMessage?: string
  className?: string
}

const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  ({ items, emptyMessage = "No recent activity", className, ...props }, ref) => {
    const formatTime = (date: Date) => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diff < 60) return "just now"
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
      if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
      return date.toLocaleDateString()
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {items.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className="flex gap-3">
              <div className="flex-shrink-0">
                {item.avatar ? (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                    {item.avatar}
                  </div>
                ) : item.icon ? (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    {item.icon}
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{item.actor}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                  {item.target && (
                    <>
                      {" "}
                      <span className="font-medium">{item.target}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(item.timestamp)}
                </p>
              </div>
              {index < items.length - 1 && (
                <div className="absolute left-4 top-10 bottom-0 w-px bg-border" />
              )}
            </div>
          ))
        )}
      </div>
    )
  }
)
ActivityFeed.displayName = "ActivityFeed"

export { ActivityFeed }
