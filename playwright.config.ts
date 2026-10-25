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
      name: "iPhone 13/14",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "Pixel 7",
      use: {
        ...devices["Pixel 7"],
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "iPad",
      use: {
        ...devices["iPad Mini"],
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "Desktop (1440px)",
      use: {
        defaultBrowserType: "chromium",
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Mobile (360px)",
      use: {
        defaultBrowserType: "chromium",
        viewport: { width: 360, height: 800 },
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
