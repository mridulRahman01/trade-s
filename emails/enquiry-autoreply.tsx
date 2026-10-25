import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import { EnquiryFormData } from "@/lib/enquiry-schema";
import { siteConfig } from "@/config/site";

export function EnquiryAutoreplyEmail({ data }: { data: EnquiryFormData }) {
  const isQuote = data.type === "quote";

  return (
    <Html>
      <Head />
      <Preview>We received your equipment quote request - {siteConfig.name}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc", color: "#0f172a", margin: 0, padding: "20px" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {/* Header */}
          <Section style={{ backgroundColor: "#0f172a", padding: "24px", color: "#ffffff" }}>
            <Text style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#f59e0b", margin: 0, fontWeight: "bold" }}>
              {siteConfig.name}
            </Text>
            <Heading style={{ fontSize: "20px", margin: "8px 0 0", color: "#ffffff" }}>
              Thank You for Your Equipment Inquiry
            </Heading>
          </Section>

          {/* Body Content */}
          <Section style={{ padding: "24px" }}>
            <Text style={{ fontSize: "15px", lineHeight: "1.6", margin: "0 0 16px" }}>
              Hello {data.name},
            </Text>
            <Text style={{ fontSize: "15px", lineHeight: "1.6", margin: "0 0 16px" }}>
              Thank you for contacting <strong>{siteConfig.name}</strong>. We have received your {isQuote ? "equipment rental quote request" : "inquiry"}.
            </Text>

            <Section style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "6px", border: "1px solid #e2e8f0", margin: "20px 0" }}>
              <Text style={{ margin: "4px 0", fontSize: "13px", fontWeight: "bold", color: "#0f172a" }}>
                Summary of Request:
              </Text>
              {data.machineName && (
                <Text style={{ margin: "4px 0", fontSize: "13px" }}>
                  • Machine: {data.machineName}
                </Text>
              )}
              {data.startDate && (
                <Text style={{ margin: "4px 0", fontSize: "13px" }}>
                  • Target Start Date: {data.startDate}
                </Text>
              )}
              {data.duration && (
                <Text style={{ margin: "4px 0", fontSize: "13px" }}>
                  • Rental Duration: {data.duration}
                </Text>
              )}
              {(data.jobSiteCity || data.jobSiteZip) && (
                <Text style={{ margin: "4px 0", fontSize: "13px" }}>
                  • Job-Site Location: {[data.jobSiteCity, data.jobSiteZip].filter(Boolean).join(", ")}
                </Text>
              )}
            </Section>

            <Heading as="h3" style={{ fontSize: "15px", margin: "20px 0 8px", color: "#0f172a" }}>
              What Happens Next?
            </Heading>
            <Text style={{ fontSize: "14px", lineHeight: "1.6", margin: "0 0 12px", color: "#334155" }}>
              Our equipment dispatch team is currently reviewing machine availability and calculating flat-rate transport freight for your location. You can expect an itemized price proposal within <strong>2 to 4 business hours</strong>.
            </Text>

            <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />

            <Heading as="h3" style={{ fontSize: "15px", margin: "0 0 8px", color: "#0f172a" }}>
              Need Urgent Field Dispatch?
            </Heading>
            <Text style={{ fontSize: "14px", lineHeight: "1.6", margin: "0 0 8px", color: "#334155" }}>
              If your job site requires emergency same-day machinery deployment or immediate logistics confirmation, please call our dispatch line directly:
            </Text>
            <Text style={{ fontSize: "15px", fontWeight: "bold", margin: "4px 0" }}>
              Phone: <Link href={`tel:${siteConfig.contact.phoneRaw}`}>{siteConfig.contact.phone}</Link>
            </Text>
            <Text style={{ fontSize: "15px", fontWeight: "bold", margin: "4px 0" }}>
              WhatsApp: <Link href={siteConfig.contact.whatsappUrl}>{siteConfig.contact.phone}</Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#f1f5f9", padding: "16px 24px", borderTop: "1px solid #e2e8f0" }}>
            <Text style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px" }}>
              {siteConfig.name} · {siteConfig.address.formatted}
            </Text>
            <Text style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
              Operating Hours: {siteConfig.operatingHours.display}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default EnquiryAutoreplyEmail;
