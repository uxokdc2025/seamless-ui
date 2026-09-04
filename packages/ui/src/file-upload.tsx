import * as React from "react"
import { Upload, X, File } from "lucide-react"
import { cn } from "./lib/utils"

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onFilesChange?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: string
  multiple?: boolean
  dropzone?: boolean
  showPreview?: boolean
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      onFilesChange,
      maxFiles = 1,
      maxSize,
      accept,
      multiple = false,
      dropzone = true,
      showPreview = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles) return

      const fileArray = Array.from(newFiles)
      const validFiles = fileArray.filter((file) => {
        if (maxSize && file.size > maxSize) return false
        return true
      })

      const finalFiles = multiple
        ? [...files, ...validFiles].slice(0, maxFiles)
        : [validFiles[0]].filter(Boolean)

      setFiles(finalFiles)
      onFilesChange?.(finalFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (!disabled && dropzone) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const removeFile = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
      onFilesChange?.(newFiles)
    }

    return (
      <div className={cn("w-full", className)}>
        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-input hover:border-primary/50",
            disabled && "opacity-50 cursor-not-allowed",
            dropzone && "cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-semibold text-foreground">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            {accept && (
              <p className="text-xs text-muted-foreground">
                {accept.split(",").join(", ")}
              </p>
            )}
            {maxSize && (
              <p className="text-xs text-muted-foreground">
                Max size: {(maxSize / 1024 / 1024).toFixed(0)}MB
              </p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
            {...props}
          />
        </div>

        {showPreview && files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <File className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    ({(file.size / 1024).toFixed(1)}KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
