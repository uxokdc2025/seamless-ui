import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "./lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  showStepper?: boolean
  precision?: number
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onChange,
      min,
      max,
      step = 1,
      showStepper = true,
      precision,
      disabled,
      ...props
    },
    ref
  ) => {
    const formatValue = (val: number | undefined): string => {
      if (val === undefined || isNaN(val)) return ""
      if (precision !== undefined) {
        return val.toFixed(precision)
      }
      return String(val)
    }

    const parseValue = (val: string): number | undefined => {
      if (val === "" || val === "-") return undefined
      const parsed = parseFloat(val)
      if (isNaN(parsed)) return undefined
      return parsed
    }

    const clampValue = (val: number | undefined): number | undefined => {
      if (val === undefined) return undefined
      let clamped = val
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    }

    const increment = () => {
      if (disabled) return
      const newValue = (value ?? 0) + step
      const clamped = clampValue(newValue)
      onChange?.(clamped)
    }

    const decrement = () => {
      if (disabled) return
      const newValue = (value ?? 0) - step
      const clamped = clampValue(newValue)
      onChange?.(clamped)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseValue(e.target.value)
      onChange?.(parsed)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const parsed = parseValue(e.target.value)
      const clamped = clampValue(parsed)
      onChange?.(clamped)
      props.onBlur?.(e)
    }

    return (
      <div className="relative flex w-full">
        <input
          type="text"
          inputMode="decimal"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showStepper && "pr-16",
            className
          )}
          ref={ref}
          value={formatValue(value)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
        {showStepper && (
          <div className="absolute right-1 top-1 bottom-1 flex flex-col border-l border-input">
            <button
              type="button"
              onClick={increment}
              disabled={disabled || (max !== undefined && (value ?? 0) >= max)}
              className="flex-1 flex items-center justify-center w-8 hover:bg-accent rounded-tr-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increment"
            >
              <Plus className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={disabled || (min !== undefined && (value ?? 0) <= min)}
              className="flex-1 flex items-center justify-center w-8 hover:bg-accent rounded-br-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-t border-input"
              aria-label="Decrement"
            >
              <Minus className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    )
  }
)
NumberInput.displayName = "NumberInput"

export { NumberInput }
