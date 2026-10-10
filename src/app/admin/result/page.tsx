import { ButtonLink, PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";
import { groups, round } from "../../_data/dummy";

export const metadata = { title: "組み合わせの結果" };

export default function AdminResultPage() {
  return (
    <>
      <ScreenHeader title="運営画面" backHref="/admin" />
      <ScreenBody>
        <PageTitle>第{round.no}回の結果</PageTitle>
        <p className="m-0 rounded-lg bg-accent-soft px-3 py-2.5 text-sm">
          実行済み：8グループ（対面 5・オンライン 3）
          <br />
          組めなかった人 2人（次回優先）
        </p>

        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {groups.map((g) => (
            <li key={g.no} className="flex flex-col gap-0.5 rounded-xl bg-white px-4 py-3 text-sm">
              <span className="font-bold">
                {g.no}・{g.day}・{g.format}
              </span>
              <span className="text-muted">{g.members}</span>
            </li>
          ))}
        </ul>
        <p className="m-0 text-sm text-muted">ほか 4グループ</p>

        <ButtonLink href="/?state=matched" variant="secondary">
          参加者のホームを見る
        </ButtonLink>
      </ScreenBody>
    </>
  );
}
