import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { normalizeBangladeshPhone } from "@/lib/contact-schema";

describe("Phone Normalizer - Bangladesh Mobile Numbers", () => {
  describe("Valid formats", () => {
    test("Standard 11-digit local format: 01711269863", () => {
      const res = normalizeBangladeshPhone("01711269863");
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.formatted, "01711-269863");
      assert.strictEqual(res.e164, "+8801711269863");
      assert.strictEqual(res.rawDigits, "01711269863");
    });

    test("Hyphenated format: 01711-269863", () => {
      const res = normalizeBangladeshPhone("01711-269863");
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.formatted, "01711-269863");
      assert.strictEqual(res.e164, "+8801711269863");
    });

    test("International E.164 format: +8801711269863", () => {
      const res = normalizeBangladeshPhone("+8801711269863");
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.formatted, "01711-269863");
      assert.strictEqual(res.e164, "+8801711269863");
    });

    test("International format without plus: 8801711269863", () => {
      const res = normalizeBangladeshPhone("8801711269863");
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.formatted, "01711-269863");
      assert.strictEqual(res.e164, "+8801711269863");
    });

    test("Formatted with spaces: 01711 269 863", () => {
      const res = normalizeBangladeshPhone("01711 269 863");
      assert.strictEqual(res.isValid, true);
      assert.strictEqual(res.formatted, "01711-269863");
    });

    test("Other valid prefixes (013, 014, 015, 016, 018, 019)", () => {
      assert.strictEqual(normalizeBangladeshPhone("01312345678").isValid, true);
      assert.strictEqual(normalizeBangladeshPhone("01412345678").isValid, true);
      assert.strictEqual(normalizeBangladeshPhone("01512345678").isValid, true);
      assert.strictEqual(normalizeBangladeshPhone("01612345678").isValid, true);
      assert.strictEqual(normalizeBangladeshPhone("01812345678").isValid, true);
      assert.strictEqual(normalizeBangladeshPhone("01912345678").isValid, true);
    });
  });

  describe("Invalid formats", () => {
    test("Too short (10 digits): 0171126986", () => {
      const res = normalizeBangladeshPhone("0171126986");
      assert.strictEqual(res.isValid, false);
      assert.ok(res.error);
    });

    test("Invalid operator prefix: 02711269863 (02 is Dhaka landline, not mobile)", () => {
      const res = normalizeBangladeshPhone("02711269863");
      assert.strictEqual(res.isValid, false);
      assert.ok(res.error);
    });

    test("Contains alphabetical characters: 01711abc63", () => {
      const res = normalizeBangladeshPhone("01711abc63");
      assert.strictEqual(res.isValid, false);
      assert.ok(res.error);
    });

    test("Empty or blank string", () => {
      assert.strictEqual(normalizeBangladeshPhone("").isValid, false);
      assert.strictEqual(normalizeBangladeshPhone("   ").isValid, false);
    });

    test("Special symbols other than dash or plus", () => {
      assert.strictEqual(normalizeBangladeshPhone("01711#269863").isValid, false);
    });
  });
});
