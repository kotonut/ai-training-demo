import { describe, expect, test } from "vitest";
import type { Day } from "../app/_data/dummy";
import type { Answer } from "./answers";
import { findMyGroup, matchGroups, type Format, type MatchInput, type MatchResult, type Participant } from "./matching";

// 判定の確認用の期間。11月3日は祝日。
const days: Day[] = [
  { id: "1027", num: "27", label: "10月27日", dow: "火" },
  { id: "1028", num: "28", label: "10月28日", dow: "水" },
  { id: "1029", num: "29", label: "10月29日", dow: "木" },
  { id: "1103", num: "3", label: "11月3日", dow: "火", holiday: true },
  { id: "1105", num: "5", label: "11月5日", dow: "木" },
];

const newcomer = (id: string, dept: string): Participant => ({ id, name: id, dept, role: "新入社員" });
const host = (id: string, dept: string): Participant => ({ id, name: id, dept, role: "迎える側" });

const join = (personId: string, dayIds: string[] = ["1027"], format: Format = "対面"): Answer => ({
  personId,
  kind: "参加",
  format,
  dayIds,
});

// 全員が同じ日・同じ形式で参加する入力を作る。
function input(people: Participant[], extra: Partial<MatchInput> = {}): MatchInput {
  return {
    days,
    people,
    answers: people.map((p) => join(p.id)),
    priorityIds: [],
    pastGroups: [],
    ...extra,
  };
}

const sorted = (ids: string[]) => [...ids].sort();
const roleOf = (people: Participant[], id: string) => people.find((p) => p.id === id)?.role;

// 必ず守るルールが、どの結果でも成り立っていることを確かめる。
function expectRulesKept(data: MatchInput, result: MatchResult) {
  const person = (id: string) => data.people.find((p) => p.id === id)!;
  const answer = (id: string) => data.answers.find((a) => a.personId === id);
  const holidayIds = data.days.filter((d) => d.holiday).map((d) => d.id);

  for (const g of result.groups) {
    const members = g.memberIds.map(person);
    expect(g.memberIds.length).toBeGreaterThanOrEqual(3);
    expect(g.memberIds.length).toBeLessThanOrEqual(4);
    expect(members.some((p) => p.role === "新入社員")).toBe(true);
    expect(members.some((p) => p.role === "迎える側")).toBe(true);
    expect(new Set(members.map((p) => p.dept)).size).toBe(members.length);
    expect(holidayIds).not.toContain(g.dayId);
    for (const id of g.memberIds) {
      const a = answer(id);
      expect(a?.kind).toBe("参加");
      if (a?.kind !== "参加") continue;
      expect(a.format).toBe(g.format);
      expect(a.dayIds).toContain(g.dayId);
    }
  }

  // 対象者（祝日以外の候補日を1日以上選んだ人）は、どこか1か所にだけ入る
  const targetIds = data.answers
    .filter((a) => a.kind === "参加" && a.dayIds.some((d) => !holidayIds.includes(d)))
    .map((a) => a.personId);
  const placed = [...result.groups.flatMap((g) => g.memberIds), ...result.unmatchedIds];
  expect(sorted(placed)).toEqual(sorted(targetIds));
}

// 6部署にばらけた8人。前から n 人を使う。
const crowd = [
  newcomer("N1", "営業部"),
  host("H1", "開発部"),
  newcomer("N2", "人事部"),
  host("H2", "マーケティング部"),
  newcomer("N3", "経理部"),
  host("H3", "カスタマーサクセス部"),
  newcomer("N4", "開発部"),
  host("H4", "営業部"),
];

