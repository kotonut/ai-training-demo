"use client";

import { useSearchParams } from "next/navigation";
import { Calendar } from "./_components/Calendar";
import { Badge, ButtonLink, Card, ChipLink, Description, Headline, HighlightLink, Note, Tag } from "./_components/ui";
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
        <Description>こんにちは、佐藤さん</Description>
        <Tag>{me.role}</Tag>
      </div>

      <div>
        <Note>
          第{round.no}回・回答の締切 {round.deadline}
        </Note>
        <Headline>{round.periodShort}</Headline>
      </div>

      <Calendar
        picked={state === "answered" ? answeredDayIds : state === "matched" ? [lunchDayId] : []}
        lunchDayId={state === "matched" ? lunchDayId : undefined}
      />

      {state === "none" && (
        <Card>
          <Badge tone="primary">未回答</Badge>
          <p className="m-0 text-small">ランチできる日を選んでください。日が多いほど組みやすくなります。</p>
          <ButtonLink href="/answer/format">候補日を選ぶ</ButtonLink>
          <ButtonLink href="/?state=skipped" variant="secondary">
            今回は休む
          </ButtonLink>
        </Card>
      )}

      {state === "answered" && (
        <Card>
          <Badge>回答済み</Badge>
          <p className="m-0 text-small">
            <b>対面</b>・3日
            <br />
            {answeredLabels}
          </p>
          <Note>締切までは何度でも直せます。締切のあと、運営が組み合わせを決めます。</Note>
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
          <Badge tone="gray">今回はお休み</Badge>
          <p className="m-0 text-small">締切までは、参加に戻せます。</p>
          <ButtonLink href="/answer/format" variant="secondary">
            やっぱり参加する
          </ButtonLink>
        </Card>
      )}

      {state === "matched" && (
        <HighlightLink
          href="/detail"
          label="組み合わせが決まりました"
          title={`${lunch.day} 12:00〜・${lunch.format}`}
          action="詳細"
        />
      )}

      {state === "unmatched" && (
        <Card tone="warn">
          <Badge tone="warn">今回は見送り</Badge>
          <p className="m-0 text-small">今回は条件の合うグループを作れませんでした。次の回は優先して組みます。</p>
        </Card>
      )}

      {state === "closed" && (
        <Card>
          <Description>受付は締め切られました。今回は参加していません。</Description>
        </Card>
      )}

      <nav aria-label="たたき台用" className="mt-6 flex flex-col gap-2 border-t border-dashed border-line pt-4">
        <Note>たたき台用：ホームの状態を切り替える</Note>
        <div className="flex flex-wrap gap-2">
          {states.map((s) => (
            <ChipLink key={s.id} href={`/?state=${s.id}`} current={s.id === state}>
              {s.label}
            </ChipLink>
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
