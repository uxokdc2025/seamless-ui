import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, Button, Input, Switch, Label } from "@seamless/ui"
import { Container, Stack } from "@seamless/layout"

export interface SettingsProps {
  title?: string
  sections?: Array<{
    id: string
    label: string
    description?: string
    fields: Array<{
      id: string
      label: string
      type: "text" | "toggle" | "select"
      value?: string | boolean
      onChange?: (value: any) => void
    }>
  }>
  onSave?: () => void
  onCancel?: () => void
}

const Settings01 = React.forwardRef<HTMLDivElement, SettingsProps>(
  ({ title = "Settings", sections = [], onSave, onCancel, ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
            </div>
            <div className="flex gap-2">
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              {onSave && (
                <Button onClick={onSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>

          {/* Settings Sections */}
          <Stack gap="lg">
            {sections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>{section.label}</CardTitle>
                  {section.description && (
                    <CardDescription>{section.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    {section.fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor={field.id}>{field.label}</Label>
                        </div>
                        <div className="flex-1">
                          {field.type === "toggle" && (
                            <Switch 
                              id={field.id}
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          )}
                          {field.type === "text" && (
                            <Input 
                              id={field.id}
                              value={field.value as string}
                              onChange={(e) => field.onChange?.(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </div>
      </Container>
    )
  }
)
Settings01.displayName = "Settings01"

export { Settings01 }
