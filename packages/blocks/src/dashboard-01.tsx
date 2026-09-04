import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, Button } from "@seamless/ui"
import { Grid, Container } from "@seamless/layout"

export interface DashboardProps {
  title?: string
  stats?: Array<{
    label: string
    value: string | number
    change?: string
  }>
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const Dashboard01 = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({ title = "Dashboard", stats = [], actions = [], ...props }, ref) => {
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

          {/* Stats Grid */}
          <Grid cols={4} gap="md">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Main Content Area */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Dashboard content goes here
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }
)
Dashboard01.displayName = "Dashboard01"

export { Dashboard01 }