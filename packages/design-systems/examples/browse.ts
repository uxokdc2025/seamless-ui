#!/usr/bin/env node
/**
 * Example: Browse and import design systems
 */

import { catalog, importFromCatalog, previewSystem } from '../src/index';

// Show catalog stats
console.log('=== Seamless Design Systems Catalog ===\n');
const stats = catalog.getStats();
console.log(`Total systems: ${stats.total}`);
console.log(`With DESIGN.md: ${stats.withDesignMd}`);
console.log(`With tokens: ${stats.withTokens}`);
console.log(`\nLicenses:`, stats.licenses.join(', '));
console.log(`\nBy compatibility:`);
Object.entries(stats.byCompatibility).forEach(([status, count]) => {
  console.log(`  ${status}: ${count}`);
});

// Search for active systems
console.log('\n=== Active Systems (first 10) ===\n');
const activeResults = catalog.search({
  compatibilityStatus: ['active'],
  limit: 10,
});

activeResults.systems.forEach((system, i) => {
  console.log(`${i + 1}. ${system.name}`);
  console.log(`   Author: ${system.author_or_org}`);
  console.log(`   License: ${system.license}`);
  console.log(`   Has DESIGN.md: ${system.has_designmd ? '✓' : '✗'}`);
  console.log(`   Has tokens: ${system.has_tokens ? '✓' : '✗'}`);
  console.log();
});

// Preview a specific system
console.log('=== Preview: Carbon Design System ===\n');
const preview = previewSystem('carbon-design-system');
if (preview.metadata) {
  console.log('Name:', preview.metadata.name);
  console.log('Source:', preview.metadata.source_url);
  console.log('License:', preview.metadata.license);
  console.log('Has DESIGN.md:', preview.hasDesignMd);
  console.log('Has tokens:', preview.hasTokens);
  
  if (preview.tokensPreview) {
    console.log('\nToken preview (first 200 chars):');
    console.log(JSON.stringify(preview.tokensPreview, null, 2).slice(0, 200) + '...');
  }
}

// Show FREE systems only
console.log('\n=== FREE Systems (MIT/Apache/CC) ===\n');
const freeSystems = catalog.getFreeSystems();
console.log(`Found ${freeSystems.length} FREE systems:\n`);
freeSystems.slice(0, 15).forEach((system, i) => {
  console.log(`${i + 1}. ${system.name} (${system.license})`);
});

if (freeSystems.length > 15) {
  console.log(`\n... and ${freeSystems.length - 15} more`);
}

console.log('\n=== Example Complete ===');
console.log('\nTo import a system:');
console.log('  importFromCatalog({ slug: "ant-design", targetDir: "./themes" })');
