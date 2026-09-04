import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"
import { X } from "lucide-react"

const chipVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground hover:bg-accent",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      clickable: false,
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  onRemove?: () => void
  avatar?: React.ReactNode
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant, clickable, onRemove, avatar, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(chipVariants({ variant, clickable: clickable || !!props.onClick, className }))}
        {...props}
      >
        {avatar && <div className="shrink-0">{avatar}</div>}
        <span>{children}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-auto shrink-0 rounded-full hover:bg-background/20 p-0.5"
            aria-label="Remove chip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
