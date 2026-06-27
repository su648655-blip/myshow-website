import type { ReactNode } from "react";

interface SignalPanelProps {
  eyebrow: string;
  title?: string;
  rows: { label: string; value: ReactNode }[];
  footer?: ReactNode;
  className?: string;
}

export default function SignalPanel({ eyebrow, title, rows, footer, className = "" }: SignalPanelProps) {
  return (
    <div className={`signal-panel rounded-2xl p-5 md:p-6 ${className}`}>
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-mono text-[10px] uppercase tracking-[0.24em] text-[var(--primary-bright)]">{eyebrow}</span>
          <span className="h-2 w-2 rounded-full bg-[var(--acid)] shadow-[0_0_18px_var(--primary-glow)]" />
        </div>
        {title && <h3 className="mb-5 text-xl font-black tracking-tight text-[var(--fg)] md:text-2xl">{title}</h3>}
        <div className="space-y-3">
          {rows.map((row, index) => (
            <div key={`${row.label}-${index}`} className="grid grid-cols-[minmax(88px,0.45fr)_1fr] gap-4 border-t border-[var(--border)] pt-3">
              <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg-4)]">{row.label}</div>
              <div className="text-sm font-semibold text-[var(--fg-2)]">{row.value}</div>
            </div>
          ))}
        </div>
        {footer && <div className="mt-5 border-t border-[var(--border)] pt-4">{footer}</div>}
      </div>
    </div>
  );
}
