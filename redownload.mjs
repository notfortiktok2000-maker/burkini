import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import https from 'https';

const downloads = [
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/H9BLSKF5TbOh2wM3JpsM/image.png", name: "alma-blue-main.png", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/Kj4XIPc97jpCae0yUeMl/image.png", name: "alma-blue-lifestyle.png", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/QZWZ5yhg8rjixWIXZZet/image.png", name: "alma-burgundy-main.png", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/rc1Q1IZY4SBowr6ocCZb/image.png", name: "alma-burgundy-lifestyle.png", folder: "products/ensemble-alma" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/ePsavpltndMrdjNKryk6/image.jpg", name: "maya-black-main.jpg", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/JLO8BYu1blkez0ynj9Jx/image.jpg", name: "maya-white-main.jpg", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/Y6btY5rMecZBGoQzSbyG/image.jpg", name: "maya-white-detail.jpg", folder: "products/sandales-maya" },
  { url: "https://plain-weur-prod-public.komododecks.com/202608/01/N4PxHygQ34KnQWCDCvcJ/image.jpg", name: "maya-cognac-main.jpg", folder: "products/sandales-maya" }
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
    
    const p = path.join(dir, item.name);
    console.log(`Downloading ${item.name}...`);
    await download(item.url, p);
    
    const ext = path.extname(item.name);
    const webpPath = p.replace(ext, '.webp');
    console.log(`Converting ${item.name} to webp...`);
    await sharp(p).webp({ quality: 85 }).toFile(webpPath);
  }
}

run().catch(console.error);
