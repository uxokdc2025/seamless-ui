import type { SeamlessTheme, TailwindTheme, CSSVars, ShadcnRegistryItem } from './schema';
import * as fs from 'fs';

/**
 * Export adapters: convert Seamless schema to various formats
 */

/**
 * Export to DESIGN.md format (YAML frontmatter + markdown)
 */
export function exportDesignMd(theme: SeamlessTheme, includeMarkdown: boolean = true): string {
  let output = '---\n';
  
  // Basic metadata
  output += `version: ${theme.version || 'alpha'}\n`;
  output += `name: ${theme.name}\n`;
  if (theme.description) {
    output += `description: ${theme.description}\n`;
  }
  
  // Colors
  if (theme.colors && Object.keys(theme.colors).length > 0) {
    output += 'colors:\n';
    for (const [key, token] of Object.entries(theme.colors)) {
      output += `  ${key}: "${token.value}"\n`;
    }
  }
  
  // Typography
  if (theme.typography && Object.keys(theme.typography).length > 0) {
    output += 'typography:\n';
    for (const [key, token] of Object.entries(theme.typography)) {
      output += `  ${key}:\n`;
      if (token.fontFamily) output += `    fontFamily: ${token.fontFamily}\n`;
      if (token.fontSize) output += `    fontSize: ${token.fontSize}\n`;
      if (token.fontWeight) output += `    fontWeight: ${token.fontWeight}\n`;
      if (token.lineHeight) output += `    lineHeight: ${token.lineHeight}\n`;
      if (token.letterSpacing) output += `    letterSpacing: "${token.letterSpacing}"\n`;
    }
  }
  
  // Spacing
  if (theme.spacing && Object.keys(theme.spacing).length > 0) {
    output += 'spacing:\n';
    for (const [key, token] of Object.entries(theme.spacing)) {
      output += `  ${key}: ${token.value}\n`;
    }
  }
  
  // Rounded (border radius)
  if (theme.rounded && Object.keys(theme.rounded).length > 0) {
    output += 'rounded:\n';
    for (const [key, token] of Object.entries(theme.rounded)) {
      output += `  ${key}: ${token.value}\n`;
    }
  }
  
  // Components
  if (theme.components && Object.keys(theme.components).length > 0) {
    output += 'components:\n';
    for (const [key, token] of Object.entries(theme.components)) {
      output += `  ${key}:\n`;
      if (token.backgroundColor) output += `    backgroundColor: "${token.backgroundColor}"\n`;
      if (token.textColor) output += `    textColor: "${token.textColor}"\n`;
      if (token.typography) output += `    typography: "${token.typography}"\n`;
      if (token.rounded) output += `    rounded: "${token.rounded}"\n`;
      if (token.padding) output += `    padding: ${token.padding}\n`;
    }
  }
  
  output += '---\n';
  
  // Add markdown body if requested
  if (includeMarkdown) {
    output += '\n## Overview\n\n';
    output += theme.description || 'Design system tokens for ' + theme.name;
    output += '\n\n## Colors\n\n';
    if (theme.colors) {
      for (const [key, token] of Object.entries(theme.colors)) {
        output += `- **${key}** (${token.value})`;
        if (token.description) output += `: ${token.description}`;
        output += '\n';
      }
    }
  }
  
  return output;
}

/**
 * Export to DTCG (W3C Design Tokens) JSON
 */
export function exportDTCG(theme: SeamlessTheme): string {
  const dtcg: any = {};
  
  // Colors
  if (theme.colors) {
    dtcg.color = {};
    for (const [key, token] of Object.entries(theme.colors)) {
      dtcg.color[key] = {
        $value: token.value,
        $type: 'color',
        ...(token.description && { $description: token.description }),
      };
    }
  }
  
  // Spacing
  if (theme.spacing) {
    dtcg.spacing = {};
    for (const [key, token] of Object.entries(theme.spacing)) {
      dtcg.spacing[key] = {
        $value: token.value,
        $type: 'dimension',
        ...(token.description && { $description: token.description }),
      };
    }
  }
  
  // Border radius
  if (theme.rounded) {
    dtcg.radius = {};
    for (const [key, token] of Object.entries(theme.rounded)) {
      dtcg.radius[key] = {
        $value: token.value,
        $type: 'dimension',
        ...(token.description && { $description: token.description }),
      };
    }
  }
  
  // Typography
  if (theme.typography) {
    dtcg.typography = {};
    for (const [key, token] of Object.entries(theme.typography)) {
      dtcg.typography[key] = {
        $type: 'typography',
        $value: {
          ...(token.fontFamily && { fontFamily: token.fontFamily }),
          ...(token.fontSize && { fontSize: token.fontSize }),
          ...(token.fontWeight && { fontWeight: token.fontWeight }),
          ...(token.lineHeight && { lineHeight: token.lineHeight }),
          ...(token.letterSpacing && { letterSpacing: token.letterSpacing }),
        },
        ...(token.description && { $description: token.description }),
      };
    }
  }
  
  return JSON.stringify(dtcg, null, 2);
}

