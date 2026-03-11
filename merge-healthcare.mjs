/**
 * Merge healthcare icons into the main icon data and regenerate library files
 */
import { readFileSync, writeFileSync } from 'fs';

// Read existing icon data
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const mainIcons = JSON.parse(readFileSync(join(__dirname, 'icon-data-raw.json'), 'utf-8'));
const healthcareIcons = JSON.parse(readFileSync(join(__dirname, 'healthcare-icons.json'), 'utf-8'));

console.log(`Main icons: ${Object.keys(mainIcons).length}`);
console.log(`Healthcare icons: ${Object.keys(healthcareIcons).length}`);

// Merge healthcare icons
let added = 0;
let skipped = 0;
for (const [name, data] of Object.entries(healthcareIcons)) {
  if (mainIcons[name]) {
    skipped++;
  } else {
    mainIcons[name] = data;
    added++;
  }
}

console.log(`Added: ${added}, Skipped (duplicates): ${skipped}`);
console.log(`Total icons: ${Object.keys(mainIcons).length}`);

// Write merged data
writeFileSync(join(__dirname, 'icon-data-raw.json'), JSON.stringify(mainIcons, null, 2));

// Generate types.ts
const allNames = Object.keys(mainIcons).sort();
const allCategories = [...new Set(Object.values(mainIcons).map(d => d.category))].sort();

let typesContent = '// Auto-generated — do not edit manually\nexport type DoodleIconName =\n';
typesContent += allNames.map(n => `  | '${n}'`).join('\n') + ';\n\n';
typesContent += `export type DoodleIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';\n\n`;
typesContent += 'export type DoodleIconCategory =\n';
typesContent += allCategories.map(c => `  | '${c}'`).join('\n') + ';\n';

writeFileSync(join(__dirname, 'src/lib/types.ts'), typesContent);

// Generate icon-data.ts
let dataContent = '// Auto-generated — do not edit manually\n\n';
dataContent += 'export interface IconData {\n  viewBox: string;\n  paths: string[];\n  circles?: { cx: number; cy: number; r: number }[];\n  lines?: { x1: number; y1: number; x2: number; y2: number }[];\n}\n\n';
dataContent += 'export const iconData: Record<string, IconData> = {\n';

for (const name of allNames) {
  const icon = mainIcons[name];
  dataContent += `  '${name}': {\n`;
  dataContent += `    viewBox: '${icon.viewBox}',\n`;
  dataContent += `    paths: [\n`;
  for (const path of icon.paths) {
    dataContent += `      '${path.replace(/'/g, "\\'")}',\n`;
  }
  dataContent += `    ],\n`;
  if (icon.circles && icon.circles.length > 0) {
    dataContent += `    circles: [${icon.circles.map(c => `{ cx: ${c.cx}, cy: ${c.cy}, r: ${c.r} }`).join(', ')}],\n`;
  }
  if (icon.lines && icon.lines.length > 0) {
    dataContent += `    lines: [${icon.lines.map(l => `{ x1: ${l.x1}, y1: ${l.y1}, x2: ${l.x2}, y2: ${l.y2} }`).join(', ')}],\n`;
  }
  dataContent += `  },\n`;
}

dataContent += '};\n';

writeFileSync(join(__dirname, 'src/lib/icon-data.ts'), dataContent);

console.log(`\nRegenerated types.ts (${allNames.length} names) and icon-data.ts`);
console.log(`Categories: ${allCategories.join(', ')}`);
