# Production Launch Checklist & Operations Manual
**Website:** M/S Mir Sulaiman Trade Center  
**Platform:** Next.js App Router (Static Generation + Serverless Route Handler)  
**Deployment Target:** Vercel (or any Node.js 20+ / Static CDN hosting)

---

## 1. Environment Configuration

Prior to deploying to production, configure the following environment variables in your hosting dashboard (e.g., Vercel Project Settings -> Environment Variables):

| Variable Name | Required | Default / Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://mirsulaimanrentals.com` | Canonical URLs, OpenGraph metadata, XML sitemap |
| `RESEND_API_KEY` | **Yes** | `re_123456789...` | API key from [Resend](https://resend.com) to transmit quote emails |
| `ENQUIRY_TO_EMAIL` | **Yes** | `rentals@mirsulaimanrentals.com` | Dispatch inbox receiving inbound contractor quotes |
| `ENQUIRY_FROM_EMAIL` | **Yes** | `dispatch@mirsulaimanrentals.com` | Verified sender domain address in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | `0x4AAAAAA...` | Cloudflare Turnstile anti-bot site key |
| `TURNSTILE_SECRET_KEY` | Optional | `0x4AAAAAA...` | Cloudflare Turnstile server verification key |

---

## 2. Resend Domain Verification (SPF, DKIM, DMARC)

To prevent customer autoreplies and internal quote alerts from landing in spam folders:

1. **Add Domain:** Go to [Resend Domains Dashboard](https://resend.com/domains) and add your custom domain.
2. **DNS Records:** Enter the 3 DNS records provided by Resend into your DNS provider (Cloudflare, Namecheap, Route 53):
   - **DKIM:** TXT record (e.g. `resend._domainkey.mirsulaimanrentals.com`)
   - **SPF:** TXT / MX record (e.g. `bounces.mirsulaimanrentals.com`)
   - **DMARC:** TXT record at `_dmarc.mirsulaimanrentals.com` (`v=DMARC1; p=none; rua=mailto:dmarc@mirsulaimanrentals.com`)
3. **Verify:** Click "Verify Domain" in Resend and ensure status shows `Verified`.

---

## 3. How to Add or Edit Equipment

All equipment data is strictly typed and managed in TypeScript files within `src/data/equipment/`.

### Steps to Add a New Machine:
1. Identify the relevant category file in `src/data/equipment/` (e.g., `excavators.ts`, `bulldozers.ts`, `loaders.ts`).
2. Add a new object conforming to the `Equipment` interface defined in `src/types/equipment.ts`:
   ```ts
   {
     id: "exc-compact-5t",
     slug: "compact-excavator-5-ton",
     name: "5-Ton Compact Hydraulic Excavator",
     category: "excavators",
     equipmentClass: "Mini / Compact Excavator",
     shortDescription: "Versatile 5-ton excavator engineered for trenching, utility installs, and confined civil sites.",
     description: "Full multi-paragraph description...",
     images: [
       {
         src: "/images/equipment/compact-excavator-5-ton/overview.webp",
         alt: "5-ton compact hydraulic excavator on trailer ready for job-site delivery",
         width: 1200,
         height: 800,
         isPrimary: true,
       }
     ],
     rates: {
       day: 350,
       week: 1150,
       month: 3100,
     },
     meterLimits: {
       dayHours: 8,
       weekHours: 40,
       monthHours: 160,
       overageHourlyRate: 35,
     },
     specs: [
       { label: "Operating Weight", value: "11,200 lbs" },
       { label: "Net Engine Power", value: "48 HP" },
       { label: "Max Dig Depth", value: "12 ft 4 in" },
     ],
     bestFor: [
       "Utility trenching and pipe laying",
       "Residential foundation footings",
     ],
     features: [
       "Rubber tracks for minimal surface disturbance",
       "Hydraulic thumb attached",
     ],
     deliveryLeadTimeHours: 4,
     available: true,
     featured: true,
   }
   ```
3. Place optimized WebP image assets in `public/images/equipment/[slug]/`.
4. Run validation:
   ```bash
   npm run validate-data
   ```
5. Run build test:
   ```bash
   npm run build
   ```

---

## 4. Legal Pages Attorney Review Notice

All legal documents located in `content/legal/`:
- `rental-terms.mdx`
- `terms.mdx`
- `privacy.mdx`
- `cancellation-policy.mdx`

Contain the notice:
`[DRAFT - Pending Attorney Review]`

> **Action Required by Business Owner:** Have legal counsel licensed in your operating state (Texas) review these documents to tailor liability limits, insurance indemnification, and dispute venue clauses to your local statutory requirements before formal operations begin.

---

## 5. Post-Deployment Smoke Test Protocol

Immediately after pushing live to production:

1. **Homepage:** Verify logo, navigation links, hero image, and equipment category cards load without layout shifts.
2. **Catalog Filtering:** Visit `/equipment`. Select categories, search for "excavator", and toggle "immediately available units". Verify reactive URL updates.
3. **Machine Detail Page:** Check `/equipment/excavators/mini-excavator-3-5-ton`. Verify spec table, 3-tier rental rate cards, and "Request Instant Quote" pre-fill button.
4. **End-to-End Form Submission:**
   - Go to `/quote?machine=mini-excavator-3-5-ton`.
   - Fill in real test credentials and submit.
   - Confirm immediate redirect to `/thank-you`.
   - Check the `ENQUIRY_TO_EMAIL` inbox for the notification email.
   - Check the customer email for the professional branded autoreply.
5. **Mobile Responsiveness:** Check 320px, 375px, and 768px viewports in Chrome DevTools to ensure sticky action bar is functional and tap targets exceed 44x44px.
6. **SEO & Social Share:** Run the production URL through [OpenGraph.xyz](https://www.opengraph.xyz) and Google Rich Results Test to confirm Valid Schema.org `LocalBusiness` and `Product` cards.
