import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

async function capture() {
  const outputDir = path.resolve(
    "/home/mridul/.gemini/antigravity-ide/brain/c7d01152-87ca-4911-b09f-85711ff56ff1/screenshots"
  );
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  console.log("Navigating to home page...");

  // 1. Desktop 1440px - All 5 needs
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await page.locator("#hero-product-finder").waitFor({ state: "visible" });

  const needs = [
    { id: "dig", name: "Dig and trench" },
    { id: "clear", name: "Level and clear land" },
    { id: "concrete", name: "Mix and pour concrete" },
    { id: "steel", name: "Cut and bend steel" },
    { id: "safe", name: "Safety and tools" },
  ];

  for (const need of needs) {
    const chip = page.getByRole("radio", { name: need.name });
    await chip.click();
    await page.waitForTimeout(300); // allow image transition
    const heroSection = page.locator("#hero-product-finder");
    const filePath = path.join(outputDir, `hero-desktop-1440-${need.id}.png`);
    await heroSection.screenshot({ path: filePath });
    console.log(`Saved: ${filePath}`);
  }

  // 2. 1920px wide (large desktop)
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.getByRole("radio", { name: "Dig and trench" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-desktop-1920-dig.png") });
  console.log("Saved: hero-desktop-1920-dig.png");

  // 3. 1024px wide (small desktop)
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-desktop-1024-dig.png") });
  console.log("Saved: hero-desktop-1024-dig.png");

  // 4. 768px wide (tablet)
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-tablet-768-dig.png") });
  console.log("Saved: hero-tablet-768-dig.png");

  // 5. 430px wide (large phone - iPhone 14 Pro Max)
  await page.setViewportSize({ width: 430, height: 932 });
  await page.getByRole("radio", { name: "Safety and tools" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-mobile-430-safe.png") });
  console.log("Saved: hero-mobile-430-safe.png");

  // 6. 390px wide (standard phone - iPhone 13/14)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("radio", { name: "Mix and pour concrete" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-mobile-390-concrete.png") });
  console.log("Saved: hero-mobile-390-concrete.png");

  // 7. 360px wide (Galaxy / Pixel)
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole("radio", { name: "Level and clear land" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-mobile-360-clear.png") });
  console.log("Saved: hero-mobile-360-clear.png");

  // 8. 320px wide (small phone - need dig and need steel)
  await page.setViewportSize({ width: 320, height: 700 });
  await page.getByRole("radio", { name: "Dig and trench" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-mobile-320-dig.png") });
  console.log("Saved: hero-mobile-320-dig.png");

  await page.getByRole("radio", { name: "Cut and bend steel" }).click();
  await page.waitForTimeout(300);
  await page
    .locator("#hero-product-finder")
    .screenshot({ path: path.join(outputDir, "hero-mobile-320-steel.png") });
  console.log("Saved: hero-mobile-320-steel.png");

  await browser.close();
  console.log("All screenshots successfully captured!");
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
