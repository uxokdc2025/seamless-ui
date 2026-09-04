import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const timelineVariants = cva(
  "relative space-y-8 before:absolute before:inset-0 before:ml-3 before:h-full before:w-0.5 before:bg-border",
  {
    variants: {
      align: {
        left: "",
        center: "before:left-1/2 before:-translate-x-1/2",
        right: "before:right-0",
      },
    },
    defaultVariants: {
      align: "left",
    },
  }
)

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, align, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(timelineVariants({ align, className }))}
      {...props}
    />
  )
)
Timeline.displayName = "Timeline"

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info"
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const dotColors = {
      default: "bg-border",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
      info: "bg-info",
    }

    return (
      <div ref={ref} className={cn("relative flex gap-4", className)} {...props}>
        <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
          <div className={cn("h-3 w-3 rounded-full ring-4 ring-background", dotColors[variant])} />
        </div>
        <div className="flex-1 space-y-1">{children}</div>
      </div>
    )
  }
)
TimelineItem.displayName = "TimelineItem"

const TimelineTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold leading-none", className)}
    {...props}
  />
))
TimelineTitle.displayName = "TimelineTitle"

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TimelineDescription.displayName = "TimelineDescription"

const TimelineTime = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
TimelineTime.displayName = "TimelineTime"

export { Timeline, TimelineItem, TimelineTitle, TimelineDescription, TimelineTime, timelineVariants }
