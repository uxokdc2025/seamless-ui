import type { DesignSystemMetadata } from './schema';
import type { SeamlessTheme } from '@seamless/designmd';
import { catalog } from './catalog';
import { importDesignMd, importJSON, importSeamlessTheme } from '@seamless/designmd';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Import design systems from the catalog into a project
 */

export interface ImportOptions {
  slug: string;
  targetDir: string;
  formats?: ('designmd' | 'tokens' | 'css' | 'tailwind' | 'seamless')[];
}

export interface ImportResult {
  success: boolean;
  system: DesignSystemMetadata;
  files: string[];
  theme?: SeamlessTheme;
  error?: string;
}

/**
 * Import a design system from the catalog
 */
export function importFromCatalog(options: ImportOptions): ImportResult {
  const { slug, targetDir, formats = ['seamless', 'css', 'tailwind'] } = options;
  
  const result: ImportResult = {
    success: false,
    system: null as any,
    files: [],
  };
  
  try {
    // Get system metadata
    const system = catalog.getSystem(slug);
    if (!system) {
      result.error = `Design system ${slug} not found in catalog`;
      return result;
    }
    
    result.system = system;
    
    // Check license
    const freeLicenses = ['MIT', 'Apache-2.0', 'Apache', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'ISC', 'BSD'];
    if (!freeLicenses.includes(system.license) && system.redistribution_allowed !== 'yes') {
      result.error = `License ${system.license} may not allow redistribution. Manual review required.`;
      return result;
    }
    
    // Create target directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    let theme: SeamlessTheme | null = null;
    
    // Import DESIGN.md if available
    if (system.has_designmd && catalog.hasFile(slug, 'DESIGN.md')) {
      const designMdPath = path.join(catalog.getSystemPath(slug), 'DESIGN.md');
      theme = importDesignMd(designMdPath);
      
      if (formats.includes('designmd')) {
        const content = catalog.readFile(slug, 'DESIGN.md');
        if (content) {
          const targetPath = path.join(targetDir, 'DESIGN.md');
          fs.writeFileSync(targetPath, content);
          result.files.push(targetPath);
        }
      }
    }
    
    // Import tokens if available
    if (system.has_tokens && catalog.hasFile(slug, 'tokens.json')) {
      if (!theme) {
        const tokensPath = path.join(catalog.getSystemPath(slug), 'tokens.json');
        theme = importJSON(tokensPath);
      }
      
      if (formats.includes('tokens')) {
        const content = catalog.readFile(slug, 'tokens.json');
        if (content) {
          const targetPath = path.join(targetDir, 'tokens.json');
          fs.writeFileSync(targetPath, content);
          result.files.push(targetPath);
        }
      }
    }
    
    // Import CSS theme if available
    if (system.has_css_tailwind_theme && catalog.hasFile(slug, 'theme.css')) {
      if (formats.includes('css')) {
        const content = catalog.readFile(slug, 'theme.css');
        if (content) {
          const targetPath = path.join(targetDir, 'theme.css');
          fs.writeFileSync(targetPath, content);
          result.files.push(targetPath);
        }
      }
    }
    
    // Export to requested formats
    if (theme) {
      result.theme = theme;
      
      if (formats.includes('seamless')) {
        const targetPath = path.join(targetDir, 'seamless-theme.json');
        fs.writeFileSync(targetPath, JSON.stringify(theme, null, 2));
        result.files.push(targetPath);
      }
      
      // Additional format exports would be added here
      // (using the export functions from @seamless/designmd)
    }
    
    // Copy metadata
    const metadata = catalog.getMetadata(slug);
    if (metadata) {
      const targetPath = path.join(targetDir, 'metadata.json');
      fs.writeFileSync(targetPath, JSON.stringify(metadata, null, 2));
      result.files.push(targetPath);
    }
    
    result.success = true;
  } catch (error: any) {
    result.error = error.message;
  }
  
  return result;
}

/**
 * Preview a design system (read without importing)
 */
export function previewSystem(slug: string): {
  metadata: DesignSystemMetadata | null;
  hasDesignMd: boolean;
  hasTokens: boolean;
  hasCss: boolean;
  designMdPreview?: string;
  tokensPreview?: any;
} {
  const metadata = catalog.getMetadata(slug);
  
  return {
    metadata,
    hasDesignMd: catalog.hasFile(slug, 'DESIGN.md'),
    hasTokens: catalog.hasFile(slug, 'tokens.json'),
    hasCss: catalog.hasFile(slug, 'theme.css'),
    designMdPreview: catalog.readFile(slug, 'DESIGN.md')?.slice(0, 500) || undefined,
    tokensPreview: catalog.hasFile(slug, 'tokens.json') 
      ? JSON.parse(catalog.readFile(slug, 'tokens.json') || '{}')
      : undefined,
  };
}

/**
 * Attach a design system to a project (copy files)
 */
export function attachToProject(slug: string, projectPath: string): ImportResult {
  const themesDir = path.join(projectPath, 'design-systems', slug);
  return importFromCatalog({
    slug,
    targetDir: themesDir,
    formats: ['designmd', 'tokens', 'css', 'tailwind', 'seamless'],
  });
}
