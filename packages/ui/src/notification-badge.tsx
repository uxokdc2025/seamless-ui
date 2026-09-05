import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const notificationBadgeVariants = cva(
  "pointer-events-none absolute z-10 inline-flex items-center justify-center rounded-full font-semibold leading-none tabular-nums ring-2 ring-background",
  {
    variants: {
      variant: {
        destructive: "bg-destructive text-destructive-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        neutral: "bg-muted-foreground text-background",
      },
      placement: {
        "top-right": "right-0 top-0 -translate-y-1/2 translate-x-1/2",
        "top-left": "left-0 top-0 -translate-y-1/2 -translate-x-1/2",
        "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
        "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
      },
    },
    defaultVariants: {
      variant: "destructive",
      placement: "top-right",
    },
  }
)

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof notificationBadgeVariants> {
  /** Numeric count to display. Ignored when `dot` is true. */
  count?: number
  /** Render a plain dot instead of a count. */
  dot?: boolean
  /** Maximum count before showing `{max}+`. */
  max?: number
  /** Show the badge even when count is 0. */
  showZero?: boolean
  /** The element the badge is anchored to (icon, avatar, button). */
  children: React.ReactNode
  /** Class names for the overlaid badge element. */
  badgeClassName?: string
}

const NotificationBadge = React.forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(
  (
    {
      className,
      badgeClassName,
      children,
      count,
      dot = false,
      max = 99,
      showZero = false,
      variant,
      placement,
      ...props
    },
    ref
  ) => {
    const numeric = count ?? 0
    const visible = dot || numeric > 0 || (numeric === 0 && showZero)
    const content = dot ? null : numeric > max ? `${max}+` : `${numeric}`

    return (
      <span
        ref={ref}
        className={cn("relative inline-flex", className)}
        {...props}
      >
        {children}
        {visible && (
          <span
            aria-hidden="true"
            className={cn(
              notificationBadgeVariants({ variant, placement }),
              dot
                ? "h-2.5 w-2.5"
                : "h-[18px] min-w-[18px] px-1 text-[10px]",
              badgeClassName
            )}
          >
            {content}
          </span>
        )}
      </span>
    )
  }
)
NotificationBadge.displayName = "NotificationBadge"

export { NotificationBadge, notificationBadgeVariants }
