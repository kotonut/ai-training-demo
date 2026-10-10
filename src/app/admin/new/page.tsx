import { Field, TextInput } from "../../_components/form";
import { ButtonLink, Card, PageTitle, ScreenBody, ScreenHeader } from "../../_components/ui";
import { days } from "../../_data/dummy";

export const metadata = { title: "回を作る" };

const fields = [
  { id: "start", label: "開催期間（はじめ）", value: "2026-10-26" },
  { id: "end", label: "開催期間（おわり）", value: "2026-11-06" },
  { id: "deadline", label: "回答の締切", value: "2026-10-22" },
];

// 入力の見た目だけ。保存はしない。候補日はダミーを表示する。
export default function AdminNewPage() {
  const candidates = days.filter((d) => !d.holiday);
  const holidays = days.filter((d) => d.holiday);

  return (
    <>
      <ScreenHeader title="運営画面" backHref="/admin" />
      <ScreenBody>
        <PageTitle>回を作る</PageTitle>
        <Card className="gap-4 py-5">
          {fields.map((f) => (
            <Field key={f.id} id={f.id} label={f.label}>
              <TextInput id={f.id} type="date" defaultValue={f.value} />
            </Field>
          ))}
        </Card>

        <Card className="gap-2 text-small">
          <span className="font-bold">候補日（{candidates.length}日）</span>
          <span>{candidates.map((d) => `${d.label.replace("月", "/").replace("日", "")}(${d.dow})`).join("、")}</span>
          <span className="text-muted">
            期間の平日が候補日になります。祝日（{holidays.map((d) => d.label).join("、")}）は外れます。
          </span>
        </Card>

        <ButtonLink href="/admin">回を作る</ButtonLink>
      </ScreenBody>
    </>
  );
}
