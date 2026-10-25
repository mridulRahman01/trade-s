import { z } from "zod";

/**
 * Valid Bangladesh mobile prefixes:
 * 013, 014, 015, 016, 017, 018, 019
 */
const BD_MOBILE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

/**
 * Normalizes and validates a Bangladesh mobile phone number.
 * Accepts:
 * - 01XXXXXXXXX (11 digits)
 * - 01XXX-XXXXXX (with hyphen or spaces)
 * - +8801XXXXXXXXX
 * - 8801XXXXXXXXX
 *
 * Returns normalized E.164 format (+8801XXXXXXXXX) and display format (01XXX-XXXXXX),
 * or an error string if invalid.
 */
export function normalizeBangladeshPhone(input: string): {
  isValid: boolean;
  e164?: string;
  formatted?: string;
  rawDigits?: string;
  error?: string;
} {
  if (!input || typeof input !== "string") {
    return { isValid: false, error: "Phone number is required." };
  }

  // Remove whitespace, dashes, parentheses, dots
  const cleaned = input.trim().replace(/[\s\-().]/g, "");

  // Check if string contains illegal non-digit characters (other than leading +)
  if (!/^\+?\d+$/.test(cleaned)) {
    return {
      isValid: false,
      error: "Phone number must contain digits only.",
    };
  }

  if (!BD_MOBILE_REGEX.test(cleaned)) {
    return {
      isValid: false,
      error:
        "Please enter a valid Bangladesh mobile number (e.g. 01711-269863 or +8801711269863).",
    };
  }

  // Extract the standard 11-digit local format: 01XXXXXXXXX
  let localDigits = cleaned;
  if (localDigits.startsWith("+88")) {
    localDigits = localDigits.slice(3);
  } else if (localDigits.startsWith("880")) {
    localDigits = localDigits.slice(2);
  }

  if (localDigits.length !== 11 || !localDigits.startsWith("01")) {
    return {
      isValid: false,
      error: "Phone number must be an 11-digit Bangladesh mobile number.",
    };
  }

  // Format as standard 01XXX-XXXXXX and +8801XXXXXXXXX
  const formatted = `${localDigits.slice(0, 5)}-${localDigits.slice(5)}`;
  const e164 = `+88${localDigits}`;

  return {
    isValid: true,
    e164,
    formatted,
    rawDigits: localDigits,
  };
}

export const interestOptions = [
  "Renting equipment",
  "Buying equipment or tools",
  "Price list",
  "Safety equipment",
  "Imported tools and supplies",
  "Something else",
] as const;

export type InterestOption = (typeof interestOptions)[number];

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (val) => normalizeBangladeshPhone(val).isValid,
      {
        message:
          "Please enter a valid 11-digit Bangladesh mobile number (e.g. 01711-269863)",
      }
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(120, "Email cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),

  interest: z.enum(interestOptions, {
    message: "Please select what you are interested in",
  }),

  product: z.string().trim().max(120).optional().or(z.literal("")),

  neededFrom: z.string().trim().max(30).optional().or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(100, "Location cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1,000 characters"),

  // Anti-Spam Guard Fields
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")), // Honeypot (must stay empty)
  _time: z.number().optional(), // Timestamp when form loaded
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
