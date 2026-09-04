import * as React from "react"
import { cn } from "@seamless/ui"
import { X } from "lucide-react"

export interface Filter {
  key: string
  label: string
  value: string
  operator?: string
}

export interface FilterBarProps {
  filters: Filter[]
  onRemoveFilter: (key: string) => void
  onClearAll?: () => void
  className?: string
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ filters, onRemoveFilter, onClearAll, className, ...props }, ref) => {
    if (filters.length === 0) return null

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {filters.map((filter) => (
          <div
            key={filter.key}
            className="inline-flex items-center gap-2 rounded-md border bg-muted px-3 py-1.5 text-sm"
          >
            <span className="font-medium">{filter.label}:</span>
            <span className="text-muted-foreground">{filter.value}</span>
            <button
              onClick={() => onRemoveFilter(filter.key)}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {onClearAll && filters.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-sm text-brand hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    )
  }
)
FilterBar.displayName = "FilterBar"

export { FilterBar }
