import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const sidebarLayoutVariants = cva("grid", {
  variants: {
    sidebarWidth: {
      sm: "[grid-template-columns:200px_1fr]",
      md: "[grid-template-columns:250px_1fr]",
      lg: "[grid-template-columns:300px_1fr]",
      xl: "[grid-template-columns:350px_1fr]",
    },
    sidebarPosition: {
      left: "",
      right: "[grid-template-columns:1fr_var(--sidebar-width)]",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    // Responsive behavior
    collapsible: {
      true: "grid-cols-1 lg:grid-cols-[var(--sidebar-width)_1fr]",
      false: "",
    },
  },
  defaultVariants: {
    sidebarWidth: "md",
    sidebarPosition: "left",
    gap: "none",
    collapsible: false,
  },
})

export interface SidebarLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarLayoutVariants> {
  /**
   * Custom sidebar width (e.g., "280px", "20rem")
   */
  customWidth?: string
}

const SidebarLayout = React.forwardRef<HTMLDivElement, SidebarLayoutProps>(
  ({ className, sidebarWidth, sidebarPosition, gap, collapsible, customWidth, style, children, ...props }, ref) => {
    const customStyle = customWidth
      ? {
          ...style,
          "--sidebar-width": customWidth,
          gridTemplateColumns:
            sidebarPosition === "right" ? `1fr ${customWidth}` : `${customWidth} 1fr`,
        }
      : style

    return (
      <div
        ref={ref}
        className={cn(
          sidebarLayoutVariants({
            sidebarWidth: customWidth ? undefined : sidebarWidth,
            sidebarPosition: customWidth ? undefined : sidebarPosition,
            gap,
            collapsible,
            className,
          })
        )}
        style={customStyle as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarLayout.displayName = "SidebarLayout"

const SidebarLayoutSidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn("overflow-y-auto", className)}
      {...props}
    />
  )
})
SidebarLayoutSidebar.displayName = "SidebarLayoutSidebar"

const SidebarLayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn("overflow-y-auto", className)}
      {...props}
    />
  )
})
SidebarLayoutContent.displayName = "SidebarLayoutContent"

export { SidebarLayout, SidebarLayoutSidebar, SidebarLayoutContent, sidebarLayoutVariants }
