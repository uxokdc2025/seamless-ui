import { NextResponse } from "next/server"
import registry from "@seamless/registry/dist/registry.json"

export async function GET() {
  return NextResponse.json(registry, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
