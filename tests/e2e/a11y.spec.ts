import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const testRoutes = [
  "/",
  "/privacy",
  "/equipment/cat-320-medium-excavator",
  "/equipment/cat-350-large-excavator",
  "/equipment/shantui-sd16",
  "/equipment/sany-15-5t-small-excavator",
];

test.describe("Automated Accessibility (axe-core) Audits", () => {
  for (const route of testRoutes) {
    test(`Page ${route} has zero critical or serious axe violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical"
      );

      if (seriousOrCritical.length > 0) {
        console.error(
          `Accessibility violations on ${route}:`,
          JSON.stringify(seriousOrCritical, null, 2)
        );
      }

      expect(
        seriousOrCritical,
        `Expected 0 serious or critical a11y violations on ${route}, found ${seriousOrCritical.length}`
      ).toHaveLength(0);
    });
  }

  test("Skip to content link is present and targets #main-content", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });
});