describe("matchGroups：対象になる人", () => {
  test("休んだ人・未回答の人・候補日0日の人は、グループにも組めなかった人にも入らない", () => {
    const people = [...crowd.slice(0, 3), newcomer("S", "経理部"), newcomer("U", "経理部"), newcomer("Z", "経理部")];
    const data = input(people, {
      answers: [
        join("N1"),
        join("H1"),
        join("N2"),
        { personId: "S", kind: "休む" },
        join("Z", []),
        // U は未回答
      ],
    });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups).toHaveLength(1);
    expect(sorted(result.groups[0].memberIds)).toEqual(["H1", "N1", "N2"]);
    expect(result.unmatchedIds).toEqual([]);
  });

  test("祝日しか選んでいない人は対象にならない", () => {
    const people = [...crowd.slice(0, 3), newcomer("X", "経理部")];
    const data = input(people, {
      answers: [join("N1"), join("H1"), join("N2"), join("X", ["1103"])],
    });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.flatMap((g) => g.memberIds)).not.toContain("X");
    expect(result.unmatchedIds).not.toContain("X");
  });

  test("回答に祝日が入っていても、その日には組まない", () => {
    const people = crowd.slice(0, 3);
    const data = input(people, { answers: people.map((p) => join(p.id, ["1103", "1105"])) });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.dayId)).toEqual(["1105"]);
  });
});

describe("matchGroups：人数", () => {
  test("3人なら3人のグループ", () => {
    const data = input(crowd.slice(0, 3));
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.memberIds.length)).toEqual([3]);
  });

  test("5人なら4人のグループと1人見送り（組める人を多くする）", () => {
    const data = input(crowd.slice(0, 5));
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.memberIds.length)).toEqual([4]);
    expect(result.unmatchedIds).toHaveLength(1);
  });

  test("6人なら3人＋3人", () => {
    const data = input(crowd.slice(0, 6));
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.memberIds.length)).toEqual([3, 3]);
    expect(result.unmatchedIds).toEqual([]);
  });

  test("7人なら4人＋3人", () => {
    const data = input(crowd.slice(0, 7));
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.memberIds.length).sort()).toEqual([3, 4]);
    expect(result.unmatchedIds).toEqual([]);
  });

  test("8人なら4人＋4人", () => {
    const data = input(crowd);
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.map((g) => g.memberIds.length)).toEqual([4, 4]);
    expect(result.unmatchedIds).toEqual([]);
  });
});

describe("matchGroups：組めない場合", () => {
  test("対象者が0人ならグループなし", () => {
    expect(matchGroups(input([]))).toEqual({ groups: [], unmatchedIds: [] });
  });

  test("2人だけなら2人とも組めなかった", () => {
    const data = input(crowd.slice(0, 2));
    const result = matchGroups(data);
    expect(result.groups).toEqual([]);
    expect(sorted(result.unmatchedIds)).toEqual(["H1", "N1"]);
  });

  test("新入社員しかいなければ組まない", () => {
    const data = input([newcomer("N1", "営業部"), newcomer("N2", "開発部"), newcomer("N3", "人事部")]);
    const result = matchGroups(data);
    expect(result.groups).toEqual([]);
    expect(sorted(result.unmatchedIds)).toEqual(["N1", "N2", "N3"]);
  });

  test("迎える側しかいなければ組まない", () => {
    const data = input([host("H1", "営業部"), host("H2", "開発部"), host("H3", "人事部")]);
    const result = matchGroups(data);
    expect(result.groups).toEqual([]);
    expect(result.unmatchedIds).toHaveLength(3);
  });

  test("全員が同じ部署なら組まない", () => {
    const data = input([newcomer("N1", "営業部"), host("H1", "営業部"), newcomer("N2", "営業部")]);
    const result = matchGroups(data);
    expect(result.groups).toEqual([]);
    expect(result.unmatchedIds).toHaveLength(3);
  });

  test("形式をまたいで組まない", () => {
    const people = [...crowd.slice(0, 5)];
    const data = input(people, {
      answers: [join("N1"), join("H1"), join("N2"), join("H2", ["1027"], "オンライン"), join("N3", ["1027"], "オンライン")],
    });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].format).toBe("対面");
    expect(sorted(result.unmatchedIds)).toEqual(["H2", "N3"]);
  });

  test("全員に共通の日がなければ組まない", () => {
    const data = input(crowd.slice(0, 3), {
      answers: [join("N1", ["1027"]), join("H1", ["1028"]), join("N2", ["1029"])],
    });
    const result = matchGroups(data);
    expect(result.groups).toEqual([]);
    expect(result.unmatchedIds).toHaveLength(3);
  });
});

