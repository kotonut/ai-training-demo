import type { ComponentProps, ReactNode } from "react";

const controlClass = "h-11 rounded-control border border-line bg-surface px-3 text-ink";

// 見出しと入力欄の組
export function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-caption text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input {...props} className={controlClass} />;
}

export function Select({ options, ...props }: ComponentProps<"select"> & { options: string[] }) {
  return (
    <select {...props} className={controlClass}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

// 並べた選択肢から1つを選ぶ
export function ChoiceGroup({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
      <legend className="mb-1.5 p-0 text-caption text-muted">{legend}</legend>
      <div className="flex gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-11 flex-1 cursor-pointer rounded-control border text-small ${
              value === o ? "border-accent bg-accent text-on-solid" : "border-line bg-surface text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
