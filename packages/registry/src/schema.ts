/**
 * shadcn-compatible registry schema
 * Based on https://ui.shadcn.com/schema/registry.json
 */

export type RegistryItemType =
  | "registry:ui"
  | "registry:layout" 
  | "registry:saas"
  | "registry:ai"
  | "registry:block"
  | "registry:theme"
  | "registry:hook"
  | "registry:lib"

export type RegistryItemFileType =
  | "registry:component"
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:block"
  | "registry:page"

export interface RegistryItemFile {
  path: string
  content?: string
  type: RegistryItemFileType
  target?: string
}

export interface RegistryItem {
  name: string
  type: RegistryItemType
  title?: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryItemFile[]
  cssVars?: {
    light?: Record<string, string>
    dark?: Record<string, string>
    theme?: Record<string, string>
  }
  tailwind?: {
    config?: Record<string, any>
  }
  docs?: string
}

export interface Registry {
  $schema: string
  name: string
  homepage: string
  items: RegistryItem[]
}

export interface RegistryIndex {
  $schema: string
  name: string
  homepage: string
  include?: string[]
  items?: RegistryItem[]
}
