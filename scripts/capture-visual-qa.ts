import { chromium } from "@playwright/test";
import path from "path";

const VIEWPORTS = [
  { name: "320px-portrait", width: 320, height: 640 },
  { name: "360px-portrait", width: 360, height: 740 },
  { name: "390px-portrait", width: 390, height: 844 },
  { name: "430px-portrait", width: 430, height: 932 },
  { name: "667px-landscape", width: 667, height: 375 },
  { name: "768px-tablet", width: 768, height: 1024 },
  { name: "1440px-desktop", width: 1440, height: 900 },
];

const OUTPUT_DIR = "/home/mridul/.gemini/antigravity-ide/brain/c7d01152-87ca-4911-b09f-85711ff56ff1/screenshots";

async function main() {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    // 1. Home Page Full
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home-${vp.name}.png`),
      fullPage: false,
    });

    // 2. Product Detail Page
    await page.goto("http://localhost:3000/equipment/cat-320-medium-excavator", { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `detail-${vp.name}.png`),
      fullPage: false,
    });

    // 3. Open Quote Drawer on Product Detail
    const quoteBtn = page.getByRole("button", { name: "Request a Quote" }).first();
    await quoteBtn.click();
    await page.waitForTimeout(400); // Wait for slide animation
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `drawer-${vp.name}.png`),
      fullPage: false,
    });

    await page.close();
    console.log(`Captured screenshots for ${vp.name}`);
  }

  await browser.close();
  console.log("All screenshots captured successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
