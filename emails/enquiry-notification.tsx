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

export function EnquiryNotificationEmail({ data }: { data: EnquiryFormData }) {
  const isQuote = data.type === "quote";
  const title = isQuote
    ? `New Equipment Quote Request: ${data.machineName || "General Fleet Inquiry"}`
    : `New Website Contact Inquiry from ${data.name}`;

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc", color: "#0f172a", margin: 0, padding: "20px" }}>
        <Container style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {/* Header */}
          <Section style={{ backgroundColor: "#0f172a", padding: "24px", color: "#ffffff" }}>
            <Text style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#f59e0b", margin: 0, fontWeight: "bold" }}>
              M/S Mir Sulaiman Trade Center
            </Text>
            <Heading style={{ fontSize: "20px", margin: "8px 0 0", color: "#ffffff" }}>
              {isQuote ? "New Equipment Quote Request" : "New Contact Inquiry"}
            </Heading>
          </Section>

          {/* Body Content */}
          <Section style={{ padding: "24px" }}>
            <Heading as="h3" style={{ fontSize: "16px", margin: "0 0 12px", color: "#0f172a" }}>
              Customer Information
            </Heading>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Name:</strong> {data.name}
            </Text>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Email:</strong> <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </Text>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Phone:</strong> <Link href={`tel:${data.phone}`}>{data.phone}</Link>
            </Text>
            {data.company && (
              <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                <strong>Company:</strong> {data.company}
              </Text>
            )}

            {isQuote && (
              <>
                <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
                <Heading as="h3" style={{ fontSize: "16px", margin: "0 0 12px", color: "#0f172a" }}>
                  Equipment & Project Scope
                </Heading>
                <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                  <strong>Machine Requested:</strong> {data.machineName || data.machineSlug || "Customer open to recommendation"}
                </Text>
                {data.startDate && (
                  <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                    <strong>Estimated Start Date:</strong> {data.startDate}
                  </Text>
                )}
                {data.duration && (
                  <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                    <strong>Rental Duration:</strong> {data.duration}
                  </Text>
                )}
                <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                  <strong>Fulfillment Method:</strong> {data.deliveryMethod === "delivery" ? "Job-Site Delivery Required" : "Customer Staging Pickup"}
                </Text>
                {(data.jobSiteCity || data.jobSiteZip) && (
                  <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                    <strong>Job-Site Location:</strong> {[data.jobSiteCity, data.jobSiteZip].filter(Boolean).join(", ")}
                  </Text>
                )}
                <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                  <strong>Operator Needed:</strong> {data.operatorNeeded === "yes" ? "Yes (Operator Requested)" : "No (Bare Machine Rental)"}
                </Text>
              </>
            )}

            {data.notes && (
              <>
                <Hr style={{ borderColor: "#e2e8f0", margin: "20px 0" }} />
                <Heading as="h3" style={{ fontSize: "16px", margin: "0 0 12px", color: "#0f172a" }}>
                  Customer Project Notes
                </Heading>
                <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap", backgroundColor: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  {data.notes}
                </Text>
              </>
            )}
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#f1f5f9", padding: "16px 24px", borderTop: "1px solid #e2e8f0" }}>
            <Text style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
              Submitted via M/S Mir Sulaiman Trade Center website form. Reply directly to this email to contact the customer.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default EnquiryNotificationEmail;
