import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: "%s | シャッフルランチ", default: "シャッフルランチ" },
  description: "入社半年以内の社員と、迎える側の社員のシャッフルランチ",
};

// スマホを主に作り、PC では中央に1列で表示する。
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${zenKaku.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-[15px] leading-relaxed">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-ground md:my-6 md:rounded-2xl md:shadow-sm md:ring-1 md:ring-line-soft">
          {children}
        </div>
      </body>
    </html>
  );
}
