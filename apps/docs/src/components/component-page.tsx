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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Container size="lg" className="py-8">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">{name}</h1>
            {storybookUrl && (
              <a href={storybookUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open in Storybook
                </Button>
              </a>
            )}
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center min-h-[200px] border border-border rounded-md bg-muted/20 p-8">
              {preview}
            </div>
          </CardContent>
        </Card>

        {/* Installation & Usage */}
        <Tabs defaultValue="install" className="w-full">
          <TabsList>
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            {sourceFiles.length > 0 && <TabsTrigger value="source">Source</TabsTrigger>}
            <TabsTrigger value="props">Props</TabsTrigger>
            {variants.length > 0 && <TabsTrigger value="variants">Variants</TabsTrigger>}
            {examples.length > 0 && <TabsTrigger value="examples">Examples</TabsTrigger>}
          </TabsList>

          <TabsContent value="install">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Install via CLI</h3>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                        <code className="text-sm">{installCommand}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => copyToClipboard(installCommand, "install")}
                      >
                        {copied === "install" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>This will install the component and all its dependencies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code className="text-sm">{usage}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyToClipboard(usage, "usage")}
                  >
                    {copied === "usage" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {sourceFiles.length > 0 && (
            <TabsContent value="source">
              <Stack gap="md">
                {sourceFiles.map((file, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-base font-mono">{file.path}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto max-h-[500px]">
                          <code className="text-xs">{file.content}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => copyToClipboard(file.content, `source-${idx}`)}
                        >
                          {copied === `source-${idx}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabsContent>
          )}

          <TabsContent value="props">
            <Card>
              <CardContent className="pt-6">
                {props.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-4 font-semibold">Prop</th>
                          <th className="text-left py-2 px-4 font-semibold">Type</th>
                          <th className="text-left py-2 px-4 font-semibold">Default</th>
                          <th className="text-left py-2 px-4 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.map((prop, idx) => (
                          <tr key={idx} className="border-b border-border">
                            <td className="py-3 px-4 font-mono text-sm">{prop.name}</td>
                            <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{prop.type}</td>
                            <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{prop.default || "-"}</td>
                            <td className="py-3 px-4 text-sm">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">No props available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {variants.length > 0 && (
            <TabsContent value="variants">
              <Stack gap="md">
                {variants.map((variant, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{variant.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{variant.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center min-h-[120px] border border-border rounded-md bg-muted/20 p-6">
                        {variant.preview}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabsContent>
          )}

          {examples.length > 0 && (
            <TabsContent value="examples">
              <Stack gap="md">
                {examples.map((example, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{example.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Stack gap="md">
                        <div className="flex items-center justify-center min-h-[120px] border border-border rounded-md bg-muted/20 p-6">
                          {example.preview}
                        </div>
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                            <code className="text-sm">{example.code}</code>
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={() => copyToClipboard(example.code, `example-${idx}`)}
                          >
                            {copied === `example-${idx}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </TabsContent>
          )}
        </Tabs>

        {/* Accessibility & Keyboard */}
        {(accessibility.length > 0 || keyboard.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {accessibility.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {accessibility.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {keyboard.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Keyboard Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {keyboard.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <kbd className="bg-muted px-2 py-1 rounded text-sm font-mono">{item.key}</kbd>
                        <span className="text-sm">{item.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Related Components */}
        {related.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {related.map((item, idx) => (
                  <a key={idx} href={`/components/${item.toLowerCase()}`}>
                    <Button variant="outline" size="sm">
                      {item}
                    </Button>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Design Guidance */}
        {designGuidance && (
          <Card>
            <CardHeader>
              <CardTitle>Design Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                {designGuidance.whenToUse && designGuidance.whenToUse.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">When to Use</h4>
                    <ul className="space-y-1 ml-4">
                      {designGuidance.whenToUse.map((item, idx) => (
                        <li key={idx} className="text-sm list-disc">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {designGuidance.spacing && (
                  <div>
                    <h4 className="font-semibold mb-2">Spacing</h4>
                    <p className="text-sm text-muted-foreground">{designGuidance.spacing}</p>
                  </div>
                )}
                {designGuidance.typography && (
                  <div>
                    <h4 className="font-semibold mb-2">Typography</h4>
                    <p className="text-sm text-muted-foreground">{designGuidance.typography}</p>
                  </div>
                )}
                {designGuidance.colors && (
                  <div>
                    <h4 className="font-semibold mb-2">Colors</h4>
                    <p className="text-sm text-muted-foreground">{designGuidance.colors}</p>
                  </div>
                )}
                {designGuidance.other && designGuidance.other.length > 0 && (
                  <div>
                    <ul className="space-y-1 ml-4">
                      {designGuidance.other.map((item, idx) => (
                        <li key={idx} className="text-sm list-disc">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Do/Don't */}
        {(dos.length > 0 || donts.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6">
            {dos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Do
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dos.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {donts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-red-600">✗</span> Don't
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {donts.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </Stack>
    </Container>
  )
}
