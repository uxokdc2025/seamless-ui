import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        error: "border-transparent bg-error text-error-foreground",
        info: "border-transparent bg-info text-info-foreground",
        neutral: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, variant, dot = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statusBadgeVariants({ variant }), className)}
        {...props}
      >
        {dot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        )}
        {children}
      </div>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge, statusBadgeVariants }
