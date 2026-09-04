import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Badge, Button } from "@seamless/ui"
import { Container, Grid, Stack } from "@seamless/layout"

export interface Agent {
  id: string
  name: string
  status: "online" | "offline" | "error" | "idle"
  uptime: string
  tasksCompleted: number
  cpuUsage?: number
  memoryUsage?: number
  lastActivity: string
}

export interface FleetHealthProps {
  title?: string
  agents: Agent[]
  summary?: {
    total: number
    online: number
    offline: number
    errors: number
  }
  onAgentClick?: (agent: Agent) => void
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const FleetHealth01 = React.forwardRef<HTMLDivElement, FleetHealthProps>(
  ({ title = "Fleet Health", agents, summary, onAgentClick, actions = [], ...props }, ref) => {
    const statusColors = {
      online: "bg-green-500",
      idle: "bg-yellow-500",
      offline: "bg-gray-400",
      error: "bg-red-500",
    }

    const statusBadgeColors = {
      online: "secondary",
      idle: "default",
      offline: "outline",
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

          {/* Summary */}
          {summary && (
            <Grid cols={4} gap="md">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Agents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold">{summary.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-600">
                    Online
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-green-600">{summary.online}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Offline
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold">{summary.offline}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-red-600">
                    Errors
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-red-600">{summary.errors}</div>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Agent List */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
              <CardDescription>Monitor all agents in your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onAgentClick?.(agent)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{agent.name}</span>
                          <Badge variant={statusBadgeColors[agent.status]}>
                            {agent.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Last activity: {agent.lastActivity}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <div className="text-muted-foreground">Uptime</div>
                        <div className="font-medium">{agent.uptime}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Tasks</div>
                        <div className="font-medium">{agent.tasksCompleted}</div>
                      </div>
                      {agent.cpuUsage !== undefined && (
                        <div>
                          <div className="text-muted-foreground">CPU</div>
                          <div className="font-medium">{agent.cpuUsage}%</div>
                        </div>
                      )}
                      {agent.memoryUsage !== undefined && (
                        <div>
                          <div className="text-muted-foreground">Memory</div>
                          <div className="font-medium">{agent.memoryUsage}%</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }
)
FleetHealth01.displayName = "FleetHealth01"

export { FleetHealth01 }
