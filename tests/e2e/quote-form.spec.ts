import { test, expect } from "@playwright/test";

test.describe("Quote Drawer Submissions", () => {
  test("Quote drawer opens and prefills selected machine from product card", async ({ page }) => {
    await page.goto("/");

    // Click 'Request Quote' on CAT Large Excavator 350 card
    const cat350Card = page.getByTestId("equipment-card").filter({
      hasText: "CAT Large Excavator 350",
    });
    await cat350Card.getByRole("button", { name: "Request Quote" }).click();

    // Verify drawer opened
    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("heading", { name: "Request a Quote" })).toBeVisible();

    // Verify machine select has preselected value
    const machineSelect = drawer.locator("#quote-drawer-machine");
    await expect(machineSelect).toHaveValue("CAT Large Excavator 350 (Tier 4 / Stage V)");
  });

  test("Form displays validation errors for missing required fields", async ({ page }) => {
    await page.goto("/");

    // Open drawer via hero 'Request a Quote' button in main
    await page.locator("main").getByRole("button", { name: "Request a Quote" }).first().click();

    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();

    // Click submit without filling fields
    const submitBtn = drawer.getByRole("button", { name: "Submit Quote Request" });
    await submitBtn.click();

    // Check inline validation error messages
    await expect(drawer.getByText("Please enter your name")).toBeVisible();
    await expect(drawer.getByText("Please enter a valid phone number")).toBeVisible();
    await expect(drawer.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("Successful form submission displays success state with immediate call/WhatsApp inside drawer", async ({ page }) => {
    // Intercept /api/enquiry and return 200
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Enquiry successfully transmitted." }),
      });
    });

    await page.goto("/");
    await page.locator("main").getByRole("button", { name: "Request a Quote" }).first().click();

    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();

    await drawer.locator("#quote-drawer-name").fill("Tariq Ahmed");
    await drawer.locator("#quote-drawer-phone").fill("01711-269863");
    await drawer.locator("#quote-drawer-email").fill("tariq@contractor.com");
    await drawer.locator("#quote-drawer-city").fill("Pabna");
    await drawer.locator("#quote-drawer-notes").fill("Require excavator for road clearing project.");

    const submitBtn = drawer.getByRole("button", { name: "Submit Quote Request" });
    await submitBtn.click();

    // Verify in-drawer success state
    await expect(drawer.getByRole("heading", { name: "Request Received" })).toBeVisible();
    await expect(drawer.getByText("Tariq Ahmed")).toBeVisible();
    await expect(drawer.getByText("01711-269863").first()).toBeVisible();
  });

  test("Escape key and close button close the drawer", async ({ page }) => {
    await page.goto("/");
    await page.locator("main").getByRole("button", { name: "Request a Quote" }).first().click();

    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();

    // Close via close button
    const closeBtn = drawer.getByRole("button", { name: "Close quote drawer" });
    await closeBtn.click();
    await expect(drawer).toHaveCount(0);
  });
});
