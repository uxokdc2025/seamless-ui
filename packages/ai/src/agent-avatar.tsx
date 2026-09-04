import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@seamless/ui"

const agentAvatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
      status: {
        active: "ring-2 ring-success ring-offset-2",
        idle: "ring-2 ring-secondary ring-offset-2",
        error: "ring-2 ring-destructive ring-offset-2",
        offline: "opacity-50",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface AgentAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentAvatarVariants> {
  name: string
  imageUrl?: string
}

const AgentAvatar = React.forwardRef<HTMLDivElement, AgentAvatarProps>(
  ({ className, size, status, name, imageUrl, ...props }, ref) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <div
        ref={ref}
        className={cn(agentAvatarVariants({ size, status }), className)}
        {...props}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    )
  }
)
AgentAvatar.displayName = "AgentAvatar"

export { AgentAvatar, agentAvatarVariants }
