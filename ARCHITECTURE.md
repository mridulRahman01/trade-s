# M/S Mir Sulaiman Trade Center: Responsive Equipment Rental Website

**Architecture and folder structure (no database, no payments)**

A fast, professional website for a US-market construction equipment rental business. Visitors browse machines, read details, and send a quote request. You answer by email, phone or WhatsApp and close the deal yourself. There are no accounts, no cart, no checkout and no database.

---

## 0. Scope

| In | Out (on purpose) |
|---|---|
| Responsive design for phone, tablet, laptop, large desktop | Database |
| Equipment catalog with categories, search, filters, detail pages | Payment gateway, cart, checkout |
| Quote request and contact forms that email you | User accounts and login |
| Click-to-call, WhatsApp, and email buttons | Online booking and availability calendar |
| Local SEO pages, guides, FAQ, legal pages | Admin panel |
| Fast loading and accessibility | E-signature |

Every machine page has one primary action: **Request a Quote**. Rates are shown as "from" prices or hidden, your choice per machine.

---

## 1. Quick start

```bash
npx create-next-app@latest msm-rentals --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd msm-rentals
bash ../scaffold.sh          # adds every folder and file, never overwrites

npm i zod react-hook-form @hookform/resolvers resend @react-email/components \
  next-mdx-remote gray-matter clsx tailwind-merge lucide-react
npm i -D @playwright/test @axe-core/playwright @lhci/cli sharp tsx prettier

npx shadcn@latest init       # UI primitives
cp .env.example .env.local   # then fill in your email settings
npm run dev
```

---

## 2. Tech stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Static generation = very fast pages, great SEO |
| Styling | Tailwind CSS + shadcn/ui | Mobile-first utilities, accessible components |
| Content | Typed TS files + MDX | Replaces the database; no server needed to read it |
| Forms | React Hook Form + Zod | One schema validates in browser and server |
| Email | Resend + React Email | Sends the enquiry to you and an auto-reply to the client |
| Images | `next/image` + optimized WebP/AVIF | Right size for each device |
| Icons and fonts | lucide-react, `next/font` | No layout shift, no extra requests |
| Testing | Playwright, axe, Lighthouse CI | Real device sizes, accessibility, speed budgets |
| Hosting | Vercel (free tier is enough to start) | Deploys on every push |

---

## 3. Architecture

```
  Phone / tablet / laptop / desktop
                │
                ▼
   ┌──────────────────────────────────────────────┐
   │  Vercel CDN                                  │
   │  Pre-built static pages (HTML + CSS + JS)    │
   │   Home · Equipment · Detail · Areas · FAQ    │
   └───────────────┬──────────────────────────────┘
                   │  only when a form is submitted
                   ▼
        POST /api/enquiry   (one serverless function)
          1. Zod validation
          2. Spam guard (honeypot + timing + optional Turnstile)
          3. Resend → email to you  +  auto-reply to client
                   │
                   ▼
          Your inbox (this is your "database")
```

- **All pages are generated at build time.** `generateStaticParams` builds a page for every machine, category, area and guide from the files in `src/data/` and `content/`.
- **The only server code is `/api/enquiry`.** Everything else is static.
- **Your inbox is the record of enquiries.** Create an email label or filter such as "Website enquiries". If you later want a lead list, you can forward them to a Google Sheet without changing the site.

---

## 4. Folder structure

