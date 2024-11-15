const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const baseName = image.split('.').slice(0, -1).join('.');
  console.log(`Processing ${image}...`);

  // Generate JPG format
  [1200, 800, 480].forEach((size) => {
    sharp(`${target}/${image}`)
      .resize(size)
      .toFile(
        path.resolve(__dirname, `${destination}/${baseName}-${size}.jpg`),
        (err) => {
          if (err) console.error(`Error processing ${image}:`, err);
          else console.log(`${baseName}-${size}.jpg created successfully`);
        }
      );

    // Generate WebP format
    sharp(`${target}/${image}`)
      .resize(size)
      .toFormat('webp')
      .toFile(
        path.resolve(__dirname, `${destination}/${baseName}-${size}.webp`),
        (err) => {
          if (err) console.error(`Error processing ${image} to WebP:`, err);
          else console.log(`${baseName}-${size}.webp created successfully`);
        }
      );
  });
});
