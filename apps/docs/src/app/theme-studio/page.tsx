"use client"

import { useState, useEffect } from "react"
import { ThemeStudio } from "./theme-studio"

export default function ThemeStudioPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <ThemeStudio />
}
