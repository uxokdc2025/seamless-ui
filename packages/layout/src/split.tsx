import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const splitVariants = cva("flex", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    gap: "md",
    align: "center",
    justify: "between",
  },
})

export interface SplitProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitVariants> {}

/**
 * Split: Distributes children along a main axis with flexible justification.
 * Common for header bars, toolbar layouts with left/right alignment.
 */
const Split = React.forwardRef<HTMLDivElement, SplitProps>(
  ({ className, direction, gap, align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(splitVariants({ direction, gap, align, justify, className }))}
        {...props}
      />
    )
  }
)
Split.displayName = "Split"

export { Split, splitVariants }
