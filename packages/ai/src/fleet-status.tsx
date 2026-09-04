import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"

export interface FleetStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  totalAgents: number
  activeAgents: number
  idleAgents: number
  errorAgents: number
  showBreakdown?: boolean
}

const FleetStatus = React.forwardRef<HTMLDivElement, FleetStatusProps>(
  (
    {
      className,
      totalAgents,
      activeAgents,
      idleAgents,
      errorAgents,
      showBreakdown = true,
      ...props
    },
    ref
  ) => {
    const offlineAgents = totalAgents - activeAgents - idleAgents - errorAgents

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <h3 className="font-semibold">Fleet Status</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Agents</span>
            <span className="text-2xl font-bold">{totalAgents}</span>
          </div>
          {showBreakdown && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span>Active</span>
                </div>
                <span className="font-medium">{activeAgents}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  <span>Idle</span>
                </div>
                <span className="font-medium">{idleAgents}</span>
              </div>
              {errorAgents > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span>Error</span>
                  </div>
                  <span className="font-medium">{errorAgents}</span>
                </div>
              )}
              {offlineAgents > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted" />
                    <span>Offline</span>
                  </div>
                  <span className="font-medium">{offlineAgents}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
FleetStatus.displayName = "FleetStatus"

export { FleetStatus }