/**
 * Export to CSS custom properties
 */
export function exportCSSVars(theme: SeamlessTheme, prefix: string = ''): string {
  let css = ':root {\n';
  
  // Colors
  if (theme.colors) {
    for (const [key, token] of Object.entries(theme.colors)) {
      css += `  --${prefix}color-${key}: ${token.value};\n`;
    }
  }
  
  // Spacing
  if (theme.spacing) {
    for (const [key, token] of Object.entries(theme.spacing)) {
      css += `  --${prefix}spacing-${key}: ${token.value};\n`;
    }
  }
  
  // Border radius
  if (theme.rounded) {
    for (const [key, token] of Object.entries(theme.rounded)) {
      css += `  --${prefix}radius-${key}: ${token.value};\n`;
    }
  }
  
  // Typography
  if (theme.typography) {
    for (const [key, token] of Object.entries(theme.typography)) {
      if (token.fontFamily) css += `  --${prefix}font-${key}-family: ${token.fontFamily};\n`;
      if (token.fontSize) css += `  --${prefix}font-${key}-size: ${token.fontSize};\n`;
      if (token.fontWeight) css += `  --${prefix}font-${key}-weight: ${token.fontWeight};\n`;
      if (token.lineHeight) css += `  --${prefix}font-${key}-line-height: ${token.lineHeight};\n`;
    }
  }
  
  css += '}\n';
  return css;
}

/**
 * Export to Tailwind theme config
 */
export function exportTailwind(theme: SeamlessTheme): string {
  const tailwind: TailwindTheme = {
    colors: {},
    spacing: {},
    fontSize: {},
    fontFamily: {},
    borderRadius: {},
  };
  
  // Colors
  if (theme.colors) {
    for (const [key, token] of Object.entries(theme.colors)) {
      tailwind.colors![key] = token.value;
    }
  }
  
  // Spacing
  if (theme.spacing) {
    for (const [key, token] of Object.entries(theme.spacing)) {
      tailwind.spacing![key] = token.value;
    }
  }
  
  // Border radius
  if (theme.rounded) {
    for (const [key, token] of Object.entries(theme.rounded)) {
      tailwind.borderRadius![key] = token.value;
    }
  }
  
  // Typography - font sizes
  if (theme.typography) {
    for (const [key, token] of Object.entries(theme.typography)) {
      if (token.fontSize) {
        if (token.lineHeight) {
          tailwind.fontSize![key] = [token.fontSize, token.lineHeight];
        } else {
          tailwind.fontSize![key] = token.fontSize;
        }
      }
      
      if (token.fontFamily) {
        tailwind.fontFamily![key] = token.fontFamily.split(',').map(f => f.trim());
      }
    }
  }
  
  return JSON.stringify({ theme: tailwind }, null, 2);
}

/**
 * Export to Seamless theme JSON
 */
export function exportSeamlessTheme(theme: SeamlessTheme): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Export to shadcn registry item format
 */
export function exportShadcnRegistry(theme: SeamlessTheme): ShadcnRegistryItem {
  const cssVars: Record<string, Record<string, string>> = {
    light: {},
    dark: {},
  };
  
  // Convert colors to CSS vars
  if (theme.colors) {
    for (const [key, token] of Object.entries(theme.colors)) {
      cssVars.light[key] = token.value;
      // For dark mode, we'd need separate tokens or transformations
      cssVars.dark[key] = token.value;
    }
  }
  
  return {
    name: theme.name.toLowerCase().replace(/\s+/g, '-'),
    type: 'components:ui',
    files: ['theme.css'],
    cssVars,
  };
}

/**
 * Write exports to disk
 */
export function writeExports(theme: SeamlessTheme, outputDir: string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // DESIGN.md
  fs.writeFileSync(`${outputDir}/DESIGN.md`, exportDesignMd(theme));
  
  // DTCG JSON
  fs.writeFileSync(`${outputDir}/tokens.json`, exportDTCG(theme));
  
  // CSS vars
  fs.writeFileSync(`${outputDir}/theme.css`, exportCSSVars(theme));
  
  // Tailwind config
  fs.writeFileSync(`${outputDir}/tailwind.theme.json`, exportTailwind(theme));
  
  // Seamless theme JSON
  fs.writeFileSync(`${outputDir}/seamless-theme.json`, exportSeamlessTheme(theme));
  
  // shadcn registry
  fs.writeFileSync(
    `${outputDir}/shadcn-registry.json`,
    JSON.stringify(exportShadcnRegistry(theme), null, 2)
  );
}
