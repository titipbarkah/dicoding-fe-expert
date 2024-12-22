const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'src/public/images/resize');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach((image) => {
    // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-large.jpg`),
      );

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -medium.jpg
    sharp(`${target}/${image}`)
      .resize(640)
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-medium.jpg`),
      );

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-small.jpg`),
      );
  });
