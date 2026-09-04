import * as React from "react"
import { cn } from "@seamless/ui"

export interface TypingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  isTyping: boolean
  agentName?: string
}

const TypingState = React.forwardRef<HTMLDivElement, TypingStateProps>(
  ({ className, isTyping, agentName = "Agent", ...props }, ref) => {
    if (!isTyping) return null

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
        {...props}
      >
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
        </div>
        <span>{agentName} is typing...</span>
      </div>
    )
  }
)
TypingState.displayName = "TypingState"

export { TypingState }