```
msm-rentals/
├── .env.example                                          # contact email + site settings, no secrets
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts                                        # image formats, security headers
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── playwright.config.ts                                  # device viewport projects
├── lighthouserc.json                                     # performance + a11y budgets
├── README.md
├── .github/
│   └── workflows/
│       └── ci.yml                                        # lint, typecheck, data check, build, e2e, Lighthouse
├── docs/
│   ├── ARCHITECTURE.md                                   # this document
│   ├── CONTENT_GUIDE.md                                  # how to add or edit a machine, FAQ, city page
│   ├── RESPONSIVE_CHECKLIST.md                           # device-by-device QA list
│   └── LAUNCH_CHECKLIST.md                               # domain, email, legal, analytics, SEO
├── content/                                              # MDX text content, editable without touching code
│   ├── guides/                                           # SEO guides
│   │   ├── how-to-choose-an-excavator.mdx
│   │   ├── mini-vs-medium-excavator.mdx
│   │   └── equipment-rental-checklist.mdx
│   └── legal/                                            # have a US attorney review before launch
│       ├── terms.mdx
│       ├── privacy.mdx
│       ├── rental-terms.mdx                              # general terms; signed agreement happens offline
│       └── cancellation-policy.mdx
├── emails/                                               # React Email templates
│   ├── enquiry-notification.tsx                          # to you: new quote/contact request
│   └── enquiry-autoreply.tsx                             # to the client: we received it
├── public/                                               # static assets
│   ├── images/
│   │   ├── brand/                                        # logo, favicon source
│   │   ├── hero/                                         # home + page hero photos
│   │   ├── equipment/                                    # one folder per machine slug
│   │   └── areas/                                        # city/region photos
│   └── fonts/                                            # only if self-hosting fonts
├── scripts/
│   ├── validate-data.ts                                  # zod-checks every machine/FAQ/area at build time
│   └── optimize-images.mjs                               # resize + convert photos to WebP/AVIF (sharp)
├── tests/
│   └── e2e/
│       ├── responsive.spec.ts                            # every page at phone, tablet, laptop, desktop
│       ├── navigation.spec.ts                            # menu, drawer, breadcrumbs
│       ├── quote-form.spec.ts                            # validation, success, error states
│       ├── catalog.spec.ts                               # filters, search, detail pages
│       └── a11y.spec.ts                                  # axe accessibility scan per page
└── src/
    ├── app/                                              # routes: pages compose sections, no business logic
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   ├── loading.tsx
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   ├── manifest.ts
    │   ├── opengraph-image.tsx
    │   ├── page.tsx                                      # home
    │   ├── equipment/
    │   │   ├── page.tsx                                  # all machines + filters + search
    │   │   └── [category]/
    │   │       ├── page.tsx                              # category landing page
    │   │       └── [slug]/
    │   │           └── page.tsx                          # machine detail
    │   ├── pricing/
    │   │   └── page.tsx                                  # indicative rate table
    │   ├── how-it-works/
    │   │   └── page.tsx
    │   ├── about/
    │   │   └── page.tsx
    │   ├── faq/
    │   │   └── page.tsx
    │   ├── safety/
    │   │   └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   ├── quote/
    │   │   └── page.tsx                                  # request a quote (accepts ?machine=slug)
    │   ├── thank-you/
    │   │   └── page.tsx                                  # shown after a form is sent
    │   ├── service-areas/
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx                              # one local SEO page per area
    │   ├── guides/
    │   │   ├── page.tsx
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   ├── legal/
    │   │   └── [slug]/
    │   │       └── page.tsx
    │   └── api/
    │       └── enquiry/
    │           └── route.ts                              # the only server code: validate, spam-check, send email
    ├── data/                                             # all site data as typed TypeScript, no database
    │   ├── categories.ts
    │   ├── equipment/                                    # one file per category
    │   │   ├── excavators.ts
    │   │   ├── bulldozers.ts
    │   │   ├── loaders.ts
    │   │   ├── lifting.ts
    │   │   ├── concrete.ts
    │   │   ├── compaction.ts
    │   │   ├── tools.ts
    │   │   ├── attachments.ts
    │   │   └── index.ts                                  # merges all categories
    │   ├── service-areas.ts
    │   ├── faqs.ts
    │   ├── testimonials.ts
    │   └── how-it-works.ts
    ├── components/                                       # all UI
    │   ├── ui/                                           # primitives (shadcn/ui)
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── textarea.tsx
    │   │   ├── select.tsx
    │   │   ├── badge.tsx
    │   │   ├── accordion.tsx
    │   │   ├── sheet.tsx
    │   │   ├── tabs.tsx
    │   │   ├── skeleton.tsx
    │   │   └── toast.tsx
    │   ├── layout/                                       # site chrome
    │   │   ├── site-header.tsx
    │   │   ├── site-footer.tsx
    │   │   ├── mobile-nav.tsx
    │   │   ├── mobile-action-bar.tsx
    │   │   ├── announcement-bar.tsx
    │   │   ├── breadcrumbs.tsx
    │   │   ├── page-hero.tsx
    │   │   ├── section.tsx
    │   │   ├── container.tsx
    │   │   └── cookie-banner.tsx
    │   ├── sections/                                     # reusable page sections
    │   │   ├── home-hero.tsx
    │   │   ├── category-grid.tsx
    │   │   ├── featured-equipment.tsx
    │   │   ├── why-choose-us.tsx
    │   │   ├── process-steps.tsx
    │   │   ├── testimonials.tsx
    │   │   ├── service-area-strip.tsx
    │   │   ├── stats-strip.tsx
    │   │   ├── faq-section.tsx
    │   │   └── cta-banner.tsx
    │   ├── equipment/                                    # catalog UI
    │   │   ├── equipment-card.tsx
    │   │   ├── equipment-grid.tsx
    │   │   ├── equipment-filters.tsx
    │   │   ├── search-box.tsx
    │   │   ├── spec-table.tsx
    │   │   ├── rate-table.tsx
    │   │   ├── image-gallery.tsx
    │   │   ├── related-equipment.tsx
    │   │   └── request-quote-button.tsx
    │   ├── forms/                                        # enquiry forms
    │   │   ├── quote-form.tsx
    │   │   ├── contact-form.tsx
    │   │   ├── form-field.tsx
    │   │   ├── submit-button.tsx
    │   │   └── honeypot.tsx
    │   └── seo/
    │       ├── json-ld.tsx
    │       ├── local-business-schema.tsx
    │       ├── breadcrumb-schema.tsx
    │       └── product-schema.tsx
    ├── lib/                                              # pure helpers
    │   ├── env.ts
    │   ├── utils.ts
    │   ├── format.ts
    │   ├── seo.ts
    │   ├── mdx.ts
    │   ├── equipment.ts
    │   ├── enquiry-schema.ts
    │   ├── spam-guard.ts
    │   ├── email.ts
    │   └── analytics.ts
    ├── config/
    │   ├── site.ts                                       # brand, phone, email, address, hours, social links
    │   └── navigation.ts                                 # header, footer, mobile bar links
    ├── hooks/
    │   ├── use-media-query.ts
    │   ├── use-debounce.ts
    │   └── use-lock-scroll.ts
    └── types/
        ├── equipment.ts
        └── enquiry.ts
```

