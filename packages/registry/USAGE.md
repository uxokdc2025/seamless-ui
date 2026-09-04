# Seamless UI Registry - Usage Guide

## Quick Start

Install components using the shadcn CLI:

```bash
# Install a UI component
pnpm dlx shadcn@latest add @seamless/ui/button

# Install a layout component
pnpm dlx shadcn@latest add @seamless/layout/container

# Install a SaaS component
pnpm dlx shadcn@latest add @seamless/saas/app-shell

# Install an AI component
pnpm dlx shadcn@latest add @seamless/ai/agent-card

# Install a block
pnpm dlx shadcn@latest add @seamless/blocks/dashboard-01
```

## Configuration

Create a `components.json` file in your project root:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "seamless": "https://seamless-ui.dev/registry"
  }
}
```

## How It Works

When you run `pnpm dlx shadcn@latest add @seamless/ui/button`:

1. The CLI reads your `components.json` configuration
2. Fetches the component metadata from the registry
3. Installs required npm dependencies
4. Copies the component source code to your project
5. Sets up imports and utilities

## Registry Structure

```
packages/registry/dist/
├── registry.json       # Main registry (all 48 components)
├── ui.json            # UI components (28)
├── layout.json        # Layout components (14)
├── saas.json          # SaaS components (4)
├── ai.json            # AI components (1)
└── blocks.json        # Blocks (1)
```

## Component Categories

### UI Components (@seamless/ui)

Core form controls and interface elements:

- **Buttons**: button, button-group, icon-button
- **Inputs**: input, textarea, password-input, number-input, search, otp-input, file-upload
- **Form Elements**: label, checkbox, radio, switch, form-field, input-group
- **Selection**: select, native-select, combobox, autocomplete, slider
- **Display**: badge, card, dialog, tabs
- **Date/Time**: calendar, date-picker, date-range-picker

### Layout Components (@seamless/layout)

Responsive layout primitives:

- **Containers**: container, page-shell, workspace
- **Flex Layouts**: stack, inline, cluster, columns, split
- **Grid Layouts**: grid, dashboard-grid
- **Navigation**: sidebar, sidebar-layout
- **Utility**: scroll-area, resizable-panels

### SaaS Components (@seamless/saas)

Application-level components:

- **Shell**: app-shell
- **Navigation**: navigation, nav-group, nav-item

### AI Components (@seamless/ai)

AI/Agent interface components:

- **Display**: agent-card

### Blocks (@seamless/blocks)

Pre-built page sections:

- **Dashboard**: dashboard-01

## Dependencies

Components automatically install their required dependencies:

**Common Dependencies:**
- `@radix-ui/*` - Accessible UI primitives
- `class-variance-authority` - Type-safe variant system
- `clsx` - Conditional class names
- `tailwind-merge` - Merge Tailwind classes
- `lucide-react` - Icon library

**Specialized Dependencies:**
- `react-day-picker` + `date-fns` - Date components
- `react-resizable-panels` - Resizable layouts

## Examples

### Installing a Form

```bash
# Install form components
pnpm dlx shadcn@latest add @seamless/ui/form-field
pnpm dlx shadcn@latest add @seamless/ui/input
pnpm dlx shadcn@latest add @seamless/ui/button
pnpm dlx shadcn@latest add @seamless/ui/checkbox
```

### Installing a Dashboard Layout

```bash
# Install layout components
pnpm dlx shadcn@latest add @seamless/saas/app-shell
pnpm dlx shadcn@latest add @seamless/layout/sidebar-layout
pnpm dlx shadcn@latest add @seamless/layout/dashboard-grid

# Install dashboard block
pnpm dlx shadcn@latest add @seamless/blocks/dashboard-01
```

### Installing Date Picker

```bash
# Date picker with dependencies
pnpm dlx shadcn@latest add @seamless/ui/date-picker
# This automatically installs: calendar, button, and npm dependencies
```

## Registry Dependencies

Some components depend on other registry components:

- `date-picker` → requires `calendar` + `button`
- `date-range-picker` → requires `calendar` + `button`
- `icon-button` → requires `button`
- `number-input` → requires `input`
- `password-input` → requires `input`
- `search` → requires `input`
- `sidebar-layout` → requires `sidebar`
- `app-shell` → requires `sidebar` from @seamless/layout

The CLI automatically installs these dependencies.

## Self-Hosting

To host your own registry:

1. Build the registry: `pnpm run build`
2. Deploy `packages/registry/dist/` to a static host
3. Update `components.json` to point to your URL:

```json
{
  "registries": {
    "seamless": "https://your-domain.com/registry"
  }
}
```

## Customization

After installing a component, you can customize it:

1. The component source is copied to your project
2. Edit the component file directly
3. Modify variants, styles, and behavior as needed
4. The component is yours - no further updates from the registry

## Troubleshooting

### Component not found

Ensure your `components.json` includes the registry:

```json
{
  "registries": {
    "seamless": "https://seamless-ui.dev/registry"
  }
}
```

### Missing dependencies

Run the install again - the CLI should install all required dependencies.

### Import errors

Check your `components.json` aliases match your project structure:

```json
{
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Development

### Adding Components

1. Create component in appropriate package
2. Update metadata in `packages/registry/src/build.ts`
3. Run `pnpm run build`
4. Commit registry files

### Testing Locally

Point your `components.json` to your local build:

```json
{
  "registries": {
    "seamless": "file:///path/to/seamless-ui/packages/registry/dist"
  }
}
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Registry Schema](https://ui.shadcn.com/schema/registry.json)
- [Seamless UI Documentation](https://seamless-ui.dev)
