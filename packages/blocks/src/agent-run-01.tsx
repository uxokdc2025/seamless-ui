import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Badge, Button } from "@seamless/ui"
import { Container, Grid } from "@seamless/layout"

export interface AgentRun {
  id: string
  agentName: string
  task: string
  status: "running" | "completed" | "failed" | "pending"
  progress?: number
  startTime: string
  endTime?: string
  logs?: string[]
}

export interface AgentRunProps {
  title?: string
  runs: AgentRun[]
  selectedRun?: AgentRun
  onRunSelect?: (run: AgentRun) => void
  onCancel?: (runId: string) => void
  onRetry?: (runId: string) => void
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const AgentRun01 = React.forwardRef<HTMLDivElement, AgentRunProps>(
  ({ title = "Agent Runs", runs, selectedRun, onRunSelect, onCancel, onRetry, actions = [], ...props }, ref) => {
    const statusColors = {
      running: "default",
      completed: "secondary",
      failed: "destructive",
      pending: "outline",
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

          {/* Runs Layout */}
          <div className="grid grid-cols-3 gap-4">
            {/* Runs List */}
            <Card className="h-[600px] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>All Runs</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-y-auto h-[520px]">
                  {runs.map((run) => (
                    <div
                      key={run.id}
                      className={`border-b p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedRun?.id === run.id ? "bg-muted" : ""
                      }`}
                      onClick={() => onRunSelect?.(run)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-sm truncate">{run.agentName}</span>
                          <Badge variant={statusColors[run.status]}>
                            {run.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {run.task}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {run.startTime}
                        </div>
                        {run.status === "running" && run.progress !== undefined && (
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full transition-all"
                              style={{ width: `${run.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Run Details */}
            <Card className="h-[600px] col-span-2 overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {selectedRun ? selectedRun.agentName : "Select a run"}
                    </CardTitle>
                    {selectedRun && (
                      <CardDescription className="mt-1">{selectedRun.task}</CardDescription>
                    )}
                  </div>
                  {selectedRun && (
                    <div className="flex gap-2">
                      {selectedRun.status === "running" && onCancel && (
                        <Button variant="outline" size="sm" onClick={() => onCancel(selectedRun.id)}>
                          Cancel
                        </Button>
                      )}
                      {selectedRun.status === "failed" && onRetry && (
                        <Button variant="outline" size="sm" onClick={() => onRetry(selectedRun.id)}>
                          Retry
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto h-[480px]">
                {selectedRun ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <Badge variant={statusColors[selectedRun.status]} className="mt-1">
                          {selectedRun.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Started</div>
                        <div className="text-sm font-medium mt-1">{selectedRun.startTime}</div>
                      </div>
                      {selectedRun.endTime && (
                        <div>
                          <div className="text-sm text-muted-foreground">Ended</div>
                          <div className="text-sm font-medium mt-1">{selectedRun.endTime}</div>
                        </div>
                      )}
                      {selectedRun.progress !== undefined && (
                        <div>
                          <div className="text-sm text-muted-foreground">Progress</div>
                          <div className="text-sm font-medium mt-1">{selectedRun.progress}%</div>
                        </div>
                      )}
                    </div>
                    {selectedRun.logs && selectedRun.logs.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Logs</h3>
                        <div className="bg-muted rounded-lg p-3 font-mono text-xs space-y-1">
                          {selectedRun.logs.map((log, i) => (
                            <div key={i}>{log}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No run selected
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    )
  }
)
AgentRun01.displayName = "AgentRun01"

export { AgentRun01 }
