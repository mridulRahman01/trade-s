import { test, expect } from "@playwright/test";

const viewports = [
  { name: "320px (Small Mobile)", width: 320, height: 600 },
  { name: "360px (Standard Android)", width: 360, height: 800 },
  { name: "375px (iPhone SE)", width: 375, height: 667 },
  { name: "390px (iPhone 13/14)", width: 390, height: 844 },
  { name: "430px (iPhone 14 Pro Max)", width: 430, height: 932 },
  { name: "768px (Tablet)", width: 768, height: 1024 },
  { name: "1440px (Desktop)", width: 1440, height: 900 },
];

test.describe("Responsive Matrix & Horizontal Overflow Audit", () => {
  for (const vp of viewports) {
    test(`Home page has zero horizontal scrollbar at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/", { waitUntil: "domcontentloaded" });

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(
        hasHorizontalScroll,
        `Detected horizontal overflow at viewport ${vp.name} (${vp.width}x${vp.height})`
      ).toBe(false);
    });

    test(`Product detail page has zero horizontal scrollbar at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/equipment/cat-320-medium-excavator", { waitUntil: "domcontentloaded" });

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(
        hasHorizontalScroll,
        `Detected horizontal overflow on product detail at viewport ${vp.name}`
      ).toBe(false);
    });
  }

  test("Product detail page displays sticky mobile action bar on mobile viewports", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width >= 768, "Mobile action bar test for < 768px");

    await page.goto("/equipment/cat-320-medium-excavator");

    const bar = page.getByTestId("mobile-action-bar");
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link", { name: "Call machinery dispatch" })).toBeVisible();
    await expect(bar.getByRole("link", { name: "Chat on WhatsApp" })).toBeVisible();
    await expect(bar.getByRole("button", { name: "Request a Quote" })).toBeVisible();
  });
});