`.gitkeep` files are added to empty folders so Git tracks them.

---

## 5. Pages

| Route | Purpose | Main sections | Primary CTA |
|---|---|---|---|
| `/` | Win trust and route visitors | Hero, category grid, featured machines, why choose us, how it works, areas served, testimonials, FAQ, final CTA | Request a Quote, Call |
| `/equipment` | Browse everything | Search, category and brand filters, machine grid | View machine |
| `/equipment/[category]` | Category landing page | Intro, buying guide snippet, machines | Request a Quote |
| `/equipment/[category]/[slug]` | Machine detail | Gallery, key specs, rates, best for, features, related machines, FAQ | Request a Quote (prefills the form) |
| `/pricing` | Set expectations | Indicative rate table, what is included, extra charges | Request a Quote |
| `/how-it-works` | Reduce hesitation | 4 steps: enquire, quote, agree, deliver | Request a Quote |
| `/service-areas` and `/service-areas/[slug]` | Local SEO | Coverage map or list, local intro, popular machines, local FAQ | Request a Quote |
| `/guides` and `/guides/[slug]` | Organic traffic | MDX articles | Related machines |
| `/about`, `/safety`, `/faq` | Credibility | Story, safety practices, answers | Contact |
| `/quote` | Capture the lead | Quote form (machine, dates, location, delivery, notes) | Send request |
| `/contact` | Alternative contact | Form, phone, WhatsApp, email, hours, address | Call, Send |
| `/thank-you` | After submit | Confirmation, what happens next, call link | Call |
| `/legal/[slug]` | Terms, privacy, rental terms, cancellation | MDX | none |

---

## 6. Content model (replaces the database)

