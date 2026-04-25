#!/usr/bin/env node
// One-shot redraw of the worst healthcare offenders.
// Each replacement keeps the icon's name, viewBox (24x24), stroke flag and
// category. Paths are hand-drawn doodle gestures (wobbly cubic Béziers) and
// stay inside the soft-cap budget (≤ 6 paths, ≤ 24 cmds, ≤ 450 d-chars).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'icon-data-raw.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));

// name → new path array
const replacements = {
  // Two soft hemispheres + median fold + a single spark (no inner web).
  'ai-brain': [
    'M 11.5 4.5 C 8.2 4.2 5.5 6.5 5.2 9.8 C 4.9 13.2 6.5 16.8 9.2 18.5 C 10.5 19.2 11.5 19.5 11.8 19.5',
    'M 12.5 4.5 C 15.8 4.2 18.5 6.5 18.8 9.8 C 19.1 13.2 17.5 16.8 14.8 18.5 C 13.5 19.2 12.5 19.5 12.2 19.5',
    'M 12 4.5 C 11.8 9.5 12.2 14.5 12 19.5',
    'M 19 2.5 L 19.5 1.5 L 20 2.5 L 21 3 L 20 3.5 L 19.5 4.5 L 19 3.5 L 18 3 Z',
  ],

  // Two figure heads, a doodle hand-off arrow between bodies, dropped
  // duplicated wrist loops and circle inscriptions.
  referral: [
    'M 6.5 6.5 C 6.5 5.1 7.6 4.1 9 4.1 C 10.4 4.1 11.5 5.1 11.5 6.5 C 11.5 7.9 10.4 9 9 9 C 7.6 9 6.5 7.9 6.5 6.5 Z',
    'M 4.5 19.5 C 4.5 15.5 6.5 11.5 9 11.5 C 11.5 11.5 13.5 15.5 13.5 19.5',
    'M 14.5 6.5 C 14.5 5.1 15.6 4.1 17 4.1 C 18.4 4.1 19.5 5.1 19.5 6.5 C 19.5 7.9 18.4 9 17 9 C 15.6 9 14.5 7.9 14.5 6.5 Z',
    'M 14.5 19.5 C 14.5 16.5 15.5 13.5 17 12.5 C 18.5 13.5 19.5 16.5 19.5 19.5',
    'M 11 14 L 16 14 M 14.5 12.5 L 16 14 L 14.5 15.5',
  ],

  // Clipboard outline + clip + a single off-centre heart.
  'care-plan': [
    'M 5 5.5 C 5 4.7 5.6 4.1 6.5 4.1 L 17.5 4.1 C 18.4 4.1 19 4.7 19 5.5 L 19 21 C 19 21.8 18.4 22.4 17.5 22.4 L 6.5 22.4 C 5.6 22.4 5 21.8 5 21 Z',
    'M 9 3 C 9 2.4 9.5 2 10 2 L 14 2 C 14.5 2 15 2.4 15 3 L 15 5.5 L 9 5.5 Z',
    'M 12 17 C 11 14.5 8 14.5 8 17 C 8 19 12 21 12 21 C 12 21 16 19 16 17 C 16 14.5 13 14.5 12 17 Z',
    'M 8 9 L 16 9 M 8 11.5 L 14 11.5',
  ],

  // Calculator body + screen + a curvy "growth" arrow leaping out the top.
  'roi-calculator': [
    'M 5 7 C 5 6.2 5.6 5.6 6.5 5.6 L 17.5 5.6 C 18.4 5.6 19 6.2 19 7 L 19 20 C 19 20.8 18.4 21.4 17.5 21.4 L 6.5 21.4 C 5.6 21.4 5 20.8 5 20 Z',
    'M 7 8.5 L 17 8.5 L 17 11.5 L 7 11.5 Z',
    'M 8 14.5 L 16 14.5 M 8 17.5 L 13 17.5',
    'M 14 5 C 16 3 18 2 21 2 M 21 2 L 19 2 M 21 2 L 21 4',
  ],

  // Curvy admission ticket + a bold question mark.
  'support-ticket': [
    'M 3.5 7 C 3.5 6.4 4 6 4.5 6 L 19.5 6 C 20 6 20.5 6.4 20.5 7 L 20.5 9 C 19.4 9 18.5 9.9 18.5 11 C 18.5 12.1 19.4 13 20.5 13 L 20.5 17 C 20.5 17.6 20 18 19.5 18 L 4.5 18 C 4 18 3.5 17.6 3.5 17 L 3.5 13 C 4.6 13 5.5 12.1 5.5 11 C 5.5 9.9 4.6 9 3.5 9 Z',
    'M 10.5 10.5 C 10.5 9.4 11.4 8.5 12.5 8.5 C 13.6 8.5 14.5 9.4 14.5 10.5 C 14.5 11.4 13.8 11.9 13 12.4 C 12.5 12.7 12.4 13.1 12.4 13.5',
    'M 12.4 15.5 L 12.5 15.6',
  ],

  // Boxy ambulance silhouette + cross + two wheels.
  ambulance: [
    'M 2.5 16.5 L 2.5 9 C 2.5 8 3.2 7.2 4.2 7.2 L 13.5 7.2 L 16.5 11 L 19.5 11 C 20.5 11 21.2 11.7 21.2 12.7 L 21.2 16.5',
    'M 13.5 7.2 L 13.5 11 L 16.5 11',
    'M 2.5 16.5 L 21.2 16.5',
    'M 8 18.5 C 8 19.6 7.1 20.5 6 20.5 C 4.9 20.5 4 19.6 4 18.5 C 4 17.4 4.9 16.5 6 16.5 C 7.1 16.5 8 17.4 8 18.5 Z',
    'M 19 18.5 C 19 19.6 18.1 20.5 17 20.5 C 15.9 20.5 15 19.6 15 18.5 C 15 17.4 15.9 16.5 17 16.5 C 18.1 16.5 19 17.4 19 18.5 Z',
    'M 8 11.5 L 11 11.5 M 9.5 10 L 9.5 13',
  ],

  // X-ray frame + spine spine + two rib arcs.
  'x-ray': [
    'M 4 4 C 4 3.4 4.4 3 5 3 L 19 3 C 19.6 3 20 3.4 20 4 L 20 21 C 20 21.6 19.6 22 19 22 L 5 22 C 4.4 22 4 21.6 4 21 Z',
    'M 12 6 C 11.8 11 12.2 16 12 19',
    'M 12 8 C 9.5 8.2 7.5 9.5 7 11.5 M 12 8 C 14.5 8.2 16.5 9.5 17 11.5',
    'M 12 12 C 9.5 12.2 7.5 13.5 7 15.5 M 12 12 C 14.5 12.2 16.5 13.5 17 15.5',
    'M 12 16 C 9.8 16.2 8 17.5 7.5 19 M 12 16 C 14.2 16.2 16 17.5 16.5 19',
  ],

  // Spine column + three doodled vertebra ovals + side processes.
  spine: [
    'M 12 2.5 C 11.8 8 12.2 16 12 21.5',
    'M 8 6.5 C 8 5.7 9.8 5 12 5 C 14.2 5 16 5.7 16 6.5 C 16 7.3 14.2 8 12 8 C 9.8 8 8 7.3 8 6.5 Z',
    'M 8 12 C 8 11.2 9.8 10.5 12 10.5 C 14.2 10.5 16 11.2 16 12 C 16 12.8 14.2 13.5 12 13.5 C 9.8 13.5 8 12.8 8 12 Z',
    'M 8 17.5 C 8 16.7 9.8 16 12 16 C 14.2 16 16 16.7 16 17.5 C 16 18.3 14.2 19 12 19 C 9.8 19 8 18.3 8 17.5 Z',
    'M 5 9 L 7 7.5 M 19 9 L 17 7.5 M 5 14.5 L 7 13 M 19 14.5 L 17 13',
  ],

  // Pill-strip with three divisions and one pill highlighted.
  'pill-organizer': [
    'M 3 8 C 3 7.4 3.5 7 4 7 L 20 7 C 20.6 7 21 7.4 21 8 L 21 16 C 21 16.6 20.6 17 20 17 L 4 17 C 3.5 17 3 16.6 3 16 Z',
    'M 9 7.2 L 9 17',
    'M 15 7.2 L 15 17',
    'M 5 11 C 5 10.5 5.5 10.2 6 10.2 L 7.5 10.2 C 8 10.2 8.5 10.5 8.5 11 L 8.5 13 C 8.5 13.5 8 13.8 7.5 13.8 L 6 13.8 C 5.5 13.8 5 13.5 5 13 Z',
    'M 5.2 12 L 8.4 12',
  ],

  // Open book with a small cross watermark.
  'knowledge-base': [
    'M 12 7 C 9 5.5 5.5 5 3 5.5 C 3 10.5 3 14.5 3 18.5 C 5.5 18 9 18.5 12 20',
    'M 12 7 C 15 5.5 18.5 5 21 5.5 C 21 10.5 21 14.5 21 18.5 C 18.5 18 15 18.5 12 20',
    'M 12 7 C 11.8 11.5 12.2 15.5 12 20',
    'M 17 10 L 17 13 M 15.5 11.5 L 18.5 11.5',
  ],

  // Two adhesive pads on a diagonal stripe; dropped the duplicated pinholes.
  'bandage-alt': [
    'M 6 4.5 C 4.2 2.7 2.5 4.4 4.3 6.2 L 17.8 19.7 C 19.6 21.5 21.3 19.8 19.5 18 Z',
    'M 8 9 L 11 6 M 13 18 L 16 15',
    'M 10 9 L 11 10 M 11 8 L 12 9 M 12 13 L 13 14 M 13 12 L 14 13',
  ],

  // File outline + small shield with a check.
  'insurance-claim': [
    'M 5 4.5 C 5 3.7 5.6 3.1 6.5 3.1 L 17.5 3.1 C 18.4 3.1 19 3.7 19 4.5 L 19 21 C 19 21.8 18.4 22.4 17.5 22.4 L 6.5 22.4 C 5.6 22.4 5 21.8 5 21 Z',
    'M 7.5 7 L 13 7 M 7.5 9 L 11 9',
    'M 13.5 12 C 13.5 11.4 13.9 11 14.5 11 L 17.5 11 C 18.1 11 18.5 11.4 18.5 12 L 18.5 15 C 18.5 17 16 18.5 16 18.5 C 16 18.5 13.5 17 13.5 15 Z',
    'M 14.5 14.5 L 15.7 15.7 L 17.5 13.5',
  ],

  // Calendar with two figure heads (the "staff").
  'staff-scheduling': [
    'M 3.5 6 C 3.5 5.4 4 5 4.5 5 L 19.5 5 C 20 5 20.5 5.4 20.5 6 L 20.5 19.5 C 20.5 20.1 20 20.5 19.5 20.5 L 4.5 20.5 C 4 20.5 3.5 20.1 3.5 19.5 Z',
    'M 3.5 9 L 20.5 9',
    'M 7 3 L 7 6 M 17 3 L 17 6',
    'M 9 13 C 9 12.2 9.7 11.5 10.5 11.5 C 11.3 11.5 12 12.2 12 13 C 12 13.8 11.3 14.5 10.5 14.5 C 9.7 14.5 9 13.8 9 13 Z',
    'M 13 17 C 13 16.2 13.7 15.5 14.5 15.5 C 15.3 15.5 16 16.2 16 17 C 16 17.8 15.3 18.5 14.5 18.5 C 13.7 18.5 13 17.8 13 17 Z',
  ],

  // Monitor frame + EKG line + power dot.
  'vitals-monitor': [
    'M 3 5 C 3 4.4 3.4 4 4 4 L 20 4 C 20.6 4 21 4.4 21 5 L 21 17 C 21 17.6 20.6 18 20 18 L 4 18 C 3.4 18 3 17.6 3 17 Z',
    'M 5 12 L 8 12 L 9.5 8 L 11.5 16 L 13.5 10 L 15 13 L 19 13',
    'M 9 20 L 15 20',
    'M 12 18 L 12 20',
    'M 18 6.5 C 18.5 6.5 18.5 7 18 7 Z',
  ],

  // Building silhouette + cross + door.
  hospital: [
    'M 4 21 L 4 7 C 4 6.4 4.4 6 5 6 L 19 6 C 19.6 6 20 6.4 20 7 L 20 21 L 4 21 Z',
    'M 11 9 L 13 9 L 13 11 L 15 11 L 15 13 L 13 13 L 13 15 L 11 15 L 11 13 L 9 13 L 9 11 L 11 11 Z',
    'M 10 21 L 10 17 C 10 16.4 10.4 16 11 16 L 13 16 C 13.6 16 14 16.4 14 17 L 14 21',
  ],

  // Calendar with day grid + clock face overlay.
  appointment: [
    'M 4 6 C 4 5.4 4.4 5 5 5 L 19 5 C 19.6 5 20 5.4 20 6 L 20 19.5 C 20 20.1 19.6 20.5 19 20.5 L 5 20.5 C 4.4 20.5 4 20.1 4 19.5 Z',
    'M 4 9 L 20 9',
    'M 8 3 L 8 6 M 16 3 L 16 6',
    'M 17 17 C 17 14.8 15.2 13 13 13 C 10.8 13 9 14.8 9 17 C 9 19.2 10.8 21 13 21 C 15.2 21 17 19.2 17 17 Z',
    'M 13 14.5 L 13 17 L 14.5 18',
  ],

  // Calendar + medical cross.
  'calendar-medical': [
    'M 4 6 C 4 5.4 4.4 5 5 5 L 19 5 C 19.6 5 20 5.4 20 6 L 20 20 C 20 20.6 19.6 21 19 21 L 5 21 C 4.4 21 4 20.6 4 20 Z',
    'M 4 9 L 20 9',
    'M 8 3 L 8 6 M 16 3 L 16 6',
    'M 11 13 L 13 13 L 13 15 L 15 15 L 15 17 L 13 17 L 13 19 L 11 19 L 11 17 L 9 17 L 9 15 L 11 15 Z',
  ],

  // Stylized doodle gear: round body + 4 teeth bumps + inner hub + arrow.
  'automation-gear': [
    'M 12 4.5 C 16.1 4.5 19.5 7.9 19.5 12 C 19.5 16.1 16.1 19.5 12 19.5 C 7.9 19.5 4.5 16.1 4.5 12 C 4.5 7.9 7.9 4.5 12 4.5 Z',
    'M 12 2 L 12 4.5 M 12 19.5 L 12 22 M 2 12 L 4.5 12 M 19.5 12 L 22 12',
    'M 12 9 C 13.7 9 15 10.3 15 12 C 15 13.7 13.7 15 12 15',
    'M 15 12 L 17 12 L 16 10.5',
  ],

  // Document outline + barcode + dollar mark.
  'billing-code': [
    'M 6 3 C 5.4 3 5 3.4 5 4 L 5 21 C 5 21.6 5.4 22 6 22 L 18 22 C 18.6 22 19 21.6 19 21 L 19 8 L 14 3 Z',
    'M 14 3 L 14 8 L 19 8',
    'M 7 12 L 7 17 M 9 12 L 9 17 M 11 12 L 11 17 M 13 12 L 13 17 M 15 12 L 15 17 M 17 12 L 17 17',
    'M 8.5 19.5 L 15.5 19.5',
  ],

  // Five-node graph: connections live in `paths`; nodes use the schema's
  // `circles` field so they don't pad the path-command count.
  'neural-network': [
    'M 8 5.5 L 10.5 11 M 8 18.5 L 10.5 13 M 16 5.5 L 13.5 11 M 16 18.5 L 13.5 13',
  ],

  // Smiling face + a small upward arrow on the cheek.
  'patient-satisfaction': [
    'M 3.5 12 C 3.5 7.3 7.3 3.5 12 3.5 C 16.7 3.5 20.5 7.3 20.5 12 C 20.5 16.7 16.7 20.5 12 20.5 C 7.3 20.5 3.5 16.7 3.5 12 Z',
    'M 8.5 9.5 C 8.7 9.5 8.7 10 8.5 10 Z',
    'M 14.5 9.5 C 14.7 9.5 14.7 10 14.5 10 Z',
    'M 8 13 C 9.5 15.5 14.5 15.5 16 13',
    'M 17.5 6 L 18 4.5 L 18.5 6 M 18 4.5 L 18 7',
  ],
};

// Icons that also need their `circles` array replaced (or set fresh).
const circleReplacements = {
  'neural-network': [
    { cx: 6.5, cy: 5, r: 1.6 },
    { cx: 6.5, cy: 19, r: 1.6 },
    { cx: 17.5, cy: 5, r: 1.6 },
    { cx: 17.5, cy: 19, r: 1.6 },
    { cx: 12, cy: 12, r: 1.6 },
  ],
};

let updated = 0;
let skipped = 0;
for (const [name, paths] of Object.entries(replacements)) {
  if (!data[name]) {
    console.warn('skip (missing): ' + name);
    skipped++;
    continue;
  }
  data[name].paths = paths;
  data[name].stroke = true;
  if (circleReplacements[name]) {
    data[name].circles = circleReplacements[name];
  } else {
    delete data[name].circles;
  }
  updated++;
}

writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Updated ' + updated + ' icons (' + skipped + ' skipped).');
