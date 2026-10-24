import { test, expect } from "@playwright/test";

test.describe("Catalog Filtering, Search & Machine Details", () => {
  test("Catalog loads all 12 equipment items on Home page", async ({ page }) => {
    await page.goto("/");
    const cards = page.getByTestId("equipment-card");
    await expect(cards).toHaveCount(12);
  });

  test("Category filtering filters machines accurately", async ({ page }) => {
    await page.goto("/");

    // Click Excavators chip
    await page.getByRole("button", { name: "Excavators", exact: true }).click();
    const excavatorCards = page.getByTestId("equipment-card");
    await expect(excavatorCards).toHaveCount(9);

    // Click Bulldozers chip
    await page.getByRole("button", { name: "Bulldozers", exact: true }).click();
    const bulldozerCards = page.getByTestId("equipment-card");
    await expect(bulldozerCards).toHaveCount(3);

    // Click All Equipment chip
    await page.getByRole("button", { name: "All Equipment", exact: true }).click();
    const allCards = page.getByTestId("equipment-card");
    await expect(allCards).toHaveCount(12);
  });

  test("Search filters machines by name and brand", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.getByPlaceholder("Search model, brand...");
    await searchInput.fill("Shantui");

    const cards = page.getByTestId("equipment-card");
    await expect(cards).toHaveCount(2);
    await expect(page.getByText("Shantui SD16 (160 HP)").first()).toBeVisible();
  });

  test("Machine detail page displays specs, gallery, and rates note", async ({ page }) => {
    await page.goto("/equipment/cat-320-medium-excavator");

    // Check heading
    await expect(
      page.getByRole("heading", { name: "CAT Medium Excavator 320 (Tier 4 / Stage V)", level: 1 })
    ).toBeVisible();

    // Check verified specs
    await expect(page.getByText("172 hp").first()).toBeVisible();
    await expect(page.getByText("49,800 lb").first()).toBeVisible();
    await expect(page.getByText("Request a quote for current rates").first()).toBeVisible();

    // Check best for section
    await expect(page.getByRole("heading", { name: "Best For" })).toBeVisible();
  });
});
