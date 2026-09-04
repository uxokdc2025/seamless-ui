import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const metricVariants = cva(
  "flex items-baseline gap-2",
  {
    variants: {
      size: {
        sm: "text-2xl",
        default: "text-4xl",
        lg: "text-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface MetricProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricVariants> {
  value: string | number
  unit?: string
}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ className, size, value, unit, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(metricVariants({ size, className }))}
      {...props}
    >
      <span className="font-bold tracking-tight">{value}</span>
      {unit && <span className="text-base text-muted-foreground">{unit}</span>}
    </div>
  )
)
Metric.displayName = "Metric"

export { Metric, metricVariants }
