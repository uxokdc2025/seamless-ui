import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"
import { ChevronRight } from "lucide-react"

const treeVariants = cva(
  "text-sm",
  {
    variants: {
      spacing: {
        default: "space-y-1",
        tight: "space-y-0.5",
        loose: "space-y-2",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
)

export interface TreeProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof treeVariants> {}

const Tree = React.forwardRef<HTMLUListElement, TreeProps>(
  ({ className, spacing, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn(treeVariants({ spacing, className }))}
      role="tree"
      {...props}
    />
  )
)
Tree.displayName = "Tree"

export interface TreeItemProps extends React.HTMLAttributes<HTMLLIElement> {
  expanded?: boolean
  onToggle?: () => void
  hasChildren?: boolean
  level?: number
}

const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  ({ className, expanded, onToggle, hasChildren, level = 0, children, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(expanded ?? false)

    const handleToggle = () => {
      setIsExpanded(!isExpanded)
      onToggle?.()
    }

    return (
      <li
        ref={ref}
        className={cn("", className)}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        {...props}
      >
        <div className="flex items-center gap-1">
          {hasChildren && (
            <button
              onClick={handleToggle}
              className="inline-flex items-center justify-center h-4 w-4 hover:bg-accent rounded-sm"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </button>
          )}
          {!hasChildren && <span className="w-4" />}
          <div className="flex-1">{children}</div>
        </div>
      </li>
    )
  }
)
TreeItem.displayName = "TreeItem"

export { Tree, TreeItem, treeVariants }
