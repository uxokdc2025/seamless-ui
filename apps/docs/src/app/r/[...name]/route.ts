import { NextResponse } from "next/server"
import registry from "@seamless/registry/dist/registry.json"

interface Params {
  name: string[]
}

export async function GET(
  request: Request,
  context: { params: Promise<Params> }
) {
  const { name: nameParts } = await context.params

  // Join the path segments and remove a trailing .json extension if present.
  // Supports every shape shadcn may request:
  //   /r/button.json                -> "button"              (bare last segment)
  //   /r/ui/button.json             -> "ui/button"           (namespace {name} expansion)
  //   /r/@seamless/ui/button.json   -> "@seamless/ui/button" (fully-qualified name)
  const fullPath = nameParts.join("/")
  const name = fullPath.replace(/\.json$/, "")
  const target = name.replace(/^@seamless\//, "")

  // Find the component in the registry by exact name, namespace-stripped name,
  // or bare last path segment.
  const component = registry.items.find((item) => {
    const stripped = item.name.replace(/^@seamless\//, "") // e.g. "ui/button"
    const last = item.name.split("/").pop() // e.g. "button"
    return item.name === name || stripped === target || last === target
  })

  if (!component) {
    return NextResponse.json(
      { error: "Component not found", name },
      { status: 404 }
    )
  }

  return NextResponse.json(component, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
