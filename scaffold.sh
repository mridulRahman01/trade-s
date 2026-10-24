#!/usr/bin/env bash
# Creates the folder structure for the responsive M/S Mir Sulaiman rental website.
# Non-destructive: existing files are never overwritten.
#
# Usage:
#   npx create-next-app@latest msm-rentals --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
#   cd msm-rentals && bash ../scaffold.sh
set -euo pipefail

mk() { mkdir -p "$1"; }
tf() { [ -e "$1" ] || { mkdir -p "$(dirname "$1")"; : > "$1"; }; }

# ---- folders
mk ".github"
mk ".github/workflows"
mk "content"
mk "content/guides"
mk "content/legal"
mk "docs"
mk "emails"
mk "public"
mk "public/fonts"
mk "public/images"
mk "public/images/areas"
mk "public/images/brand"
mk "public/images/equipment"
mk "public/images/hero"
mk "scripts"
mk "src"
mk "src/app"
mk "src/app/about"
mk "src/app/api"
mk "src/app/api/enquiry"
mk "src/app/contact"
mk "src/app/equipment"
mk "src/app/equipment/[category]"
mk "src/app/equipment/[category]/[slug]"
mk "src/app/faq"
mk "src/app/guides"
mk "src/app/guides/[slug]"
mk "src/app/how-it-works"
mk "src/app/legal"
mk "src/app/legal/[slug]"
mk "src/app/pricing"
mk "src/app/quote"
mk "src/app/safety"
mk "src/app/service-areas"
mk "src/app/service-areas/[slug]"
mk "src/app/thank-you"
mk "src/components"
mk "src/components/equipment"
mk "src/components/forms"
mk "src/components/layout"
mk "src/components/sections"
mk "src/components/seo"
mk "src/components/ui"
mk "src/config"
mk "src/data"
mk "src/data/equipment"
mk "src/hooks"
mk "src/lib"
mk "src/types"
mk "tests"
mk "tests/e2e"

