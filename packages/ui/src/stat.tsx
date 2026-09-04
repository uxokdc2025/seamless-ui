import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const statVariants = cva(
  "rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(statVariants({ variant, className }))}
      {...props}
    />
  )
)
Stat.displayName = "Stat"

const StatLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm font-medium text-muted-foreground", className)}
    {...props}
  />
))
StatLabel.displayName = "StatLabel"

const StatValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-3xl font-bold tracking-tight", className)}
    {...props}
  />
))
StatValue.displayName = "StatValue"

const StatChange = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { positive?: boolean }
>(({ className, positive, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm font-medium",
      positive ? "text-success" : "text-error",
      className
    )}
    {...props}
  />
))
StatChange.displayName = "StatChange"

const StatDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
StatDescription.displayName = "StatDescription"

export { Stat, StatLabel, StatValue, StatChange, StatDescription, statVariants }
