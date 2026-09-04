import * as React from "react"
import { cn } from "@seamless/ui"
import { useSidebar } from "@seamless/layout"

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode
  label: string
  badge?: React.ReactNode
  active?: boolean
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  disabled?: boolean
  tooltip?: string
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    {
      icon,
      label,
      badge,
      active = false,
      href = "#",
      onClick,
      disabled = false,
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar()
    const [showTooltip, setShowTooltip] = React.useState(false)
    const isCollapsed = state === "collapsed"

    return (
      <div className="relative">
        <a
          ref={ref}
          href={disabled ? undefined : href}
          onClick={disabled ? undefined : onClick}
          onMouseEnter={() => isCollapsed && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={cn(
            "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            !disabled && !active && [
              "text-foreground-muted hover:bg-interactive-hover hover:text-foreground",
            ],
            active && [
              "bg-interactive-active text-foreground",
              "before:absolute before:inset-y-1 before:left-0 before:w-1 before:rounded-full before:bg-brand",
            ],
            disabled && "pointer-events-none opacity-50",
            isCollapsed && "justify-center px-2",
            className
          )}
          aria-current={active ? "page" : undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          {icon && (
            <span className={cn("flex-shrink-0", isCollapsed ? "text-lg" : "text-base")}>
              {icon}
            </span>
          )}
          {!isCollapsed && (
            <>
              <span className="flex-1 truncate">{label}</span>
              {badge && <span className="flex-shrink-0">{badge}</span>}
            </>
          )}
        </a>

        {/* Tooltip for collapsed state */}
        {isCollapsed && showTooltip && (tooltip || label) && (
          <div
            className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
            role="tooltip"
          >
            {tooltip || label}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
          </div>
        )}
      </div>
    )
  }
)
NavItem.displayName = "NavItem"

export { NavItem }
