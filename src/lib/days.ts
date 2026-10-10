import type { Day } from "../app/_data/dummy";

// 指定した日を「10月27日(火)、10月29日(木)」の形でつなぐ。並びは days の順。
export function formatDayList(days: Day[], ids: string[]): string {
  return days
    .filter((d) => ids.includes(d.id))
    .map((d) => `${d.label}(${d.dow})`)
    .join("、");
}

// 期間の日を、候補日（祝日でない日）と祝日に分ける。
export function splitHolidays(days: Day[]): { candidates: Day[]; holidays: Day[] } {
  return {
    candidates: days.filter((d) => !d.holiday),
    holidays: days.filter((d) => d.holiday),
  };
}
