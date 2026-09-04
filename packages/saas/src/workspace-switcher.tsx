import * as React from "react"
import { cn } from "@seamless/ui"
import { Check, ChevronsUpDown } from "lucide-react"

export interface Workspace {
  id: string
  name: string
  avatar?: string
  role?: string
}

export interface WorkspaceSwitcherProps {
  workspaces: Workspace[]
  currentWorkspace: string
  onWorkspaceChange: (workspaceId: string) => void
  className?: string
}

const WorkspaceSwitcher = React.forwardRef<HTMLDivElement, WorkspaceSwitcherProps>(
  ({ workspaces, currentWorkspace, onWorkspaceChange, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const current = workspaces.find((w) => w.id === currentWorkspace)

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm",
            "hover:bg-interactive-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {current?.avatar && (
            <div className="h-6 w-6 rounded bg-muted flex items-center justify-center text-xs font-semibold">
              {current.avatar}
            </div>
          )}
          <div className="flex-1 text-left truncate">
            <div className="font-medium">{current?.name}</div>
            {current?.role && (
              <div className="text-xs text-muted-foreground">{current.role}</div>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              className={cn(
                "absolute left-0 right-0 top-full z-50 mt-1",
                "rounded-md border bg-popover p-1 shadow-md",
                "animate-in fade-in-0 zoom-in-95"
              )}
              role="listbox"
            >
              {workspaces.map((workspace) => (
                <button
                  key={workspace.id}
                  onClick={() => {
                    onWorkspaceChange(workspace.id)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                    "hover:bg-interactive-hover transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  role="option"
                  aria-selected={workspace.id === currentWorkspace}
                >
                  {workspace.avatar && (
                    <div className="h-6 w-6 rounded bg-muted flex items-center justify-center text-xs font-semibold">
                      {workspace.avatar}
                    </div>
                  )}
                  <div className="flex-1 text-left truncate">
                    <div className="font-medium">{workspace.name}</div>
                    {workspace.role && (
                      <div className="text-xs text-muted-foreground">{workspace.role}</div>
                    )}
                  </div>
                  {workspace.id === currentWorkspace && (
                    <Check className="h-4 w-4 text-brand" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)
WorkspaceSwitcher.displayName = "WorkspaceSwitcher"

export { WorkspaceSwitcher }
