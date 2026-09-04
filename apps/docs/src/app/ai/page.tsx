"use client"

import { DocsShell } from "../../components/docs-shell"
import { Container, Stack, Grid } from "@seamless/layout"
import { Card, CardHeader, CardTitle, CardContent } from "@seamless/ui"

export default function AIPage() {
  return (
    <DocsShell title="AI Components">
      <Container size="lg" className="py-8">
        <Stack gap="xl">
          <div>
            <h1 className="text-4xl font-bold mb-4">AI Components</h1>
            <p className="text-lg text-muted-foreground">
              Specialized components for AI-powered applications. Agent cards, chat interfaces, and more.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AgentCard</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <p className="text-sm text-muted-foreground">
                  Display AI agent status, metrics, and controls.
                </p>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <code>{`import { AgentCard } from "@seamless/ai"

<AgentCard
  name="Research Agent"
  status="active"
  description="Autonomous research assistant"
  metrics={{ tasks: 42, uptime: "99.9%" }}
/>`}</code>
                </pre>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                More AI components in development: ChatInterface, PromptBuilder, ModelSelector, and more.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </DocsShell>
  )
}
