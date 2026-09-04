import * as React from "react"
import { cn } from "@seamless/ui"
import { useSidebar } from "@seamless/layout"

export interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  icon?: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  collapsible?: boolean
}

const NavGroup = React.forwardRef<HTMLDivElement, NavGroupProps>(
  (
    {
      label,
      icon,
      children,
      defaultOpen = false,
      collapsible = true,
      className,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar()
    const [isOpen, setIsOpen] = React.useState(defaultOpen)
    const isCollapsed = state === "collapsed"
    const groupId = React.useId()

    const handleToggle = () => {
      if (collapsible && !isCollapsed) {
        setIsOpen(!isOpen)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleToggle()
      }
    }

    if (isCollapsed) {
      return (
        <div ref={ref} className={cn("py-1", className)} {...props}>
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {label && (
          <div
            role={collapsible ? "button" : undefined}
            tabIndex={collapsible ? 0 : undefined}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            aria-expanded={collapsible ? isOpen : undefined}
            aria-controls={collapsible ? groupId : undefined}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-muted",
              collapsible && [
                "cursor-pointer rounded-md transition-colors hover:bg-interactive-hover hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              ]
            )}
          >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="flex-1 truncate">{label}</span>
            {collapsible && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                  "flex-shrink-0 transition-transform",
                  isOpen && "rotate-90"
                )}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            )}
          </div>
        )}
        <div
          id={collapsible ? groupId : undefined}
          className={cn(
            "mt-1 space-y-0.5",
            collapsible && !isOpen && "hidden"
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)
NavGroup.displayName = "NavGroup"

export { NavGroup }
