import * as React from "react"
import { cn } from "./lib/utils"

export interface SparklineProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
  /** Series of numeric values to plot. */
  data: number[]
  /** Rendered width in pixels. */
  width?: number
  /** Rendered height in pixels. */
  height?: number
  /** Stroke color. Defaults to currentColor. */
  color?: string
  /** Stroke width in pixels. */
  strokeWidth?: number
  /** Fill the area beneath the line. */
  area?: boolean
  /** Render a dot on the final data point. */
  showEndDot?: boolean
  /** Accessible label. When omitted the graphic is hidden from AT. */
  label?: string
}

const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      width = 100,
      height = 32,
      color = "currentColor",
      strokeWidth = 2,
      area = false,
      showEndDot = false,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const pad = strokeWidth
    const innerW = Math.max(0, width - pad * 2)
    const innerH = Math.max(0, height - pad * 2)

    const points = React.useMemo(() => {
      if (data.length === 0) return [] as Array<{ x: number; y: number }>
      const min = Math.min(...data)
      const max = Math.max(...data)
      const range = max - min || 1
      const stepX = data.length > 1 ? innerW / (data.length - 1) : 0
      return data.map((value, index) => ({
        x: pad + (data.length > 1 ? index * stepX : innerW / 2),
        y: pad + innerH - ((value - min) / range) * innerH,
      }))
    }, [data, innerW, innerH, pad])

    const linePath = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ")

    const areaPath =
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${pad + innerH} L ${
            points[0].x
          } ${pad + innerH} Z`
        : ""

    const last = points[points.length - 1]

    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="none"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={cn("inline-block overflow-visible", className)}
        {...props}
      >
        {area && areaPath && (
          <path d={areaPath} fill={color} fillOpacity={0.12} stroke="none" />
        )}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {showEndDot && last && (
          <circle cx={last.x} cy={last.y} r={strokeWidth + 0.5} fill={color} />
        )}
      </svg>
    )
  }
)
Sparkline.displayName = "Sparkline"

export { Sparkline }
