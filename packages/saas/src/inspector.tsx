import * as React from "react"
import { cn } from "@seamless/ui"

export interface InspectorItem {
  label: string
  value: React.ReactNode
  type?: "text" | "badge" | "custom"
}

export interface InspectorProps {
  items: InspectorItem[]
  title?: string
  className?: string
}

const Inspector = React.forwardRef<HTMLDivElement, InspectorProps>(
  ({ items, title, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-3 rounded-lg border bg-card p-4", className)}
        {...props}
      >
        {title && (
          <h3 className="font-semibold text-sm border-b pb-2">{title}</h3>
        )}
        <dl className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between gap-4">
              <dt className="text-sm text-muted-foreground flex-shrink-0">
                {item.label}
              </dt>
              <dd className="text-sm font-medium text-right truncate">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }
)
Inspector.displayName = "Inspector"

export { Inspector }
