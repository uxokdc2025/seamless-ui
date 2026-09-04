import * as React from "react"
import { cn } from "@seamless/ui"
import { MoreVertical } from "lucide-react"

export interface DataToolbarProps {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  actions?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: "default" | "primary" | "danger"
  }>
  className?: string
}

const DataToolbar = React.forwardRef<HTMLDivElement, DataToolbarProps>(
  ({ left, center, right, actions, className, ...props }, ref) => {
    const [showActions, setShowActions] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border bg-card p-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">{left}</div>
        {center && <div className="flex items-center gap-3">{center}</div>}
        <div className="flex items-center gap-3 flex-shrink-0">
          {right}
          {actions && actions.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="rounded-md p-1.5 hover:bg-interactive-hover"
                aria-label="More actions"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
              {showActions && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowActions(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border bg-popover p-1 shadow-md">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          action.onClick()
                          setShowActions(false)
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm",
                          "hover:bg-interactive-hover transition-colors",
                          action.variant === "danger" && "text-destructive hover:bg-destructive/10",
                          action.variant === "primary" && "text-brand"
                        )}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
DataToolbar.displayName = "DataToolbar"

export { DataToolbar }
