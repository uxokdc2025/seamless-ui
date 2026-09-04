import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react"
import { cn } from "./lib/utils"

const bannerVariants = cva(
  "relative w-full border-y px-4 py-3 text-sm [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        error: "border-red-500 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-50 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
      position: {
        top: "",
        bottom: "",
        inline: "border rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top",
    },
  }
)

const iconMap = {
  default: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
}

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = "default", position = "top", icon, dismissible, onDismiss, children, ...props }, ref) => {
    const Icon = iconMap[variant || "default"]
    
    return (
      <div
        ref={ref}
        role="banner"
        className={cn(
          bannerVariants({ variant, position }),
          dismissible && "pr-10",
          position === "top" && "fixed top-0 left-0 right-0 z-50",
          position === "bottom" && "fixed bottom-0 left-0 right-0 z-50",
          className
        )}
        {...props}
      >
        {icon !== null && (icon || <Icon className="h-4 w-4" />)}
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-4 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </button>
        )}
      </div>
    )
  }
)
Banner.displayName = "Banner"

export { Banner, bannerVariants }
