import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface CostDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  amount: number
  currency?: string
  breakdown?: {
    inputCost?: number
    outputCost?: number
  }
  showBreakdown?: boolean
}

const CostDisplay = React.forwardRef<HTMLDivElement, CostDisplayProps>(
  (
    {
      className,
      amount,
      currency = "USD",
      breakdown,
      showBreakdown = false,
      ...props
    },
    ref
  ) => {
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(value)
    }

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cost</span>
            <span className="text-lg font-bold">{formatCurrency(amount)}</span>
          </div>
          {showBreakdown && breakdown && (
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              {breakdown.inputCost !== undefined && (
                <div>
                  <span className="text-muted-foreground">Input: </span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.inputCost)}
                  </span>
                </div>
              )}
              {breakdown.outputCost !== undefined && (
                <div>
                  <span className="text-muted-foreground">Output: </span>
                  <span className="font-medium">
                    {formatCurrency(breakdown.outputCost)}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
CostDisplay.displayName = "CostDisplay"

export { CostDisplay }
