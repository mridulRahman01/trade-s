import { test, expect } from "@playwright/test";

test.describe("Contact Page (/contact)", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });
  });

  test("1. Renders complete page structure, hero, and metadata", async ({ page }) => {
    await page.goto("/contact");

    // Title and Meta
    await expect(page).toHaveTitle(/Contact \| M\/S Mir Sulaiman Trade Center, Pabna/);

    // H1 Heading
    const h1 = page.locator("h1");
    await expect(h1).toHaveText("Contact Us");

    // Live status badge rendered
    const statusBadge = page.locator('[aria-live="polite"]').first();
    await expect(statusBadge).toBeVisible();

    // Quick action targets (4 total) inside main content
    const mainContent = page.locator("#main-content");
    await expect(mainContent.locator('a[href^="tel:+8801711269863"]').first()).toBeVisible();
    await expect(mainContent.locator('a[href*="wa.me/8801711269863"]').first()).toBeVisible();
    await expect(mainContent.locator('a[href^="mailto:info@msmirsulaimantradecenter.com"]').first()).toBeVisible();

    // Two-column section with form and details
    await expect(page.locator("#contact-form")).toBeVisible();
    await expect(page.getByRole("heading", { name: "VISIT OR CALL", exact: false })).toBeVisible();

    // Map section & Closing strip
    await expect(page.getByRole("heading", { name: "FIND US", exact: false })).toBeVisible();
    await expect(page.getByRole("heading", { name: "NEED A PRICE?", exact: false })).toBeVisible();
  });

  test("2. Validation errors for required fields & focus first invalid input", async ({ page }) => {
    await page.goto("/contact");

    // Submit without filling fields
    const submitBtn = page.getByRole("button", { name: "Send message" });
    await submitBtn.click();

    // Check inline validation error messages
    await expect(page.locator("#error-name")).toContainText("Full name must be at least 2 characters");
    await expect(page.locator("#error-phone")).toContainText("Phone number is required");
    await expect(page.locator("#error-message")).toContainText("Message must be at least 10 characters");

    // Ensure first invalid input (#field-name) is focused
    await expect(page.locator("#field-name")).toBeFocused();
  });

  test("3. Invalid phone number rejection", async ({ page }) => {
    await page.goto("/contact");

    await page.locator("#field-name").fill("Kamal Hossain");
    await page.locator("#field-phone").fill("0171126986"); // only 10 digits
    await page.locator("#field-message").fill("Looking for concrete mixture machine rental.");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.locator("#error-phone")).toContainText("Please enter a valid 11-digit Bangladesh mobile number");
    await expect(page.locator("#field-phone")).toBeFocused();
  });

  test("4. Success state replaces form on same page with summary & actions", async ({ page }) => {
    // Mock the backend API endpoint
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Contact inquiry successfully transmitted." }),
      });
    });

    await page.goto("/contact");

    await page.locator("#field-name").fill("Tariqul Islam");
    await page.locator("#field-phone").fill("01711-269863");
    await page.locator("#field-email").fill("tariqul@site-contractor.bd");
    await page.locator("#field-interest").selectOption("Renting equipment");
    await page.locator("#field-location").fill("Pabna Sadar");
    await page.locator("#field-message").fill("Require a medium excavator delivered for 14 days earthmoving work.");

    await page.getByRole("button", { name: "Send message" }).click();

    // Success confirmation appears on the same page
    const formContainer = page.locator("#contact-form");
    await expect(formContainer.getByRole("heading", { name: "MESSAGE SENT", exact: false })).toBeVisible();
    await expect(formContainer.getByText("Tariqul Islam")).toBeVisible();
    await expect(formContainer.getByText("Phone: 01711-269863")).toBeVisible();
    await expect(formContainer.getByText("Pabna Sadar")).toBeVisible();

    // Call now & WhatsApp buttons exist in success state
    await expect(formContainer.getByRole("link", { name: /Call 01711-269863/i })).toBeVisible();
    await expect(formContainer.getByRole("link", { name: /Chat on WhatsApp/i })).toBeVisible();

    // Reset button restores the form
    const sendAnotherBtn = formContainer.getByRole("button", { name: "Send another message" });
    await sendAnotherBtn.click();
    await expect(page.getByRole("heading", { name: "SEND A MESSAGE", exact: false })).toBeVisible();
  });

  test("5. Server error state preserves entered values and shows fallback links", async ({ page }) => {
    // Mock the backend API endpoint returning 500
    await page.route("**/api/enquiry", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Failed to transmit inquiry.",
          fallback: {
            phone: "01711-269863",
            whatsappUrl: "https://wa.me/8801711269863",
            email: "info@msmirsulaimantradecenter.com",
          },
        }),
      });
    });

    await page.goto("/contact");

    await page.locator("#field-name").fill("Abdul Karim");
    await page.locator("#field-phone").fill("01711-269863");
    await page.locator("#field-message").fill("Need information on bulldozer rental rates.");

    await page.getByRole("button", { name: "Send message" }).click();

    // Error banner appears
    await expect(
      page.getByText("We could not send your message. Please call 01711-269863 or use WhatsApp.")
    ).toBeVisible();

    // Values are preserved in inputs
    await expect(page.locator("#field-name")).toHaveValue("Abdul Karim");
    await expect(page.locator("#field-phone")).toHaveValue("01711-269863");
    await expect(page.locator("#field-message")).toHaveValue("Need information on bulldozer rental rates.");
  });

  test("6. 'Send on WhatsApp instead' encodes current form values", async ({ page }) => {
    await page.goto("/contact");

    await page.locator("#field-name").fill("Nasir Ahmed");
    await page.locator("#field-phone").fill("01711-269863");
    await page.locator("#field-interest").selectOption("Price list");
    await page.locator("#field-location").fill("Tabunia Market");
    await page.locator("#field-message").fill("Please share your current 2026 equipment price list.");

    const whatsappBtn = page.getByRole("link", { name: "Send on WhatsApp instead" });
    await expect(whatsappBtn).toHaveAttribute("href", /wa\.me\/8801711269863\?text=/);
    await expect(whatsappBtn).toHaveAttribute("href", /Nasir%20Ahmed/);
    await expect(whatsappBtn).toHaveAttribute("href", /Price%20list/);
    await expect(whatsappBtn).toHaveAttribute("href", /Tabunia%20Market/);
  });

  test("7. Product prefill via ?product= query parameter", async ({ page }) => {
    await page.goto("/contact?product=cat-320-medium-excavator");

    const productSelect = page.locator("#field-product");
    await expect(productSelect).toHaveValue("cat-320-medium-excavator");
  });

  test("8. Interactive copy buttons announce 'Copied' to screen reader", async ({ page }) => {
    await page.goto("/contact");

    const copyPhoneBtn = page.getByRole("button", { name: "Copy phone number to clipboard" }).first();
    await copyPhoneBtn.scrollIntoViewIfNeeded();
    await copyPhoneBtn.click({ force: true });

    await expect(copyPhoneBtn).toContainText("Copied");
  });

  test("9. Privacy-friendly map loads iframe only upon clicking 'Load map'", async ({ page }) => {
    await page.goto("/contact");

    const mapSection = page.locator("#find-us");
    await expect(mapSection).toBeVisible();

    // Initially no iframe is embedded
    await expect(mapSection.locator("iframe")).toHaveCount(0);
    await expect(mapSection.getByRole("button", { name: "Load map" })).toBeVisible();

    // Click Load map
    await mapSection.getByRole("button", { name: "Load map" }).click();

    // iframe now loaded with title and lazy loading
    const iframe = mapSection.locator("iframe");
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute("loading", "lazy");
    await expect(iframe).toHaveAttribute("src", /google\.com\/maps.*Tabunia/);
  });

  test("10. Navigation active indicators & Request a Quote scrolling behavior", async ({ page }) => {
    // 10A. On /contact: Contact link is marked active
    await page.goto("/contact");

    // Check footer nav active link
    const footerContactLink = page.locator('footer nav a[href="/contact"]');
    await expect(footerContactLink).toHaveAttribute("aria-current", "page");

    const width = page.viewportSize()?.width ?? 0;

    if (width >= 1024) {
      // Desktop: header Request a Quote button scrolls to #contact-form
      const headerQuoteBtn = page.locator("header .hidden.lg\\:flex button", { hasText: "Request a Quote" });
      await headerQuoteBtn.click();

      // Form element receives focus
      await expect(page.locator("#field-name")).toBeFocused({ timeout: 5000 });

      // On /rental-rates: Request a Quote opens the quote drawer modal
      await page.goto("/rental-rates");
      const rentalHeaderQuoteBtn = page.locator("header .hidden.lg\\:flex button", { hasText: "Request a Quote" });
      await rentalHeaderQuoteBtn.click();
      await expect(page.getByRole("dialog", { name: "Request a Quote" })).toBeVisible();
    } else if (width >= 768) {
      // Tablet (iPad 768px): Hamburger menu drawer has Request a Quote button
      const menuTrigger = page.getByRole("button", { name: "Open menu" });
      await menuTrigger.click();

      const drawerQuoteBtn = page.locator('[role="dialog"]').getByRole("button", { name: "Request a Quote" });
      await expect(drawerQuoteBtn).toBeVisible();
      await drawerQuoteBtn.click();
      await expect(page.locator("#field-name")).toBeFocused({ timeout: 5000 });

      // On /rental-rates: drawer Request a Quote opens the quote modal
      await page.goto("/rental-rates");
      const rentalMenuTrigger = page.getByRole("button", { name: "Open menu" });
      await rentalMenuTrigger.click();
      const rentalDrawerQuoteBtn = page.locator('[role="dialog"]').getByRole("button", { name: "Request a Quote" });
      await rentalDrawerQuoteBtn.click();
      await expect(page.getByRole("dialog", { name: "Request a Quote" })).toBeVisible();
    } else {
      // Mobile (< 768px): Mobile sticky bottom bar Request a Quote scrolls to form
      const mobileQuoteBtn = page.locator("aside button", { hasText: "Request a Quote" });
      await expect(mobileQuoteBtn).toBeVisible();
      await mobileQuoteBtn.click();
      await expect(page.locator("#field-name")).toBeFocused({ timeout: 5000 });
    }
  });

  test("11. Honeypot field filled rejects automated bot submissions", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: {
        "x-forwarded-for": `10.200.${Math.floor(Math.random() * 250) + 1}.${Math.floor(Math.random() * 250) + 1}`,
      },
      data: {
        type: "contact",
        name: "Bot User",
        phone: "01711-269863",
        interest: "Renting equipment",
        message: "Automated spam payload seeking equipment pricing details.",
        website: "https://spam-bot.site", // Honeypot filled!
        _time: Date.now() - 10000,
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Unable to process request");
  });

  test("12. Minimum fill-time rejection (submitted under 3 seconds)", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: {
        "x-forwarded-for": `10.201.${Math.floor(Math.random() * 250) + 1}.${Math.floor(Math.random() * 250) + 1}`,
      },
      data: {
        type: "contact",
        name: "Speedy Submitter",
        phone: "01711-269863",
        interest: "Renting equipment",
        message: "Valid length message submitted too rapidly by an automated script.",
        website: "",
        _time: Date.now() - 500, // Only 500ms elapsed (under 3000ms minimum)
      },
    });

    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Unable to process request");
  });
});
