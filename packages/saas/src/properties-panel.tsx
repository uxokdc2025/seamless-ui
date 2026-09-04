import * as React from "react"
import { cn } from "@seamless/ui"

export interface PropertiesPanelProps {
  title?: string
  sections: Array<{
    label: string
    content: React.ReactNode
  }>
  footer?: React.ReactNode
  className?: string
}

const PropertiesPanel = React.forwardRef<HTMLDivElement, PropertiesPanelProps>(
  ({ title = "Properties", sections, footer, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border bg-card",
          className
        )}
        {...props}
      >
        {title && (
          <div className="flex-shrink-0 border-b px-4 py-3">
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                {section.label}
              </h4>
              <div>{section.content}</div>
            </div>
          ))}
        </div>
        {footer && (
          <div className="flex-shrink-0 border-t px-4 py-3">{footer}</div>
        )}
      </div>
    )
  }
)
PropertiesPanel.displayName = "PropertiesPanel"

export { PropertiesPanel }
