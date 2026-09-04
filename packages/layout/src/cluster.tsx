import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const clusterVariants = cva("flex flex-wrap", {
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
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
    },
  },
  defaultVariants: {
    gap: "md",
    justify: "start",
    align: "center",
  },
})

export interface ClusterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof clusterVariants> {}

/**
 * Cluster: A wrapping horizontal layout for collections of items.
 * Similar to Inline but semantically for groups of related items (tags, chips, buttons).
 */
const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(
  ({ className, gap, justify, align, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(clusterVariants({ gap, justify, align, className }))}
        {...props}
      />
    )
  }
)
Cluster.displayName = "Cluster"

export { Cluster, clusterVariants }
