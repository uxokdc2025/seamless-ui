# @seamless/registry

shadcn-compatible component registry for the Seamless UI design system.

## Overview

This package provides a registry schema compatible with shadcn/ui's CLI, allowing you to install Seamless components using:

```bash
pnpm dlx shadcn@latest add @seamless/ui/button
pnpm dlx shadcn@latest add @seamless/layout/container
pnpm dlx shadcn@latest add @seamless/saas/app-shell
pnpm dlx shadcn@latest add @seamless/ai/agent-card
pnpm dlx shadcn@latest add @seamless/blocks/dashboard-01
```

## Namespaces

The registry organizes components into six namespaces:

- **@seamless/ui** - 28 canonical UI components (button, input, select, dialog, etc.)
- **@seamless/layout** - 14 layout primitives (container, stack, grid, sidebar, etc.)
- **@seamless/saas** - 4 SaaS application components (app-shell, navigation, etc.)
- **@seamless/ai** - 1 AI/Agent component (agent-card)
- **@seamless/blocks** - 1 installable block (dashboard-01)
- **@seamless/themes** - Theme configuration and design tokens

## Registry Files

After building, the following files are generated in `dist/`:

- `registry.json` - Main registry with all 48 components
- `ui.json` - UI components only
- `layout.json` - Layout components only
- `saas.json` - SaaS components only
- `ai.json` - AI components only
- `blocks.json` - Blocks only

## Building

```bash
pnpm install
pnpm run build
```

This reads all component source files from the monorepo packages and generates the registry JSON files.

## Schema

The registry follows the [shadcn/ui registry schema](https://ui.shadcn.com/schema/registry.json):

```typescript
interface RegistryItem {
  name: string                    // e.g. "@seamless/ui/button"
  type: RegistryItemType          // "registry:ui", "registry:layout", etc.
  title?: string                  // Human-readable title
  description?: string            // Component description
  dependencies?: string[]         // npm dependencies
  registryDependencies?: string[] // Other registry components
  files: RegistryItemFile[]       // Component source files
}
```

## Usage with shadcn CLI

1. Configure your project with a `components.json` file
2. Point the CLI to the Seamless registry URL
3. Install components:

```bash
pnpm dlx shadcn@latest add @seamless/ui/button
```

## Component List

### UI Components (28)
button, button-group, input, textarea, label, checkbox, radio, switch, select, native-select, combobox, autocomplete, slider, badge, card, dialog, tabs, calendar, date-picker, date-range-picker, file-upload, form-field, icon-button, input-group, number-input, otp-input, password-input, search

### Layout Components (14)
container, stack, inline, cluster, grid, columns, split, sidebar, sidebar-layout, scroll-area, page-shell, workspace, dashboard-grid, resizable-panels

### SaaS Components (4)
app-shell, navigation, nav-group, nav-item

### AI Components (1)
agent-card

### Blocks (1)
dashboard-01

## Development

To add a new component to the registry:

1. Add the component to the appropriate package (`packages/ui`, `packages/layout`, etc.)
2. Update the component metadata arrays in `src/build.ts`
3. Run `pnpm run build`
4. Commit the updated registry files

## License

MIT
