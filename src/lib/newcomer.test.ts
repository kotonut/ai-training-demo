import { describe, expect, test } from "vitest";
import { isNewcomer } from "./newcomer";

describe("isNewcomer", () => {
  test("入社から半年以内なら新入社員", () => {
    expect(isNewcomer("2026-06-15", new Date(2026, 9, 10))).toBe(true);
  });

  test("半年後の同じ日までは新入社員", () => {
    expect(isNewcomer("2026-04-10", new Date(2026, 9, 10))).toBe(true);
  });

  test("半年後の翌日からは新入社員ではない", () => {
    expect(isNewcomer("2026-04-09", new Date(2026, 9, 10))).toBe(false);
  });

  test("時刻は見ない（半年後の日の夜でも新入社員）", () => {
    expect(isNewcomer("2026-04-10", new Date(2026, 9, 10, 23, 59))).toBe(true);
  });

  test("半年後に同じ日がない月は月末まで（8月31日入社 → 2月末）", () => {
    expect(isNewcomer("2026-08-31", new Date(2027, 1, 28))).toBe(true);
    expect(isNewcomer("2026-08-31", new Date(2027, 2, 1))).toBe(false);
  });

  test("うるう年は2月29日まで", () => {
    expect(isNewcomer("2027-08-31", new Date(2028, 1, 29))).toBe(true);
    expect(isNewcomer("2027-08-31", new Date(2028, 2, 1))).toBe(false);
  });
});
