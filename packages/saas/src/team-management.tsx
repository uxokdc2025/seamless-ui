import * as React from "react"
import { cn } from "@seamless/ui"
import { Users, Plus } from "lucide-react"

export interface Team {
  id: string
  name: string
  description?: string
  memberCount: number
  avatar?: string
}

export interface TeamManagementProps {
  teams: Team[]
  onCreateTeam?: () => void
  onEditTeam?: (teamId: string) => void
  onViewTeam?: (teamId: string) => void
  className?: string
}

const TeamManagement = React.forwardRef<HTMLDivElement, TeamManagementProps>(
  (
    { teams, onCreateTeam, onEditTeam, onViewTeam, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-lg border bg-card p-6", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Teams</h3>
          {onCreateTeam && (
            <button
              onClick={onCreateTeam}
              className="flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              <Plus className="h-4 w-4" />
              Create team
            </button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((team) => (
            <div
              key={team.id}
              className={cn(
                "flex flex-col gap-3 rounded-lg border bg-muted/50 p-4",
                onViewTeam && "cursor-pointer hover:bg-muted/70 transition-colors"
              )}
              onClick={() => onViewTeam?.(team.id)}
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  {team.avatar ? (
                    <span className="text-lg font-semibold">{team.avatar}</span>
                  ) : (
                    <Users className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{team.name}</h4>
                  {team.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {team.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  {team.memberCount} {team.memberCount === 1 ? "member" : "members"}
                </span>
                {onEditTeam && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditTeam(team.id)
                    }}
                    className="text-xs text-brand hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {teams.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No teams created yet
          </div>
        )}
      </div>
    )
  }
)
TeamManagement.displayName = "TeamManagement"

export { TeamManagement }
