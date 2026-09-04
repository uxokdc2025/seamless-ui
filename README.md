# Seamless UI

Seamless UI design system platform — foundation/architecture skeleton. This monorepo contains the core design tokens, components, and tooling for building consistent user interfaces.

## Architecture

Built on pnpm workspaces + turborepo with Next.js 16 + React 19 + TypeScript + Tailwind v4. Uses Radix UI primitives with class-variance-authority for component variants.

### Packages

- `@seamless/tokens` - Semantic design tokens (8 brand themes × light/dark)
- `@seamless/ui` - Canonical UI components (migrated 8 primitives on Radix)
- `@seamless/layout` - Fluid responsive layout primitives
- `@seamless/saas` - SaaS component layer 
- `@seamless/ai` - AI/agent component layer
- `@seamless/themes` - Theme presets and utilities
- `@seamless/blocks` - Installable component blocks
- `@seamless/registry` - shadcn-compatible registry schema

### Apps

- `apps/docs` - Public docs site (ui.goseamless.ai)
- `apps/storybook` - Component workbench

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages and apps
pnpm build

# Run tests
pnpm test
```

## Theme System

8 brand themes supported:
- Midnight Aubergine (default)
- Together
- Airtable  
- Claude
- Discord
- ElevenLabs
- IBM
- Meta

Each theme supports light/dark modes with semantic token mapping.

## Components

All components built on Radix UI primitives with:
- Full keyboard navigation + ARIA support
- class-variance-authority for variants
- Semantic token consumption only
- Mobile-first responsive design

## License

MIT