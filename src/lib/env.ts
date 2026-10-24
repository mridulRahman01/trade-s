import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_COMPANY_NAME: z.string().default("M/S Mir Sulaiman Trade Center"),
  NEXT_PUBLIC_TAGLINE: z.string().default("Heavy Equipment Rental & Contractor Machinery"),
  NEXT_PUBLIC_PHONE: z.string().default("01711-269863"),
  NEXT_PUBLIC_WHATSAPP: z.string().default("+8801711269863"),
  NEXT_PUBLIC_EMAIL: z.string().email().default("info@msmirsulaimantradecenter.com"),
  RESEND_API_KEY: z.string().optional(),
  ENQUIRY_TO_EMAIL: z.string().email().default("info@msmirsulaimantradecenter.com"),
  ENQUIRY_FROM_EMAIL: z.string().default("M/S Mir Sulaiman Trade Center <info@msmirsulaimantradecenter.com>"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  NEXT_PUBLIC_TAGLINE: process.env.NEXT_PUBLIC_TAGLINE,
  NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
  NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP,
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ENQUIRY_TO_EMAIL: process.env.ENQUIRY_TO_EMAIL,
  ENQUIRY_FROM_EMAIL: process.env.ENQUIRY_FROM_EMAIL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});
