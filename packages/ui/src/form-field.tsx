import * as React from "react"
import { cn } from "./lib/utils"
import { Label } from "./label"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  htmlFor?: string
  required?: boolean
  error?: string
  help?: string
  orientation?: "vertical" | "horizontal"
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      label,
      htmlFor,
      required,
      error,
      help,
      orientation = "vertical",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          orientation === "horizontal" && "flex items-start gap-4",
          className
        )}
        {...props}
      >
        {label && (
          <Label
            htmlFor={htmlFor}
            className={cn(
              orientation === "horizontal" && "pt-2 min-w-[120px]"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="flex-1 space-y-1">
          {children}
          {help && !error && (
            <p className="text-sm text-muted-foreground">{help}</p>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)
FormField.displayName = "FormField"

export interface FieldGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string
  description?: string
  error?: string
}

const FieldGroup = React.forwardRef<HTMLFieldSetElement, FieldGroupProps>(
  ({ className, legend, description, error, children, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn("space-y-4", className)}
        aria-invalid={!!error}
        {...props}
      >
        {legend && (
          <legend className="text-lg font-semibold">{legend}</legend>
        )}
        {description && (
          <p className="text-sm text-muted-foreground -mt-2">{description}</p>
        )}
        <div className="space-y-4">{children}</div>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    )
  }
)
FieldGroup.displayName = "FieldGroup"

export { FormField, FieldGroup }
