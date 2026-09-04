import * as React from "react"
import { cn } from "@seamless/ui"

export interface ResizablePanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the resizable panels
   */
  direction?: "horizontal" | "vertical"
  /**
   * Initial sizes as percentages (must sum to 100)
   */
  sizes?: number[]
  /**
   * Minimum size for each panel in pixels
   */
  minSizes?: number[]
}

/**
 * ResizablePanels: Container for resizable panel layout.
 * Uses CSS resize with overflow handling for interactive panel resizing.
 */
const ResizablePanels = React.forwardRef<HTMLDivElement, ResizablePanelsProps>(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full overflow-hidden",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanels.displayName = "ResizablePanels"

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Default size (e.g., "50%", "300px", "1fr")
   */
  defaultSize?: string
  /**
   * Minimum size in pixels
   */
  minSize?: number
  /**
   * Maximum size in pixels
   */
  maxSize?: number
  /**
   * Whether the panel is resizable
   */
  resizable?: boolean
}

/**
 * ResizablePanel: Individual resizable panel.
 */
const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, defaultSize = "1fr", minSize, maxSize, resizable = true, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-auto",
          resizable && "resize",
          className
        )}
        style={{
          ...style,
          flex: defaultSize,
          minWidth: minSize ? `${minSize}px` : undefined,
          maxWidth: maxSize ? `${maxSize}px` : undefined,
        }}
        {...props}
      />
    )
  }
)
ResizablePanel.displayName = "ResizablePanel"

/**
 * ResizableHandle: Visual separator/handle between panels.
 */
export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, direction = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-border hover:bg-accent transition-colors shrink-0",
          direction === "vertical" ? "h-px w-full cursor-row-resize" : "w-px h-full cursor-col-resize",
          className
        )}
        {...props}
      />
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanels, ResizablePanel, ResizableHandle }
