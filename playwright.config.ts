import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: "list",
  use: {
    baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Mobile Small (320px)",
      use: {
        defaultBrowserType: "chromium",
        viewport: { width: 320, height: 640 },
      },
    },
    {
      name: "Mobile Standard (375px)",
      use: {
        ...devices["iPhone SE"],
        defaultBrowserType: "chromium",
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: "Tablet (768px)",
      use: {
        ...devices["iPad Mini"],
        defaultBrowserType: "chromium",
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "Laptop (1024px)",
      use: {
        defaultBrowserType: "chromium",
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: "Desktop (1440px)",
      use: {
        defaultBrowserType: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
