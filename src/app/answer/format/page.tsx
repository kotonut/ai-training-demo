import Link from "next/link";
import { PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";

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
        <p className="m-0 text-[13px] text-muted">1 / 2</p>
        <PageTitle>どちらで参加しますか？</PageTitle>
        <p className="m-0 text-sm text-muted">この回だけの選択です。同じ形式の人どうしで組みます。</p>
        {formats.map((f) => (
          <Link
            key={f.id}
            href={`/answer/dates?format=${f.id}`}
            className="flex flex-col gap-1 rounded-xl border border-line bg-white px-4 py-4 hover:border-accent"
          >
            <span className="text-[17px] font-bold">{f.label}</span>
            <span className="text-sm text-muted">{f.note}</span>
          </Link>
        ))}
      </ScreenBody>
    </>
  );
}
