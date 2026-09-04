import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

const stepperVariants = cva(
  "flex items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep?: number
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, orientation = "horizontal", currentStep = 0, children, ...props }, ref) => {
    const steps = React.Children.toArray(children)
    
    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, className }))}
        {...props}
      >
        {steps.map((step, index) => {
          const stepElement = step as React.ReactElement<StepProps>
          return (
            <React.Fragment key={index}>
              {React.cloneElement(stepElement, {
                index,
                currentStep,
                isLast: index === steps.length - 1,
                orientation: orientation as "horizontal" | "vertical",
              })}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  description?: string
  icon?: React.ReactNode
  index?: number
  currentStep?: number
  isLast?: boolean
  orientation?: "horizontal" | "vertical"
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ 
    className, 
    label, 
    description, 
    icon, 
    index = 0, 
    currentStep = 0, 
    isLast = false,
    orientation = "horizontal",
    ...props 
  }, ref) => {
    const isCompleted = index < currentStep
    const isCurrent = index === currentStep
    const isPending = index > currentStep

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          orientation === "horizontal" ? "flex-1" : "flex-col items-start w-full",
          className
        )}
        {...props}
      >
        <div className={cn(
          "flex items-center gap-2",
          orientation === "vertical" && "mb-2"
        )}>
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
              isCompleted && "border-primary bg-primary text-primary-foreground",
              isCurrent && "border-primary bg-background text-primary",
              isPending && "border-muted-foreground/30 bg-background text-muted-foreground"
            )}
          >
            {isCompleted ? (
              <Check className="h-4 w-4" />
            ) : (
              icon || index + 1
            )}
          </div>
          
          {label && (
            <div className={cn(
              "flex flex-col",
              orientation === "vertical" && "ml-0"
            )}>
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent && "text-foreground",
                  (isCompleted || isPending) && "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {description && (
                <span className="text-xs text-muted-foreground">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>

        {!isLast && (
          <div
            className={cn(
              "bg-muted-foreground/30 transition-colors",
              orientation === "horizontal" 
                ? "h-[2px] flex-1 mx-2" 
                : "w-[2px] h-8 ml-4 my-1",
              isCompleted && "bg-primary"
            )}
          />
        )}
      </div>
    )
  }
)
Step.displayName = "Step"

export { Stepper, Step, stepperVariants }
