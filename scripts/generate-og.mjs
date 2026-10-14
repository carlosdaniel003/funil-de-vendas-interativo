import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Gera um PNG real: robôs de WhatsApp/Facebook não precisam suportar SVG nem JS.
const input = resolve('public', 'og-preview.svg');
const output = resolve('public', 'og-preview.png');
const svg = await readFile(input);
await sharp(svg, { density: 96 })
  .resize(1200, 630, { fit: 'fill' })
  .png({ compressionLevel: 9, palette: true })
  .toFile(output);
console.log('OG image generated:', output);
