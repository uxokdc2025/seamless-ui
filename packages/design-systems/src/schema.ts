import { z } from 'zod';

/**
 * Design system catalog schema
 */

export const DesignSystemMetadataSchema = z.object({
  name: z.string(),
  slug: z.string(),
  source_url: z.string(),
  author_or_org: z.string(),
  license: z.string(),
  redistribution_allowed: z.enum(['yes', 'no', 'unclear']).optional(),
  has_designmd: z.boolean(),
  has_tokens: z.boolean(),
  has_css_tailwind_theme: z.boolean(),
  compatibility_status: z.enum(['active', 'unknown', 'portal', 'archived']),
  last_updated: z.string().optional(),
  discovered_at: z.string().optional(),
  notes: z.string().optional(),
});

export type DesignSystemMetadata = z.infer<typeof DesignSystemMetadataSchema>;

export const CatalogManifestSchema = z.object({
  systems: z.array(DesignSystemMetadataSchema),
});

export type CatalogManifest = z.infer<typeof CatalogManifestSchema>;

export interface DesignSystemSearchOptions {
  query?: string;
  license?: string[];
  hasDesignMd?: boolean;
  hasTokens?: boolean;
  compatibilityStatus?: string[];
  limit?: number;
  offset?: number;
}

export interface DesignSystemSearchResult {
  systems: DesignSystemMetadata[];
  total: number;
  offset: number;
  limit: number;
}
