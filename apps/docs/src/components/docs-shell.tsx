"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@seamless/saas"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from "@seamless/ui"
import { applyTheme, themes, modes, type Theme, type Mode } from "@seamless/themes"
import { Search, Moon, Sun, Monitor, Menu } from "lucide-react"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Getting Started", href: "/getting-started", icon: "🚀" },
  { name: "Foundations", href: "/foundations", icon: "🎨" },
  { name: "Components", href: "/components", icon: "🧩" },
  { name: "Layout", href: "/layout", icon: "📐" },
  { name: "SaaS", href: "/saas", icon: "💼" },
  { name: "AI", href: "/ai", icon: "🤖" },
  { name: "Patterns", href: "/patterns", icon: "🎯" },
  { name: "Blocks", href: "/blocks", icon: "🧱" },
  { name: "Themes", href: "/themes", icon: "🎨" },
  { name: "Theme Studio", href: "/theme-studio", icon: "🎛️" },
  { name: "Design Systems", href: "/design-systems", icon: "📚" },
  { name: "Registry", href: "/registry", icon: "📦" },
  { name: "Storybook", href: "https://storybook.goseamless.ai", icon: "📖", external: true },
]

interface DocsShellProps {
  children: React.ReactNode
  title?: string
}

export function DocsShell({ children, title = "Seamless UI" }: DocsShellProps) {
  const pathname = usePathname()
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight-aubergine")
  const [currentMode, setCurrentMode] = useState<Mode>("dark")
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    applyTheme({ theme: currentTheme, mode: currentMode })
  }, [currentTheme, currentMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme({ theme, mode: currentMode })
  }

  const handleModeChange = (mode: Mode) => {
    setCurrentMode(mode)
    applyTheme({ theme: currentTheme, mode })
  }

  const sidebar = (
    <div className="space-y-6 p-4">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-lg font-bold">
            S
          </div>
          <div>
            <h2 className="text-lg font-semibold">Seamless UI</h2>
            <p className="text-xs text-muted-foreground">v0.1.0</p>
          </div>
        </div>

        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </Button>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <a
                key={item.name}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.external && <span className="ml-auto text-xs">↗</span>}
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )

  const header = (
    <div className="flex items-center justify-between h-16 px-6 border-b border-border">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Select value={currentTheme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-44 hidden sm:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center border border-border rounded-md">
          <Button
            variant={currentMode === "light" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={() => handleModeChange("light")}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant={currentMode === "dark" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={() => handleModeChange("dark")}
          >
            <Moon className="h-4 w-4" />
          </Button>
        </div>

        <a
          href="https://github.com/seamless-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex"
        >
          <Button variant="outline" size="icon">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </Button>
        </a>
      </div>
    </div>
  )

  return (
    <AppShell sidebar={sidebar} header={header} sidebarCollapsible>
      {children}
    </AppShell>
  )
}
