import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3", 
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      8: "grid-cols-8",
      12: "grid-cols-12",
      auto: "grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]",
      "auto-sm": "grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))]",
      "auto-lg": "grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))]",
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
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
  },
  defaultVariants: {
    cols: "auto",
    gap: "md",
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Custom minimum column width for auto-fit (e.g. "250px", "15rem")
   */
  minColWidth?: string
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, justify, minColWidth, style, ...props }, ref) => {
    const autoFitStyle = minColWidth
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColWidth}, 100%), 1fr))`,
        }
      : style

    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols: minColWidth ? undefined : cols, gap, align, justify, className }))}
        style={autoFitStyle}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid, gridVariants }