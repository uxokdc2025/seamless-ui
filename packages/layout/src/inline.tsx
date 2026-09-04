import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const inlineVariants = cva("flex flex-wrap", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },
  defaultVariants: {
    gap: "md",
    align: "center",
    justify: "start",
  },
})

export interface InlineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inlineVariants> {}

const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  ({ className, gap, align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inlineVariants({ gap, align, justify, className }))}
        {...props}
      />
    )
  }
)
Inline.displayName = "Inline"

export { Inline, inlineVariants }
