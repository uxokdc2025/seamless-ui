import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"
import { ExternalLink, Settings } from "lucide-react"

const integrationCardVariants = cva(
  "rounded-lg border bg-card p-4 transition-colors",
  {
    variants: {
      variant: {
        default: "border-border",
        connected: "border-success/20 bg-success/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface IntegrationCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof integrationCardVariants> {
  name: string
  description: string
  icon?: React.ReactNode
  connected?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
  onConfigure?: () => void
  externalLink?: string
}

const IntegrationCard = React.forwardRef<HTMLDivElement, IntegrationCardProps>(
  (
    {
      name,
      description,
      icon,
      connected = false,
      onConnect,
      onDisconnect,
      onConfigure,
      externalLink,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          integrationCardVariants({
            variant: connected ? "connected" : variant,
          }),
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-4">
          {icon && (
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-semibold text-sm">{name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>
              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Visit ${name} website`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              {connected ? (
                <>
                  <span className="inline-flex items-center rounded-full bg-success px-2 py-0.5 text-xs font-semibold text-success-foreground">
                    Connected
                  </span>
                  {onConfigure && (
                    <button
                      onClick={onConfigure}
                      className="flex items-center gap-1 text-xs text-brand hover:underline"
                    >
                      <Settings className="h-3 w-3" />
                      Configure
                    </button>
                  )}
                  {onDisconnect && (
                    <button
                      onClick={onDisconnect}
                      className="text-xs text-destructive hover:underline"
                    >
                      Disconnect
                    </button>
                  )}
                </>
              ) : (
                onConnect && (
                  <button
                    onClick={onConnect}
                    className="rounded-md bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground hover:bg-brand/90"
                  >
                    Connect
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
IntegrationCard.displayName = "IntegrationCard"

export { IntegrationCard, integrationCardVariants }
