import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getDhakaBusinessStatus } from "@/lib/business-hours";

describe("Business Hours - Asia/Dhaka Operating Schedule", () => {
  // Asia/Dhaka is UTC+6
  // Saturday 10:59 AM BST = 2026-10-31T04:59:00.000Z
  test("Saturday 10:59 AM (1 minute before open) -> Closed, opens today at 11:00 AM", () => {
    const d = new Date("2026-10-31T04:59:00.000Z");
    const status = getDhakaBusinessStatus(d);
    assert.strictEqual(status.isOpen, false);
    assert.strictEqual(status.statusText, "Closed now, opens today at 11:00 AM");
    assert.strictEqual(status.dhakaDay, "Sat");
  });

  // Saturday 11:00 AM BST = 2026-10-31T05:00:00.000Z
  test("Saturday 11:00 AM (exact open) -> Open now, closes at 11:00 PM", () => {
    const d = new Date("2026-10-31T05:00:00.000Z");
    const status = getDhakaBusinessStatus(d);
    assert.strictEqual(status.isOpen, true);
    assert.strictEqual(status.statusText, "Open now, closes at 11:00 PM");
    assert.strictEqual(status.dhakaDay, "Sat");
  });

  // Thursday 10:59 PM BST = 2026-10-29T16:59:00.000Z
  test("Thursday 22:59 (1 minute before close) -> Open now, closes at 11:00 PM", () => {
    const d = new Date("2026-10-29T16:59:00.000Z");
    const status = getDhakaBusinessStatus(d);
    assert.strictEqual(status.isOpen, true);
    assert.strictEqual(status.statusText, "Open now, closes at 11:00 PM");
    assert.strictEqual(status.dhakaDay, "Thu");
  });

  // Thursday 11:00 PM BST = 2026-10-29T17:00:00.000Z
  test("Thursday 23:00 (exact close) -> Closed now, opens Saturday at 11:00 AM", () => {
    const d = new Date("2026-10-29T17:00:00.000Z");
    const status = getDhakaBusinessStatus(d);
    assert.strictEqual(status.isOpen, false);
    assert.strictEqual(status.statusText, "Closed now, opens Saturday at 11:00 AM");
    assert.strictEqual(status.dhakaDay, "Thu");
  });

  // Friday noon BST = 2026-10-30T06:00:00.000Z
  test("Friday noon (closed all day Friday) -> Closed now, opens Saturday at 11:00 AM", () => {
    const d = new Date("2026-10-30T06:00:00.000Z");
    const status = getDhakaBusinessStatus(d);
    assert.strictEqual(status.isOpen, false);
    assert.strictEqual(status.statusText, "Closed now, opens Saturday at 11:00 AM");
    assert.strictEqual(status.dhakaDay, "Fri");
  });

  // Visitor in a different time zone (e.g. New York EDT UTC-4 or Tokyo JST UTC+9)
  // When it is 12:00 PM in Dhaka (UTC+6) -> 2026-10-27T06:00:00.000Z
  // In New York, local time is 2:00 AM. In Dhaka, it is Tuesday 12:00 PM -> OPEN.
  test("Visitor in different time zone calculates correctly based on Asia/Dhaka", () => {
    const tuesdayDhakaNoon = new Date("2026-10-27T06:00:00.000Z");
    const status = getDhakaBusinessStatus(tuesdayDhakaNoon);
    assert.strictEqual(status.isOpen, true);
    assert.strictEqual(status.dhakaDay, "Tue");
    assert.strictEqual(status.statusText, "Open now, closes at 11:00 PM");
  });
});
