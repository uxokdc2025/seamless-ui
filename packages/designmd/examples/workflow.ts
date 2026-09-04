#!/usr/bin/env node
/**
 * Full workflow example: Import, convert, and export design tokens
 */

import { 
  importDesignMd, 
  exportDesignMd, 
  exportDTCG, 
  exportCSSVars, 
  exportTailwind,
  validateSeamlessTheme,
  type SeamlessTheme 
} from '../src/index';
import * as fs from 'fs';
import * as path from 'path';

// Example theme
const exampleTheme: SeamlessTheme = {
  version: 'alpha',
  name: 'Seamless Demo',
  description: 'A demonstration theme for Seamless UI',
  
  colors: {
    primary: { value: '#0066CC', description: 'Primary brand color' },
    secondary: { value: '#6B7280', description: 'Secondary accent' },
    tertiary: { value: '#10B981', description: 'Success green' },
    neutral: { value: '#F9FAFB', description: 'Background gray' },
    text: { value: '#111827', description: 'Body text' },
    danger: { value: '#EF4444', description: 'Error red' },
  },
  
  typography: {
    'heading-1': {
      fontFamily: 'Inter',
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    'body-md': {
      fontFamily: 'Inter',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  
  spacing: {
    xs: { value: '0.25rem' },
    sm: { value: '0.5rem' },
    md: { value: '1rem' },
    lg: { value: '1.5rem' },
    xl: { value: '2rem' },
  },
  
  rounded: {
    sm: { value: '0.25rem' },
    md: { value: '0.5rem' },
    lg: { value: '1rem' },
    full: { value: '9999px' },
  },
  
  components: {
    'button-primary': {
      backgroundColor: '{colors.primary}',
      textColor: '#FFFFFF',
      rounded: '{rounded.md}',
      padding: '12px',
    },
  },
};

console.log('=== Seamless DESIGN.md Workflow Demo ===\n');

// Step 1: Validate
console.log('1. Validating theme...');
const validation = validateSeamlessTheme(exampleTheme);
if (validation.valid) {
  console.log('   ✓ Theme is valid');
} else {
  console.log('   ✗ Validation errors:');
  validation.findings.forEach(f => console.log(`     - [${f.severity}] ${f.message}`));
}

// Step 2: Export to DESIGN.md
console.log('\n2. Exporting to DESIGN.md...');
const designMd = exportDesignMd(exampleTheme);
console.log('   Generated DESIGN.md (first 500 chars):');
console.log('   ' + designMd.slice(0, 500).replace(/\n/g, '\n   '));

// Step 3: Export to DTCG
console.log('\n3. Exporting to DTCG (W3C Design Tokens)...');
const dtcg = exportDTCG(exampleTheme);
console.log('   Generated tokens.json (first 300 chars):');
console.log('   ' + dtcg.slice(0, 300).replace(/\n/g, '\n   '));

// Step 4: Export to CSS vars
console.log('\n4. Exporting to CSS custom properties...');
const css = exportCSSVars(exampleTheme);
console.log('   Generated theme.css (first 400 chars):');
console.log('   ' + css.slice(0, 400).replace(/\n/g, '\n   '));

// Step 5: Export to Tailwind
console.log('\n5. Exporting to Tailwind config...');
const tailwind = exportTailwind(exampleTheme);
console.log('   Generated tailwind.theme.json (first 300 chars):');
console.log('   ' + tailwind.slice(0, 300).replace(/\n/g, '\n   '));

// Step 6: Show token references
console.log('\n6. Token reference resolution:');
console.log('   button-primary.backgroundColor = "{colors.primary}"');
console.log('   → Resolves to: #0066CC');
console.log('   button-primary.rounded = "{rounded.md}"');
console.log('   → Resolves to: 0.5rem');

console.log('\n=== Demo Complete ===');
console.log('\nAll exports can be written to disk with:');
console.log('  writeExports(theme, "./output")');
