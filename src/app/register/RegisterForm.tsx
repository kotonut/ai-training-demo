"use client";

import { useState } from "react";
import { ChoiceGroup, Field, Select, TextInput } from "../_components/form";
import { ButtonLink, Card, Description, Note, Notice, PageTitle } from "../_components/ui";
import { departments, me } from "../_data/dummy";

const workStyles = ["主に出社", "主にリモート", "半々"];

// 入力の見た目だけ。保存はしない。
export function RegisterForm() {
  const [work, setWork] = useState("主にリモート");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <PageTitle>プロフィールを登録</PageTitle>
        <Description>別の部署の人と組むために使います。あとから設定で直せます。</Description>
      </div>

      <Card className="gap-5 py-5">
        <div className="flex flex-col">
          <Note>名前</Note>
          <span className="font-medium">{me.name}</span>
          <span className="text-label text-muted">Google アカウントから取得</span>
        </div>

        <Field id="dept" label="部署">
          <Select id="dept" defaultValue={me.dept} options={departments} />
        </Field>

        <Field id="joined" label="入社日">
          <TextInput id="joined" type="date" defaultValue="2026-09-01" />
        </Field>

        <ChoiceGroup legend="勤務形態" options={workStyles} value={work} onChange={setWork} />

        <Notice>入社半年以内なので「新入社員」として参加します。</Notice>
      </Card>

      <ButtonLink href="/">登録してはじめる</ButtonLink>
    </div>
  );
}
