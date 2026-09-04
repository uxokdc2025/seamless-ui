import * as React from "react"
import { X } from "lucide-react"
import { cn } from "./lib/utils"
import * as PopoverPrimitive from "@radix-ui/react-popover"

const Popover = PopoverPrimitive.Root
const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "start", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-full min-w-[var(--radix-popover-trigger-width)] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export interface AutocompleteOption {
  value: string
  label: string
}

export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onSelect"> {
  options: AutocompleteOption[]
  value?: string
  onChange?: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  emptyMessage?: string
  clearable?: boolean
  filterOptions?: (options: AutocompleteOption[], query: string) => AutocompleteOption[]
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      className,
      options,
      value = "",
      onChange,
      onSelect,
      emptyMessage = "No results found.",
      clearable = true,
      filterOptions,
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const defaultFilter = (opts: AutocompleteOption[], query: string) => {
      if (!query) return opts
      return opts.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
    }

    const filteredOptions = React.useMemo(() => {
      const filter = filterOptions || defaultFilter
      return filter(options, value)
    }, [options, value, filterOptions])

    const handleSelect = (option: AutocompleteOption) => {
      onChange?.(option.label)
      onSelect?.(option)
      setOpen(false)
      setActiveIndex(-1)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
      setOpen(true)
      setActiveIndex(-1)
    }

    const handleClear = () => {
      onChange?.("")
      setOpen(false)
      inputRef.current?.focus()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          setOpen(true)
        }
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case "Enter":
          e.preventDefault()
          if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
            handleSelect(filteredOptions[activeIndex])
          }
          break
        case "Escape":
          setOpen(false)
          setActiveIndex(-1)
          break
      }
    }

    return (
      <Popover open={open && filteredOptions.length > 0} onOpenChange={setOpen}>
        <div className="relative w-full">
          <PopoverAnchor asChild>
            <input
              ref={inputRef}
              type="text"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                clearable && value && "pr-10",
                className
              )}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => value && setOpen(true)}
              disabled={disabled}
              {...props}
            />
          </PopoverAnchor>
          {clearable && value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </button>
          )}
        </div>
        <PopoverContent
          className="p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-[300px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    index === activeIndex && "bg-accent text-accent-foreground"
                  )}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
Autocomplete.displayName = "Autocomplete"

export { Autocomplete }
