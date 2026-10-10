// 入社日（YYYY-MM-DD）から半年以内なら新入社員とする（SPEC.md 2章）。
// 半年後の同じ日までを含む。その日がない月は月末までとする（8月31日入社 → 2月末まで）。
export function isNewcomer(joinedOn: string, today: Date): boolean {
  const [y, m, d] = joinedOn.split("-").map(Number);
  const endMonth = new Date(y, m - 1 + 6, 1);
  const lastDay = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0).getDate();
  const end = new Date(endMonth.getFullYear(), endMonth.getMonth(), Math.min(d, lastDay));
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return todayStart <= end;
}
