import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const circularProgressVariants = cva(
  "relative inline-flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "h-16 w-16",
        default: "h-24 w-24",
        lg: "h-32 w-32",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circularProgressVariants> {
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "error"
  showValue?: boolean
  strokeWidth?: number
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    size, 
    value = 0, 
    max = 100, 
    variant = "default",
    showValue = true,
    strokeWidth = 8,
    ...props 
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const radius = 50 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const colors = {
      default: "stroke-primary",
      success: "stroke-success",
      warning: "stroke-warning",
      error: "stroke-error",
    }

    return (
      <div
        ref={ref}
        className={cn(circularProgressVariants({ size, className }))}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <circle
            className="stroke-secondary"
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className={cn("transition-all duration-300", colors[variant])}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {showValue && (
          <span className="absolute text-sm font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = "CircularProgress"

export { CircularProgress, circularProgressVariants }
