"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, Tabs, TabsList, TabsTrigger, TabsContent, Button } from "@seamless/ui"
import { Container, Stack } from "@seamless/layout"
import { Copy, Check, ExternalLink } from "lucide-react"

interface ComponentPageProps {
  name: string
  description: string
  preview: React.ReactNode
  installCommand: string
  usage: string
  props?: Array<{
    name: string
    type: string
    description: string
    default?: string
  }>
  variants?: Array<{
    name: string
    description: string
    preview: React.ReactNode
  }>
  examples?: Array<{
    title: string
    description: string
    preview: React.ReactNode
    code: string
  }>
  accessibility?: string[]
  keyboard?: Array<{
    key: string
    description: string
  }>
  related?: string[]
  storybookUrl?: string
  sourceFiles?: Array<{
    path: string
    content: string
  }>
  designGuidance?: {
    whenToUse?: string[]
    spacing?: string
    typography?: string
    colors?: string
    other?: string[]
  }
  dos?: string[]
  donts?: string[]
}

export function ComponentPage({
  name,
  description,
  preview,
  installCommand,
  usage,
  props = [],
  variants = [],
  examples = [],
  accessibility = [],
  keyboard = [],
  related = [],
  storybookUrl,
  sourceFiles = [],
  designGuidance,
  dos = [],
  donts = [],
}: ComponentPageProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [mainTab, setMainTab] = useState<"preview" | "code">("preview")

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ maxWidth: '1000px' }}>
      <Stack gap="xl">
        {/* Header */}
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              {name}
            </h1>
            {storybookUrl && (
              <a href={storybookUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" style={{ gap: '8px' }}>
                  <ExternalLink style={{ width: '16px', height: '16px' }} />
                  Storybook
                </Button>
              </a>
            )}
          </div>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--color-muted-foreground)',
            lineHeight: 1.6,
            maxWidth: '700px'
          }}>
            {description}
          </p>
        </div>

        {/* Large Live Preview with Preview/Code Toggle */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Tab controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid var(--color-border)',
            background: 'color-mix(in srgb, var(--color-muted) calc(0.3 * 100%), transparent)'
          }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setMainTab("preview")}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  background: mainTab === "preview" ? 'var(--color-background)' : 'transparent',
                  color: mainTab === "preview" ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Preview
              </button>
              <button
                onClick={() => setMainTab("code")}
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  background: mainTab === "code" ? 'var(--color-background)' : 'transparent',
                  color: mainTab === "code" ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Code
              </button>
            </div>
            {mainTab === "code" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(usage, "main-code")}
                style={{ width: '32px', height: '32px' }}
              >
                {copied === "main-code" ? 
                  <Check style={{ width: '16px', height: '16px' }} /> : 
                  <Copy style={{ width: '16px', height: '16px' }} />
                }
              </Button>
            )}
          </div>

          {/* Preview/Code content */}
          {mainTab === "preview" && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '280px',
              padding: '48px',
              background: 'var(--color-background)'
            }}>
              {preview}
            </div>
          )}

          {mainTab === "code" && (
            <div style={{ position: 'relative' }}>
              <pre style={{
                margin: 0,
                padding: '24px',
                background: 'color-mix(in srgb, var(--color-muted) calc(0.3 * 100%), transparent)',
                overflowX: 'auto',
                fontSize: '13px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-geist-mono), monospace'
              }}>
                <code>{usage}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Installation */}
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 600, 
            marginBottom: '12px',
            letterSpacing: '-0.01em'
          }}>
            Installation
          </h2>
          <div style={{
            position: 'relative',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <pre style={{
              margin: 0,
              padding: '16px',
              background: 'color-mix(in srgb, var(--color-muted) calc(0.3 * 100%), transparent)',
              fontSize: '14px',
              fontFamily: 'var(--font-geist-mono), monospace'
            }}>
              <code>{installCommand}</code>
            </pre>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(installCommand, "install")}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '32px',
                height: '32px'
              }}
            >
              {copied === "install" ? 
                <Check style={{ width: '16px', height: '16px' }} /> : 
                <Copy style={{ width: '16px', height: '16px' }} />
              }
            </Button>
          </div>
        </div>

        {/* Props Table */}
        {props.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginBottom: '12px',
              letterSpacing: '-0.01em'
            }}>
              Props
            </h2>
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  fontSize: '14px'
                }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: '1px solid var(--color-border)',
                      background: 'color-mix(in srgb, var(--color-muted) calc(0.3 * 100%), transparent)'
                    }}>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '12px 16px', 
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Prop
                      </th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '12px 16px', 
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Type
                      </th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '12px 16px', 
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        Default
                      </th>
                      <th style={{ 
                        textAlign: 'left', 
                        padding: '12px 16px', 
                        fontWeight: 600 
                      }}>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((prop, idx) => (
                      <tr 
                        key={idx} 
                        style={{ 
                          borderBottom: idx < props.length - 1 ? '1px solid var(--color-border)' : 'none'
                        }}
                      >
                        <td style={{ 
                          padding: '12px 16px',
                          fontFamily: 'var(--font-geist-mono), monospace',
                          fontSize: '13px'
                        }}>
                          {prop.name}
                        </td>
                        <td style={{ 
                          padding: '12px 16px',
                          fontFamily: 'var(--font-geist-mono), monospace',
                          fontSize: '13px',
                          color: 'var(--color-muted-foreground)'
                        }}>
                          {prop.type}
                        </td>
                        <td style={{ 
                          padding: '12px 16px',
                          fontFamily: 'var(--font-geist-mono), monospace',
                          fontSize: '13px',
                          color: 'var(--color-muted-foreground)'
                        }}>
                          {prop.default || "—"}
                        </td>
                        <td style={{ 
                          padding: '12px 16px',
                          color: 'var(--color-muted-foreground)'
                        }}>
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Variants */}
        {variants.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>
              Variants
            </h2>
            <Stack gap="md">
              {variants.map((variant, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ 
                    padding: '16px',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'color-mix(in srgb, var(--color-muted) calc(0.2 * 100%), transparent)'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      {variant.name}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'var(--color-muted-foreground)',
                      margin: 0
                    }}>
                      {variant.description}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '120px',
                    padding: '32px'
                  }}>
                    {variant.preview}
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        )}

        {/* Examples */}
        {examples.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>
              Examples
            </h2>
            <Stack gap="md">
              {examples.map((example, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ 
                    padding: '16px',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'color-mix(in srgb, var(--color-muted) calc(0.2 * 100%), transparent)'
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 600,
                      marginBottom: '4px'
                    }}>
                      {example.title}
                    </h3>
                    <p style={{ 
                      fontSize: '14px', 
                      color: 'var(--color-muted-foreground)',
                      margin: 0
                    }}>
                      {example.description}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '120px',
                    padding: '32px',
                    borderBottom: '1px solid var(--color-border)'
                  }}>
                    {example.preview}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <pre style={{
                      margin: 0,
                      padding: '16px',
                      background: 'color-mix(in srgb, var(--color-muted) calc(0.3 * 100%), transparent)',
                      overflowX: 'auto',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-geist-mono), monospace'
                    }}>
                      <code>{example.code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(example.code, `example-${idx}`)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '32px',
                        height: '32px'
                      }}
                    >
                      {copied === `example-${idx}` ? 
                        <Check style={{ width: '16px', height: '16px' }} /> : 
                        <Copy style={{ width: '16px', height: '16px' }} />
                      }
                    </Button>
                  </div>
                </div>
              ))}
            </Stack>
          </div>
        )}

        {/* Accessibility & Keyboard */}
        {(accessibility.length > 0 || keyboard.length > 0) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: keyboard.length > 0 ? 'repeat(2, 1fr)' : '1fr',
            gap: '16px'
          }}>
            {accessibility.length > 0 && (
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600,
                  marginBottom: '12px'
                }}>
                  Accessibility
                </h3>
                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {accessibility.map((item, idx) => (
                    <li key={idx} style={{ 
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <span style={{ color: '#10b981', marginTop: '2px' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {keyboard.length > 0 && (
              <div style={{
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: 600,
                  marginBottom: '12px'
                }}>
                  Keyboard
                </h3>
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  {keyboard.map((item, idx) => (
                    <div key={idx} style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <kbd style={{
                        padding: '4px 8px',
                        fontSize: '13px',
                        fontFamily: 'var(--font-geist-mono), monospace',
                        background: 'var(--color-muted)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.key}
                      </kbd>
                      <span style={{ fontSize: '14px' }}>{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Related Components */}
        {related.length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 600,
              marginBottom: '12px'
            }}>
              Related Components
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {related.map((item, idx) => (
                <a key={idx} href={`/components/${item.toLowerCase()}`}>
                  <Button variant="outline" size="sm">
                    {item}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </Stack>
    </div>
  )
}
