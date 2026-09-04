import * as React from "react"
import { cn } from "@seamless/ui"
import { Card, CardContent } from "@seamless/ui"

export interface ArtifactPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string
  fileType: "image" | "code" | "text" | "json" | "markdown" | "other"
  content?: string
  url?: string
  size?: number
  onDownload?: () => void
}

const typeIcons = {
  image: "🖼️",
  code: "📄",
  text: "📝",
  json: "📋",
  markdown: "📃",
  other: "📎",
}

const ArtifactPreview = React.forwardRef<HTMLDivElement, ArtifactPreviewProps>(
  (
    {
      className,
      filename,
      fileType,
      content,
      url,
      size,
      onDownload,
      ...props
    },
    ref
  ) => {
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 text-3xl">{typeIcons[fileType]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{filename}</h4>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="capitalize">{fileType}</span>
                {size !== undefined && <span>{formatSize(size)}</span>}
              </div>
              {content && fileType === "text" && (
                <pre className="mt-3 overflow-x-auto rounded bg-muted p-2 text-xs">
                  {content.slice(0, 200)}
                  {content.length > 200 && "..."}
                </pre>
              )}
              {url && fileType === "image" && (
                <img
                  src={url}
                  alt={filename}
                  className="mt-3 max-h-48 rounded border border-border object-contain"
                />
              )}
            </div>
            {onDownload && (
              <button
                onClick={onDownload}
                className="flex-shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                Download
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ArtifactPreview.displayName = "ArtifactPreview"

export { ArtifactPreview }
