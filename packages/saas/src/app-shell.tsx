import * as React from "react"
import { cn } from "@seamless/ui"

export interface AppShellProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ children, sidebar, header, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-screen bg-background", className)}
        {...props}
      >
        {header && (
          <header className="border-b border-border bg-surface px-6 py-4">
            {header}
          </header>
        )}
        <div className="flex">
          {sidebar && (
            <aside className="w-64 border-r border-border bg-surface p-4">
              {sidebar}
            </aside>
          )}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    )
  }
)
AppShell.displayName = "AppShell"

export { AppShell }