import * as React from "react"
import { cn } from "@seamless/ui"

export interface SidebarNavigationProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const SidebarNavigation = React.forwardRef<HTMLDivElement, SidebarNavigationProps>(
  ({ children, header, footer, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-full flex-col overflow-hidden", className)}
        {...props}
      >
        {header && (
          <div className="flex-shrink-0 border-b border-border px-3 py-4">
            {header}
          </div>
        )}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {children}
        </nav>
        {footer && (
          <div className="flex-shrink-0 border-t border-border px-3 py-4">
            {footer}
          </div>
        )}
      </div>
    )
  }
)
SidebarNavigation.displayName = "SidebarNavigation"

export { SidebarNavigation }
