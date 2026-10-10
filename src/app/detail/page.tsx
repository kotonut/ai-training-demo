import { Card, ScreenBody, ScreenHeader } from "../_components/ui";
import { lunch, me, round } from "../_data/dummy";

export const metadata = { title: "ランチの詳細" };

export default function DetailPage() {
  return (
    <>
      <ScreenHeader title="ランチの詳細" backHref="/?state=matched" />
      <ScreenBody>
        <Card className="gap-1 py-5">
          <span className="text-[13px] text-muted">第{round.no}回</span>
          <span className="font-lunch-heading text-[22px] font-bold">{lunch.day}</span>
          <span className="text-base">
            {lunch.time}・{lunch.format}
          </span>
          <p className="m-0 mt-1.5 text-[13px] text-muted">お店や集合場所は、メンバーで決めてください。</p>
        </Card>

        <h2 className="m-0 mt-2 text-base font-bold">メンバー（{lunch.members.length}人）</h2>
        <ul className="m-0 flex list-none flex-col rounded-xl bg-white p-0">
          {lunch.members.map((m) => (
            <li key={m.name} className="flex items-center gap-3 border-b border-line-soft px-4 py-3 last:border-b-0">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-bold text-accent-strong"
              >
                {m.name.charAt(0)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">
                  {m.name}
                  {m.name === me.name && "（あなた）"}
                </span>
                <span className="text-[13px] text-muted">{m.dept}</span>
              </span>
              <span className="rounded-full border border-line px-2 py-0.5 text-xs whitespace-nowrap">{m.role}</span>
            </li>
          ))}
        </ul>

        <p className="m-0 text-[13px] text-muted">出られなくなったときは、メンバーに直接連絡してください。</p>
      </ScreenBody>
    </>
  );
}
