import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent } from "@seamless/ui"

export interface ReasoningProps extends React.HTMLAttributes<HTMLDivElement> {
  thought: string
  timestamp?: Date | string
  expanded?: boolean
}

const Reasoning = React.forwardRef<HTMLDivElement, ReasoningProps>(
  ({ className, thought, timestamp, expanded = false, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(expanded)

    return (
      <Card
        ref={ref}
        className={cn("w-full border-l-4 border-l-primary", className)}
        {...props}
      >
        <CardHeader
          className="cursor-pointer pb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Reasoning</h4>
            <div className="flex items-center gap-2">
              {timestamp && (
                <time className="text-xs text-muted-foreground">
                  {typeof timestamp === "string"
                    ? timestamp
                    : timestamp.toLocaleTimeString()}
                </time>
              )}
              <svg
                className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {thought}
            </p>
          </CardContent>
        )}
      </Card>
    )
  }
)
Reasoning.displayName = "Reasoning"

export { Reasoning }
