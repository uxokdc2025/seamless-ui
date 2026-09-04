import * as React from "react"
import { cn } from "@seamless/ui"
import { Bell, X } from "lucide-react"

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  avatar?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDismiss?: (id: string) => void
  unreadCount?: number
  className?: string
}

const NotificationCenter = React.forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      notifications,
      onMarkAsRead,
      onMarkAllAsRead,
      onDismiss,
      unreadCount,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const count = unreadCount ?? notifications.filter((n) => !n.read).length

    const formatTime = (date: Date) => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diff < 60) return "just now"
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
      return `${Math.floor(diff / 86400)}d ago`
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "relative rounded-md p-2",
            "hover:bg-interactive-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Notifications"
          aria-expanded={open}
        >
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span
              className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
              aria-label={`${count} unread notifications`}
            >
              {count > 9 ? "9+" : count}
            </span>
          )}
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
                "absolute right-0 top-full z-50 mt-2",
                "w-96 max-h-[32rem] overflow-hidden",
                "rounded-lg border bg-popover shadow-lg",
                "animate-in fade-in-0 zoom-in-95"
              )}
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h3 className="font-semibold text-sm">Notifications</h3>
                {count > 0 && onMarkAllAsRead && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-xs text-brand hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-[28rem] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "relative border-b px-4 py-3 hover:bg-interactive-hover transition-colors",
                        !notification.read && "bg-muted/50"
                      )}
                    >
                      <div className="flex gap-3">
                        {notification.avatar && (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {notification.avatar}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium">{notification.title}</h4>
                            {onDismiss && (
                              <button
                                onClick={() => onDismiss(notification.id)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Dismiss"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(notification.timestamp)}
                            </span>
                            {notification.action && (
                              <button
                                onClick={notification.action.onClick}
                                className="text-xs text-brand hover:underline"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead?.(notification.id)}
                          className="absolute left-1 top-1/2 h-2 w-2 rounded-full bg-brand"
                          aria-label="Mark as read"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
)
NotificationCenter.displayName = "NotificationCenter"

export { NotificationCenter }
