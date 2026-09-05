import * as React from "react"
import { cn } from "./lib/utils"
import { toggleVariants } from "./toggle"

type ToggleVariant = "default" | "outline"
type ToggleSize = "sm" | "default" | "lg"

interface ToggleGroupContextValue {
  variant?: ToggleVariant
  size?: ToggleSize
  value: string[]
  toggle: (value: string) => void
  disabled?: boolean
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(
  null
)

type ToggleGroupBaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> & {
  variant?: ToggleVariant
  size?: ToggleSize
  disabled?: boolean
}

export type ToggleGroupProps = ToggleGroupBaseProps &
  (
    | {
        type: "single"
        value?: string
        defaultValue?: string
        onValueChange?: (value: string) => void
      }
    | {
        type?: "multiple"
        value?: string[]
        defaultValue?: string[]
        onValueChange?: (value: string[]) => void
      }
  )

function normalize(value: string | string[] | undefined): string[] {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (props, ref) => {
    const {
      className,
      children,
      variant = "default",
      size = "default",
      disabled = false,
      type = "multiple",
      value: valueProp,
      defaultValue,
      onValueChange,
      onKeyDown,
      ...rest
    } = props

    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState<string[]>(() =>
      normalize(defaultValue)
    )
    const current = isControlled ? normalize(valueProp) : internal

    const toggle = React.useCallback(
      (item: string) => {
        let next: string[]
        if (type === "single") {
          next = current.includes(item) ? [] : [item]
        } else {
          next = current.includes(item)
            ? current.filter((entry) => entry !== item)
            : [...current, item]
        }
        if (!isControlled) setInternal(next)
        if (type === "single") {
          ;(onValueChange as ((value: string) => void) | undefined)?.(
            next[0] ?? ""
          )
        } else {
          ;(onValueChange as ((value: string[]) => void) | undefined)?.(next)
        }
      },
      [current, isControlled, onValueChange, type]
    )

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"]
      if (!keys.includes(event.key)) return
      const container = event.currentTarget
      const items = Array.from(
        container.querySelectorAll<HTMLButtonElement>(
          "[data-toggle-item]:not([disabled])"
        )
      )
      if (items.length === 0) return
      const activeIndex = items.indexOf(
        document.activeElement as HTMLButtonElement
      )
      event.preventDefault()
      let nextIndex = activeIndex
      if (event.key === "Home") nextIndex = 0
      else if (event.key === "End") nextIndex = items.length - 1
      else if (event.key === "ArrowLeft")
        nextIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1
      else if (event.key === "ArrowRight")
        nextIndex = activeIndex >= items.length - 1 ? 0 : activeIndex + 1
      items[nextIndex]?.focus()
    }

    return (
      <ToggleGroupContext.Provider
        value={{ variant, size, value: current, toggle, disabled }}
      >
        <div
          ref={ref}
          role="group"
          onKeyDown={handleKeyDown}
          className={cn(
            "inline-flex items-center justify-center gap-1",
            variant === "outline" &&
              "gap-0 divide-x divide-border overflow-hidden rounded-md border border-input",
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)
ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string
  variant?: ToggleVariant
  size?: ToggleSize
}

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ className, children, value, variant, size, disabled, onClick, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  if (!context) {
    throw new Error("ToggleGroupItem must be used within a ToggleGroup")
  }
  const pressed = context.value.includes(value)
  const isDisabled = disabled ?? context.disabled
  const resolvedVariant = variant ?? context.variant
  const resolvedSize = size ?? context.size

  return (
    <button
      ref={ref}
      type="button"
      data-toggle-item=""
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      disabled={isDisabled}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        context.toggle(value)
      }}
      className={cn(
        toggleVariants({ variant: resolvedVariant, size: resolvedSize }),
        resolvedVariant === "outline" && "rounded-none border-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
