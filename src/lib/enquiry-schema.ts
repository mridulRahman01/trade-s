import { z } from "zod";

export const enquiryTypeEnum = z.enum(["quote", "contact"]);

export const baseEnquirySchema = z.object({
  type: enquiryTypeEnum.default("quote"),
  name: z
    .string()
    .min(2, "Please enter your full name (minimum 2 characters)")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address (e.g. name@company.com)")
    .max(120, "Email cannot exceed 120 characters"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number (minimum 7 digits)")
    .max(25, "Phone number cannot exceed 25 characters"),
  company: z.string().max(100).optional().or(z.literal("")),

  // Quote-specific fields (optional for contact form, required/recommended for quote)
  machineSlug: z.string().optional().or(z.literal("")),
  machineName: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  duration: z.string().optional().or(z.literal("")),
  deliveryMethod: z.enum(["delivery", "pickup"]).default("delivery"),
  jobSiteCity: z.string().max(100).optional().or(z.literal("")),
  jobSiteZip: z.string().max(20).optional().or(z.literal("")),
  operatorNeeded: z.enum(["yes", "no"]).default("no"),

  // Notes / Message
  notes: z
    .string()
    .max(2000, "Message cannot exceed 2,000 characters")
    .optional()
    .or(z.literal("")),

  // Anti-Spam Guard Fields
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")), // Honeypot (must remain empty)
  _time: z.number().optional(), // Timestamp when form was loaded in ms
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type EnquiryFormData = z.infer<typeof baseEnquirySchema>;
