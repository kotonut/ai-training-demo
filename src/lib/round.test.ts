import { describe, expect, test } from "vitest";
import { canAnswer, canExecute, type Round } from "./round";

const open: Round = { deadline: "2026-10-22", executed: false };
const executed: Round = { deadline: "2026-10-22", executed: true };

describe("canAnswer", () => {
  test("締切より前なら回答できる", () => {
    expect(canAnswer(open, new Date(2026, 9, 20))).toBe(true);
  });

  test("締切の日は夜でも回答できる", () => {
    expect(canAnswer(open, new Date(2026, 9, 22, 23, 59))).toBe(true);
  });

  test("締切の翌日からは回答できない", () => {
    expect(canAnswer(open, new Date(2026, 9, 23))).toBe(false);
  });

  test("組み合わせを実行したあとは、締切前でも回答できない", () => {
    expect(canAnswer(executed, new Date(2026, 9, 20))).toBe(false);
  });
});

describe("canExecute", () => {
  test("まだ実行していなければ実行できる（締切前でもよい）", () => {
    expect(canExecute(open)).toBe(true);
  });

  test("実行は1回につき1度だけ", () => {
    expect(canExecute(executed)).toBe(false);
  });
});
