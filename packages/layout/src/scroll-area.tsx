import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const scrollAreaVariants = cva("relative overflow-hidden", {
  variants: {
    orientation: {
      vertical: "overflow-y-auto",
      horizontal: "overflow-x-auto",
      both: "overflow-auto",
    },
    hideScrollbar: {
      true: "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    hideScrollbar: false,
  },
})

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollAreaVariants> {
  /**
   * Custom scrollbar styling
   */
  scrollbarClassName?: string
}

/**
 * ScrollArea: Customizable scrollable container with optional scrollbar styling.
 * Supports vertical, horizontal, or both scroll directions.
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, orientation, hideScrollbar, scrollbarClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          scrollAreaVariants({ orientation, hideScrollbar, className }),
          scrollbarClassName
        )}
        {...props}
      />
    )
  }
)
ScrollArea.displayName = "ScrollArea"

/**
 * ScrollAreaViewport: Inner viewport for scroll content.
 */
const ScrollAreaViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("h-full w-full", className)}
      {...props}
    />
  )
})
ScrollAreaViewport.displayName = "ScrollAreaViewport"

export { ScrollArea, ScrollAreaViewport, scrollAreaVariants }
