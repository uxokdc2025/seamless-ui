"use client"

import { useState, useEffect } from "react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@seamless/ui"
import { applyTheme, themes, modes, type Theme, type Mode } from "@seamless/themes"
import { Search, Moon, Sun, Github, Menu, X, Home, BookOpen, Blocks, Palette, Layers, Brain, Target } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigation = [
  { name: "Getting Started", href: "/getting-started", icon: Home },
  { name: "Foundations", href: "/foundations", icon: Palette },
  { name: "Components", href: "/components", icon: Blocks },
  { name: "Layout", href: "/layout", icon: Layers },
  { name: "SaaS", href: "/saas", icon: Brain },
  { name: "AI", href: "/ai", icon: Brain },
  { name: "Patterns (Roadmap)", href: "/patterns", icon: Target },
  { name: "Blocks", href: "/blocks", icon: Blocks },
  { name: "Themes", href: "/themes", icon: Palette },
  { name: "Theme Studio", href: "/theme-studio", icon: Palette },
  { name: "Design Systems", href: "/design-systems", icon: BookOpen },
  { name: "Registry", href: "/registry", icon: Blocks },
]

const topNavLinks = [
  { name: "Docs", href: "/getting-started" },
  { name: "Components", href: "/components" },
  { name: "Blocks", href: "/blocks" },
  { name: "Themes", href: "/themes" },
  { name: "Registry", href: "/registry" },
]

interface DocsShellProps {
  children: React.ReactNode
  title?: string
}

export function DocsShell({ children, title = "Seamless UI" }: DocsShellProps) {
  const pathname = usePathname()
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight-aubergine")
  const [currentMode, setCurrentMode] = useState<Mode>("light")
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

  return (
    <div className="min-h-screen" style={{ 
      background: 'hsl(var(--color-background))',
      color: 'hsl(var(--color-foreground))'
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        borderBottom: '1px solid hsl(var(--color-border))',
        background: 'hsl(var(--color-background))',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 24px',
          gap: '24px'
        }}>
          {/* Logo */}
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontWeight: 600,
            fontSize: '16px',
            marginRight: '16px'
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'hsl(var(--color-primary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(var(--color-primary-foreground))',
              fontWeight: 700,
              fontSize: '16px'
            }}>
              S
            </div>
            <span>Seamless</span>
          </Link>

          {/* Top Nav Links (desktop) */}
          <nav style={{ 
            display: 'flex', 
            gap: '2px',
            flex: 1
          }} className="hidden-mobile">
            {topNavLinks.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '6px',
                    color: isActive ? 'hsl(var(--color-foreground))' : 'hsl(var(--color-muted-foreground))',
                    transition: 'color 0.15s ease, background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'hsl(var(--color-muted) / 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right side controls */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            marginLeft: 'auto'
          }}>
            {/* Search button */}
            <Button
              variant="outline"
              style={{
                gap: '8px',
                minWidth: '200px',
                justifyContent: 'flex-start',
                color: 'hsl(var(--color-muted-foreground))'
              }}
              className="hidden-mobile"
              onClick={() => setSearchOpen(true)}
            >
              <Search style={{ width: '16px', height: '16px' }} />
              <span>Search...</span>
              <kbd style={{
                marginLeft: 'auto',
                padding: '2px 6px',
                fontSize: '12px',
                background: 'hsl(var(--color-muted))',
                borderRadius: '4px'
              }}>⌘K</kbd>
            </Button>

            {/* Theme toggle */}
            <div style={{
              display: 'flex',
              border: '1px solid hsl(var(--color-border))',
              borderRadius: '6px',
              padding: '2px'
            }}>
              <Button
                variant="ghost"
                size="icon"
                style={{
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  background: currentMode === "light" ? 'hsl(var(--color-muted))' : 'transparent'
                }}
                onClick={() => handleModeChange("light")}
              >
                <Sun style={{ width: '16px', height: '16px' }} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                style={{
                  width: '32px',
                  height: '32px',
                  padding: 0,
                  background: currentMode === "dark" ? 'hsl(var(--color-muted))' : 'transparent'
                }}
                onClick={() => handleModeChange("dark")}
              >
                <Moon style={{ width: '16px', height: '16px' }} />
              </Button>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/seamless-ui"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                border: '1px solid hsl(var(--color-border))',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'hsl(var(--color-muted))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Github style={{ width: '18px', height: '18px' }} />
            </a>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Layout: Sidebar + Content */}
      <div style={{ 
        display: 'flex',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '260px',
          flexShrink: 0,
          borderRight: '1px solid hsl(var(--color-border))',
          height: 'calc(100vh - 60px)',
          position: 'sticky',
          top: '60px',
          overflowY: 'auto',
          padding: '24px 16px'
        }} className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: isActive ? 500 : 400,
                    borderRadius: '6px',
                    color: isActive ? 'hsl(var(--color-foreground))' : 'hsl(var(--color-muted-foreground))',
                    background: isActive ? 'hsl(var(--color-muted))' : 'transparent',
                    transition: 'background 0.15s ease, color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'hsl(var(--color-muted) / 0.5)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Theme selector in sidebar */}
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid hsl(var(--color-border))' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: 500,
              marginBottom: '8px',
              color: 'hsl(var(--color-muted-foreground))',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Theme
            </label>
            <Select value={currentTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-full">
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
          </div>

          {/* External links */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid hsl(var(--color-border))' }}>
            <a
              href="https://storybook.goseamless.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                color: 'hsl(var(--color-muted-foreground))',
                transition: 'background 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'hsl(var(--color-muted) / 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <BookOpen style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              <span>Storybook</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px' }}>↗</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ 
          flex: 1,
          minWidth: 0,
          padding: '32px'
        }}>
          {children}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .sidebar {
            position: fixed;
            left: -260px;
            top: 60px;
            z-index: 40;
            background: hsl(var(--color-background));
            transition: left 0.3s ease;
          }
          .sidebar.mobile-open {
            left: 0;
          }
        }
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
