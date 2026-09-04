import type { CatalogManifest, DesignSystemMetadata, DesignSystemSearchOptions, DesignSystemSearchResult } from './schema';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Design system catalog browser
 * 
 * Provides search, filter, and preview capabilities for the public catalog
 * from uxokdc2025/seamless-design-systems
 */

export class DesignSystemCatalog {
  private catalogPath: string;
  private manifest: CatalogManifest | null = null;
  
  constructor(catalogPath: string = '/root/seamless-design-systems') {
    this.catalogPath = catalogPath;
  }
  
  /**
   * Load the catalog manifest
   */
  loadManifest(): CatalogManifest {
    if (this.manifest) return this.manifest;
    
    const manifestPath = path.join(this.catalogPath, 'design-systems', 'manifest.json');
    const content = fs.readFileSync(manifestPath, 'utf-8');
    this.manifest = JSON.parse(content) as CatalogManifest;
    
    return this.manifest;
  }
  
  /**
   * Search and filter design systems
   */
  search(options: DesignSystemSearchOptions = {}): DesignSystemSearchResult {
    const manifest = this.loadManifest();
    let systems = manifest.systems;
    
    // Apply filters
    if (options.query) {
      const query = options.query.toLowerCase();
      systems = systems.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.author_or_org.toLowerCase().includes(query) ||
        s.slug.toLowerCase().includes(query)
      );
    }
    
    if (options.license && options.license.length > 0) {
      systems = systems.filter(s => options.license!.includes(s.license));
    }
    
    if (options.hasDesignMd !== undefined) {
      systems = systems.filter(s => s.has_designmd === options.hasDesignMd);
    }
    
    if (options.hasTokens !== undefined) {
      systems = systems.filter(s => s.has_tokens === options.hasTokens);
    }
    
    if (options.compatibilityStatus && options.compatibilityStatus.length > 0) {
      systems = systems.filter(s => options.compatibilityStatus!.includes(s.compatibility_status));
    }
    
    // Pagination
    const total = systems.length;
    const offset = options.offset || 0;
    const limit = options.limit || 50;
    systems = systems.slice(offset, offset + limit);
    
    return {
      systems,
      total,
      offset,
      limit,
    };
  }
  
  /**
   * Get a single design system by slug
   */
  getSystem(slug: string): DesignSystemMetadata | null {
    const manifest = this.loadManifest();
    return manifest.systems.find(s => s.slug === slug) || null;
  }
  
  /**
   * Get the full path to a design system's directory
   */
  getSystemPath(slug: string): string {
    return path.join(this.catalogPath, 'design-systems', 'systems', slug);
  }
  
  /**
   * Check if a system has a specific file
   */
  hasFile(slug: string, filename: string): boolean {
    const systemPath = this.getSystemPath(slug);
    return fs.existsSync(path.join(systemPath, filename));
  }
  
  /**
   * Read a file from a design system
   */
  readFile(slug: string, filename: string): string | null {
    const filePath = path.join(this.getSystemPath(slug), filename);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
  }
  
  /**
   * Get metadata for a design system
   */
  getMetadata(slug: string): DesignSystemMetadata | null {
    const metadataPath = path.join(this.getSystemPath(slug), 'metadata.json');
    if (!fs.existsSync(metadataPath)) return null;
    
    const content = fs.readFileSync(metadataPath, 'utf-8');
    return JSON.parse(content) as DesignSystemMetadata;
  }
  
  /**
   * List all available licenses
   */
  getLicenses(): string[] {
    const manifest = this.loadManifest();
    const licenses = new Set(manifest.systems.map(s => s.license));
    return Array.from(licenses).sort();
  }
  
  /**
   * Get statistics about the catalog
   */
  getStats() {
    const manifest = this.loadManifest();
    const systems = manifest.systems;
    
    return {
      total: systems.length,
      withDesignMd: systems.filter(s => s.has_designmd).length,
      withTokens: systems.filter(s => s.has_tokens).length,
      byLicense: this.groupBy(systems, 'license'),
      byCompatibility: this.groupBy(systems, 'compatibility_status'),
      licenses: this.getLicenses(),
    };
  }
  
  /**
   * Get FREE systems only (MIT, Apache, CC, etc.)
   */
  getFreeSystems(): DesignSystemMetadata[] {
    const freeLicenses = ['MIT', 'Apache-2.0', 'Apache', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'ISC', 'BSD'];
    const manifest = this.loadManifest();
    return manifest.systems.filter(s => freeLicenses.includes(s.license));
  }
  
  private groupBy(items: any[], key: string): Record<string, number> {
    const groups: Record<string, number> = {};
    for (const item of items) {
      const value = item[key];
      groups[value] = (groups[value] || 0) + 1;
    }
    return groups;
  }
}

/**
 * Export catalog instance
 */
export const catalog = new DesignSystemCatalog();
