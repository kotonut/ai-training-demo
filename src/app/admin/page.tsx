import {
  ButtonLink,
  Card,
  Description,
  Notice,
  PageTitle,
  ScreenBody,
  ScreenHeader,
  StatTile,
  Tag,
} from "../_components/ui";
import { adminStats, round } from "../_data/dummy";

export const metadata = { title: "運営" };

export default function AdminPage() {
  const stats = [
    { label: "参加", value: `${adminStats.joined}人` },
    { label: "休む", value: `${adminStats.skipped}人` },
    { label: "未回答", value: `${adminStats.unanswered}人` },
  ];

  return (
    <>
      <ScreenHeader title="運営画面" backHref="/" />
      <ScreenBody>
        <Tag tone="dark">運営</Tag>
        <PageTitle>第{round.no}回の組み合わせ</PageTitle>
        <Description>
          {round.period}・締切 {round.deadline}
        </Description>

        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <StatTile key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <Card className="gap-1 text-small">
          <span>
            新入社員 {adminStats.newcomers}人・迎える側 {adminStats.hosts}人
          </span>
          <span>
            対面 {adminStats.office}人・オンライン {adminStats.online}人
          </span>
        </Card>

        <Notice tone="warn">実行すると回答は締め切られます。実行できるのは1回だけです。</Notice>
        <ButtonLink href="/admin/result" variant="dark">
          組み合わせを実行する
        </ButtonLink>

        <div className="mt-4 border-t border-line-soft pt-4">
          <ButtonLink href="/admin/new" variant="secondary">
            次の回を作る
          </ButtonLink>
        </div>
      </ScreenBody>
    </>
  );
}
