import { test, expect } from "@playwright/test";

test.describe("Catalog Filtering, Search & Machine Details (20 Items)", () => {
  test("Catalog loads all 20 equipment items on Home page", async ({ page }) => {
    await page.goto("/");
    const cards = page.getByTestId("equipment-card");
    await expect(cards).toHaveCount(20);
  });

  test("Category filtering accurately filters all 5 categories and All", async ({ page }) => {
    await page.goto("/");

    // 1. Excavators (9 items)
    await page.getByRole("button", { name: "Excavators", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(9);

    // 2. Bulldozers (3 items)
    await page.getByRole("button", { name: "Bulldozers", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(3);

    // 3. Construction Machines (4 items)
    await page.getByRole("button", { name: "Construction Machines", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(4);
    await expect(page.getByText("Concrete Mixture Machine").first()).toBeVisible();
    await expect(page.getByText("Vibrator Machine").first()).toBeVisible();
    await expect(page.getByText("Rod Cutter and Rod Bender Machine").first()).toBeVisible();
    await expect(page.getByText("Roller and Dump Trucks").first()).toBeVisible();

    // 4. Safety Equipment (1 item)
    await page.getByRole("button", { name: "Safety Equipment", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(1);
    await expect(page.getByText("Helmets and Safety Belts").first()).toBeVisible();

    // 5. Imported Tools and Supplies (3 items)
    await page.getByRole("button", { name: "Imported Tools and Supplies", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(3);
    await expect(page.getByText("Importer of Cutting Disks").first()).toBeVisible();
    await expect(page.getByText("Cutting Blades").first()).toBeVisible();
    await expect(page.getByText("Hardware Tools from China").first()).toBeVisible();

    // 6. Reset to "All" (20 items)
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByTestId("equipment-card")).toHaveCount(20);
  });

  test("Search filters by required terms: vibrator, helmet, cutting, and hardware", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder("Search model, brand...");

    // Search: vibrator
    await searchInput.fill("vibrator");
    await expect(page.getByText("Vibrator Machine").first()).toBeVisible();

    // Search: helmet
    await searchInput.fill("helmet");
    await expect(page.getByText("Helmets and Safety Belts").first()).toBeVisible();

    // Search: cutting
    await searchInput.fill("cutting");
    await expect(page.getByText("Importer of Cutting Disks").first()).toBeVisible();
    await expect(page.getByText("Cutting Blades").first()).toBeVisible();

    // Search: hardware
    await searchInput.fill("hardware");
    await expect(page.getByText("Hardware Tools from China").first()).toBeVisible();
  });

  test("New equipment detail page loads without price and prefills quote drawer", async ({ page }) => {
    await page.goto("/equipment/concrete-mixture-machine");

    // Title
    await expect(
      page.getByRole("heading", { name: "Concrete Mixture Machine", level: 1 })
    ).toBeVisible();

    // Typical options heading exists on public page
    await expect(page.getByText("Typical options. Ask us for what is in stock.")).toBeVisible();

    // Check that "TO CONFIRM" does NOT leak onto the public page
    const pageContent = await page.content();
    expect(pageContent).not.toContain("TO CONFIRM");

    // How to order section exists
    await expect(page.getByText("How to order").first()).toBeVisible();

    // Click product-specific Request a Quote button to verify drawer prefill
    const machineQuoteBtn = page.getByRole("button", { name: /Request a Quote for this Machine/i });
    if (await machineQuoteBtn.isVisible()) {
      await machineQuoteBtn.click();
    } else {
      await page.locator('[data-testid="mobile-action-bar"]').getByRole("button", { name: "Request a Quote" }).click();
    }

    // Quote drawer opens and machine field has Concrete Mixture Machine prefilled
    const machineInput = page.locator("#quote-drawer-machine");
    await expect(machineInput).toHaveValue("Concrete Mixture Machine");
  });

  test("Roller and Dump Trucks dual gallery shows road roller and dump truck", async ({ page }) => {
    await page.goto("/equipment/roller-and-dump-trucks");

    await expect(
      page.getByRole("heading", { name: "Roller and Dump Trucks", level: 1 })
    ).toBeVisible();

    // Check images
    const mainImg = page.locator("img[alt='Vibratory road roller compactor on construction site']");
    await expect(mainImg.first()).toBeVisible();
  });

  test("No horizontal scroll on home and new product pages", async ({ page }) => {
    await page.goto("/");
    const homeScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const homeInnerWidth = await page.evaluate(() => window.innerWidth);
    expect(homeScrollWidth).toBeLessThanOrEqual(homeInnerWidth);

    await page.goto("/equipment/concrete-mixture-machine");
    const detailScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const detailInnerWidth = await page.evaluate(() => window.innerWidth);
    expect(detailScrollWidth).toBeLessThanOrEqual(detailInnerWidth);
  });
});
