import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const containerVariants = cva("mx-auto px-4", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md", 
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
      constrained: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "constrained",
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, className }))}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container }