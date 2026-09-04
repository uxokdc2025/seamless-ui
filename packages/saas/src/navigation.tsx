import * as React from "react"
import { cn } from "@seamless/ui"

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("space-y-1", className)}
        aria-label="Main navigation"
        {...props}
      >
        {children}
      </nav>
    )
  }
)
Navigation.displayName = "Navigation"

export { Navigation }
