import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./lib/utils"
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal, Settings2 } from "lucide-react"
import { Button } from "./button"
import { Checkbox } from "./checkbox"

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface DataTableColumn<T = any> {
  id: string
  header: React.ReactNode
  accessorKey?: keyof T
  accessorFn?: (row: T) => any
  cell?: (value: any, row: T, index: number) => React.ReactNode
  enableSorting?: boolean
  enableHiding?: boolean
  sticky?: "left" | "right" | false
  priority?: number // Lower number = higher priority (shows first on mobile)
  minWidth?: number
  maxWidth?: number
  width?: number
  className?: string
  headerClassName?: string
}

export interface DataTableSort {
  id: string
  desc: boolean
}

export interface DataTableFilter {
  id: string
  value: any
}

export type DensityType = "compact" | "default" | "comfortable"

// ============================================================================
// Data Table Variants
// ============================================================================

const dataTableVariants = cva(
  "w-full border-collapse text-sm",
  {
    variants: {
      density: {
        compact: "[&_td]:py-1 [&_td]:px-2 [&_th]:py-2 [&_th]:px-2",
        default: "[&_td]:py-2 [&_td]:px-3 [&_th]:py-3 [&_th]:px-3",
        comfortable: "[&_td]:py-3 [&_td]:px-4 [&_th]:py-4 [&_th]:px-4",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

// ============================================================================
// Utility Hooks
// ============================================================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}

function useVirtualization<T>(
  items: T[],
  containerRef: React.RefObject<HTMLElement>,
  estimatedItemHeight: number = 53,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [containerHeight, setContainerHeight] = React.useState(0)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => setScrollTop(container.scrollTop)
    const handleResize = () => setContainerHeight(container.clientHeight)

    handleResize()
    container.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [containerRef])

  const totalHeight = items.length * estimatedItemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / estimatedItemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / estimatedItemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const offsetY = startIndex * estimatedItemHeight

  return {
    virtualItems: visibleItems,
    startIndex,
    endIndex,
    totalHeight,
    offsetY,
  }
}

// ============================================================================
// Main Data Table Component
// ============================================================================

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataTableVariants> {
  data: T[]
  columns: DataTableColumn<T>[]
  
  // Sorting
  enableSorting?: boolean
  sortState?: DataTableSort[]
  onSortChange?: (sort: DataTableSort[]) => void
  
  // Selection
  enableSelection?: boolean
  selectedRows?: Set<number>
  onSelectionChange?: (selected: Set<number>) => void
  
  // Filtering
  filters?: DataTableFilter[]
  onFiltersChange?: (filters: DataTableFilter[]) => void
  
  // Pagination
  enablePagination?: boolean
  pageIndex?: number
  pageSize?: number
  pageCount?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  
  // Virtualization
  enableVirtualization?: boolean
  estimatedRowHeight?: number
  
  // Column visibility
  hiddenColumns?: Set<string>
  onHiddenColumnsChange?: (hidden: Set<string>) => void
  
  // Bulk actions
  bulkActions?: React.ReactNode
  
  // Mobile fallback
  mobileCardRender?: (row: T, index: number) => React.ReactNode
  
  // Toolbar
  toolbar?: React.ReactNode
  
  // Layout
  fullWidth?: boolean
  stickyHeader?: boolean
  
  // Empty state
  emptyMessage?: string
  
  // Loading
  loading?: boolean
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      data,
      columns,
      className,
      density = "default",
      
      // Sorting
      enableSorting = false,
      sortState = [],
      onSortChange,
      
      // Selection
      enableSelection = false,
      selectedRows = new Set(),
      onSelectionChange,
      
      // Pagination
      enablePagination = false,
      pageIndex = 0,
      pageSize = 10,
      pageCount,
      onPageChange,
      onPageSizeChange,
      
      // Virtualization
      enableVirtualization = false,
      estimatedRowHeight = 53,
      
      // Column visibility
      hiddenColumns = new Set(),
      onHiddenColumnsChange,
      
      // Bulk actions
      bulkActions,
      
      // Mobile fallback
      mobileCardRender,
      
      // Toolbar
      toolbar,
      
      // Layout
      fullWidth = true,
      stickyHeader = true,
      
      // Empty state
      emptyMessage = "No data available",
      
      // Loading
      loading = false,
      
      ...props
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery("(max-width: 768px)")
    
    // Internal state
    const [internalSort, setInternalSort] = React.useState<DataTableSort[]>([])
    const [internalSelection, setInternalSelection] = React.useState<Set<number>>(new Set())
    const [internalHiddenColumns, setInternalHiddenColumns] = React.useState<Set<string>>(new Set())
    const [internalDensity, setInternalDensity] = React.useState<DensityType>(density || "default")
    const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({})
    const [resizingColumn, setResizingColumn] = React.useState<string | null>(null)
    
    // Use controlled or uncontrolled state
    const currentSort = sortState.length > 0 ? sortState : internalSort
    const currentSelection = selectedRows.size > 0 ? selectedRows : internalSelection
    const currentHiddenColumns = hiddenColumns.size > 0 ? hiddenColumns : internalHiddenColumns
    
    // Filter visible columns
    const visibleColumns = React.useMemo(() => {
      return columns.filter(col => !currentHiddenColumns.has(col.id))
    }, [columns, currentHiddenColumns])
    
    // Sort columns by priority for mobile
    const mobileColumns = React.useMemo(() => {
      return [...visibleColumns].sort((a, b) => {
        const priorityA = a.priority ?? 999
        const priorityB = b.priority ?? 999
        return priorityA - priorityB
      })
    }, [visibleColumns])
    
    // Apply sorting
    const sortedData = React.useMemo(() => {
      if (!enableSorting || currentSort.length === 0) return data
      
      return [...data].sort((a, b) => {
        for (const sort of currentSort) {
          const column = columns.find(col => col.id === sort.id)
          if (!column) continue
          
          let aVal: any
          let bVal: any
          
          if (column.accessorFn) {
            aVal = column.accessorFn(a)
            bVal = column.accessorFn(b)
          } else if (column.accessorKey) {
            aVal = a[column.accessorKey]
            bVal = b[column.accessorKey]
          }
          
          if (aVal === bVal) continue
          
          const comparison = aVal < bVal ? -1 : 1
          return sort.desc ? -comparison : comparison
        }
        return 0
      })
    }, [data, currentSort, columns, enableSorting])
    
    // Apply pagination
    const paginatedData = React.useMemo(() => {
      if (!enablePagination) return sortedData
      const start = pageIndex * pageSize
      return sortedData.slice(start, start + pageSize)
    }, [sortedData, enablePagination, pageIndex, pageSize])
    
    // Virtualization
    const virtualization = useVirtualization(
      enableVirtualization ? paginatedData : [],
      containerRef as React.RefObject<HTMLElement>,
      estimatedRowHeight
    )
    
    const displayData = enableVirtualization ? virtualization.virtualItems : paginatedData
    
    // Handlers
    const handleSort = (columnId: string) => {
      if (!enableSorting) return
      
      const existing = currentSort.find(s => s.id === columnId)
      let newSort: DataTableSort[]
      
      if (!existing) {
        newSort = [{ id: columnId, desc: false }]
      } else if (!existing.desc) {
        newSort = [{ id: columnId, desc: true }]
      } else {
        newSort = []
      }
      
      if (onSortChange) {
        onSortChange(newSort)
      } else {
        setInternalSort(newSort)
      }
    }
    
    const handleSelectAll = (checked: boolean) => {
      const newSelection = new Set<number>()
      if (checked) {
        paginatedData.forEach((_, index) => {
          newSelection.add(enableVirtualization ? virtualization.startIndex + index : index)
        })
      }
      
      if (onSelectionChange) {
        onSelectionChange(newSelection)
      } else {
        setInternalSelection(newSelection)
      }
    }
    
    const handleSelectRow = (index: number, checked: boolean) => {
      const newSelection = new Set(currentSelection)
      if (checked) {
        newSelection.add(index)
      } else {
        newSelection.delete(index)
      }
      
      if (onSelectionChange) {
        onSelectionChange(newSelection)
      } else {
        setInternalSelection(newSelection)
      }
    }
    
    const toggleColumnVisibility = (columnId: string) => {
      const newHidden = new Set(currentHiddenColumns)
      if (newHidden.has(columnId)) {
        newHidden.delete(columnId)
      } else {
        newHidden.add(columnId)
      }
      
      if (onHiddenColumnsChange) {
        onHiddenColumnsChange(newHidden)
      } else {
        setInternalHiddenColumns(newHidden)
      }
    }
    
    // Get cell value
    const getCellValue = (column: DataTableColumn, row: any) => {
      if (column.accessorFn) {
        return column.accessorFn(row)
      }
      if (column.accessorKey) {
        return row[column.accessorKey]
      }
      return null
    }
    
    // Render sort icon
    const renderSortIcon = (columnId: string) => {
      const sort = currentSort.find(s => s.id === columnId)
      if (!sort) return <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      return sort.desc ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronUp className="ml-2 h-4 w-4" />
      )
    }
    
    // Mobile card view
    if (isMobile && mobileCardRender) {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {toolbar && (
            <div className="flex items-center justify-between gap-2 p-4 border-b">
              {toolbar}
            </div>
          )}
          
          {currentSelection.size > 0 && bulkActions && (
            <div className="flex items-center gap-2 p-4 bg-muted">
              <span className="text-sm text-muted-foreground">
                {currentSelection.size} selected
              </span>
              {bulkActions}
            </div>
          )}
          
          <div className="space-y-3">
            {displayData.map((row, idx) => {
              const actualIndex = enableVirtualization
                ? virtualization.startIndex + idx
                : enablePagination
                ? pageIndex * pageSize + idx
                : idx
              
              return (
                <div key={actualIndex} className="border rounded-lg p-4 bg-card">
                  {enableSelection && (
                    <div className="mb-3">
                      <Checkbox
                        checked={currentSelection.has(actualIndex)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(actualIndex, checked as boolean)
                        }
                      />
                    </div>
                  )}
                  {mobileCardRender(row, actualIndex)}
                </div>
              )
            })}
          </div>
          
          {enablePagination && (
            <DataTablePagination
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageCount={pageCount || Math.ceil(sortedData.length / pageSize)}
              onPageChange={onPageChange || (() => {})}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </div>
      )
    }
    
    // Desktop table view
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {/* Toolbar */}
        {toolbar && (
          <div className="flex items-center justify-between gap-2">
            {toolbar}
            <DataTableViewOptions
              columns={columns}
              hiddenColumns={currentHiddenColumns}
              onToggleColumn={toggleColumnVisibility}
              density={internalDensity}
              onDensityChange={setInternalDensity}
            />
          </div>
        )}
        
        {/* Bulk Actions Bar */}
        {currentSelection.size > 0 && bulkActions && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
            <span className="text-sm font-medium">
              {currentSelection.size} row{currentSelection.size !== 1 ? "s" : ""} selected
            </span>
            <div className="flex-1" />
            {bulkActions}
          </div>
        )}
        
        {/* Table Container */}
        <div
          ref={containerRef}
          className={cn(
            "relative border rounded-md",
            fullWidth && "w-full",
            enableVirtualization && "overflow-auto",
            !enableVirtualization && "overflow-x-auto"
          )}
          style={enableVirtualization ? { maxHeight: "600px" } : undefined}
        >
          <table className={cn(dataTableVariants({ density: internalDensity }), "relative")}>
            <thead
              className={cn(
                "bg-muted/50",
                stickyHeader && "sticky top-0 z-10 bg-background border-b"
              )}
            >
              <tr>
                {enableSelection && (
                  <th className="w-12 border-r">
                    <Checkbox
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((_, idx) => {
                          const actualIdx = enableVirtualization
                            ? virtualization.startIndex + idx
                            : idx
                          return currentSelection.has(actualIdx)
                        })
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                
                {visibleColumns.map((column) => {
                  const sortable = enableSorting && column.enableSorting !== false
                  
                  return (
                    <th
                      key={column.id}
                      className={cn(
                        "text-left font-medium border-r last:border-r-0",
                        column.sticky === "left" && "sticky left-0 z-20 bg-background",
                        column.sticky === "right" && "sticky right-0 z-20 bg-background",
                        sortable && "cursor-pointer select-none hover:bg-muted/80",
                        column.headerClassName
                      )}
                      style={{
                        width: columnWidths[column.id] || column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                      }}
                      onClick={() => sortable && handleSort(column.id)}
                    >
                      <div className="flex items-center">
                        {column.header}
                        {sortable && renderSortIcon(column.id)}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            
            <tbody className="relative">
              {enableVirtualization && (
                <tr style={{ height: virtualization.offsetY }} />
              )}
              
              {loading ? (
                <tr>
                  <td
                    colSpan={visibleColumns.length + (enableSelection ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Loading...
                  </td>
                </tr>
              ) : displayData.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumns.length + (enableSelection ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                displayData.map((row, idx) => {
                  const actualIndex = enableVirtualization
                    ? virtualization.startIndex + idx
                    : enablePagination
                    ? pageIndex * pageSize + idx
                    : idx
                  
                  return (
                    <tr
                      key={actualIndex}
                      className={cn(
                        "border-b last:border-b-0 hover:bg-muted/50",
                        currentSelection.has(actualIndex) && "bg-muted"
                      )}
                    >
                      {enableSelection && (
                        <td className="border-r">
                          <Checkbox
                            checked={currentSelection.has(actualIndex)}
                            onCheckedChange={(checked) =>
                              handleSelectRow(actualIndex, checked as boolean)
                            }
                          />
                        </td>
                      )}
                      
                      {visibleColumns.map((column) => {
                        const value = getCellValue(column, row)
                        const cellContent = column.cell
                          ? column.cell(value, row, actualIndex)
                          : value
                        
                        return (
                          <td
                            key={column.id}
                            className={cn(
                              "border-r last:border-r-0",
                              column.sticky === "left" && "sticky left-0 z-10 bg-background",
                              column.sticky === "right" && "sticky right-0 z-10 bg-background",
                              column.className
                            )}
                            style={{
                              width: columnWidths[column.id] || column.width,
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                            }}
                          >
                            {cellContent}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              )}
              
              {enableVirtualization && (
                <tr
                  style={{
                    height: virtualization.totalHeight - virtualization.offsetY - displayData.length * estimatedRowHeight,
                  }}
                />
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {enablePagination && (
          <DataTablePagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={pageCount || Math.ceil(sortedData.length / pageSize)}
            onPageChange={onPageChange || (() => {})}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </div>
    )
  }
)
DataTable.displayName = "DataTable"

// ============================================================================
// Pagination Component
// ============================================================================

interface DataTablePaginationProps {
  pageIndex: number
  pageSize: number
  pageCount: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

function DataTablePagination({
  pageIndex,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <>
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <select
              className="h-8 w-16 rounded-md border bg-background px-2 text-sm"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Page {pageIndex + 1} of {pageCount}
        </span>
        
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// View Options Component
// ============================================================================

interface DataTableViewOptionsProps {
  columns: DataTableColumn[]
  hiddenColumns: Set<string>
  onToggleColumn: (columnId: string) => void
  density: DensityType
  onDensityChange: (density: DensityType) => void
}

function DataTableViewOptions({
  columns,
  hiddenColumns,
  onToggleColumn,
  density,
  onDensityChange,
}: DataTableViewOptionsProps) {
  const [open, setOpen] = React.useState(false)
  
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
      >
        <Settings2 className="mr-2 h-4 w-4" />
        View
      </Button>
      
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-md border bg-popover p-4 shadow-md">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm font-medium">Density</h4>
                <div className="space-y-1">
                  {(["compact", "default", "comfortable"] as DensityType[]).map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        checked={density === d}
                        onChange={() => onDensityChange(d)}
                        className="h-4 w-4"
                      />
                      <span className="capitalize">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="mb-2 text-sm font-medium">Toggle columns</h4>
                <div className="space-y-1 max-h-64 overflow-auto">
                  {columns
                    .filter((col) => col.enableHiding !== false)
                    .map((col) => (
                      <label
                        key={col.id}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <Checkbox
                          checked={!hiddenColumns.has(col.id)}
                          onCheckedChange={() => onToggleColumn(col.id)}
                        />
                        <span>{typeof col.header === "string" ? col.header : col.id}</span>
                      </label>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export { DataTable, dataTableVariants }
