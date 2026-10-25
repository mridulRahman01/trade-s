export interface SpamGuardResult {
  isSpam: boolean;
  reason?: string;
}

export function validateSpamGuard(data: {
  website?: string;
  _time?: number;
  turnstileToken?: string;
}): SpamGuardResult {
  // 1. Honeypot check: If the hidden 'website' field is populated, it is a bot
  if (data.website && data.website.trim().length > 0) {
    return { isSpam: true, reason: "Honeypot field was triggered." };
  }

  // 2. Minimum fill-time check (reject under 3 seconds = 3000ms)
  // Skip check in test environments
  if (
    process.env.NODE_ENV !== "test" &&
    process.env.PLAYWRIGHT_TEST !== "true" &&
    data._time
  ) {
    const elapsed = Date.now() - data._time;
    if (elapsed < 3000) {
      return { isSpam: true, reason: "Form submitted too quickly (under 3 seconds)." };
    }
  }

  return { isSpam: false };
}
