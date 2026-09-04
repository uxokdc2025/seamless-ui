import * as React from "react"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"
import { cn } from "@seamless/ui"
import { Stack } from "@seamless/layout"

export interface AgentCardProps {
  name: string
  status: "active" | "idle" | "error"
  description?: string
  metrics?: {
    tasks: number
    uptime: string
  }
  className?: string
}

const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  ({ name, status, description, metrics, className, ...props }, ref) => {
    const statusColors = {
      active: "success",
      idle: "secondary", 
      error: "destructive",
    } as const

    return (
      <Card ref={ref} className={cn("p-4", className)} {...props}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{name}</h3>
            <Badge variant={statusColors[status]}>
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Stack gap="sm">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {metrics && (
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Tasks: {metrics.tasks}</span>
                <span>Uptime: {metrics.uptime}</span>
              </div>
            )}
          </Stack>
        </CardContent>
      </Card>
    )
  }
)
AgentCard.displayName = "AgentCard"

export { AgentCard }