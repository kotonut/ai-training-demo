import { Suspense } from "react";
import { ScreenBody, ScreenHeader } from "./_components/ui";
import { HomeView } from "./HomeView";

export const metadata = { title: "ホーム" };

export default function LunchHomePage() {
  return (
    <>
      <ScreenHeader title="シャッフルランチ" />
      <ScreenBody>
        {/* 表示する状態を URL の ?state= で切り替える（たたき台用） */}
        <Suspense fallback={<p className="text-muted">読み込み中…</p>}>
          <HomeView />
        </Suspense>
      </ScreenBody>
    </>
  );
}
