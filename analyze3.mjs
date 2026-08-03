import sharp from 'sharp';

async function colorAt(file, x, y) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const i = (y * info.width + x) * 3;
  return [data[i], data[i+1], data[i+2]];
}

async function run() {
  for (let file of ['img1.png', 'img2.png', 'img3.png', 'img4.png']) {
    const c1 = await colorAt(file, 10, 10); // top left
    const c2 = await colorAt(file, 10, 500); // middle left
    console.log(`${file}: top-left=${c1}, mid-left=${c2}`);
  }
}
run();
