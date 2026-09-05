import * as React from "react"
import { cn } from "./lib/utils"

interface BottomNavigationContextValue {
  value: string | undefined
  setValue: (value: string) => void
}

const BottomNavigationContext =
  React.createContext<BottomNavigationContextValue | null>(null)

export interface BottomNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "defaultValue"> {
  /** Controlled active item value. */
  value?: string
  /** Initial active item value when uncontrolled. */
  defaultValue?: string
  /** Fired when the active item changes. */
  onValueChange?: (value: string) => void
}

const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  (
    { className, children, value: valueProp, defaultValue, onValueChange, ...props },
    ref
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState<string | undefined>(
      defaultValue
    )
    const value = isControlled ? valueProp : internal

    const setValue = React.useCallback(
      (next: string) => {
        if (!isControlled) setInternal(next)
        onValueChange?.(next)
      },
      [isControlled, onValueChange]
    )

    return (
      <BottomNavigationContext.Provider value={{ value, setValue }}>
        <nav
          ref={ref}
          className={cn(
            "flex w-full items-stretch justify-around border-t border-border bg-background",
            className
          )}
          {...props}
        >
          {children}
        </nav>
      </BottomNavigationContext.Provider>
    )
  }
)
BottomNavigation.displayName = "BottomNavigation"

export interface BottomNavigationItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Unique value identifying this item. */
  value: string
  /** Icon element rendered above the label. */
  icon: React.ReactNode
  /** Text label. */
  label: React.ReactNode
}

const BottomNavigationItem = React.forwardRef<
  HTMLButtonElement,
  BottomNavigationItemProps
>(({ className, value, icon, label, onClick, ...props }, ref) => {
  const context = React.useContext(BottomNavigationContext)
  if (!context) {
    throw new Error(
      "BottomNavigationItem must be used within a BottomNavigation"
    )
  }
  const active = context.value === value

  return (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "page" : undefined}
      data-state={active ? "active" : "inactive"}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        context.setValue(value)
      }}
      className={cn(
        "group relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        active
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {icon}
      </span>
      <span className="leading-none">{label}</span>
    </button>
  )
})
BottomNavigationItem.displayName = "BottomNavigationItem"

export { BottomNavigation, BottomNavigationItem }
