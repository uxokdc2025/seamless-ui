# Seamless UI Registry

The Seamless UI registry is now served from the docs site and is compatible with the shadcn CLI.

## Registry Endpoints

- **Full catalog:** `https://seamless-ui-docs.vercel.app/registry.json`
- **Individual components:** `https://seamless-ui-docs.vercel.app/r/{name}.json`

The registry contains 48 components across multiple namespaces:
- `@seamless/ui/*` - Core UI components (28 items)
- `@seamless/layout/*` - Layout primitives
- `@seamless/saas/*` - SaaS-specific components
- `@seamless/ai/*` - AI and agent components
- `@seamless/blocks/*` - Pre-built composition blocks

## Usage with shadcn CLI

Add the registry to your `components.json` or `package.json`:

```json
{
  "registries": {
    "@seamless": "https://seamless-ui-docs.vercel.app/r/{name}.json"
  }
}
```

Then install components:

```bash
pnpm dlx shadcn add @seamless/ui/button
pnpm dlx shadcn add @seamless/ui/input
pnpm dlx shadcn add @seamless/layout/container
```

## Testing Locally

```bash
# Start the docs dev server
pnpm --filter @seamless/docs dev

# Test endpoints
curl http://localhost:3000/registry.json | jq '.items | length'
curl http://localhost:3000/r/ui/button.json | jq '.name'
```

## Implementation

The registry is served via Next.js App Router route handlers:

- `/registry.json/route.ts` - Serves the full catalog from `@seamless/registry/dist/registry.json`
- `/r/[...name]/route.ts` - Serves individual components with catch-all routing

Both routes:
- Accept names with or without the `@seamless/` prefix
- Return proper 404s for unknown components
- Set cache headers for CDN optimization (1 hour)
