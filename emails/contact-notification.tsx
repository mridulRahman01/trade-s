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

export interface ContactNotificationEmailProps {
  name: string;
  phone: string;
  email?: string;
  interest: string;
  productName?: string;
  productSlug?: string;
  neededFrom?: string;
  location?: string;
  message: string;
  dhakaTime: string;
}

export function ContactNotificationEmail({
  name,
  phone,
  email,
  interest,
  productName,
  productSlug,
  neededFrom,
  location,
  message,
  dhakaTime,
}: ContactNotificationEmailProps) {
  const productUrl = productSlug
    ? `${siteConfig.url}/equipment/${productSlug}`
    : undefined;

  return (
    <Html>
      <Head />
      <Preview>New Website Contact Inquiry from {name}</Preview>
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
              New Contact Inquiry
            </Heading>
            <Text
              style={{
                fontSize: "12px",
                color: "#A3A3A3",
                margin: "4px 0 0",
              }}
            >
              Received: {dhakaTime} (Asia/Dhaka)
            </Text>
          </Section>

          {/* Customer Details */}
          <Section style={{ padding: "24px" }}>
            <Heading
              as="h3"
              style={{ fontSize: "16px", margin: "0 0 12px", color: "#111111" }}
            >
              Contact Information
            </Heading>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Full Name:</strong> {name}
            </Text>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Phone:</strong>{" "}
              <Link href={`tel:${phone}`}>{phone}</Link>
            </Text>
            {email ? (
              <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                <strong>Email:</strong>{" "}
                <Link href={`mailto:${email}`}>{email}</Link>
              </Text>
            ) : (
              <Text style={{ margin: "4px 0", fontSize: "14px", color: "#6B6B6B" }}>
                <strong>Email:</strong> (Not provided)
              </Text>
            )}

            <Hr style={{ borderColor: "#E5E5E0", margin: "20px 0" }} />

            {/* Inquiry Scope */}
            <Heading
              as="h3"
              style={{ fontSize: "16px", margin: "0 0 12px", color: "#111111" }}
            >
              Inquiry Details
            </Heading>
            <Text style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Interested In:</strong> {interest}
            </Text>
            {productName && (
              <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                <strong>Product / Machine:</strong> {productName}
                {productUrl && (
                  <>
                    {" "}
                    (
                    <Link href={productUrl}>View Product Page</Link>
                    )
                  </>
                )}
              </Text>
            )}
            {neededFrom && (
              <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                <strong>Needed From:</strong> {neededFrom}
              </Text>
            )}
            {location && (
              <Text style={{ margin: "4px 0", fontSize: "14px" }}>
                <strong>Job-Site Location:</strong> {location}
              </Text>
            )}

            <Hr style={{ borderColor: "#E5E5E0", margin: "20px 0" }} />

            {/* Message Body */}
            <Heading
              as="h3"
              style={{ fontSize: "16px", margin: "0 0 12px", color: "#111111" }}
            >
              Message Content
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
                backgroundColor: "#F7F7F5",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #E5E5E0",
                margin: "4px 0 0",
              }}
            >
              {message}
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
              Submitted via the /contact form on {siteConfig.name}. Direct reply to this email will contact the customer (if email provided).
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
