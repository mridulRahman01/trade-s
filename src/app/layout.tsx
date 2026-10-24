import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Public_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { QuoteDrawerProvider } from "@/context/quote-drawer-context";
import { QuoteDrawer } from "@/components/forms/quote-drawer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Heavy Construction Equipment Rentals`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Heavy Construction Equipment Rentals`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${publicSans.variable} min-h-screen antialiased`}
    >
      <body className="min-h-screen min-h-[100dvh] flex flex-col font-sans bg-white text-[#3D3D3D]">
        <QuoteDrawerProvider>
          <LocalBusinessSchema />

          {/* Accessible Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#FFC20E] focus:text-[#111111] focus:font-bold focus:shadow-lg focus:rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#111111]"
          >
            Skip to main content
          </a>

          {/* Slim Sticky Header */}
          <SiteHeader />

          {/* Main Content Area */}
          <main id="main-content" className="flex-1 outline-none">
            {children}
          </main>

          {/* Single-line Footer */}
          <SiteFooter />

          {/* Slide-in / Mobile Full-Screen Quote Drawer */}
          <QuoteDrawer />
        </QuoteDrawerProvider>
      </body>
    </html>
  );
}