# ---- files
tf ".prettierrc"
tf "eslint.config.mjs"
tf "next.config.ts"
tf "postcss.config.mjs"
tf "tsconfig.json"
tf "package.json"
tf "playwright.config.ts"
tf "lighthouserc.json"
tf "README.md"
tf ".github/workflows/ci.yml"
tf "docs/ARCHITECTURE.md"
tf "docs/CONTENT_GUIDE.md"
tf "docs/RESPONSIVE_CHECKLIST.md"
tf "docs/LAUNCH_CHECKLIST.md"
tf "content/guides/how-to-choose-an-excavator.mdx"
tf "content/guides/mini-vs-medium-excavator.mdx"
tf "content/guides/equipment-rental-checklist.mdx"
tf "content/legal/terms.mdx"
tf "content/legal/privacy.mdx"
tf "content/legal/rental-terms.mdx"
tf "content/legal/cancellation-policy.mdx"
tf "emails/enquiry-notification.tsx"
tf "emails/enquiry-autoreply.tsx"
tf "scripts/validate-data.ts"
tf "scripts/optimize-images.mjs"
tf "tests/e2e/responsive.spec.ts"
tf "tests/e2e/navigation.spec.ts"
tf "tests/e2e/quote-form.spec.ts"
tf "tests/e2e/catalog.spec.ts"
tf "tests/e2e/a11y.spec.ts"
tf "src/app/layout.tsx"
tf "src/app/globals.css"
tf "src/app/not-found.tsx"
tf "src/app/error.tsx"
tf "src/app/loading.tsx"
tf "src/app/robots.ts"
tf "src/app/sitemap.ts"
tf "src/app/manifest.ts"
tf "src/app/opengraph-image.tsx"
tf "src/app/page.tsx"
tf "src/app/equipment/page.tsx"
tf "src/app/equipment/[category]/page.tsx"
tf "src/app/equipment/[category]/[slug]/page.tsx"
tf "src/app/pricing/page.tsx"
tf "src/app/how-it-works/page.tsx"
tf "src/app/about/page.tsx"
tf "src/app/faq/page.tsx"
tf "src/app/safety/page.tsx"
tf "src/app/contact/page.tsx"
tf "src/app/quote/page.tsx"
tf "src/app/thank-you/page.tsx"
tf "src/app/service-areas/page.tsx"
tf "src/app/service-areas/[slug]/page.tsx"
tf "src/app/guides/page.tsx"
tf "src/app/guides/[slug]/page.tsx"
tf "src/app/legal/[slug]/page.tsx"
tf "src/app/api/enquiry/route.ts"
tf "src/data/categories.ts"
tf "src/data/equipment/excavators.ts"
tf "src/data/equipment/bulldozers.ts"
tf "src/data/equipment/loaders.ts"
tf "src/data/equipment/lifting.ts"
tf "src/data/equipment/concrete.ts"
tf "src/data/equipment/compaction.ts"
tf "src/data/equipment/tools.ts"
tf "src/data/equipment/attachments.ts"
tf "src/data/equipment/index.ts"
tf "src/data/service-areas.ts"
tf "src/data/faqs.ts"
tf "src/data/testimonials.ts"
tf "src/data/how-it-works.ts"
tf "src/components/ui/button.tsx"
tf "src/components/ui/input.tsx"
tf "src/components/ui/textarea.tsx"
tf "src/components/ui/select.tsx"
tf "src/components/ui/badge.tsx"
tf "src/components/ui/accordion.tsx"
tf "src/components/ui/sheet.tsx"
tf "src/components/ui/tabs.tsx"
tf "src/components/ui/skeleton.tsx"
tf "src/components/ui/toast.tsx"
tf "src/components/layout/site-header.tsx"
tf "src/components/layout/site-footer.tsx"
tf "src/components/layout/mobile-nav.tsx"
tf "src/components/layout/mobile-action-bar.tsx"
tf "src/components/layout/announcement-bar.tsx"
tf "src/components/layout/breadcrumbs.tsx"
tf "src/components/layout/page-hero.tsx"
tf "src/components/layout/section.tsx"
tf "src/components/layout/container.tsx"
tf "src/components/layout/cookie-banner.tsx"
tf "src/components/sections/home-hero.tsx"
tf "src/components/sections/category-grid.tsx"
tf "src/components/sections/featured-equipment.tsx"
tf "src/components/sections/why-choose-us.tsx"
tf "src/components/sections/process-steps.tsx"
tf "src/components/sections/testimonials.tsx"
tf "src/components/sections/service-area-strip.tsx"
tf "src/components/sections/stats-strip.tsx"
tf "src/components/sections/faq-section.tsx"
tf "src/components/sections/cta-banner.tsx"
tf "src/components/equipment/equipment-card.tsx"
tf "src/components/equipment/equipment-grid.tsx"
tf "src/components/equipment/equipment-filters.tsx"
tf "src/components/equipment/search-box.tsx"
tf "src/components/equipment/spec-table.tsx"
tf "src/components/equipment/rate-table.tsx"
tf "src/components/equipment/image-gallery.tsx"
tf "src/components/equipment/related-equipment.tsx"
tf "src/components/equipment/request-quote-button.tsx"
tf "src/components/forms/quote-form.tsx"
tf "src/components/forms/contact-form.tsx"
tf "src/components/forms/form-field.tsx"
tf "src/components/forms/submit-button.tsx"
tf "src/components/forms/honeypot.tsx"
tf "src/components/seo/json-ld.tsx"
tf "src/components/seo/local-business-schema.tsx"
tf "src/components/seo/breadcrumb-schema.tsx"
tf "src/components/seo/product-schema.tsx"
tf "src/lib/env.ts"
tf "src/lib/utils.ts"
tf "src/lib/format.ts"
tf "src/lib/seo.ts"
tf "src/lib/mdx.ts"
tf "src/lib/equipment.ts"
tf "src/lib/enquiry-schema.ts"
tf "src/lib/spam-guard.ts"
tf "src/lib/email.ts"
tf "src/lib/analytics.ts"
tf "src/config/site.ts"
tf "src/config/navigation.ts"
tf "src/hooks/use-media-query.ts"
tf "src/hooks/use-debounce.ts"
tf "src/hooks/use-lock-scroll.ts"
tf "src/types/equipment.ts"
tf "src/types/enquiry.ts"

# ---- files with starter content
if [ ! -e ".env.example" ]; then
cat > ".env.example" <<'EOF__ENV_EXAMPLE'
# --- Site ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME="M/S Mir Sulaiman Trade Center"
NEXT_PUBLIC_PHONE="+1XXXXXXXXXX"
NEXT_PUBLIC_WHATSAPP="+1XXXXXXXXXX"

# --- Enquiry emails (Resend, free tier is enough) ---
RESEND_API_KEY=
ENQUIRY_TO_EMAIL=you@yourdomain.com
ENQUIRY_FROM_EMAIL="Rentals <rentals@yourdomain.com>"

# --- Optional ---
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
EOF__ENV_EXAMPLE
fi
if [ ! -e ".gitignore" ]; then
cat > ".gitignore" <<'EOF__GITIGNORE'
node_modules
.next
out
coverage
playwright-report
test-results
.vercel
.env
.env*.local
*.tsbuildinfo
next-env.d.ts
.DS_Store
EOF__GITIGNORE
fi

# ---- keep empty folders in git
[ -e "public/.gitkeep" ] || : > "public/.gitkeep"
[ -e "public/fonts/.gitkeep" ] || : > "public/fonts/.gitkeep"
[ -e "public/images/.gitkeep" ] || : > "public/images/.gitkeep"
[ -e "public/images/areas/.gitkeep" ] || : > "public/images/areas/.gitkeep"
[ -e "public/images/brand/.gitkeep" ] || : > "public/images/brand/.gitkeep"
[ -e "public/images/equipment/.gitkeep" ] || : > "public/images/equipment/.gitkeep"
[ -e "public/images/hero/.gitkeep" ] || : > "public/images/hero/.gitkeep"

echo "Scaffold complete."
