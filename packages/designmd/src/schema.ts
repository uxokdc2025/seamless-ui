import { z } from 'zod';

/**
 * Canonical Seamless design token schema
 * Normalized internal representation for all import/export formats
 */

// Color token
export const ColorTokenSchema = z.object({
  value: z.string(), // Any CSS color: hex, rgb(), oklch(), named
  description: z.string().optional(),
});

// Dimension token
export const DimensionTokenSchema = z.object({
  value: z.string(), // Number + unit: px, em, rem, etc.
  description: z.string().optional(),
});

// Typography token
export const TypographyTokenSchema = z.object({
  fontFamily: z.string().optional(),
  fontSize: z.string().optional(),
  fontWeight: z.union([z.string(), z.number()]).optional(),
  lineHeight: z.union([z.string(), z.number()]).optional(),
  letterSpacing: z.string().optional(),
  fontFeature: z.string().optional(),
  fontVariation: z.string().optional(),
  description: z.string().optional(),
});

// Component token (button, card, etc.)
export const ComponentTokenSchema = z.object({
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  typography: z.string().optional(), // Reference to typography token
  rounded: z.string().optional(), // Reference to rounded token or direct value
  padding: z.string().optional(),
  size: z.string().optional(),
  height: z.string().optional(),
  width: z.string().optional(),
  description: z.string().optional(),
});

// Main schema
export const SeamlessThemeSchema = z.object({
  version: z.string().default('alpha'),
  name: z.string(),
  description: z.string().optional(),
  
  // Token categories
  colors: z.record(ColorTokenSchema).optional(),
  typography: z.record(TypographyTokenSchema).optional(),
  spacing: z.record(DimensionTokenSchema).optional(),
  rounded: z.record(DimensionTokenSchema).optional(),
  shadows: z.record(z.string()).optional(),
  components: z.record(ComponentTokenSchema).optional(),
  
  // Metadata
  author: z.string().optional(),
  license: z.string().optional(),
  source: z.string().optional(),
});

export type SeamlessTheme = z.infer<typeof SeamlessThemeSchema>;
export type ColorToken = z.infer<typeof ColorTokenSchema>;
export type DimensionToken = z.infer<typeof DimensionTokenSchema>;
export type TypographyToken = z.infer<typeof TypographyTokenSchema>;
export type ComponentToken = z.infer<typeof ComponentTokenSchema>;

/**
 * DTCG (Design Tokens Community Group) W3C schema
 */
export const DTCGTokenSchema = z.object({
  $value: z.any(),
  $type: z.string().optional(),
  $description: z.string().optional(),
});

export const DTCGSchemaRoot = z.record(z.any());

/**
 * Tailwind theme format
 */
export const TailwindThemeSchema = z.object({
  colors: z.record(z.any()).optional(),
  spacing: z.record(z.string()).optional(),
  fontSize: z.record(z.any()).optional(),
  fontFamily: z.record(z.array(z.string())).optional(),
  borderRadius: z.record(z.string()).optional(),
  boxShadow: z.record(z.string()).optional(),
  extend: z.record(z.any()).optional(),
});

export type TailwindTheme = z.infer<typeof TailwindThemeSchema>;

/**
 * CSS custom properties format
 */
export type CSSVars = Record<string, string>;

/**
 * shadcn registry item schema (subset relevant to themes)
 */
export const ShadcnRegistryItemSchema = z.object({
  name: z.string(),
  type: z.enum(['components:ui', 'components:component', 'components:example', 'lib']),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(z.string()),
  cssVars: z.record(z.record(z.string())).optional(),
});

export type ShadcnRegistryItem = z.infer<typeof ShadcnRegistryItemSchema>;
