import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const providerBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      provider: {
        openai: "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20",
        anthropic: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20",
        google: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20",
        mistral: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20",
        meta: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20",
        custom: "bg-secondary/10 text-secondary-foreground border border-secondary/20",
      },
    },
    defaultVariants: {
      provider: "custom",
    },
  }
)

export interface ProviderBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof providerBadgeVariants> {
  providerName?: string
}

const ProviderBadge = React.forwardRef<HTMLDivElement, ProviderBadgeProps>(
  ({ className, provider, providerName, ...props }, ref) => {
    const displayName = providerName || (provider && provider.charAt(0).toUpperCase() + provider.slice(1))

    return (
      <div
        ref={ref}
        className={cn(providerBadgeVariants({ provider }), className)}
        {...props}
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
        <span>{displayName}</span>
      </div>
    )
  }
)
ProviderBadge.displayName = "ProviderBadge"

export { ProviderBadge, providerBadgeVariants }
