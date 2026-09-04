import * as React from "react"
import { cn } from "@seamless/ui"
import { X } from "lucide-react"

export interface DetailDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  side?: "left" | "right"
  width?: "sm" | "md" | "lg"
  className?: string
}

const DetailDrawer = React.forwardRef<HTMLDivElement, DetailDrawerProps>(
  (
    {
      open,
      onOpenChange,
      title,
      children,
      footer,
      side = "right",
      width = "md",
      className,
      ...props
    },
    ref
  ) => {
    const widthClasses = {
      sm: "w-80",
      md: "w-96",
      lg: "w-[32rem]",
    }

    const slideClasses = {
      left: open
        ? "translate-x-0"
        : "-translate-x-full",
      right: open
        ? "translate-x-0"
        : "translate-x-full",
    }

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
      return () => {
        document.body.style.overflow = ""
      }
    }, [open])

    return (
      <>
        {open && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
        )}
        <div
          ref={ref}
          className={cn(
            "fixed top-0 bottom-0 z-50",
            "flex flex-col bg-card border shadow-lg",
            "transition-transform duration-300",
            side === "left" ? "left-0 border-r" : "right-0 border-l",
            widthClasses[width],
            slideClasses[side],
            className
          )}
          {...props}
        >
          {title && (
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-semibold text-sm">{title}</h3>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-md p-1 hover:bg-interactive-hover"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
          {footer && <div className="border-t px-4 py-3">{footer}</div>}
        </div>
      </>
    )
  }
)
DetailDrawer.displayName = "DetailDrawer"

export { DetailDrawer }
