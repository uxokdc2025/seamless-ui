"use client"

import * as AIComponents from "@seamless/ai"
import { Bot, Cpu, MessageSquare, Zap, Activity } from "lucide-react"

const categoryIcons: Record<string, React.ComponentType<any>> = {
  "Agent Components": Bot,
  Interaction: MessageSquare,
  "Artifacts & Results": Activity,
  "Chat & Prompts": MessageSquare,
  "Metrics & Costs": Activity,
  Execution: Zap,
  "Fleet & Workers": Cpu,
  "Task Management": Activity,
  "Badges & Indicators": Activity,
  "Tools & Actions": Zap,
}

interface AIPreviewProps {
  slug: string
  componentName: string
  category: string
}

export function AIPreview({ slug, componentName, category }: AIPreviewProps) {
  const Component = AIComponents[componentName as keyof typeof AIComponents] as any
  const IconComponent = categoryIcons[category] || Bot

  switch (slug) {
    case "agent-card":
      return (
        <Component
          name="Research Agent"
          status="active"
          description="Autonomous research assistant"
          metrics={{ tasks: 42, uptime: "99.9%" }}
        />
      )
    case "chat-message":
      return (
        <div className="space-y-4 w-full">
          <Component role="user" content="Hello! How can you help me today?" />
          <Component
            role="assistant"
            content="I'm an AI assistant. I can help with coding, research, and more!"
          />
        </div>
      )
    case "agent-status":
      return <Component status="active" />
    case "model-badge":
      return <Component model="gpt-4" />
    case "provider-badge":
      return <Component provider="openai" />
    case "task-status":
      return <Component status="running" />
    case "token-usage":
      return <Component inputTokens={1250} outputTokens={850} totalTokens={2100} />
    case "cost-display":
      return <Component cost={0.042} currency="USD" />
    case "execution-status":
      return <Component status="running" progress={65} />
    case "tool-call":
      return (
        <Component
          toolName="web_search"
          parameters={{ query: "latest AI news", limit: 5 }}
          status="success"
        />
      )
    default:
      return (
        <div className="text-muted-foreground text-sm">
          <IconComponent className="h-12 w-12 mx-auto mb-2" />
          <p className="text-center">{componentName} Preview</p>
        </div>
      )
  }
}
