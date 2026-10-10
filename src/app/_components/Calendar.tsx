import { days } from "../_data/dummy";
import { CheckIcon } from "./ui";

const weekdays = ["月", "火", "水", "木", "金"];

// 開催期間の2週間を月〜金で並べる。onToggle を渡すと日を選べる。
export function Calendar({
  picked = [],
  lunchDayId,
  onToggle,
}: {
  picked?: string[];
  lunchDayId?: string;
  onToggle?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-card bg-surface p-3 shadow-card">
      <div className="grid grid-cols-5 gap-1.5 text-center text-label text-muted">
        {weekdays.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => {
          const base = "flex h-16 flex-col items-center justify-center rounded-control leading-tight";

          if (d.holiday) {
            return (
              <div key={d.id} className={`${base} bg-line-soft text-muted`}>
                <span className="text-lead font-bold">{d.num}</span>
                <span className="text-label">祝日</span>
              </div>
            );
          }

          const isLunch = d.id === lunchDayId;
          const on = picked.includes(d.id);
          const tone = isLunch
            ? "border border-primary bg-primary text-on-primary"
            : on
              ? "border-2 border-accent bg-accent-soft text-ink"
              : "border border-line bg-surface text-ink";
          const mark = isLunch ? "ランチ" : on ? "空き" : "";
          const content = (
            <>
              <span className="text-lead font-bold">{d.num}</span>
              <span className={`flex h-4 items-center text-label ${on && !isLunch ? "text-accent-strong" : ""}`}>
                {on && !isLunch && onToggle ? <CheckIcon size={12} /> : mark}
              </span>
            </>
          );

          if (!onToggle) {
            return (
              <div key={d.id} className={`${base} ${tone}`}>
                {content}
              </div>
            );
          }
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={on}
              aria-label={`${d.label}(${d.dow})`}
              onClick={() => onToggle(d.id)}
              className={`${base} ${tone} cursor-pointer`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
