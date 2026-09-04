import * as React from "react"
import { cn } from "@seamless/ui"

export interface AppHeaderProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  className?: string
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ left, center, right, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-surface",
          "flex items-center justify-between gap-4 px-4 py-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">{left}</div>
        {center && <div className="flex items-center gap-4">{center}</div>}
        <div className="flex items-center gap-4 flex-shrink-0">{right}</div>
      </header>
    )
  }
)
AppHeader.displayName = "AppHeader"

export { AppHeader }
