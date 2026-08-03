import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import https from 'https';

const downloads = [
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/H9BLSKF5TbOh2wM3JpsM/image.png", base: "alma-blue-main", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/Kj4XIPc97jpCae0yUeMl/image.png", base: "alma-blue-lifestyle", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/QZWZ5yhg8rjixWIXZZet/image.png", base: "alma-burgundy-main", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/rc1Q1IZY4SBowr6ocCZb/image.png", base: "alma-burgundy-lifestyle", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/ePsavpltndMrdjNKryk6/image.jpg", base: "maya-black-main", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/JLO8BYu1blkez0ynj9Jx/image.jpg", base: "maya-white-main", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/Y6btY5rMecZBGoQzSbyG/image.jpg", base: "maya-white-detail", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/N4PxHygQ34KnQWCDCvcJ/image.jpg", base: "maya-cognac-main", folder: "products/sandales-maya" }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of downloads) {
    const dir = path.join('public/images', item.folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const tempPath = path.join(dir, item.base + '.tmp');
    console.log(`Downloading ${item.base}...`);
    await download(item.url, tempPath);
    
    const jpgPath = path.join(dir, item.base + '.jpg');
    console.log(`Converting ${item.base} to high-quality JPEG...`);
    await sharp(tempPath).jpeg({ quality: 90, force: true }).toFile(jpgPath);
    
    fs.unlinkSync(tempPath);
    
    // Clean up old png and webp if they exist
    const oldPng = path.join(dir, item.base + '.png');
    if (fs.existsSync(oldPng)) fs.unlinkSync(oldPng);
    const oldWebp = path.join(dir, item.base + '.webp');
    if (fs.existsSync(oldWebp)) fs.unlinkSync(oldWebp);
  }
}

run().catch(console.error);
