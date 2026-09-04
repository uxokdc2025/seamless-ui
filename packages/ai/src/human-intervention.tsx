import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"

export interface HumanInterventionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reason: string
  details?: string
  requestedBy: string
  timestamp?: Date | string
  actions?: React.ReactNode
}

const HumanIntervention = React.forwardRef<
  HTMLDivElement,
  HumanInterventionProps
>(
  (
    { className, reason, details, requestedBy, timestamp, actions, ...props },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "w-full border-l-4 border-l-destructive bg-destructive/5",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-destructive"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <h3 className="font-semibold text-destructive">
                  Human Intervention Required
                </h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Requested by {requestedBy}
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
          {actions && <div className="pt-2">{actions}</div>}
        </CardContent>
      </Card>
    )
  }
)
HumanIntervention.displayName = "HumanIntervention"

export { HumanIntervention }
