import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = process.env.FIGMA_TOKEN || process.argv[2];
if (!token) {
  console.error('FIGMA_TOKEN not provided. Set env FIGMA_TOKEN or pass as first arg.');
  process.exit(1);
}

const fileKey = 'ONXKayps2ZmZ5v2Aiq9Whp';
const outDir = path.resolve(__dirname, '../src/assets');
fs.mkdirSync(outDir, { recursive: true });

// Nodes to export (from design): logo, sidebar icons, finance icon, some avatars
const vectorNodeIds = [
  '1:332',      // logo / long
  '121:1259',   // pie chart icon
  '113:489',    // stethoscope
  '113:460',    // doctor
  '113:462',    // nurse
  '113:445',    // disabled
  '107:94',     // credit card
  '107:138',    // question circled
  '127:123'     // bank $
];

// Avatars are raster; export as PNG
const rasterNodeIds = [
  '97:400', '97:440' // sample woman 01, man 01
];

async function figmaImages(ids, format) {
  const search = new URLSearchParams({ ids: ids.join(','), format });
  const url = `https://api.figma.com/v1/images/${fileKey}?${search.toString()}`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) throw new Error(`Figma API error: ${res.status}`);
  const data = await res.json();
  return data.images || {};
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

function safeName(id, ext) {
  return id.replace(/[:\\/]/g, '_') + '.' + ext;
}

(async () => {
  try {
    if (vectorNodeIds.length) {
      const images = await figmaImages(vectorNodeIds, 'svg');
      for (const [id, url] of Object.entries(images)) {
        if (!url) continue;
        const dest = path.join(outDir, safeName(id, 'svg'));
        await download(url, dest);
        console.log('Saved', dest);
      }
    }

    if (rasterNodeIds.length) {
      const images = await figmaImages(rasterNodeIds, 'png');
      for (const [id, url] of Object.entries(images)) {
        if (!url) continue;
        const dest = path.join(outDir, safeName(id, 'png'));
        await download(url, dest);
        console.log('Saved', dest);
      }
    }

    console.log('Figma assets fetched into', outDir);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
