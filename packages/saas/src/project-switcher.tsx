import * as React from "react"
import { cn } from "@seamless/ui"
import { Check, ChevronsUpDown } from "lucide-react"

export interface Project {
  id: string
  name: string
  color?: string
  icon?: React.ReactNode
}

export interface ProjectSwitcherProps {
  projects: Project[]
  currentProject?: string
  onProjectChange: (projectId: string) => void
  placeholder?: string
  className?: string
}

const ProjectSwitcher = React.forwardRef<HTMLDivElement, ProjectSwitcherProps>(
  (
    {
      projects,
      currentProject,
      onProjectChange,
      placeholder = "Select project",
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const current = projects.find((p) => p.id === currentProject)

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-2 rounded-md border border-input px-3 py-2 text-sm",
            "hover:bg-interactive-hover transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {current ? (
            <>
              {current.color && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: current.color }}
                />
              )}
              {current.icon && <span className="flex-shrink-0">{current.icon}</span>}
              <span className="flex-1 text-left truncate">{current.name}</span>
            </>
          ) : (
            <span className="flex-1 text-left text-muted-foreground">
              {placeholder}
            </span>
          )}
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
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
                "absolute left-0 right-0 top-full z-50 mt-1",
                "max-h-64 overflow-auto rounded-md border bg-popover p-1 shadow-md",
                "animate-in fade-in-0 zoom-in-95"
              )}
              role="listbox"
            >
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onProjectChange(project.id)
                    setOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                    "hover:bg-interactive-hover transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  role="option"
                  aria-selected={project.id === currentProject}
                >
                  {project.color && (
                    <div
                      className="h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                  )}
                  {project.icon && <span className="flex-shrink-0">{project.icon}</span>}
                  <span className="flex-1 text-left truncate">{project.name}</span>
                  {project.id === currentProject && (
                    <Check className="h-4 w-4 text-brand" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }
)
ProjectSwitcher.displayName = "ProjectSwitcher"

export { ProjectSwitcher }
