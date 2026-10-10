import { Suspense } from "react";
import { ScreenBody, ScreenHeader } from "../../_components/ui";
import { DatesView } from "./DatesView";

export const metadata = { title: "候補日を選ぶ" };

export default function DatesPage() {
  return (
    <>
      <ScreenHeader title="候補日を選ぶ" backHref="/answer/format" />
      <ScreenBody>
        <Suspense fallback={<p className="text-muted">読み込み中…</p>}>
          <DatesView />
        </Suspense>
      </ScreenBody>
    </>
  );
}
