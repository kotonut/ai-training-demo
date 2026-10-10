import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | シャッフルランチ", default: "シャッフルランチ" },
  description: "入社半年以内の社員と、迎える側の社員のシャッフルランチ",
};

// スマホを主に作り、PC では中央に1列で表示する。
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${zenMaru.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-body leading-relaxed">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-ground md:my-6 md:rounded-frame md:shadow-sm md:ring-1 md:ring-line-soft">
          {children}
        </div>
      </body>
    </html>
  );
}
