# @seamless/design-systems

Public design system catalog with browse, search, filter, preview, and import.

## Features

- **Browse** 44+ FREE public design systems
- **Search** by name, author, license, features
- **Filter** by license, compatibility, file formats
- **Preview** DESIGN.md and tokens before importing
- **Import** into your project with automatic format conversion
- **All FREE** - Only MIT, Apache, CC, and other permissive licenses

## Installation

```bash
pnpm add @seamless/design-systems
```

## Catalog Source

Systems are sourced from the public catalog at:
https://github.com/uxokdc2025/seamless-design-systems

The catalog is maintained by automated scouts and manual curation.

## Usage

### Search for design systems

```typescript
import { catalog } from '@seamless/design-systems';

// Search by name
const results = catalog.search({ query: 'carbon' });

// Filter by license
const mitSystems = catalog.search({ 
  license: ['MIT', 'Apache-2.0'] 
});

// Only systems with DESIGN.md
const withDesignMd = catalog.search({ 
  hasDesignMd: true 
});

// Active/maintained systems only
const activeSystems = catalog.search({
  compatibilityStatus: ['active']
});
```

### Get catalog statistics

```typescript
const stats = catalog.getStats();
console.log(`Total systems: ${stats.total}`);
console.log(`With DESIGN.md: ${stats.withDesignMd}`);
console.log(`Licenses:`, stats.licenses);
```

### Preview a system

```typescript
import { previewSystem } from '@seamless/design-systems';

const preview = previewSystem('carbon-design-system');
console.log(preview.metadata);
console.log(preview.designMdPreview);
```

### Import a system

```typescript
import { importFromCatalog } from '@seamless/design-systems';

const result = importFromCatalog({
  slug: 'ant-design',
  targetDir: './design-systems/ant-design',
  formats: ['designmd', 'tokens', 'css', 'tailwind', 'seamless'],
});

if (result.success) {
  console.log('Imported files:', result.files);
  console.log('Theme:', result.theme);
} else {
  console.error('Import failed:', result.error);
}
```

### Attach to a project

```typescript
import { attachToProject } from '@seamless/design-systems';

const result = attachToProject('fluent-ui', './');
// Creates: ./design-systems/fluent-ui/*
```

## Available Systems

Notable systems in the catalog:

- **Ant Design** (MIT) - Alibaba's enterprise design system
- **Carbon Design System** (Apache-2.0) - IBM's design system
- **Chakra UI** (MIT) - Modular component library
- **Fluent UI** (MIT) - Microsoft's design system
- **Atlassian Design System** (Apache-2.0) - Atlassian's design system
- And 39+ more...

Run `catalog.getFreeSystems()` to see all available systems.

## License

MIT