```ts
// src/types/equipment.ts
export type Equipment = {
  slug: string;                       // used in the URL
  name: string;
  category: CategorySlug;
  brand?: string;
  summary: string;                    // 1-2 sentences for cards
  description: string;                // original copy, not copied from manufacturers
  images: { src: string; alt: string }[];
  specs: { label: string; value: string }[];   // imperial units, e.g. "Operating weight: 49,800 lb"
  rates?: { daily?: number; weekly?: number; monthly?: number; note?: string }; // USD, optional
  features: string[];
  bestFor: string[];
  featured?: boolean;
  available: boolean;                 // false shows "Ask about availability"
};
```

**To add a machine:** add one object to the right file in `src/data/equipment/`, drop photos in `public/images/equipment/<slug>/`, run the build. `scripts/validate-data.ts` fails the build if a field is missing, an image is absent, or a slug is duplicated.

**To edit text:** guides and legal pages are MDX files in `content/`. FAQ, testimonials and areas are typed arrays in `src/data/`.

---

## 7. Responsive design system

**Approach:** mobile-first. Style for a 360px phone first, then add layout at larger breakpoints.

| Device class | Width | Layout |
|---|---|---|
| Small phone | 320-374px | Single column, compact spacing |
| Phone | 375-639px | Single column, bottom action bar |
| Large phone / small tablet | 640-767px (`sm`) | 2-column card grids |
| Tablet | 768-1023px (`md`) | 2-3 columns, full header nav appears at `lg` |
| Laptop | 1024-1279px (`lg`) | Full navigation, 3-column grids, side-by-side detail layout |
| Desktop | 1280-1535px (`xl`) | 4-column grids, max content width 1280px |
| Large desktop | 1536px+ (`2xl`) | Centered container, no stretched text |

**Rules every component follows**

- **Navigation:** full menu on `lg` and up; on smaller screens a hamburger opens a full-height drawer (`mobile-nav.tsx`) with large tap targets and the phone number on top.
- **Mobile action bar** (`mobile-action-bar.tsx`): a fixed bottom bar on phones with Call, WhatsApp and Get Quote buttons. Hidden from `md` up. Add bottom padding to the page so it never covers content.
- **Touch targets:** at least 44 x 44 px; at least 8px between tappable items.
- **Typography:** fluid sizes with `clamp()`; body text at least 16px (prevents iOS zoom in inputs); line length 60-75 characters.
- **Images:** every image has width, height and `sizes`, so the browser downloads the right file and nothing jumps. Fixed aspect ratios (16:9 hero, 4:3 cards). Hero is the only image loaded eagerly.
- **Tables** (specs, rates): on phones they turn into stacked label/value rows; wide tables scroll horizontally inside their own container, never the whole page.
- **Forms:** one column on phones; correct `type`, `inputmode` and `autocomplete` (tel, email, address); labels always visible; clear inline errors; the submit button is full width on phones.
- **Filters** (`equipment-filters.tsx`): a sidebar on `lg`; on phones a "Filters" button opens a bottom sheet.
- **No horizontal scroll** on any page at any width. Tested at 320px.
- **Safe areas:** use `env(safe-area-inset-bottom)` for the action bar on iPhones.
- **Orientation:** layouts also tested in landscape on phones and tablets.
- **Dark mode:** optional; ship light first.
- **Accessibility:** semantic landmarks, visible focus, skip link, 4.5:1 contrast, alt text on every image, keyboard-operable menu and accordion, respects `prefers-reduced-motion`.

**Performance budget** (checked in CI by Lighthouse)

| Metric | Target |
|---|---|
| Largest Contentful Paint | under 2.5 s on mobile |
| Cumulative Layout Shift | under 0.1 |
| Interaction to Next Paint | under 200 ms |
| Lighthouse Performance / Accessibility / SEO | 90+ / 95+ / 95+ |
| Page JavaScript | keep client components small; use server components by default |

---

## 8. Enquiry flow

