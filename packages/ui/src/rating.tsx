import * as React from "react"
import { Star } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const ratingVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-0.5",
      default: "gap-1",
      lg: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const starPx: Record<NonNullable<VariantProps<typeof ratingVariants>["size"]>, number> = {
  sm: 16,
  default: 20,
  lg: 24,
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof ratingVariants> {
  /** Controlled value. */
  value?: number
  /** Initial value when uncontrolled. */
  defaultValue?: number
  /** Fired when the value changes. */
  onValueChange?: (value: number) => void
  /** Number of stars. */
  max?: number
  /** Allow half-star increments. */
  allowHalf?: boolean
  /** Render as read-only (no interaction, still focusable off). */
  readOnly?: boolean
  /** Disable interaction. */
  disabled?: boolean
  /** Accessible label for the rating control. */
  label?: string
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      max = 5,
      allowHalf = false,
      readOnly = false,
      disabled = false,
      label = "Rating",
      ...props
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined
    const [internal, setInternal] = React.useState(defaultValue)
    const [hover, setHover] = React.useState<number | null>(null)
    const value = isControlled ? valueProp : internal
    const display = hover ?? value
    const interactive = !readOnly && !disabled
    const step = allowHalf ? 0.5 : 1
    const px = starPx[size ?? "default"]

    const setValue = (next: number) => {
      const clamped = Math.max(0, Math.min(max, next))
      if (!isControlled) setInternal(clamped)
      onValueChange?.(clamped)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) return
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault()
          setValue(value + step)
          break
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault()
          setValue(value - step)
          break
        case "Home":
          event.preventDefault()
          setValue(0)
          break
        case "End":
          event.preventDefault()
          setValue(max)
          break
        default:
          break
      }
    }

    const handleStarClick = (
      index: number,
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      if (!interactive) return
      let next = index + 1
      if (allowHalf) {
        const { left, width } = event.currentTarget.getBoundingClientRect()
        if (event.clientX - left < width / 2) next = index + 0.5
      }
      setValue(next)
    }

    const handleStarHover = (
      index: number,
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      if (!interactive) return
      let next = index + 1
      if (allowHalf) {
        const { left, width } = event.currentTarget.getBoundingClientRect()
        if (event.clientX - left < width / 2) next = index + 0.5
      }
      setHover(next)
    }

    return (
      <div
        ref={ref}
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} of ${max} stars`}
        aria-readonly={readOnly || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={interactive ? 0 : -1}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHover(null)}
        className={cn(
          ratingVariants({ size }),
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
          disabled && "opacity-50",
          className
        )}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const fill = Math.max(0, Math.min(1, display - index))
          return (
            <button
              key={index}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              disabled={disabled}
              onClick={(event) => handleStarClick(index, event)}
              onMouseMove={(event) => handleStarHover(index, event)}
              className={cn(
                "relative inline-flex shrink-0",
                interactive ? "cursor-pointer" : "cursor-default"
              )}
              style={{ width: px, height: px }}
            >
              <Star
                size={px}
                className="absolute inset-0 text-muted-foreground/40"
                fill="none"
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={px}
                  className="text-warning"
                  fill="currentColor"
                  stroke="currentColor"
                />
              </span>
            </button>
          )
        })}
      </div>
    )
  }
)
Rating.displayName = "Rating"

export { Rating, ratingVariants }
