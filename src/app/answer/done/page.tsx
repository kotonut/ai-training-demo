import { ButtonLink, CheckIcon, PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";
import { answeredDayIds, days, round } from "../../_data/dummy";

export const metadata = { title: "回答しました" };

export default function DonePage() {
  const labels = days
    .filter((d) => answeredDayIds.includes(d.id))
    .map((d) => `${d.label}(${d.dow})`)
    .join("、");

  return (
    <>
      <ScreenHeader title="シャッフルランチ" />
      <ScreenBody>
        <div className="flex flex-col items-center gap-4 pt-10 text-center">
          <div className="flex size-18 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CheckIcon size={36} />
          </div>
          <PageTitle>回答しました</PageTitle>
          <p className="m-0 text-sm">
            <b>対面</b>・3日
            <br />
            {labels}
          </p>
          <p className="m-0 text-sm text-muted">
            締切（{round.deadline}）までは何度でも直せます。
            <br />
            組み合わせが決まったら、ホームに表示されます。
          </p>
        </div>
        <ButtonLink href="/?state=answered">ホームに戻る</ButtonLink>
      </ScreenBody>
    </>
  );
}
