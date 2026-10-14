import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Entrega PNGs compatíveis com WhatsApp e Twitter, sem depender de SVG no robô.
const versions = [
  { svg: 'og-preview.svg', png: 'og-preview.png', width: 1200, height: 630 },
  { svg: 'og-whatsapp.svg', png: 'og-whatsapp.png', width: 1200, height: 1200 },
];
await Promise.all(versions.map(async ({ svg, png, width, height }) => {
  const input = await readFile(resolve('public', svg));
  await sharp(input, { density: 96 })
    .resize(width, height, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(resolve('public', png));
  console.log('OG image generated:', png);
}));
