import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const manifestPath = path.join(rootDir, 'src', 'data', 'imageManifest.ts');
let manifestContent = fs.readFileSync(manifestPath, 'utf8');

const urls = [];
const regex = /:\s*["']([^"']+)["']/g;
let match;
while ((match = regex.exec(manifestContent)) !== null) {
  if (match[1].startsWith('/')) {
    urls.push(match[1]);
  }
}

async function validate() {
  let hasError = false;
  
  if (urls.length === 0) {
    console.error("No URLs found in manifest.");
    process.exit(1);
  }

  const seenUrls = new Set();

  for (const url of urls) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.error(`ERROR: External URL found in manifest: ${url}`);
      hasError = true;
      continue;
    }

    seenUrls.add(url);
    const localPath = path.join(rootDir, 'public', url);
    
    if (!fs.existsSync(localPath)) {
      console.error(`ERROR: File does not exist: ${url}`);
      hasError = true;
      continue;
    }
    
    const stats = fs.statSync(localPath);
    if (stats.size === 0) {
      console.error(`ERROR: File is zero bytes: ${url}`);
      hasError = true;
      continue;
    }
    
    try {
      const meta = await sharp(localPath).metadata();
      if (!meta.width || !meta.height) {
        console.error(`ERROR: Invalid dimensions for: ${url}`);
        hasError = true;
      }
    } catch (e) {
      console.error(`ERROR: File is not decodable: ${url}`, e.message);
      hasError = true;
    }
  }

  const productsPath = path.join(rootDir, 'src', 'data', 'products.ts');
  const productsContent = fs.readFileSync(productsPath, 'utf8');
  if (productsContent.includes('images: []')) {
     console.error('ERROR: Empty images array found in products.ts');
     hasError = true;
  }

  if (hasError) {
    console.error("Image validation failed.");
    process.exit(1);
  } else {
    console.log("Image validation passed successfully.");
  }
}

validate().catch(e => {
  console.error("Validation script error:", e);
  process.exit(1);
});
