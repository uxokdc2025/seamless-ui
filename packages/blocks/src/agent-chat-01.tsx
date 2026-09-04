import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Button, Input, Badge } from "@seamless/ui"
import { Container, Stack } from "@seamless/layout"
import { AgentCard } from "@seamless/ai"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface AgentChatProps {
  title?: string
  agentName?: string
  agentStatus?: "online" | "offline" | "busy"
  messages: Message[]
  onSendMessage?: (message: string) => void
  isLoading?: boolean
  suggestions?: string[]
}

const AgentChat01 = React.forwardRef<HTMLDivElement, AgentChatProps>(
  ({ 
    title = "Agent Chat", 
    agentName = "AI Assistant",
    agentStatus = "online",
    messages, 
    onSendMessage, 
    isLoading = false,
    suggestions = [],
    ...props 
  }, ref) => {
    const [input, setInput] = React.useState("")

    const handleSend = () => {
      if (input.trim() && onSendMessage) {
        onSendMessage(input)
        setInput("")
      }
    }

    const statusColors = {
      online: "bg-green-500",
      offline: "bg-gray-400",
      busy: "bg-yellow-500",
    }

    return (
      <Container ref={ref} {...props}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{title}</h1>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${statusColors[agentStatus]}`} />
                <span className="text-sm text-muted-foreground">{agentName}</span>
              </div>
            </div>
            <Button variant="outline">Settings</Button>
          </div>

          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-sm">Thinking...</div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 border-t">
                <div className="flex gap-2 flex-wrap">
                  {suggestions.map((suggestion, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => onSendMessage?.(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    )
  }
)
AgentChat01.displayName = "AgentChat01"

export { AgentChat01 }
