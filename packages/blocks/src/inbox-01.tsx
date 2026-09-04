import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, Badge, Button, Checkbox, Input } from "@seamless/ui"
import { Container } from "@seamless/layout"

export interface InboxItem {
  id: string
  from: string
  subject: string
  preview: string
  date: string
  read: boolean
  starred?: boolean
  labels?: string[]
}

export interface InboxProps {
  title?: string
  items: InboxItem[]
  selectedItem?: InboxItem
  onItemSelect?: (item: InboxItem) => void
  onItemCheck?: (itemId: string, checked: boolean) => void
  onSearch?: (query: string) => void
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const Inbox01 = React.forwardRef<HTMLDivElement, InboxProps>(
  ({ title = "Inbox", items, selectedItem, onItemSelect, onItemCheck, onSearch, actions = [], ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex gap-2">
              {onSearch && (
                <Input 
                  placeholder="Search messages..."
                  className="w-64"
                  onChange={(e) => onSearch(e.target.value)}
                />
              )}
              {actions.map((action, i) => (
                <Button key={i} onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Inbox Layout */}
          <div className="grid grid-cols-3 gap-4">
            {/* Message List */}
            <Card className="h-[600px] overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-y-auto h-[520px]">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`border-b p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedItem?.id === item.id ? "bg-muted" : ""
                      } ${!item.read ? "font-semibold" : ""}`}
                      onClick={() => onItemSelect?.(item)}
                    >
                      <div className="flex items-start gap-3">
                        {onItemCheck && (
                          <Checkbox
                            checked={false}
                            onCheckedChange={(checked) => onItemCheck(item.id, checked as boolean)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm truncate">{item.from}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                          <div className="text-sm mb-1 truncate">{item.subject}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.preview}
                          </div>
                          {item.labels && item.labels.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {item.labels.map((label, i) => (
                                <Badge key={i} variant="secondary">
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Content */}
            <Card className="h-[600px] col-span-2">
              <CardHeader>
                <CardTitle>
                  {selectedItem ? selectedItem.subject : "Select a message"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedItem ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <div className="font-semibold">{selectedItem.from}</div>
                        <div className="text-sm text-muted-foreground">{selectedItem.date}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="outline" size="sm">Forward</Button>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p>{selectedItem.preview}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No message selected
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    )
  }
)
Inbox01.displayName = "Inbox01"

export { Inbox01 }
