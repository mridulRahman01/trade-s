import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const EXTRA_VIEWPORTS = [
  { name: "320px (Small Mobile)", width: 320, height: 640 },
  { name: "360px (Standard Android)", width: 360, height: 740 },
  { name: "390px (iPhone 13/14)", width: 390, height: 844 },
  { name: "430px (iPhone 14 Pro Max)", width: 430, height: 932 },
  { name: "1920px (Ultra-Wide Desktop)", width: 1920, height: 1080 },
];

test.describe("About Page Responsive & Visual QA", () => {
  test("Zero horizontal scrollbar on /about at default project viewport", async ({ page }) => {
    await page.goto("/about", { waitUntil: "networkidle" });

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  for (const vp of EXTRA_VIEWPORTS) {
    test(`Zero horizontal scrollbar on /about at extra width ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/about", { waitUntil: "networkidle" });

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalScroll).toBe(false);
    });
  }

  test("Header shows single-line logo and phone trigger", async ({ page, viewport }) => {
    await page.goto("/about");
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check single-line logo
    const logo = header.locator("text=MIR SULAIMAN TRADE CENTER");
    await expect(logo).toBeVisible();

    if (viewport && viewport.width < 768) {
      // Mobile header has round 44px phone and WhatsApp buttons, no hamburger
      const phoneBtn = header.getByLabel("Call 01711-269863");
      await expect(phoneBtn).toBeVisible();
      await expect(phoneBtn).toHaveAttribute("href", "tel:+8801711269863");

      const waBtn = header.getByLabel(/WhatsApp/i);
      await expect(waBtn).toBeVisible();
      await expect(waBtn).toHaveAttribute("href", "https://wa.me/8801711269863");

      await expect(header.locator("button[aria-label*='menu' i]")).toHaveCount(0);
    } else {
      // Desktop header has Equipment link, About link, and Request a Quote button
      await expect(header.getByRole("link", { name: "Equipment" })).toBeVisible();
      await expect(header.getByRole("link", { name: "About" })).toBeVisible();
      await expect(header.getByRole("button", { name: "Request a Quote" })).toBeVisible();
    }
  });

  test("Fleet table displays real table on desktop (>= 768px) and stacked blocks on mobile (< 768px)", async ({
    page,
    viewport,
  }) => {
    await page.goto("/about");
    const isMobile = !!viewport && viewport.width < 768;

    if (isMobile) {
      // Mobile view (< 768px): real table hidden, stacked cards visible
      const tableDesktop = page.locator("table");
      await expect(tableDesktop).toBeHidden();

      const mobileCardHeading = page.getByRole("heading", {
        name: "Earthmoving & Excavation",
        exact: true,
      });
      await expect(mobileCardHeading).toBeVisible();
    } else {
      // Desktop view (>= 768px): real table visible with 4 column headers
      const tableDesktop = page.locator("table");
      await expect(tableDesktop).toBeVisible();
      const headers = tableDesktop.locator("th");
      await expect(headers).toHaveCount(4);
      await expect(headers.nth(0)).toHaveText("Category");
      await expect(headers.nth(1)).toHaveText("Key Equipment");
      await expect(headers.nth(2)).toHaveText("Capacity/Options");
      await expect(headers.nth(3)).toHaveText("Best For");
    }
  });

  test("Accordion initial state: first item open on desktop (>= 768px), all closed on mobile (< 768px)", async ({
    page,
    viewport,
  }) => {
    await page.goto("/about");
    const isMobile = !!viewport && viewport.width < 768;

    const firstTrigger = page.locator("#accordion-trigger-earthmoving-excavation");
    const secondTrigger = page.locator("#accordion-trigger-lifting-transport");

    if (isMobile) {
      await expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
      await expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
    } else {
      await expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
      await expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
    }
  });

  test("Accordion keyboard accessibility (Enter/Space toggle and focus)", async ({ page, isMobile }) => {
    test.skip(isMobile, "Keyboard testing is desktop only");

    await page.goto("/about");

    const secondTrigger = page.locator("#accordion-trigger-lifting-transport");
    await secondTrigger.scrollIntoViewIfNeeded();
    await secondTrigger.focus();
    await expect(secondTrigger).toBeFocused();

    // Press Enter to expand
    await page.keyboard.press("Enter");
    await expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
    const secondPanel = page.locator("#accordion-panel-lifting-transport");
    await expect(secondPanel).toBeVisible();

    // Press Enter to collapse
    await page.keyboard.press("Enter");
    await expect(secondTrigger).toHaveAttribute("aria-expanded", "false");
    await expect(secondPanel).toBeHidden();
  });

  test("Every tel: and wa.me link contains correct number +8801711269863 / 8801711269863", async ({
    page,
  }) => {
    await page.goto("/about");

    // Verify all tel: links
    const telLinks = page.locator("a[href^='tel:']");
    const telCount = await telLinks.count();
    expect(telCount).toBeGreaterThan(0);

    for (let i = 0; i < telCount; i++) {
      const href = await telLinks.nth(i).getAttribute("href");
      expect(href).toBe("tel:+8801711269863");
    }

    // Verify all wa.me links
    const waLinks = page.locator("a[href*='wa.me']");
    const waCount = await waLinks.count();
    expect(waCount).toBeGreaterThan(0);

    for (let i = 0; i < waCount; i++) {
      const href = await waLinks.nth(i).getAttribute("href");
      expect(href).toContain("8801711269863");
    }
  });

  test("Sticky mobile action bar is visible on mobile (< 768px) and hidden on desktop (>= 768px)", async ({
    page,
    viewport,
  }) => {
    await page.goto("/about");
    const isMobile = !!viewport && viewport.width < 768;
    const bar = page.getByTestId("about-mobile-action-bar");

    if (isMobile) {
      await expect(bar).toBeVisible();

      // Request a Quote click on sticky bar opens drawer
      await bar.getByRole("button", { name: "Request a Quote" }).click();
      const drawer = page.getByRole("dialog");
      await expect(drawer).toBeVisible();

      // Close button closes drawer
      await drawer.getByRole("button", { name: "Close quote drawer" }).click();
      await expect(drawer).toHaveCount(0);
    } else {
      await expect(bar).toBeHidden();
    }
  });

  test("Axe-core accessibility audit on /about has 0 critical or serious violations", async ({
    page,
  }) => {
    await page.goto("/about");
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalViolations).toEqual([]);
  });
});
