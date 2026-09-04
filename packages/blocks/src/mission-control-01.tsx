import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Badge, Button } from "@seamless/ui"
import { Container, Grid, Stack } from "@seamless/layout"

export interface MissionTask {
  id: string
  name: string
  status: "active" | "queued" | "completed" | "failed"
  agent: string
  priority: "low" | "medium" | "high" | "critical"
}

export interface MissionMetric {
  label: string
  value: string | number
  change?: string
  status?: "positive" | "negative" | "neutral"
}

export interface MissionControlProps {
  title?: string
  metrics: MissionMetric[]
  tasks: MissionTask[]
  alerts?: Array<{
    id: string
    message: string
    severity: "info" | "warning" | "error"
  }>
  onTaskClick?: (task: MissionTask) => void
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const MissionControl01 = React.forwardRef<HTMLDivElement, MissionControlProps>(
  ({ title = "Mission Control", metrics, tasks, alerts = [], onTaskClick, actions = [], ...props }, ref) => {
    const priorityColors = {
      low: "default",
      medium: "secondary",
      high: "destructive",
      critical: "destructive",
    } as const

    const statusColors = {
      active: "default",
      queued: "outline",
      completed: "secondary",
      failed: "destructive",
    } as const

    const severityColors = {
      info: "default",
      warning: "secondary",
      error: "destructive",
    } as const

    return (
      <Container ref={ref} {...props}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex gap-2">
              {actions.map((action, i) => (
                <Button key={i} onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <Grid cols={4} gap="md">
            {metrics.map((metric, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  {metric.change && (
                    <p className={`text-xs mt-1 ${
                      metric.status === "positive" ? "text-green-600" :
                      metric.status === "negative" ? "text-red-600" :
                      "text-muted-foreground"
                    }`}>
                      {metric.change}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-4">
            {/* Active Tasks */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
                <CardDescription>Real-time task execution status</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="sm">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => onTaskClick?.(task)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{task.name}</span>
                          <Badge variant={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">Agent: {task.agent}</div>
                      </div>
                      <Badge variant={statusColors[task.status]}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>System notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="sm">
                  {alerts.length > 0 ? (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-start gap-2">
                          <Badge variant={severityColors[alert.severity]}>
                            {alert.severity}
                          </Badge>
                          <p className="text-sm flex-1">{alert.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-8">
                      No active alerts
                    </div>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    )
  }
)
MissionControl01.displayName = "MissionControl01"

export { MissionControl01 }
