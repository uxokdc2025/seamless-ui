# @seamless/designmd

DESIGN.md import/export with adapters for multiple design token formats.

## Features

- **Import from:**
  - DESIGN.md (Google's spec)
  - DTCG (W3C Design Tokens)
  - CSS custom properties
  - Tailwind config
  - JSON themes
  - Seamless theme JSON

- **Export to:**
  - DESIGN.md
  - DTCG (W3C Design Tokens)
  - CSS custom properties
  - Tailwind config
  - Seamless theme JSON
  - shadcn registry items

- **Validation:**
  - Token reference checking
  - WCAG contrast validation (via @google/design.md CLI)
  - Required field checks

## Installation

```bash
pnpm add @seamless/designmd
```

## Usage

### Import a DESIGN.md file

```typescript
import { importDesignMd } from '@seamless/designmd';

const theme = importDesignMd('./DESIGN.md');
console.log(theme.colors);
```

### Export to multiple formats

```typescript
import { exportDesignMd, exportDTCG, exportCSSVars, exportTailwind } from '@seamless/designmd';

const designMd = exportDesignMd(theme);
const dtcg = exportDTCG(theme);
const css = exportCSSVars(theme);
const tailwind = exportTailwind(theme);
```

### Validate a theme

```typescript
import { validateSeamlessTheme } from '@seamless/designmd';

const result = validateSeamlessTheme(theme);
if (!result.valid) {
  console.error('Validation errors:', result.findings);
}
```

### Write all exports at once

```typescript
import { writeExports } from '@seamless/designmd';

writeExports(theme, './output');
// Creates:
// - DESIGN.md
// - tokens.json (DTCG)
// - theme.css (CSS vars)
// - tailwind.theme.json
// - seamless-theme.json
// - shadcn-registry.json
```

## Schema

The canonical `SeamlessTheme` schema supports:

- **colors**: Color tokens (hex, rgb, oklch, etc.)
- **typography**: Font families, sizes, weights, line heights
- **spacing**: Layout spacing values
- **rounded**: Border radius values
- **shadows**: Box shadow definitions
- **components**: Component-specific tokens with references

## License

MIT
