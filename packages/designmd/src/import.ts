import type { SeamlessTheme, TailwindTheme, CSSVars } from './schema';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Import adapters: convert various formats to canonical Seamless schema
 */

/**
 * Parse DESIGN.md file (YAML frontmatter + markdown)
 */
export function importDesignMd(filePath: string): SeamlessTheme {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error('No YAML frontmatter found in DESIGN.md');
  }
  
  // Parse YAML (simple approach - in production use a proper YAML parser)
  const yaml = frontmatterMatch[1];
  const theme: any = { colors: {}, typography: {}, spacing: {}, rounded: {}, components: {} };
  
  // Basic YAML parsing for common patterns
  const lines = yaml.split('\n');
  let currentSection: string | null = null;
  let currentKey: string | null = null;
  
  for (const line of lines) {
    if (line.match(/^[a-zA-Z]/)) {
      const match = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        if (value) {
          theme[key] = value.replace(/^["']|["']$/g, '');
        } else {
          currentSection = key;
          if (!theme[currentSection]) {
            theme[currentSection] = {};
          }
        }
      }
    } else if (line.trim().startsWith('-') || line.trim().match(/^[a-zA-Z]/)) {
      // Skip arrays for now
      continue;
    } else if (line.match(/^\s+[a-zA-Z]/)) {
      const match = line.match(/^\s+([a-zA-Z_-]+):\s*(.*)$/);
      if (match && currentSection) {
        const [, key, value] = match;
        if (value.match(/^\s*$/)) {
          currentKey = key;
          theme[currentSection][key] = {};
        } else {
          const cleanValue = value.replace(/^["']|["']$/g, '');
          if (currentKey) {
            theme[currentSection][currentKey][key] = cleanValue;
          } else {
            theme[currentSection][key] = { value: cleanValue };
          }
        }
      }
    } else if (line.match(/^\s{4,}[a-zA-Z]/)) {
      const match = line.match(/^\s+([a-zA-Z_-]+):\s*(.*)$/);
      if (match && currentSection && currentKey) {
        const [, key, value] = match;
        const cleanValue = value.replace(/^["']|["']$/g, '');
        theme[currentSection][currentKey][key] = cleanValue;
      }
    }
  }
  
  return theme as SeamlessTheme;
}

/**
 * Import DTCG (W3C Design Tokens) JSON
 */
export function importDTCG(filePath: string): SeamlessTheme {
  const content = fs.readFileSync(filePath, 'utf-8');
  const dtcg = JSON.parse(content);
  
  const theme: SeamlessTheme = {
    version: 'alpha',
    name: 'Imported from DTCG',
    colors: {},
    typography: {},
    spacing: {},
    rounded: {},
  };
  
  // Convert DTCG structure to Seamless
  function traverse(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && '$value' in value) {
        // This is a token
        const type = (value as any).$type;
        const val = (value as any).$value;
        const desc = (value as any).$description;
        
        if (type === 'color' && theme.colors) {
          theme.colors[key] = { value: val, description: desc };
        } else if (type === 'dimension' && path[0] === 'spacing' && theme.spacing) {
          theme.spacing[key] = { value: val, description: desc };
        } else if (type === 'dimension' && path[0] === 'radius' && theme.rounded) {
          theme.rounded[key] = { value: val, description: desc };
        }
      } else if (value && typeof value === 'object') {
        traverse(value, [...path, key]);
      }
    }
  }
  
  traverse(dtcg);
  return theme;
}

/**
 * Import CSS custom properties
 */
export function importCSSVars(cssContent: string): SeamlessTheme {
  const theme: SeamlessTheme = {
    version: 'alpha',
    name: 'Imported from CSS',
    colors: {},
    spacing: {},
    rounded: {},
  };
  
  // Extract :root { ... } block
  const rootMatch = cssContent.match(/:root\s*{([^}]+)}/);
  if (!rootMatch) {
    throw new Error('No :root block found in CSS');
  }
  
  const vars = rootMatch[1];
  const lines = vars.split(';').map(l => l.trim()).filter(Boolean);
  
  for (const line of lines) {
    const match = line.match(/--([a-z-]+):\s*(.+)/);
    if (match) {
      const [, key, value] = match;
      const cleanValue = value.trim();
      
      if (key.startsWith('color-') && theme.colors) {
        theme.colors[key.replace('color-', '')] = { value: cleanValue };
      } else if (key.startsWith('spacing-') && theme.spacing) {
        theme.spacing[key.replace('spacing-', '')] = { value: cleanValue };
      } else if (key.startsWith('radius-') && theme.rounded) {
        theme.rounded[key.replace('radius-', '')] = { value: cleanValue };
      }
    }
  }
  
  return theme;
}

/**
 * Import Tailwind theme config
 */
export function importTailwind(tailwindTheme: TailwindTheme): SeamlessTheme {
  const theme: SeamlessTheme = {
    version: 'alpha',
    name: 'Imported from Tailwind',
    colors: {},
    spacing: {},
    rounded: {},
    typography: {},
  };
  
  // Colors
  if (tailwindTheme.colors && theme.colors) {
    for (const [key, value] of Object.entries(tailwindTheme.colors)) {
      if (typeof value === 'string') {
        theme.colors[key] = { value };
      } else if (typeof value === 'object' && value !== null) {
        // Handle color scales (e.g., gray-50, gray-100, ...)
        for (const [shade, color] of Object.entries(value as Record<string, unknown>)) {
          if (typeof color === 'string') {
            theme.colors[`${key}-${shade}`] = { value: color };
          }
        }
      }
    }
  }
  
  // Spacing
  if (tailwindTheme.spacing && theme.spacing) {
    for (const [key, value] of Object.entries(tailwindTheme.spacing)) {
      theme.spacing[key] = { value };
    }
  }
  
  // Border radius
  if (tailwindTheme.borderRadius && theme.rounded) {
    for (const [key, value] of Object.entries(tailwindTheme.borderRadius)) {
      theme.rounded[key] = { value };
    }
  }
  
  // Font sizes
  if (tailwindTheme.fontSize && theme.typography) {
    for (const [key, value] of Object.entries(tailwindTheme.fontSize)) {
      if (typeof value === 'string') {
        theme.typography[key] = { fontSize: value };
      } else if (Array.isArray(value) && value.length > 0) {
        theme.typography[key] = {
          fontSize: String(value[0]),
          lineHeight: typeof value[1] === 'string' ? value[1] : undefined,
        };
      }
    }
  }
  
  // Font families
  if (tailwindTheme.fontFamily && theme.typography) {
    for (const [key, value] of Object.entries(tailwindTheme.fontFamily)) {
      const existingTypo = theme.typography[key] || {};
      theme.typography[key] = {
        ...existingTypo,
        fontFamily: value.join(', '),
      };
    }
  }
  
  return theme;
}

/**
 * Import JSON (auto-detect format)
 */
export function importJSON(filePath: string): SeamlessTheme {
  const content = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(content);
  
  // Check if it's DTCG format (has $value keys)
  const hasDTCGTokens = JSON.stringify(json).includes('"$value"');
  if (hasDTCGTokens) {
    return importDTCG(filePath);
  }
  
  // Check if it's Tailwind format (has theme structure)
  if (json.colors || json.spacing || json.fontSize) {
    return importTailwind(json as TailwindTheme);
  }
  
  // Check if it's already Seamless format
  if (json.version && json.name) {
    return json as SeamlessTheme;
  }
  
  throw new Error('Unrecognized JSON format');
}

/**
 * Import Seamless theme JSON (direct)
 */
export function importSeamlessTheme(filePath: string): SeamlessTheme {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as SeamlessTheme;
}
