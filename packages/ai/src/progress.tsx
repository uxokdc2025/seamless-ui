import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  total: number
  label?: string
  showPercentage?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    { className, current, total, label, showPercentage = true, ...props },
    ref
  ) => {
    const percentage = Math.round((current / total) * 100)

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{label || "Progress"}</span>
              <span className="text-muted-foreground">
                {current} / {total}
                {showPercentage && ` (${percentage}%)`}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
