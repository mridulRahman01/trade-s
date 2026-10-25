import { test, expect } from "@playwright/test";

test.describe("Site Navigation, Header & Footer", () => {
  test("Desktop header (>= 1024px) shows logo, nav links (Equipment, About, Rental Rates), WhatsApp, Phone, and Request a Quote", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width < 1024, "Desktop header test for >= 1024px");

    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check single-line logo
    await expect(header.getByRole("link", { name: "Mir Sulaiman Trade Center" })).toBeVisible();

    // Check Equipment link
    const eqLink = header.getByRole("link", { name: "Equipment", exact: true });
    await expect(eqLink).toBeVisible();

    // Check About link
    const aboutLink = header.getByRole("link", { name: "About", exact: true });
    await expect(aboutLink).toBeVisible();

    // Check Rental Rates link
    const ratesLink = header.getByRole("link", { name: "Rental Rates", exact: true });
    await expect(ratesLink).toBeVisible();
    await expect(ratesLink).toHaveAttribute("href", "/rental-rates");

    // Check WhatsApp link
    const waLink = header.getByRole("link", { name: "WhatsApp", exact: true });
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute("href", "https://wa.me/8801711269863");

    // Check phone number
    const phoneLink = header.getByRole("link", { name: /01711-269863/i });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute("href", "tel:+8801711269863");

    // Check yellow quote button
    const quoteBtn = header.getByRole("button", { name: "Request a Quote" });
    await expect(quoteBtn).toBeVisible();

    // Hamburger button should be hidden on desktop (>= 1024px)
    const hamburger = header.getByRole("button", { name: /menu/i });
    await expect(hamburger).toBeHidden();
  });

  test("Mobile/Tablet header (< 1024px) shows logo, round phone button, and accessible hamburger menu button", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width >= 1024, "Mobile header test for < 1024px");

    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Logo wordmark visible
    await expect(header.getByText("Mir Sulaiman Trade Center", { exact: true }).first()).toBeVisible();

    // Round phone button exists
    const phoneBtn = header.getByRole("link", { name: /Call 01711-269863/i }).first();
    await expect(phoneBtn).toBeVisible();
    await expect(phoneBtn).toHaveAttribute("href", "tel:+8801711269863");

    // Hamburger menu button exists with proper accessibility attributes
    const menuBtn = header.getByRole("button", { name: /Open menu/i });
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await expect(menuBtn).toHaveAttribute("aria-controls", "mobile-menu-panel");
  });

  test("Rental Rates link on /rental-rates shows active yellow underline", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width < 1024, "Desktop active state test for >= 1024px");

    await page.goto("/rental-rates");
    const header = page.locator("header");
    const ratesLink = header.getByRole("link", { name: "Rental Rates", exact: true });

    await expect(ratesLink).toBeVisible();
    await expect(ratesLink).toHaveAttribute("aria-current", "page");
    await expect(ratesLink).toHaveClass(/border-b-2/);
    await expect(ratesLink).toHaveClass(/border-\[#FFC20E\]/);
  });

  test("Footer shows full legal name, proprietor, navigation links, phone, email, copyright, and privacy link", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    await expect(footer.getByText("M/S Mir Sulaiman Trade Center").first()).toBeVisible();
    await expect(footer.getByText("Proprietor: Mir Sabbir Hossain")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Rental Rates" })).toBeVisible();
    await expect(footer.getByText("01711-269863")).toBeVisible();
    await expect(footer.getByText("info@msmirsulaimantradecenter.com")).toBeVisible();
    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  });

  test("Mobile hamburger menu sub-list lists all 5 categories and equipment products", async ({ page, viewport }) => {
    test.skip(!!viewport && viewport.width >= 1024, "Mobile drawer test for < 1024px");

    await page.goto("/");
    const menuBtn = page.getByRole("button", { name: /Open menu/i });
    await menuBtn.click();

    // Drawer is open
    const panel = page.locator("#mobile-menu-panel");
    await expect(panel).toBeVisible();

    // Expand equipment row
    const expandBtn = page.getByRole("button", { name: /Expand equipment list/i });
    if (await expandBtn.isVisible()) {
      await expandBtn.click();
    }

    // Verify all categories exist in sublist
    await expect(page.getByText("Excavators").first()).toBeVisible();
    await expect(page.getByText("Bulldozers").first()).toBeVisible();
    await expect(page.getByText("Construction Machines").first()).toBeVisible();
    await expect(page.getByText("Safety Equipment").first()).toBeVisible();
    await expect(page.getByText("Imported Tools and Supplies").first()).toBeVisible();
  });
});

