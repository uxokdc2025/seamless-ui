import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, CardFooter, Button } from "@seamless/ui"

export interface ApprovalRequestProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  requester: string
  timestamp?: Date | string
  onApprove?: () => void
  onReject?: () => void
  onRequestChanges?: () => void
  approveLabel?: string
  rejectLabel?: string
  requestChangesLabel?: string
}

const ApprovalRequest = React.forwardRef<HTMLDivElement, ApprovalRequestProps>(
  (
    {
      className,
      title,
      description,
      requester,
      timestamp,
      onApprove,
      onReject,
      onRequestChanges,
      approveLabel = "Approve",
      rejectLabel = "Reject",
      requestChangesLabel = "Request Changes",
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn("w-full border-l-4 border-l-warning", className)}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Requested by {requester}
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
            <div className="rounded-full bg-warning/20 px-2 py-1 text-xs font-medium text-warning">
              Approval Required
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {description}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 pt-0">
          {onApprove && (
            <Button onClick={onApprove} variant="default" size="sm">
              {approveLabel}
            </Button>
          )}
          {onRequestChanges && (
            <Button onClick={onRequestChanges} variant="secondary" size="sm">
              {requestChangesLabel}
            </Button>
          )}
          {onReject && (
            <Button onClick={onReject} variant="destructive" size="sm">
              {rejectLabel}
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }
)
ApprovalRequest.displayName = "ApprovalRequest"

export { ApprovalRequest }
