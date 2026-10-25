import { test, expect } from "@playwright/test";

test.describe("Rental Rates Page (/rental-rates)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/rental-rates");
  });

  test("Page Metadata & Structured Data", async ({ page }) => {
    // Exact browser tab title
    await expect(page).toHaveTitle("Rental Price List – M/S Mir Sulaiman Trade Center");

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /rental-rates/);

    // LocalBusiness Schema
    const schemaScript = page.locator('script[type="application/ld+json"]').first();
    await expect(schemaScript).toBeAttached();
    const content = await schemaScript.textContent();
    expect(content).toContain("M/S Mir Sulaiman Trade Center");
    expect(content).toContain("Tabunia Bazaar");
    expect(content).toContain("8801711269863");
    expect(content).toContain("LocalBusiness");
  });

  test("Hero section renders H1, subtitle, and quote button", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toHaveText("Rental Price List");

    await expect(page.getByText("Build With Confidence")).toBeVisible();
    await expect(
      page.getByText(
        "Your complete guide to construction machinery rentals—equipment photos, quick comparisons, transparent pricing, and everything you need to get on site fast."
      )
    ).toBeVisible();

    const heroBtn = page.getByRole("button", { name: "Get a Fast Quote" });
    await expect(heroBtn).toBeVisible();
    await heroBtn.click();

    // Check Quote Drawer opens
    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();
    // Close drawer
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
  });

  test("Jump bar renders all 12 TOC items and anchors", async ({ page }) => {
    const jumpBar = page.locator("#jump-bar");
    await expect(jumpBar).toBeVisible();

    const tocExpected = [
      "01 Overview: What We Offer",
      "02 Fleet at a Glance",
      "03 Earthmoving & Excavation",
      "04 Lifting & Transport",
      "05 Concrete & Masonry",
      "06 Compaction & Grading",
      "07 Power Tools & Small Equipment",
      "08 Specialized Equipment & Attachments",
      "09 Rental Price List (BDT)",
      "10 Services That Keep You Moving",
      "11 Quick Guide: Choosing the Right Machine",
      "12 Get in Touch",
    ];

    for (const label of tocExpected) {
      const item = jumpBar.getByRole("link", { name: label });
      await expect(item).toBeAttached();
    }

    // Verify anchor IDs exist on page with scroll-mt-28
    const sectionIds = [
      "overview",
      "glance",
      "earthmoving",
      "lifting",
      "concrete",
      "compaction",
      "powertools",
      "specialized",
      "pricing",
      "services",
      "guide",
      "contact",
    ];

    for (const id of sectionIds) {
      const section = page.locator(`#${id}`);
      await expect(section).toHaveCount(1);
      await expect(section).toHaveClass(/scroll-mt-28/);
    }
  });

  test("Interactive price search filters equipment live across tables", async ({ page }) => {
    const searchInput = page.getByPlaceholder("Search equipment, e.g. excavator, generator");
    await expect(searchInput).toBeVisible();

    // Search for "Tower Crane"
    await searchInput.fill("Tower Crane");
    await expect(page.locator("#pricing").getByText("Tower Crane").locator("visible=true").first()).toBeVisible();
    // Earthmoving table heading inside pricing section should be hidden
    await expect(page.locator("#pricing").getByRole("heading", { name: "Earthmoving & Excavation" })).toBeHidden();

    // Search for nonexistent equipment
    await searchInput.fill("nonexistent-machine-xyz");
    await expect(page.getByText(/No equipment found\. Call us on 01711-269863\./i)).toBeVisible();
    const callBtn = page.getByRole("link", { name: /Call 01711-269863/i }).first();
    await expect(callBtn).toBeVisible();
    await expect(callBtn).toHaveAttribute("href", "tel:+8801711269863");

    // Clear search
    await searchInput.fill("");
    await expect(page.locator("#pricing").getByRole("heading", { name: "Earthmoving & Excavation" })).toBeVisible();
  });

  test("Category tabs filter to selected category", async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    await expect(tabs).toHaveCount(7); // All + 6 categories

    // Click "Concrete & Masonry" tab
    await page.getByRole("tab", { name: "Concrete & Masonry" }).click();
    await expect(page.locator("#pricing").getByText("Concrete Mixer").first()).toBeAttached();
    // Earthmoving table in pricing should not be displayed
    await expect(page.locator("#pricing").getByRole("heading", { name: "Earthmoving & Excavation" })).toBeHidden();

    // Click "All" tab
    await page.getByRole("tab", { name: "All Categories" }).click();
    await expect(page.locator("#pricing").getByRole("heading", { name: "Earthmoving & Excavation" })).toBeVisible();
  });

  test("'Get quote' button in price table prefills Quote Drawer", async ({ page }) => {
    const getQuoteBtn = page.getByRole("button", { name: "Get quote" }).locator("visible=true").first();
    await expect(getQuoteBtn).toBeVisible();
    await getQuoteBtn.click();

    // Drawer should open with prefilled notes
    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();

    const notesInput = drawer.locator("textarea#quote-drawer-notes");
    await expect(notesInput).toBeVisible();
    const value = await notesInput.inputValue();
    expect(value).toContain("Excavator");
  });

  test("Desktop vs Mobile layout for tables", async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      // Real HTML tables with thead & th
      const tables = page.locator("table");
      const count = await tables.count();
      expect(count).toBeGreaterThanOrEqual(7); // 1 fleet + 6 price tables
      const th = page.locator("th").first();
      await expect(th).toBeVisible();
    } else {
      // Under 768px: Mobile stacked cards
      const mobileCards = page.locator("[data-mobile-price-card]");
      const count = await mobileCards.count();
      expect(count).toBe(42);
      // Ensure no horizontal scrollbar on body
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    }
  });

  test("Sensitive numbers and notes are exact and preserved", async ({ page }) => {
    // Tower crane monthly "From 1,900,000" and notes "Erection/dismantling 450k–750k"
    const monthlyPrice = page.locator("#pricing").getByText("From 1,900,000");
    await expect(monthlyPrice.first()).toBeAttached();
    const erectionNote = page.locator("#pricing").getByText("Erection/dismantling 450k–750k");
    await expect(erectionNote.first()).toBeAttached();

    // Concrete pump note "Pipeline: 150/m extra"
    const pumpNote = page.locator("#pricing").getByText("Pipeline: 150/m extra");
    await expect(pumpNote.first()).toBeAttached();

    // Daily notes before & after tables
    await expect(
      page.getByText(
        "Daily rates assume an 8-hour shift. Weekly = 7 days, Monthly = 28 days. Fuel, operators, transport, and taxes billed as applicable."
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        "Operator services, fuel, delivery/pickup, mobilization for cranes/pumps, overtime, deposits, and insurance are quoted as needed."
      )
    ).toBeVisible();
  });
});
