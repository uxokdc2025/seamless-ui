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
  { name: "Platform", href: "/layout" },
]

const componentLinks = [
  { name: "Accordion", href: "/components/accordion" },
  { name: "Alert", href: "/components/alert" },
  { name: "Alert Dialog", href: "/components/alert-dialog" },
  { name: "Aspect Ratio", href: "/components/aspect-ratio" },
  { name: "Avatar", href: "/components/avatar" },
  { name: "Badge", href: "/components/badge" },
  { name: "Breadcrumb", href: "/components/breadcrumb" },
  { name: "Button", href: "/components/button" },
  { name: "Button Group", href: "/components/button-group" },
  { name: "Calendar", href: "/components/calendar" },
  { name: "Card", href: "/components/card" },
  { name: "Carousel", href: "/components/carousel" },
  { name: "Chart", href: "/components/chart" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Collapsible", href: "/components/collapsible" },
  { name: "Combobox", href: "/components/combobox" },
  { name: "Command", href: "/components/command" },
  { name: "Context Menu", href: "/components/context-menu" },
  { name: "Data Table", href: "/components/data-table" },
  { name: "Date Picker", href: "/components/date-picker" },
  { name: "Dialog", href: "/components/dialog" },
  { name: "Drawer", href: "/components/drawer" },
  { name: "Dropdown Menu", href: "/components/dropdown-menu" },
  { name: "Empty", href: "/components/empty" },
  { name: "Field", href: "/components/field" },
  { name: "Hover Card", href: "/components/hover-card" },
  { name: "Input", href: "/components/input" },
  { name: "Input Group", href: "/components/input-group" },
  { name: "Input OTP", href: "/components/input-otp" },
  { name: "Kbd", href: "/components/kbd" },
  { name: "Label", href: "/components/label" },
  { name: "Menubar", href: "/components/menubar" },
  { name: "Native Select", href: "/components/native-select" },
  { name: "Navigation Menu", href: "/components/navigation-menu" },
  { name: "Pagination", href: "/components/pagination" },
  { name: "Popover", href: "/components/popover" },
  { name: "Progress", href: "/components/progress" },
  { name: "Radio Group", href: "/components/radio-group" },
  { name: "Resizable", href: "/components/resizable" },
  { name: "Scroll Area", href: "/components/scroll-area" },
  { name: "Select", href: "/components/select" },
  { name: "Separator", href: "/components/separator" },
  { name: "Sheet", href: "/components/sheet" },
  { name: "Skeleton", href: "/components/skeleton" },
  { name: "Slider", href: "/components/slider" },
  { name: "Spinner", href: "/components/spinner" },
  { name: "Switch", href: "/components/switch" },
  { name: "Table", href: "/components/table" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Textarea", href: "/components/textarea" },
  { name: "Toast", href: "/components/toast" },
  { name: "Toggle", href: "/components/toggle" },
  { name: "Toggle Group", href: "/components/toggle-group" },
  { name: "Tooltip", href: "/components/tooltip" },
  { name: "Typography", href: "/components/typography" },
]

const getStartedGroup = [
  { name: "Getting Started", href: "/getting-started" },
  { name: "Foundations", href: "/foundations" },
]
const themesGroup = [
  { name: "Themes", href: "/themes" },
  { name: "Theme Studio", href: "/theme-studio" },
  { name: "Design Systems", href: "/design-systems" },
]
const platformGroup = [
  { name: "Layout", href: "/layout" },
  { name: "SaaS", href: "/saas" },
  { name: "AI", href: "/ai" },
  { name: "Patterns", href: "/patterns" },
  { name: "Registry", href: "/registry" },
]
const blocksGroup = [
  { name: "Blocks", href: "/blocks" },
]
function getSidebarGroups(pathname: string) {
  const p = pathname || "/"
  if (p.startsWith("/themes") || p.startsWith("/theme-studio") || p.startsWith("/design-systems")) {
    return [{ header: "Themes", items: themesGroup }]
  }
  if (p.startsWith("/blocks")) {
    return [{ header: "Blocks", items: blocksGroup }]
  }
  if (p.startsWith("/layout") || p.startsWith("/saas") || p.startsWith("/ai") || p.startsWith("/patterns") || p.startsWith("/registry")) {
    return [{ header: "Platform", items: platformGroup }]
  }
  return [
    { header: "Get Started", items: getStartedGroup },
    { header: "Components", items: componentLinks },
  ]
}

interface DocsShellProps {
  children: React.ReactNode
  title?: string
}

function RightRailTOC({ pathname }: { pathname: string }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([])
  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) { setItems([]); return }
    const hs = Array.from(main.querySelectorAll("h2, h3")) as HTMLElement[]
    const out = hs
      .filter((h) => (h.textContent || "").trim().length > 0)
      .map((h) => {
        let id = h.id
        if (!id) {
          id = (h.textContent || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          h.id = id
        }
        return { id, text: (h.textContent || "").trim(), level: h.tagName === "H3" ? 3 : 2 }
      })
    setItems(out)
  }, [pathname])
  if (items.length === 0) return null
  return (
    <aside className="hidden-mobile" style={{ width: "220px", flexShrink: 0, position: "sticky", top: "60px", alignSelf: "flex-start", height: "calc(100vh - 60px)", overflowY: "auto", padding: "32px 16px" }}>
      <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px", color: "var(--color-foreground)" }}>On This Page</div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {items.map((it) => (
          <a
            key={it.id}
            href={"#" + it.id}
            onClick={(e) => { e.preventDefault(); const el = document.getElementById(it.id); if (el) { window.history.replaceState(null, "", "#" + it.id); el.scrollIntoView({ behavior: "smooth", block: "start" }) } }}
            style={{ fontSize: "13px", color: "var(--color-muted-foreground)", paddingLeft: it.level === 3 ? "12px" : "0", textDecoration: "none", lineHeight: 1.4, transition: "color 0.15s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-foreground)" }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-muted-foreground)" }}
          >
            {it.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}

export function DocsShell({ children, title = "Seamless UI" }: DocsShellProps) {
  const pathname = usePathname()
  const [currentTheme, setCurrentTheme] = useState<Theme>("midnight-aubergine")
  const [currentMode, setCurrentMode] = useState<Mode>("light")
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isHomePage = pathname === "/"

  useEffect(() => {
    // Default look = shadcn-neutral (no brand data-theme). Only track light/dark mode.
    document.documentElement.setAttribute("data-mode", currentMode)
    document.documentElement.removeAttribute("data-theme")
  }, [currentMode])

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
      background: 'var(--color-background)',
      color: 'var(--color-foreground)'
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-background)',
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
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary-foreground)',
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
                    color: isActive ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                    transition: 'color 0.15s ease, background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'color-mix(in srgb, var(--color-muted) calc(0.5 * 100%), transparent)'
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
                color: 'var(--color-muted-foreground)'
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
                background: 'var(--color-muted)',
                borderRadius: '4px'
              }}>⌘K</kbd>
            </Button>

            {/* Theme toggle */}
            <div style={{
              display: 'flex',
              border: '1px solid var(--color-border)',
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
                  background: currentMode === "light" ? 'var(--color-muted)' : 'transparent'
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
                  background: currentMode === "dark" ? 'var(--color-muted)' : 'transparent'
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
                border: '1px solid var(--color-border)',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-muted)'
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
        maxWidth: isHomePage ? '100%' : '1600px',
        margin: '0 auto'
      }}>
        {/* Left Sidebar - Hidden on homepage */}
        {!isHomePage && (
          <aside style={{
            width: '260px',
            flexShrink: 0,
            borderRight: '1px solid var(--color-border)',
            height: 'calc(100vh - 60px)',
            position: 'sticky',
            top: '60px',
            overflowY: 'auto',
            padding: '24px 16px'
          }} className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {getSidebarGroups(pathname || "/").map((group) => (
            <div key={group.header} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-foreground)', padding: '0 12px', marginBottom: '8px' }}>{group.header}</div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        borderRadius: '6px',
                        color: isActive ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                        background: isActive ? 'var(--color-muted)' : 'transparent',
                        fontWeight: isActive ? 500 : 400,
                        transition: 'background 0.15s ease, color 0.15s ease'
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'color-mix(in srgb, var(--color-muted) calc(0.5 * 100%), transparent)' }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
          </aside>
        )}

        {/* Main Content */}
        <main style={{ 
          flex: 1,
          minWidth: 0,
          padding: isHomePage ? '0' : '32px'
        }}>
          {children}
        </main>
        {!isHomePage && <RightRailTOC pathname={pathname || "/"} />}
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
            background: var(--color-background);
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
