import sharp from 'sharp';

async function checkWavy(file) {
  const { data, info } = await sharp(file)
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  let edgeGreyCount = 0;
  
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (x < 50 || x > info.width - 50) {
        const i = (y * info.width + x) * 3;
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        // Check if greyish (r, g, b are close)
        if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 100 && r < 200) {
           edgeGreyCount++;
        }
      }
    }
  }
  console.log(`${file}: Edge grey pixels = ${edgeGreyCount}`);
}

async function run() {
  await checkWavy('img1.png');
  await checkWavy('img2.png');
  await checkWavy('img3.png');
  await checkWavy('img4.png');
}
run();
