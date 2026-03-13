/**
 * Refine 47 icons — fewer paths, clearer depictions, doodle aesthetic preserved.
 * Target: 3-6 paths per icon (down from 5-14).
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, 'icon-data-raw.json');
const raw = JSON.parse(readFileSync(dataPath, 'utf-8'));

const refined = {
  // --- HEALTHCARE EQUIPMENT ---

  "ct-scan": {
    // Was 6 paths (circles + 4 separate crosshairs). Now 3: ring, hole, combined crosshairs
    paths: [
      "M 12.1 3.2 C 17.5 3.5 20.8 7.2 20.5 12.2 C 20.2 17.1 16.2 20.5 11.8 20.2 C 7.1 19.8 3.5 16.2 3.8 11.5 C 4.1 6.8 7.5 3.5 12.1 3.2",
      "M 12.2 7.5 C 15.1 7.8 16.8 10.1 16.2 12.8 C 15.8 15.1 13.2 16.5 10.8 15.8 C 8.5 15.2 7.2 12.8 7.8 10.8 C 8.5 8.8 10.2 7.5 12.2 7.5",
      "M 2.5 12.1 L 7.5 12.2 M 16.5 12.1 L 21.5 11.8 M 12.1 2.5 L 12.2 7.2 M 12.1 16.5 L 11.8 21.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "surgical-mask": {
    // Was 5 paths. Now 3: mask body, pleats combined, ear loops combined
    paths: [
      "M 4.5 8.2 C 7.5 7.1 16.5 7.1 19.5 8.2 C 20.2 10.5 19.8 12.8 18.5 14.5 C 16.2 16.8 7.8 16.8 5.5 14.5 C 4.2 12.8 3.8 10.5 4.5 8.2",
      "M 5.8 10.8 L 18.2 10.8 M 5.5 13.1 L 18.5 13.1",
      "M 4.5 9.5 C 3.2 8.5 2.5 7.5 2.1 6.8 M 19.5 9.5 C 20.8 8.5 21.5 7.5 21.9 6.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "gown": {
    // Was 8 paths. Now 4: body+sleeves, collar, center line, tie
    paths: [
      "M 9.5 3.5 C 7.5 4.1 4.2 5.8 3.5 7.8 C 3.2 9.5 4.5 9.8 5.8 9.2 L 6.1 21.2 C 10.5 21.8 13.5 21.5 17.8 21.2 L 18.2 9.2 C 19.5 9.8 20.8 9.5 20.5 7.8 C 19.8 5.8 16.5 4.1 14.5 3.5",
      "M 9.5 3.5 C 10.8 4.8 13.2 4.8 14.5 3.5",
      "M 12.1 4.8 L 12.2 21.2",
      "M 10.5 8.5 C 11.5 9.5 12.5 9.5 13.5 8.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "defibrillator": {
    // Was 11 paths! Now 5: box, screen, heartbeat line, lightning bolt, paddles
    paths: [
      "M 5.5 4.5 C 5.2 3.5 6.2 2.8 7.2 2.8 L 16.8 2.8 C 17.8 2.8 18.8 3.5 18.5 4.5 L 18.2 18.5 C 18.1 19.5 17.2 20.2 16.2 20.2 L 7.8 20.2 C 6.8 20.2 5.9 19.5 5.8 18.5 Z",
      "M 7.5 5.5 L 16.5 5.5 L 16.2 11.5 L 7.8 11.5 Z",
      "M 8.5 8.5 L 10.2 8.5 L 11.2 6.5 L 12.8 10.5 L 13.8 8.5 L 15.5 8.5",
      "M 11.5 13.5 L 13.5 13.5 L 12.8 16.2 L 14.2 16.2 L 11.8 19.5",
      "M 5.5 15.5 C 4.2 15.8 3.2 16.8 3.5 18.2 C 3.8 19.2 4.8 19.5 5.5 18.8 M 18.5 15.5 C 19.8 15.8 20.8 16.8 20.5 18.2 C 20.2 19.2 19.2 19.5 18.5 18.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "ventilator": {
    // Was 8 paths. Now 4: base, monitor box, tubing, controls
    paths: [
      "M 4.5 17.2 L 19.5 17.2 L 19.2 20.5 L 4.8 20.5 Z",
      "M 6.5 10.2 L 11.5 10.2 L 11.2 17.2 L 6.8 17.2 Z",
      "M 11.5 12.5 L 17.2 12.5 C 18.5 12.2 19.5 10.5 19.8 8.5 C 20.1 6.8 18.8 5.5 17.5 5.8",
      "M 7.8 13.5 L 9.2 13.5 M 7.8 15.2 L 9.2 15.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "lab-coat": {
    // Was 9 paths. Now 4: body+sleeves, collar, lapel lines, pockets
    paths: [
      "M 8.5 3.2 C 6.5 3.8 3.5 5.5 3.2 8.5 L 3.8 15.2 L 6.2 14.8 L 5.8 21.5 C 10.5 21.8 13.5 21.5 18.2 21.5 L 17.8 14.8 L 20.2 15.2 L 20.8 8.5 C 20.5 5.5 17.5 3.8 15.5 3.2",
      "M 8.5 3.2 C 10.2 2.5 13.8 2.5 15.5 3.2",
      "M 10.2 4.5 L 12.1 12.5 L 13.8 4.5 M 12.1 12.5 L 12.2 21.5",
      "M 7.5 16.5 C 8.8 16.2 9.5 17.8 8.2 18.5 C 7.2 18.2 7.2 16.8 7.5 16.5 M 15.5 16.5 C 16.8 16.2 17.5 17.8 16.2 18.5 C 15.2 18.2 15.2 16.8 15.5 16.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "medical-bag": {
    // Was 8 paths. Now 4: bag body, handle, cross, feet
    paths: [
      "M 3.8 10.5 C 3.5 10.2 4.2 9.5 5.2 9.5 L 18.8 9.5 C 19.8 9.5 20.5 10.2 20.2 10.5 L 19.5 20.2 C 19.2 20.8 18.5 21.2 17.8 21.2 L 6.2 21.2 C 5.5 21.2 4.8 20.8 4.5 20.2 Z",
      "M 8.5 9.5 C 8.2 6.5 9.8 4.5 12.1 4.5 C 14.2 4.5 15.8 6.5 15.5 9.5",
      "M 12.1 13.2 L 12.1 18.2 M 9.8 15.5 L 14.2 15.5",
      "M 3.8 18.5 L 3.5 21.5 M 20.2 18.5 L 20.5 21.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- DIGITAL HEALTH / DASHBOARDS ---

  "ehr-system": {
    // Was 12 paths! Now 5: monitor, stand, patient avatar, heartbeat, cross
    paths: [
      "M 3.5 4.2 L 20.5 4.2 C 21.2 4.5 21.5 5.2 21.5 5.8 L 21.2 16.2 C 21.1 16.8 20.5 17.2 19.8 17.2 L 4.2 17.2 C 3.5 17.2 2.9 16.8 2.8 16.2 L 2.5 5.8 C 2.5 5.2 2.8 4.5 3.5 4.2",
      "M 9.8 17.2 L 9.5 20.5 L 14.5 20.5 L 14.2 17.2 M 7.5 20.5 L 16.5 20.5",
      "M 5.5 7.5 C 5.8 6.8 6.8 6.8 7.1 7.5 C 7.1 8.2 6.1 8.5 5.5 7.5 M 5.2 9.8 C 5.5 10.5 7.5 10.5 7.8 9.8",
      "M 9.5 7.2 L 15.5 7.2 M 9.5 9.5 L 18.5 9.5",
      "M 5.2 12.5 L 7.2 12.5 L 8.2 10.8 L 9.8 14.5 L 10.8 12.5 L 12.8 12.5 L 18.5 12.5 M 18.5 6.5 L 18.5 8.5 M 17.5 7.5 L 19.5 7.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "dashboard-medical": {
    // Was 8 paths. Now 4: outer frame, dividers, checkmark, detail lines
    paths: [
      "M 3.5 3.2 L 20.5 3.2 L 20.2 21.5 L 3.8 21.5 Z",
      "M 3.5 9.2 L 20.5 9.2 M 9.5 9.2 L 9.5 21.5",
      "M 12.5 14.2 L 14.5 16.2 L 18.5 12.2",
      "M 5.2 5.8 L 8.2 5.8 M 12.5 5.8 L 18.5 5.8 M 5.2 13.2 L 7.5 13.2 M 5.2 16.2 L 7.5 16.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "analytics-chart": {
    // Was 7 paths. Now 4: axes, trend line, arrow tip, bars combined
    paths: [
      "M 3.5 3.2 L 3.5 20.8 L 21.5 20.8",
      "M 7.2 14.5 L 10.5 10.5 L 14.5 12.5 L 19.2 5.5",
      "M 16.5 5.5 L 19.2 5.5 L 19.2 8.2",
      "M 7.2 20.8 L 7.2 18.5 M 11.2 20.8 L 11.2 16.2 M 15.2 20.8 L 15.2 14.5 M 19.2 20.8 L 19.2 12.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "real-time-monitor": {
    // Was 9 paths. Now 4: screen outer, screen inner, heartbeat line, stand
    paths: [
      "M 3.2 4.5 L 20.8 4.5 C 21.5 4.8 21.8 5.5 21.5 6.2 L 20.8 16.2 C 20.5 16.8 19.8 17.2 19.2 17.2 L 4.8 17.2 C 4.2 17.2 3.5 16.8 3.2 16.2 L 2.5 6.2 C 2.5 5.5 2.8 4.8 3.2 4.5",
      "M 4.5 5.8 L 19.5 5.8 L 19.2 15.8 L 4.8 15.8 Z",
      "M 5.2 11.2 L 7.5 11.2 L 8.5 8.5 L 10.2 14.2 L 11.5 9.8 L 12.8 11.2 L 15.5 11.2 L 16.2 9.5 L 17.2 12.5 L 18.2 11.2 L 19.2 11.2",
      "M 10.5 17.2 L 10.2 19.8 L 7.5 19.8 M 13.5 17.2 L 13.8 19.8 L 16.5 19.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- AI / TECH ---

  "voice-assistant": {
    // Was 8 paths. Now 4: mic body, pickup arc, stand, sound waves combined
    paths: [
      "M 12.1 2.5 C 10.2 2.5 9.2 3.8 9.2 5.5 L 9.2 10.8 C 9.2 12.5 10.5 13.8 12.1 13.8 C 13.8 13.8 15.2 12.5 15.2 10.8 L 15.2 5.5 C 15.2 3.8 14.2 2.5 12.1 2.5",
      "M 5.5 10.2 C 5.8 14.5 8.5 17.5 12.1 17.5 C 15.8 17.5 18.2 14.5 18.5 10.2",
      "M 12.1 17.5 L 12.2 21.5 M 8.5 21.5 L 15.5 21.5",
      "M 2.5 10.2 L 4.5 10.2 M 19.5 10.2 L 21.5 10.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "nlp-text": {
    // Was 11 paths! Now 4: document, text lines, folded corner, AI sparkle
    paths: [
      "M 5.5 2.5 L 14.5 2.5 L 18.5 6.5 L 18.2 21.5 L 5.8 21.5 Z",
      "M 14.5 2.5 L 14.5 6.5 L 18.5 6.5",
      "M 7.5 9.5 L 16.5 9.5 M 7.5 12.2 L 14.5 12.2 M 7.5 14.8 L 15.5 14.8 M 7.5 17.5 L 11.5 17.5",
      "M 15.5 16.5 C 15.8 15.8 16.5 15.5 17.2 15.8 C 17.5 16.5 17.2 17.2 16.5 17.5 L 17.8 18.5 L 17.2 17.8 C 18.2 17.5 19.5 17.8 19.2 18.8 C 18.8 19.5 17.5 19.5 17.2 18.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "machine-learning": {
    // Was 13 paths! Now 5: center node, 4 outer nodes, connecting lines, arc+arrow
    paths: [
      "M 12.1 10.5 C 13.5 10.5 14.5 11.5 14.5 12.8 C 14.5 14.2 13.5 15.2 12.1 15.2 C 10.8 15.2 9.8 14.2 9.8 12.8 C 9.8 11.5 10.8 10.5 12.1 10.5",
      "M 5.2 5.2 C 5.8 4.5 6.8 4.5 7.2 5.2 C 7.5 5.8 6.8 6.8 5.8 6.5 C 5.2 6.2 4.8 5.8 5.2 5.2 M 18.2 5.2 C 18.8 4.5 19.8 4.5 20.2 5.2 C 20.5 5.8 19.8 6.8 18.8 6.5 C 18.2 6.2 17.8 5.8 18.2 5.2 M 5.2 18.8 C 5.8 18.2 6.8 18.2 7.2 18.8 C 7.5 19.5 6.8 20.5 5.8 20.2 C 5.2 19.8 4.8 19.5 5.2 18.8 M 18.2 18.8 C 18.8 18.2 19.8 18.2 20.2 18.8 C 20.5 19.5 19.8 20.5 18.8 20.2 C 18.2 19.8 17.8 19.5 18.2 18.8",
      "M 6.5 6.5 L 10.5 11.2 M 18.5 6.5 L 14.2 11.2 M 6.5 18.5 L 10.5 14.5 M 18.5 18.5 L 14.2 14.5",
      "M 10.2 8.5 C 12.5 7.2 15.2 8.2 16.2 10.5",
      "M 16.2 10.5 L 15.5 9.2 M 16.2 10.5 L 17.2 9.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "secure-data": {
    // Was 4 paths. Already simple! Just add doodle style.
    paths: [
      "M 5.2 11.2 L 18.8 11.2 L 18.5 20.8 L 5.5 20.8 Z",
      "M 8.2 11.2 L 8.2 7.5 C 8.2 5.2 9.8 3.5 12.1 3.5 C 14.2 3.5 15.8 5.2 15.8 7.5 L 15.8 11.2",
      "M 12.1 14.5 C 12.8 14.5 13.5 15.2 13.5 15.8 C 13.5 16.5 12.8 17.2 12.1 17.2 C 11.5 17.2 10.8 16.5 10.8 15.8 C 10.8 15.2 11.5 14.5 12.1 14.5",
      "M 12.1 17.2 L 12.2 19.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "encryption-health": {
    // Was 9 paths. Now 4: shield, lock, health cross, keyhole
    paths: [
      "M 12.1 2.8 C 15.2 3.8 17.5 4.5 19.8 4.8 C 20.1 9.5 19.2 14.2 16.2 17.5 C 14.5 19.5 12.5 20.8 12.1 21.2 C 11.8 20.8 9.8 19.5 7.8 17.5 C 4.8 14.2 3.9 9.5 4.2 4.8 C 6.5 4.5 8.8 3.8 12.1 2.8",
      "M 9.5 11.5 L 14.5 11.5 L 14.5 16.5 L 9.5 16.5 Z",
      "M 10.5 11.5 L 10.5 9.5 C 10.5 8.2 11.2 7.5 12.1 7.5 C 12.8 7.5 13.5 8.2 13.5 9.5 L 13.5 11.5",
      "M 12.1 13.2 L 12.1 15.2 M 11.2 14.2 L 13.2 14.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "compliance-check": {
    // Was 10 paths! Now 4: clipboard body, clip, checkmarks combined, shield+check
    paths: [
      "M 4.5 5.5 L 19.5 5.5 L 19.2 21.5 L 4.8 21.5 Z",
      "M 8.5 3.5 L 15.5 3.5 L 15.2 6.2 L 8.8 6.2 Z",
      "M 6.2 9.5 L 7.5 10.8 L 9.5 8.5 M 6.2 13.5 L 7.5 14.8 L 9.5 12.5 M 6.2 17.5 L 7.5 18.8 L 9.5 16.5",
      "M 11.5 9.5 L 17.5 9.5 M 11.5 13.5 L 17.5 13.5 M 11.5 17.5 L 15.5 17.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "audit-log": {
    // Was 11 paths! Now 4: document, folded corner, text lines, magnifier
    paths: [
      "M 5.5 2.5 L 14.5 2.5 L 18.5 6.5 L 18.2 21.5 L 5.8 21.5 Z",
      "M 14.5 2.5 L 14.5 6.5 L 18.5 6.5",
      "M 7.5 9.5 L 12.5 9.5 M 7.5 12.5 L 10.5 12.5 M 7.5 15.5 L 9.5 15.5",
      "M 14.5 13.5 C 15.8 12.2 17.8 12.5 18.5 14.2 C 19.2 15.8 18.2 17.5 16.5 17.8 C 14.8 18.2 13.2 16.8 13.2 15.2 C 13.2 14.2 13.8 13.5 14.5 13.5 M 17.5 17.5 L 20.2 20.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- INTEGRATIONS / API ---

  "integration-hub": {
    // Was 13 paths! Now 3: center hub, radial lines (combined), outer tips
    paths: [
      "M 12.1 10.2 C 13.5 10.2 14.5 11.2 14.5 12.5 C 14.5 13.8 13.5 14.8 12.1 14.8 C 10.8 14.8 9.8 13.8 9.8 12.5 C 9.8 11.2 10.8 10.2 12.1 10.2",
      "M 12.1 2.5 L 12.2 10.2 M 12.1 14.8 L 12.2 21.5 M 2.5 12.5 L 9.8 12.5 M 14.5 12.5 L 21.5 12.5",
      "M 6.5 4.5 L 10.5 10.5 M 17.5 4.5 L 14.2 10.5 M 6.5 20.2 L 10.5 14.8 M 17.5 20.2 L 14.2 14.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "webhook": {
    // Was 6 paths. Now 4: three nodes (combined), connecting lines
    paths: [
      "M 12.1 3.2 C 13.5 3.2 14.5 4.2 14.5 5.5 C 14.5 6.8 13.5 7.8 12.1 7.8 C 10.8 7.8 9.8 6.8 9.8 5.5 C 9.8 4.2 10.8 3.2 12.1 3.2",
      "M 4.1 13.2 C 5.5 13.2 6.5 14.2 6.5 15.5 C 6.5 16.8 5.5 17.8 4.1 17.8 C 2.8 17.8 1.8 16.8 1.8 15.5 C 1.8 14.2 2.8 13.2 4.1 13.2 M 19.8 13.2 C 21.2 13.2 22.2 14.2 22.2 15.5 C 22.2 16.8 21.2 17.8 19.8 17.8 C 18.5 17.8 17.5 16.8 17.5 15.5 C 17.5 14.2 18.5 13.2 19.8 13.2",
      "M 12.1 7.8 L 12.2 11.5 L 5.8 15.2",
      "M 12.2 11.5 L 18.2 15.2 M 6.5 16.5 L 17.5 16.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "graphql": {
    // Was 11 paths! Now 3: hexagon outline, inner triangle, vertex dots combined
    paths: [
      "M 12.1 2.5 L 20.5 7.5 L 20.2 17.5 L 12.1 21.5 L 3.8 17.5 L 3.5 7.5 Z",
      "M 12.1 6.8 L 16.5 13.5 L 7.5 13.5 Z M 12.1 13.5 L 12.2 21.5 M 7.5 13.5 L 3.5 7.5 M 16.5 13.5 L 20.5 7.5",
      "M 12.1 2.5 C 12.8 2.2 13.2 3.2 12.1 3.5 C 11.2 3.2 11.5 2.2 12.1 2.5 M 20.5 7.5 C 21.2 7.2 21.5 8.2 20.5 8.5 C 19.8 8.2 19.8 7.2 20.5 7.5 M 20.2 17.5 C 20.8 17.2 21.2 18.2 20.2 18.5 C 19.5 18.2 19.5 17.2 20.2 17.5 M 12.1 21.5 C 12.8 21.2 13.2 22.2 12.1 22.5 C 11.2 22.2 11.5 21.2 12.1 21.5 M 3.8 17.5 C 4.5 17.2 4.8 18.2 3.8 18.5 C 3.1 18.2 3.1 17.2 3.8 17.5 M 3.5 7.5 C 4.2 7.2 4.5 8.2 3.5 8.5 C 2.8 8.2 2.8 7.2 3.5 7.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "edge-computing": {
    // Was 12 paths! Now 4: cloud, server box, connection line, edge nodes
    paths: [
      "M 8.5 5.5 C 7.2 4.8 5.5 5.5 5.2 7.2 C 3.8 7.5 3.2 8.8 3.8 10.2 C 4.2 11.5 5.8 12.2 7.5 11.8 L 16.5 11.8 C 18.2 12.2 19.8 11.2 20.2 9.8 C 20.5 8.5 19.5 7.2 18.2 7.2 C 18.2 5.5 16.5 4.5 15.2 5.2 C 14.2 4.2 12.5 3.8 11.2 4.5 C 10.2 4.2 9.2 4.8 8.5 5.5",
      "M 7.5 15.5 L 16.5 15.5 L 16.2 21.5 L 7.8 21.5 Z",
      "M 12.1 11.8 L 12.2 15.5",
      "M 9.2 17.5 L 14.8 17.5 M 9.2 19.5 L 12.5 19.5 M 14.5 19.5 L 15.2 19.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- ELDERLY CARE ---

  "elderly-care": {
    // Was 10 paths. Now 5: head, body+cane, heart, arm, legs
    paths: [
      "M 14.5 5.5 C 15.8 5.2 16.8 6.2 16.5 7.5 C 16.2 8.5 14.8 8.8 14.2 7.8 C 13.8 6.8 13.8 5.8 14.5 5.5",
      "M 14.2 8.5 C 12.5 10.2 11.8 12.5 11.5 15.2 L 11.2 21.5 M 12.2 15.8 L 12.8 21.5",
      "M 13.5 10.2 C 11.5 10.8 9.5 11.2 7.2 11.5 L 4.5 11.5",
      "M 4.5 11.5 L 4.2 21.5 M 8.2 11.5 L 8.5 21.5 M 4.2 16.5 L 8.5 16.5",
      "M 6.2 4.2 C 5.5 3.5 4.5 4.2 5.2 5.2 C 5.8 6.2 7.5 7.5 8.5 6.2 C 9.2 5.2 8.5 3.8 7.8 4.5 C 7.2 4.8 6.8 4.8 6.2 4.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "wheelchair-alt": {
    // Was 14 paths!! Now 5: wheel, person head, body in chair, seat, footrest
    paths: [
      "M 10.5 14.5 C 7.8 14.5 5.8 16.5 5.8 18.8 C 5.8 21.2 7.8 23.2 10.5 23.2 C 13.2 23.2 15.2 21.2 15.2 18.8 C 15.2 16.5 13.2 14.5 10.5 14.5",
      "M 12.5 4.5 C 13.5 4.5 14.2 5.5 14.2 6.5 C 14.2 7.5 13.5 8.5 12.5 8.5 C 11.5 8.5 10.8 7.5 10.8 6.5 C 10.8 5.5 11.5 4.5 12.5 4.5",
      "M 12.5 8.5 L 12.2 14.5 L 17.5 14.5 L 19.5 19.5 L 21.5 19.5",
      "M 10.5 10.5 L 17.2 10.5",
      "M 12.5 14.5 L 8.5 14.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "walker": {
    // Was 7 paths. Now 4: frame top+legs combined, crossbar, wheels
    paths: [
      "M 7.2 2.5 L 16.8 2.5",
      "M 7.2 2.5 L 7.2 17.2 M 16.8 2.5 L 16.8 17.2",
      "M 7.2 9.2 L 16.8 9.2 M 7.2 13.5 L 16.8 13.5",
      "M 7.2 17.2 C 6.2 17.2 5.2 18.2 5.2 19.2 C 5.2 20.2 6.2 20.8 7.2 20.5 M 16.8 17.2 C 17.8 17.2 18.8 18.2 18.8 19.2 C 18.8 20.2 17.8 20.8 16.8 20.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "hearing-aid": {
    // Was 7 paths. Now 4: ear canal+device, sound waves, hook, earpiece
    paths: [
      "M 10.5 6.2 C 10.5 4.5 11.5 3.2 13.2 3.2 M 10.5 6.2 C 6.8 6.2 6.2 10.5 6.5 13.5 C 6.8 16.5 8.2 18.2 8.2 18.2",
      "M 6.2 18.2 C 5.2 18.2 4.2 19.2 4.2 20.2 C 4.2 21.2 5.2 21.8 6.2 21.5 C 7.5 21.2 8.2 19.8 7.5 18.5",
      "M 13.8 7.8 C 14.8 8.8 14.8 10.5 13.8 11.5 M 16.2 5.5 C 18.2 7.5 18.2 11.2 16.2 13.2",
      "M 18.2 4.2 L 19.2 2.5 M 19.5 8.5 L 21.5 8.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- TECH ICONS ---

  "stitch": {
    // Was 7 paths. Now 3: wound line, stitches combined, needle+thread
    paths: [
      "M 3.2 15.5 C 9.5 14.8 14.5 15.8 20.8 15.5",
      "M 5.2 15.8 C 5.5 14.2 7.2 14.2 7.5 15.8 M 9.5 15.8 C 9.8 14.2 11.5 14.2 11.8 15.8 M 13.8 15.8 C 14.1 14.2 15.8 14.2 16.1 15.8",
      "M 16.1 15.8 C 17.2 18.2 19.5 17.2 18.8 14.8 C 18.2 12.2 15.5 11.2 16.2 8.2 C 16.8 6.2 18.5 4.8 19.5 4.5 L 21.2 2.5 M 14.5 9.5 L 21.2 2.5"
    ],
    stroke: true,
    category: "technology"
  },

  "foundation-model": {
    // Was 13 paths! Now 4: brain/head, face features, platform base, antenna rays
    paths: [
      "M 12.1 4.5 C 8.8 4.5 6.8 6.8 6.8 9.5 C 6.8 12.2 9.2 13.8 12.1 13.8 C 15.2 13.8 17.2 12.2 17.2 9.5 C 17.2 6.8 15.2 4.5 12.1 4.5",
      "M 9.2 8.5 L 9.5 8.8 M 14.8 8.5 L 15.1 8.8 M 9.5 10.8 C 10.8 11.8 13.2 11.8 14.5 10.8",
      "M 12.1 13.8 L 12.2 15.8 M 3.5 15.8 L 20.5 15.8 L 20.8 18.5 L 3.2 18.5 Z",
      "M 7.8 5.2 L 5.5 2.8 M 16.2 5.2 L 18.5 2.8 M 7.5 12.2 L 4.5 13.8 M 16.5 12.2 L 19.5 13.8"
    ],
    stroke: true,
    category: "technology"
  },

  "rocking-chair": {
    // Was 8 paths. Now 4: rockers, chair back+seat, armrests, legs
    paths: [
      "M 2.5 20.5 C 7.5 19.8 16.5 19.8 21.5 20.5",
      "M 10.2 10.2 C 10.2 8.5 10.8 6.5 11.8 5.2 C 12.5 4.5 13.5 4.5 14.2 5.5 M 10.2 10.2 C 8.8 10.2 7.5 10.5 6.5 10.8",
      "M 6.5 10.8 L 8.2 16.2 L 15.8 16.2 L 17.5 10.8",
      "M 3.5 20.2 C 6.2 17.2 7.8 13.5 8.5 10.2 M 20.5 20.2 C 17.8 17.2 16.2 13.5 15.5 10.2"
    ],
    stroke: true,
    category: "elderlycare"
  },

  "toolkit": {
    // Was 8 paths. Now 4: box body, lid, handle, tools inside
    paths: [
      "M 3.5 12.2 L 20.5 12.2 L 20.2 21.5 L 3.8 21.5 Z",
      "M 3.5 12.2 L 5.5 5.2 C 9.5 4.8 14.5 4.8 18.5 5.2 L 20.5 12.2",
      "M 10.5 12.2 L 10.8 14.5 L 13.2 14.5 L 13.5 12.2",
      "M 7.5 12.2 L 7.2 7.5 C 7.2 5.8 9.2 5.5 9.2 7.5 M 14.5 12.2 L 15.5 8.2 C 15.2 6.5 17.2 6.2 16.8 8.5"
    ],
    stroke: true,
    category: "technology"
  },

  "github": {
    // Was 12 paths! Now 4: body circle, ears/tentacles, eyes+mouth, tail
    paths: [
      "M 12.1 2.5 C 6.8 2.5 2.5 6.5 2.5 11.5 C 2.5 15.5 5.2 18.8 8.8 20.2 C 9.2 20.5 9.8 20.2 9.8 19.5 L 9.8 18.2 C 7.2 18.8 6.5 17.2 6.5 17.2 C 6.2 16.2 5.5 15.8 5.5 15.8 C 4.5 15.2 5.5 15.2 5.5 15.2 C 6.5 15.5 7.2 16.5 7.2 16.5 C 8.2 17.8 9.5 17.5 10.2 17.2 C 10.2 16.5 10.5 15.8 11.2 15.5 C 8.5 15.2 5.8 14.2 5.8 10.5 C 5.8 9.2 6.2 8.2 7.2 7.5 C 7.2 7.5 6.5 5.8 7.2 4.5 C 7.2 4.5 8.2 4.2 10.2 5.5 C 10.8 5.2 12.2 5.2 13.8 5.5 C 15.8 4.2 16.8 4.5 16.8 4.5 C 17.5 5.8 16.8 7.5 16.8 7.5 C 17.8 8.2 18.2 9.2 18.2 10.5 C 18.2 14.2 15.5 15.2 12.8 15.5 C 13.5 15.8 13.8 16.8 13.8 17.8 L 13.8 19.5 C 13.8 20.2 14.5 20.5 14.8 20.2 C 18.5 18.8 21.5 15.5 21.5 11.5 C 21.5 6.5 17.2 2.5 12.1 2.5",
      "M 9.5 8.5 C 9.8 8.2 10.5 8.2 10.5 8.8 C 10.2 9.2 9.5 9.2 9.5 8.5 M 13.5 8.5 C 13.8 8.2 14.5 8.2 14.5 8.8 C 14.2 9.2 13.5 9.2 13.5 8.5",
      "M 10.2 11.2 C 10.8 11.8 13.2 11.8 13.8 11.2"
    ],
    stroke: true,
    category: "technology"
  },

  "copilot": {
    // Was 12 paths! Now 4: pilot head+body, code window, code lines, helmet visor
    paths: [
      "M 4.2 5.5 C 4.5 3.8 5.8 3.2 7.2 4.2 C 7.5 6.2 6.8 7.8 5.5 8.2 C 4.2 8.5 3.8 7.2 4.2 5.5",
      "M 5.5 8.5 C 4.8 10.8 4.2 13.2 3.5 15.5 C 3.2 17.5 3.5 19.2 4.5 21.2 M 5.5 8.5 C 6.5 10.8 7.5 13.2 6.5 15.5 C 6.2 17.5 5.8 19.2 5.5 21.5 M 4.2 12.5 L 7.5 12.5",
      "M 13.5 4.8 C 11.8 4.5 11.2 5.5 11.5 6.8 L 13.2 11.2 L 20.2 11.2 L 21.5 6.8 C 21.8 5.5 21.2 4.5 20.5 4.8",
      "M 13.2 11.2 L 13.8 15.2 C 14.5 15.8 19.2 15.8 19.8 15.2 L 20.2 11.2 M 15.5 13.5 L 15.8 15.2 M 17.5 13.2 L 17.8 15.5"
    ],
    stroke: true,
    category: "technology"
  },

  "dna": {
    // Was 5 paths. Already clean! Minor doodle refinement.
    paths: [
      "M 8.2 2.5 C 10.2 3.8 12.5 5.5 12.8 7.5 C 13.2 9.5 11.8 11.2 10.5 12.8 C 9.2 14.5 8.2 16.2 8.5 18.2 C 8.8 20.2 10.5 21.2 12.2 21.8",
      "M 15.8 2.5 C 13.8 3.8 11.5 5.5 11.2 7.5 C 10.8 9.5 12.2 11.2 13.5 12.8 C 14.8 14.5 15.8 16.2 15.5 18.2 C 15.2 20.2 13.5 21.2 11.8 21.8",
      "M 7.5 7.2 L 16.5 7.2 M 8.2 12.5 L 15.8 12.5 M 7.5 17.5 L 16.5 17.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "onboarding": {
    // Was 5 paths. Now 4: head, body arc, welcome arrow, entry arrow
    paths: [
      "M 12.1 4.5 C 14.2 4.5 15.8 6.2 15.8 8.2 C 15.8 10.2 14.2 11.8 12.1 11.8 C 10.2 11.8 8.5 10.2 8.5 8.2 C 8.5 6.2 10.2 4.5 12.1 4.5",
      "M 5.5 21.5 L 5.5 19.5 C 5.5 16.5 8.2 14.5 12.1 14.5 C 16.2 14.5 18.5 16.5 18.5 19.5 L 18.5 21.5",
      "M 18.5 7.5 L 22.5 7.5 M 20.5 5.5 L 22.5 7.5 L 20.5 9.5",
      "M 2.2 2.5 L 4.2 4.5 L 2.2 6.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "uptime": {
    // Was 6 paths. Now 3: circle, clock hands, antenna marks
    paths: [
      "M 12.1 2.5 C 17.5 2.5 21.5 6.5 21.5 12.1 C 21.5 17.5 17.5 21.5 12.1 21.5 C 6.8 21.5 2.5 17.5 2.5 12.1 C 2.5 6.5 6.8 2.5 12.1 2.5",
      "M 12.1 6.5 L 12.2 12.1 L 16.2 16.2",
      "M 5.8 4.2 L 3.8 2.5 M 18.2 4.2 L 20.2 2.5 M 2.5 12.1 L 4.5 12.1 M 19.5 12.1 L 21.5 12.1"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- METRICS / SATISFACTION ---

  "nps-score": {
    // Was 9 paths. Now 4: gauge arc, needle, dots combined, tick marks
    paths: [
      "M 3.5 14.5 C 3.5 9.2 7.2 5.2 12.1 5.2 C 17.2 5.2 20.5 9.2 20.5 14.5",
      "M 3.5 14.5 L 20.5 14.5",
      "M 12.1 14.5 L 15.2 7.5",
      "M 6.2 14.5 C 6.5 14.2 7.2 14.5 7.2 15.2 C 6.8 15.5 6.2 15.2 6.2 14.5 M 12.1 14.5 C 12.5 14.2 13.2 14.5 13.2 15.2 C 12.8 15.5 12.2 15.2 12.1 14.5 M 18.2 14.5 C 18.5 14.2 19.2 14.5 19.2 15.2 C 18.8 15.5 18.2 15.2 18.2 14.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "patient-satisfaction": {
    // Was 11 paths! Now 4: clipboard, clip, smiley face, stars combined
    paths: [
      "M 4.5 5.5 L 19.5 5.5 L 19.2 21.5 L 4.8 21.5 Z",
      "M 9.5 3.5 L 14.5 3.5 L 14.2 6.2 L 9.8 6.2 Z",
      "M 12.1 8.5 C 9.5 8.5 7.8 10.2 7.8 12.5 C 7.8 14.8 9.5 16.5 12.1 16.5 C 14.8 16.5 16.5 14.8 16.5 12.5 C 16.5 10.2 14.8 8.5 12.1 8.5 M 10.2 11.5 L 10.5 11.8 M 13.8 11.5 L 14.1 11.8 M 10.2 13.5 C 10.8 14.5 13.2 14.5 13.8 13.5",
      "M 8.5 18.5 L 8.8 19.2 L 9.5 18.8 L 9.2 19.5 L 8.5 18.5 M 12.1 18.2 L 12.5 18.8 L 13.2 18.5 L 12.8 19.2 L 12.1 18.2 M 15.8 18.5 L 16.1 19.2 L 16.8 18.8 L 16.5 19.5 L 15.8 18.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "quality-metric": {
    // Was 12 paths! Now 4: frame, divider, chart area with trend, bar chart
    paths: [
      "M 3.2 3.5 L 20.8 3.5 L 20.5 20.5 L 3.5 20.5 Z",
      "M 3.2 6.8 L 20.8 6.8 M 3.2 14.5 L 20.8 14.5",
      "M 5.5 12.5 L 7.2 10.5 L 8.8 11.2 L 10.5 8.5 M 13.5 9.5 L 13.8 10.2 L 14.5 9.8 L 14.2 10.5 L 13.5 9.5",
      "M 6.5 18.8 L 6.5 15.5 M 9.5 18.8 L 9.5 16.2 M 12.5 18.8 L 12.5 15.5 M 15.5 18.8 L 15.5 17.2 M 18.5 18.8 L 18.5 16.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "capacity-planning": {
    // Was 7 paths. Now 4: axes, bars combined, trend line, arrow
    paths: [
      "M 3.5 3.2 L 3.5 21.2 L 21.5 21.2",
      "M 6.5 17.5 L 6.5 21.2 L 9.2 21.2 L 9.2 17.5 M 10.8 13.5 L 10.8 21.2 L 13.5 21.2 L 13.5 13.5 M 15.2 9.5 L 15.2 21.2 L 17.8 21.2 L 17.8 9.5",
      "M 6.8 14.5 L 11.2 10.5 L 14.8 12.8 L 19.2 7.5",
      "M 16.5 7.5 L 19.2 7.5 L 19.2 10.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  // --- HOSPITAL OPERATIONS ---

  "bed-management": {
    // Was 12 paths! Now 4: bed frame, mattress, pillow, legs/wheels
    paths: [
      "M 3.2 8.5 L 3.2 15.5 L 20.8 15.5 L 20.8 11.5 L 18.5 11.5 L 18.5 15.5",
      "M 3.2 15.5 L 5.5 15.5 L 5.5 14.2 C 5.5 13.2 6.5 12.2 7.8 12.2 C 9.2 12.2 9.8 13.2 9.8 14.2 L 9.8 15.5",
      "M 9.8 12.5 L 17.5 12.5 L 17.5 15.5",
      "M 3.2 15.5 L 3.2 19.5 C 3.2 20.5 4.5 20.5 4.5 19.5 L 4.5 17.5 M 20.8 15.5 L 20.8 19.5 C 20.8 20.5 19.5 20.5 19.5 19.5 L 19.5 17.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "discharge-planning": {
    // Was 8 paths. Now 4: document, text lines, arrow up, door
    paths: [
      "M 4.5 3.2 L 15.5 3.2 L 15.2 21.5 L 4.8 21.5 Z",
      "M 6.8 7.5 L 12.8 7.5 M 6.8 10.5 L 12.8 10.5 M 6.8 13.5 L 10.5 13.5",
      "M 18.5 7.5 L 18.5 14.5 L 21.5 14.5 L 21.2 14.5",
      "M 18.5 7.5 L 16.5 9.8 M 18.5 7.5 L 20.5 9.8"
    ],
    stroke: true,
    category: "healthcare"
  },

  "occupational-therapy": {
    // Was 7 paths. Now 4: head, torso+arms, table/activity, legs
    paths: [
      "M 12.1 2.5 C 13.2 2.5 14.2 3.5 14.2 4.5 C 14.2 5.5 13.2 6.5 12.1 6.5 C 11.2 6.5 10.2 5.5 10.2 4.5 C 10.2 3.5 11.2 2.5 12.1 2.5",
      "M 9.5 7.5 L 14.5 7.5 L 15.5 11.5 L 8.5 11.5 Z",
      "M 8.5 11.5 L 6.8 17.5 L 8.5 17.5 M 15.5 11.5 L 17.2 17.5 L 15.5 17.5 M 10.5 17.5 L 10.2 21.5 L 13.8 21.5 L 14.2 17.5",
      "M 6.5 17.5 L 8.5 17.5 M 15.5 17.5 L 17.5 17.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "physical-therapy": {
    // Was 8 paths. Now 4: head, torso, arms+movement, legs
    paths: [
      "M 14.1 2.5 C 15.2 2.5 16.2 3.5 16.2 4.5 C 16.2 5.5 15.2 6.5 14.1 6.5 C 13.2 6.5 12.2 5.5 12.2 4.5 C 12.2 3.5 13.2 2.5 14.1 2.5",
      "M 14.1 6.5 L 14.2 13.5",
      "M 11.5 8.2 L 17.5 8.2 L 20.5 10.5 M 11.5 8.2 L 8.5 12.5 L 4.5 17.5",
      "M 14.2 13.5 L 11.5 18.5 L 9.2 21.5 M 14.2 13.5 L 17.2 18.5"
    ],
    stroke: true,
    category: "healthcare"
  },

  "speech-therapy": {
    // Was 7 paths. Now 4: head circle, mouth+sound waves, throat/neck, speech marks
    paths: [
      "M 12.1 2.5 C 14.8 2.5 16.8 4.5 16.8 7.2 C 16.8 9.8 14.8 11.8 12.1 11.8 C 9.5 11.8 7.5 9.8 7.5 7.2 C 7.5 4.5 9.5 2.5 12.1 2.5",
      "M 10.2 7.2 L 14.2 7.2 M 9.5 5.5 C 9.5 6.5 9.2 7.5 9.5 8.5 M 14.8 5.5 C 14.8 6.5 15.2 7.5 14.8 8.5",
      "M 5.5 14.5 C 5.5 14.5 6.5 21.5 12.1 21.5 C 17.8 21.5 18.5 14.5 18.5 14.5",
      "M 8.5 16.5 L 15.5 16.5 M 9.5 19.2 L 14.5 19.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "social-worker": {
    // Was 6 paths. Now 4: main person, secondary person, arm arc, checkmark
    paths: [
      "M 8.1 3.5 C 9.5 3.5 10.5 4.5 10.5 5.8 C 10.5 7.2 9.5 8.2 8.1 8.2 C 6.8 8.2 5.8 7.2 5.8 5.8 C 5.8 4.5 6.8 3.5 8.1 3.5 M 3.5 21.5 L 3.5 18.8 C 3.5 16.2 5.5 14.5 8.1 14.5 C 10.8 14.5 12.8 16.2 12.8 18.8 L 12.8 21.5",
      "M 16.1 5.2 C 17.2 5.2 17.8 5.8 17.8 6.8 C 17.8 7.8 17.2 8.5 16.1 8.5 C 15.2 8.5 14.5 7.8 14.5 6.8 C 14.5 5.8 15.2 5.2 16.1 5.2",
      "M 16.1 9.5 C 18.5 9.5 20.5 11.2 20.5 13.5 L 20.5 15.5",
      "M 17.2 19.2 L 19.2 21.2 L 22.2 17.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "emergency-alert": {
    // Was 10 paths! Now 4: triangle, cross, alert dot, radiating lines
    paths: [
      "M 12.1 3.5 L 21.5 19.5 C 21.8 20.5 21.2 21.2 20.2 21.2 L 3.8 21.2 C 2.8 21.2 2.2 20.5 2.5 19.5 Z",
      "M 12.1 8.5 L 12.2 13.5 M 10.8 11.2 L 13.5 11.2",
      "M 12.1 15.5 C 12.5 15.5 12.8 15.8 12.8 16.2 C 12.8 16.5 12.5 16.8 12.1 16.8 C 11.8 16.8 11.5 16.5 11.5 16.2 C 11.5 15.8 11.8 15.5 12.1 15.5",
      "M 9.8 3.8 L 7.5 2.2 M 14.2 3.8 L 16.5 2.2 M 6.5 8.5 L 3.5 8.2 M 17.5 8.5 L 20.5 8.2"
    ],
    stroke: true,
    category: "healthcare"
  },

  "fall-detection": {
    // Was 6 paths. Now 4: head, falling body, ground line, alert signals
    paths: [
      "M 10.1 2.5 C 11.2 2.5 12.2 3.5 12.2 4.5 C 12.2 5.5 11.2 6.5 10.1 6.5 C 9.2 6.5 8.2 5.5 8.2 4.5 C 8.2 3.5 9.2 2.5 10.1 2.5",
      "M 14.2 8.5 L 10.5 11.5 L 7.5 9.5 L 3.5 14.5 M 10.5 11.5 L 12.5 17.5 L 8.5 21.5 M 10.5 11.5 L 15.5 13.5",
      "M 19.2 2.5 L 21.2 4.5 L 19.2 6.5",
      "M 19.2 8.5 L 21.2 10.5 L 19.2 12.5"
    ],
    stroke: true,
    category: "healthcare"
  }
};

// Merge refined icons into raw data
let updated = 0;
for (const [name, data] of Object.entries(refined)) {
  if (!raw[name]) {
    console.warn(`WARNING: Icon "${name}" not found in icon-data-raw.json — skipping`);
    continue;
  }
  const oldCount = raw[name].paths.length + (raw[name].circles?.length || 0) + (raw[name].lines?.length || 0);
  const newCount = data.paths.length;

  raw[name].paths = data.paths;
  raw[name].stroke = data.stroke || false;
  // Remove circles/lines if they existed — refined versions use paths only
  delete raw[name].circles;
  delete raw[name].lines;
  if (!data.stroke) delete raw[name].stroke;

  console.log(`  ${name}: ${oldCount} → ${newCount} elements`);
  updated++;
}

writeFileSync(dataPath, JSON.stringify(raw, null, 2));
console.log(`\nRefined ${updated} icons in icon-data-raw.json`);
