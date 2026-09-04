import * as React from "react"
import { cn } from "@seamless/ui"

export interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

const SettingsSection = React.forwardRef<HTMLDivElement, SettingsSectionProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-lg border bg-card p-6", className)}
        {...props}
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    )
  }
)
SettingsSection.displayName = "SettingsSection"

export { SettingsSection }
