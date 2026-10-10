import { describe, expect, test } from "vitest";
import { days as dummyDays, type Day } from "../app/_data/dummy";
import { buildRoundDays, formatDayList, splitHolidays } from "./days";

const days: Day[] = [
  { id: "1027", num: "27", label: "10月27日", dow: "火" },
  { id: "1029", num: "29", label: "10月29日", dow: "木" },
  { id: "1103", num: "3", label: "11月3日", dow: "火", holiday: true },
];

describe("formatDayList", () => {
  test("指定した日を「、」でつなぐ", () => {
    expect(formatDayList(days, ["1027", "1029"])).toBe("10月27日(火)、10月29日(木)");
  });

  test("並びは ids ではなく days の順", () => {
    expect(formatDayList(days, ["1029", "1027"])).toBe("10月27日(火)、10月29日(木)");
  });

  test("指定がなければ空文字", () => {
    expect(formatDayList(days, [])).toBe("");
  });
});

describe("splitHolidays", () => {
  test("候補日と祝日に分ける", () => {
    const { candidates, holidays } = splitHolidays(days);
    expect(candidates.map((d) => d.id)).toEqual(["1027", "1029"]);
    expect(holidays.map((d) => d.id)).toEqual(["1103"]);
  });
});

describe("buildRoundDays", () => {
  test("開催期間の平日を並べ、祝日には holiday を付ける（ダミーの第12回と同じになる）", () => {
    expect(buildRoundDays("2026-10-26", "2026-11-06", ["2026-11-03"])).toEqual(dummyDays);
  });

  test("土日は入らない", () => {
    const result = buildRoundDays("2026-10-30", "2026-11-02", []);
    expect(result.map((d) => d.id)).toEqual(["1030", "1102"]);
  });

  test("開始日と終了日も含める", () => {
    const result = buildRoundDays("2026-10-27", "2026-10-29", []);
    expect(result.map((d) => d.id)).toEqual(["1027", "1028", "1029"]);
  });

  test("1日だけの期間", () => {
    expect(buildRoundDays("2026-10-28", "2026-10-28", [])).toEqual([
      { id: "1028", num: "28", label: "10月28日", dow: "水" },
    ]);
  });

  test("期間外の祝日は関係ない", () => {
    const result = buildRoundDays("2026-10-26", "2026-10-30", ["2026-11-03"]);
    expect(result.some((d) => d.holiday)).toBe(false);
  });

  test("祝日は候補日にならない（splitHolidays で祝日側に入る）", () => {
    const { candidates, holidays } = splitHolidays(buildRoundDays("2026-11-02", "2026-11-04", ["2026-11-03"]));
    expect(candidates.map((d) => d.id)).toEqual(["1102", "1104"]);
    expect(holidays.map((d) => d.id)).toEqual(["1103"]);
  });

  test("年をまたぐ期間", () => {
    const result = buildRoundDays("2026-12-30", "2027-01-05", ["2027-01-01"]);
    expect(result.map((d) => [d.id, d.holiday ?? false])).toEqual([
      ["1230", false],
      ["1231", false],
      ["0101", true],
      ["0104", false],
      ["0105", false],
    ]);
  });
});
