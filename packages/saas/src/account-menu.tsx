import * as React from "react"
import { cn } from "@seamless/ui"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"

export interface AccountMenuProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  onSignOut?: () => void
  onProfile?: () => void
  onSettings?: () => void
  menuItems?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: "default" | "danger"
  }>
  className?: string
}

const AccountMenu = React.forwardRef<HTMLDivElement, AccountMenuProps>(
  (
    {
      user,
      onSignOut,
      onProfile,
      onSettings,
      menuItems = [],
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)

    const defaultItems = [
      ...(onProfile
        ? [
            {
              label: "Profile",
              icon: <User className="h-4 w-4" />,
              onClick: onProfile,
              variant: "default" as const,
            },
          ]
        : []),
      ...(onSettings
        ? [
            {
              label: "Settings",
              icon: <Settings className="h-4 w-4" />,
              onClick: onSettings,
              variant: "default" as const,
            },
          ]
        : []),
      ...menuItems,
      ...(onSignOut
        ? [
            {
              label: "Sign out",
              icon: <LogOut className="h-4 w-4" />,
              onClick: onSignOut,
              variant: "danger" as const,
            },
          ]
        : []),
    ]

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2",
            "hover:bg-interactive-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
            {user.avatar || user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="font-medium text-sm truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              className={cn(
                "absolute bottom-full left-0 right-0 z-50 mb-1",
                "rounded-md border bg-popover p-1 shadow-md",
                "animate-in fade-in-0 zoom-in-95"
              )}
              role="menu"
            >
              {defaultItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick()
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm",
                    "transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    item.variant === "danger"
                      ? "text-destructive hover:bg-destructive/10"
                      : "hover:bg-interactive-hover"
                  )}
                  role="menuitem"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)
AccountMenu.displayName = "AccountMenu"

export { AccountMenu }
