import * as React from "react"
import { cn } from "@seamless/ui"

export interface RunTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Array<{
    id: string
    timestamp: Date | string
    title: string
    description?: string
    type?: "info" | "success" | "warning" | "error"
  }>
}

const typeConfig = {
  info: { color: "bg-primary", border: "border-primary" },
  success: { color: "bg-success", border: "border-success" },
  warning: { color: "bg-warning", border: "border-warning" },
  error: { color: "bg-destructive", border: "border-destructive" },
}

const RunTimeline = React.forwardRef<HTMLDivElement, RunTimelineProps>(
  ({ className, events, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div className="relative space-y-6">
          {/* Timeline line */}
          <div className="absolute left-2 top-3 bottom-0 w-0.5 bg-border" />
          
          {events.map((event, index) => {
            const config = typeConfig[event.type || "info"]
            const isLast = index === events.length - 1

            return (
              <div key={event.id} className="relative flex gap-4">
                {/* Timeline dot */}
                <div
                  className={cn(
                    "relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 bg-background",
                    config.border
                  )}
                >
                  <div className={cn("h-2 w-2 rounded-full", config.color)} />
                </div>

                {/* Event content */}
                <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <time className="text-xs text-muted-foreground">
                      {typeof event.timestamp === "string"
                        ? event.timestamp
                        : event.timestamp.toLocaleTimeString()}
                    </time>
                  </div>
                  {event.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
RunTimeline.displayName = "RunTimeline"

export { RunTimeline }
