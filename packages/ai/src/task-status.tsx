import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const taskStatusVariants = cva(
  "inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        ready: "bg-secondary/50 text-secondary-foreground",
        running: "bg-primary/10 text-primary border border-primary/20",
        blocked: "bg-destructive/10 text-destructive border border-destructive/20",
        done: "bg-success/10 text-success border border-success/20",
        failed: "bg-destructive/10 text-destructive border border-destructive/20",
        pending: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
)

export interface TaskStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskStatusVariants> {}

const TaskStatus = React.forwardRef<HTMLDivElement, TaskStatusProps>(
  ({ className, status, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(taskStatusVariants({ status }), className)}
        {...props}
      >
        {children || status}
      </div>
    )
  }
)
TaskStatus.displayName = "TaskStatus"

export { TaskStatus, taskStatusVariants }
