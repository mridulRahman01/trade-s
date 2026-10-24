import fs from "fs";
import path from "path";
import sharp from "sharp";
import { allEquipment } from "../src/data/equipment";

const areas = [
  { slug: "houston", name: "Houston Metro Industrial Hub" },
  { slug: "dallas-fort-worth", name: "Dallas–Fort Worth Metroplex" },
  { slug: "austin", name: "Austin Central Texas Corridor" },
  { slug: "san-antonio", name: "San Antonio & South Texas Hub" },
];

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function generateSvgGraphic(
  title: string,
  category: string,
  badgeText: string,
  width = 1200,
  height = 800
): Promise<Buffer> {
  const safeTitle = escapeXml(title);
  const safeCategory = escapeXml(category);
  const safeBadge = escapeXml(badgeText);
  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="60%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#090d16" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#d97706" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="1" opacity="0.25" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#grid)" />

    <!-- Industrial accent stripes top and bottom -->
    <rect x="0" y="0" width="${width}" height="10" fill="url(#accent)" />
    <rect x="0" y="${height - 10}" width="${width}" height="10" fill="url(#accent)" />

    <!-- Decorative circular glow -->
    <circle cx="${width * 0.75}" cy="${height * 0.4}" r="220" fill="#f59e0b" opacity="0.08" />

    <!-- Technical watermark corner brackets -->
    <path d="M 50 100 L 50 50 L 100 50" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.6" />
    <path d="M ${width - 50} 100 L ${width - 50} 50 L ${width - 100} 50" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.6" />
    <path d="M 50 ${height - 100} L 50 ${height - 50} L 100 ${height - 50}" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.6" />
    <path d="M ${width - 50} ${height - 100} L ${width - 50} ${height - 50} L ${width - 100} ${height - 50}" fill="none" stroke="#f59e0b" stroke-width="3" opacity="0.6" />

    <!-- Badge -->
    <rect x="70" y="90" width="280" height="40" rx="6" fill="#f59e0b" fill-opacity="0.18" stroke="#f59e0b" stroke-width="1.5" />
    <text x="210" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#fbbf24" text-anchor="middle" letter-spacing="1.5">
      ${safeBadge.toUpperCase()}
    </text>

    <!-- Equipment Class / Category -->
    <text x="70" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#94a3b8" letter-spacing="2">
      ${safeCategory.toUpperCase()}
    </text>

    <!-- Equipment Title -->
    <text x="70" y="270" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" fill="#ffffff">
      ${safeTitle}
    </text>

    <!-- Center machine emblem graphic -->
    <g transform="translate(${width / 2 - 120}, ${height / 2 - 50})">
      <rect x="0" y="0" width="240" height="150" rx="16" fill="#1e293b" stroke="#475569" stroke-width="2" />
      <path d="M 40 100 L 90 40 L 150 40 L 200 100 Z" fill="#f59e0b" opacity="0.85" />
      <circle cx="70" cy="115" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="4" />
      <circle cx="170" cy="115" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="4" />
      <rect x="90" y="108" width="60" height="14" rx="4" fill="#64748b" />
    </g>

    <!-- Footer specs bar -->
    <rect x="70" y="${height - 120}" width="${width - 140}" height="50" rx="8" fill="#1e293b" fill-opacity="0.8" stroke="#334155" stroke-width="1" />
    <text x="95" y="${height - 88}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">
      M/S MIR SULAIMAN TRADE CENTER · HEAVY FLEET DISPATCH · COMMERCIAL RENTAL
    </text>
    <text x="${width - 95}" y="${height - 88}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f59e0b" text-anchor="end">
      READY FOR DEPLOYMENT
    </text>
  </svg>`;
  return Buffer.from(svg);
}

async function main() {
  console.log("Generating visual assets...");

  // Generate equipment images
  for (const item of allEquipment) {
    for (const img of item.images) {
      const fullPath = path.join(process.cwd(), "public", img.src);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const svgBuffer = await generateSvgGraphic(
        item.name,
        item.category,
        "Commercial Fleet Unit"
      );

      await sharp(svgBuffer)
        .webp({ quality: 90 })
        .toFile(fullPath);

      console.log(`Generated: ${img.src}`);
    }
  }

  // Generate hero image
  const heroDir = path.join(process.cwd(), "public/images/hero");
  if (!fs.existsSync(heroDir)) {
    fs.mkdirSync(heroDir, { recursive: true });
  }
  const heroSvg = await generateSvgGraphic(
    "Heavy Construction Equipment Fleet",
    "Commercial Job-Site Rental",
    "Direct Job-Site Delivery",
    1600,
    900
  );
  await sharp(heroSvg)
    .webp({ quality: 90 })
    .toFile(path.join(heroDir, "home-hero.webp"));
  console.log("Generated: /images/hero/home-hero.webp");

  // Generate service area images
  const areasDir = path.join(process.cwd(), "public/images/areas");
  if (!fs.existsSync(areasDir)) {
    fs.mkdirSync(areasDir, { recursive: true });
  }
  for (const area of areas) {
    const areaSvg = await generateSvgGraphic(
      area.name,
      "Regional Delivery Service Hub",
      "Texas Equipment Coverage"
    );
    await sharp(areaSvg)
      .webp({ quality: 90 })
      .toFile(path.join(areasDir, `${area.slug}.webp`));
    console.log(`Generated: /images/areas/${area.slug}.webp`);
  }

  // Generate brand logo SVG
  const brandDir = path.join(process.cwd(), "public/images/brand");
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }
  const logoSvg = `
  <svg width="240" height="60" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="8" width="44" height="44" rx="8" fill="#f59e0b" />
    <path d="M 12 36 L 22 18 L 32 36 Z" fill="#0f172a" />
    <text x="56" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#0f172a">
      MIR SULAIMAN
    </text>
    <text x="56" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#d97706" letter-spacing="1">
      TRADE CENTER
    </text>
  </svg>`;
  fs.writeFileSync(path.join(brandDir, "logo.svg"), logoSvg.trim());
  console.log("Generated: /images/brand/logo.svg");

  console.log("All visual assets successfully generated.");
}

main().catch((err) => {
  console.error("Asset generation failed:", err);
  process.exit(1);
});
