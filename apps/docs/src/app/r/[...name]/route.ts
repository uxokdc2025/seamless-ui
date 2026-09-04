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
  
  // Join the path segments and remove .json extension if present
  const fullPath = nameParts.join("/")
  const name = fullPath.replace(/\.json$/, "")
  
  // Find the component in the registry by name
  const component = registry.items.find((item) => {
    // Match exact name or strip @seamless/ prefix
    const itemName = item.name.replace(/^@seamless\//, "")
    const searchName = name.replace(/^@seamless\//, "")
    return itemName === searchName || item.name === name
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
