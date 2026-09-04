import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const aspectRatioVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      ratio: {
        square: "aspect-square",
        video: "aspect-video",
        "4/3": "aspect-[4/3]",
        "3/4": "aspect-[3/4]",
        "16/9": "aspect-[16/9]",
        "9/16": "aspect-[9/16]",
        "21/9": "aspect-[21/9]",
      },
    },
    defaultVariants: {
      ratio: "square",
    },
  }
)

export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {
  customRatio?: number
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio, customRatio, children, style, ...props }, ref) => {
    const customStyle = customRatio
      ? { ...style, aspectRatio: customRatio.toString() }
      : style

    return (
      <div
        ref={ref}
        className={cn(aspectRatioVariants({ ratio: customRatio ? undefined : ratio, className }))}
        style={customStyle}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio, aspectRatioVariants }
