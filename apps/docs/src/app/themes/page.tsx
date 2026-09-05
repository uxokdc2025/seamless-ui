"use client"

import { useState } from "react"
import { DocsShell } from "../../components/docs-shell"
import { Card, CardHeader, CardTitle, CardContent, Button } from "@seamless/ui"
import { applyTheme, themes, type Theme } from "@seamless/themes"
import { Check } from "lucide-react"
import { Stack } from "@seamless/layout"

export default function ThemesPage() {
  const [activeTheme, setActiveTheme] = useState<Theme>("midnight-aubergine")

  const handleApplyTheme = (theme: Theme) => {
    setActiveTheme(theme)
    applyTheme({ theme, mode: "light" })
  }

  const themeInfo: Record<Theme, { name: string; description: string }> = {
    "midnight-aubergine": {
      name: "Midnight Aubergine",
      description: "Deep purple with warm undertones, elegant and sophisticated"
    },
    "together": {
      name: "Together",
      description: "Collaborative and friendly palette with soft greens"
    },
    "airtable": {
      name: "Airtable",
      description: "Clean, organized blue-based system palette"
    },
    "claude": {
      name: "Claude",
      description: "Warm amber and cream, inspired by Claude AI"
    },
    "discord": {
      name: "Discord",
      description: "Bold indigo and blurple gaming aesthetic"
    },
    "elevenlabs": {
      name: "ElevenLabs",
      description: "Modern tech gradient with vibrant accents"
    },
    "ibm": {
      name: "IBM",
      description: "Classic blue enterprise design language"
    },
    "meta": {
      name: "Meta",
      description: "Bold, energetic social media palette"
    }
  }

  return (
    <DocsShell title="Themes">
      <div style={{ maxWidth: '1200px' }}>
        <Stack gap="xl">
          <div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700, 
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Themes
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: 'hsl(var(--color-muted-foreground))',
              lineHeight: 1.6,
              maxWidth: '700px'
            }}>
              8 professionally crafted themes. Each theme includes a complete color system with full light and dark mode support.
            </p>
          </div>

          {/* Installation */}
          <div style={{
            border: '1px solid hsl(var(--color-border))',
            borderRadius: '8px',
            padding: '24px',
            background: 'hsl(var(--color-muted) / 0.2)'
          }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              Installation
            </h2>
            <pre style={{
              margin: 0,
              padding: '16px',
              background: 'hsl(var(--color-background))',
              border: '1px solid hsl(var(--color-border))',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'var(--font-geist-mono), monospace',
              overflowX: 'auto'
            }}>
              <code>{`import { applyTheme } from "@seamless/themes"

applyTheme({ theme: "midnight-aubergine", mode: "light" })`}</code>
            </pre>
          </div>

          {/* Theme Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px'
          }}>
            {themes.map((theme) => {
              const info = themeInfo[theme]
              const isActive = theme === activeTheme
              
              return (
                <div
                  key={theme}
                  style={{
                    border: `2px solid ${isActive ? 'hsl(var(--color-primary))' : 'hsl(var(--color-border))'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleApplyTheme(theme)}
                >
                  {/* Theme Preview */}
                  <div 
                    style={{
                      height: '180px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      background: 'hsl(var(--color-muted) / 0.3)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApplyTheme(theme)
                    }}
                  >
                    {/* Mock preview content */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{
                        width: '60px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'hsl(var(--color-primary))',
                        border: '1px solid hsl(var(--color-border))'
                      }} />
                      <div style={{
                        width: '60px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'hsl(var(--color-secondary))',
                        border: '1px solid hsl(var(--color-border))'
                      }} />
                      <div style={{
                        width: '60px',
                        height: '28px',
                        borderRadius: '6px',
                        background: 'hsl(var(--color-muted))',
                        border: '1px solid hsl(var(--color-border))'
                      }} />
                    </div>
                    <div style={{
                      flex: 1,
                      borderRadius: '8px',
                      background: 'hsl(var(--color-background))',
                      border: '1px solid hsl(var(--color-border))',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{
                        height: '12px',
                        width: '80%',
                        borderRadius: '4px',
                        background: 'hsl(var(--color-foreground) / 0.8)'
                      }} />
                      <div style={{
                        height: '10px',
                        width: '60%',
                        borderRadius: '4px',
                        background: 'hsl(var(--color-muted-foreground) / 0.5)'
                      }} />
                      <div style={{
                        height: '10px',
                        width: '50%',
                        borderRadius: '4px',
                        background: 'hsl(var(--color-muted-foreground) / 0.5)'
                      }} />
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div style={{
                    padding: '20px',
                    background: 'hsl(var(--color-background))'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{ 
                        fontSize: '18px',
                        fontWeight: 600,
                        margin: 0
                      }}>
                        {info.name}
                      </h3>
                      {isActive && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: 'hsl(var(--color-primary))',
                          color: 'hsl(var(--color-primary-foreground))',
                          fontSize: '12px',
                          fontWeight: 500
                        }}>
                          <Check style={{ width: '14px', height: '14px' }} />
                          Active
                        </div>
                      )}
                    </div>
                    <p style={{ 
                      fontSize: '14px',
                      color: 'hsl(var(--color-muted-foreground))',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {info.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Light/Dark Mode Note */}
          <div style={{
            padding: '20px',
            border: '1px solid hsl(var(--color-border))',
            borderRadius: '8px',
            background: 'hsl(var(--color-muted) / 0.2)'
          }}>
            <h3 style={{ 
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: '8px'
            }}>
              Light & Dark Mode
            </h3>
            <p style={{ 
              fontSize: '14px',
              color: 'hsl(var(--color-muted-foreground))',
              lineHeight: 1.6,
              margin: 0
            }}>
              Every theme includes both light and dark variants. Toggle between modes using the theme switcher in the top nav bar to see how each theme adapts.
            </p>
          </div>
        </Stack>
      </div>
    </DocsShell>
  )
}
