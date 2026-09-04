import * as React from "react"
import { cn } from "@seamless/ui"

export interface ExecutionStepProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  title: string
  description?: string
  status: "pending" | "active" | "completed" | "failed" | "skipped"
  timestamp?: Date | string
}

const statusConfig = {
  pending: { color: "text-muted-foreground", bg: "bg-muted", border: "border-muted" },
  active: { color: "text-primary", bg: "bg-primary", border: "border-primary" },
  completed: { color: "text-success", bg: "bg-success", border: "border-success" },
  failed: { color: "text-destructive", bg: "bg-destructive", border: "border-destructive" },
  skipped: { color: "text-muted-foreground", bg: "bg-muted", border: "border-muted" },
}

const ExecutionStep = React.forwardRef<HTMLDivElement, ExecutionStepProps>(
  ({ className, step, title, description, status, timestamp, ...props }, ref) => {
    const config = statusConfig[status]

    return (
      <div
        ref={ref}
        className={cn("flex gap-4 relative", className)}
        {...props}
      >
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border-2 font-medium text-xs",
              config.bg,
              config.border,
              status === "pending" ? "text-muted-foreground" : "text-white"
            )}
          >
            {status === "completed" ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : status === "failed" ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              step
            )}
          </div>
        </div>
        <div className="flex-1 pb-8">
          <div className="flex items-center justify-between">
            <h4 className={cn("font-medium", config.color)}>{title}</h4>
            {timestamp && (
              <time className="text-xs text-muted-foreground">
                {typeof timestamp === "string"
                  ? timestamp
                  : timestamp.toLocaleTimeString()}
              </time>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    )
  }
)
ExecutionStep.displayName = "ExecutionStep"

export { ExecutionStep }
