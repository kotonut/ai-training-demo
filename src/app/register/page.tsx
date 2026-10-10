import { ScreenBody, ScreenHeader } from "../_components/ui";
import { RegisterForm } from "./RegisterForm";

export const metadata = { title: "初回登録" };

export default function RegisterPage() {
  return (
    <>
      <ScreenHeader title="はじめに" />
      <ScreenBody>
        <RegisterForm />
      </ScreenBody>
    </>
  );
}
