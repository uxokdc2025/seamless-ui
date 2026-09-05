import * as React from "react"
import { cn } from "@seamless/ui"
import {
  Sidebar,
  SidebarOverlay,
  SidebarState,
} from "@seamless/layout"

export interface AppShellProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  className?: string
  sidebarState?: SidebarState
  onSidebarStateChange?: (state: SidebarState) => void
  sidebarStorageKey?: string
  sidebarCollapsible?: boolean
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      children,
      sidebar,
      header,
      className,
      sidebarState,
      onSidebarStateChange,
      sidebarStorageKey,
      sidebarCollapsible = true,
      ...props
    },
    ref
  ) => {
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
        <div className="flex h-[calc(100vh-4rem)]">
          {sidebar && (
            <Sidebar
              state={sidebarState}
              onStateChange={onSidebarStateChange}
              storageKey={sidebarStorageKey}
              collapsible={sidebarCollapsible}
            >
              <SidebarOverlay />
              {sidebar}
            </Sidebar>
          )}
          <main
            className={cn(
              "flex-1 overflow-auto p-6",
              !sidebar && "w-full"
            )}
          >
            {children}
          </main>
        </div>
      </div>
    )
  }
)
AppShell.displayName = "AppShell"

export { AppShell }
