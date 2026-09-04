import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const usageMeterVariants = cva(
  "rounded-lg border bg-card p-4 space-y-3",
  {
    variants: {
      variant: {
        default: "border-border",
        warning: "border-warning/20 bg-warning/5",
        danger: "border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface UsageMeterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof usageMeterVariants> {
  label: string
  current: number
  limit: number
  unit?: string
  description?: string
}

const UsageMeter = React.forwardRef<HTMLDivElement, UsageMeterProps>(
  (
    { label, current, limit, unit, description, variant, className, ...props },
    ref
  ) => {
    const percentage = Math.min((current / limit) * 100, 100)
    const isWarning = percentage >= 80 && percentage < 95
    const isDanger = percentage >= 95

    const displayVariant = variant || (isDanger ? "danger" : isWarning ? "warning" : "default")

    return (
      <div
        ref={ref}
        className={cn(usageMeterVariants({ variant: displayVariant }), className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-medium">{label}</h4>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">
              {current.toLocaleString()}
              {unit && ` ${unit}`}
            </div>
            <div className="text-xs text-muted-foreground">
              of {limit.toLocaleString()}
              {unit && ` ${unit}`}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isDanger
                  ? "bg-destructive"
                  : isWarning
                  ? "bg-warning"
                  : "bg-brand"
              )}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage.toFixed(1)}% used</span>
            <span>{(limit - current).toLocaleString()} remaining</span>
          </div>
        </div>
      </div>
    )
  }
)
UsageMeter.displayName = "UsageMeter"

export { UsageMeter, usageMeterVariants }
