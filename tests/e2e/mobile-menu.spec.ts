import { test, expect } from "@playwright/test";

test.describe("Mobile & Tablet Hamburger Menu (< 1024px)", () => {
  test.beforeEach(async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width >= 1024, "Mobile & Tablet tests for < 1024px");
    await page.goto("/");
  });

  test("Open and close menu via hamburger button and close button", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await expect(hamburger).toBeVisible();
    await expect(hamburger).toHaveAttribute("aria-expanded", "false");

    // Open menu
    await hamburger.click();
    await expect(page.getByRole("button", { name: "Close menu" }).first()).toBeVisible();
    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toBeVisible();

    // Verify dialog accessibility attributes
    await expect(panel).toHaveAttribute("role", "dialog");
    await expect(panel).toHaveAttribute("aria-modal", "true");
    await expect(panel).toHaveAttribute("aria-label", "Main menu");

    // Close via close button in panel header
    const closeBtn = panel.getByRole("button", { name: "Close menu" });
    await closeBtn.click();
    await expect(panel).toHaveClass(/translate-x-full/);
  });

  test("Close menu by tapping backdrop", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    // Tap backdrop (outside panel)
    await page.mouse.click(10, 10);
    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toHaveClass(/translate-x-full/);
  });

  test("Close menu by pressing Escape key and return focus to hamburger", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    // Press Escape
    await page.keyboard.press("Escape");
    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toHaveClass(/translate-x-full/);

    // Verify focus returned to hamburger
    await expect(hamburger).toBeFocused();
  });

  test("Focus trap cycles inside the mobile menu dialog", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toBeVisible();

    // Close button should receive initial focus
    const closeBtn = panel.getByRole("button", { name: "Close menu" });
    await expect(closeBtn).toBeFocused();

    // Press Shift+Tab from close button -> should wrap to the last focusable element in panel
    await page.keyboard.press("Shift+Tab");
    const activeEl = await page.evaluate(() => document.activeElement?.textContent);
    expect(activeEl).toBeTruthy();
  });

  test("Equipment sub-list expands/collapses and opens only one category at a time", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    const panel = page.locator("#mobile-menu-panel");
    const eqToggle = panel.getByRole("button", { name: "Expand equipment list" });
    await expect(eqToggle).toBeVisible();

    // Expand equipment list
    await eqToggle.click();
    await expect(panel.getByRole("button", { name: "Collapse equipment list" })).toBeVisible();

    // Sub-list shows categories: Excavators and Bulldozers
    const excavatorsGroupBtn = panel.getByRole("button", { name: /Excavators/i });
    const bulldozersGroupBtn = panel.getByRole("button", { name: /Bulldozers/i });
    await expect(excavatorsGroupBtn).toBeVisible();
    await expect(bulldozersGroupBtn).toBeVisible();

    // Click Excavators group -> opens excavators list
    await excavatorsGroupBtn.click();
    await expect(panel.getByRole("link", { name: /CAT Large Excavator 350/i })).toBeVisible();

    // Click Bulldozers group -> opens bulldozers and closes excavators
    await bulldozersGroupBtn.click();
    await expect(panel.getByRole("link", { name: /Shantui/i }).first()).toBeVisible();
    await expect(panel.getByRole("link", { name: /CAT Large Excavator 350/i })).toBeHidden();
  });

  test("Active page indicator marks current page", async ({ page }) => {
    // 1. On Home page
    await page.goto("/");
    const hamburgerHome = page.getByRole("button", { name: "Open menu" });
    await hamburgerHome.click();
    const panelHome = page.locator("#mobile-menu-panel");
    const homeLink = panelHome.getByRole("link", { name: "Home", exact: true });
    await expect(homeLink).toHaveAttribute("aria-current", "page");

    // Close menu
    await page.keyboard.press("Escape");

    // 2. On Rental Rates page
    await page.goto("/rental-rates");
    const hamburgerRates = page.getByRole("button", { name: "Open menu" });
    await hamburgerRates.click();
    const panelRates = page.locator("#mobile-menu-panel");
    const ratesLink = panelRates.getByRole("link", { name: "Rental Rates", exact: true });
    await expect(ratesLink).toHaveAttribute("aria-current", "page");

    // Close menu
    await page.keyboard.press("Escape");

    // 3. On About page
    await page.goto("/about");
    const hamburgerAbout = page.getByRole("button", { name: "Open menu" });
    await hamburgerAbout.click();
    const panelAbout = page.locator("#mobile-menu-panel");
    const aboutLink = panelAbout.getByRole("link", { name: "About", exact: true });
    await expect(aboutLink).toHaveAttribute("aria-current", "page");
  });

  test("Equipment automatically expands when on a product detail page", async ({ page }) => {
    await page.goto("/equipment/cat-350-large-excavator");
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    const panel = page.locator("#mobile-menu-panel");
    // Check that equipment sublist is automatically expanded
    await expect(panel.getByRole("button", { name: "Collapse equipment list" })).toBeVisible();
    // And active product is marked
    const activeProduct = panel.getByRole("link", { name: /CAT Large Excavator 350/i });
    await expect(activeProduct).toBeVisible();
    await expect(activeProduct).toHaveAttribute("aria-current", "page");
  });

  test("Request a Quote button in menu closes menu and opens quote drawer", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    const panel = page.locator("#mobile-menu-panel");
    const quoteBtn = panel.getByRole("button", { name: "Request a Quote" });
    await expect(quoteBtn).toBeVisible();
    await quoteBtn.click();

    // Menu should be closed
    await expect(panel).toHaveClass(/translate-x-full/);

    // Quote drawer should be open
    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();
  });

  test("Scroll lock preserves background position while open and restores on close", async ({ page }) => {
    // Scroll down after page is settled
    await page.waitForSelector("footer");
    await expect.poll(async () => {
      let y = await page.evaluate(() => window.scrollY);
      if (y < 250) {
        await page.evaluate(() => window.scrollTo(0, 300));
        y = await page.evaluate(() => window.scrollY);
      }
      return y;
    }, { timeout: 10000 }).toBeGreaterThanOrEqual(250);
    const initialScrollY = await page.evaluate(() => window.scrollY);

    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.dispatchEvent("click");

    // Body should be fixed position with data-mobile-menu-open
    const isLocked = await page.evaluate(() => document.body.style.position === "fixed");
    expect(isLocked).toBe(true);

    const panel = page.locator("#mobile-menu-panel");

    // Close menu
    await page.keyboard.press("Escape");
    await expect(panel).toHaveClass(/translate-x-full/);
    await page.waitForFunction((expected) => Math.abs(window.scrollY - expected) <= 2, initialScrollY);

    // Position restored
    const restoredScrollY = await page.evaluate(() => window.scrollY);
    expect(restoredScrollY).toBeCloseTo(initialScrollY, 0);
  });

  test("No horizontal scroll at 320px viewport", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width !== 320, "320px specific test");

    await page.goto("/");
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    const hamburger = page.getByRole("button", { name: "Open menu" });
    await hamburger.click();

    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toBeVisible();

    const panelWidth = await panel.evaluate((el) => el.clientWidth);
    expect(panelWidth).toBeLessThanOrEqual(320);
  });
});
