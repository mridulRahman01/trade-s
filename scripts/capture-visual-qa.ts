import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const VIEWPORTS = [
  { name: "360px", width: 360, height: 740 },
  { name: "768px", width: 768, height: 1024 },
  { name: "1440px", width: 1440, height: 900 },
];

const OUTPUT_DIR = path.join(
  process.env.HOME || "/home/mridul",
  ".gemini/antigravity-ide/brain/c7d01152-87ca-4911-b09f-85711ff56ff1/screenshots/visual-qa"
);

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`\nCapturing screenshots at viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });

    // 1. Home page grid with chips
    await page.goto("http://localhost:3000/#equipment", { waitUntil: "networkidle" });
    const equipmentSection = page.locator("#equipment");
    await equipmentSection.scrollIntoViewIfNeeded();

    // Chip: All
    const allChip = page.getByRole("button", { name: "All", exact: true });
    await allChip.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home-grid-all-${vp.name}.png`),
      fullPage: false,
    });

    // Chip: Construction Machines
    const constrChip = page.getByRole("button", { name: "Construction Machines", exact: true });
    await constrChip.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home-grid-construction-machines-${vp.name}.png`),
      fullPage: false,
    });

    // Chip: Safety Equipment
    const safetyChip = page.getByRole("button", { name: "Safety Equipment", exact: true });
    await safetyChip.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home-grid-safety-equipment-${vp.name}.png`),
      fullPage: false,
    });

    // Chip: Imported Tools and Supplies
    const importedChip = page.getByRole("button", { name: "Imported Tools and Supplies", exact: true });
    await importedChip.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `home-grid-imported-tools-${vp.name}.png`),
      fullPage: false,
    });

    // 2. Detail Page 1: Concrete Mixture Machine
    await page.goto("http://localhost:3000/equipment/concrete-mixture-machine", { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `detail-concrete-mixture-machine-${vp.name}.png`),
      fullPage: false,
    });

    // 3. Detail Page 2: Roller and Dump Trucks
    await page.goto("http://localhost:3000/equipment/roller-and-dump-trucks", { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `detail-roller-and-dump-trucks-${vp.name}.png`),
      fullPage: false,
    });

    await page.close();
  }

  await browser.close();
  console.log(`\nVisual QA screenshots successfully saved to: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
