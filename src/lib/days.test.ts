import { describe, expect, test } from "vitest";
import type { Day } from "../app/_data/dummy";
import { formatDayList, splitHolidays } from "./days";

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
