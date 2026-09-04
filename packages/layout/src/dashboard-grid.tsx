import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const dashboardGridVariants = cva("grid gap-4", {
  variants: {
    layout: {
      "1-col": "grid-cols-1",
      "2-col": "grid-cols-1 lg:grid-cols-2",
      "3-col": "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
      "4-col": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      "sidebar-main": "grid-cols-1 lg:grid-cols-[300px_1fr]",
      "main-sidebar": "grid-cols-1 lg:grid-cols-[1fr_300px]",
      "sidebar-main-sidebar": "grid-cols-1 lg:grid-cols-[250px_1fr_250px]",
      "auto-fit": "[grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]",
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
    dense: {
      true: "auto-rows-min",
      false: "",
    },
  },
  defaultVariants: {
    layout: "auto-fit",
    gap: "md",
    dense: false,
  },
})

export interface DashboardGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dashboardGridVariants> {}

/**
 * DashboardGrid: Responsive grid layout optimized for dashboard layouts with widgets, cards, and panels.
 * Supports common dashboard patterns: metrics grids, sidebar + main content, 3-column layouts.
 */
const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ className, layout, gap, dense, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(dashboardGridVariants({ layout, gap, dense, className }))}
        {...props}
      />
    )
  }
)
DashboardGrid.displayName = "DashboardGrid"

/**
 * DashboardGridItem: Grid item with optional span configuration.
 */
export interface DashboardGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column span (responsive breakpoints supported via Tailwind)
   */
  colSpan?: number
  /**
   * Row span
   */
  rowSpan?: number
}

const DashboardGridItem = React.forwardRef<HTMLDivElement, DashboardGridItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{
          ...style,
          gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
          gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
        }}
        {...props}
      />
    )
  }
)
DashboardGridItem.displayName = "DashboardGridItem"

export { DashboardGrid, DashboardGridItem, dashboardGridVariants }
