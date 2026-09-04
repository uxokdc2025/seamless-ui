import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"
import { AgentAvatar } from "./agent-avatar"

export interface AgentHandoffProps extends React.HTMLAttributes<HTMLDivElement> {
  fromAgent: {
    name: string
    imageUrl?: string
  }
  toAgent: {
    name: string
    imageUrl?: string
  }
  context?: string
  timestamp?: Date | string
}

const AgentHandoff = React.forwardRef<HTMLDivElement, AgentHandoffProps>(
  ({ className, fromAgent, toAgent, context, timestamp, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AgentAvatar name={fromAgent.name} imageUrl={fromAgent.imageUrl} size="sm" />
              <div>
                <p className="text-sm font-medium">{fromAgent.name}</p>
                <p className="text-xs text-muted-foreground">Transferring</p>
              </div>
            </div>
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{toAgent.name}</p>
                <p className="text-xs text-muted-foreground">Receiving</p>
              </div>
              <AgentAvatar name={toAgent.name} imageUrl={toAgent.imageUrl} size="sm" />
            </div>
          </div>
        </CardHeader>
        {(context || timestamp) && (
          <CardContent className="pt-0">
            {context && (
              <p className="text-sm text-muted-foreground">{context}</p>
            )}
            {timestamp && (
              <time className="mt-2 block text-xs text-muted-foreground">
                {typeof timestamp === "string"
                  ? timestamp
                  : timestamp.toLocaleString()}
              </time>
            )}
          </CardContent>
        )}
      </Card>
    )
  }
)
AgentHandoff.displayName = "AgentHandoff"

export { AgentHandoff }
