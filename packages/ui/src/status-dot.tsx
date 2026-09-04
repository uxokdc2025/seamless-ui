import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const statusDotVariants = cva(
  "inline-flex h-2 w-2 rounded-full",
  {
    variants: {
      variant: {
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
        neutral: "bg-muted-foreground",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      pulse: false,
    },
  }
)

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {}

const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, variant, pulse, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusDotVariants({ variant, pulse, className }))}
        {...props}
      />
    )
  }
)
StatusDot.displayName = "StatusDot"

export { StatusDot, statusDotVariants }
