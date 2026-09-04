import * as React from "react"
import { cn } from "./lib/utils"

const KeyValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
KeyValue.displayName = "KeyValue"

const KeyValueItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start gap-4", className)}
    {...props}
  />
))
KeyValueItem.displayName = "KeyValueItem"

const KeyValueKey = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-[120px] text-sm font-medium text-muted-foreground", className)}
    {...props}
  />
))
KeyValueKey.displayName = "KeyValueKey"

const KeyValueValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 text-sm", className)}
    {...props}
  />
))
KeyValueValue.displayName = "KeyValueValue"

export { KeyValue, KeyValueItem, KeyValueKey, KeyValueValue }
