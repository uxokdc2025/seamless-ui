import * as React from "react"
import { cn } from "@seamless/ui"
import { Plus, X } from "lucide-react"

export interface FilterRule {
  id: string
  field: string
  operator: string
  value: string
}

export interface FilterGroup {
  id: string
  logic: "and" | "or"
  rules: (FilterRule | FilterGroup)[]
}

export interface AdvancedFilterBuilderProps {
  filterGroup: FilterGroup
  onFilterChange: (group: FilterGroup) => void
  fields: Array<{ value: string; label: string }>
  operators?: Array<{ value: string; label: string }>
  className?: string
}

const defaultOperators = [
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "contains", label: "contains" },
  { value: "not_contains", label: "not contains" },
  { value: "greater_than", label: "greater than" },
  { value: "less_than", label: "less than" },
]

const AdvancedFilterBuilder = React.forwardRef<
  HTMLDivElement,
  AdvancedFilterBuilderProps
>(
  (
    {
      filterGroup,
      onFilterChange,
      fields,
      operators = defaultOperators,
      className,
      ...props
    },
    ref
  ) => {
    const addRule = () => {
      const newRule: FilterRule = {
        id: `rule-${Date.now()}`,
        field: fields[0]?.value || "",
        operator: operators[0]?.value || "",
        value: "",
      }
      onFilterChange({
        ...filterGroup,
        rules: [...filterGroup.rules, newRule],
      })
    }

    const removeRule = (id: string) => {
      onFilterChange({
        ...filterGroup,
        rules: filterGroup.rules.filter((rule) => {
          return "id" in rule && rule.id !== id
        }),
      })
    }

    const updateRule = (id: string, updates: Partial<FilterRule>) => {
      onFilterChange({
        ...filterGroup,
        rules: filterGroup.rules.map((rule) => {
          if ("id" in rule && rule.id === id) {
            return { ...rule, ...updates }
          }
          return rule
        }),
      })
    }

    const toggleLogic = () => {
      onFilterChange({
        ...filterGroup,
        logic: filterGroup.logic === "and" ? "or" : "and",
      })
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-3 rounded-lg border p-4", className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={toggleLogic}
            className="rounded-md bg-muted px-2 py-1 text-xs font-medium uppercase hover:bg-muted/80"
          >
            {filterGroup.logic}
          </button>
          <button
            onClick={addRule}
            className="flex items-center gap-1 text-sm text-brand hover:underline"
          >
            <Plus className="h-4 w-4" />
            Add rule
          </button>
        </div>

        {filterGroup.rules.map((rule) => {
          if ("id" in rule) {
            return (
              <div key={rule.id} className="flex items-center gap-2">
                <select
                  value={rule.field}
                  onChange={(e) => updateRule(rule.id, { field: e.target.value })}
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  {fields.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>
                <select
                  value={rule.operator}
                  onChange={(e) => updateRule(rule.id, { operator: e.target.value })}
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                  className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  placeholder="Value"
                />
                <button
                  onClick={() => removeRule(rule.id)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Remove rule"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          }
          return null
        })}

        {filterGroup.rules.length === 0 && (
          <div className="py-4 text-center text-sm text-muted-foreground">
            No rules defined. Click "Add rule" to start.
          </div>
        )}
      </div>
    )
  }
)
AdvancedFilterBuilder.displayName = "AdvancedFilterBuilder"

export { AdvancedFilterBuilder }
