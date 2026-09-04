import * as React from "react"
import { cn } from "@seamless/ui"
import { Search as SearchIcon, X } from "lucide-react"

export interface SearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onClear?: () => void
  containerClassName?: string
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, containerClassName, onClear, value, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ""

    return (
      <div className={cn("relative", containerClassName)}>
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background",
            "pl-9 pr-9 py-2 text-sm",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Search.displayName = "Search"

export { Search }
