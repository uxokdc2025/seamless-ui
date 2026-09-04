import * as React from "react"
import { cn } from "@seamless/ui"

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional header component
   */
  header?: React.ReactNode
  /**
   * Optional footer component
   */
  footer?: React.ReactNode
  /**
   * Main content
   */
  children: React.ReactNode
}

/**
 * PageShell: Full-page layout scaffold with optional header/footer and scrollable main area.
 * Uses CSS grid with header/footer pinned and content area that fills available height.
 */
const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  ({ className, header, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid h-screen w-full grid-rows-[auto_1fr_auto]",
          className
        )}
        {...props}
      >
        {header && <header className="border-b">{header}</header>}
        <main className="overflow-y-auto">{children}</main>
        {footer && <footer className="border-t">{footer}</footer>}
      </div>
    )
  }
)
PageShell.displayName = "PageShell"

const PageShellHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <header
      ref={ref}
      className={cn("border-b px-4 py-3", className)}
      {...props}
    />
  )
})
PageShellHeader.displayName = "PageShellHeader"

const PageShellContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn("overflow-y-auto", className)}
      {...props}
    />
  )
})
PageShellContent.displayName = "PageShellContent"

const PageShellFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={cn("border-t px-4 py-3", className)}
      {...props}
    />
  )
})
PageShellFooter.displayName = "PageShellFooter"

export { PageShell, PageShellHeader, PageShellContent, PageShellFooter }
