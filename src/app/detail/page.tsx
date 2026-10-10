import {
  Avatar,
  Card,
  DividedList,
  DividedListItem,
  Headline,
  Note,
  ScreenBody,
  ScreenHeader,
  SectionTitle,
  Tag,
} from "../_components/ui";
import { lunch, me, round } from "../_data/dummy";

export const metadata = { title: "ランチの詳細" };

export default function DetailPage() {
  return (
    <>
      <ScreenHeader title="ランチの詳細" backHref="/?state=matched" />
      <ScreenBody>
        <Card className="gap-1 py-5">
          <Note>第{round.no}回</Note>
          <Headline>{lunch.day}</Headline>
          <span className="text-lead">
            {lunch.time}・{lunch.format}
          </span>
          <Note className="mt-1.5">お店や集合場所は、メンバーで決めてください。</Note>
        </Card>

        <SectionTitle>メンバー（{lunch.members.length}人）</SectionTitle>
        <DividedList>
          {lunch.members.map((m) => (
            <DividedListItem key={m.name}>
              <Avatar name={m.name} />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">
                  {m.name}
                  {m.name === me.name && "（あなた）"}
                </span>
                <span className="text-caption text-muted">{m.dept}</span>
              </span>
              <Tag>{m.role}</Tag>
            </DividedListItem>
          ))}
        </DividedList>

        <Note>出られなくなったときは、メンバーに直接連絡してください。</Note>
      </ScreenBody>
    </>
  );
}
