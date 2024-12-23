const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/public/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, {recursive: true});
}

fs.readdirSync(target)
  .forEach((image) => {
    // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(800)
      .webp({quality: 75})
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-large.webp`),
      );

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -medium.jpg
    sharp(`${target}/${image}`)
      .resize(640)
      .webp({quality: 75})
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-medium.webp`),
      );

    // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
    sharp(`${target}/${image}`)
      .resize(480)
      .webp({quality: 75})
      .toFile(path.resolve(
        destination,
        `${path.parse(image).name}-small.webp`),
      );
  });
