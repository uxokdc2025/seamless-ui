import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const inputGroupVariants = cva(
  "flex items-center w-full rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-9 text-xs",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface InputGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupVariants> {}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputGroupVariants({ size, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

const InputLeftAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 text-sm text-muted-foreground border-r border-input bg-muted/50",
      className
    )}
    {...props}
  />
))
InputLeftAddon.displayName = "InputLeftAddon"

const InputRightAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 text-sm text-muted-foreground border-l border-input bg-muted/50",
      className
    )}
    {...props}
  />
))
InputRightAddon.displayName = "InputRightAddon"

const InputLeftElement = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center pl-3 text-muted-foreground pointer-events-none",
      className
    )}
    {...props}
  />
))
InputLeftElement.displayName = "InputLeftElement"

const InputRightElement = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center pr-3 text-muted-foreground",
      className
    )}
    {...props}
  />
))
InputRightElement.displayName = "InputRightElement"

const InputElement = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
))
InputElement.displayName = "InputElement"

export {
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  InputElement,
  inputGroupVariants,
}
