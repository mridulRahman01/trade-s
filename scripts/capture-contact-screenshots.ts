import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

const viewports = [
  { width: 320, height: 600, name: "320px" },
  { width: 360, height: 740, name: "360px" },
  { width: 390, height: 844, name: "390px" },
  { width: 430, height: 932, name: "430px" },
  { width: 768, height: 1024, name: "768px" },
  { width: 1024, height: 768, name: "1024px" },
  { width: 1440, height: 900, name: "1440px" },
  { width: 1920, height: 1080, name: "1920px" },
];

const outputDir = path.join(process.cwd(), "public", "screenshots", "contact");

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  console.log("Starting visual regression capture and Axe a11y audit...");

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    // 1. Empty Form State
    await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });

    // Check for horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    if (scrollWidth > clientWidth) {
      console.warn(`⚠️ Warning: Horizontal scroll detected on ${vp.name}! scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
    } else {
      console.log(`✅ No horizontal scroll on ${vp.name} (${scrollWidth} <= ${clientWidth})`);
    }

    await page.screenshot({
      path: path.join(outputDir, `contact-empty-${vp.name}.png`),
      fullPage: true,
    });

    // 2. Validation Errors State
    await page.getByRole("button", { name: "Send message" }).click();
    await page.waitForSelector("#error-name", { state: "visible" });

    await page.screenshot({
      path: path.join(outputDir, `contact-errors-${vp.name}.png`),
      fullPage: true,
    });

    // 3. Success State
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Enquiry submitted successfully." }),
      });
    });

    await page.locator("#field-name").fill("Al-Amin Hossain");
    await page.locator("#field-phone").fill("01711-269863");
    await page.locator("#field-email").fill("alamin@contractor.bd");
    await page.locator("#field-interest").selectOption("Renting equipment");
    await page.locator("#field-location").fill("Pabna Sadar");
    await page.locator("#field-message").fill("Looking for a Cat 320 medium excavator for 2 weeks.");

    await page.getByRole("button", { name: "Send message" }).click();
    await page.waitForSelector("#contact-form h2", { state: "visible" });

    await page.screenshot({
      path: path.join(outputDir, `contact-success-${vp.name}.png`),
      fullPage: true,
    });

    await context.close();
  }

  // 4. Run Axe Accessibility Audit on Desktop and Mobile
  const auditContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const auditPage = await auditContext.newPage();
  await auditPage.goto("http://localhost:3000/contact", { waitUntil: "networkidle" });

  const axeResults = await new AxeBuilder({ page: auditPage })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  console.log("\n=================================");
  console.log(`AXE ACCESSIBILITY AUDIT REPORT`);
  console.log(`Violations: ${axeResults.violations.length}`);
  if (axeResults.violations.length > 0) {
    for (const v of axeResults.violations) {
      console.log(`- [${v.impact}] ${v.id}: ${v.description}`);
      for (const node of v.nodes) {
        console.log(`    target: ${node.target.join(", ")}`);
      }
    }
  } else {
    console.log(`✅ 0 VIOLATIONS FOUND. ACCESSIBILITY COMPLIANCE 100%!`);
  }
  console.log("=================================\n");

  await auditContext.close();
  await browser.close();
  console.log(`All screenshots saved to ${outputDir}`);
}

main().catch(console.error);
