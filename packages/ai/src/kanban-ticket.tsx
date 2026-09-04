import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"

export interface KanbanTicketProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  title: string
  description?: string
  status: "ready" | "todo" | "running" | "blocked" | "review" | "done"
  assignee?: string
  priority?: "low" | "medium" | "high" | "urgent"
  labels?: string[]
  createdAt?: Date | string
}

const statusColors = {
  ready: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  todo: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
  running: "bg-primary/10 text-primary border-primary/20",
  blocked: "bg-destructive/10 text-destructive border-destructive/20",
  review: "bg-warning/10 text-warning border-warning/20",
  done: "bg-success/10 text-success border-success/20",
}

const priorityConfig = {
  low: { variant: "outline" as const },
  medium: { variant: "secondary" as const },
  high: { variant: "default" as const },
  urgent: { variant: "destructive" as const },
}

const KanbanTicket = React.forwardRef<HTMLDivElement, KanbanTicketProps>(
  (
    {
      className,
      id,
      title,
      description,
      status,
      assignee,
      priority,
      labels,
      createdAt,
      ...props
    },
    ref
  ) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className="text-xs text-muted-foreground">{id}</code>
                {priority && (
                  <Badge variant={priorityConfig[priority].variant} className="text-xs">
                    {priority}
                  </Badge>
                )}
              </div>
              <h3 className="mt-1 font-semibold leading-tight">{title}</h3>
            </div>
            <div className={cn("rounded border px-2 py-0.5 text-xs font-medium capitalize", statusColors[status])}>
              {status}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          {labels && labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {labels.map((label) => (
                <Badge key={label} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {assignee && <span>@{assignee}</span>}
            {createdAt && (
              <time>
                {typeof createdAt === "string"
                  ? createdAt
                  : createdAt.toLocaleDateString()}
              </time>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
KanbanTicket.displayName = "KanbanTicket"

export { KanbanTicket }
