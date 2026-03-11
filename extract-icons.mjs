/**
 * Extract SVG icon data from doodle-icons ES module - v3
 * Uses a more robust approach to extract function bodies
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const source = readFileSync(join(__dirname, '../ajentik.com/node_modules/doodle-icons/build/index.es.js'), 'utf-8');

// Step 1: Find all "var SvgXxx = function (props)" declarations
const declRegex = /var (Svg\w+(?:\$\d+)?)\s*=\s*function\s*\(props\)\s*\{/g;
const icons = {};
let match;

while ((match = declRegex.exec(source)) !== null) {
  const varName = match[1];
  const funcStart = match.index;

  // Find the end of this var declaration by looking for the next "var Svg" or "var index"
  const nextVarIdx = source.indexOf('\nvar ', funcStart + 1);
  const funcBody = nextVarIdx > 0
    ? source.substring(funcStart, nextVarIdx)
    : source.substring(funcStart, funcStart + 50000);

  // Extract viewBox
  const viewBoxMatch = funcBody.match(/viewBox:\s*"([^"]+)"/);
  if (!viewBoxMatch) continue;
  const viewBox = viewBoxMatch[1];

  // Extract ALL path d attributes
  const paths = [];
  const pathRegex = /\bd:\s*"([^"]+)"/g;
  let pathMatch;
  while ((pathMatch = pathRegex.exec(funcBody)) !== null) {
    const dValue = pathMatch[1];
    // Skip clip path rectangles (e.g. "M0 0h100v100H0z")
    if (/^M\d+ \d+h[\d.]+v[\d.]+H\d+z$/.test(dValue)) continue;
    paths.push(dValue);
  }

  // Extract circle elements
  const circles = [];
  const circleRegex = /jsx\("circle",\s*\{([^}]+)\}/g;
  let circleMatch;
  while ((circleMatch = circleRegex.exec(funcBody)) !== null) {
    const attrs = circleMatch[1];
    const cx = attrs.match(/cx:\s*([\d.]+)/)?.[1];
    const cy = attrs.match(/cy:\s*([\d.]+)/)?.[1];
    const r = attrs.match(/r:\s*([\d.]+)/)?.[1];
    if (cx && cy && r) {
      circles.push({ cx: parseFloat(cx), cy: parseFloat(cy), r: parseFloat(r) });
    }
  }

  // Extract line elements
  const lines = [];
  const lineRegex = /jsx\("line",\s*\{([^}]+)\}/g;
  let lineMatch;
  while ((lineMatch = lineRegex.exec(funcBody)) !== null) {
    const attrs = lineMatch[1];
    const x1 = attrs.match(/x1:\s*([\d.]+)/)?.[1];
    const y1 = attrs.match(/y1:\s*([\d.]+)/)?.[1];
    const x2 = attrs.match(/x2:\s*([\d.]+)/)?.[1];
    const y2 = attrs.match(/y2:\s*([\d.]+)/)?.[1];
    if (x1 && y1 && x2 && y2) {
      lines.push({ x1: parseFloat(x1), y1: parseFloat(y1), x2: parseFloat(x2), y2: parseFloat(y2) });
    }
  }

  if (paths.length > 0 || circles.length > 0 || lines.length > 0) {
    const iconData = { viewBox, paths };
    if (circles.length > 0) iconData.circles = circles;
    if (lines.length > 0) iconData.lines = lines;
    icons[varName] = iconData;
  }
}

console.log(`Extracted ${Object.keys(icons).length} icons with SVG data`);

// Step 2: Extract category freeze blocks
const freezeRegex = /var (index(?:\$\w+)?)\s*=\s*\/\*#__PURE__\*\/Object\.freeze\(\{\s*__proto__:\s*null,\s*([\s\S]*?)\}\);/g;
const categories = {};

while ((match = freezeRegex.exec(source)) !== null) {
  const [, indexVar, mappingsStr] = match;
  const mappings = {};
  const mapRegex = /(\w+):\s*(Svg\w+(?:\$\d+)?)/g;
  let mapMatch;
  while ((mapMatch = mapRegex.exec(mappingsStr)) !== null) {
    mappings[mapMatch[1]] = mapMatch[2];
  }
  categories[indexVar] = mappings;
}

// Step 3: Extract the export line
const exportMatch = source.match(/export\s*\{([^}]+)\}/);
const categoryNames = {};
if (exportMatch) {
  const exportParts = exportMatch[1].split(',');
  for (const part of exportParts) {
    const trimmed = part.trim();
    const asMatch = trimmed.match(/(\w+(?:\$\w+)?)\s+as\s+(\w+)/);
    if (asMatch) {
      categoryNames[asMatch[2]] = asMatch[1];
    }
  }
}

console.log('\nCategories:');
let totalMapped = 0;
let totalMissing = 0;
for (const [name, indexVar] of Object.entries(categoryNames)) {
  const catIcons = categories[indexVar] || {};
  const count = Object.keys(catIcons).length;
  let found = 0;
  for (const svgVar of Object.values(catIcons)) {
    if (icons[svgVar]) found++;
  }
  totalMapped += found;
  totalMissing += (count - found);
  console.log(`  ${name}: ${found}/${count} icons mapped`);
}

// Step 4: Build final icon map
const finalIcons = {};

for (const [categoryName, indexVar] of Object.entries(categoryNames)) {
  const catMappings = categories[indexVar] || {};
  for (const [exportName, svgVarName] of Object.entries(catMappings)) {
    const kebabName = exportName
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();

    if (icons[svgVarName]) {
      finalIcons[kebabName] = {
        viewBox: icons[svgVarName].viewBox,
        paths: icons[svgVarName].paths,
        category: categoryName.toLowerCase()
      };
      if (icons[svgVarName].circles) finalIcons[kebabName].circles = icons[svgVarName].circles;
      if (icons[svgVarName].lines) finalIcons[kebabName].lines = icons[svgVarName].lines;
    }
  }
}

console.log(`\nTotal: ${totalMapped} mapped, ${totalMissing} missing`);
console.log(`Final icon count: ${Object.keys(finalIcons).length}`);

// Write outputs
writeFileSync(join(__dirname, 'icon-data-raw.json'), JSON.stringify(finalIcons, null, 2));
writeFileSync(join(__dirname, 'icon-names.json'), JSON.stringify(Object.keys(finalIcons).sort(), null, 2));

// Summary by category
const summary = {};
for (const [name, data] of Object.entries(finalIcons)) {
  const cat = data.category;
  if (!summary[cat]) summary[cat] = [];
  summary[cat].push(name);
}
console.log('\nIcons by category:');
for (const [cat, names] of Object.entries(summary).sort()) {
  console.log(`  ${cat} (${names.length}): ${names.slice(0, 5).join(', ')}...`);
}

writeFileSync(join(__dirname, 'categories.json'), JSON.stringify(summary, null, 2));
console.log('\nDone!');
