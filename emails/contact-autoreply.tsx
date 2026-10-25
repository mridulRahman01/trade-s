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
import { siteConfig } from "@/config/site";

export interface ContactAutoreplyEmailProps {
  name: string;
  interest: string;
  productName?: string;
  message: string;
}

export function ContactAutoreplyEmail({
  name,
  interest,
  productName,
  message,
}: ContactAutoreplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>We received your inquiry - {siteConfig.name}</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#F7F7F5",
          color: "#111111",
          margin: 0,
          padding: "20px",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "6px",
            border: "1px solid #E5E5E0",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#111111",
              padding: "24px",
              color: "#FFFFFF",
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#FFC20E",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              {siteConfig.name}
            </Text>
            <Heading
              style={{
                fontSize: "20px",
                margin: "8px 0 0",
                color: "#FFFFFF",
              }}
            >
              Thank You for Contacting Us
            </Heading>
          </Section>

          {/* Body */}
          <Section style={{ padding: "24px" }}>
            <Text
              style={{
                fontSize: "15px",
                lineHeight: "1.6",
                margin: "0 0 16px",
                color: "#111111",
              }}
            >
              Hello {name},
            </Text>
            <Text
              style={{
                fontSize: "15px",
                lineHeight: "1.6",
                margin: "0 0 16px",
                color: "#3D3D3D",
              }}
            >
              Thank you for getting in touch with <strong>{siteConfig.name}</strong>. We have received your inquiry.
            </Text>

            {/* Summary Box */}
            <Section
              style={{
                backgroundColor: "#F7F7F5",
                padding: "16px",
                borderRadius: "4px",
                border: "1px solid #E5E5E0",
                margin: "16px 0",
              }}
            >
              <Text
                style={{
                  margin: "0 0 8px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#111111",
                }}
              >
                Inquiry Summary:
              </Text>
              <Text style={{ margin: "4px 0", fontSize: "13px", color: "#3D3D3D" }}>
                • <strong>Interest:</strong> {interest}
              </Text>
              {productName && (
                <Text style={{ margin: "4px 0", fontSize: "13px", color: "#3D3D3D" }}>
                  • <strong>Product:</strong> {productName}
                </Text>
              )}
              <Text style={{ margin: "4px 0", fontSize: "13px", color: "#3D3D3D" }}>
                • <strong>Message:</strong> {message.length > 140 ? `${message.slice(0, 140)}...` : message}
              </Text>
            </Section>

            <Hr style={{ borderColor: "#E5E5E0", margin: "20px 0" }} />

            {/* Direct Contact Options */}
            <Heading
              as="h3"
              style={{ fontSize: "15px", margin: "0 0 8px", color: "#111111" }}
            >
              Direct Contact
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 12px",
                color: "#3D3D3D",
              }}
            >
              If your inquiry is urgent, you can reach our machinery desk directly by phone or WhatsApp:
            </Text>

            <Text style={{ fontSize: "14px", margin: "4px 0", color: "#111111" }}>
              <strong>Phone:</strong>{" "}
              <Link href={`tel:${siteConfig.contact.phoneRaw}`}>
                {siteConfig.contact.phone}
              </Link>
            </Text>
            <Text style={{ fontSize: "14px", margin: "4px 0", color: "#111111" }}>
              <strong>WhatsApp:</strong>{" "}
              <Link href={siteConfig.contact.whatsappUrl}>
                Chat on WhatsApp ({siteConfig.contact.phone})
              </Link>
            </Text>
            <Text style={{ fontSize: "14px", margin: "4px 0", color: "#111111" }}>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </Link>
            </Text>

            <Hr style={{ borderColor: "#E5E5E0", margin: "20px 0" }} />

            {/* Business Details */}
            <Text style={{ fontSize: "13px", color: "#3D3D3D", margin: "4px 0" }}>
              <strong>Proprietor:</strong> {siteConfig.proprietor}
            </Text>
            <Text style={{ fontSize: "13px", color: "#3D3D3D", margin: "4px 0" }}>
              <strong>Address:</strong> {siteConfig.address.formatted}
            </Text>
            <Text style={{ fontSize: "13px", color: "#3D3D3D", margin: "4px 0" }}>
              <strong>Hours:</strong> {siteConfig.operatingHours.display}
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#F7F7F5",
              padding: "16px 24px",
              borderTop: "1px solid #E5E5E0",
            }}
          >
            <Text style={{ fontSize: "12px", color: "#6B6B6B", margin: 0 }}>
              {siteConfig.name} · {siteConfig.address.formatted}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactAutoreplyEmail;
