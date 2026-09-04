import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const workspaceVariants = cva(
  "grid h-screen w-screen overflow-hidden",
  {
    variants: {
      layout: {
        "editor": "grid-rows-[auto_1fr]",
        "editor-sidebar": "grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[250px_1fr]",
        "editor-panels": "grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[250px_1fr_300px]",
        "full": "grid-rows-1",
      },
    },
    defaultVariants: {
      layout: "editor",
    },
  }
)

export interface WorkspaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof workspaceVariants> {}

/**
 * Workspace: Full-viewport application layout for complex work applications.
 * Commonly used for code editors, design tools, data applications.
 */
const Workspace = React.forwardRef<HTMLDivElement, WorkspaceProps>(
  ({ className, layout, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(workspaceVariants({ layout, className }))}
        {...props}
      />
    )
  }
)
Workspace.displayName = "Workspace"

const WorkspaceHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <header
      ref={ref}
      className={cn("border-b bg-background", className)}
      {...props}
    />
  )
})
WorkspaceHeader.displayName = "WorkspaceHeader"

const WorkspaceSidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn("border-r bg-muted/30 overflow-y-auto", className)}
      {...props}
    />
  )
})
WorkspaceSidebar.displayName = "WorkspaceSidebar"

const WorkspaceMain = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  )
})
WorkspaceMain.displayName = "WorkspaceMain"

const WorkspacePanel = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn("border-l bg-muted/30 overflow-y-auto", className)}
      {...props}
    />
  )
})
WorkspacePanel.displayName = "WorkspacePanel"

export { 
  Workspace, 
  WorkspaceHeader, 
  WorkspaceSidebar, 
  WorkspaceMain, 
  WorkspacePanel,
  workspaceVariants 
}
