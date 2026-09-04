import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const metricCardVariants = cva(
  "rounded-lg border bg-card p-6 shadow-sm transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        danger: "border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  label: string
  value: string | number
  change?: {
    value: number
    trend: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
  footer?: React.ReactNode
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    { label, value, change, icon, footer, variant, className, ...props },
    ref
  ) => {
    const getTrendIcon = () => {
      if (!change) return null
      switch (change.trend) {
        case "up":
          return <TrendingUp className="h-4 w-4" />
        case "down":
          return <TrendingDown className="h-4 w-4" />
        case "neutral":
          return <Minus className="h-4 w-4" />
      }
    }

    const getTrendColor = () => {
      if (!change) return ""
      switch (change.trend) {
        case "up":
          return "text-success"
        case "down":
          return "text-destructive"
        case "neutral":
          return "text-muted-foreground"
      }
    }

    return (
      <div
        ref={ref}
        className={cn(metricCardVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {change && (
              <div className={cn("flex items-center gap-1 mt-2", getTrendColor())}>
                {getTrendIcon()}
                <span className="text-sm font-medium">
                  {change.value > 0 ? "+" : ""}
                  {change.value}%
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
          )}
        </div>
        {footer && (
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard, metricCardVariants }
