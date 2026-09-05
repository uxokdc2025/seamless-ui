import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "./lib/utils"
import { Button } from "./button"

type Orientation = "horizontal" | "vertical"

interface CarouselContextValue {
  scrollRef: React.RefObject<HTMLDivElement | null>
  orientation: Orientation
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("Carousel subcomponents must be used within a <Carousel />")
  }
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Scroll axis. */
  orientation?: Orientation
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, children, orientation = "horizontal", ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const updateScrollState = React.useCallback(() => {
      const node = scrollRef.current
      if (!node) return
      if (orientation === "horizontal") {
        setCanScrollPrev(node.scrollLeft > 1)
        setCanScrollNext(
          node.scrollLeft < node.scrollWidth - node.clientWidth - 1
        )
      } else {
        setCanScrollPrev(node.scrollTop > 1)
        setCanScrollNext(
          node.scrollTop < node.scrollHeight - node.clientHeight - 1
        )
      }
    }, [orientation])

    React.useEffect(() => {
      const node = scrollRef.current
      if (!node) return
      updateScrollState()
      node.addEventListener("scroll", updateScrollState, { passive: true })
      window.addEventListener("resize", updateScrollState)
      return () => {
        node.removeEventListener("scroll", updateScrollState)
        window.removeEventListener("resize", updateScrollState)
      }
    }, [updateScrollState])

    const scrollBy = React.useCallback(
      (direction: 1 | -1) => {
        const node = scrollRef.current
        if (!node) return
        if (orientation === "horizontal") {
          node.scrollBy({ left: direction * node.clientWidth, behavior: "smooth" })
        } else {
          node.scrollBy({ top: direction * node.clientHeight, behavior: "smooth" })
        }
      },
      [orientation]
    )

    const scrollPrev = React.useCallback(() => scrollBy(-1), [scrollBy])
    const scrollNext = React.useCallback(() => scrollBy(1), [scrollBy])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault()
        scrollNext()
      }
    }

    return (
      <CarouselContext.Provider
        value={{
          scrollRef,
          orientation,
          canScrollPrev,
          canScrollNext,
          scrollPrev,
          scrollNext,
        }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { scrollRef, orientation } = useCarousel()

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        orientation === "horizontal"
          ? "snap-x overflow-x-auto"
          : "snap-y flex-col overflow-y-auto",
        className
      )}
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col"
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "snap-start" : "snap-start",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      onClick={scrollPrev}
      className={cn(
        "absolute z-10 h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-4 top-1/2 -translate-y-1/2"
          : "-top-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      disabled={!canScrollNext}
      aria-label="Next slide"
      onClick={scrollNext}
      className={cn(
        "absolute z-10 h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-4 top-1/2 -translate-y-1/2"
          : "-bottom-4 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
