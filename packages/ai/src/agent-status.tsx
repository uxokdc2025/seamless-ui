import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const agentStatusVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-success/10 text-success border border-success/20",
        idle: "bg-secondary/10 text-secondary-foreground border border-secondary/20",
        busy: "bg-warning/10 text-warning border border-warning/20",
        error: "bg-destructive/10 text-destructive border border-destructive/20",
        offline: "bg-muted text-muted-foreground border border-muted",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  }
)

const statusIndicatorVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    status: {
      active: "bg-success animate-pulse",
      idle: "bg-secondary",
      busy: "bg-warning animate-pulse",
      error: "bg-destructive",
      offline: "bg-muted-foreground",
    },
  },
})

export interface AgentStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentStatusVariants> {
  showIndicator?: boolean
}

const AgentStatus = React.forwardRef<HTMLDivElement, AgentStatusProps>(
  ({ className, status, showIndicator = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(agentStatusVariants({ status }), className)}
        {...props}
      >
        {showIndicator && (
          <span className={statusIndicatorVariants({ status })} />
        )}
        <span>{children || status}</span>
      </div>
    )
  }
)
AgentStatus.displayName = "AgentStatus"

export { AgentStatus, agentStatusVariants }