1. Visitor opens `/quote` (or clicks Request a Quote on a machine, which opens `/quote?machine=<slug>`).
2. Form fields: name, phone, email, company (optional), machine(s), start date, duration, job-site city and ZIP, delivery or pickup, operator needed, notes.
3. Browser validates with the shared Zod schema in `src/lib/enquiry-schema.ts`.
4. `POST /api/enquiry` re-validates, runs the spam guard (hidden honeypot field, minimum fill time, optional Cloudflare Turnstile), then sends two emails through Resend: a notification to you and an auto-reply to the client.
5. Visitor lands on `/thank-you` with your phone number and expected response time.
6. **Fallbacks** on every page: tap-to-call (`tel:`), WhatsApp link, and `mailto:`. If the form fails, the error message shows these.

No data is stored by the site. Enquiries live in your email.

---

## 9. SEO

- A `generateMetadata` per page: unique title, description, canonical URL, Open Graph image.
- JSON-LD: `LocalBusiness` on every page, `BreadcrumbList` on inner pages, `Product` on machine pages (leave out price if you do not publish rates).
- `sitemap.ts` and `robots.ts` generated from the same data files, so new machines appear automatically.
- One page per service area with original local content (not the same text with the city swapped).
- Guides target questions contractors search for ("which excavator size do I need").
- Add the business to Google Business Profile and use the same name, address and phone as the site.

---

## 10. Build order

Each phase ends with something you can deploy and test.

**Phase 0: Setup.** Create the app, run `scaffold.sh`, install dependencies, fill `config/site.ts`, deploy an empty site to Vercel, turn on CI.
Done when: a branded blank page is live on a preview URL.

**Phase 1: Design system and layout.** Colors, fonts, spacing, `ui/` primitives, header, footer, mobile nav, mobile action bar, container, section, page hero.
Done when: the shell looks right and works at 320px, 768px and 1440px.

**Phase 2: Data and catalog.** Types, categories, 8-12 real machines, validation script, `/equipment`, category pages, machine detail pages, filters and search, spec and rate tables, image gallery.
Done when: every machine you rent has a complete page and a Request a Quote button.

**Phase 3: Marketing pages.** Home, how it works, pricing, about, safety, FAQ, service areas, guides, legal pages.
Done when: every item in the main navigation leads to a finished page.

**Phase 4: Forms.** Quote and contact forms, `/api/enquiry`, email templates, spam guard, thank-you page, error and fallback states.
Done when: a test submission reaches your inbox and the client gets the auto-reply.

**Phase 5: Responsive QA, accessibility, performance.** Run the Playwright device matrix, axe scans and Lighthouse, then fix what they find. Walk through `docs/RESPONSIVE_CHECKLIST.md` on a real phone and a real tablet.
Done when: all budgets in section 7 pass.

**Phase 6: SEO and launch.** Metadata, schema, sitemap, analytics, Google Business Profile, domain and email authentication (SPF, DKIM), legal review, `docs/LAUNCH_CHECKLIST.md`.
Done when: the site is on your domain and the first real enquiry has been received.

---

## 11. Testing and deployment

| Layer | Tool | What it checks |
|---|---|---|
| Data | `scripts/validate-data.ts` | Machines, slugs, images, FAQ and areas are complete |
| Responsive | Playwright projects | Every page at 320, 375, 768, 1024, 1440 and 1920 px, plus iPhone, Pixel and iPad profiles; no horizontal scroll |
| Forms | Playwright | Required fields, bad email, success, server error |
| Accessibility | axe via Playwright | No serious violations on any page |
| Performance | Lighthouse CI | Budgets in section 7 |

CI (`ci.yml`) runs lint, typecheck, data validation, build, Playwright and Lighthouse on every pull request. Vercel creates a preview URL per branch and deploys `main` to production.

---

## 12. If you add more later

The structure leaves room to grow without a rewrite: add a `src/server/` folder with services and repositories, then a database for bookings, Stripe for deposits, and a portal. The page and component layers would stay unchanged. The earlier full-platform design covers that path.

---

## 13. Outside the code

- Original photos of the machines you actually rent, and original descriptions. Do not reuse another site's text or images.
- A real US business address, phone number and service area on the site. Do not list machines you cannot supply, or manufacturer names you have no right to use.
- Legal pages reviewed by a US attorney.
- A domain and a business email on that domain (needed so quote emails do not land in spam).
