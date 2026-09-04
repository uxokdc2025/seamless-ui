import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const codeVariants = cva(
  "relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/10 text-primary",
        outline: "border border-input",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(codeVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Code.displayName = "Code"

export { Code, codeVariants }
