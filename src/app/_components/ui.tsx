import Link from "next/link";
import type { ReactNode } from "react";

export function ScreenHeader({ title, backHref, action }: { title: string; backHref?: string; action?: ReactNode }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line-soft bg-white px-3 md:rounded-t-2xl">
      {backHref && (
        <Link
          href={backHref}
          aria-label="戻る"
          className="flex size-11 items-center justify-center rounded-lg hover:bg-ground"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      )}
      <div className="flex-1 pl-1 font-lunch-heading text-[17px] font-bold">{title}</div>
      {action}
    </header>
  );
}

export function ScreenBody({ children }: { children: ReactNode }) {
  return <main className="flex flex-1 flex-col gap-4 px-5 pt-6 pb-8">{children}</main>;
}

export function PageTitle({ children }: { children: ReactNode }) {
  return <h1 className="m-0 font-lunch-heading text-2xl leading-snug font-bold">{children}</h1>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-3 rounded-xl bg-white p-4 ${className}`}>{children}</div>;
}

const buttonStyles = {
  primary: "bg-accent text-white font-bold hover:bg-accent-strong",
  secondary: "border border-line bg-white text-ink hover:bg-ground",
  dark: "bg-ink text-white font-bold hover:opacity-90",
  demo: "border border-dashed border-muted bg-transparent text-ink text-sm hover:bg-white",
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
    <Link href={href} className={`flex min-h-12 items-center justify-center rounded-[10px] px-5 text-center ${buttonStyles[variant]}`}>
      {children}
    </Link>
  );
}

const badgeStyles = {
  accent: "bg-accent text-white",
  soft: "bg-accent-soft text-accent-strong",
  warn: "bg-warn-soft text-warn",
  gray: "bg-line-soft text-ink",
};

export function Badge({ children, tone = "soft" }: { children: ReactNode; tone?: keyof typeof badgeStyles }) {
  return (
    <span className={`self-start rounded-full px-2.5 py-0.5 text-[13px] font-bold ${badgeStyles[tone]}`}>{children}</span>
  );
}

export function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
