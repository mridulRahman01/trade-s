import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";

const VIEWPORTS = [
  { name: "320px", width: 320, height: 640 },
  { name: "360px", width: 360, height: 740 },
  { name: "390px", width: 390, height: 844 },
  { name: "430px", width: 430, height: 932 },
  { name: "768px", width: 768, height: 1024 },
  { name: "1024px", width: 1024, height: 768 },
  { name: "1440px", width: 1440, height: 900 },
  { name: "1920px", width: 1920, height: 1080 },
];

const OUTPUT_DIR = "/home/mridul/.gemini/antigravity-ide/brain/c7d01152-87ca-4911-b09f-85711ff56ff1/screenshots/about";

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });

    // Capture initial viewport (Hero & top)
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `about-${vp.name}-hero.png`),
      fullPage: false,
    });

    // Capture full page screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `about-${vp.name}-full.png`),
      fullPage: true,
    });

    await page.close();
    console.log(`Captured screenshots for ${vp.name}`);
  }

  await browser.close();
  console.log("All About page screenshots captured successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
