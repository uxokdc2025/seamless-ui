import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { AIPreview } from "../../../components/ai-preview"
import { notFound } from "next/navigation"
import aiComponents from "../../../data/ai-components.json"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function AIComponentPage({ params }: PageProps) {
  const { slug } = await params
  const component = aiComponents.find((c) => c.slug === slug)

  if (!component) {
    notFound()
  }

  // Generate usage code
  const usageCode = `import { ${component.name} } from "@seamless/ai"

export default function Example() {
  return (
    <${component.name}${
      component.props.length > 0
        ? `
      ${component.props
        .slice(0, 3)
        .map((p) => {
          if (p.name === "name") return 'name="Agent Name"'
          if (p.name === "status") return 'status="active"'
          if (p.name === "role") return 'role="assistant"'
          if (p.name === "content") return 'content="Message content"'
          if (p.name === "model") return 'model="gpt-4"'
          if (p.name === "provider") return 'provider="openai"'
          return ""
        })
        .filter(Boolean)
        .join("\n      ")}`
        : ""
    }
    />
  )
}`

  return (
    <DocsShell title={component.name}>
      <ComponentPage
        name={component.name}
        description={component.description}
        preview={<AIPreview slug={slug} componentName={component.name} category={component.category} />}
        installCommand={`pnpm dlx shadcn@latest add @seamless/ai/${slug}`}
        usage={usageCode}
        props={component.props.map((p) => ({
          name: p.name,
          type: p.type,
          description: p.description || `${p.name} prop`,
          default: p.required ? undefined : "undefined",
        }))}
        related={aiComponents
          .filter((c) => c.category === component.category && c.slug !== slug)
          .slice(0, 3)
          .map((c) => c.name)}
      />
    </DocsShell>
  )
}

export async function generateStaticParams() {
  return aiComponents.map((component) => ({
    slug: component.slug,
  }))
}
