import * as React from "react"
import { cn } from "./lib/utils"

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  pattern?: "numeric" | "alphanumeric"
  mask?: boolean
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      className,
      length = 6,
      value = "",
      onChange,
      disabled,
      pattern = "numeric",
      mask = false,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const digits = React.useMemo(() => {
      const arr = value.split("")
      return Array.from({ length }, (_, i) => arr[i] || "")
    }, [value, length])

    const handleChange = (index: number, digit: string) => {
      if (disabled) return

      let sanitized = digit
      if (pattern === "numeric") {
        sanitized = digit.replace(/[^0-9]/g, "")
      } else {
        sanitized = digit.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
      }

      if (sanitized.length > 1) {
        sanitized = sanitized[sanitized.length - 1]
      }

      const newDigits = [...digits]
      newDigits[index] = sanitized
      const newValue = newDigits.join("")

      onChange?.(newValue)

      if (sanitized && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
        setActiveIndex(index + 1)
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!digits[index] && index > 0) {
          inputRefs.current[index - 1]?.focus()
          setActiveIndex(index - 1)
        } else {
          handleChange(index, "")
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus()
        setActiveIndex(index - 1)
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
        setActiveIndex(index + 1)
      }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text")
      let sanitized = pastedData
      
      if (pattern === "numeric") {
        sanitized = pastedData.replace(/[^0-9]/g, "")
      } else {
        sanitized = pastedData.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
      }

      const newValue = sanitized.slice(0, length)
      onChange?.(newValue)

      const nextIndex = Math.min(newValue.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
      setActiveIndex(nextIndex)
    }

    return (
      <div
        ref={ref}
        className={cn("flex gap-2", className)}
        {...props}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type={mask ? "password" : "text"}
            inputMode={pattern === "numeric" ? "numeric" : "text"}
            maxLength={1}
            value={digits[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setActiveIndex(i)}
            disabled={disabled}
            className={cn(
              "h-12 w-12 text-center text-lg font-semibold rounded-md border border-input bg-background ring-offset-background transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              activeIndex === i && "border-primary"
            )}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
    )
  }
)
OTPInput.displayName = "OTPInput"

export { OTPInput }
