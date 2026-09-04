import * as React from "react"
import { cn } from "./lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center p-12 space-y-4",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="text-muted-foreground opacity-50">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground max-w-md">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
