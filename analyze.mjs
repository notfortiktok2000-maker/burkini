import sharp from 'sharp';

async function analyze(file) {
  const { data, info } = await sharp(file)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let blueCount = 0;
  let burgundyCount = 0;
  
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Detect blue (b > r + 30 and b > g + 30)
    if (b > r + 30 && b > g + 30) {
      blueCount++;
    }
    
    // Detect burgundy (r > b + 40 and r > g + 40 and r < 180)
    if (r > b + 40 && r > g + 40 && r < 180) {
      burgundyCount++;
    }
  }

  console.log(`${file}: Blue pixels=${blueCount}, Burgundy pixels=${burgundyCount}`);
}

async function run() {
  await analyze('img1.png');
  await analyze('img2.png');
  await analyze('img3.png');
  await analyze('img4.png');
}
run();
