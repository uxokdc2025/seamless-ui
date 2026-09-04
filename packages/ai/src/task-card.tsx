import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, CardFooter, Badge } from "@seamless/ui"

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  status: "ready" | "running" | "blocked" | "done" | "failed"
  assignee?: string
  priority?: "low" | "medium" | "high" | "urgent"
  createdAt?: Date | string
  actions?: React.ReactNode
}

const statusConfig = {
  ready: { variant: "secondary" as const, label: "Ready" },
  running: { variant: "default" as const, label: "Running" },
  blocked: { variant: "destructive" as const, label: "Blocked" },
  done: { variant: "success" as const, label: "Done" },
  failed: { variant: "destructive" as const, label: "Failed" },
}

const priorityConfig = {
  low: { variant: "outline" as const, label: "Low" },
  medium: { variant: "secondary" as const, label: "Medium" },
  high: { variant: "default" as const, label: "High" },
  urgent: { variant: "destructive" as const, label: "Urgent" },
}

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      className,
      title,
      description,
      status,
      assignee,
      priority,
      createdAt,
      actions,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold leading-tight">{title}</h3>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <Badge variant={statusConfig[status].variant}>
              {statusConfig[status].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3 pt-0">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {assignee && <span>Assignee: {assignee}</span>}
            {priority && (
              <Badge variant={priorityConfig[priority].variant} className="text-xs">
                {priorityConfig[priority].label}
              </Badge>
            )}
            {createdAt && (
              <time>
                {typeof createdAt === "string"
                  ? createdAt
                  : createdAt.toLocaleDateString()}
              </time>
            )}
          </div>
        </CardContent>
        {actions && <CardFooter className="pt-0">{actions}</CardFooter>}
      </Card>
    )
  }
)
TaskCard.displayName = "TaskCard"

export { TaskCard }
