import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "./lib/utils"

const loadingVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-primary",
        muted: "text-muted-foreground",
        accent: "text-accent-foreground",
      },
      size: {
        sm: "[&>svg]:h-4 [&>svg]:w-4",
        md: "[&>svg]:h-6 [&>svg]:w-6",
        lg: "[&>svg]:h-8 [&>svg]:w-8",
        xl: "[&>svg]:h-12 [&>svg]:w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  label?: string
  fullscreen?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, label, fullscreen, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          loadingVariants({ variant, size }),
          fullscreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={label || "Loading"}
        {...props}
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin" />
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
        </div>
      </div>
    )

    return content
  }
)
Loading.displayName = "Loading"

const LoadingSpinner = React.forwardRef<
  SVGSVGElement,
  React.ComponentPropsWithoutRef<typeof Loader2> & VariantProps<typeof loadingVariants>
>(({ className, size, variant, ...props }, ref) => (
  <Loader2
    ref={ref}
    className={cn(
      "animate-spin",
      variant === "default" && "text-primary",
      variant === "muted" && "text-muted-foreground",
      variant === "accent" && "text-accent-foreground",
      size === "sm" && "h-4 w-4",
      size === "md" && "h-6 w-6",
      size === "lg" && "h-8 w-8",
      size === "xl" && "h-12 w-12",
      className
    )}
    {...props}
  />
))
LoadingSpinner.displayName = "LoadingSpinner"

const LoadingDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof loadingVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-1", className)}
    role="status"
    aria-label="Loading"
    {...props}
  >
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={cn(
          "rounded-full bg-current animate-pulse",
          variant === "default" && "text-primary",
          variant === "muted" && "text-muted-foreground",
          variant === "accent" && "text-accent-foreground",
          size === "sm" && "h-1 w-1",
          size === "md" && "h-2 w-2",
          size === "lg" && "h-3 w-3",
          size === "xl" && "h-4 w-4"
        )}
        style={{
          animationDelay: `${i * 150}ms`,
        }}
      />
    ))}
  </div>
))
LoadingDots.displayName = "LoadingDots"

const LoadingBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    progress?: number
    variant?: "default" | "muted" | "accent"
  }
>(({ className, progress, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-1 bg-muted rounded-full overflow-hidden",
      className
    )}
    role="progressbar"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
    {...props}
  >
    <div
      className={cn(
        "h-full transition-all duration-300 ease-in-out",
        variant === "default" && "bg-primary",
        variant === "muted" && "bg-muted-foreground",
        variant === "accent" && "bg-accent-foreground",
        progress === undefined && "animate-pulse"
      )}
      style={{
        width: progress !== undefined ? `${progress}%` : "100%",
      }}
    />
  </div>
))
LoadingBar.displayName = "LoadingBar"

export { Loading, LoadingSpinner, LoadingDots, LoadingBar, loadingVariants }
