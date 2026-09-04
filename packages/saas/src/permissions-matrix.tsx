import * as React from "react"
import { cn } from "@seamless/ui"
import { Check, X } from "lucide-react"

export interface Permission {
  id: string
  name: string
  description?: string
}

export interface Role {
  id: string
  name: string
}

export interface PermissionsMatrixProps {
  roles: Role[]
  permissions: Permission[]
  matrix: Record<string, Record<string, boolean>>
  onTogglePermission?: (roleId: string, permissionId: string) => void
  readOnly?: boolean
  className?: string
}

const PermissionsMatrix = React.forwardRef<HTMLDivElement, PermissionsMatrixProps>(
  (
    {
      roles,
      permissions,
      matrix,
      onTogglePermission,
      readOnly = false,
      className,
      ...props
    },
    ref
  ) => {
    const hasPermission = (roleId: string, permissionId: string) => {
      return matrix[roleId]?.[permissionId] ?? false
    }

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border bg-card p-6 overflow-x-auto", className)}
        {...props}
      >
        <h3 className="text-lg font-semibold mb-4">Permissions</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 text-sm font-semibold">Permission</th>
              {roles.map((role) => (
                <th key={role.id} className="text-center p-3 text-sm font-semibold">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission, index) => (
              <tr
                key={permission.id}
                className={cn(
                  "border-b last:border-0",
                  index % 2 === 0 && "bg-muted/50"
                )}
              >
                <td className="p-3">
                  <div className="text-sm font-medium">{permission.name}</div>
                  {permission.description && (
                    <div className="text-xs text-muted-foreground">
                      {permission.description}
                    </div>
                  )}
                </td>
                {roles.map((role) => {
                  const granted = hasPermission(role.id, permission.id)
                  return (
                    <td key={role.id} className="text-center p-3">
                      {readOnly ? (
                        granted ? (
                          <Check className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <button
                          onClick={() =>
                            onTogglePermission?.(role.id, permission.id)
                          }
                          className={cn(
                            "rounded-md p-1 transition-colors",
                            granted
                              ? "text-success hover:bg-success/10"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                          aria-label={`${granted ? "Revoke" : "Grant"} ${
                            permission.name
                          } for ${role.name}`}
                        >
                          {granted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
)
PermissionsMatrix.displayName = "PermissionsMatrix"

export { PermissionsMatrix }
