"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar } from "./_components/Calendar";
import { Badge, ButtonLink, Card } from "./_components/ui";
import { answeredDayIds, days, lunch, lunchDayId, me, round } from "./_data/dummy";

const states = [
  { id: "none", label: "未回答" },
  { id: "answered", label: "回答済み" },
  { id: "skipped", label: "お休み" },
  { id: "matched", label: "組み合わせ決定" },
  { id: "unmatched", label: "組めなかった" },
  { id: "closed", label: "不参加" },
] as const;

type State = (typeof states)[number]["id"];

export function HomeView() {
  const param = useSearchParams().get("state");
  const state: State = states.some((s) => s.id === param) ? (param as State) : "none";

  const answeredLabels = days
    .filter((d) => answeredDayIds.includes(d.id))
    .map((d) => `${d.label}(${d.dow})`)
    .join("、");

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="m-0 text-sm text-muted">こんにちは、佐藤さん</p>
        <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-xs">{me.role}</span>
      </div>

      <div>
        <p className="m-0 text-[13px] text-muted">
          第{round.no}回・回答の締切 {round.deadline}
        </p>
        <p className="m-0 font-lunch-heading text-xl font-bold">{round.periodShort}</p>
      </div>

      <Calendar
        picked={state === "answered" ? answeredDayIds : state === "matched" ? [lunchDayId] : []}
        lunchDayId={state === "matched" ? lunchDayId : undefined}
      />

      {state === "none" && (
        <Card>
          <Badge tone="warn">未回答</Badge>
          <p className="m-0 text-sm">ランチできる日を選んでください。日が多いほど組みやすくなります。</p>
          <ButtonLink href="/answer/format">候補日を選ぶ</ButtonLink>
          <ButtonLink href="/?state=skipped" variant="secondary">
            今回は休む
          </ButtonLink>
        </Card>
      )}

      {state === "answered" && (
        <Card>
          <Badge>回答済み</Badge>
          <p className="m-0 text-sm">
            <b>対面</b>・3日
            <br />
            {answeredLabels}
          </p>
          <p className="m-0 text-[13px] text-muted">締切までは何度でも直せます。締切のあと、運営が組み合わせを決めます。</p>
          <ButtonLink href="/answer/format" variant="secondary">
            回答を直す
          </ButtonLink>
          <ButtonLink href="/?state=skipped" variant="secondary">
            今回は休む
          </ButtonLink>
        </Card>
      )}

      {state === "skipped" && (
        <Card>
          <Badge tone="warn">今回はお休み</Badge>
          <p className="m-0 text-sm">締切までは、参加に戻せます。</p>
          <ButtonLink href="/answer/format" variant="secondary">
            やっぱり参加する
          </ButtonLink>
        </Card>
      )}

      {state === "matched" && (
        <Link
          href="/detail"
          className="flex items-center gap-3 rounded-xl bg-accent p-4 text-white hover:bg-accent-strong"
        >
          <span className="flex flex-1 flex-col">
            <span className="text-[13px]">組み合わせが決まりました</span>
            <span className="text-[17px] font-bold">
              {lunch.day} 12:00〜・{lunch.format}
            </span>
          </span>
          <span className="text-sm">詳細</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      )}

      {state === "unmatched" && (
        <Card className="bg-warn-soft! text-warn">
          <Badge tone="warn">今回は見送り</Badge>
          <p className="m-0 text-sm">今回は条件の合うグループを作れませんでした。次の回は優先して組みます。</p>
        </Card>
      )}

      {state === "closed" && (
        <Card>
          <p className="m-0 text-sm text-muted">受付は締め切られました。今回は参加していません。</p>
        </Card>
      )}

      <nav aria-label="たたき台用" className="mt-6 flex flex-col gap-2 border-t border-dashed border-line pt-4">
        <p className="m-0 text-xs text-muted">たたき台用：ホームの状態を切り替える</p>
        <div className="flex flex-wrap gap-2">
          {states.map((s) => (
            <Link
              key={s.id}
              href={`/?state=${s.id}`}
              aria-current={s.id === state ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-lg border px-3 text-sm ${
                s.id === state ? "border-accent bg-accent-soft font-bold" : "border-line bg-white"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <ButtonLink href="/register" variant="demo">
            初回登録を開く
          </ButtonLink>
          <ButtonLink href="/admin" variant="demo">
            運営画面を開く
          </ButtonLink>
        </div>
      </nav>
    </>
  );
}
