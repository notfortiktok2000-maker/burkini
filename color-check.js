const https = require('https');
const fs = require('fs');
const urls = [
  "https://i.ibb.co/1f55RJL1/Chat-GPT-Image-Jul-31-2026-01-01-10-AM-1.png",
  "https://i.ibb.co/v633prWn/Chat-GPT-Image-Jul-31-2026-01-01-10-AM-2.png",
  "https://i.ibb.co/wrx2Kv01/Chat-GPT-Image-Jul-31-2026-12-36-06-AM.png",
  "https://i.ibb.co/q3W4L7Yx/Chat-GPT-Image-Jul-31-2026-12-35-54-AM-1.png"
];

urls.forEach((url, i) => {
  https.get(url, (res) => {
    let size = 0;
    res.on('data', d => size += d.length);
    res.on('end', () => console.log(url, size));
  });
});
