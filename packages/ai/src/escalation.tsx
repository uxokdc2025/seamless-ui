import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"

export interface EscalationProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  escalatedBy: string
  timestamp?: Date | string
  actions?: React.ReactNode
}

const severityConfig = {
  low: { variant: "outline" as const, color: "text-muted-foreground" },
  medium: { variant: "secondary" as const, color: "text-foreground" },
  high: { variant: "default" as const, color: "text-primary" },
  critical: { variant: "destructive" as const, color: "text-destructive" },
}

const Escalation = React.forwardRef<HTMLDivElement, EscalationProps>(
  (
    {
      className,
      severity,
      title,
      description,
      escalatedBy,
      timestamp,
      actions,
      ...props
    },
    ref
  ) => {
    const config = severityConfig[severity]

    return (
      <Card
        ref={ref}
        className={cn(
          "w-full border-l-4",
          severity === "critical" && "border-l-destructive",
          severity === "high" && "border-l-primary",
          severity === "medium" && "border-l-secondary",
          severity === "low" && "border-l-muted",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className={cn("font-semibold", config.color)}>{title}</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Escalated by {escalatedBy}
                {timestamp && (
                  <>
                    {" · "}
                    {typeof timestamp === "string"
                      ? timestamp
                      : timestamp.toLocaleString()}
                  </>
                )}
              </p>
            </div>
            <Badge variant={config.variant} className="capitalize">
              {severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {description}
          </p>
          {actions && <div className="pt-2">{actions}</div>}
        </CardContent>
      </Card>
    )
  }
)
Escalation.displayName = "Escalation"

export { Escalation }
