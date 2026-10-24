import { navigationConfig } from "../src/config/navigation";
import { allEquipment } from "../src/data/equipment";

async function checkRoute(url: string): Promise<{ url: string; status: number; ok: boolean }> {
  try {
    const res = await fetch(url, { redirect: "manual" });
    const ok = res.status >= 200 && res.status < 400;
    return { url, status: res.status, ok };
  } catch {
    return { url, status: 0, ok: false };
  }
}

async function main() {
  const baseUrl = "http://localhost:3000";
  console.log("=== CRAWLING ALL ROUTES & NAVIGATION LINKS ===");

  const urlsToCheck = new Set<string>();

  // Main nav items
  for (const item of navigationConfig.mainNav) {
    const cleanPath = item.href.split("#")[0] || "/";
    urlsToCheck.add(`${baseUrl}${cleanPath}`);
  }

  // Desktop nav items
  for (const item of navigationConfig.desktopNav) {
    const cleanPath = item.href.split("#")[0] || "/";
    urlsToCheck.add(`${baseUrl}${cleanPath}`);
  }

  // Footer nav items
  for (const item of navigationConfig.footerNav) {
    const cleanPath = item.href.split("#")[0] || "/";
    urlsToCheck.add(`${baseUrl}${cleanPath}`);
  }

  // Privacy
  urlsToCheck.add(`${baseUrl}${navigationConfig.privacyHref}`);

  // Rental rates
  urlsToCheck.add(`${baseUrl}/rental-rates`);

  // All product detail pages
  for (const eq of allEquipment) {
    urlsToCheck.add(`${baseUrl}/equipment/${eq.slug}`);
  }

  let failed = false;
  for (const url of urlsToCheck) {
    const res = await checkRoute(url);
    if (!res.ok) {
      console.error(`❌ FAILED: ${url} returned status ${res.status}`);
      failed = true;
    } else {
      console.log(`✅ OK (${res.status}): ${url}`);
    }
  }

  if (failed) {
    console.error("Crawl check failed with errors!");
    process.exit(1);
  } else {
    console.log(`\n🎉 All ${urlsToCheck.size} routes verified with 0 errors!`);
  }
}

main();
