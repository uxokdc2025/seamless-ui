import { DocsShell } from "../../../components/docs-shell"
import { ComponentPage } from "../../../components/component-page"
import { SaaSPreview } from "../../../components/saas-preview"
import { notFound } from "next/navigation"
import saasComponents from "../../../data/saas-components.json"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function SaaSComponentPage({ params }: PageProps) {
  const { slug } = await params
  const component = saasComponents.find((c) => c.slug === slug)

  if (!component) {
    notFound()
  }

  // Generate usage code
  const usageCode = `import { ${component.name} } from "@seamless/saas"

export default function Example() {
  return (
    <${component.name}${
      component.props.length > 0
        ? `
      ${component.props
        .slice(0, 3)
        .map((p) => {
          if (p.name === "user") return 'user={{ name: "John Doe", email: "john@example.com" }}'
          if (p.name === "items") return "items={[]}"
          if (p.name === "label") return 'label="Label"'
          if (p.name === "value") return 'value="Value"'
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
        preview={<SaaSPreview slug={slug} componentName={component.name} category={component.category} />}
        installCommand={`pnpm dlx shadcn@latest add @seamless/saas/${slug}`}
        usage={usageCode}
        props={component.props.map((p) => ({
          name: p.name,
          type: p.type,
          description: p.description || `${p.name} prop`,
          default: p.required ? undefined : "undefined",
        }))}
        related={saasComponents
          .filter((c) => c.category === component.category && c.slug !== slug)
          .slice(0, 3)
          .map((c) => c.name)}
      />
    </DocsShell>
  )
}

export async function generateStaticParams() {
  return saasComponents.map((component) => ({
    slug: component.slug,
  }))
}
