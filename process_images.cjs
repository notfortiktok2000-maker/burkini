const fs = require('fs');
const https = require('https');
const sharp = require('sharp');
const path = require('path');

const images = [
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/H9BLSKF5TbOh2wM3JpsM/image.png", name: "alma-blue-main" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/Kj4XIPc97jpCae0yUeMl/image.png", name: "alma-blue-lifestyle" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/QZWZ5yhg8rjixWIXZZet/image.png", name: "alma-burgundy-main" },
  { url: "https://plain-weur-prod-public.komododecks.com/202607/31/rc1Q1IZY4SBowr6ocCZb/image.png", name: "alma-burgundy-lifestyle" }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function processImages() {
  for (const img of images) {
    const pngPath = path.join(__dirname, 'public/images', `${img.name}.png`);
    const webpPath = path.join(__dirname, 'public/images', `${img.name}.webp`);
    
    console.log(`Downloading ${img.name}...`);
    await download(img.url, pngPath);
    
    console.log(`Converting ${img.name} to webp...`);
    await sharp(pngPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
  }
  console.log('Done!');
}

processImages().catch(console.error);
