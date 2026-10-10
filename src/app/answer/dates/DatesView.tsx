"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Calendar } from "../../_components/Calendar";
import { ButtonLink, PageTitle } from "../../_components/ui";

// 選んだ日は画面の中だけで持つ。保存はしない。
export function DatesView() {
  const format = useSearchParams().get("format") === "online" ? "オンライン" : "対面";
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <>
      <p className="m-0 text-[13px] text-muted">2 / 2・{format}</p>
      <PageTitle>ランチできる日を選んでください</PageTitle>
      <p className="m-0 text-sm text-muted">
        12:00〜13:00 に空いている日を、いくつでも。自分の予定と見比べて選んでください。
      </p>
      <Calendar picked={picked} onToggle={toggle} />
      <p className="m-0 text-center text-sm text-muted">{picked.length}日 選択中</p>
      <ButtonLink href="/answer/done">この内容で回答する</ButtonLink>
    </>
  );
}
