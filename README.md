# M/S Mir Sulaiman Trade Center — Heavy Equipment Rental Platform

A modern, high-performance web platform and digital equipment catalog for **M/S Mir Sulaiman Trade Center**, providing heavy construction machinery rentals, earthmoving equipment, road building machines, and industrial contractor tools in Tabunia Bazaar, Pabna, Bangladesh.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Lucide Icons**, and **Zod**.

---

## 🏢 Business Identity & Contact Details

- **Business Name:** M/S Mir Sulaiman Trade Center
- **Proprietor:** Mir Sabbin Hossain
- **Address:** Tabunia Bazaar, Pabna, Bangladesh
- **Mobile / WhatsApp:** [01711-269863](tel:+8801711269863) · [WhatsApp Chat](https://wa.me/8801711269863)
- **Email:** [info@msmirsulaimantradecenter.com](mailto:info@msmirsulaimantradecenter.com)
- **Operating Hours:** 11:00 AM to 11:00 PM, Monday to Friday

---

## ⚡ Key Highlights & Architecture

- **Zero Database / Zero Auth:** High-speed statically pre-rendered catalog with serverless contact handling for maximum reliability, speed, and security.
- **Strict Industrial Design System:**
  - **Colors:** White `#FFFFFF`, alternate sections `#F7F7F5`, yellow `#FFC20E` buttons and accents (`#E6AC00` hover, dark `#111111` text on yellow), body text `#3D3D3D`, borders `#E5E5E0`.
  - **Typography:** Barlow Condensed (600, 700) for headings, Public Sans (400, 500, 600) for body and table text, with tabular numbers (`font-variant-numeric: tabular-nums`) for price alignments.
  - **Spacing:** Strict 8px grid scale (4, 8, 12, 16, 24, 32, 48, 64, 96), max container width 1200px, 48px touch targets.
- **Complete Rental Rates Catalog (`/rental-rates`):**
  - Sticky jump bar with 12 Table of Contents anchors and edge fade hints.
  - 1 Fleet at a Glance comparison table (6 categories).
  - 6 equipment category showcases with licensed 3:2 WebP photos.
  - 6 interactive price tables (42 rows total) in indicative BDT rates with live search across tables, category tabs, empty state with direct Call button, and "Get quote" buttons that prefill the quote drawer.
  - Responsive layout: real `<table>` with sticky headers on desktop ($\ge 768\text{px}$) and stacked mobile cards ($< 768\text{px}$) with zero sideways scrolling.
  - Services & Quick Selection Guide sections.
- **Accessible Mobile & Tablet Hamburger Navigation (`< 1024px`):**
  - 48×48px tap target with three 2px dark bars animating into an X on open.
  - Slide-in panel (`min(88vw, 400px)`) with translucent backdrop, swipe-right-to-close gesture (60px threshold), and iOS-safe scroll locking.
  - Primary navigation links (Home, Equipment, About, Rental Rates, Contact).
  - Expandable Equipment row with rotating chevron, displaying sub-links grouped by category, with auto-expansion on product detail pages.
  - Pinned footer with yellow "Request a Quote", side-by-side Call and WhatsApp buttons, and proprietor business block.
  - Full keyboard accessibility, focus trap, and Escape key dismissal.
- **Slide-in / Full-screen Quote Request Drawer:**
  - Pre-fillable from catalog and rental rate tables.
  - Server-side Zod validation with honeypot spam protection.
  - Email notification routing via Resend with direct phone and WhatsApp fallbacks.
- **SEO & Accessibility:**
  - Automated dynamic `sitemap.xml` and `robots.txt`.
  - Schema.org `LocalBusiness` and `Product` JSON-LD structured data.
  - WCAG 2.1 AA compliant contrast, semantic table headers (`<th>`, `scope="col"`), and aria attributes.

---

## 🧭 Page Routes

| Route | Description |
|---|---|
| `/` | Homepage with hero, featured equipment catalog, specs, and contact section |
| `/equipment` | Equipment catalog overview (redirects to product catalog) |
| `/equipment/[slug]` | Individual machine specifications, dimensions, features, and inquiry CTAs |
| `/about` | Company background, fleet capabilities, quality standards, and contact details |
| `/rental-rates` | Complete Rental Price List with 12 TOC sections, interactive search, 42 price rows, and mobile stacked cards |
| `/privacy` | Privacy policy and data handling statement |
| `/api/enquiry` | Serverless API route for validating and sending quote inquiries |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Email Service:** [Resend](https://resend.com/)
- **Testing:** [Playwright](https://playwright.dev/) & [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm)
- **Image Optimization:** [Sharp](https://sharp.pixelplumbing.com/) (WebP pipeline)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/mridulRahman01/trade-s.git
cd trade-s
npm install
```

### 2. Environment Configuration

Copy the sample environment file:

```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:

```ini
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_your_api_key_here
ENQUIRY_TO_EMAIL=info@msmirsulaimantradecenter.com
ENQUIRY_FROM_EMAIL=info@msmirsulaimantradecenter.com
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Scripts & Quality Checks

| Script | Command | Purpose |
|---|---|---|
| **Development** | `npm run dev` | Starts local Next.js development server with hot reloading |
| **Validate Data** | `npm run validate-data` | Validates all equipment catalog and category data integrity |
| **Content Verification** | `npx tsx scripts/verify-rates-content.ts` | Programmatically verifies 100% exact text and pricing table cells against specification |
| **Route Crawl** | `npx tsx scripts/crawl-routes.ts` | Crawls all site routes and equipment detail pages ensuring 0 broken links (200 OK) |
| **Typecheck** | `npm run typecheck` | Runs `tsc --noEmit` across entire TypeScript codebase |
| **Lint** | `npm run lint` | Runs ESLint with Next.js rules (0 errors) |
| **Build** | `npm run build` | Generates optimized production build with prerendered static pages |
| **Start** | `npm run start` | Runs production server locally |
| **E2E Tests** | `npm run test:e2e` | Runs Playwright tests across mobile, tablet, and desktop viewports |

---

## 📸 Image Licensing & Credits

All photographic assets on the `/rental-rates` page and equipment catalog are authentic, verified images under Creative Commons or Public Domain licenses:

- **Earthmoving & Excavation:** Komatsu PC200-8 Hybrid Excavator ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), Morio)
- **Lifting & Transport:** Liebherr Mobile Crane ([CC0 1.0 Public Domain](https://creativecommons.org/publicdomain/zero/1.0/), ClemRutter)
- **Concrete & Masonry:** Concrete Mixture at Construction Site ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), Biswarup Ganguly)
- **Compaction & Grading:** Ride-on Roller Compactor ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), Su-May)
- **Power Tools:** Steel Fabrication Angle Grinder ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), PxFuel / Construction Archive)
- **Specialized Equipment:** JCB Telehandler ([CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), Peter O'Connor)
- **Services:** Heavy Equipment Mechanic Servicing ([CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), Roy Luck)
- **Quick Guide:** Construction Site Machinery Overview ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), John D.)

Full source URLs, authors, and license deeds are documented in [`IMAGE_CREDITS.md`](./IMAGE_CREDITS.md).

---

## 📄 License

Proprietary — All rights reserved © M/S Mir Sulaiman Trade Center.
