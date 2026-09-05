import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 min-w-8 px-2",
        default: "h-9 min-w-9 px-3",
        lg: "h-10 min-w-10 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  /** Controlled pressed state. */
  pressed?: boolean
  /** Initial pressed state when uncontrolled. */
  defaultPressed?: boolean
  /** Fired when the pressed state changes. */
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed,
      defaultPressed = false,
      onPressedChange,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = pressed !== undefined
    const [internal, setInternal] = React.useState(defaultPressed)
    const value = isControlled ? pressed : internal

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (event.defaultPrevented) return
      const next = !value
      if (!isControlled) setInternal(next)
      onPressedChange?.(next)
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={value}
        data-state={value ? "on" : "off"}
        disabled={disabled}
        onClick={handleClick}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
