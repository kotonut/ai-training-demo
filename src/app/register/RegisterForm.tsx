"use client";

import { useState } from "react";
import { ButtonLink, Card, PageTitle } from "../_components/ui";
import { departments, me } from "../_data/dummy";

const workStyles = ["主に出社", "主にリモート", "半々"];

// 入力の見た目だけ。保存はしない。
export function RegisterForm() {
  const [work, setWork] = useState("主にリモート");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <PageTitle>プロフィールを登録</PageTitle>
        <p className="m-0 text-sm text-muted">別の部署の人と組むために使います。あとから設定で直せます。</p>
      </div>

      <Card className="gap-5 py-5">
        <div className="flex flex-col">
          <span className="text-[13px] text-muted">名前</span>
          <span className="font-medium">{me.name}</span>
          <span className="text-xs text-muted">Google アカウントから取得</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="dept" className="text-[13px] text-muted">
            部署
          </label>
          <select
            id="dept"
            defaultValue={me.dept}
            className="h-11 rounded-lg border border-line bg-white px-3 text-ink"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="joined" className="text-[13px] text-muted">
            入社日
          </label>
          <input
            id="joined"
            type="date"
            defaultValue="2026-09-01"
            className="h-11 rounded-lg border border-line bg-white px-3 text-ink"
          />
        </div>

        <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
          <legend className="mb-1.5 p-0 text-[13px] text-muted">勤務形態</legend>
          <div className="flex gap-2">
            {workStyles.map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={work === w}
                onClick={() => setWork(w)}
                className={`min-h-11 flex-1 cursor-pointer rounded-lg border text-sm ${
                  work === w ? "border-accent bg-accent text-white" : "border-line bg-white text-ink"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </fieldset>

        <p className="m-0 rounded-lg bg-accent-soft px-3 py-2.5 text-sm">
          入社半年以内なので「新入社員」として参加します。
        </p>
      </Card>

      <ButtonLink href="/">登録してはじめる</ButtonLink>
    </div>
  );
}
