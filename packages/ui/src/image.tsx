import * as React from "react"
import { cn } from "./lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = "", fallback, onError, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setError(true)
      onError?.(e)
    }

    if (error && fallback) {
      return <>{fallback}</>
    }

    return (
      <img
        ref={ref}
        alt={alt}
        className={cn("", className)}
        onError={handleError}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
