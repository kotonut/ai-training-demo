import { describe, expect, test } from "vitest";
import { getHomeStatus, upsertAnswer, type Answer } from "./answers";
import type { MatchResult } from "./matching";

const join = (personId: string, dayIds: string[] = ["1027", "1029"]): Answer => ({
  personId,
  kind: "参加",
  format: "対面",
  dayIds,
});
const skip = (personId: string): Answer => ({ personId, kind: "休む" });

describe("upsertAnswer", () => {
  test("まだ回答がなければ足す", () => {
    expect(upsertAnswer([], join("p01"))).toEqual([join("p01")]);
  });

  test("同じ人の回答は最後のものに置き換わる（ほかの人の回答は残る）", () => {
    const answers = [join("p01"), join("p02")];
    expect(upsertAnswer(answers, join("p01", ["1105"]))).toEqual([join("p01", ["1105"]), join("p02")]);
  });

  test("休んだあとに参加に戻せる", () => {
    expect(upsertAnswer([skip("p01")], join("p01"))).toEqual([join("p01")]);
  });

  test("元の配列は変えない", () => {
    const answers = [join("p01")];
    upsertAnswer(answers, skip("p01"));
    expect(answers).toEqual([join("p01")]);
  });
});

describe("getHomeStatus（実行前）", () => {
  const base = { personId: "p01", executed: false } as const;

  test("回答がなければ未回答", () => {
    expect(getHomeStatus({ ...base, answers: [join("p02")] })).toBe("none");
  });

  test("候補日を1日以上選んでいれば回答済み", () => {
    expect(getHomeStatus({ ...base, answers: [join("p01")] })).toBe("answered");
  });

  test("候補日が0日なら未回答のまま", () => {
    expect(getHomeStatus({ ...base, answers: [join("p01", [])] })).toBe("none");
  });

  test("今回は休むを選んでいればお休み", () => {
    expect(getHomeStatus({ ...base, answers: [skip("p01")] })).toBe("skipped");
  });

  test("休んだあとに選び直せば回答済みに戻る", () => {
    const answers = upsertAnswer([skip("p01")], join("p01"));
    expect(getHomeStatus({ ...base, answers })).toBe("answered");
  });
});

describe("getHomeStatus（実行後）", () => {
  const result: MatchResult = {
    groups: [{ dayId: "1029", format: "対面", memberIds: ["p01", "p02", "p03"] }],
    unmatchedIds: ["p04"],
  };
  const answers = [join("p01"), join("p02"), join("p03"), join("p04"), skip("p05"), join("p06", [])];
  const status = (personId: string) => getHomeStatus({ personId, answers, executed: true, result });

  test("グループに入っていれば組み合わせ決定", () => {
    expect(status("p01")).toBe("matched");
  });

  test("回答していたのに組めなかった人は組めなかった", () => {
    expect(status("p04")).toBe("unmatched");
  });

  test("休んだ人は不参加", () => {
    expect(status("p05")).toBe("closed");
  });

  test("候補日0日の人は不参加", () => {
    expect(status("p06")).toBe("closed");
  });

  test("未回答の人は不参加", () => {
    expect(status("p07")).toBe("closed");
  });
});
