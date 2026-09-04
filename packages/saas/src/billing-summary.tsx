import * as React from "react"
import { cn } from "@seamless/ui"
import { CreditCard, Download } from "lucide-react"

export interface BillingSummaryProps {
  currentPeriod: {
    start: Date
    end: Date
  }
  amount: number
  currency?: string
  nextBillingDate?: Date
  paymentMethod?: {
    type: string
    last4: string
  }
  lineItems?: Array<{
    label: string
    amount: number
  }>
  onDownloadInvoice?: () => void
  onUpdatePayment?: () => void
  className?: string
}

const BillingSummary = React.forwardRef<HTMLDivElement, BillingSummaryProps>(
  (
    {
      currentPeriod,
      amount,
      currency = "USD",
      nextBillingDate,
      paymentMethod,
      lineItems,
      onDownloadInvoice,
      onUpdatePayment,
      className,
      ...props
    },
    ref
  ) => {
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    const formatAmount = (value: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value)
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-4 rounded-lg border bg-card p-6", className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current billing period</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(currentPeriod.start)} - {formatDate(currentPeriod.end)}
            </p>
          </div>
          {onDownloadInvoice && (
            <button
              onClick={onDownloadInvoice}
              className="flex items-center gap-2 text-sm text-brand hover:underline"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          )}
        </div>

        <div className="space-y-2 py-4 border-y">
          {lineItems?.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{formatAmount(item.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between text-lg font-semibold pt-2">
            <span>Total</span>
            <span>{formatAmount(amount)}</span>
          </div>
        </div>

        {paymentMethod && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-muted p-2">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">
                  {paymentMethod.type} ending in {paymentMethod.last4}
                </div>
                {nextBillingDate && (
                  <div className="text-xs text-muted-foreground">
                    Next charge on {formatDate(nextBillingDate)}
                  </div>
                )}
              </div>
            </div>
            {onUpdatePayment && (
              <button
                onClick={onUpdatePayment}
                className="text-sm text-brand hover:underline"
              >
                Update
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
)
BillingSummary.displayName = "BillingSummary"

export { BillingSummary }
