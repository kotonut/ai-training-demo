import { Description, Note, OptionLink, PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";

export const metadata = { title: "形式を選ぶ" };

const formats = [
  { id: "office", label: "対面", note: "出社して、会社の近くでランチ" },
  { id: "online", label: "オンライン", note: "それぞれの場所から、ビデオ会議でランチ" },
];

export default function FormatPage() {
  return (
    <>
      <ScreenHeader title="候補日を選ぶ" backHref="/" />
      <ScreenBody>
        <Note>1 / 2</Note>
        <PageTitle>どちらで参加しますか？</PageTitle>
        <Description>この回だけの選択です。同じ形式の人どうしで組みます。</Description>
        {formats.map((f) => (
          <OptionLink key={f.id} href={`/answer/dates?format=${f.id}`} title={f.label} description={f.note} />
        ))}
      </ScreenBody>
    </>
  );
}
