import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const avatarGroupVariants = cva(
  "flex items-center",
  {
    variants: {
      spacing: {
        default: "-space-x-2",
        tight: "-space-x-3",
        loose: "-space-x-1",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
)

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  max?: number
  renderSurplus?: (surplus: number) => React.ReactNode
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, spacing, max, renderSurplus, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = max ? childArray.slice(0, max) : childArray
    const surplus = max && childArray.length > max ? childArray.length - max : 0

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ spacing, className }))}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-background rounded-full">
            {child}
          </div>
        ))}
        {surplus > 0 && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background">
            {renderSurplus ? renderSurplus(surplus) : `+${surplus}`}
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { AvatarGroup, avatarGroupVariants }
