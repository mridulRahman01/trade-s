import { useSyncExternalStore } from "react";

export interface BusinessHoursStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
  dhakaDay: "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  dhakaTimeFormatted: string;
}

/**
 * Returns the current operating status for M/S Mir Sulaiman Trade Center
 * evaluated strictly in the Asia/Dhaka time zone (UTC+6).
 *
 * Hours:
 * - Saturday to Thursday: 11:00 AM – 11:00 PM (11:00 to 23:00)
 * - Friday: Closed all day
 */
export function getDhakaBusinessStatus(inputDate?: Date): BusinessHoursStatus {
  const date = inputDate ?? new Date();

  // Extract date and time parts strictly in Asia/Dhaka timezone
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });

  const parts = dtf.formatToParts(date);
  let weekdayPart = "Sat";
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === "weekday") weekdayPart = part.value;
    if (part.type === "hour") hour = parseInt(part.value, 10);
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }

  const dhakaDay = weekdayPart as "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  const totalMinutes = hour * 60 + minute;
  const openMinutes = 11 * 60; // 11:00 AM = 660
  const closeMinutes = 23 * 60; // 11:00 PM = 1380

  const isFriday = dhakaDay === "Fri";
  const isOpenDay = !isFriday;
  const isWithinHours = isOpenDay && totalMinutes >= openMinutes && totalMinutes < closeMinutes;

  let statusText = "";
  let nextChangeText = "";

  if (isWithinHours) {
    statusText = "Open now, closes at 11:00 PM";
    nextChangeText = "Closes today at 11:00 PM";
  } else {
    // Determine exact next opening day and time
    if (isFriday) {
      statusText = "Closed now, opens Saturday at 11:00 AM";
      nextChangeText = "Opens Saturday at 11:00 AM";
    } else if (dhakaDay === "Thu" && totalMinutes >= closeMinutes) {
      // After Thursday 11:00 PM, next opening is Saturday 11:00 AM
      statusText = "Closed now, opens Saturday at 11:00 AM";
      nextChangeText = "Opens Saturday at 11:00 AM";
    } else if (totalMinutes < openMinutes) {
      // Before 11:00 AM on Sat-Thu
      statusText = `Closed now, opens today at 11:00 AM`;
      nextChangeText = `Opens today at 11:00 AM`;
    } else {
      // After 11:00 PM on Sat-Wed
      statusText = "Closed now, opens tomorrow at 11:00 AM";
      nextChangeText = "Opens tomorrow at 11:00 AM";
    }
  }

  // Format nice Dhaka time string (e.g., 2:30 PM BST)
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    isOpen: isWithinHours,
    statusText,
    nextChangeText,
    dhakaDay,
    dhakaTimeFormatted: timeFormatter.format(date),
  };
}

let cachedSnapshot: BusinessHoursStatus | null = null;
let lastMinuteChecked = -1;

export function getCachedDhakaStatus(): BusinessHoursStatus {
  const now = new Date();
  const currentMinute = Math.floor(now.getTime() / 60000);
  if (!cachedSnapshot || lastMinuteChecked !== currentMinute) {
    cachedSnapshot = getDhakaBusinessStatus(now);
    lastMinuteChecked = currentMinute;
  }
  return cachedSnapshot;
}

function subscribeToStatus(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const timer = setInterval(() => {
    callback();
  }, 30000);
  return () => clearInterval(timer);
}

/**
 * React hook using useSyncExternalStore to retrieve live Dhaka business status
 * with zero hydration mismatch and zero cascading render warnings.
 */
export function useDhakaBusinessStatus(): BusinessHoursStatus | null {
  return useSyncExternalStore(
    subscribeToStatus,
    getCachedDhakaStatus,
    () => null
  );
}
