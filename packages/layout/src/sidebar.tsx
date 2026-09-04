import * as React from "react"
import { cn } from "@seamless/ui"

export type SidebarState = "expanded" | "collapsed" | "mobile"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  state?: SidebarState
  onStateChange?: (state: SidebarState) => void
  storageKey?: string
  collapsible?: boolean
  className?: string
}

interface SidebarContextValue {
  state: SidebarState
  setState: (state: SidebarState) => void
  collapsible: boolean
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    // Return a safe default during SSR or when outside provider
    if (typeof window === "undefined") {
      return { state: "expanded" as SidebarState, setState: () => {}, collapsible: true, isMobile: false }
    }
    throw new Error("useSidebar must be used within a Sidebar component")
  }
  return context
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      state: controlledState,
      onStateChange,
      storageKey = "sidebar-state",
      collapsible = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = React.useState(false)
    const [internalState, setInternalState] = React.useState<SidebarState>(() => {
      if (typeof window === "undefined") return "expanded"
      if (controlledState) return controlledState
      
      const stored = localStorage.getItem(storageKey)
      return (stored as SidebarState) || "expanded"
    })

    const state = controlledState ?? internalState
    const setState = React.useCallback(
      (newState: SidebarState) => {
        if (!collapsible && newState === "collapsed") return
        
        if (!controlledState) {
          setInternalState(newState)
          if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, newState)
          }
        }
        onStateChange?.(newState)
      },
      [collapsible, controlledState, onStateChange, storageKey]
    )

    React.useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)")
      
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        setIsMobile(e.matches)
        if (e.matches && state !== "mobile") {
          setState("mobile")
        } else if (!e.matches && state === "mobile") {
          setState("expanded")
        }
      }

      handleChange(mediaQuery)
      mediaQuery.addEventListener("change", handleChange)
      
      return () => mediaQuery.removeEventListener("change", handleChange)
    }, [state, setState])

    const contextValue = React.useMemo(
      () => ({ state, setState, collapsible, isMobile }),
      [state, setState, collapsible, isMobile]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-state={state}
          className={cn(
            "relative flex h-full flex-col border-r border-border bg-surface transition-all duration-300",
            state === "expanded" && "w-64",
            state === "collapsed" && "w-16",
            state === "mobile" && "fixed inset-y-0 left-0 z-50 w-64 transform",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
Sidebar.displayName = "Sidebar"

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const { state } = useSidebar()
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center border-b border-border px-4 py-4",
          state === "collapsed" && "justify-center px-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto py-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => {
    const { state } = useSidebar()
    
    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto border-t border-border px-4 py-4",
          state === "collapsed" && "px-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ icon, className, ...props }, ref) => {
    const { state, setState, collapsible, isMobile } = useSidebar()

    const handleToggle = () => {
      if (isMobile) {
        setState(state === "mobile" ? "expanded" : "mobile")
      } else if (collapsible) {
        setState(state === "expanded" ? "collapsed" : "expanded")
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleToggle}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        aria-label={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
        {...props}
      >
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform",
              state === "collapsed" && "rotate-180"
            )}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        )}
      </button>
    )
  }
)
SidebarToggle.displayName = "SidebarToggle"

export interface SidebarOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarOverlay = React.forwardRef<HTMLDivElement, SidebarOverlayProps>(
  ({ className, ...props }, ref) => {
    const { state, setState, isMobile } = useSidebar()

    if (!isMobile || state !== "mobile") return null

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
          className
        )}
        onClick={() => setState("expanded")}
        {...props}
      />
    )
  }
)
SidebarOverlay.displayName = "SidebarOverlay"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarToggle,
  SidebarOverlay,
}
