import * as React from "react"
import { cn } from "@seamless/ui"

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: Date | string
  avatar?: React.ReactNode
}

const roleConfig = {
  user: {
    align: "justify-end",
    bg: "bg-primary text-primary-foreground",
    label: "You",
  },
  assistant: {
    align: "justify-start",
    bg: "bg-muted text-foreground",
    label: "Assistant",
  },
  system: {
    align: "justify-center",
    bg: "bg-secondary/50 text-secondary-foreground",
    label: "System",
  },
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, role, content, timestamp, avatar, ...props }, ref) => {
    const config = roleConfig[role]

    return (
      <div
        ref={ref}
        className={cn("flex w-full", config.align, className)}
        {...props}
      >
        <div className="flex max-w-[80%] gap-3">
          {role === "assistant" && avatar && (
            <div className="flex-shrink-0">{avatar}</div>
          )}
          <div>
            <div className={cn("rounded-lg px-4 py-2", config.bg)}>
              <p className="text-sm whitespace-pre-wrap">{content}</p>
            </div>
            {timestamp && (
              <time className="mt-1 block text-xs text-muted-foreground">
                {typeof timestamp === "string"
                  ? timestamp
                  : timestamp.toLocaleTimeString()}
              </time>
            )}
          </div>
          {role === "user" && avatar && (
            <div className="flex-shrink-0">{avatar}</div>
          )}
        </div>
      </div>
    )
  }
)
ChatMessage.displayName = "ChatMessage"

export { ChatMessage }
