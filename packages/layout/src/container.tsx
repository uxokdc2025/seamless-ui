import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const containerVariants = cva("mx-auto", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md", 
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
      constrained: "max-w-7xl",
      prose: "max-w-prose",
      "3xl": "max-w-[1600px]",
      "4xl": "max-w-[1920px]",
    },
    padding: {
      none: "px-0",
      sm: "px-2",
      md: "px-4",
      lg: "px-6",
      xl: "px-8",
      "2xl": "px-12",
    },
    fluid: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    size: "constrained",
    padding: "md",
    fluid: false,
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Whether the container should be edge-to-edge (for work apps) or constrained (for content apps)
   */
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, fluid, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding, fluid, className }))}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export { Container, containerVariants }