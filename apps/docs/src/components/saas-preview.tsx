"use client"

import * as SaaSComponents from "@seamless/saas"
import { Users, Activity, Filter, Key, Building, Settings, DollarSign, Shield } from "lucide-react"

const categoryIcons: Record<string, React.ComponentType<any>> = {
  "User Interface": Users,
  "Data Display": Activity,
  "Data Management": Filter,
  "Administration": Shield,
  "Shell & Layout": Building,
  "Billing & Usage": DollarSign,
  "Panels & Drawers": Settings,
  "Status & Indicators": Activity,
  "Integrations": Key,
}

interface SaaSPreviewProps {
  slug: string
  componentName: string
  category: string
}

export function SaaSPreview({ slug, componentName, category }: SaaSPreviewProps) {
  const Component = SaaSComponents[componentName as keyof typeof SaaSComponents] as any
  const IconComponent = categoryIcons[category] || Activity

  switch (slug) {
    case "account-menu":
      return (
        <Component
          user={{ name: "Jane Smith", email: "jane@example.com" }}
          onSignOut={() => console.log("Sign out")}
        />
      )
    case "metric-card":
      return (
        <Component
          label="Active Users"
          value="2,847"
          change={{ value: 12.5, trend: "up" }}
          icon={<IconComponent className="h-6 w-6" />}
        />
      )
    case "environment-badge":
      return <Component environment="production" />
    case "usage-meter":
      return <Component label="Storage Used" current={65} limit={100} unit="GB" />
    default:
      return (
        <div className="text-muted-foreground text-sm">
          <IconComponent className="h-12 w-12 mx-auto mb-2" />
          <p className="text-center">{componentName} Preview</p>
        </div>
      )
  }
}
