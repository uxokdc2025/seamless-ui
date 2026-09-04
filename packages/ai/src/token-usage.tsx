import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface TokenUsageProps extends React.HTMLAttributes<HTMLDivElement> {
  inputTokens: number
  outputTokens: number
  totalTokens?: number
  showBreakdown?: boolean
}

const TokenUsage = React.forwardRef<HTMLDivElement, TokenUsageProps>(
  (
    {
      className,
      inputTokens,
      outputTokens,
      totalTokens,
      showBreakdown = true,
      ...props
    },
    ref
  ) => {
    const total = totalTokens || inputTokens + outputTokens

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Token Usage</span>
            <span className="text-lg font-bold">{total.toLocaleString()}</span>
          </div>
          {showBreakdown && (
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Input: </span>
                <span className="font-medium">{inputTokens.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Output: </span>
                <span className="font-medium">{outputTokens.toLocaleString()}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
TokenUsage.displayName = "TokenUsage"

export { TokenUsage }
