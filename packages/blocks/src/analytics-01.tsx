import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Button, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@seamless/ui"
import { Container, Grid } from "@seamless/layout"

export interface AnalyticsMetric {
  label: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "stable"
}

export interface ChartData {
  label: string
  value: number
}

export interface AnalyticsProps {
  title?: string
  metrics: AnalyticsMetric[]
  chartData?: {
    daily?: ChartData[]
    weekly?: ChartData[]
    monthly?: ChartData[]
  }
  topItems?: Array<{
    id: string
    name: string
    value: number
    percentage?: number
  }>
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

const Analytics01 = React.forwardRef<HTMLDivElement, AnalyticsProps>(
  ({ title = "Analytics", metrics, chartData, topItems = [], actions = [], ...props }, ref) => {
    const [timeRange, setTimeRange] = React.useState<"daily" | "weekly" | "monthly">("weekly")

    const trendIcons = {
      up: "↑",
      down: "↓",
      stable: "→",
    }

    const trendColors = {
      up: "text-green-600",
      down: "text-red-600",
      stable: "text-muted-foreground",
    }

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

          {/* Metrics */}
          <Grid cols={4} gap="md">
            {metrics.map((metric, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  {metric.change && metric.trend && (
                    <p className={`text-xs mt-1 ${trendColors[metric.trend]}`}>
                      {trendIcons[metric.trend]} {metric.change}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Charts */}
          {chartData && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Trends</CardTitle>
                    <CardDescription>Performance over time</CardDescription>
                  </div>
                  <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-around gap-2">
                  {(chartData[timeRange] || []).map((item, i) => {
                    const maxValue = Math.max(...(chartData[timeRange] || []).map(d => d.value))
                    const height = (item.value / maxValue) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-primary rounded-t transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                          title={`${item.label}: ${item.value}`}
                        />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Items */}
          {topItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest performing items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topItems.map((item, i) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-semibold">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        {item.percentage !== undefined && (
                          <div className="w-full bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="text-xl font-bold">{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    )
  }
)
Analytics01.displayName = "Analytics01"

export { Analytics01 }
