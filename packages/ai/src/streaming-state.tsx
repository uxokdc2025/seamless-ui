import * as React from "react"
import { cn } from "@seamless/ui"

export interface StreamingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  isStreaming: boolean
  message?: string
}

const StreamingState = React.forwardRef<HTMLDivElement, StreamingStateProps>(
  ({ className, isStreaming, message = "Streaming...", ...props }, ref) => {
    if (!isStreaming) return null

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}
        {...props}
      >
        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
        <span>{message}</span>
      </div>
    )
  }
)
StreamingState.displayName = "StreamingState"

export { StreamingState }
