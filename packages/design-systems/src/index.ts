/**
 * @seamless/design-systems - Public design system catalog
 * 
 * Browse, search, filter, preview, and import FREE design systems
 * from the uxokdc2025/seamless-design-systems catalog.
 */

export * from './schema';
export * from './catalog';
export * from './import';

// Re-export commonly used types
export type {
  DesignSystemMetadata,
  CatalogManifest,
  DesignSystemSearchOptions,
  DesignSystemSearchResult,
} from './schema';

export type {
  ImportOptions,
  ImportResult,
} from './import';

export { catalog, DesignSystemCatalog } from './catalog';
export { importFromCatalog, previewSystem, attachToProject } from './import';
