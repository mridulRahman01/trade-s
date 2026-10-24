import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and enquiry data handling for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6">
            <Link
              href="/"
              className="text-sm font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors"
            >
              ← Back to Catalog
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mb-6 font-heading">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-[#3D3D3D] text-base leading-relaxed">
            <p>
              At <strong>{siteConfig.name}</strong>, we respect your privacy. This policy outlines how we handle the contact and project information you provide when requesting an equipment quote.
            </p>

            <h2 className="text-xl font-bold text-[#111111] mt-8 mb-2 font-heading">
              Information We Collect
            </h2>
            <p>
              When you submit a quote request via our website, telephone, or WhatsApp, we collect only the necessary details required to evaluate your equipment requirements, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your name and contact phone number / WhatsApp number</li>
              <li>Your email address</li>
              <li>Requested machinery model and estimated rental start date</li>
              <li>Job-site delivery location and project description</li>
            </ul>

            <h2 className="text-xl font-bold text-[#111111] mt-8 mb-2 font-heading">
              How We Use Your Information
            </h2>
            <p>
              Your information is used strictly to respond to your inquiry, calculate availability and transport logistics, and deliver formal rate estimates. We do not sell, rent, or distribute your personal data to external marketing agencies or third parties.
            </p>

            <h2 className="text-xl font-bold text-[#111111] mt-8 mb-2 font-heading">
              Contact & Inquiries
            </h2>
            <p>
              If you have any questions regarding our privacy practices or wish to update your details, please reach out directly:
            </p>
            <div className="border border-[#E5E5E0] bg-[#F7F7F5] p-4 rounded-[6px] space-y-1 text-sm">
              <p><strong>{siteConfig.name}</strong></p>
              <p>Proprietor: {siteConfig.proprietor}</p>
              <p>Address: {siteConfig.address.formatted}</p>
              <p>Phone / WhatsApp: {siteConfig.contact.phone}</p>
              <p>Email: {siteConfig.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
