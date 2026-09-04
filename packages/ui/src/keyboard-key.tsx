import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const keyboardKeyVariants = cva(
  "inline-flex items-center justify-center rounded border border-b-2 px-2 py-1 font-mono text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        outline: "border-input bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface KeyboardKeyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof keyboardKeyVariants> {}

const KeyboardKey = React.forwardRef<HTMLElement, KeyboardKeyProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(keyboardKeyVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
KeyboardKey.displayName = "KeyboardKey"

export { KeyboardKey, keyboardKeyVariants }
