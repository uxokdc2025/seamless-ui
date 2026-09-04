import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const columnsVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
      12: "grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12",
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
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
    align: "stretch",
  },
})

export interface ColumnsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof columnsVariants> {
  /**
   * Minimum column width for auto-fit (e.g. "250px", "15rem")
   * When set, overrides the cols variant with auto-fit responsive behavior
   */
  minWidth?: string
}

const Columns = React.forwardRef<HTMLDivElement, ColumnsProps>(
  ({ className, cols, gap, align, minWidth, style, ...props }, ref) => {
    const autoFitStyle = minWidth
      ? {
          ...style,
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minWidth}, 100%), 1fr))`,
        }
      : style

    return (
      <div
        ref={ref}
        className={cn(columnsVariants({ cols: minWidth ? undefined : cols, gap, align, className }))}
        style={autoFitStyle}
        {...props}
      />
    )
  }
)
Columns.displayName = "Columns"

export { Columns, columnsVariants }
