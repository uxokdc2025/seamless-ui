import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"

export interface BlockerProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "dependency" | "needs_input" | "capability" | "transient"
  reason: string
  details?: string
  blockedSince?: Date | string
}

const typeConfig = {
  dependency: {
    label: "Dependency",
    variant: "secondary" as const,
    icon: "🔗",
  },
  needs_input: {
    label: "Needs Input",
    variant: "default" as const,
    icon: "❓",
  },
  capability: {
    label: "Capability",
    variant: "destructive" as const,
    icon: "🚫",
  },
  transient: {
    label: "Transient",
    variant: "outline" as const,
    icon: "⚠️",
  },
}

const Blocker = React.forwardRef<HTMLDivElement, BlockerProps>(
  ({ className, type, reason, details, blockedSince, ...props }, ref) => {
    const config = typeConfig[type]

    return (
      <Card
        ref={ref}
        className={cn("w-full border-l-4 border-l-warning", className)}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{config.icon}</span>
              <h3 className="font-semibold">Blocker</h3>
            </div>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div>
            <p className="text-sm font-medium">Reason:</p>
            <p className="mt-1 text-sm text-muted-foreground">{reason}</p>
          </div>
          {details && (
            <div>
              <p className="text-sm font-medium">Details:</p>
              <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                {details}
              </p>
            </div>
          )}
          {blockedSince && (
            <div className="pt-2 text-xs text-muted-foreground">
              Blocked since:{" "}
              {typeof blockedSince === "string"
                ? blockedSince
                : blockedSince.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
Blocker.displayName = "Blocker"

export { Blocker }
