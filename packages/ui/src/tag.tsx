import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"
import { X } from "lucide-react"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, onRemove, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(tagVariants({ variant, className }))}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 rounded-full hover:bg-background/20 p-0.5"
            aria-label="Remove tag"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
