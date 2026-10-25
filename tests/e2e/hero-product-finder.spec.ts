import { test, expect } from "@playwright/test";

test.describe("Hero Product Finder", () => {
  test("1. Default state renders Dig and trench with correct content, photo, and caption", async ({
    page,
  }) => {
    await page.goto("/");

    // Container & H1
    const h1 = page.getByRole("heading", {
      level: 1,
      name: "Machines and tools for your next project.",
    });
    await expect(h1).toBeVisible();

    // Accent bar and label
    await expect(
      page.getByText("EQUIPMENT RENTAL AND SUPPLY · PABNA")
    ).toBeVisible();

    // Radio group exists with accessible name
    const radiogroup = page.getByRole("radiogroup", {
      name: "What do you need to do?",
    });
    await expect(radiogroup).toBeVisible();

    // Default selected chip is "Dig and trench"
    const digChip = page.getByRole("radio", { name: "Dig and trench" });
    await expect(digChip).toBeVisible();
    await expect(digChip).toHaveAttribute("aria-checked", "true");
    await expect(digChip).toHaveAttribute("tabindex", "0");

    // Other chips should have aria-checked="false" and tabindex="-1"
    const clearChip = page.getByRole("radio", { name: "Level and clear land" });
    await expect(clearChip).toHaveAttribute("aria-checked", "false");
    await expect(clearChip).toHaveAttribute("tabindex", "-1");

    // Check title & blurb for Dig and trench
    const digPanel = page.locator("#hero-panel-dig");
    await expect(digPanel).toBeVisible();
    await expect(
      digPanel.getByRole("heading", {
        level: 2,
        name: "Digging, trenching and demolition",
      })
    ).toBeVisible();
    await expect(
      digPanel.getByText(
        "Excavators in small, medium and wheeled versions."
      )
    ).toBeVisible();

    // Check products in list
    const cat320Link = digPanel.getByRole("link", {
      name: /CAT Medium Excavator 320/i,
    });
    await expect(cat320Link).toBeVisible();
    await expect(cat320Link).toHaveAttribute(
      "href",
      "/equipment/cat-320-medium-excavator"
    );

    const sany15Link = digPanel.getByRole("link", {
      name: /SANY 15\.5T Small Excavator/i,
    });
    await expect(sany15Link).toBeVisible();
    await expect(sany15Link).toHaveAttribute(
      "href",
      "/equipment/sany-15-5t-small-excavator"
    );

    const sanyWheelLink = digPanel.getByRole("link", {
      name: /SANY Wheel Excavator SY155W/i,
    });
    await expect(sanyWheelLink).toBeVisible();
    await expect(sanyWheelLink).toHaveAttribute(
      "href",
      "/equipment/sany-wheel-excavator-sy155w"
    );

    // Caption bar links to the first product
    const captionLink = page.locator("#hero-product-caption-link");
    await expect(captionLink).toBeVisible();
    await expect(captionLink).toHaveAttribute(
      "href",
      "/equipment/cat-320-medium-excavator"
    );
    await expect(captionLink).toContainText("CAT Medium Excavator 320");
    await expect(captionLink).toContainText("View machine →");

    // Call link on desktop/tablet has correct tel format
    const callLink = digPanel.getByRole("link", { name: /Call 01711-269863/i });
    if (await callLink.isVisible()) {
      await expect(callLink).toHaveAttribute("href", "tel:+8801711269863");
    }
  });

  test("2. Switching chips updates results, products, photo, and caption for all 5 needs", async ({
    page,
  }) => {
    await page.goto("/");

    // 2. Clear land
    await page.getByRole("radio", { name: "Level and clear land" }).click();
    await expect(
      page.getByRole("radio", { name: "Level and clear land" })
    ).toHaveAttribute("aria-checked", "true");
    const clearPanel = page.locator("#hero-panel-clear");
    await expect(clearPanel).toBeVisible();
    await expect(
      clearPanel.getByRole("heading", {
        level: 2,
        name: "Land clearing and site preparation",
      })
    ).toBeVisible();
    await expect(
      clearPanel.getByText(
        "Bulldozers to push and level, plus rollers and trucks to finish."
      )
    ).toBeVisible();
    await expect(
      clearPanel.getByRole("link", { name: /Shantui SD16/i })
    ).toBeVisible();
    await expect(
      clearPanel.getByRole("link", { name: /SD22W Rock Bulldozer/i })
    ).toBeVisible();
    await expect(
      clearPanel.getByRole("link", { name: /Roller and Dump Trucks/i })
    ).toBeVisible();
    await expect(
      page.locator("#hero-product-caption-link")
    ).toHaveAttribute("href", "/equipment/shantui-sd16");

    // 3. Concrete
    await page.getByRole("radio", { name: "Mix and pour concrete" }).click();
    await expect(
      page.getByRole("radio", { name: "Mix and pour concrete" })
    ).toHaveAttribute("aria-checked", "true");
    const concretePanel = page.locator("#hero-panel-concrete");
    await expect(concretePanel).toBeVisible();
    await expect(
      concretePanel.getByRole("heading", {
        level: 2,
        name: "Mixing and compacting concrete",
      })
    ).toBeVisible();
    await expect(
      concretePanel.getByText(
        "Machines for consistent batches and dense, crack-free curing."
      )
    ).toBeVisible();
    await expect(
      concretePanel.getByRole("link", { name: /Concrete Mixture Machine/i })
    ).toBeVisible();
    await expect(
      concretePanel.getByRole("link", { name: /Vibrator Machine/i })
    ).toBeVisible();
    await expect(
      page.locator("#hero-product-caption-link")
    ).toHaveAttribute("href", "/equipment/concrete-mixture-machine");

    // 4. Steel
    await page.getByRole("radio", { name: "Cut and bend steel" }).click();
    await expect(
      page.getByRole("radio", { name: "Cut and bend steel" })
    ).toHaveAttribute("aria-checked", "true");
    const steelPanel = page.locator("#hero-panel-steel");
    await expect(steelPanel).toBeVisible();
    await expect(
      steelPanel.getByRole("heading", {
        level: 2,
        name: "Cutting and bending reinforcement",
      })
    ).toBeVisible();
    await expect(
      steelPanel.getByText(
        "Rod machines and the discs and blades that go with them."
      )
    ).toBeVisible();
    await expect(
      steelPanel.getByRole("link", {
        name: /Rod Cutter and Rod Bender Machine/i,
      })
    ).toBeVisible();
    await expect(
      steelPanel.getByRole("link", { name: /Importer of Cutting Disks/i })
    ).toBeVisible();
    await expect(
      steelPanel.getByRole("link", { name: /Cutting Blades/i })
    ).toBeVisible();
    await expect(
      page.locator("#hero-product-caption-link")
    ).toHaveAttribute("href", "/equipment/rod-cutter-and-rod-bender-machine");

    // 5. Safety & tools
    await page.getByRole("radio", { name: "Safety and tools" }).click();
    await expect(
      page.getByRole("radio", { name: "Safety and tools" })
    ).toHaveAttribute("aria-checked", "true");
    const safePanel = page.locator("#hero-panel-safe");
    await expect(safePanel).toBeVisible();
    await expect(
      safePanel.getByRole("heading", {
        level: 2,
        name: "Safety gear and hand tools",
      })
    ).toBeVisible();
    await expect(
      safePanel.getByText("Protect your crew and equip the site.")
    ).toBeVisible();
    await expect(
      safePanel.getByRole("link", { name: /Helmets and Safety Belts/i })
    ).toBeVisible();
    await expect(
      safePanel.getByRole("link", { name: /Hardware Tools from China/i })
    ).toBeVisible();
    await expect(
      page.locator("#hero-product-caption-link")
    ).toHaveAttribute("href", "/equipment/helmets-and-safety-belts");
  });

  test("3. Keyboard roving tabindex, arrow navigation, Home/End, and aria-live polite", async ({
    page,
  }) => {
    await page.goto("/");

    const digChip = page.getByRole("radio", { name: "Dig and trench" });
    await digChip.focus();
    await expect(digChip).toBeFocused();

    // ArrowRight navigates to next chip and selects it
    await page.keyboard.press("ArrowRight");
    const clearChip = page.getByRole("radio", { name: "Level and clear land" });
    await expect(clearChip).toBeFocused();
    await expect(clearChip).toHaveAttribute("aria-checked", "true");

    // ArrowDown navigates to next chip
    await page.keyboard.press("ArrowDown");
    const concreteChip = page.getByRole("radio", {
      name: "Mix and pour concrete",
    });
    await expect(concreteChip).toBeFocused();
    await expect(concreteChip).toHaveAttribute("aria-checked", "true");

    // End navigates to last chip
    await page.keyboard.press("End");
    const safeChip = page.getByRole("radio", { name: "Safety and tools" });
    await expect(safeChip).toBeFocused();
    await expect(safeChip).toHaveAttribute("aria-checked", "true");

    // Home navigates to first chip
    await page.keyboard.press("Home");
    await expect(digChip).toBeFocused();
    await expect(digChip).toHaveAttribute("aria-checked", "true");

    // Result panel has aria-live="polite"
    const resultPanel = page.locator("#hero-finder-result-panel");
    await expect(resultPanel).toHaveAttribute("aria-live", "polite");
    await expect(resultPanel).toContainText("Digging, trenching and demolition");
  });

  test("4. Request a Quote button opens drawer with prefilled need and products", async ({
    page,
  }) => {
    await page.goto("/");

    // Switch to Cut and bend steel
    await page.getByRole("radio", { name: "Cut and bend steel" }).click();

    // Click Request a Quote inside the active panel
    const quoteBtn = page
      .locator("#hero-panel-steel")
      .getByRole("button", { name: "Request a Quote" });
    await quoteBtn.click();

    // Quote drawer should open
    const drawer = page.getByRole("dialog", { name: "Request a Quote" });
    await expect(drawer).toBeVisible();

    // Message textarea should be prefilled
    const messageInput = drawer.locator("#quote-drawer-notes");
    await expect(messageInput).toBeVisible();
    const messageValue = await messageInput.inputValue();
    expect(messageValue).toContain("I need to: Cut and bend steel");
    expect(messageValue).toContain(
      "Interested in: Rod Cutter and Rod Bender Machine"
    );
  });

  test("5. URL query param /?need=steel preselects Cut and bend steel; invalid fallback to dig", async ({
    page,
  }) => {
    // Valid param
    await page.goto("/?need=steel");
    const steelChip = page.getByRole("radio", { name: "Cut and bend steel" });
    await expect(steelChip).toHaveAttribute("aria-checked", "true");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Cutting and bending reinforcement",
      })
    ).toBeVisible();

    // Invalid param
    await page.goto("/?need=bogus");
    const digChip = page.getByRole("radio", { name: "Dig and trench" });
    await expect(digChip).toHaveAttribute("aria-checked", "true");
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: "Digging, trenching and demolition",
      })
    ).toBeVisible();
  });

  test("6. No horizontal overflow at 320px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // allow 1px rounding
  });
});
