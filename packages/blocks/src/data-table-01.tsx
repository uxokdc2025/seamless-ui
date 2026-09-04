import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, Button, Input, Badge } from "@seamless/ui"
import { Container, Stack } from "@seamless/layout"

export interface DataTableColumn<T = any> {
  id: string
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  sortable?: boolean
}

export interface DataTableProps<T = any> {
  title?: string
  columns: DataTableColumn<T>[]
  data: T[]
  searchable?: boolean
  onSearch?: (query: string) => void
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const DataTable01 = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ title = "Data Table", columns, data, searchable, onSearch, pagination, actions = [], ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{title}</CardTitle>
              <div className="flex gap-2">
                {searchable && (
                  <Input 
                    placeholder="Search..."
                    className="w-64"
                    onChange={(e) => onSearch?.(e.target.value)}
                  />
                )}
                {actions.map((action, i) => (
                  <Button key={i} onClick={action.onClick}>
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {columns.map((column) => (
                      <th key={column.id} className="text-left p-3 font-medium">
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      {columns.map((column) => (
                        <td key={column.id} className="p-3">
                          {typeof column.accessor === "function" 
                            ? column.accessor(row)
                            : String(row[column.accessor])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                  {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
                  {pagination.total} results
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={pagination.page === 1}
                    onClick={() => pagination.onPageChange(pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={pagination.page * pagination.pageSize >= pagination.total}
                    onClick={() => pagination.onPageChange(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    )
  }
)
DataTable01.displayName = "DataTable01"

export { DataTable01 }
