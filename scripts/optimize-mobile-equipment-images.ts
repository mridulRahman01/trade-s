import fs from "fs";
import path from "path";
import sharp from "sharp";

const equipmentDirs = [
  "concrete-mixture-machine",
  "vibrator-machine",
  "rod-cutter-and-rod-bender-machine",
  "roller-and-dump-trucks",
  "helmets-and-safety-belts",
  "importer-of-cutting-disks",
  "cutting-blades",
  "hardware-tools-from-china",
];

const baseDir = path.join(process.cwd(), "public/images/equipment");

async function optimizeImages() {
  console.log("Optimizing images for mobile delivery...");

  for (const slug of equipmentDirs) {
    const dir = path.join(baseDir, slug);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    console.log(`Processing ${slug}...`);

    for (const file of files) {
      if (!file.endsWith(".webp") || file.includes("-card")) continue;

      const filePath = path.join(dir, file);
      const buffer = fs.readFileSync(filePath);

      // 1. Optimize the main/detail image itself in place
      const is3x2 = file.includes("detail") || file.includes("truck");
      const targetWidth = 1280;
      const targetHeight = is3x2 ? 853 : 960;

      const optimized = await sharp(buffer)
        .resize(targetWidth, targetHeight, { fit: "cover", position: "centre" })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      fs.writeFileSync(filePath, optimized);
      console.log(`  Updated ${file}: ${(buffer.length / 1024).toFixed(1)}KB -> ${(optimized.length / 1024).toFixed(1)}KB`);

      // 2. If it is the main image, generate a dedicated 640x480 -card.webp
      if (file.includes("-main")) {
        const cardPath = path.join(dir, `${slug}-card.webp`);
        const cardOptimized = await sharp(buffer)
          .resize(640, 480, { fit: "cover", position: "centre" })
          .webp({ quality: 78, effort: 6 })
          .toBuffer();

        fs.writeFileSync(cardPath, cardOptimized);
        console.log(`  Created ${slug}-card.webp: ${(cardOptimized.length / 1024).toFixed(1)}KB`);
      }
    }
  }

  console.log("All equipment images optimized successfully!");
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
