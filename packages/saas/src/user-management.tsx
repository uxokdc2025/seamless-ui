import * as React from "react"
import { cn } from "@seamless/ui"
import { MoreVertical, Mail, Trash } from "lucide-react"

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "invited" | "suspended"
  avatar?: string
  lastActive?: Date
}

export interface UserManagementProps {
  users: User[]
  onInvite?: () => void
  onEditUser?: (userId: string) => void
  onRemoveUser?: (userId: string) => void
  onResendInvite?: (userId: string) => void
  className?: string
}

const UserManagement = React.forwardRef<HTMLDivElement, UserManagementProps>(
  (
    { users, onInvite, onEditUser, onRemoveUser, onResendInvite, className, ...props },
    ref
  ) => {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null)

    const getStatusColor = (status: User["status"]) => {
      switch (status) {
        case "active":
          return "bg-success text-success-foreground"
        case "invited":
          return "bg-warning text-warning-foreground"
        case "suspended":
          return "bg-destructive text-destructive-foreground"
      }
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-lg border bg-card p-6", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users</h3>
          {onInvite && (
            <button
              onClick={onInvite}
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              Invite user
            </button>
          )}
        </div>

        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-md border bg-muted/50 p-3"
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                {user.avatar || user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                      getStatusColor(user.status)
                    )}
                  >
                    {user.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{user.role}</span>
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === user.id ? null : user.id)
                    }
                    className="rounded-md p-1.5 hover:bg-interactive-hover"
                    aria-label="User actions"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {activeMenu === user.id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-md border bg-popover p-1 shadow-md">
                        {onEditUser && (
                          <button
                            onClick={() => {
                              onEditUser(user.id)
                              setActiveMenu(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-interactive-hover"
                          >
                            Edit user
                          </button>
                        )}
                        {user.status === "invited" && onResendInvite && (
                          <button
                            onClick={() => {
                              onResendInvite(user.id)
                              setActiveMenu(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-interactive-hover"
                          >
                            <Mail className="h-4 w-4" />
                            Resend invite
                          </button>
                        )}
                        {onRemoveUser && (
                          <button
                            onClick={() => {
                              onRemoveUser(user.id)
                              setActiveMenu(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                          >
                            <Trash className="h-4 w-4" />
                            Remove user
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
UserManagement.displayName = "UserManagement"

export { UserManagement }
