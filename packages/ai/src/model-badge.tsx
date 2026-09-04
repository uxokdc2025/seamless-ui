import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"
import { Badge } from "@seamless/ui"

const modelBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary/10 text-secondary-foreground border border-secondary/20",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ModelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modelBadgeVariants> {
  modelName: string
  version?: string
}

const ModelBadge = React.forwardRef<HTMLDivElement, ModelBadgeProps>(
  ({ className, variant, modelName, version, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(modelBadgeVariants({ variant }), className)}
        {...props}
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {modelName}
          {version && <span className="opacity-70"> v{version}</span>}
        </span>
      </div>
    )
  }
)
ModelBadge.displayName = "ModelBadge"

export { ModelBadge, modelBadgeVariants }
