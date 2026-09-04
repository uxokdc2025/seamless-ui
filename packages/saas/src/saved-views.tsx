import * as React from "react"
import { cn } from "@seamless/ui"
import { Check, Star } from "lucide-react"

export interface SavedView {
  id: string
  name: string
  filters: Record<string, any>
  isDefault?: boolean
  isStarred?: boolean
}

export interface SavedViewsProps {
  views: SavedView[]
  currentView?: string
  onViewChange: (viewId: string) => void
  onSaveView?: (name: string) => void
  onDeleteView?: (viewId: string) => void
  onToggleStar?: (viewId: string) => void
  className?: string
}

const SavedViews = React.forwardRef<HTMLDivElement, SavedViewsProps>(
  (
    {
      views,
      currentView,
      onViewChange,
      onSaveView,
      onDeleteView,
      onToggleStar,
      className,
      ...props
    },
    ref
  ) => {
    const [showSaveDialog, setShowSaveDialog] = React.useState(false)
    const [viewName, setViewName] = React.useState("")

    const handleSave = () => {
      if (viewName.trim() && onSaveView) {
        onSaveView(viewName.trim())
        setViewName("")
        setShowSaveDialog(false)
      }
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Saved Views</h4>
          {onSaveView && (
            <button
              onClick={() => setShowSaveDialog(true)}
              className="text-xs text-brand hover:underline"
            >
              Save current
            </button>
          )}
        </div>

        <div className="space-y-1">
          {views.map((view) => (
            <div
              key={view.id}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                "hover:bg-interactive-hover transition-colors cursor-pointer",
                view.id === currentView && "bg-interactive-active"
              )}
              onClick={() => onViewChange(view.id)}
            >
              {onToggleStar && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleStar(view.id)
                  }}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={view.isStarred ? "Unstar view" : "Star view"}
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      view.isStarred && "fill-current text-warning"
                    )}
                  />
                </button>
              )}
              <span className="flex-1 truncate">
                {view.name}
                {view.isDefault && (
                  <span className="ml-2 text-xs text-muted-foreground">(default)</span>
                )}
              </span>
              {view.id === currentView && <Check className="h-4 w-4 text-brand" />}
            </div>
          ))}
        </div>

        {showSaveDialog && (
          <div className="rounded-md border bg-muted p-3 space-y-2">
            <input
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              placeholder="View name"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={!viewName.trim()}
                className="flex-1 rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-brand-foreground hover:bg-brand/90 disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setViewName("")
                }}
                className="flex-1 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
SavedViews.displayName = "SavedViews"

export { SavedViews }
