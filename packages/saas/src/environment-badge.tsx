import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const environmentBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      environment: {
        production: "bg-destructive/10 text-destructive border border-destructive/20",
        staging: "bg-warning/10 text-warning border border-warning/20",
        development: "bg-success/10 text-success border border-success/20",
        preview: "bg-brand/10 text-brand border border-brand/20",
      },
    },
    defaultVariants: {
      environment: "development",
    },
  }
)

export interface EnvironmentBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof environmentBadgeVariants> {
  label?: string
}

const EnvironmentBadge = React.forwardRef<HTMLSpanElement, EnvironmentBadgeProps>(
  ({ environment, label, className, ...props }, ref) => {
    const displayLabel =
      label || (environment ? environment.charAt(0).toUpperCase() + environment.slice(1) : "")

    return (
      <span
        ref={ref}
        className={cn(environmentBadgeVariants({ environment }), className)}
        {...props}
      >
        {displayLabel}
      </span>
    )
  }
)
EnvironmentBadge.displayName = "EnvironmentBadge"

export { EnvironmentBadge, environmentBadgeVariants }
