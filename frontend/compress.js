import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function processDirectory(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      const stats = await fs.stat(fullPath);
      
      // If image is larger than 500KB
      if (stats.size > 500 * 1024) {
        console.log(`Compressing ${entry.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        const tempPath = fullPath + '.tmp';
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          let pipeline = image;

          // Resize if width is larger than 1920px
          if (metadata.width && metadata.width > 1920) {
            pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }

          if (/\.png$/i.test(entry.name)) {
            // Aggressive PNG compression with palette reduction
            pipeline = pipeline.png({ quality: 60, compressionLevel: 9, palette: true });
          } else {
            // Aggressive JPEG compression
            pipeline = pipeline.jpeg({ quality: 60, mozjpeg: true });
          }

          await pipeline.toFile(tempPath);
          
          // Replace original file with compressed one
          await fs.unlink(fullPath);
          await fs.rename(tempPath, fullPath);
          
          const newStats = await fs.stat(fullPath);
          console.log(` -> Done: ${(newStats.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (e) {
          console.error(`Failed to process ${entry.name}:`, e.message);
        }
      }
    }
  }
}

console.log('Starting massive image compression...');
processDirectory(PUBLIC_DIR)
  .then(() => console.log('Compression complete! Your website will now scroll flawlessly.'))
  .catch(console.error);
