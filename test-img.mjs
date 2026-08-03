import fs from 'fs';
import https from 'https';

const urls = {
  img1: "https://i.ibb.co/1f55RJL1/Chat-GPT-Image-Jul-31-2026-01-01-10-AM-1.png",
  img2: "https://i.ibb.co/v633prWn/Chat-GPT-Image-Jul-31-2026-01-01-10-AM-2.png",
  img3: "https://i.ibb.co/wrx2Kv01/Chat-GPT-Image-Jul-31-2026-12-36-06-AM.png",
  img4: "https://i.ibb.co/q3W4L7Yx/Chat-GPT-Image-Jul-31-2026-12-35-54-AM-1.png"
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function dl() {
  for (const [key, url] of Object.entries(urls)) {
    await download(url, key + '.png');
    console.log('Downloaded', key);
  }
}
dl();
