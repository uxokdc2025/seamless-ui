import * as React from "react"
import { cn } from "@seamless/ui"
import { Command } from "lucide-react"

export interface CommandItem {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  onSelect: () => void
  category?: string
}

export interface CommandCenterProps {
  items: CommandItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  className?: string
}

const CommandCenter = React.forwardRef<HTMLDivElement, CommandCenterProps>(
  (
    {
      items,
      open,
      onOpenChange,
      placeholder = "Type a command or search...",
      className,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const filteredItems = React.useMemo(() => {
      if (!search) return items
      const query = search.toLowerCase()
      return items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query)
      )
    }, [items, search])

    const groupedItems = React.useMemo(() => {
      const groups = new Map<string, CommandItem[]>()
      filteredItems.forEach((item) => {
        const category = item.category || "Commands"
        if (!groups.has(category)) {
          groups.set(category, [])
        }
        groups.get(category)!.push(item)
      })
      return groups
    }, [filteredItems])

    React.useEffect(() => {
      if (open) {
        inputRef.current?.focus()
        setSearch("")
      }
    }, [open])

    if (!open) return null

    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />
        <div
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-2xl max-h-[80vh]",
            "rounded-lg border bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            className
          )}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <div className="flex items-center border-b px-4">
            <Command className="h-5 w-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "flex h-14 w-full bg-transparent px-4 py-3 text-sm outline-none",
                "placeholder:text-muted-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {groupedItems.size === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              Array.from(groupedItems).map(([category, categoryItems]) => (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {category}
                  </div>
                  {categoryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.onSelect()
                        onOpenChange(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-2 py-2.5",
                        "hover:bg-interactive-hover transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      {item.icon && (
                        <div className="flex-shrink-0 text-muted-foreground">
                          {item.icon}
                        </div>
                      )}
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-sm font-medium">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.shortcut && (
                        <div className="flex gap-1 flex-shrink-0">
                          {item.shortcut.map((key, i) => (
                            <kbd
                              key={i}
                              className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </>
    )
  }
)
CommandCenter.displayName = "CommandCenter"

export { CommandCenter }