describe("matchGroups：日の決め方", () => {
  test("共通の日が複数あれば、一番早い日にする", () => {
    const data = input(crowd.slice(0, 3), {
      answers: [join("N1", ["1028", "1105"]), join("H1", ["1027", "1028", "1105"]), join("N2", ["1105", "1028"])],
    });
    const result = matchGroups(data);
    expect(result.groups.map((g) => g.dayId)).toEqual(["1028"]);
  });
});

describe("matchGroups：できるだけ守るルール", () => {
  test("前回組めなかった人を先に入れる", () => {
    // 新入社員2人・迎える側3人。迎える側が1人あまる
    const people = [newcomer("N1", "営業部"), newcomer("N2", "開発部"), host("H1", "人事部"), host("H2", "経理部"), host("H3", "マーケティング部")];
    for (const priority of ["H1", "H2", "H3"]) {
      const data = input(people, { priorityIds: [priority] });
      const result = matchGroups(data);
      expectRulesKept(data, result);
      expect(result.groups[0].memberIds).toContain(priority);
      expect(result.unmatchedIds).not.toContain(priority);
    }
  });

  test("一度組んだ人どうしは、ほかに組み方があれば同じグループにしない", () => {
    const people = crowd.slice(0, 6);
    const data = input(people, { pastGroups: [["N1", "N2"]] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups).toHaveLength(2);
    for (const g of result.groups) {
      expect(g.memberIds.includes("N1") && g.memberIds.includes("N2")).toBe(false);
    }
  });

  test("再会させないと組めないときは、再会を許す", () => {
    const people = crowd.slice(0, 3);
    const data = input(people, { pastGroups: [["N1", "H1", "N2"]] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups).toHaveLength(1);
    expect(result.unmatchedIds).toEqual([]);
  });

  test("再会が避けられないときは、再会するペアをできるだけ少なくする", () => {
    // 3人ずつ2グループ。N1・N2・N3 は全員どうしが再会。2グループに分かれるので、最低1ペアは再会する
    const people = crowd.slice(0, 6);
    const data = input(people, { pastGroups: [["N1", "N2", "N3"]] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    const reunions = result.groups
      .map((g) => g.memberIds.filter((id) => ["N1", "N2", "N3"].includes(id)).length)
      .reduce((sum, n) => sum + (n * (n - 1)) / 2, 0);
    expect(reunions).toBe(1);
  });

  test("どちらかがあまるなら、あまるのは迎える側", () => {
    const people = [newcomer("N1", "営業部"), newcomer("N2", "開発部"), newcomer("N3", "人事部"), host("H1", "経理部"), host("H2", "マーケティング部")];
    const data = input(people);
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.unmatchedIds).toHaveLength(1);
    expect(roleOf(people, result.unmatchedIds[0])).toBe("迎える側");
  });
});

describe("matchGroups：ルールが競合したときの順番", () => {
  test("前回優先 ＞ 再会しない", () => {
    // N1 と H2 は同じ部署なので、組めるのは {N1,N2,H1} か {N2,H1,H2} のどちらか
    const people = [newcomer("N1", "営業部"), newcomer("N2", "開発部"), host("H1", "人事部"), host("H2", "営業部")];
    const pastGroups = [["H1", "H2"]];

    const withoutPriority = matchGroups(input(people, { pastGroups }));
    expect(withoutPriority.unmatchedIds).toEqual(["H2"]);

    const data = input(people, { pastGroups, priorityIds: ["H2"] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(sorted(result.groups[0].memberIds)).toEqual(["H1", "H2", "N2"]);
    expect(result.unmatchedIds).toEqual(["N1"]);
  });

  test("前回優先 ＞ 新入社員を多めに", () => {
    const people = [newcomer("N1", "営業部"), newcomer("N2", "開発部"), newcomer("N3", "人事部"), host("H1", "経理部"), host("H2", "マーケティング部")];
    const data = input(people, { priorityIds: ["H1", "H2"] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups[0].memberIds).toEqual(expect.arrayContaining(["H1", "H2"]));
    expect(roleOf(people, result.unmatchedIds[0])).toBe("新入社員");
  });

  test("再会しない ＞ 新入社員を多めに", () => {
    // 迎える側をあまらせると N3 が必ず誰かと再会する。N3 をあまらせれば再会なし
    const people = [newcomer("N1", "営業部"), newcomer("N2", "開発部"), newcomer("N3", "人事部"), host("H1", "経理部"), host("H2", "マーケティング部")];
    const data = input(people, { pastGroups: [["N3", "H1"], ["N3", "H2"]] });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.unmatchedIds).toEqual(["N3"]);
  });
});

describe("matchGroups：いろいろな人が混ざった回", () => {
  test("必ず守るルールがすべて成り立つ", () => {
    const people = [
      newcomer("N1", "営業部"),
      newcomer("N2", "開発部"),
      newcomer("N3", "人事部"),
      newcomer("N4", "マーケティング部"),
      newcomer("N5", "開発部"),
      host("H1", "経理部"),
      host("H2", "カスタマーサクセス部"),
      host("H3", "営業部"),
      newcomer("N6", "営業部"),
      newcomer("N7", "開発部"),
      newcomer("N8", "経理部"),
      host("H4", "人事部"),
      host("H5", "マーケティング部"),
      host("H6", "営業部"),
      newcomer("S1", "人事部"),
      host("U1", "開発部"),
    ];
    const data = input(people, {
      answers: [
        join("N1", ["1027", "1029"]),
        join("N2", ["1027", "1105"]),
        join("N3", ["1029", "1105"]),
        join("N4", ["1027", "1028", "1029"]),
        join("N5", ["1028"]),
        join("H1", ["1027", "1029", "1105"]),
        join("H2", ["1029"]),
        join("H3", ["1027", "1028"]),
        join("N6", ["1027", "1028"], "オンライン"),
        join("N7", ["1028", "1029"], "オンライン"),
        join("N8", ["1028"], "オンライン"),
        join("H4", ["1027", "1028", "1105"], "オンライン"),
        join("H5", ["1028", "1029"], "オンライン"),
        join("H6", ["1105"], "オンライン"),
        { personId: "S1", kind: "休む" },
      ],
      priorityIds: ["N5"],
      pastGroups: [["N1", "H1", "N4"]],
    });
    const result = matchGroups(data);
    expectRulesKept(data, result);
    expect(result.groups.length).toBeGreaterThan(0);
  });

  test("同じ入力なら何度実行しても必ず守るルールが成り立つ", () => {
    const data = input(crowd);
    for (let i = 0; i < 20; i++) {
      expectRulesKept(data, matchGroups(data));
    }
  });
});

describe("findMyGroup", () => {
  const result: MatchResult = {
    groups: [
      { dayId: "1027", format: "対面", memberIds: ["N1", "H1", "N2"] },
      { dayId: "1029", format: "オンライン", memberIds: ["N3", "H2", "N4"] },
    ],
    unmatchedIds: ["H3"],
  };

  test("自分の入ったグループ（ランチの日・形式）が分かる", () => {
    expect(findMyGroup(result, "H2")).toEqual(result.groups[1]);
  });

  test("組めなかった人はグループなし", () => {
    expect(findMyGroup(result, "H3")).toBeUndefined();
  });
});
