import Link from "next/link";
import type { ReactNode } from "react";

/* ---------- 画面の枠 ---------- */

export function ScreenHeader({ title, backHref, action }: { title: string; backHref?: string; action?: ReactNode }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line-soft bg-surface px-3 md:rounded-t-frame">
      {backHref && (
        <Link
          href={backHref}
          aria-label="戻る"
          className="flex size-11 items-center justify-center rounded-control hover:bg-ground"
        >
          <ChevronIcon direction="left" size={22} />
        </Link>
      )}
      <div className="flex-1 pl-1 font-heading text-lead font-bold">{title}</div>
      {action}
    </header>
  );
}

export function ScreenBody({ children }: { children: ReactNode }) {
  return <main className="flex flex-1 flex-col gap-4 px-5 pt-6 pb-8">{children}</main>;
}

/* ---------- 文字 ---------- */

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="m-0 font-heading text-title leading-snug font-bold">{children}</h1>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="m-0 mt-2 text-lead font-bold">{children}</h2>;
}

// 日付など、大きく見せる値
export function Headline({ children }: { children: ReactNode }) {
  return <p className="m-0 font-heading text-headline font-bold">{children}</p>;
}

// 見出しの下の説明
export function Description({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`m-0 text-small text-muted ${className}`}>{children}</p>;
}

// 補足の小さな文字（手順の番号、注意書きなど）
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`m-0 text-caption text-muted ${className}`}>{children}</p>;
}

/* ---------- 枠 ---------- */

const cardTones = {
  default: "bg-surface shadow-card",
  warn: "bg-warn-soft text-warn",
};

export function Card({
  children,
  tone = "default",
  as: Element = "div",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof cardTones;
  as?: "div" | "li";
  className?: string;
}) {
  return <Element className={`flex flex-col gap-3 rounded-card p-4 ${cardTones[tone]} ${className}`}>{children}</Element>;
}

const noticeTones = {
  info: "bg-accent-soft text-ink",
  warn: "bg-warn-soft text-warn",
};

// お知らせの枠
export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: keyof typeof noticeTones }) {
  return <p className={`m-0 rounded-control px-3 py-2.5 text-small ${noticeTones[tone]}`}>{children}</p>;
}

// 区切り線のある1枚のリスト
export function DividedList({ children }: { children: ReactNode }) {
  return <ul className="m-0 flex list-none flex-col rounded-card bg-surface p-0 shadow-card">{children}</ul>;
}

export function DividedListItem({ children }: { children: ReactNode }) {
  return <li className="flex items-center gap-3 border-b border-line-soft px-4 py-3 last:border-b-0">{children}</li>;
}

export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-control bg-surface p-3 text-center shadow-card">
      <div className="text-label text-muted">{label}</div>
      <div className="text-headline font-bold">{value}</div>
    </div>
  );
}

/* ---------- ボタンとリンク ---------- */

const buttonStyles = {
  primary: "bg-primary text-on-primary font-bold hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-ground",
  dark: "bg-ink text-on-solid font-bold hover:opacity-90",
  demo: "border border-dashed border-muted bg-transparent text-ink text-small hover:bg-surface",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
}) {
  return (
    <Link href={href} className={`flex min-h-12 items-center justify-center rounded-button px-6 text-center ${buttonStyles[variant]}`}>
      {children}
    </Link>
  );
}

// 選択肢を大きく見せるリンク（形式を選ぶ画面など）
export function OptionLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link href={href} className="flex flex-col gap-1 rounded-card border border-line bg-surface p-4 shadow-card hover:border-primary">
      <span className="text-lead font-bold">{title}</span>
      <span className="text-small text-muted">{description}</span>
    </Link>
  );
}

// 目立たせたいお知らせから、詳しい画面へ進むリンク
export function HighlightLink({ href, label, title, action }: { href: string; label: string; title: string; action: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-card bg-primary p-4 text-on-primary shadow-card hover:bg-primary-strong">
      <span className="flex flex-1 flex-col">
        <span className="text-caption">{label}</span>
        <span className="text-lead font-bold">{title}</span>
      </span>
      <span className="text-small">{action}</span>
      <ChevronIcon direction="right" size={18} />
    </Link>
  );
}

// 切り替えの選択肢（たたき台用の状態切り替えなど）
export function ChipLink({ href, current, children }: { href: string; current: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`flex min-h-11 items-center rounded-button border px-4 text-small ${
        current ? "border-accent bg-accent-soft font-bold" : "border-line bg-surface"
      }`}
    >
      {children}
    </Link>
  );
}

/* ---------- 小さな印 ---------- */

const badgeStyles = {
  primary: "bg-primary-soft text-primary-text",
  accent: "bg-accent text-on-solid",
  soft: "bg-accent-soft text-accent-strong",
  warn: "bg-warn-soft text-warn",
  gray: "bg-line-soft text-ink",
};

// 状態を表す印（未回答、回答済みなど）
export function Badge({ children, tone = "soft" }: { children: ReactNode; tone?: keyof typeof badgeStyles }) {
  return (
    <span className={`self-start rounded-full px-2.5 py-0.5 text-caption font-bold ${badgeStyles[tone]}`}>{children}</span>
  );
}

const tagStyles = {
  outline: "border border-line bg-surface text-ink",
  dark: "bg-ink text-on-solid",
};

// 立場や区分を表す札（新入社員、迎える側、運営など）
export function Tag({ children, tone = "outline" }: { children: ReactNode; tone?: keyof typeof tagStyles }) {
  return (
    <span className={`self-start rounded-full px-2.5 py-0.5 text-label whitespace-nowrap ${tagStyles[tone]}`}>{children}</span>
  );
}

// 名前の頭文字の丸
export function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-bold text-primary-text"
    >
      {name.charAt(0)}
    </span>
  );
}

/* ---------- アイコン ---------- */

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function ChevronIcon({ direction, size }: { direction: "left" | "right"; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}
