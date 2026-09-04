import * as React from "react"
import { cn } from "@seamless/ui"
import { Textarea } from "@seamless/ui"

export interface PromptComposerProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit'> {
  onSubmit?: (prompt: string) => void
  loading?: boolean
  submitLabel?: string
}

const PromptComposer = React.forwardRef<HTMLTextAreaElement, PromptComposerProps>(
  (
    {
      className,
      onSubmit,
      loading = false,
      submitLabel = "Send",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (value.trim() && !loading && onSubmit) {
        onSubmit(value)
        setValue("")
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }

    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)}>
        <div className="relative">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt..."
            className="min-h-[100px] resize-none pr-24"
            disabled={loading}
            {...props}
          />
          <button
            type="submit"
            disabled={!value.trim() || loading}
            className={cn(
              "absolute bottom-3 right-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors",
              "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {loading ? "Sending..." : submitLabel}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    )
  }
)
PromptComposer.displayName = "PromptComposer"

export { PromptComposer }
