import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardHeader, CardContent, Badge } from "@seamless/ui"

export interface QAResultProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string
  answer: string
  confidence?: number
  sources?: Array<{
    title: string
    url?: string
  }>
  timestamp?: Date | string
}

const QAResult = React.forwardRef<HTMLDivElement, QAResultProps>(
  (
    { className, question, answer, confidence, sources, timestamp, ...props },
    ref
  ) => {
    const getConfidenceColor = (conf: number) => {
      if (conf >= 0.8) return "success"
      if (conf >= 0.5) return "secondary"
      return "destructive"
    }

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">Q: {question}</h3>
              {timestamp && (
                <time className="mt-1 text-xs text-muted-foreground">
                  {typeof timestamp === "string"
                    ? timestamp
                    : timestamp.toLocaleString()}
                </time>
              )}
            </div>
            {confidence !== undefined && (
              <Badge variant={getConfidenceColor(confidence) as any}>
                {Math.round(confidence * 100)}% confidence
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Answer:</p>
            <p className="mt-1 text-sm whitespace-pre-wrap">{answer}</p>
          </div>
          {sources && sources.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sources:</p>
              <ul className="mt-2 space-y-1">
                {sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {source.title}
                      </a>
                    ) : (
                      <span>{source.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)
QAResult.displayName = "QAResult"

export { QAResult }
