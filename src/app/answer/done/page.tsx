import { ButtonLink, CheckIcon, Description, PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";
import { answeredDayIds, days, round } from "../../_data/dummy";
import { formatDayList } from "../../../lib/days";

export const metadata = { title: "回答しました" };

export default function DonePage() {
  const labels = formatDayList(days, answeredDayIds);

  return (
    <>
      <ScreenHeader title="シャッフルランチ" />
      <ScreenBody>
        <div className="flex flex-col items-center gap-4 pt-10 text-center">
          <div className="flex size-18 items-center justify-center rounded-full bg-primary-soft text-primary-text">
            <CheckIcon size={36} />
          </div>
          <PageTitle>回答しました</PageTitle>
          <p className="m-0 text-small">
            <b>対面</b>・3日
            <br />
            {labels}
          </p>
          <Description>
            締切（{round.deadline}）までは何度でも直せます。
            <br />
            組み合わせが決まったら、ホームに表示されます。
          </Description>
        </div>
        <ButtonLink href="/?state=answered">ホームに戻る</ButtonLink>
      </ScreenBody>
    </>
  );
}
