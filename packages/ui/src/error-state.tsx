import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"
import { AlertCircle, XCircle } from "lucide-react"

const errorStateVariants = cva(
  "flex flex-col items-center justify-center text-center p-12 space-y-4",
  {
    variants: {
      variant: {
        default: "",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ErrorStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorStateVariants> {
  title: string
  description?: string
  action?: React.ReactNode
  icon?: React.ReactNode
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, variant, title, description, action, icon, ...props }, ref) => {
    const defaultIcon = variant === "destructive" ? (
      <XCircle className="h-12 w-12" />
    ) : (
      <AlertCircle className="h-12 w-12" />
    )

    return (
      <div
        ref={ref}
        className={cn(errorStateVariants({ variant, className }))}
        {...props}
      >
        <div className="text-muted-foreground">
          {icon || defaultIcon}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground max-w-md">
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    )
  }
)
ErrorState.displayName = "ErrorState"

export { ErrorState, errorStateVariants }
