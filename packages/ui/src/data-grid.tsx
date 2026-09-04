import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"

// ============================================================================
// Data Grid - Simplified version for basic display
// ============================================================================

const dataGridVariants = cva(
  "w-full border-collapse text-sm",
  {
    variants: {
      striped: {
        true: "[&_tbody_tr:nth-child(even)]:bg-muted/50",
        false: "",
      },
      bordered: {
        true: "border",
        false: "",
      },
      hoverable: {
        true: "[&_tbody_tr]:hover:bg-muted/70 [&_tbody_tr]:cursor-pointer",
        false: "",
      },
      density: {
        compact: "[&_td]:py-1 [&_td]:px-2 [&_th]:py-2 [&_th]:px-2",
        default: "[&_td]:py-2 [&_td]:px-3 [&_th]:py-3 [&_th]:px-3",
        comfortable: "[&_td]:py-3 [&_td]:px-4 [&_th]:py-4 [&_th]:px-4",
      },
    },
    defaultVariants: {
      striped: false,
      bordered: true,
      hoverable: false,
      density: "default",
    },
  }
)

export interface DataGridColumn {
  key: string
  label: React.ReactNode
  render?: (value: any, row: any, index: number) => React.ReactNode
  width?: string | number
  align?: "left" | "center" | "right"
  className?: string
  headerClassName?: string
}

export interface DataGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataGridVariants> {
  data: any[]
  columns: DataGridColumn[]
  onRowClick?: (row: any, index: number) => void
  emptyMessage?: string
  loading?: boolean
  stickyHeader?: boolean
  fullWidth?: boolean
}

const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  (
    {
      data,
      columns,
      className,
      striped,
      bordered,
      hoverable,
      density,
      onRowClick,
      emptyMessage = "No data available",
      loading = false,
      stickyHeader = false,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const getAlignment = (align?: "left" | "center" | "right") => {
      switch (align) {
        case "center":
          return "text-center"
        case "right":
          return "text-right"
        default:
          return "text-left"
      }
    }

    const getCellValue = (column: DataGridColumn, row: any) => {
      return row[column.key]
    }

    return (
      <div
        ref={ref}
        className={cn("overflow-x-auto", fullWidth && "w-full", className)}
        {...props}
      >
        <table
          className={dataGridVariants({
            striped,
            bordered,
            hoverable: hoverable || !!onRowClick,
            density,
          })}
        >
          <thead
            className={cn(
              "bg-muted/50 border-b",
              stickyHeader && "sticky top-0 z-10 bg-background"
            )}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "font-medium",
                    getAlignment(column.align),
                    column.headerClassName
                  )}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(row, index)}
                  className={cn(
                    "border-b last:border-b-0",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((column) => {
                    const value = getCellValue(column, row)
                    const cellContent = column.render
                      ? column.render(value, row, index)
                      : value

                    return (
                      <td
                        key={column.key}
                        className={cn(
                          getAlignment(column.align),
                          column.className
                        )}
                        style={{ width: column.width }}
                      >
                        {cellContent}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  }
)
DataGrid.displayName = "DataGrid"

export { DataGrid, dataGridVariants }
