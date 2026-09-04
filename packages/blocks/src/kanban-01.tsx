import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, Badge, Button } from "@seamless/ui"
import { Container, Grid } from "@seamless/layout"

export interface KanbanColumn {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanItem {
  id: string
  title: string
  description?: string
  assignee?: string
  priority?: "low" | "medium" | "high"
  tags?: string[]
}

export interface KanbanProps {
  title?: string
  columns: KanbanColumn[]
  onItemClick?: (item: KanbanItem) => void
  onItemMove?: (itemId: string, fromColumn: string, toColumn: string) => void
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const Kanban01 = React.forwardRef<HTMLDivElement, KanbanProps>(
  ({ title = "Kanban Board", columns, onItemClick, onItemMove, actions = [], ...props }, ref) => {
    const priorityColors = {
      low: "default",
      medium: "secondary",
      high: "destructive",
    } as const

    return (
      <Container ref={ref} {...props}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex gap-2">
              {actions.map((action, i) => (
                <Button key={i} onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(300px, 1fr))` }}>
            {columns.map((column) => (
              <div key={column.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="outline">{column.items.length}</Badge>
                </div>
                <div className="space-y-2 min-h-[200px] bg-muted/30 rounded-lg p-2">
                  {column.items.map((item) => (
                    <Card 
                      key={item.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onItemClick?.(item)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-sm font-medium leading-tight">
                            {item.title}
                          </CardTitle>
                          {item.priority && (
                            <Badge variant={priorityColors[item.priority]}>
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      {(item.description || item.tags || item.assignee) && (
                        <CardContent className="p-4 pt-0">
                          {item.description && (
                            <p className="text-xs text-muted-foreground mb-2">
                              {item.description}
                            </p>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap mb-2">
                              {item.tags.map((tag, i) => (
                                <Badge key={i} variant="outline">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {item.assignee && (
                            <div className="text-xs text-muted-foreground">
                              Assigned to: {item.assignee}
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    )
  }
)
Kanban01.displayName = "Kanban01"

export { Kanban01 }
